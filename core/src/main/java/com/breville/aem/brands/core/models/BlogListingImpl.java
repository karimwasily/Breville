package com.breville.aem.brands.core.models;

import static org.apache.sling.models.annotations.DefaultInjectionStrategy.OPTIONAL;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.collections.ListUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.breville.aem.brands.core.utils.JsonUtil;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.api.PageManager;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Model(adaptables = { SlingHttpServletRequest.class, Resource.class }, adapters = {
		BlogListing.class }, defaultInjectionStrategy = OPTIONAL, resourceType = BlogListingImpl.RESOURCE_TYPE)
public class BlogListingImpl implements BlogListing {

	protected static final String RESOURCE_TYPE = "breville-brands/components/coffeehub/v-blog-listing";

	private static final String BLOG_TEMPLATE = "/conf/coffeehub/settings/wcm/templates/blog-article-new";
	private static final String FEATURED_TAG = "featured-article";
	private static final String HTML_EXTENSION = ".html";
	private static final String ARTICLE_AUTHOR = "publicationAuthor";
	private static final String ARTICLE_PUBLISHED_DATE = "publicationDate";
	private static final String ARTICLE_READ_MORE_LABEL = "articleReadMoreText";
	private static final String ARTICLE_FEATURED_RANK = "publicationRank";
	private static final String DEFAULT_FEATURED_RANK = "0";
	private static final String DEFAULT_READ_MORE = "Read more";
	private static final String DEFAULT_IMAGE = "/content/dam/coffeehub/en/us/blogs/DanYee.jpg";
	private static final String ARTICLE_IMAGE_PATH = "/jcr:content/root";
	private static final String IMAGE_REFERENCE_PROPERTY = "fileReference";
	private static final String IMAGE_ALT_PROPERTY = "alt";
	private static final String IMAGE_TITLE_PROPERTY = "jcr:title";
	private static final String CONTAINER_PATH = "/container";
	private static final String IMAGE_PATH = "/image";
	private static final String SLING_RESOURCE_PROPERTY = "sling:resourceType";
	private static final String IMAGE_COMPONENT_PATH = "breville-brands/components/image";
	private static final String TRUE = "true";

	@SlingObject
	@JsonIgnore
	private ResourceResolver resourceResolver;

	@Inject
	@JsonIgnore
	private Page currentPage;

	@ValueMapValue
	private String folderReference;

	@ValueMapValue
	@JsonRawValue
	private String showCategoryNav;

	@ValueMapValue
	@JsonIgnore
	private List<String> tags;

	@ValueMapValue
	@JsonRawValue
	private String noFullRows;

	@ValueMapValue
	@JsonRawValue
	private String noHalfRows;

	@ValueMapValue
	@JsonRawValue
	private String noThirdsRows;

	@ValueMapValue
	private String loadMoreButton;

	@ValueMapValue
	@JsonRawValue
	private String loadMoreNoOfItems;

	@ValueMapValue
	private String viewMoreHref;

	@JsonIgnore
	private PageManager pageManager;
	private List<Category> categories;
	private List<BlogPage> articles;

	@PostConstruct
	protected void setup() {
		try {
			long start = System.nanoTime();
			if (tags != null && !tags.isEmpty()) {
				getNavigationItems();
			}
			List<BlogPage> allArticles = new ArrayList<>();
			List<BlogPage> featuredArticles = new ArrayList<>();
			pageManager = resourceResolver.adaptTo(PageManager.class);
			Page rootPage = pageManager.getPage(folderReference);
			Iterator<Page> childIterator = rootPage.listChildren(new PageFilter(), true);
			while (childIterator.hasNext()) {
				Page page = (Page) childIterator.next();
				String pageTemplate = page.getTemplate().getPath();
				if (BLOG_TEMPLATE.equalsIgnoreCase(pageTemplate)
						&& !(page.getPath().equalsIgnoreCase(currentPage.getPath()))) {
					ValueMap vm = page.getProperties();
					BlogPage article = new BlogPage();
					article.setCategory( (page.getTags() != null ) ? getPageTags(page.getTags()) : new ArrayList<>() );
					article.setTitle((StringUtils.isNotBlank(page.getTitle())) ? page.getTitle() : StringUtils.EMPTY);
					article.setSummary((StringUtils.isNotBlank(page.getDescription())) ? page.getDescription()
							: StringUtils.EMPTY);
					article.setReadMore((StringUtils.isNotBlank(vm.get(ARTICLE_READ_MORE_LABEL, String.class)))
							? vm.get(ARTICLE_READ_MORE_LABEL, String.class)
							: DEFAULT_READ_MORE);
					article.setLink(page.getPath() + HTML_EXTENSION);
					Resource imageResource = getArticleImage(page);
					String articleImage, imageAlt, imageTitle;
					articleImage = imageAlt = imageTitle = StringUtils.EMPTY;
					if (null != imageResource) {
						ValueMap ImageValueMap = imageResource.getValueMap();
						articleImage = ImageValueMap.get(IMAGE_REFERENCE_PROPERTY, String.class);
						imageAlt = ImageValueMap.get(IMAGE_ALT_PROPERTY, String.class);
						imageTitle = ImageValueMap.get(IMAGE_TITLE_PROPERTY, String.class);
					}
					article.setImage((StringUtils.isNotBlank(articleImage)) ? articleImage : DEFAULT_IMAGE);
					article.setImageAltText((StringUtils.isNotBlank(imageAlt)) ? imageAlt : StringUtils.EMPTY);
					article.setImageTitle((StringUtils.isNotBlank(imageTitle)) ? imageTitle : StringUtils.EMPTY);
					article.setPublicationAuthor((StringUtils.isNotBlank(vm.get(ARTICLE_AUTHOR, String.class)))
							? vm.get(ARTICLE_AUTHOR, String.class)
							: StringUtils.EMPTY);
					article.setPublicationDate((StringUtils.isNotBlank(vm.get(ARTICLE_PUBLISHED_DATE, String.class)))
							? vm.get(ARTICLE_PUBLISHED_DATE, String.class)
							: StringUtils.EMPTY);
					article.setPublicationRank(StringUtils.EMPTY);
					article.setFeaturedArticle(StringUtils.EMPTY);
					Boolean featuredTileFlag = false;
					if (null != page.getTags()) {
						featuredTileFlag = getFeatureArticleDetails(featuredArticles, page, vm, article,
								featuredTileFlag);
					}
					if (!featuredTileFlag) {
						allArticles.add(article);
					}
				}
			}
			if (featuredArticles.size() > 1) {
				featuredArticles.sort(Comparator.comparing(BlogPage::getPublicationRank)
						.thenComparing(BlogPage::getPublicationDate).reversed());
			}
			if (allArticles.size() > 1) {
				allArticles.sort((article1, article2) -> (article2.getPublicationDate())
						.compareTo((article1.getPublicationDate())));
			}
			articles = ListUtils.union(featuredArticles, allArticles);
			long execution = System.nanoTime() - start;
			log.debug("Execution time in nanoseconds: ", execution);
		} catch (RuntimeException e) {
			log.error("BlogListingImpl: error pulling content from article page.", e);
		}
	}

