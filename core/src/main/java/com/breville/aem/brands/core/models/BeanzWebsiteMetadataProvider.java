package com.breville.aem.brands.core.models;

import java.util.Calendar;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.services.WebsiteMetadata;
import com.day.cq.commons.Externalizer;
import com.day.cq.wcm.api.Page;
import com.day.cq.commons.jcr.JcrConstants;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */

@Model(
        adaptables = { SlingHttpServletRequest.class, Resource.class },
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BeanzWebsiteMetadataProvider implements WebsiteMetadata {
    private static final String PN_IMAGE_FILE_JCR_CONTENT = "image/file/" + JcrConstants.JCR_CONTENT;
    
    @ScriptVariable
    private Page currentPage = null;

    @Self
    private SlingHttpServletRequest request = null;

    @ScriptVariable
    private SlingHttpServletResponse response = null;

    @SlingObject
    private ResourceResolver resourceResolver = null;
    
    @OSGiService
    private Externalizer externalizer = null;

    @Override
    public String getTitle() {
        String title = currentPage.getTitle();
        if (StringUtils.isBlank(title)) {
            title = currentPage.getName();
        }
        return title;
    }

    @Override
    public String getURL() {
        String pagePath = currentPage.getPath();
        String extension = request.getRequestPathInfo().getExtension();
        String url = externalizer.publishLink(resourceResolver, pagePath) + "." + extension;
        return url;
    }

    @Override
    public Type getType() {
        return Type.website;
    }

    @Override
    public String getTypeName() {
        return getType().name();
    }

    @Override
    public String getImage() {
        String image = getThumbnailUrl(currentPage, 800, 480);
        image = externalizer.publishLink(resourceResolver, image);
        return image;
    }

    private String getThumbnailUrl(Page page, int width, int height) {
        String ck = "";

        ValueMap metadata = page.getProperties(PN_IMAGE_FILE_JCR_CONTENT);
        if (metadata != null) {
            Calendar imageLastModified = metadata.get(JcrConstants.JCR_LASTMODIFIED, Calendar.class);
            Calendar pageLastModified = page.getLastModified();
            if (pageLastModified != null && pageLastModified.after(imageLastModified)) {
                ck += pageLastModified.getTimeInMillis() / 1000;
            } else if (imageLastModified != null) {
                ck += imageLastModified.getTimeInMillis() / 1000;
            } else if (pageLastModified != null) {
                ck += pageLastModified.getTimeInMillis() / 1000;
            }
        }

        return page.getPath() + ".thumb." + width + "." + height + ".png?ck=" + ck;
    }


    @Override
    public String getDescription() {
        return currentPage.getDescription();
    }

    @Override
    public String getSiteName() {
        Page page = findRootPage();

        String pageTitle = page.getPageTitle();
        if (StringUtils.isNotBlank(pageTitle)) {
            return pageTitle;
        }

        Resource content = page.getContentResource();
        if (content == null) {
            return null;
        }
        String title = content.getValueMap().get(JcrConstants.JCR_TITLE, String.class);
        if (StringUtils.isBlank(title)) {
            return null;
        }
        return title;
    }

    private Page findRootPage() {
        Page page = currentPage;
        while (true) {
            Page parent = page.getParent();
            if (parent == null) {
                return page;
            } else {
                page = parent;
            }
        }
    }

	@Override
	public Boolean getPdpPage() {
		return false;
	}

	@Override
	public String getRobotsMetaTagLive() {
		 return currentPage.getProperties().get(ApplicationConstants.ROBOTS_META_TAG, String.class);
	}

	@Override
	public String getCanonicalUrl() {
		return new BeanzProduct().buildExternalizeUrl(request.getResource().getResourceResolver(), currentPage.getPath(),
				request.getResource());
	}
}

