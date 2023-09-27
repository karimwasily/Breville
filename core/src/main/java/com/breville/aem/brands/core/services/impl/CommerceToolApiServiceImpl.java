/**
 * 
 */
package com.breville.aem.brands.core.services.impl;

import java.util.Objects;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.api.HttpApiClient;
import com.breville.aem.brands.core.services.CommerceToolApiService;
import com.breville.aem.brands.core.utils.CommercetoolUtils;

import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Slf4j
@Component(service = CommerceToolApiService.class, immediate = true, enabled = true)
public class CommerceToolApiServiceImpl implements CommerceToolApiService {
	private static final Logger LOGGER = LoggerFactory.getLogger(CommerceToolApiServiceImpl.class);
	@Reference
	HttpApiClient httpApiClient;
	
	@Reference
	private CommerceToolsConfigurationsImpl ctConfig;

	@Override
	public String getProductData(final String productKey, final String locale, final String brand) {
		String query = null;

		if (StringUtils.equalsIgnoreCase(brand, "breville")) {
			query = getBrevilleProductQuery(productKey, locale);
		} else if (StringUtils.equalsIgnoreCase(brand, "beanzSubscription")) {
			query = getBeanzSubscriptionQuery();
		} else if (StringUtils.equalsAnyIgnoreCase(brand, "discoveryBeanz")) {
			query = getDiscoveryBeanzQuery(productKey, locale);
		} else {
			query = getBeanzProductQuery(productKey, locale);
		}
		LOGGER.info("query :  {}", query);

		try {
			if (null == httpApiClient) {
				httpApiClient = new HttpApiClient();
			}
			String quertString = CommercetoolUtils.encodeQuery(query);
			LOGGER.info("encoded Query string : {}", quertString);
			if(Objects.nonNull(ctConfig)) {
				HttpResponse httpResponse = httpApiClient.getProduct(quertString,ctConfig.getApiURL(),ctConfig.getProjectKey(),ctConfig.getClientId(),ctConfig.getClientSecret(),ctConfig.getScope());
				if (httpResponse.getStatusLine().getStatusCode() == 200) {
					return EntityUtils.toString(httpResponse.getEntity());
				} else {
					LOGGER.error("could not get reponse from httpclient {}", httpResponse.getStatusLine());
				}
			}else {
				LOGGER.error("CommerceTools configuration is null");
			}
		} catch (Exception e) {
			LOGGER.error("Error :: {}", e.getMessage());
		}
		return null;
	}
	
	private String getDiscoveryBeanzQuery(String skuVariable, String locale) {
		return "query ProductDetails {\r\n"
				+ "  products(where: \"masterData(current(slug("+ locale +" in  (\\\"" 
				+ skuVariable + "\\\"))))\") {\r\n"
				+ "    total\r\n" + "    results {\r\n" + "      skus\r\n" + "      masterData {\r\n"
				+ "        current {\r\n" + "          name(locale: \"en-US\")\r\n"
				+ "          description(locale: \"en-US\")\r\n" + "          slug(locale: \"en-US\")\r\n"
				+ "          masterVariant {\r\n" + "            key\r\n" + "            sku\r\n"
				+ "            prices {\r\n" + "              ...ProductPrices\r\n" + "            }\r\n"
				+ "            images {\r\n" + "              ...ProductImages\r\n" + "            }\r\n"
				+ "            ...RawAttributes\r\n" + "          }\r\n" + "          variants {\r\n"
				+ "            key\r\n" + "            sku\r\n" + "            prices {\r\n"
				+ "              ...ProductPrices\r\n" + "            }\r\n" + "            ...RawAttributes\r\n"
				+ "          }\r\n" + "        }\r\n" + "      }\r\n" + "    }\r\n" + "  }\r\n" + "}\r\n" + "\r\n"
				+ "fragment ProductPrices on ProductPrice {\r\n" + "  value {\r\n" + "    type\r\n"
				+ "    currencyCode\r\n" + "    centAmount\r\n" + "    fractionDigits\r\n" + "  }\r\n" + "  country\r\n"
				+ "  channel {\r\n" + "    name(locale: \"en-US\")\r\n" + "  }\r\n" + "}\r\n" + "\r\n"
				+ "fragment ProductImages on Image {\r\n" + "  label\r\n" + "  url\r\n" + "}\r\n" + "\r\n"
				+ "fragment RawAttributes on ProductVariant {\r\n" + "  attributesRaw {\r\n" + "    name\r\n"
				+ "    value\r\n" + "  }\r\n" + "}\r\n" + "";
	}


