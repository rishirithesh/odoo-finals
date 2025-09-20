import React, { useEffect } from 'react';

const InteractiveBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        const scale = Math.max(0.5, 1 - distance / maxDistance);
        particle.style.transform = `scale(${scale}) translate(${dx / 20}px, ${dy / 20}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 opacity-80">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-4 h-4 bg-white rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `float ${5 + Math.random() * 5}s infinite ease-in-out`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default InteractiveBackground;