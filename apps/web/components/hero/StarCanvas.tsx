"use client"

import { useEffect, useRef, memo, useMemo } from "react"
import { motion, MotionValue } from "framer-motion"

// Move static data outside component for better performance
// Constellation data for Big Dipper/Ursa Major
const BIG_DIPPER_STARS = [
  { name: "Dubhe", size: 2.5, brightness: 1.0, color: "#4D9DFF", main: true }, // Alpha UMa - Dubhe (highlighted)
  { name: "Merak", size: 1.8, brightness: 0.9, color: "#FFFFFF" },  // Beta UMa
  { name: "Phecda", size: 1.8, brightness: 0.9, color: "#FFFFFF" }, // Gamma UMa
  { name: "Megrez", size: 1.5, brightness: 0.8, color: "#FFFFFF" }, // Delta UMa
  { name: "Alioth", size: 2.0, brightness: 0.9, color: "#FFFFFF" }, // Epsilon UMa
  { name: "Mizar", size: 1.8, brightness: 0.9, color: "#FFFFFF" },  // Zeta UMa
  { name: "Alkaid", size: 1.8, brightness: 0.9, color: "#FFFFFF" }  // Eta UMa
];

// Constellation lines connecting the stars (indices of bigDipperStars)
const CONSTELLATION_LINES = [
  [0, 1], // Dubhe to Merak
  [1, 2], // Merak to Phecda
  [2, 3], // Phecda to Megrez
  [3, 0], // Megrez back to Dubhe - complete the bowl
  [3, 4], // Megrez to Alioth
  [4, 5], // Alioth to Mizar
  [5, 6]  // Mizar to Alkaid
] as const; // Make this a readonly tuple to ensure type safety

// Star colors for background stars - memoized constant
const STAR_COLORS = [
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

/**
 * 星星属性接口定义
 */
interface Star {
  /** 星星X坐标位置 */
  x: number;
  /** 星星Y坐标位置 */
  y: number;
  /** 星星大小半径 */
  size: number;
  /** 星星亮度 (0-1) */
  brightness: number;
  /** 星星名称 (可选，用于星座星) */
  name?: string;
  /** 闪烁动画速度 */
  twinkleSpeed: number;
  /** 闪烁动画相位偏移 */
  twinkleOffset: number;
  /** 星星颜色 (十六进制) */
  color: string;
  /** 是否为星座星 */
  isConstellationStar: boolean;
  /** 爆发效果概率 */
  burstProbability: number;
  /** 当前爆发持续时间 */
  burstDuration: number;
  /** 最大爆发持续时间 */
  burstMaxDuration: number;
  /** 颜色过渡动画速度 */
  colorTransitionSpeed: number;
  /** 漂移X方向 */
  driftX: number;
  /** 漂移Y方向 */
  driftY: number;
  /** 漂移速度 */
  driftSpeed: number;
  /** 漂移幅度 */
  driftAmplitude: number;
  /** 漂移相位 */
  driftPhase: number;
}

/**
 * StarCanvas组件Props接口
 */
interface StarCanvasProps {
  /** 背景透明度变换 */
  backgroundOpacity: MotionValue<number>;
}

/**
 * 创建背景星星数组
 * @param numStars 星星数量
 * @returns Star对象数组
 */
const createBackgroundStars = (numStars: number): Star[] => {
  const stars: Star[] = [];
  
  // Create a range of star sizes with more small stars than large ones
  for (let i = 0; i < numStars; i++) {
    const size = Math.random() * 2.5 + 0.5; // Range from 0.5 to 3
    const brightness = Math.random() * 0.8 + 0.2; // Range from 0.2 to 1
    const twinkleSpeed = Math.random() * 0.02 + 0.005; // Varied twinkle speeds
    const colorIndex = Math.floor(Math.random() * STAR_COLORS.length);
    const color = STAR_COLORS[colorIndex] || '#FFFFFF'; // Fallback to white if undefined
    
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

/**
 * 创建星座星星（Big Dipper）
 * @param canvas Canvas元素用于获取尺寸
 * @param scale 星座缩放比例
 * @returns 星座Star对象数组
 */
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
  BIG_DIPPER_STARS.forEach((star, index) => {
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

/**
 * 将十六进制颜色转换为RGB字符串
 * @param hex 十六进制颜色值
 * @returns RGB值字符串 "r, g, b"
 */
const hexToRgb = (hex: string): string => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return as a string
  return `${r}, ${g}, ${b}`;
}

/**
 * 根据过渡相位获取颜色变换
 * @param baseColor 基础颜色
 * @param phase 过渡相位
 * @param intensity 变换强度，默认0.3
 * @returns 变换后的RGB颜色字符串
 */
const getTransitionColor = (baseColor: string, phase: number, intensity: number = 0.3) => {
  // Extract RGB values
  const rgb = hexToRgb(baseColor).split(', ').map(Number);
  
  // Apply slight color shift based on phase
  const r = Math.min(255, Math.max(0, rgb[0] || 0 + Math.sin(phase) * intensity * 50));
  const g = Math.min(255, Math.max(0, rgb[1] || 0 + Math.sin(phase + Math.PI/3) * intensity * 50));
  const b = Math.min(255, Math.max(0, rgb[2] || 0 + Math.sin(phase + Math.PI*2/3) * intensity * 50));
  
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
};

/**
 * StarCanvas组件 - 星座动画背景
 * 
 * 功能特性：
 * - Big Dipper星座动画
 * - 背景星星动画和闪烁效果
 * - 星星漂移和爆发效果
 * - 响应式Canvas尺寸
 * 
 * @param backgroundOpacity 背景透明度变换
 * @returns StarCanvas组件JSX元素
 */
const StarCanvas = memo(function StarCanvas({ backgroundOpacity }: StarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Memoize expensive star generation
  const backgroundStars = useMemo(() => createBackgroundStars(200), [])

  useEffect(() => {
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
    
    // Create constellation stars (backgroundStars already memoized)
    const constellationStars = createConstellationStars(canvas, scale)
    
    // Animation time tracker
    let time = 0
    
    // Animation loop
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background stars with twinkling effect
      backgroundStars.forEach((star) => {
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
      CONSTELLATION_LINES.forEach(([fromIdx, toIdx]) => {
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
      CONSTELLATION_LINES.forEach(([fromIdx, toIdx]) => {
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
  }, [backgroundStars]) // Add backgroundStars as dependency since it's used inside

  return (
    <motion.canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-gray-950 to-black -z-10"
      style={{ opacity: backgroundOpacity }}
    />
  )
})

export default StarCanvas