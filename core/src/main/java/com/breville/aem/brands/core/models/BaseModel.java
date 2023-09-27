package com.breville.aem.brands.core.models;

import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

import com.breville.aem.brands.core.constant.AnalyticsConstants;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.utils.LinkUtil;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Model(adaptables = Resource.class)
public class BaseModel {
	
	/** The resource resolver. */
	@SlingObject
	public ResourceResolver resourceResolver;

	/** The request. */
	@SlingObject
	public SlingHttpServletRequest request;
	
	/** The request. */
	@Inject
	@Via("request")
	public Resource resource;

    /** The externalizer. */
    @Inject
    public Externalizer externalizer;   
    
	/** The externalizerKey. */
	public String externalizerKey;

	/** The current page. */
	@ScriptVariable
	public Page currentPage;
	
	/** The generic data Json. */
	@Inject
	public String genericDataJson;
	
	/** The generic countryCode. */
	public String countryCode;

	/** The languageCode code. */
	public String languageCode;

	/** The brand. */
	public String brand;
		
	/** The Locale. */
	public String locale = ApplicationConstants.DEFAULT_LOCALE;

    @PostConstruct
    protected void init() {
        // Init for the Model class will go here
    }
    
    /**
     * Build a link based on different input criteria
     *
     * @param link
     *            the given link string
     * @param resourceResolver
     *            the ResourceResolver
     * @return string the build link
     */
    protected String buildLinkPath(final String link, ResourceResolver resourceResolver) {
        return LinkUtil.buildLinkPath(link, resourceResolver, null);
    }
    
	
	/**
	 * Gets the Country code from the Locale String value
	 * 
	 * @param locale
	 * @return Country Code
	 */
	public String getCountryCodeFromLocaleStr(final String locale) {
		if(StringUtils.isNotEmpty(locale)) {
			String[] localArr = locale.split(AnalyticsConstants.HYPEN);
			return localArr.length > ApplicationConstants.ONE ? localArr[ApplicationConstants.ONE]: StringUtils.EMPTY;
		}
		return StringUtils.EMPTY;
	}
	
	/**
	 * Get the Lanaguage code from Local String value
	 * 
	 * @param locale
	 * @return Language code
	 */
	public String getLanguageCodeFromLocaleStr(final String locale) {
		if(StringUtils.isNotEmpty(locale)) {
			String[] localArr = locale.split(AnalyticsConstants.HYPEN);
			return localArr.length > 0 ? localArr[0]: StringUtils.EMPTY;
		}
		return StringUtils.EMPTY;
	}
	

	/**
	 * Get the ISO Country code.
	 * 
	 * @param itResource
	 * @param isoCountryCode
	 * @return
	 */
	public String getISOCountryCode(final Resource itResource, String isoCountryCode) {
		if (!itResource.getName().equalsIgnoreCase("uk") && !itResource.getName().equalsIgnoreCase("eu")) {
			final Locale locale = new Locale(StringUtils.EMPTY, itResource.getName().toUpperCase(Locale.ENGLISH));
			isoCountryCode = locale.getISO3Country();

			if ("GBR".equals(isoCountryCode)) {
				isoCountryCode = "UK";
			}
		}
		return isoCountryCode;
	}
}
