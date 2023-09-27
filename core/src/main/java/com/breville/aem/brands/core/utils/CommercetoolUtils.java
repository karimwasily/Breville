package com.breville.aem.brands.core.utils;

import static java.lang.String.format;
import static java.util.stream.Collectors.joining;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Set;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.extern.slf4j.Slf4j;

/**
 * All commercetool utility methods are implemented in this class
 * 
 * @author PradeepMC
 *
 */
@Slf4j
public class CommercetoolUtils {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CommercetoolUtils.class);
	
	public static String createWhereQuery( final List<String> keys) {
		// The where in the graphql query should look like this in the end => `where:
		// "key in
		// (\"key1\",
		// \"key2\")"`
		// So we need an escaping backslash before the quote. So to add this:
		// We need 1 backslash (2 in java) to escape the quote in the graphql query.
		// We need 2 backslashes (4 in java) to escape the backslash in the JSON payload
		// string.
		// We need 1 extra backslash to escape the quote in the java string
		// hence: 7 backslashes:
		final String backslashQuote = "\\\"";
		final String commaSeparatedKeys = keys.stream().filter(key -> !isBlank(key))
				.collect(joining(format("%s, %s", backslashQuote, backslashQuote), backslashQuote, backslashQuote));
		return createWhereQuery(commaSeparatedKeys);
	}
	
	private static String createWhereQuery(final String commaSeparatedKeys) {
		return format("\"key in (%s)\"", commaSeparatedKeys);
	}
	
	public static String createWhereQueryForID( final Set<String> keys) {
		// The where in the graphql query should look like this in the end => `where:
		// "id in
		// (\"id\",
		// \"id2\")"`
		// So we need an escaping backslash before the quote. So to add this:
		// We need 1 backslash (2 in java) to escape the quote in the graphql query.
		// We need 2 backslashes (4 in java) to escape the backslash in the JSON payload
		// string.
		// We need 1 extra backslash to escape the quote in the java string
		// hence: 7 backslashes:
		final String backslashQuote = "\"";
		final String commaSeparatedKeys = keys.stream().filter(key -> !isBlank(key))
				.collect(joining(format("%s, %s", backslashQuote, backslashQuote), backslashQuote, backslashQuote));
		return createWhereQueryForID(commaSeparatedKeys);
	}
	
	private static String createWhereQueryForID(final String commaSeparatedKeys) {
		return format("id in (%s)", commaSeparatedKeys);
	}
	
	public static String encodeQuery(String query) {
		 try {  
             return URLEncoder.encode(query, "UTF-8" );  
        } catch (UnsupportedEncodingException e) {  
        	LOGGER.error("Issue while encoding {}",e.getMessage());  
        }  
		return "";
	}
	
	public static String basicAuthCode(final String auth) {
		byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(StandardCharsets.ISO_8859_1));
		return "Basic " + new String(encodedAuth);
	}
	
	public static String base64Encode(final String str) {
		byte[] endodedStr = Base64.encodeBase64(str.getBytes(StandardCharsets.ISO_8859_1));
		return new String(endodedStr);
	}
	
	public static String getJsonResponse(final String str) {
		byte[] endodedStr = Base64.encodeBase64(str.getBytes(StandardCharsets.ISO_8859_1));
		return new String(endodedStr);
	}
}
