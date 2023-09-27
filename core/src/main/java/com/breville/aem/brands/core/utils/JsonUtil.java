package com.breville.aem.brands.core.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JsonUtil {
    @Getter
    private static final ObjectMapper mapper = new ObjectMapper();
}
