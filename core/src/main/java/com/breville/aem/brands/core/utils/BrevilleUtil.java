package com.breville.aem.brands.core.utils;

import java.util.Locale;
import java.util.ResourceBundle;

import org.apache.sling.api.SlingHttpServletRequest;

import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;

/**
 * @author PradeepMC
 *
 */
public final class BrevilleUtil {

	public static I18n getI18n(Page currentPage, SlingHttpServletRequest request) {
		Locale pageLocale = currentPage.getLanguage(true);
		ResourceBundle bundle = request.getResourceBundle(pageLocale);
		return new I18n(bundle);
	}
}
