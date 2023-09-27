package com.breville.aem.brands.core.utils;

import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;

/**
 * Utility class to convert json string to object and vice-versa.
 *
 *
 */
public final class JsonConvertor {
    private static Gson gson;
    static {
        gson = new GsonBuilder().setPrettyPrinting().create();
    }

    /**
     * private constructor for denying direct instantiation.
     */
    private JsonConvertor() {
    }

    /**
     * convert json string to object.
     *
     * @param json
     *            the JSON string
     * @param type
     *            the response class type
     * @return the converted object
     * @throws Exception
     *             the jsonParsing Exception
     */
    public static <T> T convertFromJson(final String json, final Type type){
        try {
            return gson.fromJson(json, type);
        } catch (final JsonSyntaxException e) {
            throw new JsonSyntaxException(e.getMessage(), e);
        }
    }

    /**
     * Gets the json string from object.
     *
     * @param <T>
     *            the generic type
     * @param object
     *            the object
     * @return the json string from object
     */
    public static <T> String getJsonStringFromObject(final T object) {
        final Gson gson = new Gson();
        return gson.toJson(object);
    }
    
    /**
     * convert object to json.
     *
     * @param object
     *            object which need to be converted to json
     * @return josn string
     */
    public static <T> String convertToJson(final T object) {
        return gson.toJson(object);
    }
}
