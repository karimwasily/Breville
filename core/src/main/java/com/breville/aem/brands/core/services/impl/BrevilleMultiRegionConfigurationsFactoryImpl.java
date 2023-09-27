package com.breville.aem.brands.core.services.impl;

import java.io.IOException;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsFactory;
import com.breville.aem.brands.core.services.BrevilleMultiRegionConfigurationsObject;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Getter
@Setter
@Slf4j
@Component(service = BrevilleMultiRegionConfigurationsFactory.class, enabled = true, immediate = true)
@Designate(ocd = BrevilleMultiRegionConfigurationsObject.class, factory = true)
public class BrevilleMultiRegionConfigurationsFactoryImpl implements BrevilleMultiRegionConfigurationsFactory {

	/** The bundle context. */
	private static volatile BundleContext bundleContext;

	/** The svc PID map. */
	private static Map<String, String> svcPIDMap = new HashMap<String, String>();

	/** The Constant DEFAULT_CONFIG. */
	private static final String DEFAULT_CONFIG = "DEFAULT";

	@Activate
	@Modified
	protected void activate(final ComponentContext componentContext) {
		log.info("MultiRegionConfigurationFactoryImpl activate() method start");
		loadBundleContext(componentContext);
		final Dictionary<?, ?> props = componentContext.getProperties();
		final String servicePID = (String) props.get(Constants.SERVICE_PID);
		log.info("props = {} and servicePID = {}", props, servicePID);
		setServicePID(props, servicePID);
		log.info("MultiRegionConfigurationFactoryImpl activate() method end");

	}

	/**
	 * Assign bundleContext from ComponentContext
	 * 
	 * @param context
	 */
	protected static void loadBundleContext(ComponentContext context) {
		log.debug("MultiRegionConfigurationFactoryImpl loadBundleContext() start");
		bundleContext = context.getBundleContext();
		log.debug("MultiRegionConfigurationFactoryImpl loadBundleContext() end");
	}

	/**
	 * Sets the service PID. This will set PID corresponding to site root path in
	 * map.
	 *
	 * @param props      the props
	 * @param servicePID the service PID
	 */
	private void setServicePID(Dictionary<?, ?> props, String servicePID) {
		String siteRootPath = (String) props.get(getSiteRootPath());
		log.info("Site Root Path {} ", siteRootPath);
		if (!siteRootPath.equals(DEFAULT_CONFIG) && !siteRootPath.startsWith(ApplicationConstants.SLASH)) {
			final StringBuilder sf = new StringBuilder();
			sf.append(ApplicationConstants.SLASH).append(siteRootPath);
			siteRootPath = sf.toString();
		}
		if (!StringUtils.isEmpty(siteRootPath)) {
			svcPIDMap.put(siteRootPath, servicePID);
		}
	}

	/**
	 * SiteRootPath attribute
	 * 
	 * @return String
	 */
	protected String getSiteRootPath() {
		return "site.root.path";
	}

	/**
	 * Get the Specific property key's value from Breville MultiRegionConfiguraiton
	 * Object for specific Region
	 */
	@Override
	public String getSiteSpecificProperty(Resource resource, String key) {
		String propertyVal = null;
		final String resourcePath = resource.getPath();
		log.debug("getSiteSpecificProperty >> resorucePath {}", resourcePath);
		final Object obj = getConfigObject(null, resourcePath, key);
		propertyVal = getPropValueByObj(obj, key);
		if (Objects.isNull(propertyVal)) {
			final Object defaultObj = getConfigObject(DEFAULT_CONFIG, resourcePath, key);
			propertyVal = getPropValueByObj(defaultObj, key);
		} else {
			log.debug("value found resource. key={},value={} ", key, propertyVal);
		}
		log.info("MultfiConfig Property Value {} ", propertyVal);
		return propertyVal;
	}

	/**
	 * Get the Configuration Object for specific site root path
	 * 
	 * @param pagePath
	 * @param resourcePath
	 * @param key
	 * @return
	 */
	private Object getConfigObject(String pagePath, String resourcePath, String key) {
		log.info("Fetching Config object for pagePath = {}, resourcePath = {}, key = {}", pagePath, resourcePath, key);
		Configuration conf;
		if (Objects.nonNull(pagePath) && DEFAULT_CONFIG.equals(pagePath)) {
			log.warn("Fetching Config object from DEFAULT_CONFIG for pagePath{}, resourcePath{}, key", pagePath,
					resourcePath, key);
			conf = locateConfiguration(DEFAULT_CONFIG);
		} else {
			conf = locateConfiguration(resourcePath);
			log.debug("Confiugration object being used for page {} and resource {} is {}", pagePath, resourcePath,
					Objects.nonNull(conf) ? conf.getProperties() : null);
		}
		return getPropertyByPagePath(conf, key);
	}

