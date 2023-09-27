import React from 'react';
import { withAem } from 'xps-utils/withAem';

import { PlpLandingView } from './PlpLandingView';

const ReactPlp = ( { aemData } ) => {

  // * fallback to use 'espresso' if no category is provided
  if ( !aemData || aemData.category === '' ) aemData = { category: 'espresso' };

  return <PlpLandingView aemData={ aemData } />;
};

export default withAem( ReactPlp );
