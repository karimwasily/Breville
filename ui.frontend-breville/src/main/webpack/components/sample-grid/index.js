import React from 'react';
import { Grid, Row, Col } from 'xps-react/core';

export default () => {
  return (
  // fluid: will remove container padding
    <Grid>

      { /*
                noGutters: Passing noGutters to the Row will force grid to have no gutters between column
            */ }
      <Row>
        { /*
                    xs, sm, md, lg: Passing number to all these properties to the Col component specifies the column size for each breakpoint
                    [size]Only: Passing [size]Only props to Col component will make it visible only to that specific breakpoint.
                    [size]Hide: Passing [size]Hide props to Col component will make it hide only to that specific breakpoint.
                    [size]Offset: Passing [size]Offset props to Col component will pushes col
                */ }
        <Col lgOnly lg='6' xs='12'><div style={{ backgroundColor: 'gray', height: '100px', width: '100%' }}></div></Col>
        <Col><div style={{ backgroundColor: 'gray', height: '100px', width: '100%' }}></div></Col>
        <Col><div style={{ backgroundColor: 'gray', height: '100px', width: '100%' }}></div></Col>
      </Row>
    </Grid>
  );
};