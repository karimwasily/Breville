const KEY = {
    ARROWUP_CODE : "38",
    ARROWUP_NAME : "ArrowUp",
    ARROWDOWN_CODE : "40",
    ARROWDOWN_NAME : "ArrowDown",
    TAB_CODE : "9",
    TAB_NAME : "Tab",
    SPACE_CODE : "32",
    SPACE_NAME : "Space"
}

function insertScriptAndStylesheet() {
    const head  = document.getElementsByTagName('head')[0];

    const mapboxStylesheet  = document.createElement('link');
    const mapboxScript = document.createElement('script');

    mapboxStylesheet.rel  = 'stylesheet';
    mapboxStylesheet.type = 'text/css';
    mapboxStylesheet.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css';
    mapboxStylesheet.media = 'all';
    mapboxScript.setAttribute('src', 'https://api.tiles.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js');
    mapboxScript.setAttribute('type', 'text/javascript');
    mapboxScript.async = false;

    head.insertBefore(mapboxStylesheet, head.firstChild);
    head.insertBefore(mapboxScript, head.firstChild);
}

insertScriptAndStylesheet();

function initialiseMapboxMap(component) {
    const mapboxData = component.querySelector('#cmp-mapbox__data');

    if(mapboxData) {
        const config = JSON.parse(mapboxData.innerHTML);

        const layerTypes = {
            'fill': ['fill-opacity'],
            'line': ['line-opacity'],
            'circle': ['circle-opacity', 'circle-stroke-opacity'],
            'symbol': ['icon-opacity', 'text-opacity'],
            'raster': ['raster-opacity'],
            'fill-extrusion': ['fill-extrusion-opacity'],
            'heatmap': ['heatmap-opacity']
        };

        mapboxgl.accessToken = config.accessToken;

        const transformRequest = (url) => {
            const hasQuery = url.indexOf("?") !== -1;
            const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";

            return {
                url: url + suffix
            };
        };

        let map;

        if(config.chapters[0]) {
            map = new mapboxgl.Map({
                container: 'cmp-mapbox-map',
                style: config.style,
                center: config.chapters[0].location.center,
                zoom: config.chapters[0].location.zoom,
                bearing: config.chapters[0].location.bearing,
                pitch: config.chapters[0].location.pitch,
                interactive: false,
                transformRequest: transformRequest
            });
        }

        function getLayerPaintType(layer) {
            const layerType = map.getLayer(layer).type;
            return layerTypes[layerType];
        }

        function setLayerOpacity(layer) {
            const paintProps = getLayerPaintType(layer.layer);
            paintProps.forEach(function(prop) {
                let options = {};
                if (layer.duration) {
                    const transitionProp = prop + "-transition";
                    options = { "duration": layer.duration };
                    map.setPaintProperty(layer.layer, transitionProp, options);
                }
                map.setPaintProperty(layer.layer, prop, layer.opacity, options);
            });
        }

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function chapterEnterAndExit(chapter) {
            const chapterElement = document.getElementById(chapter.id);
            const chapterElementTagline = chapterElement.querySelector('.cmp-mapbox__story-tagline');
            const chapterElementImage = chapterElement.querySelector('.cmp-mapbox__story-image-wrapper');
            
            if(chapterElement && !chapterElement.classList.contains('cmp-mapbox__featured-story-active')
                && (isInViewport(chapterElementTagline) || isInViewport(chapterElement))) {
                chapterElement.classList.add('cmp-mapbox__featured-story-active');
                map[chapter.mapAnimation || 'flyTo'](chapter.location);
    
                if (config.showMarkers === 'true') {
                    marker.setLngLat(chapter.location.center);
                }
                if(chapter.onChapterEnter) {
                    if (chapter.onChapterEnter.length > 0) {
                        chapter.onChapterEnter.forEach(setLayerOpacity);
                    }
                }
                if (chapter.callback) {
                    window[chapter.callback]();
                }
                if (chapter.rotateAnimation) {
                    map.once('moveend', function() {
                        const rotateNumber = map.getBearing();
                        map.rotateTo(rotateNumber + 90, {
                            duration: 24000, easing: function (t) {
                                return t;
                            }
                        });
                    });
                }
            }
            if(chapterElement && chapterElement.classList.contains('cmp-mapbox__featured-story-active')
                && !isInViewport(chapterElementTagline) && !isInViewport(chapterElementImage) && !isInViewport(chapterElement))
            {
                chapterElement.classList.remove('cmp-mapbox__featured-story-active');
            }
        }

        if(map) {
            map.on("load", function() {
                if (config.use3dTerrain) {
                    map.addSource('mapbox-dem', {
                        'type': 'raster-dem',
                        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
                        'tileSize': 512,
                        'maxzoom': 14
                    });
                    // add the DEM source as a terrain layer with exaggerated height
                    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

                    // add a sky layer that will show when the map is highly pitched
                    map.addLayer({
                        'id': 'sky',
                        'type': 'sky',
                        'paint': {
                            'sky-type': 'atmosphere',
                            'sky-atmosphere-sun': [0.0, 0.0],
                            'sky-atmosphere-sun-intensity': 15
                        }
                    });
                }

                config.chapters.forEach(chapter => {
                    window.addEventListener("scroll", function() {
                        chapterEnterAndExit(chapter);
                    });

                    const scroller = document.getElementsByClassName('cmp-layout-container--modal-full')[0];
                    if(scroller) {
                        scroller.addEventListener("scroll", function() {
                            chapterEnterAndExit(chapter);
                        });
                    }
                });
            });
        }
    }
}

function init() {
    const mapboxComponent = document.querySelectorAll('.cmp-mapbox');

    if(mapboxComponent) {
        mapboxComponent.forEach(component => {
            initialiseMapboxMap(component);
        });
    }
}

window.addEventListener('load', function() {
    init();
});

const body = document.querySelector('body');
body.addEventListener('bb-modal-show', function() {
    init();
});
