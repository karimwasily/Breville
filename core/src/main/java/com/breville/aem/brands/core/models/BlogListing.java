package com.breville.aem.brands.core.models;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface BlogListing {
    
    public String asJson() throws JsonProcessingException;

    public Boolean isEmpty();

    @Getter @Setter
    public class Category {
        private String tag, value;
    }

    @Getter @Setter
    public class BlogPage {
        private String featuredArticle,title,summary,readMore,image,imageAltText,imageTitle,link,publicationAuthor,publicationDate, publicationRank;
        private List<Category> category;
    }
}
