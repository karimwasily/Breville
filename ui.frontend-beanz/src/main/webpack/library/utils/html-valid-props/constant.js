/* eslint-disable max-lines */
export const htmlGlobalAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
    // Global DOM Element Attributes
    'accesskey',
    'class',
    'contenteditable',
    'contextmenu',
    'data-*',
    'dir',
    'draggable',
    'dropzone',
    'hidden',
    'id',
    'itemid',
    'itemprop',
    'itemref',
    'itemscope',
    'itemtype',
    'lang',
    'slot',
    'spellcheck',
    'style',
    'tabIndex',
    'title',
    'translate',

    // React
    // None for now
];

export const htmlGlobalEvents = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
    // Global HTML DOM Events

    // Animation
    'onCancel',

    // Mouse
    'onClick',
    'onContextMenu',
    'onDblClick',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onMouseWheel',

    // Keyboard
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',

    // Drag
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',

    // Form
    'onBlur',
    'onChange',
    'onFocus',
    'onInput',
    'onInvalid',
    'onReset',
    'onSelect',
    'onSubmit',

    // Media Events
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',

    // Touch
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',

    // Object
    'onResize',
    'onLoad',
    'onResize',
    'onScroll',

    // Misc/Other
    'onAutoComplete',
    'onAutoCompleteError',
    'onClose',
    'onCueChange',
    'onShow',
    'onSort',
    'onToggle',

    // React
    // None for now
];

export const htmlButtonAttrs = [
    // https://www.w3schools.com/jsref/dom_obj_pushbutton.asp
    // Default properties
    'autoFocus',
    'autoComplete',
    'disabled',
    'form',
    'formAction',
    'formEnctype',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'name',
    'type',
    'value',

    // React
    // None for now
];

export const htmlInputAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    // Default Input Attributes
    'type',
    'accept',
    'accessKey',
    'autoComplete',
    'autoFocus',
    'capture',
    'checked',
    'disabled',
    'form',
    'formAction',
    'formEnctype',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'height',
    'inputMode',
    'list',
    'maxLength',
    'min',
    'minLength',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'readOnly',
    'required',
    'selectionDirection',
    'selectionEnd',
    'selectionStart',
    'size',
    'spellcheck',
    'src',
    'step',
    'tabIndex',
    'useMap',
    'value',
    'width',

    // React
    // None for now
];

export const htmlSelectAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
    // Default select attributes
    'autofocus',
    'disabled',
    'form',
    'multiple',
    'name',
    'required',
    'size',

    // React
    // None for now
];

export const htmlOptionAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
    // Default option attributes
    'disabled',
    'label',
    'selected',
    'value',

    // React
    // None for now
];

export const htmlOptGroupAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
    // Default optgroup attributes
    'label',
    'disabled',

    // React
    // None for now
];

export const htmlLinkAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
    // Default a Attributes
    'href',
    'hreflang',
    'ping',
    'referrerpolicy',
    'rel',
    'target',
    'type',

    // React
    // None for now
];

export const htmlImgAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
    // Default img Attributes
    'align',
    'alt',
    'border',
    'crossorigin',
    'height',
    'ismap',
    'longdesc',
    'name',
    'referrerpolicy',
    'sizes',
    'src',
    'srcset',
    'width',
    'usemap',

    // React
    // None for now
];

// Deprecated, see htmlSvgAttrs below
export const htmlSvgAttrsShort = [
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
    // Default svg Attributes
    'id',
    'xml:base',
    'xml:lang',
    'xml:space',
    'height',
    'width',
    'tabindex',
    'result',
    'x',
    'y',
    'onresize',
    'onabort',
    'onerror',
    'onscroll',
    'onunload',
    'onactivate',
    'onclick',
    'onfocusin',
    'onfocusout',
    'onload',
    'onmousedown',
    'onmouseup',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onbegin',
    'onend',
    'onload',
    'onrepeat',
    'attributeType',
    'attributeName',
    'begin',
    'dur',
    'end',
    'min',
    'max',
    'restart',
    'repeatCount',
    'repeatDur',
    'fill',
    'calcMode',
    'values',
    'keyTimes',
    'keySplines',
    'to',
    'from',
    'by',
    'autoReverse',
    'accelerate',
    'decelerate',
    'additive',
    'accumlate',
    'requiredExtensions',
    'requiredFeatures',
    'systemLanguage',

    // React
    // None for now
];

