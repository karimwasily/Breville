use(function () {
    var coordinateX = "";
    var coordinateY = "";
    var coordinates = properties.get("focusPoint");
    if (coordinates && coordinates.length() > 0) {
        coordinateX = coordinates.split(':')[0];
        coordinateY = coordinates.split(':')[1];
    }

    return {
        // anything exposed here can be used inside your template
        coordinateX: coordinateX,
        coordinateY: coordinateY
    };
});