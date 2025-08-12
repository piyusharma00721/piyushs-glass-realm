import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useTilt - Adds a subtle 3D parallax tilt effect based on cursor position.
 * - Optimized with requestAnimationFrame
 * - Returns props to spread on the target element
 */
export function useTilt(options?: { maxTilt?: number; scale?: number }) {
  const { maxTilt = 8, scale = 1.02 } = options || {};
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1

    const tiltX = -(py * maxTilt);
    const tiltY = px * maxTilt;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setStyle({
        transform: `perspective(900px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${scale})`,
        transition: "transform 60ms ease-out",
        willChange: "transform",
      });
    });
  }, [maxTilt, scale]);

  const handleLeave = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 300ms ease",
      willChange: "transform",
    });
  }, []);

  useEffect(() => {
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, []);

  return {
    ref,
    style,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
  } as const;
}
