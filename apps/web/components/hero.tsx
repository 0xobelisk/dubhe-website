"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { ChevronRight, Download, PlayCircle, Globe, Code, Box } from "lucide-react"
import CountUp from "react-countup"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

// Constellation data for Big Dipper/Ursa Major
const bigDipperStars = [
  { name: "Dubhe", size: 2.5, brightness: 1.0, color: "#4D9DFF", main: true }, // Alpha UMa - Dubhe (highlighted)
  { name: "Merak", size: 1.8, brightness: 0.9, color: "#FFFFFF" },  // Beta UMa
  { name: "Phecda", size: 1.8, brightness: 0.9, color: "#FFFFFF" }, // Gamma UMa
  { name: "Megrez", size: 1.5, brightness: 0.8, color: "#FFFFFF" }, // Delta UMa
  { name: "Alioth", size: 2.0, brightness: 0.9, color: "#FFFFFF" }, // Epsilon UMa
  { name: "Mizar", size: 1.8, brightness: 0.9, color: "#FFFFFF" },  // Zeta UMa
  { name: "Alkaid", size: 1.8, brightness: 0.9, color: "#FFFFFF" }  // Eta UMa
];

// Constellation lines connecting the stars (indices of bigDipperStars)
const constellationLines = [
  [0, 1], // Dubhe to Merak
  [1, 2], // Merak to Phecda
  [2, 3], // Phecda to Megrez
  [3, 4], // Megrez to Alioth
  [4, 5], // Alioth to Mizar
  [5, 6]  // Mizar to Alkaid
] as const; // Make this a readonly tuple to ensure type safety

// Star colors for background stars
const starColors = [
  "#FFFFFF", // White
  "#FFD700", // Gold
  "#4D9DFF", // Blue
  "#E6E6FA", // Lavender
  "#FFFAFA", // Snow white
  "#F0F8FF", // Alice blue
  "#87CEEB", // Sky blue
  "#FFE4B5", // Moccasin (slight orange)
  "#FFC0CB"  // Pink
];

// Define the star properties
interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  name?: string;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  isConstellationStar: boolean;
  burstProbability: number;
  burstDuration: number;
  burstMaxDuration: number;
  colorTransitionSpeed: number;
  driftX: number;
  driftY: number;
  driftSpeed: number;
  driftAmplitude: number;
  driftPhase: number;
}

// Create background stars
const createBackgroundStars = (numStars: number): Star[] => {
  const stars: Star[] = [];
  
  // Create a range of star sizes with more small stars than large ones
  for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 2.5 + 0.5; // Range from 0.5 to 3
    const brightness = Math.random() * 0.8 + 0.2; // Range from 0.2 to 1
    const twinkleSpeed = Math.random() * 0.02 + 0.005; // Varied twinkle speeds
    const colorIndex = Math.floor(Math.random() * starColors.length);
    const color = starColors[colorIndex] || '#FFFFFF'; // Fallback to white if undefined
    
    // Add drift parameters for floating motion
    const driftSpeed = Math.random() * 0.0002 + 0.00005; // Slower drift
    const driftAmplitude = Math.random() * 0.6 + 0.1; // How far it drifts
    const driftPhase = Math.random() * Math.PI * 2; // Random starting phase
    
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size,
      brightness,
      twinkleSpeed,
      twinkleOffset: Math.random() * Math.PI * 2, // Random starting phase
      color,
      isConstellationStar: false,
      burstProbability: 0.0005, // Rare bursts
      burstDuration: 0,
      burstMaxDuration: Math.random() * 30 + 10, // 10-40 frames
      colorTransitionSpeed: Math.random() * 0.01 + 0.005,
      driftX: Math.random() - 0.5, // Random direction
      driftY: Math.random() - 0.5, // Random direction
      driftSpeed,
      driftAmplitude,
      driftPhase
    });
  }
  
  return stars;
};

