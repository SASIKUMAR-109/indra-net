'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Fingerprint, Zap, AlertOctagon } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef0123456789!@#$%^&*';
const randRow = () => Array.from({ length: 54 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
const randHex = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');

const THREAT_EVENTS = [
    'UNAUTHORIZED Hardware Signature Detected',
    'HMAC Verification FAILED · Node-XX',
    'Isolation Protocol Triggered',
    'Blacklisting MAC: DE:AD:BE:EF:CA:FE',
    'Remote Wipe Executed · Memory Cleared',
    'Threat Actor Profiled by AI Engine',
    'Edge Inference: Anomaly Score 0.97',
    '✓ Threat Neutralized · System Secure',
    '✓ Resuming Normal Operations...',
];

const POLICIES = [
    'Zero-Trust Architecture',
    'Hardware-bound Keys',
    'Mutual TLS Everywhere',
    'AI Anomaly Detection (TFLite)',
    'Remote Wipe Protocol',
];

export default function CyberVaultPage() {
    const [cryptoLines, setCryptoLines] = useState<string[]>([]);
    const [decryptPct, setDecryptPct] = useState(0);
    const [auth, setAuth] = useState<'ok' | 'verifying'>('ok');
    const [injected, setInjected] = useState(false);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const [threatLogs, setThreatLogs] = useState<string[]>([]);
    const [fingerprint, setFingerprint] = useState('');
    const [latency, setLatency] = useState<number[]>([]);
    const threatRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setFingerprint(randHex(32)); }, []);

    useEffect(() => {
        const iv = setInterval(() => setCryptoLines(p => [...p, randRow()].slice(-14)), 180);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        const iv = setInterval(() => setLatency(p => [...p, 10 + Math.random() * 8].slice(-24)), 500);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        if (threatRef.current) threatRef.current.scrollTop = threatRef.current.scrollHeight;
    }, [threatLogs]);

    const inject = () => {
        if (running || done) return;
        setInjected(true); setRunning(true); setThreatLogs([]); setDecryptPct(0); setAuth('verifying');
        let i = 0;
        const iv = setInterval(() => {
            setThreatLogs(p => [...p, THREAT_EVENTS[i]]); i++;
            if (i >= THREAT_EVENTS.length) { clearInterval(iv); setRunning(false); setDone(true); setAuth('ok'); }
        }, 680);
        let p = 0;
        const dv = setInterval(() => {
            p += Math.random() * 8; setDecryptPct(Math.min(p, 100));
            if (p >= 100) clearInterval(dv);
        }, 120);
    };

    const maxL = Math.max(...latency, 20);

    return (
        <div className="page-wrap">

            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Cyber Vault" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot red" />
                        <span className="hero-eyebrow-text">ZERO-TRUST SECURITY · CYBER VAULT</span>
                    </div>
                    <h1 className="page-hero__title">Cyber <span className="red">Vault</span></h1>
                    <p className="page-hero__sub">Hardware fingerprinting · Zero-trust auth · Edge inference security</p>
                </div>
            </div>

            <div className="content-wrap">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>

                    {/* ── Column 1 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Crypto Stream */}
                        <div className="panel-gold">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF4444', boxShadow: '0 0 8px #FF4444', animation: 'pulseDot 1.5s infinite' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>ENCRYPTED PACKET STREAM</span>
                            </div>
                            <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                                {cryptoLines.map((line, i) => (
                                    <div key={i} style={{
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '10px', lineHeight: '15px', letterSpacing: '1px',
                                        color: `rgba(212,160,23,${0.1 + (i / cryptoLines.length) * 0.6})`,
                                    }}>{line}</div>
                                ))}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px', background: 'linear-gradient(transparent, rgba(17,26,12,0.98))' }} />
                            </div>
                        </div>

                        {/* Decryption Engine */}
                        <div className="panel">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Zap size={14} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>DECRYPTION ENGINE</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${decryptPct}%`, transition: 'width 0.2s' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A' }}>AES-256-CBC</span>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', color: '#D4A017', fontWeight: 700 }}>{Math.round(decryptPct)}%</span>
                            </div>
                        </div>

                        {/* Auth Status */}
                        <div className="panel" style={{ borderColor: auth === 'ok' ? undefined : 'rgba(255,68,68,0.3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                {auth === 'ok' ? <ShieldCheck size={16} color="#39F07A" /> : <ShieldAlert size={16} color="#FF4444" />}
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>AUTH STATUS</span>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div key={auth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: auth === 'ok' ? '#39F07A' : '#FF4444', textShadow: `0 0 14px ${auth === 'ok' ? 'rgba(57,240,122,0.4)' : 'rgba(255,68,68,0.4)'}` }}>
                                        {auth === 'ok' ? 'AUTHENTICATED' : 'VERIFYING...'}
                                    </div>
                                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', marginTop: '6px' }}>
                                        {auth === 'ok' ? 'HMAC-SHA256 · Zero-Trust · Session Active' : 'Identity challenge issued to network...'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Policies */}
                        <div className="panel">
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SECURITY POLICIES</span>
                            {POLICIES.map(policy => (
                                <div key={policy} className="data-row" style={{ padding: '8px 0' }}>
                                    <span className="data-label">{policy}</span>
                                    <span className="status-pill green" style={{ fontSize: '8px', padding: '2px 8px' }}>ON</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Column 2 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Inject Button */}
                        <div className="panel" style={{ textAlign: 'center', padding: '30px 22px', border: '1px solid rgba(255,68,68,0.22)' }}>
                            <AlertOctagon size={38} color="#FF4444" style={{ margin: '0 auto 16px', display: 'block', filter: 'drop-shadow(0 0 10px rgba(255,68,68,0.4))' }} />
                            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '19px', color: '#EDE8D0', marginBottom: '10px' }}>
                                Adversarial Simulation
                            </h3>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', lineHeight: 1.65, marginBottom: '20px' }}>
                                Inject a rogue node to test zero-trust isolation and hardware fingerprint verification
                            </p>
                            <motion.button
                                className="btn btn-danger"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={inject}
                                disabled={running}
                                style={{ width: '100%', boxShadow: done ? '0 0 24px rgba(255,68,68,0.15)' : 'none', opacity: running ? 0.7 : 1 }}
                            >
                                <AlertOctagon size={14} />
                                {running ? '⚠ ISOLATING THREAT...'
                                    : done ? '✓ THREAT NEUTRALIZED'
                                        : '◈ INJECT MALICIOUS NODE'}
                            </motion.button>
                        </div>

                        {/* Threat Terminal */}
                        <div className="terminal" style={{ flex: 1 }}>
                            <div className="terminal__topbar">
                                <div className="terminal__dots">
                                    <div className="terminal__dot" style={{ background: '#FF4444' }} />
                                    <div className="terminal__dot" style={{ background: '#E8820C' }} />
                                    <div className="terminal__dot" style={{ background: '#39F07A' }} />
                                </div>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4A6A2A', letterSpacing: '2px', marginLeft: '4px' }}>SECURITY TERMINAL</span>
                            </div>
                            <div ref={threatRef} className="terminal__body" style={{ height: '280px' }}>
                                {threatLogs.length === 0 && (
                                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#2A3D1A' }}>
                                        Awaiting security events...
                                    </p>
                                )}
                                <AnimatePresence>
                                    {threatLogs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="terminal__line">
                                            <span className="terminal__timestamp" />
                                            <span style={{ color: log.startsWith('✓') ? '#39F07A' : '#FF4444', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                                                {'> '}{log}
                                            </span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div className="terminal__line">
                                    <span className="terminal__timestamp" />
                                    <span style={{ color: '#FF4444', fontSize: '14px' }}>$</span>
                                    <div className="terminal__cursor" style={{ background: '#FF4444', boxShadow: '0 0 8px #FF4444', marginLeft: '8px' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Column 3 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Fingerprint */}
                        <div className="panel-gold">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                <Fingerprint size={16} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>HARDWARE FINGERPRINT</span>
                            </div>
                            {[
                                { l: 'NODE UID', v: fingerprint.slice(0, 16), ok: true },
                                { l: 'HMAC KEY', v: fingerprint.slice(16, 28) + '...', ok: true },
                                { l: 'CHIP ID', v: 'ESP32-S3-' + fingerprint.slice(0, 6), ok: true },
                                { l: 'ROGUE MAC', v: injected ? 'DE:AD:BE:EF:CA:FE' : '---', ok: !injected },
                            ].map(item => (
                                <div className="data-row" key={item.l}>
                                    <span className="data-label">{item.l}</span>
                                    <span className="data-value" style={{ color: item.ok ? '#D4A017' : '#FF4444', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{item.v}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(36,51,24,0.6)' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: injected ? '#FF4444' : '#39F07A', boxShadow: `0 0 8px ${injected ? '#FF4444' : '#39F07A'}` }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: injected ? '#FF4444' : '#39F07A' }}>
                                    {injected ? 'ROGUE DEVICE IDENTIFIED' : 'ALL SIGNATURES VALID'}
                                </span>
                            </div>
                        </div>

                        {/* Latency Chart */}
                        <div className="panel" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Zap size={14} color="#39F07A" />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>EDGE INFERENCE LATENCY</span>
                                </div>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: '#39F07A' }}>~12ms</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '120px' }}>
                                {latency.map((val, i) => (
                                    <motion.div key={i}
                                        style={{ flex: 1, borderRadius: '2px 2px 0 0', minWidth: '5px', height: `${(val / maxL) * 100}%`, background: val > 16 ? 'rgba(255,68,68,0.6)' : 'rgba(57,240,122,0.5)' }}
                                        initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1, originY: 1 }}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>0ms</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>TFLite Micro · Real-time</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>20ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
