import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // -- Dynamic background color (black → white on scroll)
  const bgRaw = useTransform(scrollY, [0, 800], ["#000000", "#ffffff"]);
  const bgColor = useSpring(bgRaw, { stiffness: 60, damping: 20 });

  // -- Comet movement (spring-smoothed)
  const isClient = typeof window !== "undefined";
  const width = isClient ? window.innerWidth * 0.9 : 0;
  const height = isClient ? window.innerHeight * 0.9 : 0;
  const rawX = useTransform(scrollY, [0, 4000], [0, width]);
  const rawY = useTransform(scrollY, [0, 4000], [0, height]);
  const cometX = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.8 });
  const cometY = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.8 });

  // -- Starfield setup
  useEffect(() => {
    if (!isClient) return;
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    const layers = [[], [], [], []];
    const speeds = [0.4, 0.3, 0.2, 0.1];

    layers.forEach((layer, i) => {
      for (let j = 0; j < 100; j++) {
        layer.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * (i + 1) * 0.5 + 0.2,
          speed: speeds[i],
        });
      }
    });

    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      layers.forEach((stars) =>
        stars.forEach((star) => {
          star.y += star.speed;
          if (star.y > height) star.y = 0;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        })
      );

      requestAnimationFrame(animate);
    };
    animate();
  }, [isClient, width, height]);

  // -- Feature sections
  const sections = [
    { title: "Intelligent Lead Funnels", desc: "Build adaptive sales funnels powered by AI." },
    { title: "Sales Command Center",      desc: "Unified CRM, email, analytics, and automations." },
    { title: "Enterprise-Grade Security",  desc: "Encrypted by default, compliant from launch." },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="min-h-[4000px] relative overflow-hidden"
    >
      <canvas id="starfield" className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        {/* Brand Logo */}
        <img
          src="/logo.svg"
          alt="Lunara Logo"
          className="w-32 h-32 mb-6 animate-pulse"
        />
        <h1 className="text-5xl font-bold mb-4">Lead the Future with AI</h1>
        <p className="text-xl mb-8">
          Embark on your journey through the cosmos of enterprise funnels.
        </p>
      </section>

      {/* Comet Trail (soft glow) */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 rounded-full blur-4xl opacity-50 will-change-transform -z-20"
        style={{
          x: cometX,
          y: cometY,
          background: "radial-gradient(circle at center, rgba(255,255,255,0.8), transparent 80%)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Comet Core */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 rounded-full shadow-2xl will-change-transform"
        style={{
          x: cometX,
          y: cometY,
          background: "linear-gradient(135deg, #ffffff, #38bdf8)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      />

      {/* Feature Sections */}
      {sections.map((sec, idx) => (
        <motion.section
          key={idx}
          className="h-[80vh] flex flex-col justify-center items-center text-center px-6"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-xl bg-white/90 backdrop-blur-sm text-black rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">{sec.title}</h2>
            <p className="text-lg">{sec.desc}</p>
          </div>
        </motion.section>
      ))}

      {/* Final CTA */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition">
          Get Started
        </button>
      </section>
    </motion.div>
  );
}
