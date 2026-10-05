"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface FarmSceneProps {
  activeHotspot: number;
  setActiveHotspot: (index: number) => void;
}

export function FarmScene({ activeHotspot, setActiveHotspot }: FarmSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a2618);
    scene.fog = new THREE.FogExp2(0x0a2618, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 8, 12);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minDistance = 5;
    controls.maxDistance = 18;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.8);
    sunLight.position.set(10, 15, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const greenFill = new THREE.PointLight(0x52be8a, 1.0, 15);
    greenFill.position.set(-6, 4, -4);
    scene.add(greenFill);

    // 6. Terrain
    const terrainGeo = new THREE.CircleGeometry(11, 64);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x1a5233,
      roughness: 0.85,
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.receiveShadow = true;
    scene.add(terrain);

    // Paths
    const pathGeo = new THREE.PlaneGeometry(1.6, 9);
    const pathMat = new THREE.MeshStandardMaterial({ color: 0xd6c7b0, roughness: 0.9 });
    const path1 = new THREE.Mesh(pathGeo, pathMat);
    path1.rotation.x = -Math.PI / 2;
    path1.position.y = 0.01;
    path1.receiveShadow = true;
    scene.add(path1);

    const path2 = new THREE.Mesh(pathGeo, pathMat);
    path2.rotation.x = -Math.PI / 2;
    path2.rotation.z = Math.PI / 2;
    path2.position.y = 0.01;
    path2.receiveShadow = true;
    scene.add(path2);

    // 7. Poultry Sheds Helper
    const createShed = (x: number, z: number, ry: number, color: number) => {
      const shedGroup = new THREE.Group();
      shedGroup.position.set(x, 0, z);
      shedGroup.rotation.y = ry;

      // Base
      const baseGeo = new THREE.BoxGeometry(3.2, 1.3, 2);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0xf4ede0, roughness: 0.8 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.65;
      base.castShadow = true;
      base.receiveShadow = true;
      shedGroup.add(base);

      // Roof
      const roofGeo = new THREE.ConeGeometry(2.4, 0.8, 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.5 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = 1.7;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      shedGroup.add(roof);

      scene.add(shedGroup);
      return shedGroup;
    };

    createShed(-3, -1.8, 0.2, 0x0e3b27); // Hatchery Shed
    createShed(3, -1.5, -0.2, 0x144f34); // Kadaknath Shed

    // 8. Silo
    const siloGeo = new THREE.CylinderGeometry(0.65, 0.65, 2.6, 16);
    const siloMat = new THREE.MeshStandardMaterial({
      color: 0xa0aab2,
      metalness: 0.6,
      roughness: 0.3,
    });
    const silo = new THREE.Mesh(siloGeo, siloMat);
    silo.position.set(-3.5, 1.3, 2);
    silo.castShadow = true;
    scene.add(silo);

    // 9. Trees Helper
    const createTree = (x: number, z: number, s = 1) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);
      treeGroup.scale.set(s, s, s);

      const trunkGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.9, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3d2e });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 0.45;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const foliageGeo = new THREE.ConeGeometry(0.7, 1.3, 8);
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1a6542, roughness: 0.7 });
      const foliage1 = new THREE.Mesh(foliageGeo, foliageMat);
      foliage1.position.y = 1.3;
      foliage1.castShadow = true;
      treeGroup.add(foliage1);

      const foliage2 = new THREE.Mesh(foliageGeo, foliageMat);
      foliage2.position.y = 1.8;
      foliage2.scale.set(0.75, 0.75, 0.75);
      foliage2.castShadow = true;
      treeGroup.add(foliage2);

      scene.add(treeGroup);
    };

    createTree(-4.5, -3.5, 1.2);
    createTree(-1.5, -4.2, 1.0);
    createTree(2.0, -4.0, 1.1);
    createTree(4.5, -3.0, 1.3);
    createTree(4.8, 1.5, 1.0);
    createTree(3.2, 3.8, 1.15);
    createTree(-4.8, -0.5, 0.9);
    createTree(-1.5, 4.2, 1.2);

    // 10. Birds Flock
    const flockGroup = new THREE.Group();
    scene.add(flockGroup);

    const birdGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const birdMatBlack = new THREE.MeshStandardMaterial({ color: 0x111827 });
    const birdMatWhite = new THREE.MeshStandardMaterial({ color: 0xfaf7f0 });

    const birds: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const bird = new THREE.Mesh(birdGeo, i % 2 === 0 ? birdMatBlack : birdMatWhite);
      bird.position.set(
        (Math.random() - 0.5) * 4,
        0.12,
        (Math.random() - 0.5) * 4 + 1
      );
      bird.castShadow = true;
      flockGroup.add(bird);
      birds.push(bird);
    }

    // 11. Hotspot Markers
    const hotspotPositions = [
      new THREE.Vector3(-3, 2.4, -1.8),
      new THREE.Vector3(3, 2.4, -1.5),
      new THREE.Vector3(0, 1.2, 2.5),
      new THREE.Vector3(-3.5, 2.8, 2),
    ];

    const hotspotMeshes: THREE.Mesh[] = [];
    const markerGeo = new THREE.OctahedronGeometry(0.28, 0);

    hotspotPositions.forEach((pos, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: idx === 0 ? 0xf59e0b : 0x2d9c66,
        emissive: idx === 0 ? 0xf59e0b : 0x1a6542,
        emissiveIntensity: 0.6,
      });
      const marker = new THREE.Mesh(markerGeo, mat);
      marker.position.copy(pos);
      scene.add(marker);
      hotspotMeshes.push(marker);
    });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      controls.update();

      // Animate hotspot pins
      hotspotMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = t * 1.5;
        mesh.position.y = hotspotPositions[idx].y + Math.sin(t * 3 + idx) * 0.1;
      });

      // Animate roaming birds
      birds.forEach((b, idx) => {
        b.position.x += Math.sin(t * 0.5 + idx) * 0.005;
        b.position.z += Math.cos(t * 0.5 + idx) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