// Create constellation stars with enhanced properties
const createConstellationStars = (canvas: HTMLCanvasElement, scale: number) => {
  const stars: Star[] = [];
  const centerX = canvas.width * 0.6;
  const centerY = canvas.height * 0.4;
  
  // Define positions of the Big Dipper stars
  const positions = [
    { x: 0.2, y: 0.1 },   // Dubhe
    { x: 0, y: 0.3 },     // Merak
    { x: 0.3, y: 0.4 },   // Phecda
    { x: 0.5, y: 0.4 },   // Megrez
    { x: 0.7, y: 0.3 },   // Alioth
    { x: 0.9, y: 0.25 },  // Mizar
    { x: 1.1, y: 0.1 }    // Alkaid
  ];
  
  // Create constellation stars
  bigDipperStars.forEach((star, index) => {
    // Ensure position exists at index
    const position = positions[index];
    if (!position) return;
    
    // Add gentle drift for constellation stars (less than background stars)
    const driftSpeed = Math.random() * 0.00005 + 0.00002; // Very slow drift
    const driftAmplitude = Math.random() * 0.1 + 0.02; // Smaller amplitude for constellation
    const driftPhase = Math.random() * Math.PI * 2; // Random starting phase
    
    stars.push({
      x: centerX + (position.x - 0.5) * scale,
      y: centerY + (position.y - 0.25) * scale,
      size: star.size,
      brightness: star.brightness,
      twinkleSpeed: 0.01 + Math.random() * 0.01, // Slightly faster twinkle
      twinkleOffset: Math.random() * Math.PI * 2,
      color: star.color,
      isConstellationStar: true,
      burstProbability: 0, // Constellation stars don't burst
      burstDuration: 0,
      burstMaxDuration: 0,
      colorTransitionSpeed: 0,
      driftX: (Math.random() - 0.5) * 0.5, // Less random direction
      driftY: (Math.random() - 0.5) * 0.5, // Less random direction
      driftSpeed,
      driftAmplitude,
      driftPhase
    });
  });
  
  return stars;
};

// Helper function to convert hex to rgb - moved to global scope to make it available
function hexToRgb(hex: string): string {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return as a string
  return `${r}, ${g}, ${b}`;
}