	private String getBeanzSubscriptionQuery() {
		return "query customobject {\r\n"
				+ "            customObjects(container:\"subscription-plans\",where: \"value(planId in  (\\\"PLAN_WEEKLY_4\\\",\\\"PLAN_WEEKLY_3\\\",\\\"PLAN_WEEKLY_2\\\",\\\"PLAN_WEEKLY_1\\\"))\") {\r\n"
				+ "            results {\r\n" + "            id\r\n" + "            value\r\n" + "            }\r\n"
				+ "            }\r\n" + "        }";
	}

	private String getBeanzProductQuery(String skuVariable, String locale) {
		return "query ProductDetails {\r\n" + "  products(where: \"masterData(current(slug(" + locale + " in  (\\\""
				+ skuVariable + "\\\"))))\") {\r\n" + "    total\r\n" + "    results {\r\n" + "      skus\r\n"
				+ "      masterData {\r\n" + "        current {\r\n" + "          name(locale: \"en-US\")\r\n"
				+ "          description(locale: \"en-US\")\r\n" + "          slug(locale: \"en-US\")\r\n"
				+ "          masterVariant {\r\n" + "            key\r\n" + "            sku\r\n"
				+ "            prices {\r\n" + "              ...ProductPrices\r\n" + "            }\r\n"
				+ "            images {\r\n" + "              ...ProductImages\r\n" + "            }\r\n"
				+ "            ...RawAttributes\r\n" + "          }\r\n" + "          variants {\r\n"
				+ "            key\r\n" + "            sku\r\n" + "            ...RawAttributes\r\n" + "          }\r\n"
				+ "        }\r\n" + "      }\r\n" + "    }\r\n" + "  }\r\n" + "}\r\n" + "\r\n"
				+ "fragment ProductPrices on ProductPrice {\r\n" + "  value {\r\n" + "    type\r\n"
				+ "    currencyCode\r\n" + "    centAmount\r\n" + "    fractionDigits\r\n" + "  }\r\n" + "  country\r\n"
				+ "  channel {\r\n" + "    name(locale: \"en-US\")\r\n" + "  }\r\n" + "}\r\n" + "\r\n"
				+ "fragment ProductImages on Image {\r\n" + "  label\r\n" + "  url\r\n" + "}\r\n" + "\r\n"
				+ "fragment RawAttributes on ProductVariant {\r\n" + "  attributesRaw {\r\n" + "    name\r\n"
				+ "    value\r\n" + "  }\r\n" + "}\r\n" + "";
	}

	private String getBrevilleProductQuery(String skuVariable, String locale) {
		return "query ProductDetails {\r\n" + "  products(where: \"key in (\\\"" + skuVariable + "\\\")\") {\r\n"
				+ "    results {\r\n" + "      key\r\n" + "      skus\r\n" + "      productType {\r\n"
				+ "        name  \r\n" + "        key\r\n" + "      }      \r\n" + "      masterData {\r\n"
				+ "        published\r\n" + "        current {          \r\n" + "          name(locale: \"" + locale
				+ "\")\r\n" + "          description(locale: \"" + locale + "\")\r\n" + "          slug(locale: \""
				+ locale + "\")\r\n" + "categories {\r\n" +"name (locale: \""+locale+"\")\r\n"
				+ "key\r\n }\r\n"
				+ "          masterVariant {\r\n" + "            key\r\n" + "            sku\r\n"
				+ "            prices {\r\n" + "              ...ProductPrices\r\n" + "            }\r\n"
				+ "            images {\r\n" + "              ...ProductImages\r\n" + "            }\r\n"
				+ "            ...RawAttributes\r\n" + "          }\r\n" + "          variants {\r\n"
				+ "            key\r\n" + "            sku\r\n" + "            prices {\r\n"
				+ "              ...ProductPrices\r\n" + "            }\r\n" + "            images {\r\n"
				+ "              ...ProductImages\r\n" + "            }\r\n" + "            ...RawAttributes\r\n"
				+ "          }\r\n" + "        }\r\n" + "      }\r\n" + "    }\r\n" + "  }\r\n" + "}\r\n" + "\r\n"
				+ "fragment ProductPrices on ProductPrice {\r\n" + "  value {\r\n" + "    type\r\n"
				+ "    currencyCode\r\n" + "    centAmount\r\n" + "    fractionDigits\r\n" + "  }\r\n" + "  country\r\n"
				+ "  channel {\r\n" + "    name (locale: \"" + locale + "\")\r\n" + "  }" + "}\r\n" + "\r\n"
				+ "fragment ProductImages on Image {\r\n" + "  label\r\n" + "  url\r\n" + "}\r\n" + "\r\n"
				+ "fragment RawAttributes on ProductVariant {\r\n" + "  attributesRaw {\r\n" + "    name\r\n"
				+ "    value\r\n" + "  }\r\n" + "}";
	}

}
