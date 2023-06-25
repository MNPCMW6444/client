import { useEffect, useState, MutableRefObject } from "react";

const useCalculateRows = (
  refs: MutableRefObject<any>[],
  lineHeight: number,
  partFromScreenHeight: number
) => {
  const [rows, setRows] = useState(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    } else {
      let occupiedHeight = 0;
      refs.forEach((ref) => {
        if (ref.current) {
          occupiedHeight += ref.current.getBoundingClientRect().height;
        }
      });
      const windowHeight = window.innerHeight / partFromScreenHeight;
      const remainingHeight = windowHeight - occupiedHeight;
      setRows(Math.floor(remainingHeight / lineHeight));
    }
  }, [refs, lineHeight, mounted, partFromScreenHeight]);

  return rows;
};

export default useCalculateRows;
