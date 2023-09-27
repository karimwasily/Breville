package com.breville.aem.brands.core.response;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author PradeepMC
 *
 */
public class CustomGraphQLResponseImpl {

	@JsonProperty("data")
    private Data data;

	@JsonProperty("errors")
    private String errors;

    @JsonCreator
    CustomGraphQLResponseImpl(@JsonProperty("data") final Data data,
            @JsonProperty("errors") final String errors) {
        this.data = data;
        //this.errors = errors;
    }

    public CustomGraphQLResponseImpl() {
    }

    public Data getData() {
        return this.data;
    }

    
    public String getErrors() {
        return this.errors;
    }

    public void setData(final Data data) {
        this.data = data;
    }

    public void setErrors(final String errors) {
        this.errors = errors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;

        if (o == null || getClass() != o.getClass())
            return false;

        CustomGraphQLResponseImpl that = (CustomGraphQLResponseImpl) o;

        return new EqualsBuilder().append(data, that.data).append(errors, that.errors).isEquals();
    }

   @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(data).append(errors).toHashCode();
    }

}
