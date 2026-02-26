'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Wifi, AlertTriangle, BotIcon, Shield } from 'lucide-react';

const FREQS = ['433.1 MHz', '434.5 MHz', '436.0 MHz', '437.2 MHz', '438.7 MHz', '440.0 MHz'];

function mkNodes(count: number, W: number, H: number) {
    return Array.from({ length: count }, (_, i) => ({
        id: `N${String(i + 1).padStart(2, '0')}`,
        x: 80 + Math.random() * (W - 160),
        y: 80 + Math.random() * (H - 160),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        status: i === 5 ? 'attacked' : i === 8 || i === 11 ? 'jammed' : 'active',
        signal: 50 + Math.random() * 50,
        battery: 60 + Math.random() * 40,
    }));
}

function mkLinks(nodes: ReturnType<typeof mkNodes>) {
    const links: { a: number; b: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            if (Math.hypot(dx, dy) < 180) links.push({ a: i, b: j });
        }
    }
    return links;
}

const EVENTS = [
    { ts: '18:33:01', msg: 'Node N06 joined mesh', type: 'info' },
    { ts: '18:33:14', msg: 'FHSS hop → 433.1 MHz (jamming detected)', type: 'warn' },
    { ts: '18:34:02', msg: 'N06 ATTACKED — neighbours forming shield', type: 'danger' },
    { ts: '18:34:08', msg: 'AI PREDICTION: dead-zone in ~30s at N08', type: 'ai' },
    { ts: '18:34:41', msg: 'Relay hop N03→N10→N14 established', type: 'info' },
    { ts: '18:35:05', msg: 'N11 signal degraded — jammed zone', type: 'warn' },
];

