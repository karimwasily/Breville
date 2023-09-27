package com.breville.aem.brands.core.models;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;


import com.google.gson.Gson;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.breville.aem.brands.core.services.BrevilleBeanzRoasterDetailsReadService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonObject;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

/**
 * @author MAzhar
 *
 */
@Getter
@ToString
@Slf4j
@Model(adaptables = { Resource.class,
		SlingHttpServletRequest.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ReactBundleConfigurationModel {

	private static final String NUM_OF_COFFEE_BAGS = "numOfCoffeeBags";

	private static final String BUNDLE_DISCOUNT_PERCENTAGE = "bundleDiscountPercentage";

	@Self
	@JsonIgnore
	private SlingHttpServletRequest request;

	@Inject
	@JsonIgnore
	private BrevilleBeanzRoasterDetailsReadService beanzRoasterReadService;

	@ValueMapValue
	private String bundleDiscountPercentage;

	@ValueMapValue
	private String numOfCoffeeBags;

	@Inject
	@Via("resource")
	@Named("questionAnswers")
	private List<QuestionAnswer> questionAnswers;

	@ValueMapValue
	private String baristaCustomClass;

	@ValueMapValue
	private String baristaQuestion;

	@Inject
	@Via("resource")
	@Named("baristaAnswers")
	private List<Answer> baristaAnswers;

	@Getter
	private List<String> objectIDList;

	@ValueMapValue
	private String indexName;

	@ValueMapValue
	private String limit;

	@Inject
	@JsonIgnore
	private Resource resource;


	/**
	 * @return
	 * @throws JsonProcessingException
	 */
	public String asJson() throws JsonProcessingException {
		log.debug("ReactBundleConfiguration :: {} ");
		JsonObject jsonObj = new JsonObject();
		try {
			jsonObj = beanzRoasterReadService.refreshRoastersDetailsCache(request.getResourceResolver());
			addJsonProperties(jsonObj);
			JsonObject qa = new JsonObject();
			qa.add("questionAnswers", new Gson().toJsonTree(questionAnswers).getAsJsonArray());

			JsonObject productsList = new JsonObject();
			productsList.add("objectIDList",new Gson().toJsonTree(objectIDList).getAsJsonArray());
			productsList.addProperty("indexName",indexName);
			productsList.addProperty("limit",limit);

			JsonObject barista = new JsonObject();
			barista.addProperty("customClass",baristaCustomClass);
			barista.addProperty("question",baristaQuestion);
			barista.add("answers",new Gson().toJsonTree(baristaAnswers).getAsJsonArray());
			barista.add("productsList",productsList);

			jsonObj.add("questionnaire", qa);
			jsonObj.add("baristaChoiceQuestion",barista);
		} catch (Exception e) {
			log.error("Error while gettiing ReactBundleConfiguration  :: {}", e.getMessage());
		}
		return jsonObj.toString();
	}


	/**
	 * @param jsonObj
	 */
	private void addJsonProperties(JsonObject jsonObj) {
		jsonObj.addProperty(BUNDLE_DISCOUNT_PERCENTAGE, Objects.isNull(this.bundleDiscountPercentage) ? 20
				: Integer.parseInt(this.bundleDiscountPercentage));
		jsonObj.addProperty(NUM_OF_COFFEE_BAGS,
				Objects.isNull(this.numOfCoffeeBags) ? 12 : Integer.parseInt(this.numOfCoffeeBags));
	}

	@PostConstruct
	protected void setup() {
		//get the multifield values in List<String>
		objectIDList = Optional.ofNullable(this.resource.hasChildren() ? this.resource.getChild("objectIDList") : null)
				.map(Resource::getChildren).map(Iterable::spliterator).map(s -> StreamSupport.stream(s, false))
				.orElseGet(Stream::empty).map(res -> res.getValueMap().get("text", String.class))
				.collect(Collectors.toList());
		log.debug("values {}, {}, {}", objectIDList, indexName, limit);
	}
}
