package com.breville.aem.brands.core.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.jcr.RepositoryException;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@Component(service = Servlet.class,
property = {
        
        "sling.servlet.methods=" + "GET",
        "sling.servlet.paths=" + "/bin/breville/servlets/newsLetterSubscription"
})
public class NewsLetterSubscriptionServlet extends SlingSafeMethodsServlet {
	
	private static final long serialVersionUID = -2635830746264018436L;
	
	private static final String SUCCESS = "success";

	private static final String LANGUAGE = "language";

	private static final String FIRST_NAME = "firstName";

	private static final String LAST_NAME = "lastName";

	private static final String EMAIL = "email";

	private static final String REGION = "region";

	private static final String BRAND = "brand";

	private static final String POSTAL_CODE = "postalCode";

	private static final String MARKETING_ZIP_CODE = "MarketingZipCode";

	private static final Logger LOGGER = LoggerFactory.getLogger(NewsLetterSubscriptionServlet.class);
	
	@Reference
	private CommonConfigurationsImpl commonConfig;
	
	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		postDataToSalesForce(request, response);
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	private void postDataToSalesForce(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws IOException {
		// call HttpClientConnection
		final ObjectMapper mapper = new ObjectMapper();
		final JsonNode requestData = mapper.createObjectNode();
		final JsonNode formDataObject = mapper.createObjectNode();
		final HttpPost formRequest;
		
		// for New NewsLetter Sign Up submission
		formRequest = new HttpPost(commonConfig.getNewsLetterSalesForceURL());
		populatingFormData(request, formDataObject, requestData);
		// request body created
		ApplicationConstants.createBodyForRequest(requestData, formRequest);
		// call Http client connection for response
		final HttpResponse responseFromSalesForce = ApplicationConstants.postHttpClientConnection(formRequest);
		LOGGER.debug("responseFromSalesForce :: {}", responseFromSalesForce);
		// set response got from Http client connection
		setResponseFromConnection(response, responseFromSalesForce);
	}

	/**
	 * 
	 * @param request
	 * @param formDataObject
	 * @param requestData
	 * @throws RepositoryException
	 */
	private void populatingFormData(SlingHttpServletRequest request, final JsonNode formDataObject,
			final JsonNode requestData) {
		// creating request data object
		((ObjectNode) formDataObject).put("hasSubscribed", true);
		((ObjectNode) formDataObject).put(FIRST_NAME, (null != request.getParameter(FIRST_NAME)) ? request.getParameter(FIRST_NAME) : StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(LAST_NAME,(null != request.getParameter(LAST_NAME)) ? request.getParameter(LAST_NAME) : StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(LANGUAGE,(null != request.getParameter(LANGUAGE)) ? request.getParameter(LANGUAGE) : StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(EMAIL, (null != request.getParameter(EMAIL)) ? request.getParameter(EMAIL): StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(REGION, (null != request.getParameter(REGION)) ? getRegionForNewsLetter(request.getParameter(REGION)) : StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(MARKETING_ZIP_CODE, (null != request.getParameter(POSTAL_CODE)) ? request.getParameter(POSTAL_CODE) : StringUtils.EMPTY);
		((ObjectNode) formDataObject).put(BRAND, (null != request.getParameter(BRAND)) ? request.getParameter(BRAND): StringUtils.EMPTY);
		((ObjectNode) requestData).set("request", formDataObject);
		LOGGER.debug("formDataObject values :: {}", formDataObject);
		LOGGER.debug("requestData values :: {}", requestData);
	}

	/**
	 * 
	 * @param response
	 * @param salesforceresponse
	 */
	private void setResponseFromConnection(SlingHttpServletResponse response, HttpResponse salesforceresponse) {
		StringBuilder result = null;
		try (InputStreamReader inputStreamReader = new InputStreamReader(salesforceresponse.getEntity().getContent(),
				java.nio.charset.Charset.defaultCharset()); BufferedReader rd = new BufferedReader(inputStreamReader)) {
			LOGGER.debug("response.getEntity().getContent()) :: {}", salesforceresponse.getEntity().getContent());
			String line = "";
			result = new StringBuilder();
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}

			ObjectMapper jsonMapper;
			boolean flag = false;
			jsonMapper = new ObjectMapper();
			final JsonNode jsonNode = jsonMapper.readTree(result.toString());

			LOGGER.debug("Salesforce response result :: {} ", result);

			flag = jsonNode.get(SUCCESS).asBoolean();
			if (flag) {

				response.setStatus(salesforceresponse.getStatusLine().getStatusCode());
				LOGGER.debug("Connection created successfully: {} ",
						salesforceresponse.getStatusLine().getStatusCode());
				LOGGER.debug("Data submitted successfully into salesforce :{}", flag);
			} else {
				response.sendError(HttpServletResponse.SC_NOT_FOUND,	
						"Data not found in salesforce related to this product code ...");
				LOGGER.debug("Data not submitted successfully into salesforce:{} ", flag);
			}
		} catch (final IOException e) {
			LOGGER.error("IOException caught in method setResponseFromConnection:{}", e);
		}
	}
	
	/**
	 * @param pagePath
	 * @return
	 */
	private String getRegionForNewsLetter(String regionCode) {
		String regionValue = StringUtils.EMPTY;
        for (final String element : commonConfig.getNewsLetterSalesForceCountryMapping()) {
            if (element.contains(regionCode.toUpperCase())) {
                final String[] region = element.split("=");
                regionValue = region[1];
                break;
            }
        }
        return regionValue;
	}
	
}
