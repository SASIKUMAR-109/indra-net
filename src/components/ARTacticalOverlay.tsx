'use client';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const POSTURES = [
    { id: 'standing', label: 'Standing', angle: 45, tiltX: 0, tiltY: 0, color: 0x9ACD32 },
    { id: 'prone', label: 'Prone', angle: 20, tiltX: 1.3, tiltY: 0, color: 0xD4A017 },
    { id: 'left', label: 'Left Flank', angle: 35, tiltX: 0, tiltY: 0.8, color: 0x00F2FF },
    { id: 'right', label: 'Right Flank', angle: 35, tiltX: 0, tiltY: -0.8, color: 0xFF9933 },
];

export default function ARTacticalOverlay() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [posture, setPosture] = useState(POSTURES[0]);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const W = mount.clientWidth, H = mount.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
        camera.position.set(0, 4, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        mount.appendChild(renderer.domElement);

        // Ground grid
        const gridHelper = new THREE.GridHelper(10, 20, 0x243318, 0x1a2810);
        scene.add(gridHelper);

        // Soldier node (the entity)
        const soldierGeo = new THREE.CylinderGeometry(0.15, 0.12, 0.7, 8);
        const soldierMat = new THREE.MeshStandardMaterial({ color: 0x4B5320, emissive: 0x4B5320, emissiveIntensity: 0.3 });
        const soldier = new THREE.Mesh(soldierGeo, soldierMat);
        soldier.position.y = 0.35;
        scene.add(soldier);

        // Head
        const headGeo = new THREE.SphereGeometry(0.18, 8, 6);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x827751, emissive: 0x4B5320, emissiveIntensity: 0.15 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 0.85;
        scene.add(head);

        // FOV cone (Cone of Vision)
        const coneGeo = new THREE.ConeGeometry(
            Math.tan((posture.angle * Math.PI) / 180) * 3.5,
            3.5, 32, 1, true
        );
        const coneMat = new THREE.MeshStandardMaterial({
            color: posture.color,
            emissive: posture.color,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.22,
            side: THREE.DoubleSide,
            wireframe: false,
        });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.rotation.x = Math.PI;
        cone.position.y = 0.85;

        // Cone outline (wireframe)
        const coneOutGeo = new THREE.ConeGeometry(
            Math.tan((posture.angle * Math.PI) / 180) * 3.5,
            3.5, 16, 1, true
        );
        const coneOutMat = new THREE.MeshBasicMaterial({ color: posture.color, wireframe: true, transparent: true, opacity: 0.55 });
        const coneOut = new THREE.Mesh(coneOutGeo, coneOutMat);
        coneOut.rotation.x = Math.PI;
        coneOut.position.y = 0.85;

        const coneGroup = new THREE.Group();
        coneGroup.add(cone, coneOut);
        coneGroup.rotation.x = posture.tiltX;
        coneGroup.rotation.z = posture.tiltY;
        scene.add(coneGroup);

        // Lights
        scene.add(new THREE.AmbientLight(0x0D1509, 4));
        const pt = new THREE.PointLight(posture.color, 3, 8);
        pt.position.set(0, 2, 2);
        scene.add(pt);

        // Animate
        let frame: number;
        const clock = new THREE.Clock();
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            coneMat.opacity = 0.18 + Math.sin(t * 2.2) * 0.07;
            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, [posture]);

    return (
        <div style={{ position: 'relative' }}>
            {/* 3D Viewport */}
            <div ref={mountRef} style={{ width: '100%', height: '280px', borderRadius: '8px', overflow: 'hidden' }} />

            {/* Posture buttons */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
                {POSTURES.map(p => {
                    const isActive = p.id === posture.id;
                    const hexColor = `#${p.color.toString(16).padStart(6, '0')}`;
                    return (
                        <button
                            key={p.id}
                            onClick={() => setPosture(p)}
                            style={{
                                padding: '7px 14px',
                                borderRadius: '6px',
                                border: `1px solid ${isActive ? hexColor : 'rgba(36,51,24,0.6)'}`,
                                background: isActive ? `${hexColor}18` : 'rgba(8,12,6,0.8)',
                                color: isActive ? hexColor : '#4A6A2A',
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '10px',
                                letterSpacing: '1.5px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: isActive ? `0 0 12px ${hexColor}40` : 'none',
                            }}
                        >
                            {p.label.toUpperCase()}
                        </button>
                    );
                })}
            </div>

            {/* MPU6050 readout */}
            <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(4,6,4,0.7)', borderRadius: '6px', border: '1px solid rgba(36,51,24,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A', letterSpacing: '2px' }}>MPU6050 · IMU DATA</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#9ACD32' }}>LIVE</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
                    {[
                        { axis: 'PITCH', val: (posture.tiltX * 45).toFixed(1) + '°' },
                        { axis: 'ROLL', val: (posture.tiltY * 45).toFixed(1) + '°' },
                        { axis: 'FOV', val: posture.angle + '°' },
                    ].map(r => (
                        <div key={r.axis}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>{r.axis}</div>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 700, color: '#00F2FF' }}>{r.val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
