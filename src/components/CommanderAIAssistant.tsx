'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronUp, ChevronDown, X, Send, CrosshairIcon, Wifi, Lock } from 'lucide-react';

const QUERIES = [
    { label: 'Show Injured Soldiers', icon: '🩺', cmd: 'QUERY --injured-soldiers' },
    { label: 'Simulate 50% Jamming', icon: '📡', cmd: 'SIM --jamming 50%' },
    { label: 'Find Least-Privilege Path', icon: '🔒', cmd: 'PATHFIND --zero-trust-route' },
];

const RESPONSES: Record<string, string[]> = {
    'QUERY --injured-soldiers': [
        '> Scanning all mesh nodes for biometric alerts...',
        '> Node N04 — Pulse: 42 BPM | G-Force: 8.9g | STATUS: FALLEN',
        '> Node N11 — Temp: 39.1°C | Pulse: 112 BPM | STATUS: ELEVATED',
        '> MEDEVAC ALERT: Triggering distress beacon on N04...',
        '> Nearest node N03 re-tasked as relay. ETA: 4 min.',
        '✓ MEDIC ALERT dispatched via mesh. 2 soldiers flagged.',
    ],
    'SIM --jamming 50%': [
        '> INDRA-AI: Initiating 50% interference simulation...',
        '> Nodes N02, N05, N06, N09, N12 entering degraded state...',
        '> FHSS Cognitive Engine: Hopping to 434.1 MHz...',
        '> Self-healing paths reconfigured: 7 alternate routes found.',
        '> Mesh integrity: 94.3% maintained under 50% jamming.',
        '✓ SOVEREIGN SHIELD ACTIVE. No data loss detected.',
    ],
    'PATHFIND --zero-trust-route': [
        '> Initiating Zero-Trust path analysis...',
        '> Evaluating hardware fingerprints for all hops...',
        '> N01 → N03 → N08 → N14: All nodes HMAC-verified ✓',
        '> Least privilege route: 3 hops | Latency: 11ms',
        '> AES-256 session key generated for each hop.',
        '✓ SECURE ROUTE LOCKED. Path isolates from N05 (UNTRUSTED).',
    ],
};

export default function CommanderAIAssistant() {
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const [typing, setTyping] = useState(false);
    const [activeCmd, setActiveCmd] = useState('');
    const [lineIdx, setLineIdx] = useState(0);

    useEffect(() => {
        if (!typing || !activeCmd) return;
        const lines = RESPONSES[activeCmd] ?? [];
        if (lineIdx >= lines.length) { setTyping(false); return; }
        const t = setTimeout(() => {
            setOutput(p => [...p, lines[lineIdx]]);
            setLineIdx(i => i + 1);
        }, 380);
        return () => clearTimeout(t);
    }, [typing, lineIdx, activeCmd]);

    const runQuery = (cmd: string) => {
        setOutput([]);
        setActiveCmd(cmd);
        setLineIdx(0);
        setTyping(true);
        setOpen(true);
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            width: open ? '420px' : 'auto',
        }}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        className="glass-panel-dark"
                        style={{
                            marginBottom: '12px',
                            border: '1px solid rgba(0,242,255,0.25)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px 16px',
                            borderBottom: '1px solid rgba(0,242,255,0.12)',
                            background: 'rgba(0,242,255,0.05)',
                        }}>
                            <CrosshairIcon size={14} color="#00F2FF" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00F2FF', letterSpacing: '2px', flex: 1 }}>
                                INDRA-AI ASSISTANT
                            </span>
                            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}>
                                <X size={14} color="#7A8A6A" />
                            </button>
                        </div>

                        {/* Quick Query Buttons */}
                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid rgba(36,51,24,0.6)' }}>
                            {QUERIES.map(q => (
                                <motion.button
                                    key={q.cmd}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => runQuery(q.cmd)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        background: 'rgba(0,242,255,0.06)',
                                        border: '1px solid rgba(0,242,255,0.18)',
                                        borderRadius: '6px',
                                        padding: '9px 14px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.18s',
                                    }}
                                >
                                    <span style={{ fontSize: '14px' }}>{q.icon}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00F2FF' }}>{q.label}</span>
                                    <Send size={11} color="#00F2FF" style={{ marginLeft: 'auto' }} />
                                </motion.button>
                            ))}
                        </div>

                        {/* Output terminal */}
                        <div style={{
                            padding: '14px 16px',
                            minHeight: '100px',
                            maxHeight: '220px',
                            overflowY: 'auto',
                            background: 'rgba(4,6,4,0.7)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            lineHeight: '1.7',
                        }}>
                            {output.length === 0 && (
                                <span style={{ color: '#2A3D1A' }}>Select a query above to run...</span>
                            )}
                            <AnimatePresence>
                                {output.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ color: line.startsWith('✓') ? '#9ACD32' : '#C0D0B0', marginBottom: '1px' }}
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {typing && (
                                <span style={{ color: '#00F2FF', animation: 'blink 1s step-end infinite' }}>▋</span>
                            )}
                        </div>

                        {/* Status row */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between',
                            padding: '8px 16px',
                            background: 'rgba(0,0,0,0.4)',
                            borderTop: '1px solid rgba(36,51,24,0.5)',
                        }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Wifi size={11} color="#9ACD32" />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#9ACD32' }}>MESH CONNECTED</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Lock size={11} color="#D4A017" />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#D4A017' }}>AES-256</span>
                                </div>
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>INDRA-AI v1.3</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '13px 22px',
                    background: 'linear-gradient(135deg, rgba(0,242,255,0.14), rgba(75,83,32,0.25))',
                    border: '1px solid rgba(0,242,255,0.35)',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 0 24px rgba(0,242,255,0.15), 0 4px 20px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    float: 'right',
                }}
            >
                <Bot size={18} color="#00F2FF" />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#00F2FF', letterSpacing: '1.5px', fontWeight: 600 }}>
                    INDRA-AI
                </span>
                {open
                    ? <ChevronDown size={14} color="#00F2FF" />
                    : <ChevronUp size={14} color="#00F2FF" />
                }
                {/* Pulsing indicator */}
                <div style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#9ACD32', boxShadow: '0 0 8px #9ACD32',
                    animation: 'pulseDot 2s infinite',
                }} />
            </motion.button>
        </div>
    );
}
