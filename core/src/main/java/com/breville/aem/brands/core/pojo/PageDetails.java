package com.breville.aem.brands.core.pojo;
import java.util.ArrayList;
import java.util.List;

/**
 * The PageDetails DTO class.
 */
public class PageDetails {

    /** The label. */
    private String label;
    
    /** The label. */
    private String link;

	/** The link details. */
    private List<Link> linkDetails = new ArrayList<>();

    /**
     * Gets the label.
     *
     * @return the label
     */
    public String getLabel() {
        return label;
    }

    /**
     * Sets the label.
     *
     * @param label
     *            the new label
     */
    public void setLabel(String label) {
        this.label = label;
    }

    /**
     * Gets the link details.
     *
     * @return the link details
     */
    public List<Link> getLinkDetails() {
        return new ArrayList<>(linkDetails);
    }

    /**
     * Sets the link details.
     *
     * @param linkDetails
     *            the new link details
     */
    public void setLinkDetails(List<Link> linkDetails) {
        this.linkDetails = new ArrayList<>(linkDetails);
    }
    
    /**
     * Gets the page link
     * 
     * @return
     */
    public String getLink() {
		return link;
	}

	/**
	 * Sets the page link
	 * 
	 * @param link
	 */
	public void setLink(String link) {
		this.link = link;
	}

}
