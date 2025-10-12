
import { useEffect, useRef, useState } from "react";


export default function useLongPress({ pressMs = 200, holdingClass } = {}) {
  const timerRef = useRef(null);
  const curTargRef = useRef(null);
  const boundRecRef = useRef(null);
  const hoverRef = useRef(null);
  const [isHolding, setIsHolding] = useState(false);
  const longPressedRef = useRef(false);
  const ignoreNextClickRef = useRef(false);

  
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  const addHoldClass = () => {
    if (curTargRef.current && holdingClass) {
      curTargRef.current.classList.add(holdingClass);
    }
  };
  const removeHoldClass = () => {
    if (curTargRef.current && holdingClass) {
      curTargRef.current.classList.remove(holdingClass);
    }
  };

  const onPointerDown = (e, onLongPress) => {
    const el = e.currentTarget;
    curTargRef.current = el;
    boundRecRef.current = el.getBoundingClientRect();

    el.setPointerCapture?.(e.pointerId);
    longPressedRef.current = false;
    ignoreNextClickRef.current = false;

    timerRef.current = setTimeout(() => {
      
      if (!curTargRef.current || !curTargRef.current.isConnected) return;
      addHoldClass();
      longPressedRef.current = true;
      ignoreNextClickRef.current = true;
      setIsHolding(true);
      if (typeof onLongPress === "function") onLongPress();
    }, pressMs);
  };

 
  const cancelHold = (e) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    longPressedRef.current = false;

    removeHoldClass();

    const el = curTargRef.current;
    if (e?.pointerId && el?.hasPointerCapture?.(e.pointerId)) {
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }

    
    curTargRef.current = null;
    boundRecRef.current = null;
  };

  const onPointerUp = (e) => {
    cancelHold(e);
  };

  const onPointerLeave = (e) => {
    cancelHold(e);
  };

  const shouldIgnoreClick = () => ignoreNextClickRef.current;
  const wasLongPressed = () => longPressedRef.current;

  return {
    
    isHolding,
    curTargRef,
    boundRecRef,
    
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    
    cancelHold,
    
    shouldIgnoreClick,
    wasLongPressed,
  };
}
