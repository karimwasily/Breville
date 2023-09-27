package com.breville.aem.brands.core.models;

import javax.inject.Inject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MessageProvider {
	@Inject
	private Resource messagesGeneric;

	public Resource getMessagesGeneric() {
		return messagesGeneric;
	}

}