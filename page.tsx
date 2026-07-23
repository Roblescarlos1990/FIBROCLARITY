"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SeasonKey = "spring" | "summer" | "autumn" | "winter";

type OakSceneProps = {
  season: SeasonKey;
};

type SeasonStyle = {
  colors: string[];
  leafScale: number;
  light: string;
  ground: string;
};

const styles: Record<SeasonKey, SeasonStyle> = {
  spring: {
    colors: ["#7da66c", "#9bc484", "#5f8f72", "#b8c98c"],
    leafScale: 0.72,
    light: "#c6efcf",
    ground: "#7eaa91",
  },
  summer: {
    colors: ["#315d45", "#47785b", "#6d8b4e", "#224d3a"],
    leafScale: 1,
    light: "#f0d8a4",
    ground: "#657e67",
  },
  autumn: {
    colors: ["#bd532f", "#d77a32", "#a83d2d", "#d3a247"],
    leafScale: 0.9,
    light: "#f4b96a",
    ground: "#9f6849",
  },
  winter: {
    colors: ["#9aa7aa", "#72858a", "#b7b9ad", "#63747c"],
    leafScale: 0.1,
    light: "#c8dce3",
    ground: "#75858b",
  },
};

const seedRandom = (() => {
  let seed = 824731;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
})();

function branchBetween(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  material: THREE.Material,
) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(
    radius * 0.62,
    radius,
    length,
    9,
  );
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(start.clone().add(end).multiplyScalar(0.5));
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  mesh.castShadow = true;
  return mesh;
}

