'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, CheckCircle, Leaf, Target, Server, Map, IndianRupee } from 'lucide-react';

const MILESTONES = [
    { year: '2024', label: 'Prototype', desc: 'ESP32 Silicon Lab — LoRa mesh validated', done: true },
    { year: '2025', label: 'Field Trials', desc: 'Battalion-level deployment — 120 nodes', done: true },
    { year: '2026', label: 'Corps Rollout', desc: 'Digital Twin integration — MoD certified', done: false },
    { year: '2027', label: 'Multi-Force Deployment', desc: 'Army + Border Force + CRPF integration', done: false },
    { year: '2028', label: 'Disaster Response', desc: 'NDRF mesh interoperability layer', done: false },
    { year: '2030', label: '🏔 Himalayas by 2030', desc: 'Hardware-Agnostic Code · All terrain covered', done: false },
];

const SDG = [
    {
        num: 'SDG 9', title: 'Resilient Infrastructure', color: '#FF9933',
        icon: Server, desc: 'Sovereign mesh network built on open hardware, zero foreign dependency, 99% uptime under adversarial conditions.',
    },
    {
        num: 'SDG 16', title: 'Peace & National Security', color: '#000080',
        icon: Target, desc: 'AES-256 encrypted comms, zero-trust nodes, AI threat isolation — preserving peace through unbreakable defense layers.',
    },
    {
        num: 'SDG 10', title: 'Reduced Inequalities', color: '#138808',
        icon: Globe, desc: 'Affordable ₹5k hardware vs ₹5L satellite radio — democratic access to tactical comms for all deployed units.',
    },
    {
        num: 'SDG 13', title: 'Climate Action', color: '#827751',
        icon: Leaf, desc: 'Ultra-low power ESP32 nodes on solar patch — net-zero tactical communications in field conditions.',
    },
];

const COMPARE = [
    { feature: 'Unit Cost', indra: '₹5,000', foreign: '₹5,00,000', indraWin: true },
    { feature: 'Latency', indra: '8–14 ms', foreign: '600–1200 ms', indraWin: true },
    { feature: 'Encryption', indra: 'AES-256 Hardware', foreign: 'Software (varies)', indraWin: true },
    { feature: 'Data Residency', indra: '100% India', foreign: 'Foreign Servers', indraWin: true },
    { feature: 'Offline Operation', indra: 'Full Mesh (No VSAT)', foreign: 'Requires Satellite', indraWin: true },
    { feature: 'AI Threat Response', indra: 'Real-time TFLite', foreign: 'None', indraWin: true },
    { feature: 'Supply Chain', indra: 'Make in India', foreign: 'Import Dependent', indraWin: true },
    { feature: 'Cost Saving', indra: '99% SAVINGS', foreign: '—', indraWin: true },
];

