package com.breville.aem.brands.core.services;

import com.breville.aem.brands.core.models.Url;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public class ListChildren {
    protected static final Logger LOG = LoggerFactory.getLogger(ListChildren.class);

    /**
     * @param res
     * @param resolver
     * @return list of URL (loc ,lastmod)
     * @throws RepositoryException
     * @throws PathNotFoundException
     */
    public List<Url> listTheChildren(Resource res, ResourceResolver resolver) {
        ArrayList<Url> urlList = new ArrayList<Url>();
        Page rootPage = res.adaptTo(Page.class);
        Iterator<Page> resourceChildren = rootPage.listChildren(null, true);

        while (resourceChildren.hasNext()) {
            Page child = resourceChildren.next();
            if (child != null) {
                ValueMap props = child.getProperties();
                String hideInNavProp = props.get("hideInNav", "");
                String lastMod = props.get("cq:lastModified", "");
                String changfreq = props.get("changefreq", "weekly");
                String priority = props.get("priority", ".9");
                String pageTitle = props.get("jcr:title", "").replaceAll("&", "&amp;");
                String pubdate = props.get("jcr:date", "");
                String pagePath = child.getPath();

                if (!"true".equals(hideInNavProp)) {
                    Url url = new Url();
                    url.setLoc(pagePath);
                    url.setLastMod(lastMod);
                    url.setChangfreq(changfreq);
                    url.setPriority(priority);
                    url.setPageTitle(pageTitle);
                    url.setPubDate(pubdate);
                    urlList.add(url);
                }

            }
        }
        return urlList;
    }
}
