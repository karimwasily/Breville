import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPageLoading } from 'library/store/ui/selectors';

/** Invoke page navigation only if the pageLoading state has been switched off
 * @param {String} href link to be navigated
 * @returns {Object<String, Function>}*/
export function usePageNavigation( href ) {
  const [watchPageLoading, setWatchPageLoading] = useState( false );
  const pageLoading = useSelector( selectPageLoading );

  useEffect( () => {
    if ( watchPageLoading && !pageLoading ) {
      window.location.href = href;
    }
  }, [watchPageLoading, pageLoading] );

  const queuePageNavigation = () => {
    setTimeout( () => setWatchPageLoading( true ), 100 );
  };

  return { queuePageNavigation };
}