	/**
	 * Get the Configuration object based on svcPID which we get from resourcepath
	 * 
	 * @param resourcePath
	 * @return Configuration Object
	 */
	private static Configuration locateConfiguration(String resourcePath) {
		log.debug("Locating Configuration for resourcePath {}", resourcePath);
		Configuration locatedConfig = null;
		final String siteRootPath = getSiteRootPath(resourcePath);
		final String svcPID = svcPIDMap.get(siteRootPath);
		log.debug("Service ID : {}", svcPID);
		final ConfigurationAdmin bundleConfigAdmin = (ConfigurationAdmin) bundleContext
				.getService(bundleContext.getServiceReference(ConfigurationAdmin.class.getName()));
		try {
			if (Objects.nonNull(svcPID)) {
				locatedConfig = bundleConfigAdmin.getConfiguration(svcPID);
			}
		} catch (final IOException e) {
			log.debug("Error occured either while locating the Config for resourcePath", resourcePath, e);
		}

		return locatedConfig;
	}

	/**
	 * Get the property (key) value from Configuration Properties
	 * 
	 * @param conf
	 * @param key
	 * @return Object
	 */
	private Object getPropertyByPagePath(Configuration conf, String key) {
		Object propObject = null;
		log.info("Configuration Object :: {}", conf);
		if (Objects.nonNull(conf)) {
			final Dictionary properties = conf.getProperties();
			if (Objects.nonNull(properties)) {
				propObject = properties.get(key);
			}
		} else {
			log.error("Could not find matching configuration for Key  " + key);
		}
		return propObject;
	}

	/**
	 * Get configuration object
	 * 
	 * @param request
	 * @param pagePath
	 * @param key
	 * @return Object
	 */
	public Object getConfigObj(HttpServletRequest request, String pagePath, String key) {
		final String resourcePath = getResourcePath(request, pagePath);
		return getConfigObject(pagePath, resourcePath, key);
	}

	/**
	 * Get the site root path resourcePath and return resourcePath if resourcePath
	 * is DEFAULT
	 * 
	 * @param resourcePath
	 * @return String
	 */
	protected static String getSiteRootPath(String resourcePath) {
		String siteRootPath = null;
		if (StringUtils.isNotEmpty(resourcePath)) {
			if (resourcePath.equalsIgnoreCase(DEFAULT_CONFIG)) {
				log.debug("Defualt resource and returning {} ", resourcePath);
				return resourcePath;
			} else {
				final String[] path = resourcePath.split(ApplicationConstants.SLASH);
				if (path.length > 4) {
					final StringBuilder sb = new StringBuilder();
					siteRootPath = sb.append(ApplicationConstants.SLASH).append(path[1])
							.append(ApplicationConstants.SLASH).append(path[2]).append(ApplicationConstants.SLASH)
							.append(path[3]).append(ApplicationConstants.SLASH).append(path[4]).toString();
					log.info("siteRootPath= " + siteRootPath);
				} else {
					log.error("Invalid root path given in configuration factory.= {}", resourcePath);
				}
			}

		} else {
			log.error("siteRootPath is null or empty. Check configuration factory. resourcePath = {}", resourcePath);
		}

		return siteRootPath;
	}

	/**
	 * Get resource path from Request object
	 * 
	 * @param request
	 * @param pagePath
	 * @return String resourcePath
	 */
	protected String getResourcePath(HttpServletRequest request, String pagePath) {
		final SlingHttpServletRequest slingRequest = (SlingHttpServletRequest) request;
		final Resource resource = slingRequest.getResource();
		if (Objects.nonNull(resource)) {
			return resource.getPath();
		} else {
			log.error("Unanle to fetch the resource for the request with uri {} for page path - {}",
					request.getRequestURI(), pagePath);
		}
		return null;
	}

	/**
	 * Get the value from Object
	 * 
	 * @param obj
	 * @param key
	 * @return String property value
	 */
	private String getPropValueByObj(Object obj, String key) {
		String propertyVal = null;
		if (Objects.nonNull(obj)) {
			propertyVal = obj.toString();
		} else {
			log.error("Property not found in factory config for key = {}", key);
		}

		return propertyVal;
	}
}