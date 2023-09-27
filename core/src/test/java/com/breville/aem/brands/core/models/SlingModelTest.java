package com.breville.aem.brands.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Method;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

@Slf4j
public abstract class SlingModelTest {

    protected <AdapterType> void testSlingResourceGetter(Class<AdapterType> type, String resourcePath, String methodName, Object expectedResult) {
        try {
            AemContext ctx = getContext();
            ctx.currentResource(resourcePath);
            AdapterType testModel = ctx.request().adaptTo(type);
            Method testMethod = type.getMethod(methodName);
            assertThat(testMethod.invoke(testModel)).isEqualTo(expectedResult);
        } catch (Exception e) {
            log.error(e.getMessage());
            fail("test failed with exception(s)");
        }
    }

    protected abstract AemContext getContext();
}
