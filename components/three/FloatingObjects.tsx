"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function FloatingHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 160;
    const height = container.clientHeight || 160;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x52be8a, 1.5, 10);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);

    // Centerpiece Egg Object
    const eggGroup = new THREE.Group();
    scene.add(eggGroup);

    const eggGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eggMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf5e8,
      roughness: 0.2,
      metalness: 0.1,
    });
    const eggMesh = new THREE.Mesh(eggGeometry, eggMaterial);
    eggMesh.scale.set(1.1, 1.45, 1.1);
    eggGroup.add(eggMesh);

    // Floating Green Bio-Dodecahedron
    const geo1 = new THREE.DodecahedronGeometry(0.35, 0);
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x2d9c66, roughness: 0.3 });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    mesh1.position.set(1.7, 1.0, 0.4);
    eggGroup.add(mesh1);

    // Floating Golden Accent
    const geo2 = new THREE.DodecahedronGeometry(0.28, 0);
    const mat2 = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    mesh2.position.set(-1.6, -0.7, 0.5);
    eggGroup.add(mesh2);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      eggGroup.rotation.y = t * 0.5;
      eggMesh.position.y = Math.sin(t * 1.5) * 0.12;

      mesh1.rotation.x = t * 0.8;
      mesh1.rotation.y = t * 0.6;
      mesh1.position.y = 1.0 + Math.sin(t * 2) * 0.1;

      mesh2.rotation.x = -t * 0.7;
      mesh2.rotation.y = t * 0.5;
      mesh2.position.y = -0.7 + Math.cos(t * 1.8) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
