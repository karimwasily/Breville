package com.breville.aem.brands.core.services;
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
public interface WebsiteMetadata {
    enum Type {website, product}

    String getTitle();

    String getURL();

    Type getType();

    String getTypeName();

    String getImage();

    String getDescription();

    String getSiteName();
    
    Boolean getPdpPage();
    
    String getRobotsMetaTagLive();
    
    String getCanonicalUrl();
}
