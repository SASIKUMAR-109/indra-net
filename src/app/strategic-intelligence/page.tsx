'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Flag, CheckCircle, Target, Layers, Shield, Wifi } from 'lucide-react';

const GOLD = '#D4A017';
const GREEN = '#3DFF88';
const RED = '#FF4444';
const MUTED = '#7A8A6A';
const CREAM = '#EDE8D0';
const OLIVE = '#6B8C42';
const BG_CARD = 'rgba(20,31,15,0.9)';
const BORDER = 'rgba(74,106,42,0.35)';
const BORDER_G = 'rgba(212,160,23,0.25)';

const card = { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '22px' };
const label = { fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '0' };

const comparison = [
    { feature: 'Latency', indra: '12ms', sat: '600ms+', win: true },
    { feature: 'Setup Time', indra: '< 1 hour', sat: '3–6 months', win: true },
    { feature: 'Cost / node', indra: '< ₹15,000', sat: '₹2–5 Crore', win: true },
    { feature: 'Offline Operation', indra: '✅ Yes', sat: '❌ No', win: true },
    { feature: 'Jamming Resistance', indra: 'FHSS Active', sat: 'Vulnerable', win: true },
    { feature: 'Encryption', indra: 'AES-256 HW', sat: 'Software', win: true },
    { feature: 'Global Coverage', indra: '2–5 km mesh', sat: 'Global', win: false },
];

const roadmap = [
    { year: '2024', label: 'Proof of Concept', desc: 'Digital Twin simulation verified on ESP32 hardware', done: true },
    { year: '2025', label: 'Field Prototype', desc: 'Multi-node mesh test in controlled mountain terrain', done: true },
    { year: '2027', label: 'Pilot Deployment', desc: 'High-altitude range field trial – 50 nodes', done: false },
    { year: '2028', label: 'Defense Integration', desc: 'Army battalion secure communication backbone', done: false },
    { year: '2030', label: 'Himalayan Border Rollout', desc: 'Full-scale deployment along LAC & LOC', done: false },
];

const sdgs = [
    { num: '09', name: 'Industry, Innovation & Infrastructure', desc: 'Resilient communication for remote borders using low-cost indigenous mesh technology.', color: GOLD, icon: Layers },
    { num: '16', name: 'Peace, Justice & Strong Institutions', desc: 'Sovereign, tamper-proof communication to strengthen national defense institutions.', color: OLIVE, icon: Shield },
    { num: '17', name: 'Partnerships for the Goals', desc: 'Open interoperability with allied nation defense networks using open standards.', color: '#C5B358', icon: Globe },
];

export default function StrategicIntelligencePage() {
    return (
        <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '1600px' }}>
            {/* Header */}
            <div style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: OLIVE, letterSpacing: '3px' }}>STRATEGIC BRIEFING · CLASSIFIED INSIGHTS</span>
                </div>
                <h1 style={{ fontFamily: 'Orbitron, Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', color: CREAM, margin: 0 }}>
                    Strategic{' '}
                    <span style={{ color: GOLD, textShadow: `0 0 15px rgba(212,160,23,0.5)` }}>Intelligence</span>
                </h1>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: MUTED, marginTop: '8px' }}>
                    Government briefing dashboard · INDRA NET impact analysis
                </p>
            </div>

            {/* Cost Reduction Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ ...card, border: `1px solid ${BORDER_G}`, marginBottom: '22px', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', background: 'radial-gradient(ellipse at right, rgba(212,160,23,0.06), transparent)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp size={18} color={GOLD} />
                        <span style={label}>R&D Cost Optimization</span>
                    </div>
                    <h2 style={{ fontFamily: 'Orbitron, Montserrat, sans-serif', fontWeight: 700, fontSize: '24px', color: CREAM, margin: 0, lineHeight: 1.3 }}>
                        Digital Twin reduces R&D cost by{' '}
                        <span style={{ color: GREEN, textShadow: `0 0 10px rgba(61,255,136,0.4)` }}>70%</span>
                    </h2>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 500, color: MUTED, lineHeight: 1.7, maxWidth: '700px', margin: 0 }}>
                        Virtual simulation eliminates physical prototypes in early-stage development.
                        Each design iteration costs &lt;₹500 in compute vs ₹2–5 Lakh for hardware prototypes.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                        {[
                            { label: 'Traditional R&D', value: '₹2.5 Crore', pct: 100, color: RED },
                            { label: 'With Digital Twin', value: '₹75 Lakh', pct: 30, color: GREEN },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED }}>{item.label}</span>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '15px', fontWeight: 700, color: item.color }}>{item.value}</span>
                                </div>
                                <div style={{ height: '5px', background: BORDER, borderRadius: '3px', overflow: 'hidden' }}>
                                    <motion.div style={{ height: '100%', borderRadius: '3px', backgroundColor: item.color }}
                                        initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1.2, delay: 0.4 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Comparison + Roadmap */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '22px' }}>
                {/* Comparison */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Wifi size={16} color={GOLD} />
                        <span style={label}>INDRA NET vs Satellite</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingBottom: '10px', borderBottom: `1px solid ${BORDER}`, marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3D4D2A' }}>Feature</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GOLD, textAlign: 'center' }}>INDRA NET</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, textAlign: 'center' }}>Satellite</span>
                    </div>
                    {comparison.map((row, i) => (
                        <motion.div key={row.feature} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 0', borderBottom: `1px solid rgba(42,61,28,0.4)`, alignItems: 'center' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED }}>{row.feature}</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 600, color: row.win ? GREEN : GOLD, textAlign: 'center' }}>{row.indra}</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3D4D2A', textAlign: 'center' }}>{row.sat}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Roadmap */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={card}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Target size={16} color={GOLD} />
                        <span style={label}>Deployment Roadmap</span>
                    </div>
                    <div style={{ position: 'relative', paddingLeft: '24px' }}>
                        <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: `linear-gradient(180deg, ${GOLD}, ${BORDER})` }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {roadmap.map((item, i) => (
                                <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                    style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                                        backgroundColor: item.done ? GREEN : '#0B0F08',
                                        border: `2px solid ${item.done ? GREEN : BORDER_G}`,
                                        boxShadow: item.done ? `0 0 8px rgba(61,255,136,0.5)` : 'none'
                                    }} />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '13px', fontWeight: 700, color: GOLD }}>{item.year}</span>
                                            {item.done && <CheckCircle size={12} color={GREEN} />}
                                        </div>
                                        <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 600, color: CREAM, margin: 0 }}>{item.label}</p>
                                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, margin: '3px 0 0', lineHeight: 1.5 }}>{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* SDG Cards */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <Flag size={16} color={GREEN} />
                    <span style={label}>UN SDG Integration</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3D4D2A', marginLeft: 'auto' }}>INDRA NET · Aligned to Global Goals</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
                    {sdgs.map((sdg, i) => (
                        <motion.div key={sdg.num} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                            style={{ borderRadius: '8px', padding: '18px', border: `1px solid ${sdg.color}30`, background: `${sdg.color}08` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '42px', height: '42px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${sdg.color}15`, border: `1px solid ${sdg.color}30`, flexShrink: 0 }}>
                                    <sdg.icon size={20} color={sdg.color} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: MUTED }}>SDG</div>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '24px', fontWeight: 800, color: sdg.color, lineHeight: 1 }}>{sdg.num}</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '14px', fontWeight: 600, color: CREAM, marginBottom: '8px', lineHeight: 1.4 }}>{sdg.name}</p>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, lineHeight: 1.6, margin: 0 }}>{sdg.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
