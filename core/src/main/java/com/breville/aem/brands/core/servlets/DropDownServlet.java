package com.breville.aem.brands.core.servlets;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import javax.servlet.Servlet;
import org.apache.commons.collections.iterators.TransformIterator;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.day.crx.JcrConstants;
import lombok.extern.slf4j.Slf4j;

/**
 * @author MdAzhar
 * 
 *         This servlet is used for listing out the drop down data source in
 *         dialog field.
 *
 */
@Slf4j
@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "= Dynamic Drop Down",
		ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=" + "/bin/breville/servlets/countryflagdropdownListing" })
public class DropDownServlet extends SlingSafeMethodsServlet {
	private static final String ETC_CLIENTLIBS = "/etc.clientlibs/";
	private static final String APPS = "/apps/";
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
		try {
			ResourceResolver resourceResolver = request.getResourceResolver();
			List<KeyValue> dropDownList = new ArrayList<>();
			Resource pathResource = request.getResource();
			String rootPath = pathResource.getChild("datasource").getValueMap().get("rootPath", String.class);
			Resource resource = request.getResourceResolver().getResource(rootPath);
			Iterator<Resource> iterator = resource.listChildren();
			List<Resource> list = new ArrayList<>();
			iterator.forEachRemaining(list::add);
			list.forEach(res -> {
				// ValueMap valueMap = res.getValueMap();
				if (res.getName().contains(ApplicationConstants.DOT_SVG)) {// for region flag listing
					String title = res.getName();
					String valueStr = res.getPath();
					if(valueStr.contains(APPS)) {
						valueStr=valueStr.replace(APPS, ETC_CLIENTLIBS);
					}
					dropDownList.add(new KeyValue(title, valueStr));
				}
			});
			@SuppressWarnings("unchecked")
			DataSource ds = new SimpleDataSource(new TransformIterator(dropDownList.iterator(), input -> {
				KeyValue keyValue = (KeyValue) input;
				ValueMap vm = new ValueMapDecorator(new HashMap<>());
				vm.put("value", keyValue.value);
				vm.put("text", keyValue.key);
				return new ValueMapResource(resourceResolver, new ResourceMetadata(), JcrConstants.NT_UNSTRUCTURED, vm);
			}));
			request.setAttribute(DataSource.class.getName(), ds);

		} catch (Exception e) {
			log.error("Error in Get Drop Down Values", e);
		}
	}

	private class KeyValue {

		/**
		 * key property.
		 */
		private String key;
		/**
		 * value property.
		 */
		private String value;

		/**
		 * constructor instance.
		 *
		 * @param newKey   -
		 * @param newValue -
		 */
		private KeyValue(final String newKey, final String newValue) {
			this.key = newKey;
			this.value = newValue;
		}
	}
}