	private List<Category> getPageTags(Tag[] tagArray) {
		Locale locale = currentPage.getLanguage();
		List<Category> categoryList = new ArrayList<>();
		for( Tag tag : tagArray ) {
			Category category = new Category();
			category.setTag(tag.getName());
			category.setValue(tag.getTitle(locale));
			categoryList.add(category);
		}
		return categoryList;
	}

	private Boolean getFeatureArticleDetails(List<BlogPage> featuredArticles, Page page, ValueMap vm, BlogPage article,
			Boolean featuredTileFlag) {
		Tag[] tagArray = page.getTags();
		for (Tag tag : tagArray) {
			if (tag.getName().equalsIgnoreCase(FEATURED_TAG)) {
				featuredTileFlag = true;
				article.setFeaturedArticle(TRUE);
				article.setPublicationRank((StringUtils.isNotBlank(vm.get(ARTICLE_FEATURED_RANK, String.class)))
						? vm.get(ARTICLE_FEATURED_RANK, String.class)
						: DEFAULT_FEATURED_RANK);
				featuredArticles.add(article);
				break;
			}
		}
		return featuredTileFlag;
	}

	private void getNavigationItems() {
		Locale locale = currentPage.getLanguage();
		List<Category> allCatergories = new ArrayList<>();
		for (String tagID : tags) {
			TagManager tagManager = resourceResolver.adaptTo(TagManager.class);
			Tag tag = tagManager.resolve(tagID);
			Category category = new Category();
			category.setTag(tag.getName());
			category.setValue(tag.getTitle(locale));
			allCatergories.add(category);
		}
		categories = allCatergories;
	}

	private Resource getArticleImage(Page page) {
		Resource articleImageRes = null;

		Resource res = resourceResolver.getResource(page.getPath() + ARTICLE_IMAGE_PATH);
		Iterator<Resource> resourceItr = res.listChildren();
		List<Resource> resourceList = new ArrayList<>();
		
		resourceItr.forEachRemaining(resourceList::add);
		int index = 0;
		while(index < resourceList.size()) {
			Resource resource = resourceList.get(index);
			if(resource.getResourceType().contains(IMAGE_PATH)) {
				ValueMap imageVm = resource.getValueMap();
				String imageResType = imageVm.get(SLING_RESOURCE_PROPERTY, String.class);
				if (imageResType != null && imageResType.equalsIgnoreCase(IMAGE_COMPONENT_PATH)) {
					articleImageRes = resource;
					break;
				}
			}
			else if(resource.getResourceType().contains(CONTAINER_PATH)) {
				resourceList.remove(resource);
				if(resource.hasChildren()) {
					Iterator<Resource> containerResourceItr = resource.listChildren();
					containerResourceItr.forEachRemaining(resourceList::add);
				}
			}
			else {
				index++;
			}
		}
		return articleImageRes;
	}

	@Override
	public String asJson() throws JsonProcessingException {
		return JsonUtil.getMapper().writer().writeValueAsString(this);
	}

	@Override
	@JsonIgnore
	public Boolean isEmpty() {
		return (folderReference.equals("") || folderReference == null);
	}
}