export const htmlSvgAttrs = [
    // https://reactjs.org/docs/dom-elements.html#all-supported-svg-attributes
    // All SVG attributes supported by react
    'accentHeight',
    'accumulate',
    'additive',
    'alignmentBaseline',
    'allowReorder',
    'alphabetic',
    'amplitude',
    'arabicForm',
    'ascent',
    'attributeName',
    'attributeType',
    'autoReverse',
    'azimuth',
    'baseFrequency',
    'baseProfile',
    'baselineShift',
    'bbox',
    'begin',
    'bias',
    'by',
    'calcMode',
    'capHeight',
    'clip',
    'clipPath',
    'clipPathUnits',
    'clipRule',
    'colorInterpolation',
    'colorInterpolationFilters',
    'colorProfile',
    'colorRendering',
    'contentScriptType',
    'contentStyleType',
    'cursor',
    'cx',
    'cy',
    'd',
    'decelerate',
    'descent',
    'diffuseConstant',
    'direction',
    'display',
    'divisor',
    'dominantBaseline',
    'dur',
    'dx',
    'dy',
    'edgeMode',
    'elevation',
    'enableBackground',
    'end',
    'exponent',
    'externalResourcesRequired',
    'fill',
    'fillOpacity',
    'fillRule',
    'filter',
    'filterRes',
    'filterUnits',
    'floodColor',
    'floodOpacity',
    'focusable',
    'fontFamily',
    'fontSize',
    'fontSizeAdjust',
    'fontStretch',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'format',
    'from',
    'fx',
    'fy',
    'g1',
    'g2',
    'glyphName',
    'glyphOrientationHorizontal',
    'glyphOrientationVertical',
    'glyphRef',
    'gradientTransform',
    'gradientUnits',
    'hanging',
    'horizAdvX',
    'horizOriginX',
    'ideographic',
    'imageRendering',
    'in',
    'in2',
    'intercept',
    'k',
    'k1',
    'k2',
    'k3',
    'k4',
    'kernelMatrix',
    'kernelUnitLength',
    'kerning',
    'keyPoints',
    'keySplines',
    'keyTimes',
    'lengthAdjust',
    'letterSpacing',
    'lightingColor',
    'limitingConeAngle',
    'local',
    'markerEnd',
    'markerHeight',
    'markerMid',
    'markerStart',
    'markerUnits',
    'markerWidth',
    'mask',
    'maskContentUnits',
    'maskUnits',
    'mathematical',
    'mode',
    'numOctaves',
    'offset',
    'opacity',
    'operator',
    'order',
    'orient',
    'orientation',
    'origin',
    'overflow',
    'overlinePosition',
    'overlineThickness',
    'paintOrder',
    'panose1',
    'pathLength',
    'patternContentUnits',
    'patternTransform',
    'patternUnits',
    'pointerEvents',
    'points',
    'pointsAtX',
    'pointsAtY',
    'pointsAtZ',
    'preserveAlpha',
    'preserveAspectRatio',
    'primitiveUnits',
    'r',
    'radius',
    'refX',
    'refY',
    'renderingIntent',
    'repeatCount',
    'repeatDur',
    'requiredExtensions',
    'requiredFeatures',
    'restart',
    'result',
    'rotate',
    'rx',
    'ry',
    'scale',
    'seed',
    'shapeRendering',
    'slope',
    'spacing',
    'specularConstant',
    'specularExponent',
    'speed',
    'spreadMethod',
    'startOffset',
    'stdDeviation',
    'stemh',
    'stemv',
    'stitchTiles',
    'stopColor',
    'stopOpacity',
    'strikethroughPosition',
    'strikethroughThickness',
    'string',
    'stroke',
    'strokeDasharray',
    'strokeDashoffset',
    'strokeLinecap',
    'strokeLinejoin',
    'strokeMiterlimit',
    'strokeOpacity',
    'strokeWidth',
    'surfaceScale',
    'systemLanguage',
    'tableValues',
    'targetX',
    'targetY',
    'textAnchor',
    'textDecoration',
    'textLength',
    'textRendering',
    'to',
    'transform',
    'u1',
    'u2',
    'underlinePosition',
    'underlineThickness',
    'unicode',
    'unicodeBidi',
    'unicodeRange',
    'unitsPerEm',
    'vAlphabetic',
    'vHanging',
    'vIdeographic',
    'vMathematical',
    'values',
    'vectorEffect',
    'version',
    'vertAdvY',
    'vertOriginX',
    'vertOriginY',
    'viewBox',
    'viewTarget',
    'visibility',
    'widths',
    'wordSpacing',
    'writingMode',
    'x',
    'x1',
    'x2',
    'xChannelSelector',
    'xHeight',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkHref',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlns',
    'xmlnsXlink',
    'xmlBase',
    'xmlLang',
    'xmlSpace',
    'y',
    'y1',
    'y2',
    'yChannelSelector',
    'z',
    'zoomAndPan',
];

export const htmlListAttrs = [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
    // Default img Attributes
    'value',

    // React
    // None for now
];