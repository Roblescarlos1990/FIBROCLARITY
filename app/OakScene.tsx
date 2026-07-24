"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SeasonKey = "spring" | "summer" | "autumn" | "winter";
type LensKey = "journal" | "wellness" | "medicine" | "research";

type OakSceneProps = {
  season: SeasonKey | LensKey | Capitalize<LensKey>;
  className?: string;
};

type SeasonStyle = {
  colors: string[];
  leafScale: number;
  light: string;
  ground: string;
  fog: string;
  weather: string;
  particleSize: number;
  wind: number;
  barkTint: string;
  barkRoughness: number;
  barkClearcoat: number;
  leafRoughness: number;
};

const styles: Record<SeasonKey, SeasonStyle> = {
  spring: {
    colors: ["#769775", "#95ae83", "#668b70", "#aeb98a"],
    leafScale: 0.78,
    light: "#fff0cf",
    ground: "#a7bea5",
    fog: "#e9f1e9",
    weather: "#9db9b6",
    particleSize: 0.026,
    wind: 0.85,
    barkTint: "#d9e0d5",
    barkRoughness: 0.82,
    barkClearcoat: 0.12,
    leafRoughness: 0.58,
  },
  summer: {
    colors: ["#355f49", "#527a5c", "#75905d", "#294f40"],
    leafScale: 1,
    light: "#ffe4b2",
    ground: "#8da98d",
    fog: "#e7f0ed",
    weather: "#d6bc79",
    particleSize: 0.032,
    wind: 0.45,
    barkTint: "#e1d5c5",
    barkRoughness: 0.9,
    barkClearcoat: 0.03,
    leafRoughness: 0.7,
  },
  autumn: {
    colors: ["#b85f37", "#d1843f", "#934530", "#cba34d"],
    leafScale: 0.88,
    light: "#ffd4a1",
    ground: "#c39a72",
    fog: "#f3e7db",
    weather: "#c98b4d",
    particleSize: 0.035,
    wind: 1.25,
    barkTint: "#e0c5b2",
    barkRoughness: 0.93,
    barkClearcoat: 0.02,
    leafRoughness: 0.76,
  },
  winter: {
    colors: ["#8b9692", "#788987", "#b4afa0", "#657673"],
    leafScale: 0.06,
    light: "#d8edf2",
    ground: "#b9c5c3",
    fog: "#e9eff0",
    weather: "#ffffff",
    particleSize: 0.052,
    wind: 0.72,
    barkTint: "#dce5e6",
    barkRoughness: 0.67,
    barkClearcoat: 0.28,
    leafRoughness: 0.82,
  },
};

const lensSeasonMap: Record<LensKey, SeasonKey> = {
  journal: "summer",
  wellness: "spring",
  medicine: "autumn",
  research: "winter",
};

const texturePaths = {
  bark: {
    spring: "/textures/oak/bark_spring_albedo.jpg",
    summer: "/textures/oak/bark_summer_albedo.jpg",
    autumn: "/textures/oak/bark_autumn_albedo.jpg",
    winter: "/textures/oak/bark_winter_albedo.jpg",
  },
  leaf: {
    spring: "/textures/oak/leaf_spring_albedo.jpg",
    summer: "/textures/oak/leaf_summer_albedo.jpg",
    autumn: "/textures/oak/leaf_autumn_albedo.jpg",
    winter: "/textures/oak/leaf_winter_albedo.jpg",
  },
  ground: "/textures/oak/ground_litter_albedo.jpg",
} satisfies {
  bark: Record<SeasonKey, string>;
  leaf: Record<SeasonKey, string>;
  ground: string;
};

function resolveSeason(
  season: OakSceneProps["season"],
): SeasonKey {
  const normalized = season.toLowerCase();
  if (normalized in lensSeasonMap) {
    return lensSeasonMap[normalized as LensKey];
  }
  if (
    normalized === "spring" ||
    normalized === "summer" ||
    normalized === "autumn" ||
    normalized === "winter"
  ) {
    return normalized;
  }
  return "summer";
}

