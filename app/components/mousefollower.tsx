import React, { useState, useEffect, useRef } from 'react';

function MouseFollower({ lives }: { lives: number }) {
  // initial positions
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  if (lives < 0) lives = 0;
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // sets the mouse position to the var
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    // listening to mouse move
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  useEffect(() => {
    const animate = () => {
      // so it doesnt just snap to the cursor, instead follows it smoothly
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
    // returns the actual div
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
        zIndex: 100
      }}
    >
      <div
        className="bg-[url('/ressources/numberthing/burgy.png')] bg-contain bg-no-repeat h-[67px] w-[67px]"
      />
      
      <span className="text-white font-bold text-xl">x{lives}</span>
    </div>
  );
}

export default MouseFollower;