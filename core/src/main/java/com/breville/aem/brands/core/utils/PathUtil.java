package com.breville.aem.brands.core.utils;

import static org.apache.commons.lang3.StringUtils.endsWith;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.split;
import static org.apache.commons.lang3.StringUtils.startsWith;
import static org.apache.commons.lang3.StringUtils.substringAfter;
import static org.apache.commons.lang3.StringUtils.substringBefore;
import static org.apache.commons.lang3.StringUtils.substringBeforeLast;
import static org.apache.commons.lang3.StringUtils.trim;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PathUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(PathUtil.class);
    private static final String HTTP = "http";
    private static final String HTML_EXTENSION = ".html";
    private static final String HASH = "#";
    private static final String QUESTION = "?";


    /**
     * Builds a link from a path passing it through the {@link ResourceResolver#map(String)} function to externalise a path.
     *
     * @param path of the resource / page.
     * @param resolver the {@link ResourceResolver} used to map any paths
     * @return the mapped path if it does not start with http.* otherwise passes back the original path (url).
     */
    public static String buildLInk(String path, final ResourceResolver resolver) {
        if (isBlank(path)) {
            LOGGER.debug("Path is null or empty", path);
            return HASH;
        }
        path = trim(path);
        if (startsWith(path, HTTP)) {
            return path;
        }
        if (startsWith(path, HASH)) {
            return path;
        }
        final String parts[] = split(path, QUESTION, 2);
        final String query;
        final String fragment;
        if (null != parts && parts.length > 1) {
            path = parts[0];
            query = parts[1];
            fragment = substringAfter(query, HASH);
        } else {
            query = null;
            fragment = substringAfter(path, HASH);
            path = substringBefore(path, HASH);
        }
        if (endsWith(path, HTML_EXTENSION)) {
            path = substringBeforeLast(path, HTML_EXTENSION);
        }
        StringBuilder uri = new StringBuilder(resolver.map(path));
        if (!StringUtils.equals("/", path)) {
            uri.append(HTML_EXTENSION);
        }
        if (isNotBlank(query)) {
            uri.append(QUESTION).append(query);
        } else if (isNotBlank(fragment)) {
            uri.append(HASH).append(fragment);            
        }
        return uri.toString();
    }
}
