package com.breville.aem.brands.core.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.breville.aem.brands.core.pojo.Country;
import com.breville.aem.brands.core.services.impl.GenericListServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

/**
 * @author Yogiraj.Mahajan
 *
 */
@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CheckoutModel extends BaseModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(CheckoutModel.class);

	private String shippingCountryStateJson;

	private List<Country> shippingCountryStateList;

	private String countryCode = "us";

	@OSGiService
	private GenericListServiceImpl genericListService;

	@PostConstruct
	public void init() {

		final List<Country> selectedShippingStateList = genericListService.getCountriesAndStateList();
		shippingCountryStateList = new ArrayList<>();
		if (Objects.nonNull(selectedShippingStateList)) {
			updateShippingStateList(selectedShippingStateList);

		}
		populateJsonShippingCountryState();
	}

	private void populateJsonShippingCountryState() {
		if (Objects.nonNull(shippingCountryStateList) && !shippingCountryStateList.isEmpty()) {
			final ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			try {
				// this will provide json countryStateList in json format
				shippingCountryStateJson = ow.writeValueAsString(shippingCountryStateList);
			} catch (final JsonProcessingException e) {
				LOGGER.error(" JsonProcessingException Error while parshing the shippingCountryStateList.{} ", e);
				shippingCountryStateJson = StringUtils.EMPTY;
			}
		} else {
			LOGGER.error("shippingCountryStateList is null or empty ");
			shippingCountryStateJson = StringUtils.EMPTY;
		}
	}

	private void updateShippingStateList(final List<Country> selectedBillingStateList) {
		for (int i = 0; i < selectedBillingStateList.size(); i++) {

			final String shippingCountryCode = selectedBillingStateList.get(i).getShippingCountryCode();

			LOGGER.debug("Shipping country code :{} for billing country :{}", shippingCountryCode, countryCode);
			if (countryCode.contains(shippingCountryCode)) {
				shippingCountryStateList.add(selectedBillingStateList.get(i));
			} else {
				LOGGER.debug("Billing not applicable from this country:{} to this country:{}", countryCode,
						shippingCountryCode);
			}
			LOGGER.debug("Billing is applicable from this country:{} to this country:{}", countryCode,
					shippingCountryCode);
		}
	}

	public String getShippingCountryStateJson() {
		return shippingCountryStateJson;
	}

	public List<Country> getShippingCountryStateList() {
		return shippingCountryStateList;
	}

	public String getCountryCode() {
		return countryCode;
	}

}
