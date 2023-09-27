package com.breville.aem.brands.core.models;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.breville.aem.brands.core.utils.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.extern.slf4j.Slf4j;

/**
 * @author PradeepMC
 *
 */
@Slf4j
@Model(adaptables = SlingHttpServletRequest.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class BrevilleUtilModel {

	/**
	 * Injects input param from Sightly
	 */
	@Inject
	private String formatStr;

	/**
	 * This method gets the raw string thats returned from CT with newline char and
	 * as a single string and converts to required format.
	 * 
	 * @return formatted String
	 */
	public String getFormatText() {
		log.debug("String to be formatted String :: {} ", formatStr);
		StringBuffer strBuffer = new StringBuffer();
		if (Objects.nonNull(formatStr)) {
			if (formatStr.contains(":")) {
				String[] splitText = formatStr.split(ApplicationConstants.COLON);
				formatStr = splitText.length > 1 ? splitText[1] : StringUtils.EMPTY;
			}

			String[] array = formatStr.split("\\\\n");
			for (int i = 0; i < array.length; i++) {
				String lineText = array[i];				
				if (StringUtils.isNotEmpty(lineText)) {
					strBuffer.append("<li class=\"cmp-product-information__detail-feature-item\">")
							.append(lineText.replaceAll("\\.$", "")).append("</li>");
				}
			}
		}
		return strBuffer.toString();
	}
	
	public boolean isEven() {
		log.debug("Check if number is even :: {} ", formatStr);
		if (Objects.nonNull(formatStr)) {
			int imageIndex = Integer.parseInt(formatStr);
			
			if((imageIndex % 2) == 0)
				return true;
		}
		return false;
	}
	public String getFormatURL() {
		if (Objects.nonNull(formatStr)) {
			if (formatStr.startsWith("/content/breville/") && !formatStr.contains(".html")) {
				return formatStr + ".html";
			}
			return formatStr;
		}
		return StringUtils.EMPTY;
	}
	
	public String getIdJson() throws JsonProcessingException {
		if (Objects.nonNull(formatStr)) {
			Map<String, String> jsonMap = new HashMap<String, String>();
			jsonMap.put(ApplicationConstants.ID, formatStr);
			return JsonUtil.getMapper().writer().writeValueAsString(jsonMap);
		}
		return StringUtils.EMPTY;
	}
}
