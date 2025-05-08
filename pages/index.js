import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Prevent "window is not defined" on server
  const isClient = typeof window !== "undefined";
  const width = isClient ? window.innerWidth * 0.9 : 0;
  const height = isClient ? window.innerHeight * 0.9 : 0;

  // Map scroll to pixel values, then spring-smooth them
  const rawX = useTransform(scrollY, [0, 4000], [0, width]);
  const rawY = useTransform(scrollY, [0, 4000], [0, height]);
  const cometX = useSpring(rawX, { stiffness: 120, damping: 25, mass: 0.8 });
  const cometY = useSpring(rawY, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas?.getContext("2d");
    const layers = [[], [], []];
    const speeds = [0.3, 0.2, 0.1];

    layers.forEach((layer, i) => {
      for (let j = 0; j < 60; j++) {
        layer.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2,
          speed: speeds[i],
        });
      }
    });

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
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

    if (isClient) {
      canvas.width = width;
      canvas.height = height;
      animate();
    }
  }, [isClient, width, height]);

  const sections = [
    { title: "Intelligent Lead Funnels", desc: "Build adaptive sales funnels powered by AI. Never lose a lead in orbit again." },
    { title: "Sales Command Center",      desc: "One dashboard to rule your revenue galaxy. Unified CRM, email, analytics, and automations." },
    { title: "Enterprise-Grade Security",  desc: "Built for scale. Encrypted by default, compliant from launch." },
    { title: "Zero Setup, Full Power",     desc: "Plug Lunara into your stack in minutes. No developers required." },
    { title: "Real Results",               desc: "Early teams using Lunara report significantly faster deal velocity and improved funnel conversion." },
  ];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-[4000px] relative overflow-hidden">
      <canvas id="starfield" className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Lead the Future with AI-Powered Sales</h1>
        <p className="text-xl mb-8">Lunara is your guide through the cosmos of modern enterprise funnels.</p>
        <div className="space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold shadow-lg">Request Access</button>
          <button className="border border-white px-6 py-2 rounded-2xl font-semibold">See How It Works</button>
        </div>
      </section>

      {/* Comet Trail */}
      <motion.div
        className="absolute top-0 left-0 w-28 h-28 rounded-full blur-3xl opacity-40 will-change-transform -z-20"
        style={{
          x: cometX,
          y: cometY,
          background: "radial-gradient(circle at center, rgba(56,189,248,0.6), transparent 70%)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Comet Core */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full shadow-lg will-change-transform"
        style={{
          x: cometX,
          y: cometY,
          background: "linear-gradient(135deg, #ffffff, #38bdf8)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      />

      {/* Features */}
      {sections.map((sec, idx) => (
        <motion.section
          key={idx}
          className="h-[80vh] flex flex-col justify-center items-center text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.4 }}
        >
          <motion.div className="max-w-2xl bg-white/90 backdrop-blur-sm text-black rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-4">{sec.title}</h2>
            <p className="text-lg">{sec.desc}</p>
          </motion.div>
        </motion.section>
      ))}

      {/* Final CTA */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Board the Comet</h2>
        <p className="text-lg mb-6">Lunara is currently onboarding select teams. Want early access?</p>
        <input type="email" placeholder="Enter your email" className="border border-white px-4 py-2 rounded-2xl text-black" />
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-2xl font-semibold shadow-lg">Notify Me</button>
      </section>
    </div>
  );
}
