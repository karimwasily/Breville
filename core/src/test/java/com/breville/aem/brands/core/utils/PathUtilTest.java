package com.breville.aem.brands.core.utils;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.apache.sling.api.resource.ResourceResolver;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;

@RunWith(MockitoJUnitRunner.class)
public class PathUtilTest {

    @Mock
    private ResourceResolver resolver;

    @Before
    public void setup() {
        when(resolver.map(anyString())).then(new Answer<String>() {
            @Override
            public String answer(InvocationOnMock invocation) throws Throwable {
                return (String) invocation.getArguments()[0];
            }
        });
    }

    @Test
    public void testBuildLInk() {
        testMappings("/", "/");
        testMappings("#", "#");
        testMappings("#TODO", "#TODO");
        testMappings("/content/market-place/us/en/foo/bar.html", "/content/market-place/us/en/foo/bar");
        testMappings("/?a=y", "/?a=y");
        testMappings("/?a=y#blar", "/?a=y#blar");
        testMappings("/content/market-place/us/en/foo/bar.html?a=y", "/content/market-place/us/en/foo/bar?a=y");
        testMappings("/content/market-place/us/en/foo/bar.html#stuff", "/content/market-place/us/en/foo/bar#stuff");
        testMappings("/content/market-place/us/en/foo/bar.html?a=y", "/content/market-place/us/en/foo/bar.html?a=y");
        testMappings("/content/market-place/us/en/foo/bar.html?a=y#blar", "   /content/market-place/us/en/foo/bar?a=y#blar");
        testMappings("/content/market-place/us/en/foo/bar.html?a=y#blar", "/content/market-place/us/en/foo/bar.html?a=y#blar   ");
        testMappings("https://blar.com?x=y#sloth", "https://blar.com?x=y#sloth");
        testMappings("#", null);
        testMappings("#", " ");
    }    
    
    private void testMappings(String expected, String path) {
        assertEquals(expected, PathUtil.buildLInk(path, resolver));
    }

}
