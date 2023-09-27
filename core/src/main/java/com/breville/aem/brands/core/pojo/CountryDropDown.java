package com.breville.aem.brands.core.pojo;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Azhar
 *
 */
@Setter
@Getter
public class CountryDropDown {

    /** The label. */
    private String label;

    /** The value. */
    private String value;

    /** The country label. */
    private String countryLabel;

    /** The default language. */
    private String defaultLanguage;

    /** The default language url. */
    private String defaultLanguageUrl;

    /** The language. */
    private List<Language> language;
}
