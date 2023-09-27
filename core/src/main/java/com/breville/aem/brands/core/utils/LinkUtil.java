package com.breville.aem.brands.core.utils;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;

import com.breville.aem.brands.core.constant.ApplicationConstants;

import lombok.extern.slf4j.Slf4j;


/**
 * The Class LinkUtil.This will provide method to validate internal and external url and will provide valid url for any
 * page.
 */
@Slf4j
public final class LinkUtil {


    /**
     * LinkUtil private constructor.
     */
    private LinkUtil() {
    }

    /**
     * Gets the href.
     *
     * @param url
     *            the url
     * @return the href
     */
    public static String getHref(String url) {
        log.debug("getHref() start. url={}", url);
        String href = StringUtils.EMPTY;
        String trimmedUrl = StringUtils.EMPTY;
        if (null != url) {
            trimmedUrl = url.trim();
        }

        if (url == null || url.isEmpty()) {
            return href;
        }

        if (StringUtils.startsWith(trimmedUrl, ApplicationConstants.CONTENT_DAM_PATH)) {
            href = trimmedUrl;
            if (StringUtils.contains(href, ApplicationConstants.HTML_EXTENSION)) {
                href = StringUtils.substringBefore(href,
                         ApplicationConstants.HTML_EXTENSION);
            }
        } else {
            href = createHref(trimmedUrl);
        }

        log.debug("getHref() end. href={}", href);
        return href;
    }

    /**
     * Gets the href.
     *
     * @param trimmedUrl
     *            the trimmed url
     * @param jpgPngGifImage
     *            the jpg png gif image
     * @param jpegBmpTifImage
     *            the jpeg bmp tif image
     * @return the href
     */
    private static String getHref(String trimmedUrl, boolean jpgPngGifImage, boolean jpegBmpTifImage) {
        String href;
        if (StringUtils.startsWith(trimmedUrl, ApplicationConstants.CONTENT_PATH) && !(jpgPngGifImage || jpegBmpTifImage
                || StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_VCF))) {
            href = trimmedUrl;
            if (!StringUtils.contains(href, ApplicationConstants.HTML_EXTENSION)) {
                href = href.concat(ApplicationConstants.HTML_EXTENSION);
            }
        } else {
            href = trimmedUrl;
            if (!(StringUtils.startsWith(href, ApplicationConstants.HTTP)
                    || StringUtils.startsWith(href, ApplicationConstants.HTTPS))
                    && href.charAt(0) != ApplicationConstants.FORWARD_SLASH_CHAR) {
                href = ApplicationConstants.HTTP.concat(href);
            }
        }
        // return href
        return href;
    }

    /**
     * Creates the href. This method will return href.
     * 
     * @param trimmedUrl
     *            the trimmed url
     * @return the string
     */
    private static String createHref(String trimmedUrl) {
        final boolean jpgPngGifImage = StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_PNG)
                || StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_GIF)
                || StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_JPG);
        final boolean jpegBmpTifImage = StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_JPEG)
                || StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_BMP)
                || StringUtils.endsWithIgnoreCase(trimmedUrl, ApplicationConstants.IMAGE_TIF);
        return getHref(trimmedUrl, jpgPngGifImage, jpegBmpTifImage);
    }

    /**
     * Builds the link path.
     *
     * @param link
     *            the link
     * @param resourceResolver
     *            the ResourceResolver
     * @param hashTag
     *            the hash tag
     * @return the string Append extension in url
     */
    public static String buildLinkPath(final String link, ResourceResolver resourceResolver, final String hashTag) {
        String fullLinkPath = ApplicationConstants.HASH;

        if (StringUtils.startsWith(link, ApplicationConstants.HTTP_TXT)
                || StringUtils.startsWith(link, ApplicationConstants.CONTENT_DAM_PATH)) {
            fullLinkPath = link;
            if (StringUtils.isNotBlank(hashTag)) {
                final StringBuilder builder = new StringBuilder(fullLinkPath);
                fullLinkPath = builder.append(ApplicationConstants.HASH).append(hashTag).toString();
            }
        } else if (StringUtils.equals(ApplicationConstants.HASH, link)) {
            fullLinkPath = link;
            if (StringUtils.isNotBlank(hashTag)) {
                final StringBuilder builder = new StringBuilder(fullLinkPath);
                fullLinkPath = builder.append(hashTag).toString();
            }
        } else if (StringUtils.startsWith(link, ApplicationConstants.HASH)
                || StringUtils.contains(link, ApplicationConstants.HTML_EXTENSION)) {
            fullLinkPath = link;
        } else {
            if (StringUtils.isNotBlank(link)) {
                final StringBuilder builder = new StringBuilder(link);
                fullLinkPath = builder.append(ApplicationConstants.HTML_EXTENSION).toString();
            } else {
                log.debug("Url is null or empty", link);
            }
        }

        fullLinkPath = resourceResolver.map(fullLinkPath);
        // return complete url path.
        return fullLinkPath;
    }
}
