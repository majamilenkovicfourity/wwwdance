import React, { useEffect } from 'react';

const getRandomPinkGradient = () => {
  // random pink shades
  const pinkShades = [
    '#f3dde8',
    '#ff9de2',
    '#ff80c0',
    '#ffb6d9',
    '#ff66a3',
    '#ff99cc',
    '#f24099',
  ];
  const pink = pinkShades[Math.floor(Math.random() * pinkShades.length)];
  return `linear-gradient(45deg, ${pink}, white)`;
};

const MouseTrail: React.FC = () => {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // main star
      const mainStar = document.createElement('div');
      mainStar.style.position = 'absolute';
      mainStar.style.width = '15px';
      mainStar.style.height = '15px';
      mainStar.style.background = getRandomPinkGradient();
      mainStar.style.opacity = '0.8';
      mainStar.style.clipPath =
        'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
      mainStar.style.pointerEvents = 'none';
      mainStar.style.zIndex = '9999';
      mainStar.style.left = `${e.pageX - 3}px`;
      mainStar.style.top = `${e.pageY - 3}px`;
      document.body.appendChild(mainStar);
      setTimeout(() => mainStar.remove(), 0);

      // create 2-4 smaller stars around
      const smallCount = Math.floor(Math.random() * 3) + 2; // 2-4
      for (let i = 0; i < smallCount; i++) {
        const smallStar = document.createElement('div');
        const size = Math.random() * 5 + 4; // 4px - 10px
        smallStar.style.position = 'absolute';
        smallStar.style.width = `${size}px`;
        smallStar.style.height = `${size}px`;
        smallStar.style.background = getRandomPinkGradient();
        smallStar.style.opacity = `${Math.random() * 0.5 + 0.3}`; // 0.3 - 0.8
        smallStar.style.clipPath =
          'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';
        smallStar.style.pointerEvents = 'none';
        smallStar.style.zIndex = '9999';

        // random position around the cursor
        const offsetX = (Math.random() - 0.3) * 40; // -15 to +15px
        const offsetY = (Math.random() - 0.1) * 40;
        smallStar.style.left = `${e.pageX + offsetX}px`;
        smallStar.style.top = `${e.pageY + offsetY}px`;

        document.body.appendChild(smallStar);
        setTimeout(() => smallStar.remove(), 600);
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return null;
};

export default MouseTrail;
