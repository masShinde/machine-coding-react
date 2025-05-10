import { useRef, useState } from "react";

export default function (initialValue: any, delay: number) {
  const [debounceVal, setDebounceVal] = useState(initialValue);
  const timerId = useRef<any>(null);
  const updateDebouncedVal = (val: string) => {
    clearTimeout(timerId?.current)
    timerId.current = setTimeout(() => {
      setDebounceVal(val);
    }, delay ?? 1000);
  };

  return [debounceVal, updateDebouncedVal];
}
