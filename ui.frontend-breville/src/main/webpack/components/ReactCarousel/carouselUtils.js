const BREAKPOINTS = {
  xs: {
    cssVar: '--breakpoint-xs',
    fallback: 375,
  },
  sm: {
    cssVar: '--breakpoint-sm',
    fallback: 576,
  },
  md: {
    cssVar: '--breakpoint-md',
    fallback: 768,
  },
  lg: {
    cssVar: '--breakpoint-lg',
    fallback: 992,
  },
  xl: {
    cssVar: '--breakpoint-xl',
    fallback: 1200,
  },
  xxl: {
    cssVar: '--breakpoint-xxl',
    fallback: 1440,
  },
  xxxl: {
    cssVar: '--breakpoint-xxxl',
    fallback: 1920,
  },
};

/**
 * get a custom css var applied on the ':root' of the document
 *
 * @param {string} prop - css custom property name
 * @returns {string}
 */
const getRootCssCustomVar = prop =>
  getComputedStyle(document.documentElement).getPropertyValue(prop).trim();

/**
 * create config object for a specific breakpoint
 * @param {object} settings - config object which will be passed to react slick library
 * @param {string} dialogConfigName - name of the dialog config name
 * @param {{cssVar: string, fallback: number}} breakpoint - mapping to css for breakpoint values along with fallback
 * @returns {object} settings
 */
const updateSlidesToShow = (settings, dialogConfigName, breakpoint) => {
  if (!settings[dialogConfigName]) {
    return settings;
  }

  const numSlides = settings[dialogConfigName];
  if (numSlides) {
    // create and add responsive config object
    settings.responsive.push({
      breakpoint:
        +getRootCssCustomVar(breakpoint.cssVar) || breakpoint.fallback,
      settings: {
        slidesToShow: numSlides,
        slidesToScroll: numSlides,
      },
    });
  }

  // remove the aem custom config
  delete settings[dialogConfigName];

  return settings;
};

/**
 * use a ratio to create a dynamic centerPadding across all available breakpoints
 * @param {object} settings 
 * @param {HTMLElement} elem - carousel html element
 * @returns {object} settings
 */
const updateCenterPadding = ( settings, elem ) => {
  // centerPaddingRatio will be a number 0 - 100
  let ratio = settings.centerPaddingRatio / 100;
  let currentRatio = ratio;

  // if ratio invalid do nothing
  if (!ratio || ratio < 0 || ratio > 100) {
   return settings;
  }

  // for every breakpoint assign centrePadding via ratio on each breakpoint size
  Object.keys(BREAKPOINTS).forEach(bpKey => {
    const {cssVar, fallback} = BREAKPOINTS[bpKey];
    const breakpoint = +getRootCssCustomVar(cssVar) || fallback;
    // find if responsive breakpoint exists
    let bpConfigExists = false;
    let dynamicCenterPadding = Math.round(breakpoint * ratio) + 'px';

      settings.responsive.forEach(config => {
        if (config.breakpoint === breakpoint) {
          bpConfigExists = true;
          // update config
          if (!config.settings.hasOwnProperty("centerPaddingRatio")) {
            config.settings.centerPaddingRatio = ratio;
            config.settings.centerPadding = dynamicCenterPadding;
          } 
          else {
            const ratio = config.settings.centerPaddingRatio / 100;
            config.settings.centerPaddingRatio = ratio;
            config.settings.centerPadding = Math.round(breakpoint * ratio) + 'px';
          }
        }
        return bpConfigExists;
      });
    
    // if no breakpoint config exists then create it
    if (!bpConfigExists) {
      settings.responsive.push({
        breakpoint,
        settings: {
          centerPaddingRatio: ratio,
          centerPadding: dynamicCenterPadding,
        }
      });
    }
  });

  // * provide stylesheet a custom variable of the ratio for any additional styling
  let currentBreakpoint = settings.responsive.find( style => style.breakpoint === screen.width );
  if (currentBreakpoint ) {
    currentRatio = currentBreakpoint.settings.centerPaddingRatio;
  }
  else {
    const smallerBreakpoints = settings.responsive.filter(style => style.breakpoint < screen.width );
    const previousBreakpoint = smallerBreakpoints.reduce((max, bp) => Math.max(max, bp.breakpoint), smallerBreakpoints[0].breakpoint);
    currentRatio = settings.responsive.find(style => style.breakpoint === previousBreakpoint).settings.centerPaddingRatio;
  }
  elem.style.setProperty('--centerPaddingRatio', currentRatio);

  // * since we are setting dynamicPadding across all breakpoints, set largest dynamic padding to be default
  const largestBpConfig = settings.responsive.reduce((prev, curr) => {
    return prev.breakpoint > curr.breakpoint ? prev : curr;
  });
  // assign default
  settings.centerPadding = largestBpConfig.settings.centerPadding;

  // * when we use dynmaic centrePadding ratio we revert all slide items to 1 or carousel breaks
  settings.responsive.forEach(bpConfig => bpConfig.settings.slidesToShow = 1);
  
  return settings;
};

/**
 * transform provided data to a 'react slick' config object
 *
 * @param {object} sliderSettings - aem dialog settings and default settings combined
 * @param {HTMLElement} elem - element representing the carousel div
 * @returns {object} - transform settings
 */
export const updateConfigViaCustomProps = ( sliderSettings, elem ) => {
  // check if already have responsive settings passed in via AEM dialog
  sliderSettings.responsive = sliderSettings?.responsive || [];

  // * transforming carousel settings via breakpoints
  sliderSettings = updateSlidesToShow(
    sliderSettings,
    'slidesToShowMobile',
    BREAKPOINTS.md
  );
  sliderSettings = updateSlidesToShow(
    sliderSettings,
    'slidesToShowTablet',
    BREAKPOINTS.xl
  );
  sliderSettings = updateSlidesToShow(
    sliderSettings,
    'slidesToShowDesktop',
    BREAKPOINTS.xxxl
  );

  // * centerPadding dynamic ratio
  if (sliderSettings.useCenterPaddingRatio) {
    sliderSettings = updateCenterPadding(sliderSettings, elem);
  }

  return sliderSettings;
};
