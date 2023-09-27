package com.breville.aem.brands.core.services.impl;

import java.util.HashMap;
import java.util.Map;
import javax.jcr.Session;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.breville.aem.brands.core.constant.ApplicationConstants.SubService;
import com.breville.aem.brands.core.services.SessionAccessor;

/**
 * The Implementation Class for SessionAccessor interface.
 */
/**
 * 
 * @author Yogiraj.Mahajan
 *
 */
@Component(service = SessionAccessor.class, immediate = true)
public class SessionAccessorImpl implements SessionAccessor {
    /**
     * Reference to ResourceResolverFactory.
     */
    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    /**
     * Logger Variable.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(SessionAccessorImpl.class);

    /**
     * Logger user session Message.
     */
    private static final String LOGGER_USER_ERROR_MESSAGE = "Could not get user specific session. Please check the "
            + "username settings in SearchAccessolImpl service config.";

    /*
     * (non-Javadoc)
     * 
     * @see com.sapient.platform.iea.aem.core.accessors.api.SessionAccessor# getSession(java.util.Map)
     */
    @Override
    public Session getSession(SubService subServiceName) {
        LOGGER.info("Getting the  session using subservice :- " + subServiceName);
        final Map<String, Object> param = new HashMap<>();
        param.put(ResourceResolverFactory.SUBSERVICE, subServiceName.getValue());
        ResourceResolver userResourceResolver = null;
        Session session = null;
        try {
            LOGGER.debug("Starting impersonation.");
            userResourceResolver = resourceResolverFactory.getServiceResourceResolver(param);
            session = userResourceResolver.adaptTo(Session.class);
            LOGGER.debug("Impersonation done.");
        } catch (LoginException e) {
            LOGGER.error(LOGGER_USER_ERROR_MESSAGE, e);
        }

        return session;
    }

    /**
     * It returns a new ResourceResolver instance with administrative privileges based on the SubService name. It also
     * use further configuration taken from the given authenticationInfo map. These authenticationInfo map setting are
     * bind with configuration setting done in 'Apache Sling Service User Mapper Service' in OSGI Config.
     *
     * @param subServiceName
     *            A map of service information which may be used by the implementation to parameterize how the resource
     *            resolver is created.
     * @return A ResourceResolver with appropriate permissions to execute the service.
     * @throws LoginException
     *             the login exception
     * @throw LoginException - If an error occurs creating the new ResourceResolver for the service represented by the
     *        calling bundle.
     */
    @Override
    public ResourceResolver getServiceResourceResolver(SubService subServiceName) throws LoginException {
        LOGGER.info("Getting the service resource resolver using subservice :- " + subServiceName);

        ResourceResolver resourceResolver = null;
        final Map<String, Object> param = new HashMap<String, Object>();
        String subServiceValue = null;
        if (subServiceName != null) {
            subServiceValue = subServiceName.getValue();
            param.put(ResourceResolverFactory.SUBSERVICE, subServiceValue);
        }
        resourceResolver = resourceResolverFactory.getServiceResourceResolver(param);
        final StackTraceElement stacktrace = Thread.currentThread().getStackTrace()[1];

        LOGGER.debug("Successfully created resource Resolver object for thread :- " + Thread.currentThread().getId()
                + " where class name : " + stacktrace.getClassName() + " and method name : "
                + stacktrace.getMethodName() + " ServiceName : " + subServiceName + "subService Value : "
                + subServiceValue);

        return resourceResolver;
    }

    /**
     * It returns a new Session object based on the resource Resolver provided. The session object then can be used to
     * fetch user info or any other details. Based on the service Name provided to the resource Resolver privileges
     * These authenticationInfo map setting are bind with configuration setting done in 'Apache Sling Service User
     * Mapper Service' in OSGI Config.
     * 
     * @param resource
     *            A map of service information which may be used by the implementation to parameterize how the resource
     *            resolver is created.
     * @return A ResourceResolver with appropriate permissions to execute the service.
     * 
     */
    @Override
    public Session getServiceSession(ResourceResolver resource) {

        Session session = null;
        if (resource != null && resource.isLive()) {
            session = resource.adaptTo(Session.class);

            final StackTraceElement stacktrace = Thread.currentThread().getStackTrace()[1];
            LOGGER.info("Successfully created session: " + session + " for thread :- " + Thread.currentThread().getId()
                    + " where class name is : " + stacktrace.getClassName() + " and method name is : "
                    + stacktrace.getMethodName());

        } else {
            LOGGER.error("The resource resolver object was either Null or not alive.Enable to create a session object. "
                    + "Please check the resolver Object");
        }
        return session;
    }

    /**
     * It returns a new Session object based on the resource Resolver provided. The session object then can be used to
     * fetch user info or any other details. Based on the service Name provided to the resource Resolver privileges
     * These authenticationInfo map setting are bind with configuration setting done in 'Apache Sling Service User
     * Mapper Service' in OSGI Config.
     *
     * @param session
     *            the session
     * @return boolean
     */
    @Override
    public boolean closeSession(Session session) {
        boolean flag = false;

        if (session != null && session.isLive()) {
            session.logout();
            flag = true;
            final StackTraceElement stacktrace = Thread.currentThread().getStackTrace()[1];
            LOGGER.info("Successfully Closed the session: " + session + " for thread :- "
                    + Thread.currentThread().getId() + " where className : " + stacktrace.getClassName()
                    + " and method : " + stacktrace.getMethodName());
        } else {
            LOGGER.warn("Session :- " + session + " not active anymore. It is already closed. Please check. ");
        }
        return flag;
    }

    /**
     * It returns a new Session object based on the resource Resolver provided. The session object then can be used to
     * fetch user info or any other details. Based on the service Name provided to the resource Resolver privileges
     * These authenticationInfo map setting are bind with configuration setting done in 'Apache Sling Service User
     * Mapper Service' in OSGI Config.
     *
     * @param resource
     *            the resource
     * @return A ResourceResolver with appropriate permissions to execute the service.
     */
    @Override
    public boolean closeResourceResolver(ResourceResolver resource) {
        boolean flag = false;

        if (null != resource && resource.isLive()) {
            resource.close();
            flag = true;
            final StackTraceElement stacktrace = Thread.currentThread().getStackTrace()[1];
            LOGGER.debug("Successfully Closed the resource Resolver for thread :- " + Thread.currentThread().getId()
                    + " where className : " + stacktrace.getClassName() + " and method : "
                    + stacktrace.getMethodName());
        } else {
            LOGGER.warn("The resource Resolver object is either Null or not alive. "
                    + "Unable to close the object. Please check the configuration. ");
        }
        return flag;
    }
}
