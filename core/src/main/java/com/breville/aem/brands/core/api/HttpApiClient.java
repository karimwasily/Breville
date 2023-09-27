/**
 * 
 */
package com.breville.aem.brands.core.api;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustSelfSignedStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.utils.CommercetoolUtils;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Slf4j
@Component(service = HttpApiClient.class, immediate = true,enabled = true)
public class HttpApiClient {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(HttpApiClient.class);

	public HttpResponse getProduct(final String encodedQueryString,final String ctapiUrl, final String ctProjectKey, final String clientId, final String clientSecret, final String scope) {

		try {

			HttpGet apiCall = new HttpGet(
					ctapiUrl+ctProjectKey+"/graphql?query=" + encodedQueryString);
			String accessToken = "Bearer " + getAccessToken(clientId,clientSecret,scope);
			LOGGER.info("accessToken {}", accessToken);
			apiCall.setHeader(HttpHeaders.AUTHORIZATION, accessToken);
			CloseableHttpClient httpclient = getHttpClient();

			return httpclient.execute(apiCall);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return null;
	}

	private CloseableHttpClient getHttpClient()
			throws NoSuchAlgorithmException, KeyStoreException, KeyManagementException {
		SSLContextBuilder builder = new SSLContextBuilder();
		builder.loadTrustMaterial(null, new TrustSelfSignedStrategy());
		SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(builder.build());
		HttpClientBuilder clientbuilder = HttpClients.custom().setSSLSocketFactory(sslsf);
		return clientbuilder.build();
	}

	public String getAccessToken(String clientId,String clientSecretKey, String scope) {
		LOGGER.info("TokenManagerImpl getToken");
		String auth = clientId+":"+clientSecretKey;
		String authCode = CommercetoolUtils.basicAuthCode(auth);
		HttpResponse httpResponse = getAuthAccessToken(authCode,scope);

		String json;
		try {
			json = EntityUtils.toString(httpResponse.getEntity());
			JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
			String accessToken = "";
			if (jsonObject.has("access_token")) {
				accessToken = jsonObject.get("access_token").getAsString();
				LOGGER.debug("access token {}", accessToken);
				return accessToken;
			}

		} catch (ParseException | IOException e) {
			LOGGER.error("ERROR: while getAccessToken: {}", e.getMessage());
		}

		return null;
	}

	public HttpResponse getAuthAccessToken(final String authHeader, String scope) {

		try {
			String encodedScope = CommercetoolUtils.encodeQuery(scope);
			HttpPost httppost = new HttpPost(
					"https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials&scope="+encodedScope);
			httppost.setHeader(HttpHeaders.AUTHORIZATION, authHeader);
			CloseableHttpClient httpclient = getHttpClient();

			return httpclient.execute(httppost);
		} catch (IOException | NoSuchAlgorithmException | KeyStoreException | KeyManagementException e) {
			LOGGER.error("ERROR: while getting access token: {}", e.getMessage());
		}

		return null;
	}
}
