'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, AlertTriangle, RefreshCw, Radio } from 'lucide-react';

const GOLD = '#D4A017';
const GREEN = '#3DFF88';
const RED = '#FF4444';
const OLIVE = '#6B8C42';
const MUTED = '#7A8A6A';
const CREAM = '#EDE8D0';
const BG_CARD = 'rgba(20,31,15,0.9)';
const BORDER = 'rgba(74,106,42,0.35)';
const BORDER_G = 'rgba(212,160,23,0.25)';

const NODE_COUNT = 14;

function generateNodes(interference: number) {
    const failedCount = Math.floor((interference / 100) * 6);
    const pool = Array.from({ length: NODE_COUNT }, (_, i) => i);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const failedSet = new Set(shuffled.slice(0, failedCount));
    return pool.map((i) => ({ id: i, label: `N${String(i + 1).padStart(2, '0')}`, failed: failedSet.has(i) }));
}
function generateLinks(nodes: { id: number; failed: boolean }[]) {
    const active = nodes.filter((n) => !n.failed).map((n) => n.id);
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

        nodes.forEach((n) => {
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
                pos.x = Math.max(28, Math.min(W - 28, pos.x + pos.vx));
                pos.y = Math.max(28, Math.min(H - 28, pos.y + pos.vy));
            });
            links.forEach((link) => {
                const s = posRef.current.get(link.source), tg = posRef.current.get(link.target);
                if (!s || !tg) return;
                const dx = tg.x - s.x, dy = tg.y - s.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1, ideal = 100, f = (dist - ideal) * 0.025;
                s.vx += (dx / dist) * f; s.vy += (dy / dist) * f;
                tg.vx -= (dx / dist) * f; tg.vy -= (dy / dist) * f;
            });

            /* Draw links */
            links.forEach((link) => {
                const s = posRef.current.get(link.source), tg = posRef.current.get(link.target);
                if (!s || !tg) return;
                ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tg.x, tg.y);
                ctx.strokeStyle = `rgba(212,160,23,${0.12 + Math.abs(Math.sin(t)) * 0.08})`; ctx.lineWidth = 1.2; ctx.stroke();
                const p = (Math.sin(t * 2 + link.source) + 1) / 2;
                ctx.beginPath(); ctx.arc(s.x + (tg.x - s.x) * p, s.y + (tg.y - s.y) * p, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(212,160,23,0.85)'; ctx.fill();
            });

            /* Draw nodes */
            nodes.forEach((n) => {
                const pos = posRef.current.get(n.id);
                if (!pos) return;
                const color = n.failed ? '#FF4444' : '#D4A017';
                if (!n.failed) {
                    const pulse = (Math.sin(t * 1.5 + n.id) + 1) / 2;
                    ctx.beginPath(); ctx.arc(pos.x, pos.y, 10 + pulse * 9, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(212,160,23,${0.12 - pulse * 0.1})`; ctx.lineWidth = 1; ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
                ctx.fillStyle = n.failed ? 'rgba(255,68,68,0.2)' : 'rgba(212,160,23,0.15)'; ctx.fill();
                ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
                ctx.fillStyle = color; ctx.font = 'bold 9px JetBrains Mono, monospace'; ctx.textAlign = 'center';
                ctx.fillText(n.label, pos.x, pos.y + 22);
            });

            animRef.current = requestAnimationFrame(draw);
        };
        animRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animRef.current);
    }, [nodes, links]);

    return <canvas ref={canvasRef} width={760} height={460} style={{ width: '100%', height: '100%', display: 'block' }} />;
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
        setReroutes((r) => r + 1);
        setFreq((433.5 + (val / 100) * 2.5).toFixed(1));
    }, []);

    const failed = nodes.filter((n) => n.failed).length;
    const active = nodes.filter((n) => !n.failed).length;
    const cardStyle = { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px' };

    return (
        <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '1600px' }}>
            {/* Header */}
            <div style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: OLIVE, letterSpacing: '3px' }}>TACTICAL MESH · SELF-HEALING NETWORK</span>
                </div>
                <h1 style={{ fontFamily: 'Orbitron, Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', color: CREAM, margin: 0 }}>
                    Mesh <span style={{ color: GOLD, textShadow: `0 0 15px rgba(212,160,23,0.5)` }}>Topology</span> Engine
                </h1>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: MUTED, marginTop: '8px' }}>
                    Self-healing TDMA mesh · Frequency-hopping spread spectrum
                </p>
            </div>

            {/* Status bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
                {[
                    { label: 'Active Nodes', value: active, color: GOLD },
                    { label: 'Failed Nodes', value: failed, color: failed > 0 ? RED : GREEN },
                    { label: 'Network Links', value: links.length, color: OLIVE },
                    { label: 'Path Reroutes', value: reroutes, color: GREEN },
                ].map((s) => (
                    <div key={s.label} style={{ ...cardStyle, textAlign: 'center', border: `1px solid ${BORDER_G}` }}>
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '30px', fontWeight: 700, color: s.color }}>{s.value}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, marginTop: '4px', letterSpacing: '1px' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '22px' }}>
                {/* Canvas */}
                <div style={{ ...cardStyle, height: '480px', position: 'relative', overflow: 'hidden', border: `1px solid ${BORDER_G}` }}>
                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Network size={15} color={GOLD} />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: GOLD, letterSpacing: '2px' }}>LIVE MESH TOPOLOGY</span>
                    </div>
                    {mounted && <MeshGraph nodes={nodes} links={links} />}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Interference Slider */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                            <AlertTriangle size={15} color={RED} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '1px' }}>TACTICAL INTERFERENCE</span>
                        </div>
                        <input type="range" min={0} max={100} value={interference}
                            onChange={(e) => { setInterference(Number(e.target.value)); rebuild(Number(e.target.value)); }}
                            style={{ width: '100%', height: '4px', appearance: 'none', borderRadius: '2px', cursor: 'pointer', accentColor: RED, background: `linear-gradient(to right, ${RED} ${interference}%, rgba(42,61,28,0.8) ${interference}%)` }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3D4D2A' }}>0%</span>
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '15px', color: RED, fontWeight: 700 }}>{interference}%</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3D4D2A' }}>100%</span>
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, marginTop: '10px', lineHeight: 1.5 }}>
                            {interference === 0 ? 'All nodes active · No interference' :
                                interference < 40 ? 'Low interference · Network stable' :
                                    interference < 70 ? 'Moderate · Rerouting paths...' : '⚠ High interference · Emergency protocol'}
                        </p>
                    </div>

                    {/* Frequency Hopping */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Radio size={15} color={GOLD} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '1px' }}>FREQUENCY HOPPING</span>
                        </div>
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '22px', fontWeight: 700, color: GOLD, textShadow: `0 0 10px rgba(212,160,23,0.5)` }}>
                            {freq} MHz
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, marginTop: '5px' }}>FHSS · 125 hops/sec · AES keyed</p>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                            {[433.5, 433.8, 434.1, 434.4, 434.7].map((f) => {
                                const isActive = Math.abs(parseFloat(freq) - f) < 0.2;
                                return <div key={f} style={{
                                    flex: 1, height: '26px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
                                    background: isActive ? 'rgba(212,160,23,0.18)' : 'rgba(11,15,8,0.8)',
                                    border: `1px solid ${isActive ? 'rgba(212,160,23,0.45)' : BORDER}`,
                                    color: isActive ? GOLD : '#3D4D2A', transition: 'all 0.3s'
                                }}>{f}</div>;
                            })}
                        </div>
                    </div>

                    {/* Events */}
                    <div style={{ ...cardStyle, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <RefreshCw size={14} color={GREEN} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '1px' }}>NETWORK EVENTS</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {failed > 0 ? nodes.filter(n => n.failed).map((n) => (
                                <AnimatePresence key={n.id}>
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                        <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: RED, marginTop: '3px', flexShrink: 0 }} />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: RED, lineHeight: 1.4 }}>
                                            NODE-{String(n.id + 1).padStart(2, '0')} FAILED · PATH RECONFIGURED
                                        </span>
                                    </motion.div>
                                </AnimatePresence>
                            )) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: GREEN }}>All nodes operational · Mesh stable</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