function createRandom(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function createOakLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.7);
  shape.bezierCurveTo(-0.03, -0.56, -0.16, -0.53, -0.13, -0.4);
  shape.bezierCurveTo(-0.28, -0.4, -0.37, -0.29, -0.27, -0.17);
  shape.bezierCurveTo(-0.43, -0.14, -0.48, -0.01, -0.33, 0.07);
  shape.bezierCurveTo(-0.49, 0.16, -0.45, 0.3, -0.28, 0.33);
  shape.bezierCurveTo(-0.4, 0.46, -0.29, 0.58, -0.12, 0.54);
  shape.bezierCurveTo(-0.11, 0.68, -0.04, 0.79, 0, 0.88);
  shape.bezierCurveTo(0.04, 0.79, 0.11, 0.68, 0.12, 0.54);
  shape.bezierCurveTo(0.29, 0.58, 0.4, 0.46, 0.28, 0.33);
  shape.bezierCurveTo(0.45, 0.3, 0.49, 0.16, 0.33, 0.07);
  shape.bezierCurveTo(0.48, -0.01, 0.43, -0.14, 0.27, -0.17);
  shape.bezierCurveTo(0.37, -0.29, 0.28, -0.4, 0.13, -0.4);
  shape.bezierCurveTo(0.16, -0.53, 0.03, -0.56, 0, -0.7);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.028,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.018,
    bevelThickness: 0.012,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function branchBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
  variation: number,
) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(
    radius * 0.6,
    radius,
    length,
    16,
    5,
  );
  const positions = geometry.attributes.position;
  for (let index = 0; index < positions.count; index += 1) {
    const y = positions.getY(index);
    const swelling =
      1 +
      Math.sin(y * 5.7 + variation) * 0.035 +
      Math.sin(y * 11.2 - variation) * 0.018;
    positions.setX(index, positions.getX(index) * swelling);
    positions.setZ(index, positions.getZ(index) * swelling);
  }
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export default function OakScene({ season, className }: OakSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const resolvedSeason = resolveSeason(season);
  const seasonRef = useRef<SeasonKey>(resolvedSeason);

  useEffect(() => {
    seasonRef.current = resolvedSeason;
  }, [resolvedSeason]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const random = createRandom(824731);
    const initialStyle = styles[seasonRef.current];
    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(initialStyle.fog, 0.038);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 2.4, 8.7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      8,
    );
    const loadTexture = (
      path: string,
      repeatX: number,
      repeatY: number,
    ) => {
      const texture = textureLoader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(repeatX, repeatY);
      texture.anisotropy = maxAnisotropy;
      return texture;
    };
    const barkMaps = Object.fromEntries(
      (Object.keys(texturePaths.bark) as SeasonKey[]).map((key) => [
        key,
        loadTexture(texturePaths.bark[key], 2.4, 3.8),
      ]),
    ) as Record<SeasonKey, THREE.Texture>;
    const leafMaps = Object.fromEntries(
      (Object.keys(texturePaths.leaf) as SeasonKey[]).map((key) => [
        key,
        loadTexture(texturePaths.leaf[key], 1, 1),
      ]),
    ) as Record<SeasonKey, THREE.Texture>;
    Object.values(leafMaps).forEach((texture) => {
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    });
    const groundTexture = loadTexture(texturePaths.ground, 2.2, 2.2);

    const tree = new THREE.Group();
    tree.position.y = -2.5;
    tree.rotation.y = -0.2;
    scene.add(tree);

    const bark = new THREE.MeshPhysicalMaterial({
      color: initialStyle.barkTint,
      map: barkMaps[seasonRef.current],
      bumpMap: barkMaps[seasonRef.current],
      bumpScale: 0.115,
      roughness: initialStyle.barkRoughness,
      metalness: 0,
      clearcoat: initialStyle.barkClearcoat,
      clearcoatRoughness: 0.48,
    });
    const youngBark = new THREE.MeshPhysicalMaterial({
      color: initialStyle.barkTint,
      map: barkMaps[seasonRef.current],
      bumpMap: barkMaps[seasonRef.current],
      bumpScale: 0.07,
      roughness: Math.max(0.58, initialStyle.barkRoughness - 0.06),
      metalness: 0,
      clearcoat: initialStyle.barkClearcoat * 0.75,
      clearcoatRoughness: 0.52,
    });

    const trunkPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.03, 1.06, 0.01),
      new THREE.Vector3(-0.06, 2.12, 0.04),
      new THREE.Vector3(0.11, 3.18, -0.01),
      new THREE.Vector3(0.01, 4.12, -0.06),
    ];
    const trunkRadii = [0.43, 0.37, 0.3, 0.2];
    trunkRadii.forEach((radius, index) => {
      tree.add(
        branchBetween(
          trunkPoints[index],
          trunkPoints[index + 1],
          radius,
          index > 1 ? youngBark : bark,
          index * 1.7,
        ),
      );
    });

    const rootEnds = [
      new THREE.Vector3(-1.3, 0.04, 0.32),
      new THREE.Vector3(1.18, 0.035, 0.4),
      new THREE.Vector3(-0.72, 0.03, -0.96),
      new THREE.Vector3(0.76, 0.03, -1.05),
      new THREE.Vector3(0.18, 0.02, 1.06),
    ];
    rootEnds.forEach((end, index) => {
      tree.add(
        branchBetween(
          new THREE.Vector3(0, 0.2, 0),
          end,
          0.2 - index * 0.014,
          bark,
          9 + index,
        ),
      );
    });

    const branchSpecs: Array<
      [THREE.Vector3, THREE.Vector3, number, number]
    > = [
      [new THREE.Vector3(-0.02, 1.42, 0), new THREE.Vector3(-1.58, 2.66, 0.2), 0.24, 3],
      [new THREE.Vector3(-0.86, 2.12, 0.11), new THREE.Vector3(-2.14, 3.02, 0.38), 0.13, 2],
      [new THREE.Vector3(0.02, 1.8, 0), new THREE.Vector3(1.5, 2.92, 0.18), 0.25, 3],
      [new THREE.Vector3(0.94, 2.5, 0.12), new THREE.Vector3(2.08, 3.4, 0.44), 0.13, 2],
      [new THREE.Vector3(-0.03, 2.38, 0), new THREE.Vector3(-1.28, 3.64, -0.3), 0.21, 3],
      [new THREE.Vector3(-0.74, 3.06, -0.16), new THREE.Vector3(-1.84, 3.95, -0.47), 0.105, 2],
      [new THREE.Vector3(0.07, 2.68, 0), new THREE.Vector3(1.18, 3.84, -0.38), 0.19, 3],
      [new THREE.Vector3(0.73, 3.34, -0.24), new THREE.Vector3(1.78, 4.1, -0.42), 0.1, 2],
      [new THREE.Vector3(0.02, 3.14, 0), new THREE.Vector3(-0.64, 4.4, 0.15), 0.15, 3],
      [new THREE.Vector3(0.02, 3.52, -0.04), new THREE.Vector3(0.6, 4.6, 0.12), 0.14, 3],
      [new THREE.Vector3(-0.02, 3.68, -0.03), new THREE.Vector3(-0.16, 4.96, -0.1), 0.13, 3],
      [new THREE.Vector3(-0.86, 2.2, 0.1), new THREE.Vector3(-1.52, 2.44, -0.88), 0.1, 2],
      [new THREE.Vector3(0.84, 2.44, 0.09), new THREE.Vector3(1.52, 2.67, -0.82), 0.1, 2],
      [new THREE.Vector3(-0.2, 3.52, 0), new THREE.Vector3(-1.15, 4.16, 0.72), 0.1, 2],
      [new THREE.Vector3(0.18, 3.7, 0), new THREE.Vector3(1.04, 4.35, 0.72), 0.095, 2],
    ];

    const canopyAnchors: THREE.Vector3[] = [];
    branchSpecs.forEach(([start, end, radius, twigCount], branchIndex) => {
      tree.add(
        branchBetween(start, end, radius, youngBark, 14 + branchIndex),
      );
      canopyAnchors.push(end);
      for (let index = 0; index < twigCount; index += 1) {
        const direction = end.clone().sub(start).normalize();
        const twigStart = start.clone().lerp(end, 0.5 + index * 0.15);
        const side = new THREE.Vector3(
          (random() - 0.5) * 1.1,
          0.42 + random() * 0.5,
          (random() - 0.5) * 1.3,
        );
        const twigEnd = twigStart
          .clone()
          .add(direction.multiplyScalar(0.36))
          .add(side);
        tree.add(
          branchBetween(
            twigStart,
            twigEnd,
            radius * 0.42,
            youngBark,
            branchIndex * 3 + index,
          ),
        );
        canopyAnchors.push(twigEnd);
      }
    });

    const leafCount = 320;
    const leafGeometry = createOakLeafGeometry();
    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      map: leafMaps[seasonRef.current],
      roughness: initialStyle.leafRoughness,
      metalness: 0,
      sheen: 0.24,
      sheenRoughness: 0.85,
      clearcoat:
        seasonRef.current === "winter"
          ? 0.16
          : seasonRef.current === "spring"
            ? 0.08
            : 0.02,
      clearcoatRoughness: 0.44,
      side: THREE.DoubleSide,
      vertexColors: true,
    });
    const leaves = new THREE.InstancedMesh(
      leafGeometry,
      leafMaterial,
      leafCount,
    );
    leaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    tree.add(leaves);

    const leafData = Array.from({ length: leafCount }, (_, index) => {
      const anchor = canopyAnchors[index % canopyAnchors.length];
      const cloudRadius = 0.35 + random() * 0.75;
      return {
        position: new THREE.Vector3(
          anchor.x + (random() - 0.5) * cloudRadius * 1.7,
          anchor.y + (random() - 0.5) * cloudRadius,
          anchor.z + (random() - 0.5) * cloudRadius * 1.35,
        ),
        rotation: new THREE.Euler(
          (random() - 0.5) * 1.25,
          random() * Math.PI * 2,
          (random() - 0.5) * Math.PI,
        ),
        scale: 0.68 + random() * 0.78,
        paletteIndex: Math.floor(random() * 4),
        windPhase: random() * Math.PI * 2,
      };
    });

    const paletteColors = Object.fromEntries(
      Object.entries(styles).map(([key, value]) => [
        key,
        value.colors.map((color) => new THREE.Color(color)),
      ]),
    ) as Record<SeasonKey, THREE.Color[]>;
    const currentColors = leafData.map(
      (leaf) => paletteColors[seasonRef.current][leaf.paletteIndex].clone(),
    );

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: initialStyle.ground,
      map: groundTexture,
      roughness: 1,
      transparent: true,
      opacity: 0.42,
    });
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.35, 80),
      groundMaterial,
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.02;
    ground.receiveShadow = true;
    tree.add(ground);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#b79254",
      transparent: true,
      opacity: 0.19,
    });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.55, 2.57, 128),
      ringMaterial,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.035;
    tree.add(ring);

    const ambient = new THREE.HemisphereLight("#f7fbf8", "#756759", 2.45);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(initialStyle.light, 4.8);
    key.position.set(-3.4, 7.2, 5.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1536, 1536);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 20;
    scene.add(key);
    const rim = new THREE.PointLight("#bfcfd0", 9, 14);
    rim.position.set(3.8, 3.8, 3.2);
    scene.add(rim);
    const goldFill = new THREE.PointLight("#d5b675", 5, 12);
    goldFill.position.set(-3, 1.8, 4);
    scene.add(goldFill);

    const rainCount = 92;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: (random() - 0.5) * 8,
      y: random() * 8 - 1,
      z: (random() - 0.5) * 4,
      length: 0.16 + random() * 0.32,
      speed: 0.035 + random() * 0.045,
    }));
    const rainPositions = new Float32Array(rainCount * 6);
    const rainGeometry = new THREE.BufferGeometry();
    const rainAttribute = new THREE.BufferAttribute(rainPositions, 3);
    rainAttribute.setUsage(THREE.DynamicDrawUsage);
    rainGeometry.setAttribute("position", rainAttribute);
    const rainMaterial = new THREE.LineBasicMaterial({
      color: "#9ab6b8",
      transparent: true,
      opacity: seasonRef.current === "spring" ? 0.34 : 0,
      depthWrite: false,
    });
    const rain = new THREE.LineSegments(rainGeometry, rainMaterial);
    rain.position.y = -0.4;
    scene.add(rain);

    const particleCount = 170;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (random() - 0.5) * 8;
      particlePositions[index * 3 + 1] = random() * 7 - 1;
      particlePositions[index * 3 + 2] = (random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    const particleAttribute = new THREE.BufferAttribute(particlePositions, 3);
    particleAttribute.setUsage(THREE.DynamicDrawUsage);
    particleGeometry.setAttribute("position", particleAttribute);
    const particleMaterial = new THREE.PointsMaterial({
      color: initialStyle.weather,
      size: initialStyle.particleSize,
      transparent: true,
      opacity: seasonRef.current === "spring" ? 0.2 : 0.58,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const fallingCount = 34;
    const fallingMaterial = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      map: leafMaps.autumn,
      roughness: 0.8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: seasonRef.current === "autumn" ? 0.9 : 0,
      vertexColors: true,
    });
    const fallingLeaves = new THREE.InstancedMesh(
      leafGeometry,
      fallingMaterial,
      fallingCount,
    );
    fallingLeaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(fallingLeaves);
    const fallingData = Array.from({ length: fallingCount }, (_, index) => {
      fallingLeaves.setColorAt(
        index,
        paletteColors.autumn[index % paletteColors.autumn.length],
      );
      return {
        x: (random() - 0.5) * 6.4,
        y: random() * 7 - 0.4,
        z: (random() - 0.5) * 3.2,
        speed: 0.009 + random() * 0.018,
        spin: 0.35 + random() * 0.9,
        phase: random() * Math.PI * 2,
        scale: 0.11 + random() * 0.08,
      };
    });

    const dummy = new THREE.Object3D();
    let currentLeafScale = initialStyle.leafScale;
    let rainStrength = seasonRef.current === "spring" ? 1 : 0;
    let fallingStrength = seasonRef.current === "autumn" ? 1 : 0;
    let currentParticleSize = initialStyle.particleSize;
    let appliedBarkSeason = seasonRef.current;
    let appliedLeafSeason = seasonRef.current;
    let pointerX = 0;
    let pointerY = 0;
    let raf = 0;
    const clock = new THREE.Clock();

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
      const { width, height } = mount.getBoundingClientRect();
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
      const seasonKey = seasonRef.current;
      const target = styles[seasonKey];
      const targetPalette = paletteColors[seasonKey];
      if (appliedBarkSeason !== seasonKey) {
        bark.map = barkMaps[seasonKey];
        bark.bumpMap = barkMaps[seasonKey];
        youngBark.map = barkMaps[seasonKey];
        youngBark.bumpMap = barkMaps[seasonKey];
        bark.needsUpdate = true;
        youngBark.needsUpdate = true;
        appliedBarkSeason = seasonKey;
      }
      if (appliedLeafSeason !== seasonKey) {
        leafMaterial.map = leafMaps[seasonKey];
        leafMaterial.needsUpdate = true;
        appliedLeafSeason = seasonKey;
      }
      currentLeafScale += (target.leafScale - currentLeafScale) * 0.026;
      rainStrength += ((seasonKey === "spring" ? 1 : 0) - rainStrength) * 0.025;
      fallingStrength +=
        ((seasonKey === "autumn" ? 1 : 0) - fallingStrength) * 0.025;
      currentParticleSize +=
        (target.particleSize - currentParticleSize) * 0.024;

      leafData.forEach((leaf, index) => {
        currentColors[index].lerp(
          targetPalette[leaf.paletteIndex % targetPalette.length],
          0.028,
        );
        leaves.setColorAt(index, currentColors[index]);
        dummy.position.copy(leaf.position);
        const wind =
          Math.sin(elapsed * (0.7 + target.wind * 0.18) + leaf.windPhase) *
          target.wind;
        dummy.position.x += wind * 0.016;
        dummy.position.y += Math.sin(elapsed * 0.55 + index * 0.41) * 0.012;
        dummy.rotation.copy(leaf.rotation);
        dummy.rotation.y += wind * 0.12;
        dummy.rotation.z += wind * 0.06;
        const winterKeep =
          seasonKey === "winter" && index % 17 !== 0 ? 0.035 : 1;
        const scale = leaf.scale * currentLeafScale * winterKeep;
        dummy.scale.set(scale * 0.31, scale * 0.43, scale * 0.31);
        dummy.updateMatrix();
        leaves.setMatrixAt(index, dummy.matrix);
      });
      leaves.instanceMatrix.needsUpdate = true;
      if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;

      rainDrops.forEach((drop, index) => {
        drop.y -= drop.speed * (0.45 + rainStrength * 1.4);
        drop.x -= 0.009 * rainStrength;
        if (drop.y < -1.5) {
          drop.y = 7;
          drop.x = (random() - 0.5) * 8;
        }
        const offset = index * 6;
        rainPositions[offset] = drop.x;
        rainPositions[offset + 1] = drop.y;
        rainPositions[offset + 2] = drop.z;
        rainPositions[offset + 3] = drop.x - 0.035 * rainStrength;
        rainPositions[offset + 4] = drop.y - drop.length;
        rainPositions[offset + 5] = drop.z;
      });
      rainAttribute.needsUpdate = true;
      rainMaterial.opacity += (rainStrength * 0.34 - rainMaterial.opacity) * 0.04;

      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        const direction = seasonKey === "summer" ? 1 : -1;
        const speed =
          seasonKey === "winter"
            ? 0.008
            : seasonKey === "autumn"
              ? 0.012
              : 0.0035;
        particlePositions[offset + 1] += direction * speed;
        particlePositions[offset] +=
          Math.sin(elapsed * 0.4 + index) * target.wind * 0.0008;
        if (particlePositions[offset + 1] < -1.5) {
          particlePositions[offset + 1] = 6.4;
        }
        if (particlePositions[offset + 1] > 6.5) {
          particlePositions[offset + 1] = -1.2;
        }
      }
      particleAttribute.needsUpdate = true;
      particleMaterial.color.lerp(new THREE.Color(target.weather), 0.025);
      particleMaterial.size = currentParticleSize;
      const targetParticleOpacity =
        seasonKey === "spring" ? 0.16 : seasonKey === "summer" ? 0.38 : 0.66;
      particleMaterial.opacity +=
        (targetParticleOpacity - particleMaterial.opacity) * 0.03;

      fallingData.forEach((leaf, index) => {
        leaf.y -= leaf.speed * (0.4 + fallingStrength);
        leaf.x += Math.sin(elapsed * 0.9 + leaf.phase) * 0.004;
        if (leaf.y < -1.5) {
          leaf.y = 6.2;
          leaf.x = (random() - 0.5) * 6.4;
        }
        dummy.position.set(leaf.x, leaf.y, leaf.z);
        dummy.rotation.set(
          elapsed * leaf.spin * 0.6 + leaf.phase,
          elapsed * leaf.spin,
          elapsed * leaf.spin * 0.4,
        );
        const scale = leaf.scale * fallingStrength;
        dummy.scale.set(scale, scale * 1.3, scale);
        dummy.updateMatrix();
        fallingLeaves.setMatrixAt(index, dummy.matrix);
      });
      fallingLeaves.instanceMatrix.needsUpdate = true;
      fallingMaterial.opacity +=
        (fallingStrength * 0.9 - fallingMaterial.opacity) * 0.04;

      key.color.lerp(new THREE.Color(target.light), 0.02);
      bark.color.lerp(new THREE.Color(target.barkTint), 0.024);
      youngBark.color.lerp(new THREE.Color(target.barkTint), 0.024);
      bark.roughness +=
        (target.barkRoughness - bark.roughness) * 0.024;
      youngBark.roughness +=
        (Math.max(0.58, target.barkRoughness - 0.06) -
          youngBark.roughness) *
        0.024;
      bark.clearcoat +=
        (target.barkClearcoat - bark.clearcoat) * 0.024;
      youngBark.clearcoat +=
        (target.barkClearcoat * 0.75 - youngBark.clearcoat) * 0.024;
      leafMaterial.roughness +=
        (target.leafRoughness - leafMaterial.roughness) * 0.026;
      const leafClearcoatTarget =
        seasonKey === "winter" ? 0.16 : seasonKey === "spring" ? 0.08 : 0.02;
      leafMaterial.clearcoat +=
        (leafClearcoatTarget - leafMaterial.clearcoat) * 0.025;
      groundMaterial.color.lerp(new THREE.Color(target.ground), 0.022);
      fog.color.lerp(new THREE.Color(target.fog), 0.022);
      fog.density +=
        ((seasonKey === "winter" ? 0.052 : 0.038) - fog.density) * 0.02;
      tree.rotation.y +=
        (-0.2 + pointerX * 0.1 - tree.rotation.y) * 0.032;
      tree.rotation.x +=
        (pointerY * 0.024 - tree.rotation.x) * 0.032;
      tree.position.y = -2.5 + Math.sin(elapsed * 0.34) * 0.022;
      ringMaterial.opacity = 0.13 + Math.sin(elapsed * 0.62) * 0.045;

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
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          const meshMaterials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          meshMaterials.forEach((material) => materials.add(material));
        }
        if (object instanceof THREE.Points || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          materials.add(object.material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      Object.values(barkMaps).forEach((texture) => texture.dispose());
      Object.values(leafMaps).forEach((texture) => texture.dispose());
      groundTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className ? `oak-scene ${className}` : "oak-scene"}
      role="img"
      aria-label={`A realistic interactive oak tree moving through ${resolvedSeason} weather`}
    />
  );
}
