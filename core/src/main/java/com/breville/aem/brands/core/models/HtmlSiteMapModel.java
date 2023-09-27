/**
 * This is HtmlSiteMapModel class.
 */
package com.breville.aem.brands.core.models;

/**
 * This is HtmlSiteMapModel class.
 */

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.pojo.Link;
import com.breville.aem.brands.core.pojo.PageDetails;
import com.breville.aem.brands.core.utils.PathUtil;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;

/**
 * The Class HtmlSiteMapModel. This class gets the pages to the html sitemap if
 * the page property name showInSitemap is enabled
 *
 * @author saicharan
 */

@Model(adaptables = Resource.class, resourceType = "breville-brands/components/sitemap", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HtmlSiteMapModel {

	/** The LOGGER Constant. */
	private static final Logger LOGGER = LoggerFactory.getLogger(HtmlSiteMapModel.class);

	private static final String HIDE_IN_NAV = "hideInNav";
	private static final String TRUE = "true";
	private static final String SITEMAPULRS = "siteMapUrls";
	private static final String URL = "url";

	/**
	 * The resource.
	 */
	@Self
	private Resource resource;

	/** The resource type. */
	@Inject
	@Named("sling:resourceType")
	@Default(values = "No resourceType")
	protected String resourceType;

	private List<String> urlList;

	/**
	 * Post Contruct method
	 */
	@PostConstruct
	public void init() {
		getSiteMapDetails();
	}

	/**
	 * Process SiteMap Details from siteMapUrls and update LinkedHashMap object
	 * 
	 * @return the product structure
	 */
	public Map<String, PageDetails> getSiteMapDetails() {

		ResourceResolver resourceResolver = resource.getResourceResolver();
		Map<String, PageDetails> siteMapDetails = new LinkedHashMap<>();

		// get the multifield values in List<String>
		getUrlList();

		// null check urlList object
		if (Objects.nonNull(urlList)) {
			LOGGER.debug(" getSiteMapDetails method = {}", urlList.size());
			for (String pageUrl : urlList) {
				Resource pageResource = resourceResolver.getResource(pageUrl);
				if (pageResource != null) {
					Page page = pageResource.adaptTo(Page.class);
					if (page != null) {
						PageDetails pageDetails = new PageDetails();

						// set paths authored page details
						pageDetails.setLabel(page.getTitle());
						pageDetails.setLink(buildLinkPath(page.getPath(), resourceResolver));
						pageDetails.setLinkDetails(setLinkDetails(page, new ArrayList<>()));
						siteMapDetails.put(pageUrl, pageDetails);
					}
				}
			}

		} else {
			LOGGER.error("Please author sitemap urls");
		}

		LOGGER.debug("siteMapDetails :: {} ", siteMapDetails);
		return siteMapDetails;
	}

	/**
	 * get the multifield values in List<String>
	 
	 */
	private void getUrlList() {
		try {
			this.urlList = Optional.ofNullable(this.resource.hasChildren() ? this.resource.getChild(SITEMAPULRS) : null)
					.map(Resource::getChildren).map(Iterable::spliterator).map(s -> StreamSupport.stream(s, false))
					.orElseGet(Stream::empty).map(res -> res.getValueMap().get(URL, String.class))
					.collect(Collectors.toList());

		} catch (Exception e) {
			LOGGER.error("Issue while getUrlList {}", e.getMessage());
		}
	}

	/**
	 * Page Filter based on custom property hideInNav of a pages
	 * 
	 * @return PageFilter Object
	 */
	public PageFilter getPageFilter() {
		return new PageFilter() {
			@Override
			public boolean includes(Page p) {
				String customPropertyName = p.getProperties().get(HIDE_IN_NAV, String.class);
				return !(null != customPropertyName && customPropertyName.equalsIgnoreCase(TRUE));
			}
		};
	}

	/**
	 * set the page details
	 * 
	 * @param page           the page
	 * @param linkDetailList the linkDetails
	 * @return
	 */
	public List<Link> setLinkDetails(final Page page, final List<Link> linkDetailList) {
		LOGGER.debug("Page: {}", page.getPath());
		final Iterator<Page> iterator = page.listChildren(getPageFilter());
		while (iterator.hasNext()) {
			Page childPage = iterator.next();
			Link linkDetails = new Link();
			/** set linkDetails */
			linkDetails.setLabel(childPage.getTitle());
			linkDetails.setUrl(buildLinkPath(childPage.getPath(), resource.getResourceResolver()));
			linkDetailList.add(linkDetails);
		}
		return linkDetailList;
	}

	/**
	 * Build a link based on different input criteria
	 *
	 * @param link             the given link string
	 * @param resourceResolver the ResourceResolver
	 * @return string the build link
	 */
	protected String buildLinkPath(final String link, ResourceResolver resourceResolver) {
		return PathUtil.buildLInk(link, resourceResolver);
	}
}
