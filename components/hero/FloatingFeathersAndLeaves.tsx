"use client";

import React, { useEffect, useRef } from "react";

interface FloatingItemDef {
  id: number;
  type: "feather" | "leaf";
  depth: "bg" | "mid" | "fg";
  leftPct: number; // 0 - 100%
  topPct: number;  // 0 - 100%
  baseRot: number; // degrees
  speed: number;   // oscillation speed multiplier
  phaseX: number;  // radians
  phaseY: number;  // radians
  phaseRot: number;// radians
  ampX: number;    // horizontal float amplitude in px
  ampY: number;    // vertical float amplitude in px
  ampRot: number;  // rotation amplitude in deg
  driftSpeedX: number; // subtle continuous wind drift speed
}

const FLOATING_ELEMENTS: FloatingItemDef[] = [
  // 1. Top left (above headline) - subtle background feather
  {
    id: 1,
    type: "feather",
    depth: "bg",
    leftPct: 7,
    topPct: 12,
    baseRot: -28,
    speed: 0.85,
    phaseX: 0.2,
    phaseY: 1.4,
    phaseRot: 0.7,
    ampX: 26,
    ampY: 18,
    ampRot: 14,
    driftSpeedX: 0.4,
  },
  // 2. Upper center-left - midground leaf
  {
    id: 2,
    type: "leaf",
    depth: "mid",
    leftPct: 30,
    topPct: 8,
    baseRot: 38,
    speed: 1.1,
    phaseX: 2.1,
    phaseY: 0.5,
    phaseRot: 1.9,
    ampX: 32,
    ampY: 22,
    ampRot: 16,
    driftSpeedX: 0.5,
  },
  // 3. Upper center-right (high sky above meadow) - background feather
  {
    id: 3,
    type: "feather",
    depth: "bg",
    leftPct: 60,
    topPct: 14,
    baseRot: 18,
    speed: 0.75,
    phaseX: 3.4,
    phaseY: 2.8,
    phaseRot: 3.1,
    ampX: 22,
    ampY: 16,
    ampRot: 11,
    driftSpeedX: 0.35,
  },
  // 4. Upper right - foreground leaf
  {
    id: 4,
    type: "leaf",
    depth: "fg",
    leftPct: 84,
    topPct: 10,
    baseRot: -35,
    speed: 1.25,
    phaseX: 1.1,
    phaseY: 4.2,
    phaseRot: 0.3,
    ampX: 38,
    ampY: 26,
    ampRot: 18,
    driftSpeedX: 0.65,
  },
  // 5. Upper-right edge - midground feather
  {
    id: 5,
    type: "feather",
    depth: "mid",
    leftPct: 93,
    topPct: 26,
    baseRot: 60,
    speed: 0.95,
    phaseX: 4.8,
    phaseY: 1.9,
    phaseRot: 5.2,
    ampX: 28,
    ampY: 20,
    ampRot: 15,
    driftSpeedX: 0.45,
  },
  // 6. Mid left (far left negative space) - foreground leaf
  {
    id: 6,
    type: "leaf",
    depth: "fg",
    leftPct: 4,
    topPct: 42,
    baseRot: 22,
    speed: 1.15,
    phaseX: 0.9,
    phaseY: 3.1,
    phaseRot: 2.4,
    ampX: 36,
    ampY: 24,
    ampRot: 17,
    driftSpeedX: 0.6,
  },
  // 7. Mid sky center - midground feather
  {
    id: 7,
    type: "feather",
    depth: "mid",
    leftPct: 46,
    topPct: 32,
    baseRot: -42,
    speed: 1.0,
    phaseX: 5.2,
    phaseY: 0.8,
    phaseRot: 4.1,
    ampX: 30,
    ampY: 22,
    ampRot: 14,
    driftSpeedX: 0.5,
  },
  // 8. Mid right (above flock/field) - foreground feather
  {
    id: 8,
    type: "feather",
    depth: "fg",
    leftPct: 76,
    topPct: 36,
    baseRot: 12,
    speed: 1.3,
    phaseX: 2.7,
    phaseY: 5.4,
    phaseRot: 1.2,
    ampX: 40,
    ampY: 28,
    ampRot: 20,
    driftSpeedX: 0.7,
  },
  // 9. Mid right near outer boundary - background leaf
  {
    id: 9,
    type: "leaf",
    depth: "bg",
    leftPct: 89,
    topPct: 50,
    baseRot: -48,
    speed: 0.8,
    phaseX: 1.5,
    phaseY: 2.2,
    phaseRot: 3.8,
    ampX: 24,
    ampY: 15,
    ampRot: 12,
    driftSpeedX: 0.38,
  },
  // 10. Bottom-left (below CTAs) - midground leaf
  {
    id: 10,
    type: "leaf",
    depth: "mid",
    leftPct: 11,
    topPct: 76,
    baseRot: 32,
    speed: 1.05,
    phaseX: 3.9,
    phaseY: 4.7,
    phaseRot: 0.9,
    ampX: 34,
    ampY: 21,
    ampRot: 15,
    driftSpeedX: 0.52,
  },
  // 11. Bottom-left edge - background feather
  {
    id: 11,
    type: "feather",
    depth: "bg",
    leftPct: 3,
    topPct: 88,
    baseRot: -18,
    speed: 0.7,
    phaseX: 0.4,
    phaseY: 1.1,
    phaseRot: 5.6,
    ampX: 20,
    ampY: 14,
    ampRot: 10,
    driftSpeedX: 0.32,
  },
  // 12. Bottom-center-left - foreground feather
  {
    id: 12,
    type: "feather",
    depth: "fg",
    leftPct: 26,
    topPct: 82,
    baseRot: 44,
    speed: 1.2,
    phaseX: 4.3,
    phaseY: 2.5,
    phaseRot: 2.7,
    ampX: 38,
    ampY: 25,
    ampRot: 18,
    driftSpeedX: 0.62,
  },
  // 13. Bottom center (above grass) - midground leaf
  {
    id: 13,
    type: "leaf",
    depth: "mid",
    leftPct: 50,
    topPct: 74,
    baseRot: -22,
    speed: 0.9,
    phaseX: 2.9,
    phaseY: 3.8,
    phaseRot: 4.5,
    ampX: 28,
    ampY: 19,
    ampRot: 13,
    driftSpeedX: 0.48,
  },
  // 14. Bottom-right (near chicks/field) - midground feather
  {
    id: 14,
    type: "feather",
    depth: "mid",
    leftPct: 72,
    topPct: 80,
    baseRot: -32,
    speed: 1.0,
    phaseX: 1.8,
    phaseY: 0.9,
    phaseRot: 3.3,
    ampX: 30,
    ampY: 22,
    ampRot: 15,
    driftSpeedX: 0.5,
  },
  // 15. Bottom-right edge - foreground leaf
  {
    id: 15,
    type: "leaf",
    depth: "fg",
    leftPct: 91,
    topPct: 84,
    baseRot: 16,
    speed: 1.25,
    phaseX: 5.0,
    phaseY: 4.1,
    phaseRot: 1.6,
    ampX: 36,
    ampY: 26,
    ampRot: 19,
    driftSpeedX: 0.65,
  },
  // 16. Upper-left mid - background feather
  {
    id: 16,
    type: "feather",
    depth: "bg",
    leftPct: 19,
    topPct: 22,
    baseRot: 52,
    speed: 0.8,
    phaseX: 3.1,
    phaseY: 5.0,
    phaseRot: 2.1,
    ampX: 22,
    ampY: 16,
    ampRot: 12,
    driftSpeedX: 0.36,
  },
];

