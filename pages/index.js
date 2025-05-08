import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Background transitions black → white as you scroll
  const rawBg = useTransform(scrollY, [0, 1000], ["#000000", "#ffffff"]);
  const bgColor = useSpring(rawBg, { stiffness: 60, damping: 20 });

  // Comet: smooth spring movement
  const rawX = useTransform(scrollY, [0, 4000], ["5%", "95%"]);
  const rawY = useTransform(scrollY, [0, 4000], ["5%", "95%"]);
  const cometX = useSpring(rawX, { stiffness: 120, damping: 25 });
  const cometY = useSpring(rawY, { stiffness: 120, damping: 25 });

  // Starfield—browser only
  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5,
      s: Math.random() * 0.5 + 0.2,
    }));
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.y += star.s;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="min-h-screen overflow-hidden"
    >
      <canvas id="starfield" className="fixed inset-0 -z-10" />

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4">
        <img
          src="/logo.svg"
          alt="Lunara Logo"
          className="w-32 h-32 mb-6 animate-pulse"
        />
        <h1 className="text-6xl font-bold mb-4 text-white">Lunara</h1>
        <p className="text-xl mb-8 text-white/80">
          Lead the future with AI-powered sales funnels.
        </p>
      </section>

      {/* Comet */}
      <motion.div
        className="absolute w-20 h-20 rounded-full shadow-2xl"
        style={{
          x: cometX,
          y: cometY,
          background: "radial-gradient(circle, #fff, #0ea5e9)",
        }}
      />

      {/* Features */}
      {[
        ["Intelligent Funnels", "Never lose a lead in orbit again."],
        ["Command Center", "Unified dashboard for revenue tracking."],
        ["Enterprise Security", "Encrypted by default, compliance baked in."],
      ].map(([title, desc], i) => (
        <motion.section
          key={i}
          className="h-[80vh] flex items-center justify-center px-6"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/80 backdrop-blur-sm text-black rounded-2xl p-8 max-w-xl">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p>{desc}</p>
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <section className="h-screen flex items-center justify-center px-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition">
          Request Access
        </button>
      </section>
    </motion.div>
  );
}