// Helper function to get color from transition phase
const getTransitionColor = (baseColor: string, phase: number, intensity: number = 0.3) => {
  // Extract RGB values
  const rgb = hexToRgb(baseColor).split(', ').map(Number);
  
  // Apply slight color shift based on phase
  const r = Math.min(255, Math.max(0, rgb[0] || 0 + Math.sin(phase) * intensity * 50));
  const g = Math.min(255, Math.max(0, rgb[1] || 0 + Math.sin(phase + Math.PI/3) * intensity * 50));
  const b = Math.min(255, Math.max(0, rgb[2] || 0 + Math.sin(phase + Math.PI*2/3) * intensity * 50));
  
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
};

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Setup scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  // 添加计数器状态
  const [counts, setCounts] = useState({
    transactions: 3214,
    events: 155017,
    gasSavings: 101.9
  })
  
  // 添加状态来控制是否应该增加数值
  const [shouldIncrement, setShouldIncrement] = useState(true)
  
  // 使用 useEffect 创建一个每秒增加数值的定时器
  useEffect(() => {
    if (!shouldIncrement) return
    
    const interval = setInterval(() => {
      setCounts(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 5 + 1),
        events: prev.events + Math.floor(Math.random() * 20 + 1),
        gasSavings: prev.gasSavings + Math.random() * 0.1
      }))
    }, 1000)
    
    return () => clearInterval(interval)
  }, [shouldIncrement])
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Constellation animation in canvas
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Scale for constellation
    const scale = Math.min(canvas.width, canvas.height) * 0.3
    
    // Create stars
    const backgroundStars = createBackgroundStars(200)
    const constellationStars = createConstellationStars(canvas, scale)
    
    // Animation time tracker
    let time = 0
    let lastBurstCheck = 0
    
    // Animation loop
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background stars with twinkling effect
      backgroundStars.forEach((star, index) => {
        // Update star position with drifting motion
        const originalX = star.x;
        const originalY = star.y;
        
        // Calculate drift offsets using sine/cosine for natural movement
        // Lissajous pattern for more interesting motion
        const driftOffsetX = Math.sin(time * star.driftSpeed + star.driftPhase) * star.driftAmplitude * 2;
        const driftOffsetY = Math.cos(time * star.driftSpeed * 1.3 + star.driftPhase) * star.driftAmplitude;
        
        // Apply drift to position
        star.x = originalX + driftOffsetX;
        star.y = originalY + driftOffsetY;
        
        // Handle edge cases - wrap around canvas if star drifts off-screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // More dramatic twinkling effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5
        
        // Color transition effect for some stars
        let starColor = star.color
        if (star.colorTransitionSpeed > 0 && star.colorTransitionSpeed !== undefined) {
          star.twinkleOffset += 0.005
          const transitionColor = getTransitionColor(star.color, star.twinkleOffset, star.colorTransitionSpeed)
          starColor = `rgba(${transitionColor}, ${star.brightness * twinkle})`
        } else {
          starColor = `rgba(${hexToRgb(star.color)}, ${star.brightness * twinkle})`
        }
        
        // Draw star
        ctx.fillStyle = starColor
        ctx.beginPath()
        // Using twinkle to affect size as well
        const dynamicSize = star.size * (0.7 + twinkle * 0.5)
        ctx.arc(star.x, star.y, dynamicSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Star bursts effect (occasionally)
        if (star.burstProbability > 0 && star.burstDuration !== undefined) {
          star.burstDuration -= 0.01
          if (star.burstDuration <= 0) {
            // Create a burst effect
            if (star.burstMaxDuration !== undefined) {
              const burstGradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, star.size * 10
              )
              burstGradient.addColorStop(0, `rgba(${hexToRgb(star.color)}, 0.8)`)
              burstGradient.addColorStop(0.4, `rgba(${hexToRgb(star.color)}, 0.2)`)
              burstGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
              
              ctx.fillStyle = burstGradient
              ctx.beginPath()
              ctx.arc(star.x, star.y, star.size * 10, 0, Math.PI * 2)
              ctx.fill()
              
              // Create burst rays
              const rayCount = 8
              ctx.save()
              ctx.translate(star.x, star.y)
              
              for (let i = 0; i < rayCount; i++) {
                const angle = (Math.PI * 2 / rayCount) * i
                const rayLength = star.size * 15
                
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(Math.cos(angle) * rayLength, Math.sin(angle) * rayLength)
                ctx.strokeStyle = `rgba(${hexToRgb(star.color)}, 0.4)`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
              ctx.restore()
              
              // Reset burst timer
              star.burstDuration = Math.random() * 20 + 20
            }
          }
        }
      })
      
      // Draw constellation lines with subtle animation
      ctx.beginPath();
      constellationLines.forEach(([fromIdx, toIdx]) => {
        // Type safety: Ensure these stars exist before accessing
        const fromStar = constellationStars[fromIdx];
        const toStar = constellationStars[toIdx];
        
        // Skip if either star doesn't exist
        if (fromStar && toStar) {
          // Update constellation star positions with subtle drifting
          // Use the same pattern as background stars but with less amplitude
          const fromDriftX = Math.sin(time * fromStar.driftSpeed + fromStar.driftPhase) * fromStar.driftAmplitude;
          const fromDriftY = Math.cos(time * fromStar.driftSpeed * 1.3 + fromStar.driftPhase) * fromStar.driftAmplitude;
          const toDriftX = Math.sin(time * toStar.driftSpeed + toStar.driftPhase) * toStar.driftAmplitude;
          const toDriftY = Math.cos(time * toStar.driftSpeed * 1.3 + toStar.driftPhase) * toStar.driftAmplitude;
          
          // Add drifting to positions
          const fromX = fromStar.x + fromDriftX;
          const fromY = fromStar.y + fromDriftY;
          const toX = toStar.x + toDriftX;
          const toY = toStar.y + toDriftY;
          
          // Add a subtle wave animation to the lines
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          const offset = Math.sin(time * 0.5) * 2; // Subtle offset
          
          ctx.moveTo(fromX, fromY);
          
          // Draw a slightly curved line with quadratic curve
          ctx.quadraticCurveTo(
            midX + offset, 
            midY + offset, 
            toX, 
            toY
          );
        }
      });
      
      // Line glow effect
      ctx.strokeStyle = `rgba(77, 157, 255, ${0.2 + Math.sin(time * 0.3) * 0.1})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Draw over with a more solid line
      ctx.beginPath();
      constellationLines.forEach(([fromIdx, toIdx]) => {
        const fromStar = constellationStars[fromIdx];
        const toStar = constellationStars[toIdx];
        
        if (fromStar && toStar) {
          ctx.moveTo(fromStar.x, fromStar.y);
          ctx.lineTo(toStar.x, toStar.y);
        }
      });
      ctx.strokeStyle = 'rgba(77, 157, 255, 0.5)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Draw constellation stars with enhanced effects
      constellationStars.forEach((star) => {
        // Apply drifting motion to constellation stars
        const driftX = Math.sin(time * star.driftSpeed + star.driftPhase) * star.driftAmplitude;
        const driftY = Math.cos(time * star.driftSpeed * 1.3 + star.driftPhase) * star.driftAmplitude;
        
        // Original position plus drift
        const x = star.x + driftX;
        const y = star.y + driftY;
        
        // More dramatic twinkling effect
        const twinkleFactor = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7
        
        // Calculate main star pulsation
        const pulseFactor = star.isConstellationStar 
          ? 1 + Math.sin(time * 0.5) * 0.15 
          : 1;
        
        // Draw glow for stars
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, star.size * 6 * pulseFactor
        );
        
        // Color transition for stars
        let starColor = star.color;
        if (star.colorTransitionSpeed > 0 && star.colorTransitionSpeed !== undefined) {
          star.twinkleOffset += star.isConstellationStar ? 0.01 : 0.003;
          starColor = star.isConstellationStar
            ? star.color // Maintain blue for main star
            : `rgb(${getTransitionColor(star.color, star.twinkleOffset, star.colorTransitionSpeed)})`;
        }
        
        if (star.isConstellationStar) {
          // Enhanced glow for Dubhe
          const glowOpacity = 0.7 + Math.sin(time * 0.8) * 0.3;
          gradient.addColorStop(0, `rgba(77, 157, 255, ${glowOpacity})`);
          gradient.addColorStop(0.4, 'rgba(77, 157, 255, 0.5)');
          gradient.addColorStop(0.7, 'rgba(77, 157, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(77, 157, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, star.size * 7 * pulseFactor, 0, Math.PI * 2);
          ctx.fill();
          
          // Extra outer glow for Dubhe that pulses
          const outerGlow = ctx.createRadialGradient(
            x, y, star.size * 7,
            x, y, star.size * 15
          );
          const outerGlowOpacity = 0.1 + Math.sin(time * 0.3) * 0.05;
          outerGlow.addColorStop(0, `rgba(77, 157, 255, ${outerGlowOpacity})`);
          outerGlow.addColorStop(1, 'rgba(77, 157, 255, 0)');
          
          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(x, y, star.size * 15, 0, Math.PI * 2);
          ctx.fill();
          
          // Rays emanating from Dubhe with enhanced animation
          const rayCount = 6;
          const rayLength = star.size * (15 + Math.sin(time * 0.5) * 3);
          
          ctx.save();
          ctx.translate(x, y);
          
          for (let i = 0; i < rayCount; i++) {
            const angle = (Math.PI * 2 / rayCount) * i + time * 0.1;
            const rayX = Math.cos(angle) * rayLength;
            const rayY = Math.sin(angle) * rayLength;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(rayX, rayY);
            ctx.strokeStyle = `rgba(77, 157, 255, ${0.3 * (Math.sin(time + i) * 0.5 + 0.5)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
          ctx.restore();
          
          // Add extra glimmer effects for Dubhe
          ctx.save();
          ctx.translate(x, y);
          
          // Small sparkles around the main star
          for (let i = 0; i < 12; i++) {
            const sparkleAngle = Math.PI * 2 * Math.random();
            const sparkleDistance = star.size * (6 + Math.random() * 5);
            const sparkleX = Math.cos(sparkleAngle) * sparkleDistance;
            const sparkleY = Math.sin(sparkleAngle) * sparkleDistance;
            const sparkleSize = 0.3 + Math.random() * 0.6;
            const sparkleOpacity = 0.1 + Math.random() * 0.3;
            
            ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, sparkleSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
        } else {
          // Enhanced glow for regular constellation stars
          const rgbValues = hexToRgb(starColor);
          gradient.addColorStop(0, `rgba(${rgbValues}, 0.7)`);
          gradient.addColorStop(0.5, `rgba(${rgbValues}, 0.3)`);
          gradient.addColorStop(1, `rgba(${rgbValues}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, star.size * 4 * twinkleFactor, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw star center with enhanced brightness and pulsating
        const rgbValues = hexToRgb(starColor);
        ctx.fillStyle = `rgba(${rgbValues}, ${star.brightness * twinkleFactor})`;
        ctx.beginPath();
        ctx.arc(x, y, star.size * twinkleFactor * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
        
        // Add extra glow effects for all constellation stars
        if (!star.isConstellationStar) {
          // Add extra glow effects
          ctx.beginPath();
          ctx.arc(x, y, star.size * 7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgbValues}, 0.1)`;
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    }
  }, [])

  return (
    <motion.div 
      ref={containerRef}
      className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-24 min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Canvas background for constellation animation */}
      <motion.canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-gray-950 to-black -z-10"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* Additional gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5 opacity-70 -z-10" />
      
      {/* Animated tech grid pattern with lower opacity */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-3 -z-10" />
      
      {/* Glowing accent */}
      <motion.div 
        className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-10 -z-10"
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] opacity-10 -z-10"
        animate={{ 
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 relative z-10">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          style={{ y: headerY }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              Version 1.1.1 Now Available
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold tracking-tight sm:text-7xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Move Without <span className="text-blue-400">Limits</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Dubhe Engine is an open-source toolchain for Move applications, empowering everyone to build intent-centric worlds.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="https://dubhe.obelisk.build/dubhe/sui/quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 transition-all duration-200 flex items-center"
              >
              <Download className="h-4 w-4 mr-2" />
                Download Now
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="https://www.youtube.com/@DubheEngine"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-800 px-8 py-3 text-base transition-all duration-300 text-gray-200 inline-flex items-center"
              >
              <PlayCircle className="h-4 w-4 mr-2" />
                Watch Tutorial
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 flex justify-center gap-6 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              <span>Cross-platform</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Code className="h-5 w-5 mr-2 text-blue-400" />
              <span>Open Source</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1, color: "#4D9DFF" }}
            >
              <Box className="h-5 w-5 mr-2 text-blue-400" />
              <span>Real-time Events</span>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-2xl shadow-blue-900/20 border border-gray-800"
            whileHover={{ 
              boxShadow: "0 20px 40px -15px rgba(30, 64, 175, 0.3)",
              borderColor: "rgba(96, 165, 250, 0.5)"
            }}
          >
            {/* Terminal interface mockup */}
            <div className="w-full bg-gray-900 aspect-[16/9] relative">
              {/* UI elements overlay to make it look like a terminal window */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800/80 backdrop-blur-sm flex items-center px-4 border-b border-gray-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-6"></div>
                <div className="text-xs text-gray-400">Project: New Game - Dubhe Engine 1.0</div>
              </div>
              
              {/* Terminal content */}
              <div className="terminal-content p-8 pt-16 text-sm text-gray-300 font-mono overflow-y-auto h-full bg-gradient-to-b from-gray-900 to-gray-950">
                {/* Command prompt header with subtle glow */}
                <div className="border-b border-blue-900/30 pb-3 mb-4">
                  <span className="text-blue-500 font-semibold">$ Dubhe Engine CLI</span>
                  <span className="text-gray-500 text-xs ml-2">v1.1.1</span>
                </div>
                
                <div className="command-line flex items-center">
                  <span className="text-cyan-400 mr-2">$</span>
                  <span className="text-white">pnpm create dubhe@latest</span>
                </div>
                <div className="result-line text-gray-400 mt-1">Downloading create-dubhe@0.1.9: 7.41 MB/7.41 MB, done</div>
                <div className="result-line text-teal-700">.../195e05c54ab-abb7 | <span className="text-green-500">+148 ++++++++++++++</span></div>
                <div className="result-line text-gray-400">Progress: resolved <span className="text-green-400">148</span>, reused <span className="text-blue-400">147</span>, downloaded <span className="text-yellow-400">1</span>, added <span className="text-green-400">148</span>, done</div>
                
                <div className="mt-4">
                  <div className="command-line">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Input your projectName:</span>
                    <span className="text-white ml-2 border-b border-blue-500/30 pb-px">dubhe-template-project</span>
                  </div>
                  <div className="command-line mt-2">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Pick your chain:</span>
                    <span className="bg-blue-900/20 text-cyan-300 px-2 py-0.5 ml-2 rounded text-xs">sui</span>
                  </div>
                  <div className="command-line mt-2">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span className="text-blue-300">Pick your platform:</span>
                    <span className="bg-blue-900/20 text-cyan-300 px-2 py-0.5 ml-2 rounded text-xs">101</span>
                  </div>
                </div>
                
                <div className="result-line mt-5">
                  <span className="text-yellow-400 flex items-center">
                    <span className="text-2xl mr-2">🎉</span> Project creation successful!
                  </span>
                </div>
                <div className="result-line text-blue-400 flex items-center">
                  <span className="mr-2">📂</span> Project location: <span className="text-gray-400">/path/to/dubhe-template-project</span>
                </div>
                
                <div className="mt-6 bg-blue-950/20 border border-blue-900/30 rounded-md p-4">
                  <div className="next-steps text-white font-semibold flex items-center">
                    <span className="text-blue-500 mr-2">▶</span> Next steps:
                  </div>
                  <div className="command-suggestion ml-6 mt-2">
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">1.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">cd dubhe-template-project</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">2.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm install</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">3.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm run start:localnet</span>
                    </div>
                    <div className="flex items-center text-yellow-300 my-1">
                      <span className="text-gray-500 mr-2">4.</span>
                      <span className="bg-gray-800/50 px-2 py-0.5 rounded">pnpm run dev</span>
                    </div>
          </div>
        </div>
        
                <div className="mt-6 cursor-animation flex items-center">
                  <span className="text-cyan-400 mr-2">$</span>
                  <span className="inline-block w-3 h-5 bg-white animate-pulse"></span>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-20 pointer-events-none"></div>
            
            {/* Add 3D perspective effect with transform */}
            <div className="absolute inset-0 shadow-inner pointer-events-none border border-blue-500/20 rounded-lg transform perspective"></div>
          </motion.div>
          
          {/* Version label */}
          <motion.div 
            className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-800 shadow-lg z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            whileHover={{ 
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(30, 64, 175, 0.4)",
              borderColor: "rgba(96, 165, 250, 0.6)" 
            }}
          >
            <div className="flex items-center gap-x-2 text-sm font-medium">
              <span className="text-gray-300">Latest Version: <span className="text-blue-400">Dubhe Engine v1.1.1</span></span>
              <ChevronRight className="h-4 w-4 text-blue-400" />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Metrics/Stats Section */}
        <motion.div 
          className="mt-16 pt-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.transactions} 
                  separator="," 
                  duration={0.5} 
                  useEasing={false}
                  preserveValue={true} 
                  suffix="+" 
                />
              </div>
              <div className="text-gray-400">Transactions</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.events} 
                  separator="," 
                  duration={0.5} 
                  useEasing={false} 
                  preserveValue={true}
                  suffix="+" 
                />
              </div>
              <div className="text-gray-400">Event-Driven Operations</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                <CountUp 
                  end={counts.gasSavings} 
                  decimals={1} 
                  duration={0.5} 
                  useEasing={false} 
                  preserveValue={true}
                  prefix="$" 
                  suffix="M" 
                />
              </div>
              <div className="text-gray-400">Gas Savings (USD)</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">80%+</div>
              <div className="text-gray-400">Time Savings</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 