export default function MeshTopologyPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const W = 700, H = 520;
    const [nodes, setNodes] = useState(() => mkNodes(14, W, H));
    const [links] = useState(() => mkLinks(nodes));
    const [interference, setInterference] = useState(0);
    const [activeFreq, setActiveFreq] = useState(0);
    const [tooltip, setTooltip] = useState<{ node: typeof nodes[0]; x: number; y: number } | null>(null);
    const [ghostPulse, setGhostPulse] = useState(0);
    const animRef = useRef<number>(0);
    const nodesRef = useRef(nodes);
    nodesRef.current = nodes;

    // Ghost node (AI prediction)
    const ghostNode = { x: W * 0.55, y: H * 0.38 };

    // Frequency hop every 4s
    useEffect(() => {
        const iv = setInterval(() => setActiveFreq(f => (f + 1) % FREQS.length), 4000);
        return () => clearInterval(iv);
    }, []);

    // Ghost pulse
    useEffect(() => {
        const iv = setInterval(() => setGhostPulse(p => (p + 1) % 100), 60);
        return () => clearInterval(iv);
    }, []);

    // Physics
    useEffect(() => {
        const iv = setInterval(() => {
            setNodes(prev => prev.map(n => {
                let { x, y, vx, vy, status } = n;
                const jam = (interference / 100) * 0.5;
                if (status === 'attacked') return n;
                vx += (Math.random() - 0.5) * 0.12;
                vy += (Math.random() - 0.5) * 0.12;
                // Randomly jam extra nodes
                const nowJammed = Math.random() < jam && status !== 'jammed';
                x = Math.max(50, Math.min(W - 50, x + vx));
                y = Math.max(50, Math.min(H - 50, y + vy));
                return { ...n, x, y, vx: vx * 0.97, vy: vy * 0.97, status: nowJammed ? 'jammed' : status };
            }));
        }, 40);
        return () => clearInterval(iv);
    }, [interference]);

    // Canvas draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            const ns = nodesRef.current;
            ctx.clearRect(0, 0, W, H);

            // Background grid
            ctx.strokeStyle = 'rgba(36,51,24,0.2)'; ctx.lineWidth = 1;
            for (let gx = 0; gx < W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
            for (let gy = 0; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }

            // Links
            links.forEach(({ a, b }) => {
                const na = ns[a], nb = ns[b];
                if (na.status === 'attacked' || nb.status === 'attacked') return;
                const jammed = na.status === 'jammed' || nb.status === 'jammed';
                ctx.beginPath();
                ctx.moveTo(na.x, na.y); ctx.lineTo(nb.x, nb.y);
                ctx.strokeStyle = jammed ? 'rgba(255,160,0,0.25)' : 'rgba(154,205,50,0.18)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            // Cyan shield around attacked node's neighbors
            const attacked = ns.find(n => n.status === 'attacked');
            if (attacked) {
                links.forEach(({ a, b }) => {
                    const na = ns[a], nb = ns[b];
                    const isNeighbor = (na.status === 'attacked' || nb.status === 'attacked') &&
                        (na.status !== 'attacked' || nb.status !== 'attacked');
                    if (!isNeighbor) return;
                    const neighbor = na.status === 'attacked' ? nb : na;
                    ctx.beginPath();
                    ctx.arc(neighbor.x, neighbor.y, 22, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(0,242,255,${0.3 + Math.sin(Date.now() / 400) * 0.2})`;
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                });
            }

            // Ghost node (AI prediction)
            const pulse = (ghostPulse / 100) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(ghostNode.x, ghostNode.y, 14 + Math.sin(pulse) * 4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,242,255,${0.45 + Math.sin(pulse) * 0.25})`;
            ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
            // Ghost inner
            ctx.beginPath();
            ctx.arc(ghostNode.x, ghostNode.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,242,255,0.3)'; ctx.fill();
            // Ghost label
            ctx.font = '10px JetBrains Mono'; ctx.fillStyle = '#00F2FF'; ctx.textAlign = 'center';
            ctx.fillText('AI GHOST', ghostNode.x, ghostNode.y + 28);

            // Nodes
            ns.forEach(n => {
                const color = n.status === 'attacked' ? '#666' : n.status === 'jammed' ? '#E8820C' : '#D4A017';
                const glow = n.status === 'attacked' ? 'rgba(100,100,100,0.3)' : n.status === 'jammed' ? 'rgba(232,130,12,0.4)' : 'rgba(212,160,23,0.4)';

                // Node glow
                const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
                grad.addColorStop(0, glow); grad.addColorStop(1, 'transparent');
                ctx.beginPath(); ctx.arc(n.x, n.y, 22, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();

                // Node circle
                ctx.beginPath(); ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
                ctx.fillStyle = `${color}22`; ctx.fill();
                ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

                // Inner dot
                ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = color; ctx.fill();

                // Label
                ctx.font = 'bold 10px JetBrains Mono'; ctx.fillStyle = color; ctx.textAlign = 'center';
                ctx.fillText(n.id, n.x, n.y - 18);
            });

            animRef.current = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animRef.current);
    }, [links, ghostPulse]);

    const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const mx = (e.clientX - rect.left) * (W / rect.width);
        const my = (e.clientY - rect.top) * (H / rect.height);
        const hit = nodesRef.current.find(n => Math.hypot(n.x - mx, n.y - my) < 14);
        setTooltip(hit ? { node: hit, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
    }, []);

    const activeCount = nodes.filter(n => n.status === 'active').length;
    const jammedCount = nodes.filter(n => n.status === 'jammed').length;
    const attackedCount = nodes.filter(n => n.status === 'attacked').length;

    return (
        <div className="page-wrap">
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Mesh Topology" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">STEP 3 · MESH TOPOLOGY ENGINE · SOVEREIGN SHIELD</span>
                    </div>
                    <h1 className="page-hero__title">Mesh <span className="gold">Topology</span></h1>
                    <p className="page-hero__sub">Soldier mesh · Ghost node AI prediction · Attack isolation · Cyan Shield</p>
                </div>
            </div>

            <div className="content-wrap">
                {/* KPI Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
                    {[
                        { label: 'ACTIVE NODES', val: activeCount, col: '#9ACD32' },
                        { label: 'JAMMED ZONES', val: jammedCount, col: '#E8820C' },
                        { label: 'ATTACKED', val: attackedCount, col: '#FF3131' },
                        { label: 'LINKS ACTIVE', val: links.filter(({ a, b }) => nodes[a].status !== 'attacked' && nodes[b].status !== 'attacked').length, col: '#D4A017' },
                    ].map(k => (
                        <div key={k.label} className="kpi-card" style={{ borderColor: `${k.col}30` }}>
                            <div className="kpi-value" style={{ color: k.col, fontSize: '2rem' }}>{k.val}</div>
                            <div className="kpi-label">{k.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '18px' }}>
                    {/* Canvas */}
                    <div className="panel" style={{ position: 'relative', padding: '0', overflow: 'hidden' }}>
                        <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', height: 'auto', cursor: 'crosshair', display: 'block' }} onClick={handleCanvasClick} />

                        {/* AI Ghost Popup */}
                        <div className="glass-panel-cyan" style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                            <BotIcon size={13} color="#00F2FF" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00F2FF' }}>
                                AI PREDICTION: Possible dead-zone in ~30s · Suggesting relay hop
                            </span>
                        </div>

                        {/* Node Tooltip */}
                        <AnimatePresence>
                            {tooltip && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    className="glass-panel-dark" style={{ position: 'absolute', left: tooltip.x + 12, top: tooltip.y - 10, padding: '10px 14px', pointerEvents: 'none', minWidth: '160px' }}>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', color: '#D4A017', marginBottom: '6px' }}>{tooltip.node.id}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', lineHeight: 1.7 }}>
                                        <div>Status: <span style={{ color: tooltip.node.status === 'active' ? '#9ACD32' : '#FF3131' }}>{tooltip.node.status.toUpperCase()}</span></div>
                                        <div>Signal: {tooltip.node.signal.toFixed(0)} dBm</div>
                                        <div>Battery: {tooltip.node.battery.toFixed(0)}%</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* Legend */}
                        <div className="panel">
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>LEGEND</span>
                            {[
                                { color: '#D4A017', label: 'Active Node (Gold)' },
                                { color: '#E8820C', label: 'Jammed Zone (Amber)' },
                                { color: '#666666', label: 'Attacked (Isolated)' },
                                { color: '#00F2FF', label: 'Cyan Shield (Defense)' },
                                { color: '#00F2FF', label: 'AI Ghost Node (Prediction)', dashed: true },
                            ].map(l => (
                                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '7px' }}>
                                    <svg width="20" height="14">
                                        {l.dashed
                                            ? <circle cx="10" cy="7" r="5" stroke={l.color} strokeWidth="1.5" strokeDasharray="3,2" fill="none" />
                                            : <circle cx="10" cy="7" r="5" fill={l.color + '30'} stroke={l.color} strokeWidth="1.5" />}
                                    </svg>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A' }}>{l.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Interference Slider */}
                        <div className="panel">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                                    <Wifi size={13} color="#E8820C" />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>JAMMING LEVEL</span>
                                </div>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 700, color: '#E8820C' }}>{interference}%</span>
                            </div>
                            <input type="range" min={0} max={80} value={interference} onChange={e => setInterference(+e.target.value)}
                                style={{ width: '100%', accentColor: '#E8820C' }} />
                        </div>

                        {/* Frequency Hopping */}
                        <div className="panel">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Shield size={13} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>FHSS · FREQUENCY HOP</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {FREQS.map((f, i) => (
                                    <div key={f} style={{
                                        padding: '6px 10px', borderRadius: '6px', fontSize: '10px',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        background: i === activeFreq ? 'rgba(154,205,50,0.12)' : 'rgba(36,51,24,0.4)',
                                        border: `1px solid ${i === activeFreq ? 'rgba(154,205,50,0.5)' : 'rgba(36,51,24,0.5)'}`,
                                        color: i === activeFreq ? '#9ACD32' : '#4A6A2A',
                                        boxShadow: i === activeFreq ? '0 0 10px rgba(154,205,50,0.25)' : 'none',
                                        transition: 'all 0.3s',
                                    }}>
                                        {f} {i === activeFreq && '●'}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Events Log */}
                        <div className="panel" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <AlertTriangle size={12} color="#E8820C" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>NETWORK EVENTS</span>
                            </div>
                            {EVENTS.map((ev, i) => {
                                const col = ev.type === 'danger' ? '#FF3131' : ev.type === 'ai' ? '#00F2FF' : ev.type === 'warn' ? '#E8820C' : '#9ACD32';
                                return (
                                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A', flexShrink: 0, paddingTop: '1px' }}>{ev.ts}</span>
                                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: col, marginTop: '4px', flexShrink: 0 }} />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: col, lineHeight: 1.5 }}>{ev.msg}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
