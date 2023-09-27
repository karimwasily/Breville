package com.breville.aem.brands.core.models;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.annotation.PostConstruct;
import javax.inject.Inject;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.breville.aem.brands.core.constant.ApplicationConstants;
import com.day.cq.wcm.api.Page;
import lombok.Getter;

@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, resourceType = "breville-brands/components/custombreadcrumb", defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class CustombreadcrumbModel {

	private static final String CONTENT_BREVILLE_BRANDS_LANGUAGE_MASTERS_EN_OUR_ROASTERS = "/content/beanz/us/en/our-roasters";
	private static final String HYPHEN = "-";
	private static final String SPACE = " ";
	private static final String PRODUCT_PAGE = "product-page";
	private static final Logger LOGGER = LoggerFactory.getLogger(CustombreadcrumbModel.class);

	@Inject
	@Self
	private BeanzProduct beanzProductData;

	@ValueMapValue
	private int startLevel = 3;

	@Inject
	private Page currentPage;

	@ValueMapValue
	private Long skipLevel = 0L;

	private String roasterUrl;

	@ValueMapValue
	private String roasterParentUrl;

	@Getter
	private List<Page> breadcrumbList = new ArrayList<>();

	/**
	 * Init method to be invoked after all injections to set class variables.
	 */
	@PostConstruct
	public void init() {
		try {
			long lastLevel = currentPage.getDepth() - 1L;
			while (startLevel <= lastLevel) {
				if (startLevel != skipLevel) {
					Page trailPage = currentPage.getAbsoluteParent(startLevel);
					breadcrumbList.add(trailPage);
					if (trailPage.getName().equalsIgnoreCase(PRODUCT_PAGE) && startLevel == lastLevel
							&& beanzProductData.getVendorName() != null) {
						buildRoasterUrl();
					}
				}
				startLevel++;
			}
		} catch (Exception e) {
			LOGGER.error("error occured in init() {}", e.getMessage());
		}
	}

	/**
	 * buildRoasterUrl
	 */
	private void buildRoasterUrl() {
		try {
			if (Objects.isNull(this.roasterParentUrl)) {
				this.roasterParentUrl = CONTENT_BREVILLE_BRANDS_LANGUAGE_MASTERS_EN_OUR_ROASTERS;
			}
			this.roasterUrl = this.roasterParentUrl + ApplicationConstants.SLASH
					+ beanzProductData.getVendorName().replace(SPACE, HYPHEN).toLowerCase();
		} catch (Exception e) {
			LOGGER.error("error occured in buildRoasterUrl() {}", e.getMessage());
		}
	}

	/**
	 * @return roasterUrl
	 */
	public String getRoasterUrl() {
		return roasterUrl;
	}

}
