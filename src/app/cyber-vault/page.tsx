'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Fingerprint, Zap, AlertOctagon } from 'lucide-react';

const GOLD = '#D4A017';
const GREEN = '#3DFF88';
const RED = '#FF4444';
const OLIVE = '#6B8C42';
const MUTED = '#7A8A6A';
const CREAM = '#EDE8D0';
const BG_CARD = 'rgba(20,31,15,0.9)';
const BORDER = 'rgba(74,106,42,0.35)';
const BORDER_G = 'rgba(212,160,23,0.25)';

const CHARS = '!@#$%^&*()_+[]{}|;:,.<>?ABCDEFabcdef0123456789';
const randLine = () => Array.from({ length: 52 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
const randHex = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');

const THREAT = [
    '> Unauthorized Hardware Signature Detected',
    '> HMAC Verification FAILED · Node-XX',
    '> Isolation Protocol Triggered',
    '> Blacklisting MAC: DE:AD:BE:EF:CA:FE',
    '> Remote Wipe Executed · Node-XX Memory Cleared',
    '> Threat Actor Profiled by AI Engine',
    '> Edge Inference: Anomaly Score 0.97',
    '> Threat Neutralized · System Secure',
    '> Resuming Normal Operations...',
];

const card = { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '20px' };
const label = { fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '12px' };

export default function CyberVaultPage() {
    const [cryptoLines, setCryptoLines] = useState<string[]>([]);
    const [decryptPct, setDecryptPct] = useState(0);
    const [auth, setAuth] = useState<'ok' | 'verifying'>('ok');
    const [injected, setInjected] = useState(false);
    const [threatLogs, setThreatLogs] = useState<string[]>([]);
    const [fp, setFp] = useState('');
    const [latency, setLatency] = useState<number[]>([]);
    const threatRef = useRef<HTMLDivElement>(null);

    useEffect(() => { setFp(randHex(32)); }, []);
    useEffect(() => {
        const iv = setInterval(() => setCryptoLines((p) => [...p, randLine()].slice(-16)), 200);
        return () => clearInterval(iv);
    }, []);
    useEffect(() => {
        const iv = setInterval(() => setLatency((p) => [...p, 10 + Math.random() * 8].slice(-22)), 500);
        return () => clearInterval(iv);
    }, []);
    useEffect(() => {
        if (threatRef.current) threatRef.current.scrollTop = threatRef.current.scrollHeight;
    }, [threatLogs]);

    const inject = () => {
        if (injected) return;
        setInjected(true); setAuth('verifying'); setThreatLogs([]); setDecryptPct(0);
        let i = 0;
        const iv = setInterval(() => { setThreatLogs((p) => [...p, THREAT[i]]); i++; if (i >= THREAT.length) clearInterval(iv); }, 700);
        setTimeout(() => setAuth('ok'), THREAT.length * 700 + 500);
        let p = 0;
        const div = setInterval(() => { p += Math.random() * 8; setDecryptPct(Math.min(p, 100)); if (p >= 100) clearInterval(div); }, 120);
    };

    const maxL = Math.max(...latency, 20);

    return (
        <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '1600px' }}>
            {/* Header */}
            <div style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: RED, boxShadow: `0 0 8px ${RED}` }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: OLIVE, letterSpacing: '3px' }}>ZERO-TRUST SECURITY · CYBER VAULT</span>
                </div>
                <h1 style={{ fontFamily: 'Orbitron, Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', color: CREAM, margin: 0 }}>
                    Cyber <span style={{ color: RED, textShadow: `0 0 15px rgba(255,68,68,0.5)` }}>Vault</span>
                </h1>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: MUTED, marginTop: '8px' }}>
                    Hardware fingerprinting · Zero-trust auth · Edge inference security
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '18px' }}>
                {/* Column 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Crypto stream */}
                    <div style={card}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: RED, boxShadow: `0 0 6px ${RED}` }} />
                            <p style={{ ...label, marginBottom: 0 }}>Encrypted Packet Stream</p>
                        </div>
                        <div style={{ height: '155px', overflow: 'hidden', position: 'relative' }}>
                            {cryptoLines.map((line, i) => (
                                <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '1px', lineHeight: '15px', color: `rgba(212,160,23,${0.12 + (i / cryptoLines.length) * 0.55})` }}>{line}</div>
                            ))}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '48px', background: `linear-gradient(transparent, rgba(20,31,15,0.98))` }} />
                        </div>
                    </div>

                    {/* Decryption */}
                    <div style={card}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Zap size={15} color={GOLD} />
                            <p style={{ ...label, marginBottom: 0 }}>Decryption Engine</p>
                        </div>
                        <div style={{ height: '5px', background: 'rgba(11,15,8,0.8)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                            <div style={{ height: '100%', width: `${decryptPct}%`, background: 'linear-gradient(90deg, #D4A017, #F0C040)', borderRadius: '3px', transition: 'width 0.2s', boxShadow: `0 0 8px ${GOLD}` }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED }}>AES-256-CBC</span>
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', color: GOLD, fontWeight: 700 }}>{Math.round(decryptPct)}%</span>
                        </div>
                    </div>

                    {/* Auth status */}
                    <div style={{ ...card, border: `1px solid ${auth === 'ok' ? BORDER : 'rgba(255,68,68,0.3)'}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            {auth === 'ok' ? <ShieldCheck size={17} color={GREEN} /> : <ShieldAlert size={17} color={RED} />}
                            <p style={{ ...label, marginBottom: 0 }}>Authentication Status</p>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div key={auth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {auth === 'ok' ? (
                                    <>
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 700, color: GREEN, textShadow: `0 0 10px rgba(61,255,136,0.4)` }}>AUTHENTICATED</div>
                                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, marginTop: '6px' }}>HMAC-SHA256 · Zero-Trust Policy · Session Active</p>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 700, color: RED, textShadow: `0 0 10px rgba(255,68,68,0.4)` }}>VERIFYING...</div>
                                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, marginTop: '6px' }}>Identity challenge issued to network...</p>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Column 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Inject */}
                    <div style={{ ...card, textAlign: 'center', padding: '26px', border: `1px solid rgba(255,68,68,0.25)` }}>
                        <AlertOctagon size={34} color={RED} style={{ margin: '0 auto 14px', display: 'block', filter: `drop-shadow(0 0 8px ${RED})` }} />
                        <h3 style={{ fontFamily: 'Rajdhani, Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: CREAM, marginBottom: '8px' }}>Adversarial Simulation</h3>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, marginBottom: '18px', lineHeight: 1.6 }}>
                            Inject a rogue node to test zero-trust isolation and hardware fingerprint verification
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={inject}
                            disabled={injected && threatLogs.length < THREAT.length}
                            style={{
                                width: '100%', padding: '13px', borderRadius: '7px', cursor: 'pointer',
                                fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '1px',
                                background: injected ? 'rgba(255,68,68,0.06)' : 'rgba(255,68,68,0.12)',
                                border: `1px solid rgba(255,68,68,0.35)`, color: RED,
                                boxShadow: injected ? `0 0 20px rgba(255,68,68,0.15)` : 'none',
                            }}
                        >
                            {injected && threatLogs.length < THREAT.length ? '⚠ ISOLATING THREAT...' : injected ? '✓ THREAT NEUTRALIZED' : '◈ INJECT MALICIOUS NODE'}
                        </motion.button>
                    </div>

                    {/* Threat terminal */}
                    <div style={{ ...card, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: RED }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#E8820C' }} />
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: GREEN }} />
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px' }}>SECURITY TERMINAL</span>
                        </div>
                        <div ref={threatRef} style={{ height: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {threatLogs.length === 0 ? (
                                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#3D4D2A' }}>Awaiting security events...</p>
                            ) : (
                                <AnimatePresence>
                                    {threatLogs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                                            style={{ display: 'flex', gap: '10px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                                            <span style={{ color: RED, flexShrink: 0 }}>{'>'}</span>
                                            <span style={{ color: log.includes('Neutralized') ? GREEN : log.includes('Resuming') ? CREAM : RED, lineHeight: 1.5 }}>{log}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: RED }}>$</span>
                                <div style={{ width: '9px', height: '17px', backgroundColor: RED, opacity: 0.8 }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Fingerprint */}
                    <div style={{ ...card, border: `1px solid ${BORDER_G}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Fingerprint size={17} color={GOLD} />
                            <p style={{ ...label, marginBottom: 0 }}>Hardware Fingerprint</p>
                        </div>
                        {[
                            { l: 'NODE UID', v: fp.slice(0, 16), ok: true },
                            { l: 'HMAC KEY', v: fp.slice(16, 28) + '...', ok: true },
                            { l: 'CHIP ID', v: 'ESP32-S3-' + fp.slice(0, 6), ok: true },
                            { l: 'ROGUE MAC', v: injected ? 'DE:AD:BE:EF:CA:FE' : '---', ok: !injected },
                        ].map((item) => (
                            <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED }}>{item.l}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: item.ok ? GOLD : RED }}>{item.v}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: injected ? RED : GREEN, boxShadow: `0 0 6px ${injected ? RED : GREEN}` }} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: injected ? RED : GREEN }}>
                                {injected ? 'ROGUE DEVICE IDENTIFIED' : 'ALL SIGNATURES VALID'}
                            </span>
                        </div>
                    </div>

                    {/* Latency chart */}
                    <div style={{ ...card, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Zap size={15} color={GREEN} />
                                <p style={{ ...label, marginBottom: 0 }}>Edge Inference Latency</p>
                            </div>
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: GREEN }}>~12ms</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '110px' }}>
                            {latency.map((val, i) => (
                                <motion.div key={i} style={{ flex: 1, borderRadius: '2px', minWidth: '6px', height: `${(val / maxL) * 100}%`, background: val > 16 ? 'rgba(255,68,68,0.6)' : 'rgba(61,255,136,0.5)' }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} />
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#3D4D2A' }}>0ms</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#3D4D2A' }}>TFLite Micro · Real-time</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#3D4D2A' }}>20ms</span>
                        </div>
                    </div>

                    {/* Active policies */}
                    <div style={card}>
                        <p style={label}>Active Security Policies</p>
                        {['Zero-Trust Architecture', 'Hardware-bound Keys', 'Mutual TLS Everywhere', 'Anomaly AI (TFLite)', 'Remote Wipe Protocol'].map((policy) => (
                            <div key={policy} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: `1px solid rgba(42,61,28,0.4)` }}>
                                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: GREEN, flexShrink: 0 }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, flex: 1 }}>{policy}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GREEN }}>ON</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
