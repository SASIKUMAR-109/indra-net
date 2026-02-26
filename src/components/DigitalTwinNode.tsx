'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function DigitalTwinNode() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Core sphere
        const coreGeo = new THREE.IcosahedronGeometry(1, 1);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x00F2FF,
            emissive: 0x00F2FF,
            emissiveIntensity: 0.3,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Outer ring 1
        const ring1Geo = new THREE.TorusGeometry(1.6, 0.008, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({
            color: 0x00F2FF,
            emissive: 0x00F2FF,
            emissiveIntensity: 0.6,
            transparent: true,
            opacity: 0.5,
        });
        const ring1 = new THREE.Mesh(ring1Geo, ringMat);
        ring1.rotation.x = Math.PI / 2;
        scene.add(ring1);

        // Outer ring 2
        const ring2Geo = new THREE.TorusGeometry(1.9, 0.005, 16, 100);
        const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x00F2FF,
            emissive: 0x00F2FF,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.3,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 3;
        scene.add(ring2);

        // Floating data points
        const pointsGeo = new THREE.BufferGeometry();
        const count = 60;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.4 + Math.random() * 0.5;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pointsMat = new THREE.PointsMaterial({
            color: 0x00F2FF,
            size: 0.04,
            transparent: true,
            opacity: 0.7,
        });
        const points = new THREE.Points(pointsGeo, pointsMat);
        scene.add(points);

        // Lights
        const ambientLight = new THREE.AmbientLight(0x111111, 2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x00F2FF, 3, 10);
        pointLight.position.set(2, 2, 2);
        scene.add(pointLight);

        // Animation
        let frame: number;
        const clock = new THREE.Clock();
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            core.rotation.y = t * 0.4;
            core.rotation.x = t * 0.2;
            ring1.rotation.z = t * 0.3;
            ring2.rotation.x = t * 0.2;
            ring2.rotation.z = -t * 0.15;
            points.rotation.y = t * 0.1;
            coreMat.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.15;
            renderer.render(scene, camera);
        };
        animate();

        // Resize
        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
}
