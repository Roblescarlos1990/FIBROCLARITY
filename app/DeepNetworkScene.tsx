"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type DeepNetworkSceneProps = {
  reducedMotion: boolean;
  onUnavailable?: () => void;
};

function seeded(index: number, salt = 1) {
  const value = Math.sin(index * 9283.31 + salt * 77.13) * 43758.5453;
  return value - Math.floor(value);
}

export default function DeepNetworkScene({
  reducedMotion,
  onUnavailable,
}: DeepNetworkSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      onUnavailable?.();
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050909, 0.045);

    const camera = new THREE.PerspectiveCamera(54, 1, 0.1, 80);
    camera.position.set(0, 0, 7.5);

    const world = new THREE.Group();
    scene.add(world);

    const isCompact = window.matchMedia("(max-width: 720px)").matches;
    const particleCount = isCompact ? 260 : 620;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocity = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      particlePositions[offset] = (seeded(index, 2) - 0.5) * 23;
      particlePositions[offset + 1] = (seeded(index, 3) - 0.5) * 14;
      particlePositions[offset + 2] = -seeded(index, 4) * 32 + 4;
      particleVelocity[index] = 0.012 + seeded(index, 5) * 0.028;
    }

    const particleGeometry = new THREE.BufferGeometry();
    const particleAttribute = new THREE.BufferAttribute(
      particlePositions,
      3,
    );
    particleGeometry.setAttribute("position", particleAttribute);
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8dc2b7,
      size: isCompact ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    const nodeCount = isCompact ? 34 : 62;
    const nodePositions = Array.from({ length: nodeCount }, (_, index) => {
      const radius = 1.9 + seeded(index, 6) * 4.8;
      const angle = seeded(index, 7) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        (seeded(index, 8) - 0.5) * 7,
        -3 - seeded(index, 9) * 14,
      );
    });

    const nodeBuffer = new Float32Array(nodeCount * 3);
    nodePositions.forEach((position, index) => {
      position.toArray(nodeBuffer, index * 3);
    });
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodeBuffer, 3),
    );
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0xd1bd83,
      size: 0.09,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    world.add(nodes);

    const connectionPositions: number[] = [];
    for (let first = 0; first < nodePositions.length; first += 1) {
      for (let second = first + 1; second < nodePositions.length; second += 1) {
        const distance = nodePositions[first].distanceTo(nodePositions[second]);
        if (distance < 2.55 && seeded(first * nodeCount + second, 10) > 0.22) {
          connectionPositions.push(
            ...nodePositions[first].toArray(),
            ...nodePositions[second].toArray(),
          );
        }
      }
    }
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(connectionPositions, 3),
    );
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x4c8c80,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const connections = new THREE.LineSegments(
      connectionGeometry,
      connectionMaterial,
    );
    world.add(connections);

    const tunnel = new THREE.Group();
    const tunnelMaterial = new THREE.LineBasicMaterial({
      color: 0x4b8279,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
    });
    for (let index = 0; index < 13; index += 1) {
      const z = 2 - index * 2.6;
      const width = 7.6 + index * 0.62;
      const height = 4.5 + index * 0.36;
      const frameGeometry = new THREE.BufferGeometry();
      frameGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          [
            -width,
            -height,
            z,
            width,
            -height,
            z,
            width,
            -height,
            z,
            width,
            height,
            z,
            width,
            height,
            z,
            -width,
            height,
            z,
            -width,
            height,
            z,
            -width,
            -height,
            z,
          ],
          3,
        ),
      );
      tunnel.add(new THREE.LineSegments(frameGeometry, tunnelMaterial));
    }
    tunnel.rotation.z = -0.04;
    world.add(tunnel);

    const streamPositions: number[] = [];
    const streamCount = isCompact ? 24 : 52;
    for (let index = 0; index < streamCount; index += 1) {
      const x = (seeded(index, 11) - 0.5) * 18;
      const y = (seeded(index, 12) - 0.5) * 11;
      const z = -2 - seeded(index, 13) * 26;
      const length = 0.35 + seeded(index, 14) * 2.2;
      streamPositions.push(x, y, z, x, y - length, z);
    }
    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(streamPositions, 3),
    );
    const streamMaterial = new THREE.LineBasicMaterial({
      color: 0x49b3c9,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const streams = new THREE.LineSegments(
      streamGeometry,
      streamMaterial,
    );
    world.add(streams);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrame = 0;
    const clock = new THREE.Clock();

    const updatePointer = (clientX: number, clientY: number) => {
      targetX = (clientX / window.innerWidth - 0.5) * 2;
      targetY = (clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, isCompact ? 1.2 : 1.65),
      );
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;

      if (!reducedMotion) {
        for (let index = 0; index < particleCount; index += 1) {
          const zIndex = index * 3 + 2;
          particlePositions[zIndex] += particleVelocity[index];
          if (particlePositions[zIndex] > 5) particlePositions[zIndex] = -30;
        }
        particleAttribute.needsUpdate = true;
        tunnel.position.z = (elapsed * 0.35) % 2.6;
        tunnel.rotation.z = -0.04 + Math.sin(elapsed * 0.12) * 0.018;
        connections.material.opacity =
          0.17 + Math.sin(elapsed * 0.7) * 0.035;
        streams.position.y = -((elapsed * 0.18) % 1.4);
      }

      world.rotation.y = pointerX * 0.055;
      world.rotation.x = pointerY * 0.04;
      camera.position.x = pointerX * 0.22;
      camera.position.y = -pointerY * 0.14;
      camera.lookAt(0, 0, -7);
      renderer.render(scene, camera);
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      particleGeometry.dispose();
      particleMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      tunnel.children.forEach((child) => {
        if (child instanceof THREE.LineSegments) child.geometry.dispose();
      });
      tunnelMaterial.dispose();
      streamGeometry.dispose();
      streamMaterial.dispose();
      renderer.dispose();
    };
  }, [onUnavailable, reducedMotion]);

  return <canvas ref={canvasRef} className="intro-network-canvas" />;
}
