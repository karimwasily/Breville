package com.breville.aem.brands.core.servlets;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.post.JSONResponse;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import com.breville.aem.brands.core.services.BrevilleBeanzRoasterDetailsReadService;
import com.google.gson.JsonObject;

import lombok.extern.slf4j.Slf4j;

/**
 * This model will fetch the cached roasters vendor details and also based on
 * the query param action, get the refreshed cache for Roasters
 * 
 * @author PradeepMC
 *
 */
@Component(service = Servlet.class, property = {

		"sling.servlet.methods=" + "GET", "sling.servlet.paths=" + "/bin/breville/servlets/beansroastersvendorinfo" })
@Slf4j
public class BeanzRoastersVendorInfoServlet extends SlingSafeMethodsServlet {

	private static String ACTION = "action";

	private static String REFRESH = "refresh";

	/**
	 * Get the BrevilleBeanzRoasterDetailsReadService
	 */
	@Reference
	private BrevilleBeanzRoasterDetailsReadService beanzRoasterReadService;

	String jsonReponse = "";

	@Override
	protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServletException, IOException {
		log.debug("BeanzRoastersVendorInfoServlet >> doGet {} ",beanzRoasterReadService);
		
		String action = request.getParameter(ACTION);
		JsonObject jsonObj = new JsonObject();

		if (Objects.nonNull(beanzRoasterReadService)) {
			// if action query param is refresh, then call refreshRoastersDetailsCache
			// method
			// which will get the fresh copy roaster details read from JCR nodes.
			if (Objects.nonNull(action) && action.equalsIgnoreCase(REFRESH)) {
				jsonObj = beanzRoasterReadService.refreshRoastersDetailsCache(request.getResourceResolver());
			} else {
				jsonObj = beanzRoasterReadService.getOurRoastersDetailsJson(request.getResourceResolver());
			}
			if(Objects.nonNull(jsonObj)) {
				jsonReponse = jsonObj.toString();
			}
		}
		response.getWriter().write(jsonReponse);
	}
}
