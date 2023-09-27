import {useCallback, useEffect, useRef, useState} from 'react';

/** Return the visibility status of an element.
 *  @return {{isRefVisible: boolean, visibilityRef: any}}*/
export const useDetectElementVisibility = () => {
  const [isRefVisible, setIsRefVisible] = useState( true );
  const [elementRef, setElementRef] = useState();

  const visibilityRef = useCallback((node) => {
    setElementRef(node);
  }, []);

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      // Element is considered invisible only if it's above the viewport.
      const {intersectionRatio, boundingClientRect} = entry;
      setIsRefVisible(intersectionRatio > 0 || boundingClientRect.y >= 0);
    })
  }

  useEffect( () => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(observerCallback, {});
    observer.observe(elementRef);

    return () => observer.disconnect();
  }, [elementRef]);


  return { isRefVisible, visibilityRef }
}