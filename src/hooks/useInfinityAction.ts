import * as React from 'react';

export function useInfinityAction(
  container: Document,
  callback: () => void,
  offset = 0
) {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (!container) return;
    const handleScroll = () => {
      const scrollContainer =
        container === document ? document.scrollingElement : container;

      if (
        // @ts-ignore
        scrollContainer?.scrollTop + scrollContainer.clientHeight >=
        // @ts-ignore
        scrollContainer?.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [container, offset]);
}
