import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
  lerp(position.x, window.innerHeight, 1);

  useEffect(() => {
    const setFromEvent = (e: any) =>
      setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};
