import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDebounce = (value: any, wait: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(timer);
    };
  }, [value, wait]);

  return debouncedValue;
};

export default useDebounce;
