<%@ page import="com.adobe.granite.ui.components.*" %>
<%@ page import="org.apache.sling.api.resource.ValueMap" %>
<%@ include file="/libs/granite/ui/global.jsp" %>
<%@ page session="false" %>
<%
    Config cfg = cmp.getConfig();

    ValueMap vm = (ValueMap) request.getAttribute(Field.class.getName());

    String name = cfg.get("name", String.class);
    String className = cfg.get("className", String.class);

    Tag tag = cmp.consumeTag();
    AttrBuilder attrs = tag.getAttrs();
    cmp.populateCommonAttrs(attrs);
    attrs.add("name", name);
    attrs.add("value", vm.get("value", String.class));
    attrs.add("type", "hidden");
    attrs.addClass("helper-tool-data-attr-coords");
    attrs.add("id", "data-attr-coords");
    attrs.add("type", "hidden");
    attrs.add("placeholder", "0.0");
%>

<div class=<%=className%> >
    <div class="focuspoint-helper-tool">
        <h2>Click on the image to set a FocusPoint.</h2>
        <div class="helper-tool-target">
            <img class="helper-tool-img" src="">
            <coral-icon class="reticle" icon="addCircle" size="L">
            </coral-icon>
            <img class="target-overlay" src="">
        </div>
        <input <%=attrs.build()%> style="pointer-events: none; background-color: rgba(204,204,204,0.2);"/>
    </div>
</div>