export default function StrategicIntelligencePage() {
    const [savings, setSavings] = useState(0);
    const [units, setUnits] = useState(0);
    const [nodesD, setNodesD] = useState(0);
    const [shown, setShown] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!shown) return;
        const t = setInterval(() => {
            setSavings(v => Math.min(v + 1, 99));
            setUnits(v => Math.min(v + 10, 5000));
            setNodesD(v => Math.min(v + 2, 120));
        }, 18);
        return () => clearInterval(t);
    }, [shown]);

    return (
        <div className="page-wrap">
            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Strategic Intelligence" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">STEP 5 · STRATEGIC INTELLIGENCE · MAKE IN INDIA</span>
                    </div>
                    <h1 className="page-hero__title">Strategic <span className="gold">Intelligence</span></h1>
                    <p className="page-hero__sub">Cost-Benefit Shield · Atmanirbhar Bharat · SDG 9 & 16 · Roadmap 2030</p>
                </div>
            </div>

            <div className="content-wrap" ref={ref}>

                {/* ── Cost-Benefit Shield ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    {/* Animated counter tiles */}
                    <motion.div className="panel-gold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <IndianRupee size={18} color="#D4A017" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '2px' }}>COST-BENEFIT SHIELD</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', textAlign: 'center' }}>
                            {[
                                { val: `${savings}%`, label: 'Cost Reduction', col: '#9ACD32', desc: 'vs Foreign Radio' },
                                { val: `₹${(5000).toLocaleString()}`, label: 'INDRA NET Unit', col: '#D4A017', desc: 'Per Node' },
                                { val: `₹5 Lakh`, label: 'Foreign Radio', col: '#FF3131', desc: 'Per Unit (Rejected)' },
                            ].map(c => (
                                <div key={c.label}>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '26px', fontWeight: 800, color: c.col, textShadow: `0 0 16px ${c.col}60`, marginBottom: '4px' }}>{c.val}</div>
                                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '14px', color: '#EDE8D0' }}>{c.label}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A' }}>{c.desc}</div>
                                </div>
                            ))}
                        </div>
                        {/* Animated progress bar for savings */}
                        <div style={{ marginTop: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A' }}>DIGITAL TWIN COST VALIDATION</span>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', fontWeight: 700, color: '#9ACD32' }}>{savings}% saved</span>
                            </div>
                            <div className="progress-track">
                                <motion.div className="progress-fill" initial={{ width: '0%' }} animate={{ width: `${savings}%` }} transition={{ duration: 1.8 }} style={{ background: 'linear-gradient(90deg, #4B5320, #9ACD32)' }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Atmanirbhar Bharat */}
                    <motion.div className="panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{ background: 'linear-gradient(135deg, rgba(0,0,128,0.08), rgba(19,136,8,0.06))', border: '1px solid rgba(19,136,8,0.25)' }}>
                        {/* India flag strip */}
                        <div style={{ display: 'flex', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '14px', gap: '1px' }}>
                            <div style={{ flex: 1, background: '#FF9933' }} />
                            <div style={{ flex: 1, background: '#FFFFFF' }} />
                            <div style={{ flex: 1, background: '#138808' }} />
                        </div>
                        <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '16px', color: '#FF9933', letterSpacing: '3px', marginBottom: '4px' }}>ATMANIRBHAR BHARAT</h3>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#138808', letterSpacing: '1.5px', marginBottom: '16px' }}>SOVEREIGN DEFENSE TECHNOLOGY</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                            {[
                                { val: `${nodesD}+`, label: 'Nodes Deployed', col: '#D4A017' },
                                { val: '100%', label: 'Data Residency', col: '#138808' },
                                { val: '₹0', label: 'Foreign Cloud', col: '#9ACD32' },
                                { val: `${units}+`, label: 'Unit Cost (₹)', col: '#FF9933' },
                            ].map(c => (
                                <div key={c.label} style={{ background: 'rgba(8,12,6,0.6)', borderRadius: '8px', padding: '10px 12px' }}>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: c.col }}>{c.val}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A', marginTop: '2px' }}>{c.label}</div>
                                </div>
                            ))}
                        </div>
                        {['No Foreign Cloud Dependency', 'MoD Compliant — Zero Import', '100% Hardware Agnostic Code', 'Open Hardware · Replicable'].map(p => (
                            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <CheckCircle size={12} color="#9ACD32" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A' }}>{p}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Comparison Table ── */}
                <motion.div className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <TrendingUp size={16} color="#D4A017" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '2px' }}>INDRA NET vs FOREIGN RADIO — COMPARISON</span>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 3px' }}>
                            <thead>
                                <tr>
                                    {['FEATURE', 'INDRA NET (INDIA)', 'FOREIGN SATELLITE RADIO'].map(h => (
                                        <th key={h} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4A6A2A', letterSpacing: '2px', padding: '8px 16px', textAlign: h === 'FEATURE' ? 'left' : 'center' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARE.map((row, i) => (
                                    <tr key={row.feature} style={{ background: i % 2 === 0 ? 'rgba(36,51,24,0.25)' : 'transparent' }}>
                                        <td style={{ padding: '8px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', borderRadius: '6px 0 0 6px' }}>{row.feature}</td>
                                        <td style={{ padding: '8px 16px', textAlign: 'center' }}>
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#9ACD32', fontWeight: 600 }}>{row.indra}</span>
                                            {' '}<CheckCircle size={11} color="#9ACD32" style={{ verticalAlign: 'middle' }} />
                                        </td>
                                        <td style={{ padding: '8px 16px', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#FF3131', borderRadius: '0 6px 6px 0' }}>{row.foreign}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* ── SDG Cards ── */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                        <Globe size={16} color="#D4A017" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '2px' }}>SDG ALIGNMENT — UN SUSTAINABLE DEVELOPMENT GOALS</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                        {SDG.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <motion.div key={s.num} className="panel" whileHover={{ scale: 1.03, y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                                        transitionDelay: `${i * 0.05}s`, padding: '20px', cursor: 'default',
                                        border: `1px solid ${s.color}30`, background: `linear-gradient(135deg, ${s.color}08, rgba(8,12,6,0.8))`
                                    }}>
                                    <Icon size={28} color={s.color} style={{ marginBottom: '10px' }} />
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 700, color: s.color, marginBottom: '4px', letterSpacing: '1px' }}>{s.num}</div>
                                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '15px', color: '#EDE8D0', marginBottom: '8px' }}>{s.title}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', lineHeight: 1.65 }}>{s.desc}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ── Regional Roadmap ── */}
                <motion.div className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <Map size={16} color="#D4A017" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '2px' }}>REGIONAL ROADMAP · HIMALAYAS BY 2030</span>
                        <div style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: '4px', background: 'rgba(75,83,32,0.2)', border: '1px solid rgba(75,83,32,0.5)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#9ACD32', letterSpacing: '1.5px' }}>HARDWARE-AGNOSTIC CODE</span>
                        </div>
                    </div>
                    <div style={{ position: 'relative', paddingLeft: '24px' }}>
                        {/* Timeline line */}
                        <div style={{ position: 'absolute', left: '11px', top: '16px', bottom: '16px', width: '2px', background: 'linear-gradient(180deg, #D4A017, #4B5320, #9ACD32)' }} />
                        {MILESTONES.map((m, i) => (
                            <motion.div key={m.year} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', marginBottom: '20px', position: 'relative' }}>
                                {/* dot */}
                                <div style={{
                                    position: 'absolute', left: '-18px', top: '3px',
                                    width: '14px', height: '14px', borderRadius: '50%',
                                    background: m.done ? '#9ACD32' : 'rgba(8,12,6,0.9)',
                                    border: `2px solid ${m.done ? '#9ACD32' : '#4B5320'}`,
                                    boxShadow: m.done ? '0 0 10px rgba(154,205,50,0.5)' : 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {m.done && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />}
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '12px', fontWeight: 700, color: m.done ? '#9ACD32' : '#D4A017' }}>{m.year}</span>
                                        <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '16px', color: '#EDE8D0' }}>{m.label}</span>
                                        {m.done && <span className="status-pill green" style={{ fontSize: '8px' }}>COMPLETE</span>}
                                    </div>
                                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', marginTop: '3px', lineHeight: 1.6 }}>{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
