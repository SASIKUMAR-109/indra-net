'use client';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Flag, CheckCircle, Target, Layers, Shield, Wifi } from 'lucide-react';

const comparison = [
    { feature: 'Latency', indra: '12ms', sat: '600ms+', win: true },
    { feature: 'Setup Time', indra: '< 1 hour', sat: '3–6 months', win: true },
    { feature: 'Cost / Node', indra: '< ₹15,000', sat: '₹2–5 Crore', win: true },
    { feature: 'Offline Operation', indra: '✅ Yes', sat: '❌ No', win: true },
    { feature: 'Jamming Resistance', indra: 'FHSS Active', sat: 'Vulnerable', win: true },
    { feature: 'Encryption', indra: 'AES-256 HW', sat: 'Software', win: true },
    { feature: 'Global Coverage', indra: '2–5 km mesh', sat: 'Global', win: false },
];

const roadmap = [
    { year: '2024', label: 'Proof of Concept', desc: 'Digital Twin simulation verified on ESP32 hardware', done: true },
    { year: '2025', label: 'Field Prototype', desc: 'Multi-node mesh test in controlled mountain terrain', done: true },
    { year: '2027', label: 'Pilot Deployment', desc: 'High-altitude field trial – 50 nodes', done: false },
    { year: '2028', label: 'Defense Integration', desc: 'Army battalion communication backbone', done: false },
    { year: '2030', label: 'Himalayan Border Rollout', desc: 'Full-scale deployment along LAC & LOC', done: false },
];

const sdgs = [
    { num: '09', name: 'Industry, Innovation & Infrastructure', desc: 'Resilient communication for remote borders using low-cost indigenous mesh technology.', color: '#D4A017', icon: Layers },
    { num: '16', name: 'Peace, Justice & Strong Institutions', desc: 'Sovereign, tamper-proof communication to strengthen national defense institutions.', color: '#6B8C42', icon: Shield },
    { num: '17', name: 'Partnerships for the Goals', desc: 'Open interoperability with allied nation defense networks using open standards.', color: '#C5B358', icon: Globe },
];

export default function StrategicIntelligencePage() {
    return (
        <div className="page-wrap">

            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Strategic Intelligence" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">STRATEGIC BRIEFING · CLASSIFIED INSIGHTS</span>
                    </div>
                    <h1 className="page-hero__title">Strategic <span className="gold">Intelligence</span></h1>
                    <p className="page-hero__sub">Government briefing dashboard · INDRA NET impact analysis</p>
                </div>
            </div>

            <div className="content-wrap">

                {/* Cost Reduction Hero Card */}
                <motion.div className="panel-gold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '22px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '35%', background: 'radial-gradient(ellipse at right, rgba(212,160,23,0.07), transparent)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <TrendingUp size={16} color="#D4A017" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>R&D COST OPTIMIZATION</span>
                    </div>
                    <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '26px', color: '#EDE8D0', marginBottom: '10px', lineHeight: 1.2 }}>
                        Digital Twin reduces R&D cost by{' '}
                        <span style={{ color: '#39F07A', textShadow: '0 0 14px rgba(57,240,122,0.4)' }}>70%</span>
                    </h2>
                    <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 500, color: '#7A8A6A', lineHeight: 1.7, maxWidth: '680px', marginBottom: '20px' }}>
                        Virtual simulation eliminates physical prototypes in early-stage development. Each design iteration costs &lt;₹500 in compute vs ₹2–5 Lakh for hardware prototypes.
                    </p>
                    <div style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { label: 'Traditional R&D', value: '₹2.5 Crore', pct: 100, cls: 'red' },
                            { label: 'With Digital Twin', value: '₹75 Lakh', pct: 30, cls: 'green' },
                        ].map(item => (
                            <div key={item.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#7A8A6A' }}>{item.label}</span>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', fontWeight: 700, color: item.cls === 'red' ? '#FF4444' : '#39F07A' }}>{item.value}</span>
                                </div>
                                <div className="progress-track" style={{ height: '6px' }}>
                                    <motion.div className={`progress-fill ${item.cls}`}
                                        style={{ height: '100%' }}
                                        initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1.2, delay: 0.4 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Comparison + Roadmap */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', marginBottom: '22px' }}>

                    {/* Comparison Table */}
                    <motion.div className="panel" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                            <Wifi size={14} color="#D4A017" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>INDRA NET VS SATELLITE</span>
                        </div>
                        {/* Header row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingBottom: '10px', borderBottom: '1px solid rgba(36,51,24,0.6)', marginBottom: '4px' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2A3D1A' }}>Feature</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#D4A017', textAlign: 'center' }}>INDRA NET</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4A5A3A', textAlign: 'center' }}>Satellite</span>
                        </div>
                        {comparison.map((row, i) => (
                            <motion.div key={row.feature} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 + i * 0.05 }}
                                style={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '9px 0', borderBottom: '1px solid rgba(36,51,24,0.35)', alignItems: 'center',
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(36,51,24,0.08)'
                                }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A' }}>{row.feature}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 600, color: row.win ? '#39F07A' : '#D4A017', textAlign: 'center' }}>{row.indra}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3D4D2A', textAlign: 'center' }}>{row.sat}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Roadmap */}
                    <motion.div className="panel" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Target size={14} color="#D4A017" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>DEPLOYMENT ROADMAP</span>
                        </div>
                        <div style={{ position: 'relative', paddingLeft: '28px' }}>
                            <div style={{ position: 'absolute', left: '9px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(180deg, #D4A017, rgba(36,51,24,0.4))' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                                {roadmap.map((item, i) => (
                                    <motion.div key={item.year} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                                        style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                        <div style={{
                                            width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0, marginTop: '3px',
                                            background: item.done ? '#39F07A' : '#080C06',
                                            border: `2px solid ${item.done ? '#39F07A' : 'rgba(212,160,23,0.35)'}`,
                                            boxShadow: item.done ? '0 0 10px rgba(57,240,122,0.5)' : 'none',
                                        }} />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 800, color: '#D4A017' }}>{item.year}</span>
                                                {item.done && <CheckCircle size={12} color="#39F07A" />}
                                            </div>
                                            <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 700, color: '#EDE8D0', margin: 0 }}>{item.label}</p>
                                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', margin: '3px 0 0', lineHeight: 1.55 }}>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* SDG Cards */}
                <motion.div className="panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                        <Flag size={14} color="#39F07A" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>UN SDG ALIGNMENT</span>
                        <div className="section-header__line" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>INDRA NET · Aligned to Global Goals</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {sdgs.map((sdg, i) => (
                            <motion.div key={sdg.num} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                                style={{ borderRadius: '8px', padding: '20px', border: `1px solid ${sdg.color}30`, background: `${sdg.color}09`, transition: 'all 0.22s', cursor: 'default' }}
                                whileHover={{ scale: 1.02, borderColor: `${sdg.color}55` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${sdg.color}14`, border: `1px solid ${sdg.color}30`, flexShrink: 0 }}>
                                        <sdg.icon size={20} color={sdg.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A5A3A', marginBottom: '2px' }}>SDG</div>
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '26px', fontWeight: 900, color: sdg.color, lineHeight: 1 }}>{sdg.num}</div>
                                    </div>
                                </div>
                                <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '14px', fontWeight: 700, color: '#EDE8D0', marginBottom: '8px', lineHeight: 1.35 }}>{sdg.name}</p>
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', lineHeight: 1.65, margin: 0 }}>{sdg.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
