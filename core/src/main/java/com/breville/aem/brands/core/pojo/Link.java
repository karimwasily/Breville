package com.breville.aem.brands.core.pojo;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * The Link DTO class.
 */
public class Link {

    /** The label. */
    @SerializedName("label")
    @Expose
    private String label;

    /** The url. */
    @SerializedName("url")
    @Expose
    private String url;
    
    /** The showPopUp. */
    @SerializedName("showPopUp")
    @Expose
    private String showPopUp;

    /** The is active. */
    @Expose
    private boolean isActive;

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
     * Gets the url.
     *
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the url.
     *
     * @param url
     *            the new url
     */
    public void setUrl(String url) {
        this.url = url;
    }
    
    /**
     * Gets the showPopUp.
     *
     * @return the showPopUp
     */
    public String getShowPopUp() {
        return showPopUp;
    }

    /**
     * Sets the showPopUp.
     *
     * @param showPopUp
     *            the new showPopUp
     */
    public void setShowPopUp(String showPopUp) {
        this.showPopUp = showPopUp;
    }
    
    /**
     * Gets the checks if is active.
     *
     * @return the checks if is active
     */
    public boolean getIsActive() {
        return isActive;
    }

    /**
     * Sets the checks if is active.
     *
     * @param isActive
     *            the new checks if is active
     */
    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}
