import React from 'react';
import PageLoader from 'components/page-loader';
import { useHistory } from 'react-router-dom';
import Router from 'router';


export default ( props )=>{

  const history = useHistory();
  Router.setRouter = history;

  return (
    <>
      <PageLoader />
      <div>{ props.children }</div>
    </>
  );
};