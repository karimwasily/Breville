package com.breville.aem.brands.core.services;

import java.util.List;

import com.breville.aem.brands.core.pojo.Country;

/**
 * 
 * @author Yogiraj.Mahajan
 *
 */

public interface GenericListService {

    /**
     * Gets the countries and state list.
     *
     * @param currentCountryCode
     *            the current country code
     * @return the countries and state list
     */
    List<Country> getCountriesAndStateList(String currentCountryCode);

    /**
     * Gets the countries and state list of shipping address.
     *
     * @param currentCountryCode
     *            the current country code
     * @return the countries and state list
     */
    List<Country> getShippingCountriesAndStateList(String currentCountryCode);

    /**
     * Gets the countries and state list.
     *
     * @return the countries and state list
     */
    List<Country> getCountriesAndStateList();

    /**
     * Gets the countries and state list for shipping address.
     *
     * @return the countries and state list
     */
    List<Country> getShippingCountriesStateList();


}

