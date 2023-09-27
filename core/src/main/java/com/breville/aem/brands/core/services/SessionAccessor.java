package com.breville.aem.brands.core.services;

import javax.jcr.Session;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

import com.breville.aem.brands.core.constant.ApplicationConstants.SubService;

/**
 * The Interface SessionAccessor.
 */
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
public interface SessionAccessor {

    /**
     * Method to get JCR session for given sub service.
     * 
     * 
     * @param subServiceName
     *            the subservice name.
     * @return Session the JCR Session
     */
    Session getSession(SubService subServiceName);

    /**
     * Method to get JCR session from ResourceResolver.
     * 
     * @param resource
     *            the resource resolver
     * @return Session the JCR Session
     */
    Session getServiceSession(ResourceResolver resource);

    /**
     * Method to close JCR session.
     * 
     * @param session
     *            the JCR session
     * @return boolean weather session is closed or not.
     */
    boolean closeSession(Session session);

    /**
     * Method to close given ResourceResolver.
     * 
     * @param resource
     *            the resource resolver
     * @return boolean weather ResourceResolver is closed or not.
     */
    boolean closeResourceResolver(ResourceResolver resource);

    /**
     * Method to get ResourceResolver for the given subservice.
     * 
     * @param subServiceName
     *            the subservice name
     * @return resourceResolver the resource resolver
     * @throws LoginException
     *             the login exception
     */
    ResourceResolver getServiceResourceResolver(SubService subServiceName) throws LoginException;

}
