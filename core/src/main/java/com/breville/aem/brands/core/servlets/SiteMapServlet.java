package com.breville.aem.brands.core.servlets;

import com.breville.aem.brands.core.models.Url;
import com.breville.aem.brands.core.services.ListChildren;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.ServletResolverConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.propertytypes.ServiceDescription;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;


@Component(service = Servlet.class, property = {
        ServletResolverConstants.SLING_SERVLET_RESOURCE_TYPES + "=foundation/components/redirect",
        ServletResolverConstants.SLING_SERVLET_EXTENSIONS + "=xml"})
@ServiceDescription("SiteMapServlet")
public class SiteMapServlet extends SlingSafeMethodsServlet {
    /**
     * The Static variables
     */
    private static final String SAPERATOR = "://";
    private static final String OPEN_URL_SET = "<urlset";
    private static final String OPEN_URL = "<url>";
    private static final String OPEN_LOCATION = "<loc>";
    private static final String OPEN_LAST_MODIFIED = "<lastmod>";
    private static final String OPEN_CHANGE_FREQ = "<changefreq>";
    private static final String OPEN_PRIORITY = "<priority>";
    private static final String EXTENSION_HTML = ".html";

    private static final String CLOSE_URL_SET = "</urlset>";
    private static final String CLOSE_URL = "</url>";
    private static final String CLOSE_LOCATION = "</loc>";
    private static final String CLOSE_LAST_MODIFIED = "</lastmod>";
    private static final String CLOSE_CHANGE_FREQ = "</changefreq>";
    private static final String CLOSE_PRIORITY = "</priority>";
    private static final String XML_URLSET = " xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\r\n"
            + "      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\r\n"
            + "      xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9\r\n"
            + "            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">";

    ListChildren listChildren = new ListChildren();

    /**
     * The Do get method Get the resource path from request obj calls
     * ListTheChildren to get list of all child pages under resource returns xml
     * response - sitemap
     */
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        ResourceResolver resolver = request.getResourceResolver();
        if (request.getRequestURI() != null) {
            if (request.getRequestURI().contains("/")) {
                String resourcePath = request.getRequestURI().substring(0, request.getRequestURI().lastIndexOf("/"));
                Resource resource = resolver.getResource(resourcePath);
                List<Url> pages = listChildren.listTheChildren(resource, resolver);
                response.setContentType("text/xml;charset=UTF-8");
                PrintWriter writer = response.getWriter();
                writer.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
                writer.append(SiteMapServlet.OPEN_URL_SET + SiteMapServlet.XML_URLSET);
                for (Url page : pages) {
                    writer.append(SiteMapServlet.OPEN_URL);
                    writer.append(SiteMapServlet.OPEN_LOCATION + request.getScheme() + SiteMapServlet.SAPERATOR
                            + request.getServerName() + page.getLoc().replaceFirst("/content", "") + SiteMapServlet.EXTENSION_HTML
                            + SiteMapServlet.CLOSE_LOCATION);
                    writer.append(
                            SiteMapServlet.OPEN_LAST_MODIFIED + page.getLastMod() + SiteMapServlet.CLOSE_LAST_MODIFIED);
                    writer.append(
                            SiteMapServlet.OPEN_CHANGE_FREQ + page.getChangfreq() + SiteMapServlet.CLOSE_CHANGE_FREQ);
                    writer.append(
                            SiteMapServlet.OPEN_PRIORITY + page.getPriority() + SiteMapServlet.CLOSE_PRIORITY);
                    writer.append(SiteMapServlet.CLOSE_URL);
                }
                writer.append(SiteMapServlet.CLOSE_URL_SET);
            }
        }
    }
}
