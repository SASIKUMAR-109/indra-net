'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Fingerprint, Zap, AlertOctagon, Database, Eye } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef0123456789!@#$%';
const randRow = () => Array.from({ length: 52 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
const randHex = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
const HONEY_ROWS = () => `HONEYNODE_${randHex(4)} · PORT:${1000 + Math.floor(Math.random() * 9000)} · TTL:${Math.floor(Math.random() * 128)} · PAYLOAD:${randHex(8)}`;

const REPLAY_STAGES = [
    '> REPLAY ATTACK VECTOR DETECTED — Packet ID: 0x' + randHex(8),
    '> HMAC Signature REUSED — Timestamp Delta: +4823ms',
    '> ZERO-TRUST ENGINE: Replayed credentials REJECTED',
    '> Isolating rogue source: MAC DE:AD:BE:EF:CA:FE...',
    '> Initiating REMOTE-KILL-SWITCH protocol...',
    '> Node firmware BRICKED via OTA null-write',
    '🧱 NODE IS NOW A DIGITAL BRICK. THREAT ELIMINATED.',
    '✓ REPLAY ATTACK BLOCKED. Network secured.',
];

const ISOLATION_STEPS = [
    'ANOMALY DETECTED: Node-07 behavioral deviation',
    'Triggering automated threat isolation...',
    'Revoking Node-07 session tokens...',
    'Blacklisting hardware fingerprint...',
    'Redirecting traffic via alternate hops N03→N08→N14',
    'Notifying INDRA-AI for further analysis...',
    '✓ Node-07 ISOLATED. Mesh integrity: 96.4%',
];

const POLICIES = [
    'Zero-Trust Architecture',
    'Hardware-bound Keys (ATECC608A)',
    'Mutual TLS on every hop',
    'AI Anomaly Detection (TFLite)',
    'Remote Kill-Switch Protocol',
    '100% Data Residency (No foreign cloud)',
];

export default function CyberVaultPage() {
    const [cryptoLines, setCryptoLines] = useState<string[]>([]);
    const [honeyLines, setHoneyLines] = useState<string[]>([]);
    const [decryptPct, setDecryptPct] = useState(0);
    const [auth, setAuth] = useState<'ok' | 'verifying'>('ok');
    const [injected, setInjected] = useState(false);
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const [threatLogs, setThreatLogs] = useState<string[]>([]);
    const [isolationLogs, setIsolationLogs] = useState<string[]>([]);
    const [fingerprint] = useState(randHex(32));
    const [latency, setLatency] = useState<number[]>([]);
    const [replayShake, setReplayShake] = useState(false);
    const [honeyActive, setHoneyActive] = useState(true);
    const threatRef = useRef<HTMLDivElement>(null);
    const isolRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const iv = setInterval(() => setCryptoLines(p => [...p, randRow()].slice(-14)), 180);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        if (!honeyActive) return;
        const iv = setInterval(() => setHoneyLines(p => [...p, HONEY_ROWS()].slice(-10)), 700);
        return () => clearInterval(iv);
    }, [honeyActive]);

    useEffect(() => {
        const iv = setInterval(() => setLatency(p => [...p, 10 + Math.random() * 8].slice(-24)), 500);
        return () => clearInterval(iv);
    }, []);

    useEffect(() => {
        if (threatRef.current) threatRef.current.scrollTop = threatRef.current.scrollHeight;
    }, [threatLogs]);
    useEffect(() => {
        if (isolRef.current) isolRef.current.scrollTop = isolRef.current.scrollHeight;
    }, [isolationLogs]);

    const inject = () => {
        if (running || done) return;
        setInjected(true); setRunning(true); setThreatLogs([]); setIsolationLogs([]); setDecryptPct(0); setAuth('verifying');
        setReplayShake(true);
        setTimeout(() => setReplayShake(false), 800);

        let i = 0;
        const replayIv = setInterval(() => {
            setThreatLogs(p => [...p, REPLAY_STAGES[i]]); i++;
            if (i >= REPLAY_STAGES.length) { clearInterval(replayIv); }
        }, 620);

        let j = 0;
        const isoIv = setTimeout(() => {
            const iv2 = setInterval(() => {
                setIsolationLogs(p => [...p, ISOLATION_STEPS[j]]); j++;
                if (j >= ISOLATION_STEPS.length) { clearInterval(iv2); setRunning(false); setDone(true); setAuth('ok'); }
            }, 500);
        }, REPLAY_STAGES.length * 620 - 800);

        isoIv;

        let p = 0;
        const dv = setInterval(() => {
            p += Math.random() * 9; setDecryptPct(Math.min(p, 100));
            if (p >= 100) clearInterval(dv);
        }, 110);
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
                        <span className="hero-eyebrow-text">STEP 2 & 4 · ZERO-TRUST SECURITY · CYBER VAULT</span>
                    </div>
                    <h1 className="page-hero__title">Cyber <span className="red">Vault</span></h1>
                    <p className="page-hero__sub">Hardware fingerprinting · Honey-Pot Deception · Replay Attack Defense · Zero-Trust</p>
                </div>
            </div>

            <div className="content-wrap">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>

                    {/* ── COL 1 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* Honey-Pot Decoy Data Stream */}
                        <div className="panel-gold" style={{ border: '1px solid rgba(130,119,81,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <Database size={14} color="#827751" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#827751', letterSpacing: '2px' }}>
                                    HONEY-POT DECOY STREAM
                                </span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: honeyActive ? '#9ACD32' : '#FF3131', animation: 'pulseDot 1.5s infinite' }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: honeyActive ? '#9ACD32' : '#FF3131' }}>
                                        {honeyActive ? 'LIVE' : 'OFF'}
                                    </span>
                                </div>
                            </div>
                            <div style={{ height: '130px', overflow: 'hidden', position: 'relative', background: 'rgba(4,6,4,0.7)', borderRadius: '6px', padding: '8px' }}>
                                {honeyLines.map((line, i) => (
                                    <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', lineHeight: '16px', color: `rgba(130,119,81,${0.4 + (i / honeyLines.length) * 0.6})` }}>{line}</div>
                                ))}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(transparent, rgba(13,21,9,0.95))' }} />
                            </div>
                            <button onClick={() => setHoneyActive(h => !h)} style={{
                                marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px',
                                background: honeyActive ? 'rgba(255,49,49,0.08)' : 'rgba(154,205,50,0.08)',
                                border: `1px solid ${honeyActive ? 'rgba(255,49,49,0.3)' : 'rgba(154,205,50,0.3)'}`,
                                color: honeyActive ? '#FF3131' : '#9ACD32', cursor: 'pointer',
                                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '1.5px',
                            }}>
                                {honeyActive ? '◈ DISABLE HONEY-POT' : '◈ ENABLE HONEY-POT'}
                            </button>
                        </div>

                        {/* Encrypted Stream + Decryption */}
                        <div className="panel">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <Eye size={13} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>ENCRYPTED PACKET STREAM</span>
                            </div>
                            <div style={{ height: '100px', overflow: 'hidden' }}>
                                {cryptoLines.map((line, i) => (
                                    <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', lineHeight: '13px', color: `rgba(212,160,23,${0.1 + (i / cryptoLines.length) * 0.55})` }}>{line}</div>
                                ))}
                            </div>
                            <div style={{ marginTop: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A' }}>AES-256-CBC DECRYPTION</span>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '15px', color: '#D4A017', fontWeight: 700 }}>{Math.round(decryptPct)}%</span>
                                </div>
                                <div className="progress-track"><div className="progress-fill" style={{ width: `${decryptPct}%`, transition: 'width 0.2s' }} /></div>
                            </div>
                        </div>

                        {/* Auth Status */}
                        <div className="panel" style={{ borderColor: auth === 'ok' ? undefined : 'rgba(255,49,49,0.3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                {auth === 'ok' ? <ShieldCheck size={15} color="#9ACD32" /> : <ShieldAlert size={15} color="#FF3131" />}
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>ZERO-TRUST AUTH</span>
                            </div>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '17px', fontWeight: 700, color: auth === 'ok' ? '#9ACD32' : '#FF3131', textShadow: `0 0 12px ${auth === 'ok' ? 'rgba(154,205,50,0.4)' : 'rgba(255,49,49,0.4)'}` }}>
                                {auth === 'ok' ? 'AUTHENTICATED' : 'UNDER THREAT...'}
                            </div>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', marginTop: '6px' }}>
                                Hardware Fingerprint: ESP32-MAC_ID_SECURE
                            </p>
                            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {POLICIES.map(p => (
                                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#9ACD32', flexShrink: 0 }} />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A' }}>{p}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── COL 2 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* Inject Button */}
                        <motion.div
                            className="panel"
                            animate={replayShake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ textAlign: 'center', padding: '28px 20px', border: `1px solid rgba(255,49,49,${injected ? 0.5 : 0.22})`, background: injected ? 'rgba(255,49,49,0.04)' : undefined }}
                        >
                            <AlertOctagon size={42} color="#FF3131" style={{ margin: '0 auto 14px', display: 'block', filter: 'drop-shadow(0 0 12px rgba(255,49,49,0.5))' }} />
                            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '18px', color: '#EDE8D0', marginBottom: '8px' }}>
                                Adversarial Simulation
                            </h3>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', lineHeight: 1.65, marginBottom: '18px' }}>
                                Inject a rogue node to trigger replay attack defense, zero-trust isolation, and remote kill-switch
                            </p>
                            <AnimatePresence>
                                {replayShake && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{
                                            background: 'rgba(255,49,49,0.12)', border: '1px solid #FF3131', borderRadius: '6px', padding: '10px', marginBottom: '14px',
                                            fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#FF3131', textAlign: 'center', fontWeight: 700
                                        }}>
                                        ⚠ REPLAY ATTACK BLOCKED.<br />EXECUTING REMOTE-KILL-SWITCH.<br />NODE IS NOW A DIGITAL BRICK.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.button className="btn btn-danger" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                onClick={inject} disabled={running} style={{ width: '100%', opacity: running ? 0.7 : 1, padding: '14px' }}>
                                <AlertOctagon size={14} />
                                {running ? '⚠ ISOLATING THREAT...' : done ? '✓ THREAT NEUTRALIZED' : '◈ INJECT MALICIOUS NODE'}
                            </motion.button>
                        </motion.div>

                        {/* Replay Attack Terminal */}
                        <div className="terminal" style={{ flex: 1 }}>
                            <div className="terminal__topbar">
                                <div className="terminal__dots">
                                    <div className="terminal__dot" style={{ background: '#FF3131' }} />
                                    <div className="terminal__dot" style={{ background: '#E8820C' }} />
                                    <div className="terminal__dot" style={{ background: '#9ACD32' }} />
                                </div>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4A6A2A', letterSpacing: '1.5px', marginLeft: '4px' }}>REPLAY ATTACK LOG</span>
                            </div>
                            <div ref={threatRef} className="terminal__body" style={{ height: '220px' }}>
                                {threatLogs.length === 0 && <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#2A3D1A' }}>Awaiting attack simulation...</p>}
                                <AnimatePresence>
                                    {threatLogs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="terminal__line">
                                            <span className="terminal__timestamp" />
                                            <span style={{ color: log.startsWith('✓') ? '#9ACD32' : log.startsWith('🧱') ? '#FF9933' : '#FF3131', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>{'> '}{log}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <div className="terminal__line">
                                    <span className="terminal__timestamp" />
                                    <span style={{ color: '#FF3131', fontSize: '14px' }}>$</span>
                                    <div className="terminal__cursor" style={{ background: '#FF3131', boxShadow: '0 0 8px #FF3131', marginLeft: '8px' }} />
                                </div>
                            </div>
                        </div>

                        {/* Automated Threat Isolation */}
                        <div className="panel">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                <ShieldAlert size={13} color="#FF9933" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>AUTOMATED THREAT ISOLATION</span>
                            </div>
                            <div ref={isolRef} style={{ maxHeight: '140px', overflowY: 'auto' }}>
                                {isolationLogs.length === 0
                                    ? <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#2A3D1A' }}>Isolation system on standby...</p>
                                    : isolationLogs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '5px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: log.startsWith('✓') ? '#9ACD32' : '#FF9933', marginTop: '3px', flexShrink: 0 }} />
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: log.startsWith('✓') ? '#9ACD32' : '#EDE8D0', lineHeight: 1.5 }}>{log}</span>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* ── COL 3 ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                        {/* Hardware Fingerprint */}
                        <div className="panel-gold">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <Fingerprint size={15} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>HARDWARE FINGERPRINT</span>
                            </div>
                            {[
                                { l: 'NODE UID', v: fingerprint.slice(0, 16), ok: true },
                                { l: 'CHIP ID', v: 'ESP32-S3-' + fingerprint.slice(0, 6), ok: true },
                                { l: 'ATECC608A', v: fingerprint.slice(16, 28) + '...', ok: true },
                                { l: 'HMAC-SHA256', v: 'VERIFIED · ' + fingerprint.slice(0, 8), ok: true },
                                { l: 'ROGUE MAC', v: injected ? 'DE:AD:BE:EF:CA:FE' : 'NONE', ok: !injected },
                            ].map(item => (
                                <div className="data-row" key={item.l}>
                                    <span className="data-label">{item.l}</span>
                                    <span className="data-value" style={{ color: item.ok ? '#D4A017' : '#FF3131', fontSize: '11px' }}>{item.v}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(36,51,24,0.6)' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: injected ? '#FF3131' : '#9ACD32', boxShadow: `0 0 8px ${injected ? '#FF3131' : '#9ACD32'}`, animation: 'pulseDot 2s infinite' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: injected ? '#FF3131' : '#9ACD32' }}>
                                    {injected ? 'ROGUE DEVICE DETECTED' : 'ALL SIGNATURES VALID'}
                                </span>
                            </div>
                        </div>

                        {/* Latency Chart */}
                        <div className="panel" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Zap size={13} color="#9ACD32" />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1.5px' }}>EDGE INFERENCE LATENCY</span>
                                </div>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: '#9ACD32' }}>~12ms</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '110px' }}>
                                {latency.map((val, i) => (
                                    <motion.div key={i} style={{ flex: 1, borderRadius: '2px 2px 0 0', minWidth: '5px', height: `${(val / maxL) * 100}%`, background: val > 16 ? 'rgba(255,49,49,0.6)' : 'rgba(154,205,50,0.5)' }} initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: 1, originY: 1 }} />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>0ms</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>TFLite Micro · Real-time</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>20ms</span>
                            </div>
                        </div>

                        {/* India Flag Data Residency Badge */}
                        <div className="glass-panel-dark" style={{ padding: '16px', textAlign: 'center', border: '1px solid rgba(19,136,8,0.3)' }}>
                            <div style={{ display: 'flex', height: '4px', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px', gap: '1px' }}>
                                <div style={{ flex: 1, background: '#FF9933' }} />
                                <div style={{ flex: 1, background: '#FFFFFF' }} />
                                <div style={{ flex: 1, background: '#138808' }} />
                            </div>
                            <p style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 700, color: '#138808', letterSpacing: '2px', marginBottom: '4px' }}>100% DATA RESIDENCY</p>
                            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A' }}>NO FOREIGN CLOUD · ATMANIRBHAR BHARAT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
