import PropTypes from 'prop-types';

const gridArray = [true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const propTypes = {
    /** Columns will align according to one of the possible string value options: `['auto', 'start', 'end', 'center', 'baseline', 'stretch']` */
    alignSelf: PropTypes.string,
    breakline: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    /**
   Column span for device sizes: 0 - 767px.
   Pass in a number from 1 to 12 or as a boolean.
   */
    sm: PropTypes.oneOf(gridArray),
    /**
   Column span for device sizes: 768px - no max.
   Pass in a number from 1 to 12 or as a boolean.
   */
    md: PropTypes.oneOf(gridArray),
    /**
   Column span for device sizes: 1200px - no max.
   Pass in a number from 1 to 12 or as a boolean.
   */
    lg: PropTypes.oneOf(gridArray),
    /**
     * Show column on sm
     */
    smOnly: PropTypes.bool,
    /**
     * Show column on md
     */
    mdOnly: PropTypes.bool,
    /**
     * Show column on lg
     */
    lgOnly: PropTypes.bool,
    /**
     * Hide column on sm
     */
    smHide: PropTypes.bool,
    /**
     * Hide column on md
     */
    mdHide: PropTypes.bool,
    /**
     * Hide column on lg
     */
    lgHide: PropTypes.bool,
    /**
     * Show column on sm and up
     */
    smUp: PropTypes.bool,
    /**
     * Show column on md and up
     */
    mdUp: PropTypes.bool,
    /**
     * Show column on lg and up
     */
    lgUp: PropTypes.bool,
    /**
     * Show column on sm and down
     */
    smDown: PropTypes.bool,
    /**
     * Show column on md and down
     */
    mdDown: PropTypes.bool,
    /**
     * Show column on lg and down
     */
    lgDown: PropTypes.bool,
    /**
     * Offset number for columns from the left for sm
     */
    smOffset: PropTypes.number,
    /**
     * Offset number for columns from the left for md
     */
    mdOffset: PropTypes.number,
    /**
     * Offset number for columns from the left for lg
     */
    lgOffset: PropTypes.number,
    /**
     * Push columns for sm
     */
    smPush: PropTypes.number,
    /**
     * Push columns for md
     */
    mdPush: PropTypes.number,
    /**
     * Push columns for lg
     */
    lgPush: PropTypes.number,
    /**
   Pull columns for sm
   */
    smPull: PropTypes.number,
    /**
   Pull columns for md
   */
    mdPull: PropTypes.number,
    /**
   Pull columns for lg
   */
    lgPull: PropTypes.number,
};

export const defaultProps = {
    className: '',
};
