import React, { useState, useEffect, useRef } from 'react';

function MouseFollower({ lives }: { lives: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>();
  if (lives < 0) lives = 0;
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const animate = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.05,
        y: prev.y + (mousePosition.y - prev.y) * 0.05,
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]); 

  return (
    <div
      style={{
        position: 'fixed',
        top: followerPosition.y,
        left: followerPosition.x,
        width: 'auto',
        height: 'auto',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 100000000
      }}
    >
      <div
        className="bg-[url('/ressources/numberthing/burgy.png')] bg-contain bg-no-repeat h-[67px] w-[67px] z-[100000000000000000]"
      />
      <span className="text-white font-bold text-xl">x{lives}</span>
    </div>
  );
}

export default MouseFollower;