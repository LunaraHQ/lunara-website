import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.3,
    }));

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > window.innerHeight) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <main className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Lunara
        </h1>
        <p className="text-lg">
          Your AI navigator for lead funnels in deep space.
        </p>
      </main>
    </div>
  );
}