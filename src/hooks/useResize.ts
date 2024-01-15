import { useEffect, useState } from 'react';

/**
 * 窗口大小变化
 */
export default function useResize<T>(callback: () => T): T {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    setValue(() => callback());

    const onresize = () => setValue(() => callback());
    window.addEventListener('resize', onresize);
    return () => {
      window.removeEventListener('resize', onresize);
    };
  }, []);

  return value;
}
