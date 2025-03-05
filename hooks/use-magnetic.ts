import { useState, useRef, useEffect } from 'react';

interface UseMagneticProps {
  strength?: number;
}

export function useMagnetic({ strength = 40 }: UseMagneticProps = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();

      const middleX = left + width / 2;
      const middleY = top + height / 2;

      const offsetX = ((clientX - middleX) / width) * strength;
      const offsetY = ((clientY - middleY) / height) * strength;

      setPosition({ x: offsetX, y: offsetY });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref, position };
}