export default function OakScene({ season }: OakSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const seasonRef = useRef(season);

  useEffect(() => {
    seasonRef.current = season;
  }, [season]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const initialStyle = styles[seasonRef.current];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 2.25, 8.4);

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
    mount.appendChild(renderer.domElement);

    const tree = new THREE.Group();
    tree.position.y = -2.45;
    tree.rotation.y = -0.22;
    scene.add(tree);

    const bark = new THREE.MeshStandardMaterial({
      color: "#554338",
      roughness: 0.94,
      metalness: 0.02,
    });
    const barkLight = new THREE.MeshStandardMaterial({
      color: "#745b45",
      roughness: 0.88,
    });

    const trunkPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.03, 1.1, 0),
      new THREE.Vector3(-0.05, 2.2, 0.02),
      new THREE.Vector3(0.1, 3.25, 0),
      new THREE.Vector3(0.02, 4.15, -0.05),
    ];
    const trunkRadii = [0.38, 0.33, 0.27, 0.19];
    trunkRadii.forEach((radius, index) => {
      tree.add(
        branchBetween(
          trunkPoints[index],
          trunkPoints[index + 1],
          radius,
          index % 2 ? barkLight : bark,
        ),
      );
    });

    const branchSpecs: Array<
      [THREE.Vector3, THREE.Vector3, number, number]
    > = [
      [new THREE.Vector3(-0.02, 1.45, 0), new THREE.Vector3(-1.55, 2.7, 0.18), 0.22, 2],
      [new THREE.Vector3(-0.85, 2.15, 0.1), new THREE.Vector3(-2.1, 3.05, 0.35), 0.12, 1],
      [new THREE.Vector3(0.02, 1.85, 0), new THREE.Vector3(1.45, 2.95, 0.15), 0.24, 2],
      [new THREE.Vector3(0.92, 2.55, 0.1), new THREE.Vector3(2.0, 3.42, 0.4), 0.12, 1],
      [new THREE.Vector3(-0.03, 2.42, 0), new THREE.Vector3(-1.25, 3.65, -0.25), 0.2, 2],
      [new THREE.Vector3(-0.72, 3.08, -0.14), new THREE.Vector3(-1.8, 3.94, -0.42), 0.1, 1],
      [new THREE.Vector3(0.07, 2.72, 0), new THREE.Vector3(1.14, 3.82, -0.35), 0.18, 2],
      [new THREE.Vector3(0.7, 3.35, -0.22), new THREE.Vector3(1.72, 4.08, -0.38), 0.09, 1],
      [new THREE.Vector3(0.02, 3.18, 0), new THREE.Vector3(-0.62, 4.38, 0.12), 0.14, 2],
      [new THREE.Vector3(0.02, 3.55, -0.04), new THREE.Vector3(0.58, 4.58, 0.1), 0.13, 2],
      [new THREE.Vector3(-0.02, 3.72, -0.03), new THREE.Vector3(-0.15, 4.92, -0.08), 0.12, 2],
      [new THREE.Vector3(-0.85, 2.22, 0.1), new THREE.Vector3(-1.48, 2.45, -0.82), 0.09, 1],
      [new THREE.Vector3(0.82, 2.46, 0.08), new THREE.Vector3(1.48, 2.68, -0.76), 0.09, 1],
    ];

    const canopyAnchors: THREE.Vector3[] = [];
    branchSpecs.forEach(([start, end, radius, twigs]) => {
      tree.add(branchBetween(start, end, radius, bark));
      canopyAnchors.push(end);
      for (let i = 0; i < twigs; i += 1) {
        const direction = end.clone().sub(start).normalize();
        const twigStart = start.clone().lerp(end, 0.58 + i * 0.17);
        const side = new THREE.Vector3(
          (seedRandom() - 0.5) * 1.1,
          0.45 + seedRandom() * 0.45,
          (seedRandom() - 0.5) * 1.25,
        );
        const twigEnd = twigStart
          .clone()
          .add(direction.multiplyScalar(0.42))
          .add(side);
        tree.add(branchBetween(twigStart, twigEnd, radius * 0.48, bark));
        canopyAnchors.push(twigEnd);
      }
    });

    const leafCount = 260;
    const leafGeometry = new THREE.DodecahedronGeometry(0.145, 0);
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.76,
      vertexColors: true,
    });
    const leaves = new THREE.InstancedMesh(
      leafGeometry,
      leafMaterial,
      leafCount,
    );
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    tree.add(leaves);

    const leafData = Array.from({ length: leafCount }, (_, index) => {
      const anchor = canopyAnchors[index % canopyAnchors.length];
      const radius = 0.34 + seedRandom() * 0.74;
      return {
        position: new THREE.Vector3(
          anchor.x + (seedRandom() - 0.5) * radius * 1.7,
          anchor.y + (seedRandom() - 0.5) * radius,
          anchor.z + (seedRandom() - 0.5) * radius * 1.35,
        ),
        rotation: new THREE.Euler(
          seedRandom() * Math.PI,
          seedRandom() * Math.PI,
          seedRandom() * Math.PI,
        ),
        scale: 0.62 + seedRandom() * 0.8,
        paletteIndex: Math.floor(seedRandom() * 4),
      };
    });

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: initialStyle.ground,
      roughness: 0.98,
      transparent: true,
      opacity: 0.36,
    });
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.1, 64),
      groundMaterial,
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.02;
    ground.receiveShadow = true;
    tree.add(ground);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#c9ad71",
      transparent: true,
      opacity: 0.2,
    });
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.32, 2.345, 96),
      ringMaterial,
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.03;
    tree.add(ring);

    const ambient = new THREE.HemisphereLight("#dcefee", "#2b211c", 2.2);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(initialStyle.light, 5.5);
    key.position.set(-3, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.PointLight("#d7b975", 16, 14);
    rim.position.set(3.6, 3.5, 2.8);
    scene.add(rim);

    const dummy = new THREE.Object3D();
    const currentColors = leafData.map(
      (_, index) =>
        new THREE.Color(
          initialStyle.colors[index % initialStyle.colors.length],
        ),
    );
    let currentLeafScale = initialStyle.leafScale;
    let pointerX = 0;
    let pointerY = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
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
    resize();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const target = styles[seasonRef.current];
      currentLeafScale += (target.leafScale - currentLeafScale) * 0.035;

      leafData.forEach((leaf, index) => {
        const targetColor = new THREE.Color(
          target.colors[leaf.paletteIndex % target.colors.length],
        );
        currentColors[index].lerp(targetColor, 0.035);
        leaves.setColorAt(index, currentColors[index]);
        dummy.position.copy(leaf.position);
        dummy.position.y += Math.sin(elapsed * 0.72 + index * 0.7) * 0.018;
        dummy.rotation.copy(leaf.rotation);
        dummy.rotation.y += Math.sin(elapsed * 0.46 + index) * 0.08;
        const winterVariation =
          seasonRef.current === "winter" && index % 12 !== 0 ? 0.08 : 1;
        const scale = leaf.scale * currentLeafScale * winterVariation;
        dummy.scale.set(scale * 1.2, scale * 0.7, scale);
        dummy.updateMatrix();
        leaves.setMatrixAt(index, dummy.matrix);
      });
      leaves.instanceMatrix.needsUpdate = true;
      if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;

      key.color.lerp(new THREE.Color(target.light), 0.025);
      groundMaterial.color.lerp(new THREE.Color(target.ground), 0.025);
      tree.rotation.y +=
        (-0.22 + pointerX * 0.095 - tree.rotation.y) * 0.035;
      tree.rotation.x +=
        (pointerY * 0.025 - tree.rotation.x) * 0.035;
      tree.position.y = -2.45 + Math.sin(elapsed * 0.38) * 0.025;
      ringMaterial.opacity = 0.14 + Math.sin(elapsed * 0.7) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      mount.removeEventListener("pointermove", onPointerMove);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="oak-scene"
      role="img"
      aria-label={`An interactive oak tree shown in ${season}`}
    />
  );
}
