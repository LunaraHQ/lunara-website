import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const cometX = useTransform(scrollY, [0, 4000], ["0%", "100%"]);
  const cometY = useTransform(scrollY, [0, 4000], ["0px", "3000px"]);

  useEffect(() => {
    const canvas = document.getElementById("starfield");
    const ctx = canvas?.getContext("2d");

    const layers = [[], [], []];
    const speeds = [0.3, 0.2, 0.1];

    layers.forEach((layer, i) => {
      for (let j = 0; j < 60; j++) {
        layer.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
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
          if (star.y > window.innerHeight) star.y = 0;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        })
      );

      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animate();
  }, []);

  const sections = [
    {
      title: "Intelligent Lead Funnels",
      desc: "Build adaptive sales funnels powered by AI. Never lose a lead in orbit again.",
    },
    {
      title: "Sales Command Center",
      desc: "One dashboard to rule your revenue galaxy. Unified CRM, email, analytics, and automations.",
    },
    {
      title: "Enterprise-Grade Security",
      desc: "Built for scale. Encrypted by default, compliant from launch.",
    },
    {
      title: "Zero Setup, Full Power",
      desc: "Plug Lunara into your stack in minutes. No developers required.",
    },
    {
      title: "Real Results",
      desc: "Early teams using Lunara report significantly faster deal velocity and improved funnel conversion.",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-[4000px] relative overflow-hidden"
    >
      <canvas
        id="starfield"
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Lead the Future with AI-Powered Sales
        </h1>
        <p className="text-xl mb-8">
          Lunara is your guide through the cosmos of modern enterprise funnels.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded-2xl font-semibold shadow-lg">
            Request Access
          </button>
          <button className="border border-white px-6 py-2 rounded-2xl font-semibold">
            See How It Works
          </button>
        </div>
      </section>

      {/* Comet Trail */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-blue-400/40 to-transparent rounded-full absolute top-0 left-0 blur-2xl opacity-50 -z-10"
        style={{ x: cometX, y: cometY }}
      />

      {/* Comet Core */}
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-white to-blue-400 rounded-full absolute top-0 left-0 shadow-2xl"
        style={{ x: cometX, y: cometY }}
      />

      {/* Feature Sections */}
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
        <p className="text-lg mb-6">
          Lunara is currently onboarding select teams. Want early access?
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg text-black"
        />
        <button className="mt-4 bg-white text-black px-6 py-2 rounded-2xl font-semibold shadow-lg">
          Notify Me
        </button>
      </section>
    </div>
);