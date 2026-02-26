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

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // ── Core icosahedron (GOLD wireframe)
        const coreGeo = new THREE.IcosahedronGeometry(1, 1);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0xD4A017,
            emissive: 0xD4A017,
            emissiveIntensity: 0.4,
            wireframe: true,
            transparent: true,
            opacity: 0.85,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // ── Inner solid sphere (dark olive)
        const innerGeo = new THREE.IcosahedronGeometry(0.6, 2);
        const innerMat = new THREE.MeshStandardMaterial({
            color: 0x4A6A2A,
            emissive: 0x6B8C42,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.6,
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        scene.add(inner);

        // ── Ring 1 — gold equatorial
        const ring1Geo = new THREE.TorusGeometry(1.55, 0.009, 16, 100);
        const ring1Mat = new THREE.MeshStandardMaterial({
            color: 0xD4A017,
            emissive: 0xF0C040,
            emissiveIntensity: 0.7,
            transparent: true,
            opacity: 0.6,
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        ring1.rotation.x = Math.PI / 2;
        scene.add(ring1);

        // ── Ring 2 — olive inclined
        const ring2Geo = new THREE.TorusGeometry(1.85, 0.005, 16, 100);
        const ring2Mat = new THREE.MeshStandardMaterial({
            color: 0x6B8C42,
            emissive: 0x8DB05A,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.4,
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.y = Math.PI / 3;
        scene.add(ring2);

        // ── Ring 3 — dim gold diagonal
        const ring3Geo = new THREE.TorusGeometry(2.1, 0.004, 16, 100);
        const ring3Mat = new THREE.MeshStandardMaterial({
            color: 0xD4A017,
            emissive: 0xD4A017,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.2,
        });
        const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
        ring3.rotation.x = Math.PI / 4;
        ring3.rotation.z = Math.PI / 5;
        scene.add(ring3);

        // ── Floating gold data points
        const pointsGeo = new THREE.BufferGeometry();
        const count = 80;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2.3 + Math.random() * 0.6;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pointsMat = new THREE.PointsMaterial({
            color: 0xF0C040,
            size: 0.045,
            transparent: true,
            opacity: 0.75,
        });
        const points = new THREE.Points(pointsGeo, pointsMat);
        scene.add(points);

        // ── Lights
        scene.add(new THREE.AmbientLight(0x0D1509, 3));
        const goldLight = new THREE.PointLight(0xD4A017, 4, 12);
        goldLight.position.set(2, 2, 2);
        scene.add(goldLight);
        const oliveLight = new THREE.PointLight(0x6B8C42, 2, 10);
        oliveLight.position.set(-2, -1, 1);
        scene.add(oliveLight);

        // ── Animate
        let frame: number;
        const clock = new THREE.Clock();
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            core.rotation.y = t * 0.35;
            core.rotation.x = t * 0.18;
            inner.rotation.y = -t * 0.25;
            ring1.rotation.z = t * 0.28;
            ring2.rotation.x = t * 0.18;
            ring2.rotation.z = -t * 0.12;
            ring3.rotation.y = t * 0.15;
            points.rotation.y = t * 0.08;
            coreMat.emissiveIntensity = 0.35 + Math.sin(t * 1.8) * 0.18;
            goldLight.intensity = 3.5 + Math.sin(t * 2.2) * 0.8;
            renderer.render(scene, camera);
        };
        animate();

        // ── Resize
        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth, h = mount.clientHeight;
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
