'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, AlertTriangle, RefreshCw, Radio, Activity } from 'lucide-react';

const NODE_COUNT = 14;

function generateNodes(interference: number) {
    const failedCount = Math.floor((interference / 100) * 6);
    const pool = Array.from({ length: NODE_COUNT }, (_, i) => i);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const failedSet = new Set(shuffled.slice(0, failedCount));
    return pool.map(i => ({ id: i, label: `N${String(i + 1).padStart(2, '0')}`, failed: failedSet.has(i) }));
}
function generateLinks(nodes: { id: number; failed: boolean }[]) {
    const active = nodes.filter(n => !n.failed).map(n => n.id);
    const links: { source: number; target: number }[] = [];
    for (let i = 0; i < active.length - 1; i++) links.push({ source: active[i], target: active[i + 1] });
    for (let i = 0; i < active.length; i++)
        for (let j = i + 2; j < active.length; j++)
            if (Math.random() > 0.6) links.push({ source: active[i], target: active[j] });
    return links;
}

function MeshGraph({ nodes, links }: { nodes: { id: number; label: string; failed: boolean }[]; links: { source: number; target: number }[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const posRef = useRef<Map<number, { x: number; y: number; vx: number; vy: number }>>(new Map());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const W = canvas.width, H = canvas.height;

        nodes.forEach(n => {
            if (!posRef.current.has(n.id)) {
                const angle = (n.id / NODE_COUNT) * Math.PI * 2;
                const r = Math.min(W, H) * 0.34;
                posRef.current.set(n.id, { x: W / 2 + r * Math.cos(angle), y: H / 2 + r * Math.sin(angle), vx: 0, vy: 0 });
            }
        });

        let t = 0;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            t += 0.025;

            posRef.current.forEach((pos, id) => {
                posRef.current.forEach((other, otherId) => {
                    if (otherId === id) return;
                    const dx = pos.x - other.x, dy = pos.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = 900 / (dist * dist);
                    pos.vx += (dx / dist) * force; pos.vy += (dy / dist) * force;
                });
                pos.vx += (W / 2 - pos.x) * 0.003;
                pos.vy += (H / 2 - pos.y) * 0.003;
                pos.vx *= 0.84; pos.vy *= 0.84;
                pos.x = Math.max(30, Math.min(W - 30, pos.x + pos.vx));
                pos.y = Math.max(30, Math.min(H - 30, pos.y + pos.vy));
            });

            links.forEach(link => {
                const s = posRef.current.get(link.source), tg = posRef.current.get(link.target);
                if (!s || !tg) return;
                const dx = tg.x - s.x, dy = tg.y - s.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1, ideal = 100, f = (dist - ideal) * 0.025;
                s.vx += (dx / dist) * f; s.vy += (dy / dist) * f;
                tg.vx -= (dx / dist) * f; tg.vy -= (dy / dist) * f;
            });

            /* Links */
            links.forEach(link => {
                const s = posRef.current.get(link.source), tg = posRef.current.get(link.target);
                if (!s || !tg) return;
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tg.x, tg.y);
                ctx.strokeStyle = `rgba(212,160,23,${0.14 + Math.abs(Math.sin(t)) * 0.09})`; ctx.lineWidth = 1.3; ctx.stroke();
                const p = (Math.sin(t * 2 + link.source) + 1) / 2;
                ctx.beginPath(); ctx.arc(s.x + (tg.x - s.x) * p, s.y + (tg.y - s.y) * p, 2.8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(240,192,64,0.9)'; ctx.fill();
            });

            /* Nodes */
            nodes.forEach(n => {
                const pos = posRef.current.get(n.id);
                if (!pos) return;
                const color = n.failed ? '#FF4444' : '#D4A017';
                if (!n.failed) {
                    const pulse = (Math.sin(t * 1.5 + n.id) + 1) / 2;
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, 12 + pulse * 10, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(212,160,23,${0.12 - pulse * 0.09})`; ctx.lineWidth = 1; ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
                ctx.fillStyle = n.failed ? 'rgba(255,68,68,0.2)' : 'rgba(212,160,23,0.18)'; ctx.fill();
                ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = color; ctx.font = 'bold 9px JetBrains Mono, monospace'; ctx.textAlign = 'center';
                ctx.fillText(n.label, pos.x, pos.y + 24);
            });

            animRef.current = requestAnimationFrame(draw);
        };
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [nodes, links]);

    return <canvas ref={canvasRef} width={760} height={500} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default function MeshTopologyPage() {
    const [interference, setInterference] = useState(0);
    const [nodes, setNodes] = useState(() => generateNodes(0));
    const [links, setLinks] = useState<{ source: number; target: number }[]>([]);
    const [freq, setFreq] = useState('433.5');
    const [reroutes, setReroutes] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const n = generateNodes(0); setNodes(n); setLinks(generateLinks(n));
    }, []);

    const rebuild = useCallback((val: number) => {
        const n = generateNodes(val); setNodes(n); setLinks(generateLinks(n));
        setReroutes(r => r + 1);
        setFreq((433.5 + (val / 100) * 2.5).toFixed(1));
    }, []);

    const failed = nodes.filter(n => n.failed).length;
    const active = nodes.filter(n => !n.failed).length;

    return (
        <div className="page-wrap">

            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Mesh Topology" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">TACTICAL MESH · SELF-HEALING NETWORK</span>
                    </div>
                    <h1 className="page-hero__title">Mesh <span className="gold">Topology</span> Engine</h1>
                    <p className="page-hero__sub">Self-healing TDMA mesh · Frequency-hopping spread spectrum</p>
                </div>
            </div>

            <div className="content-wrap">

                {/* KPI bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
                    {[
                        { label: 'ACTIVE NODES', value: active, color: '#D4A017' },
                        { label: 'FAILED NODES', value: failed, color: failed > 0 ? '#FF4444' : '#39F07A' },
                        { label: 'NETWORK LINKS', value: links.length, color: '#8DB05A' },
                        { label: 'PATH REROUTES', value: reroutes, color: '#39F07A' },
                    ].map((s, i) => (
                        <motion.div key={s.label} className="kpi-card"
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                            <div className="kpi-value" style={{ color: s.color }}>{s.value}</div>
                            <div className="kpi-label">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '22px' }}>

                    {/* Canvas */}
                    <motion.div className="panel-gold"
                        initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                        style={{ height: '520px', position: 'relative', overflow: 'hidden', padding: 0 }}>
                        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Network size={14} color="#D4A017" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#D4A017', letterSpacing: '2px' }}>LIVE MESH TOPOLOGY</span>
                        </div>
                        <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D4A017', animation: 'pulseDot 2s infinite' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#D4A017' }}>RENDERING</span>
                            </div>
                        </div>
                        {mounted && <MeshGraph nodes={nodes} links={links} />}
                    </motion.div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* Interference */}
                        <motion.div className="panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                <AlertTriangle size={14} color="#FF4444" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>TACTICAL INTERFERENCE</span>
                            </div>
                            <input type="range" min={0} max={100} value={interference}
                                onChange={e => { setInterference(Number(e.target.value)); rebuild(Number(e.target.value)); }}
                                style={{
                                    width: '100%', height: '5px', appearance: 'none',
                                    borderRadius: '3px', cursor: 'pointer', accentColor: '#FF4444',
                                    background: `linear-gradient(to right, #FF4444 ${interference}%, rgba(36,51,24,0.8) ${interference}%)`
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2A3D1A' }}>0%</span>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', color: '#FF4444', fontWeight: 700 }}>{interference}%</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2A3D1A' }}>100%</span>
                            </div>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', marginTop: '10px', lineHeight: 1.6 }}>
                                {interference === 0 ? '✅ All nodes active · No interference' :
                                    interference < 40 ? '🟡 Low interference · Network stable' :
                                        interference < 70 ? '🟠 Moderate · Rerouting paths...' : '🔴 High interference · Emergency protocol'}
                            </p>
                        </motion.div>

                        {/* Frequency */}
                        <motion.div className="panel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Radio size={13} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>FREQUENCY HOPPING</span>
                            </div>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '24px', fontWeight: 700, color: '#D4A017', textShadow: '0 0 12px rgba(212,160,23,0.5)' }}>
                                {freq} MHz
                            </div>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', marginTop: '5px' }}>FHSS · 125 hops/sec · AES keyed</p>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                                {[433.5, 433.8, 434.1, 434.4, 434.7].map(f => {
                                    const isActive = Math.abs(parseFloat(freq) - f) < 0.2;
                                    return (
                                        <div key={f} style={{
                                            flex: 1, height: '28px', borderRadius: '5px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
                                            background: isActive ? 'rgba(212,160,23,0.2)' : 'rgba(8,12,6,0.8)',
                                            border: `1px solid ${isActive ? 'rgba(212,160,23,0.5)' : 'rgba(36,51,24,0.6)'}`,
                                            color: isActive ? '#D4A017' : '#2A3D1A',
                                            transition: 'all 0.3s',
                                            boxShadow: isActive ? '0 0 10px rgba(212,160,23,0.2)' : 'none',
                                        }}>{f}</div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Network Events */}
                        <motion.div className="panel" style={{ flex: 1 }}
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                <RefreshCw size={13} color="#39F07A" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>NETWORK EVENTS</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {failed > 0 ? nodes.filter(n => n.failed).map(n => (
                                    <AnimatePresence key={n.id}>
                                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                            style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF4444', marginTop: '3px', flexShrink: 0 }} />
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#FF4444', lineHeight: 1.5 }}>
                                                NODE-{String(n.id + 1).padStart(2, '0')} FAILED · PATH RECONFIGURED
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                )) : (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Activity size={13} color="#39F07A" />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#39F07A' }}>
                                            All nodes operational
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
