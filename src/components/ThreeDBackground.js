import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Add geometry and material for the background
    const geometry = new THREE.SphereGeometry(500, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "https://cdn.polyhaven.com/asset_img/primary/herringbone_brick.png?height=720" // Replace with your background image URL
    );
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Camera position
    camera.position.set(0, 0, 0.1);

    // Animation function
    const animate = () => {
      sphere.rotation.y += 0.002; // Rotate for a dynamic effect
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
        window.removeEventListener("resize", handleResize);
  
        // Check before removing child
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    }, []);

  return <div ref={mountRef} style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeDBackground;