const DEPTH_CONFIG = {
  bg: {
    scale: 0.48,
    opacity: 0.25,
    filter: "blur(2.5px)",
    parallaxFactor: 0.018,
    interactionRadius: 130,
    repulsionStrength: 24,
    zIndex: 10,
  },
  mid: {
    scale: 0.75,
    opacity: 0.45,
    filter: "blur(0.8px)",
    parallaxFactor: 0.038,
    interactionRadius: 155,
    repulsionStrength: 34,
    zIndex: 11,
  },
  fg: {
    scale: 1.08,
    opacity: 0.68,
    filter: "none",
    parallaxFactor: 0.065,
    interactionRadius: 180,
    repulsionStrength: 45,
    zIndex: 12,
  },
};

interface FloatingFeathersAndLeavesProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function FloatingFeathersAndLeaves({
  containerRef,
}: FloatingFeathersAndLeavesProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Physics state refs for 60fps requestAnimationFrame loop
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const repelStateRef = useRef<Array<{ x: number; y: number }>>(
    FLOATING_ELEMENTS.map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Track mouse coordinates relative to container
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
      mousePosRef.current.x = -9999;
      mousePosRef.current.y = -9999;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      container.addEventListener("mouseleave", handleMouseLeave, {
        passive: true,
      });
    }

    let animFrameId: number;
    const startTime = performance.now();

    const renderLoop = (now: number) => {
      // Pause updates if document is hidden
      if (document.hidden) {
        animFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const elapsed = (now - startTime) / 1000; // time in seconds
      const containerRect = containerRef.current?.getBoundingClientRect();
      const containerW = containerRect?.width || 1400;
      const containerH = containerRect?.height || 800;

      const cursor = mousePosRef.current;
      const isMobile = window.innerWidth < 768;

      FLOATING_ELEMENTS.forEach((item, index) => {
        const domEl = itemRefs.current[index];
        if (!domEl) return;

        // Hide secondary elements on mobile for clean performance & compact spacing
        if (isMobile && index >= 8) {
          domEl.style.display = "none";
          return;
        } else {
          domEl.style.display = "block";
        }

        const depthCfg = DEPTH_CONFIG[item.depth];

        // 1. Organic Base Float Wave Calculations
        const t = elapsed * item.speed;
        const floatX =
          Math.sin(t * 0.75 + item.phaseX) * item.ampX +
          Math.cos(t * 0.35 + item.phaseX * 0.5) * (item.ampX * 0.4);
        const floatY =
          Math.cos(t * 0.85 + item.phaseY) * item.ampY +
          Math.sin(t * 0.42 + item.phaseY * 0.5) * (item.ampY * 0.3);
        const floatRot =
          Math.sin(t * 0.6 + item.phaseRot) * item.ampRot +
          Math.cos(t * 0.28 + item.phaseRot) * (item.ampRot * 0.4);

        // 2. Base Center Anchor in Pixel Coordinates
        const anchorX = (item.leftPct / 100) * containerW;
        const anchorY = (item.topPct / 100) * containerH;

        // 3. Parallax Offset based on cursor location relative to center
        let parallaxX = 0;
        let parallaxY = 0;
        if (cursor.active && !prefersReduced && !isMobile) {
          const normCenterX = (cursor.x - containerW / 2) / (containerW / 2);
          const normCenterY = (cursor.y - containerH / 2) / (containerH / 2);
          parallaxX = -normCenterX * 24 * depthCfg.parallaxFactor * 10;
          parallaxY = -normCenterY * 18 * depthCfg.parallaxFactor * 10;
        }

        // 4. Interactive Mouse Repulsion with Soft Air Resistance
        const currentPosX = anchorX + floatX + parallaxX;
        const currentPosY = anchorY + floatY + parallaxY;

        let targetRepelX = 0;
        let targetRepelY = 0;

        if (cursor.active && !prefersReduced && !isMobile) {
          const dx = currentPosX - cursor.x;
          const dy = currentPosY - cursor.y;
          const distSq = dx * dx + dy * dy;
          const radius = depthCfg.interactionRadius;
          const radiusSq = radius * radius;

          if (distSq < radiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            // Non-linear gentle air push curve
            const normalizedDist = 1 - dist / radius;
            const force =
              Math.pow(normalizedDist, 1.25) * depthCfg.repulsionStrength;
            targetRepelX = (dx / dist) * force;
            targetRepelY = (dy / dist) * force;
          }
        }

        // Smooth Lerp / Interpolation toward target repulsion
        const repel = repelStateRef.current[index];
        const lerpFactor = 0.06;
        repel.x += (targetRepelX - repel.x) * lerpFactor;
        repel.y += (targetRepelY - repel.y) * lerpFactor;

        // 5. Compute Final Coordinates & Rotation
        const finalTransformX = floatX + parallaxX + repel.x;
        const finalTransformY = floatY + parallaxY + repel.y;
        const finalRot =
          item.baseRot + floatRot + (repel.x * 0.3 - repel.y * 0.2);

        // Apply 3D hardware-accelerated transform
        domEl.style.transform = `translate3d(${finalTransformX.toFixed(
          2
        )}px, ${finalTransformY.toFixed(2)}px, 0px) rotate(${finalRot.toFixed(
          2
        )}deg)`;
      });

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [containerRef]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {FLOATING_ELEMENTS.map((item, index) => {
        const depthCfg = DEPTH_CONFIG[item.depth];
        const assetSrc =
          item.type === "feather"
            ? "/assets/hero/hero-feather.svg"
            : "/assets/hero/hero-leaf.svg";

        const baseWidth = item.type === "feather" ? 54 : 42;
        const width = Math.round(baseWidth * depthCfg.scale);

        return (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={{
              position: "absolute",
              left: `${item.leftPct}%`,
              top: `${item.topPct}%`,
              width: `${width}px`,
              opacity: depthCfg.opacity,
              filter: depthCfg.filter,
              zIndex: depthCfg.zIndex,
              willChange: "transform",
              transformOrigin: "center center",
            }}
            className="select-none"
          >
            <img
              src={assetSrc}
              alt=""
              width={width}
              height={width}
              className="w-full h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
              loading="eager"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
