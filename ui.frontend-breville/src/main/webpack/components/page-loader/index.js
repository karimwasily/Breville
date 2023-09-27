import React from 'react';
import { useSelector } from 'react-redux';
import { selectPageLoading } from 'library/store/ui/selectors';
import { Loader } from 'xps-react/core';

function PageLoader(){

  const pageLoading = useSelector( selectPageLoading );
  return (
    <Loader isLoading={ pageLoading } />
  );

}

export default PageLoader;