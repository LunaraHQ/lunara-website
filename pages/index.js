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

      layers.forEach((stars) => {
        stars.forEach((star) => {
          star.y += star.speed;
          if (star.y > window.innerHeight) star.y = 0;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
        });
      });

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
        <h1 className="text-5xl font-bold mb-4">Lead the Future with AI-Powered
