"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SeasonKey = "spring" | "summer" | "autumn" | "winter";

type LivingLensSceneProps = {
  season: SeasonKey;
  className?: string;
};

type SceneStyle = {
  glass: string;
  core: string;
  accent: string;
  metal: string;
  particle: string;
  haze: string;
};

const styles: Record<SeasonKey, SceneStyle> = {
  spring: {
    glass: "#a8d1c3",
    core: "#6b9d8d",
    accent: "#8daf8d",
    metal: "#c5ad77",
    particle: "#dceccc",
    haze: "#dfeee8",
  },
  summer: {
    glass: "#9fcbd0",
    core: "#527f87",
    accent: "#6d9ba3",
    metal: "#c8aa70",
    particle: "#f0dfa9",
    haze: "#dcebed",
  },
  autumn: {
    glass: "#d9ad8b",
    core: "#9d6248",
    accent: "#c57b4d",
    metal: "#bd935e",
    particle: "#eac58f",
    haze: "#f0dfd2",
  },
  winter: {
    glass: "#c3d4d9",
    core: "#819da5",
    accent: "#a7b9bd",
    metal: "#b7b9b2",
    particle: "#f6f8f4",
    haze: "#e9eff0",
  },
};

function createRandom(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export default function LivingLensScene({
  season,
  className,
}: LivingLensSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const seasonRef = useRef<SeasonKey>(season);

  useEffect(() => {
    seasonRef.current = season;
  }, [season]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const random = createRandom(934771);
    const initialStyle = styles[seasonRef.current];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const motionScale = reducedMotion ? 0.18 : 1;

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(initialStyle.haze, 0.045);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.18, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.position.set(0.18, 0.1, 0);
    scene.add(root);

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: initialStyle.haze,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(
      new THREE.CircleGeometry(2.7, 128),
      haloMaterial,
    );
    halo.position.z = -1.25;
    root.add(halo);

    const auraMaterial = new THREE.MeshBasicMaterial({
      color: initialStyle.accent,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const aura = new THREE.Mesh(
      new THREE.RingGeometry(1.58, 2.8, 160),
      auraMaterial,
    );
    aura.position.z = -1.05;
    root.add(aura);

    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: initialStyle.glass,
      roughness: 0.075,
      metalness: 0,
      transmission: 0.78,
      thickness: 1.35,
      ior: 1.38,
      transparent: true,
      opacity: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      iridescence: 0.12,
      iridescenceIOR: 1.3,
      attenuationColor: initialStyle.glass,
      attenuationDistance: 2.8,
    });
    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(1.42, 96, 64),
      lensMaterial,
    );
    lens.castShadow = true;
    root.add(lens);

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: initialStyle.core,
      roughness: 0.22,
      metalness: 0.62,
      transparent: true,
      opacity: 0.56,
      clearcoat: 0.72,
      clearcoatRoughness: 0.18,
    });
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.68, 4),
      coreMaterial,
    );
    root.add(core);

    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: initialStyle.particle,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });
    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.88, 2),
      coreWireMaterial,
    );
    root.add(coreWire);

    const apertureMaterial = new THREE.MeshPhysicalMaterial({
      color: initialStyle.metal,
      metalness: 0.82,
      roughness: 0.2,
      clearcoat: 0.76,
      clearcoatRoughness: 0.16,
    });
    const aperture = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.022, 12, 180),
      apertureMaterial,
    );
    aperture.position.z = 1.42;
    root.add(aperture);

    const ringDefinitions = [
      { radius: 1.82, tube: 0.026, rotation: [1.05, 0.28, 0.12] },
      { radius: 2.12, tube: 0.018, rotation: [0.42, 1.02, -0.18] },
      { radius: 2.42, tube: 0.012, rotation: [1.32, -0.52, 0.36] },
    ] as const;

    const ringMaterials = ringDefinitions.map(
      (_, index) =>
        new THREE.MeshPhysicalMaterial({
          color: index === 1 ? "#aeb9ba" : initialStyle.metal,
          metalness: 0.9,
          roughness: index === 1 ? 0.28 : 0.2,
          transparent: true,
          opacity: 0.68 - index * 0.12,
          clearcoat: 0.55,
        }),
    );
    const rings = ringDefinitions.map((definition, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          definition.radius,
          definition.tube,
          12,
          220,
        ),
        ringMaterials[index],
      );
      ring.rotation.set(
        definition.rotation[0],
        definition.rotation[1],
        definition.rotation[2],
      );
      root.add(ring);
      return ring;
    });

    const specimenCount = 54;
    const specimenGeometry = new THREE.CapsuleGeometry(0.035, 0.14, 3, 8);
    specimenGeometry.scale(0.72, 1, 0.34);
    const specimenMaterial = new THREE.MeshPhysicalMaterial({
      color: initialStyle.accent,
      roughness: 0.48,
      metalness: 0.04,
      sheen: 0.42,
      sheenColor: "#f1ead7",
      clearcoat: 0.12,
    });
    const specimens = new THREE.InstancedMesh(
      specimenGeometry,
      specimenMaterial,
      specimenCount,
    );
    specimens.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    specimens.castShadow = true;
    root.add(specimens);

    const specimenData = Array.from({ length: specimenCount }, () => ({
      radius: 1.72 + random() * 1.05,
      angle: random() * Math.PI * 2,
      height: (random() - 0.5) * 3.25,
      depth: 0.42 + random() * 0.72,
      speed: (0.035 + random() * 0.065) * (random() > 0.5 ? 1 : -1),
      phase: random() * Math.PI * 2,
      scale: 0.6 + random() * 1.3,
      spin: 0.24 + random() * 0.72,
    }));

    const dropletCount = 38;
    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: initialStyle.glass,
      roughness: 0.08,
      transmission: 0.48,
      thickness: 0.35,
      ior: 1.33,
      transparent: true,
      opacity: 0.82,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const droplets = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.055, 2),
      dropletMaterial,
      dropletCount,
    );
    droplets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    root.add(droplets);
    const dropletData = Array.from({ length: dropletCount }, () => ({
      radius: 1.62 + random() * 1.22,
      angle: random() * Math.PI * 2,
      height: (random() - 0.5) * 3.5,
      speed: (0.025 + random() * 0.05) * (random() > 0.5 ? 1 : -1),
      phase: random() * Math.PI * 2,
      scale: 0.52 + random() * 1.8,
    }));

    const particleCount = 190;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleData = Array.from({ length: particleCount }, (_, index) => {
      const radius = 1.5 + random() * 2.5;
      const angle = random() * Math.PI * 2;
      const y = (random() - 0.5) * 4.8;
      particlePositions[index * 3] = Math.cos(angle) * radius;
      particlePositions[index * 3 + 1] = y;
      particlePositions[index * 3 + 2] = Math.sin(angle) * radius * 0.55;
      return {
        phase: random() * Math.PI * 2,
        drift: 0.35 + random() * 0.75,
      };
    });
    const particleGeometry = new THREE.BufferGeometry();
    const particleAttribute = new THREE.BufferAttribute(particlePositions, 3);
    particleGeometry.setAttribute("position", particleAttribute);
    const particleMaterial = new THREE.PointsMaterial({
      color: initialStyle.particle,
      size: 0.028,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particles);

    const platformMaterial = new THREE.MeshBasicMaterial({
      color: initialStyle.core,
      transparent: true,
      opacity: 0.075,
      depthWrite: false,
    });
    const platform = new THREE.Mesh(
      new THREE.CircleGeometry(2.15, 128),
      platformMaterial,
    );
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -2.08;
    root.add(platform);

    const ambient = new THREE.HemisphereLight("#ffffff", "#788681", 2.8);
    scene.add(ambient);
    const key = new THREE.DirectionalLight("#fff1d6", 5.4);
    key.position.set(-3.8, 6.2, 5.6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const coolRim = new THREE.PointLight("#b9e6e5", 13, 14);
    coolRim.position.set(3.4, 1.8, 3.8);
    scene.add(coolRim);
    const goldRim = new THREE.PointLight("#d7b46e", 9, 12);
    goldRim.position.set(-3.2, -0.8, 3.2);
    scene.add(goldRim);

    const dummy = new THREE.Object3D();
    const clock = new THREE.Clock();
    let pointerX = 0;
    let pointerY = 0;
    let raf = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);
    resize();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const target = styles[seasonRef.current];

      lensMaterial.color.lerp(new THREE.Color(target.glass), 0.025);
      lensMaterial.attenuationColor.lerp(
        new THREE.Color(target.glass),
        0.025,
      );
      coreMaterial.color.lerp(new THREE.Color(target.core), 0.025);
      specimenMaterial.color.lerp(new THREE.Color(target.accent), 0.025);
      dropletMaterial.color.lerp(new THREE.Color(target.glass), 0.025);
      particleMaterial.color.lerp(new THREE.Color(target.particle), 0.025);
      haloMaterial.color.lerp(new THREE.Color(target.haze), 0.025);
      auraMaterial.color.lerp(new THREE.Color(target.accent), 0.025);
      apertureMaterial.color.lerp(new THREE.Color(target.metal), 0.025);
      ringMaterials[0].color.lerp(new THREE.Color(target.metal), 0.025);
      ringMaterials[2].color.lerp(new THREE.Color(target.metal), 0.025);
      platformMaterial.color.lerp(new THREE.Color(target.core), 0.025);
      fog.color.lerp(new THREE.Color(target.haze), 0.025);

      const time = elapsed * motionScale;
      root.rotation.y +=
        (pointerX * 0.13 - root.rotation.y) * 0.035 * motionScale;
      root.rotation.x +=
        (-pointerY * 0.075 - root.rotation.x) * 0.035 * motionScale;
      root.position.y = 0.1 + Math.sin(time * 0.42) * 0.045;

      const breath = 1 + Math.sin(time * 0.68) * 0.012;
      lens.scale.setScalar(breath);
      core.rotation.x = time * 0.11;
      core.rotation.y = time * 0.17;
      coreWire.rotation.x = -time * 0.08;
      coreWire.rotation.y = time * 0.13;
      aperture.rotation.z = -time * 0.18;
      rings[0].rotation.z += 0.0012 * motionScale;
      rings[1].rotation.x -= 0.0009 * motionScale;
      rings[2].rotation.y += 0.0007 * motionScale;
      aura.rotation.z = time * 0.025;
      auraMaterial.opacity = 0.085 + Math.sin(time * 0.58) * 0.018;

      specimenData.forEach((item, index) => {
        const angle = item.angle + time * item.speed;
        dummy.position.set(
          Math.cos(angle) * item.radius,
          item.height + Math.sin(time * 0.36 + item.phase) * 0.12,
          Math.sin(angle) * item.radius * item.depth,
        );
        dummy.rotation.set(
          time * item.spin + item.phase,
          angle + Math.PI / 2,
          Math.sin(time * 0.42 + item.phase) * 0.7,
        );
        dummy.scale.set(
          item.scale * 0.82,
          item.scale,
          item.scale * 0.82,
        );
        dummy.updateMatrix();
        specimens.setMatrixAt(index, dummy.matrix);
      });
      specimens.instanceMatrix.needsUpdate = true;

      dropletData.forEach((item, index) => {
        const angle = item.angle + time * item.speed;
        dummy.position.set(
          Math.cos(angle) * item.radius,
          item.height + Math.sin(time * 0.28 + item.phase) * 0.16,
          Math.sin(angle) * item.radius * 0.66,
        );
        dummy.rotation.set(time * 0.12, angle, time * 0.08);
        dummy.scale.setScalar(item.scale);
        dummy.updateMatrix();
        droplets.setMatrixAt(index, dummy.matrix);
      });
      droplets.instanceMatrix.needsUpdate = true;

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        particlePositions[offset + 1] +=
          Math.sin(time * 0.22 + particleData[index].phase) *
          particleData[index].drift *
          0.0007;
        particlePositions[offset] +=
          Math.cos(time * 0.18 + particleData[index].phase) * 0.00035;
      }
      particleAttribute.needsUpdate = true;
      particles.rotation.y = -time * 0.018;

      camera.position.x +=
        (pointerX * 0.18 - camera.position.x) * 0.025 * motionScale;
      camera.position.y +=
        (0.18 - pointerY * 0.1 - camera.position.y) * 0.025 * motionScale;
      camera.lookAt(0, 0.05, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          objectMaterials.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={
        className
          ? `living-lens-scene ${className}`
          : "living-lens-scene"
      }
      role="img"
      aria-label={`An interactive refractive lens composition responding to the ${season} editorial atmosphere`}
    />
  );
}
