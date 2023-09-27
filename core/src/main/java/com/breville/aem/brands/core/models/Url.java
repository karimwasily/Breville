package com.breville.aem.brands.core.models;


public class Url {

    private String loc;
    private String lastMod;
    private String changfreq;
    private String priority;
    private String pageTitle;
    private String pubDate;

    //Getters and setters

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public void setLastMod(String lastMod) {
        this.lastMod = lastMod;
    }

    public String getLoc() {
        return loc;
    }

    public String getLastMod() {
        return lastMod;
    }

    public String getChangfreq() {
        return changfreq;
    }

    public void setChangfreq(String changfreq) {
        this.changfreq = changfreq;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public String getPubDate() {
        return pubDate;
    }

    public void setPubDate(String pubDate) {
        this.pubDate = pubDate;
    }

}
