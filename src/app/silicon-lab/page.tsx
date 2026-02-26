'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Cpu, Download, Zap, Thermometer, Signal, Battery, CheckCircle, AlertTriangle, Activity } from 'lucide-react';

const ARTacticalOverlay = dynamic(() => import('@/components/ARTacticalOverlay'), { ssr: false });

/* ─────────────── Circular Gauge ─────────────── */
function CircularGauge({ value, max, label, unit, color, warnAt }: {
    value: number; max: number; label: string; unit: string; color: string; warnAt?: number;
}) {
    const pct = Math.min(value / max, 1);
    const R = 38, C = 2 * Math.PI * R;
    const activeColor = warnAt && value >= warnAt ? '#FF3131' : color;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="45" cy="45" r={R} fill="none" strokeWidth="8" stroke="rgba(36,51,24,0.8)" />
                    <motion.circle
                        cx="45" cy="45" r={R} fill="none" strokeWidth="8"
                        stroke={activeColor}
                        strokeLinecap="round"
                        strokeDasharray={C}
                        initial={{ strokeDashoffset: C }}
                        animate={{ strokeDashoffset: C - pct * C }}
                        transition={{ duration: 0.5 }}
                        style={{ filter: `drop-shadow(0 0 5px ${activeColor})` }}
                    />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 800, color: activeColor, lineHeight: 1 }}>
                        {typeof value === 'number' ? value.toFixed(value > 10 ? 0 : 1) : value}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#4A6A2A' }}>{unit}</span>
                </div>
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1px' }}>{label}</span>
        </div>
    );
}

const pinMap = [
    { pin: 'GPIO 18 (SPI CLK)', fn: 'LoRa SX1278 · Clock', color: '#D4A017' },
    { pin: 'GPIO 19 (SPI MISO)', fn: 'LoRa SX1278 · MISO', color: '#D4A017' },
    { pin: 'GPIO 23 (SPI MOSI)', fn: 'LoRa SX1278 · MOSI', color: '#D4A017' },
    { pin: 'GPIO 21 (I2C SDA)', fn: 'Health Sensor · SDA', color: '#9ACD32' },
    { pin: 'GPIO 22 (I2C SCL)', fn: 'Health Sensor · SCL', color: '#9ACD32' },
    { pin: 'GPIO 4 (Secure)', fn: 'Secure Trigger · HIGH', color: '#FF3131' },
    { pin: 'GPIO 5 (TX)', fn: 'Mesh Beacon · TX', color: '#00F2FF' },
    { pin: 'GPIO 15 (RX)', fn: 'Mesh Beacon · RX', color: '#00F2FF' },
];

export default function SiliconLabPage() {
    const [signal, setSignal] = useState(-72);
    const [voltage, setVoltage] = useState(3.7);
    const [temp, setTemp] = useState(37.8);
    const [humidity, setHumidity] = useState(62);
    const [pulse, setPulse] = useState(74);
    const [gforce, setGforce] = useState(1.0);
    const [uptime, setUptime] = useState(0);
    const [fallAlert, setFallAlert] = useState(false);
    const [fallLog, setFallLog] = useState<string[]>([]);
    const [downloading, setDownloading] = useState(false);
    const [dlProgress, setDlProgress] = useState(0);
    const [dlDone, setDlDone] = useState(false);

    useEffect(() => {
        const iv = setInterval(() => {
            setSignal(v => Math.round((v + (Math.random() - 0.5) * 2) * 10) / 10);
            setVoltage(v => Math.round((v + (Math.random() - 0.5) * 0.04) * 100) / 100);
            setTemp(v => Math.round((v + (Math.random() - 0.5) * 0.5) * 10) / 10);
            setHumidity(v => Math.min(100, Math.max(30, Math.round(v + (Math.random() - 0.5) * 2))));
            setPulse(v => Math.min(160, Math.max(40, Math.round(v + (Math.random() - 0.5) * 4))));
            setGforce(v => Math.round(Math.max(0.5, v + (Math.random() - 0.5) * 0.3) * 10) / 10);
            setUptime(v => v + 1);
        }, 1200);
        return () => clearInterval(iv);
    }, []);

    const triggerFallAlert = () => {
        const spike = 9.2 + Math.random();
        setGforce(spike);
        setFallAlert(true);
        setFallLog(p => [
            ...p,
            `> G-FORCE SPIKE: ${spike.toFixed(2)}g DETECTED`,
            '> MPU6050 THRESHOLD EXCEEDED — FALL CLASSIFIED',
            '> DISTRESS BEACON: Broadcasting on 433.5 MHz...',
            '> MEDEVAC ALERT: Node N04 — Coordinates locked',
            '> Adjacent Node N03 re-tasked as medical relay',
            '✓ ALERT DISPATCHED. Response time: 3.4s',
        ]);
        setTimeout(() => { setFallAlert(false); setGforce(1.0); }, 4000);
    };

    const handleDownload = () => {
        if (downloading || dlDone) return;
        setDownloading(true); setDlProgress(0);
        const iv = setInterval(() => {
            setDlProgress(p => {
                if (p >= 100) { clearInterval(iv); setDownloading(false); setDlDone(true); return 100; }
                return Math.min(p + Math.random() * 12, 100);
            });
        }, 160);
    };

    const fmt = (s: number) => {
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <div className="page-wrap">
            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Silicon Lab" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">STEP 1 · EDGE ACQUISITION · ESP32 WEARABLE</span>
                    </div>
                    <h1 className="page-hero__title">Silicon <span className="gold">Lab</span></h1>
                    <p className="page-hero__sub">Hardware sensor fusion · MPU6050 · Pulse · DHT11 · AR Tactical Overlay</p>
                </div>
            </div>

            <div className="content-wrap">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                    {/* LEFT COL */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Sensor Gauges */}
                        <motion.div className="panel-gold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>
                                    LIVE SENSOR GAUGES
                                </span>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px', fontWeight: 700, color: '#D4A017' }}>
                                    ⏱ {fmt(uptime)}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', justifyItems: 'center' }}>
                                <CircularGauge value={Math.abs(gforce)} max={12} label="G-FORCE" unit="g" color="#FF9933" warnAt={6} />
                                <CircularGauge value={pulse} max={200} label="PULSE" unit="BPM" color="#FF3131" warnAt={130} />
                                <CircularGauge value={temp} max={50} label="BODY TEMP" unit="°C" color="#D4A017" warnAt={38.5} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
                                <div style={{ background: 'rgba(8,12,6,0.8)', border: '1px solid rgba(36,51,24,0.6)', borderRadius: '8px', padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                                        <Activity size={12} color="#9ACD32" />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4A6A2A' }}>HUMIDITY</span>
                                    </div>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: '#9ACD32' }}>{humidity}%</span>
                                </div>
                                <div style={{ background: 'rgba(8,12,6,0.8)', border: '1px solid rgba(36,51,24,0.6)', borderRadius: '8px', padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                                        <Signal size={12} color="#D4A017" />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4A6A2A' }}>RF SIGNAL</span>
                                    </div>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: '#D4A017' }}>{signal} dBm</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* G-Force Fall Alert Button */}
                        <motion.div className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                            style={{ border: fallAlert ? '1px solid rgba(255,49,49,0.6)' : undefined, transition: 'border-color 0.3s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                                <AlertTriangle size={16} color="#FF3131" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>
                                    FALL DETECTION · MPU6050
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={triggerFallAlert}
                                disabled={fallAlert}
                                className="btn btn-danger"
                                style={{ width: '100%', fontSize: '13px', padding: '14px', letterSpacing: '2px' }}
                            >
                                {fallAlert
                                    ? <><AlertTriangle size={16} /> ⚠ G-FORCE FALL-IN DETECTED!</>
                                    : '◈ SIMULATE G-FORCE FALL-IN ALERT'}
                            </motion.button>

                            {/* Fall log */}
                            <AnimatePresence>
                                {fallLog.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        style={{ marginTop: '12px', background: 'rgba(4,6,4,0.9)', borderRadius: '6px', padding: '12px', maxHeight: '140px', overflowY: 'auto' }}>
                                        {fallLog.slice(-6).map((line, i) => (
                                            <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: line.startsWith('✓') ? '#9ACD32' : '#FF3131', lineHeight: 1.6 }}>{line}</div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pin Map */}
                        <motion.div className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
                                GPIO PIN MAPPING · ESP32-S3
                            </span>
                            {pinMap.map(p => (
                                <div key={p.pin} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0', borderBottom: '1px solid rgba(36,51,24,0.35)' }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}`, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', width: '155px', flexShrink: 0 }}>{p.pin}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: p.color }}>{p.fn}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COL */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* AR Tactical Overlay */}
                        <motion.div className="panel-gold" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00F2FF', boxShadow: '0 0 8px #00F2FF', animation: 'pulseDot 1.5s infinite' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>
                                    AR TACTICAL OVERLAY · CONE OF VISION
                                </span>
                            </div>
                            <ARTacticalOverlay />
                        </motion.div>

                        {/* Wokwi Simulator */}
                        <motion.div className="panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                            style={{ height: '340px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0, border: '1px solid rgba(36,51,24,0.6)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderBottom: '1px solid rgba(36,51,24,0.6)', background: 'rgba(13,21,9,0.6)', flexShrink: 0 }}>
                                <Cpu size={14} color="#D4A017" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '1.5px' }}>WOKWI · ESP32 SIMULATION</span>
                                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#9ACD32', boxShadow: '0 0 6px #9ACD32' }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#9ACD32' }}>RUNNING</span>
                                </div>
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <iframe src="https://wokwi.com/projects/new/esp32" style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} title="Wokwi ESP32" sandbox="allow-scripts allow-same-origin allow-forms" />
                            </div>
                        </motion.div>

                        {/* Firmware + Download */}
                        <motion.div className="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>FIRMWARE · INDRA NODE V1.3</span>
                                <span className="status-pill green" style={{ fontSize: '8px' }}>CERTIFIED</span>
                            </div>
                            {[
                                ['MCU', 'ESP32-S3 Dual-Core 240MHz'],
                                ['Protocol', 'LoRa SX1278 · 433MHz FHSS'],
                                ['Encryption', 'AES-256 Hardware'],
                                ['Battery', `${(voltage * 27).toFixed(0)}% (${voltage.toFixed(2)}V)`],
                            ].map(([lbl, val]) => (
                                <div className="data-row" key={lbl}>
                                    <span className="data-label">{lbl}</span>
                                    <span className="data-value">{val}</span>
                                </div>
                            ))}
                            <motion.button className="btn btn-gold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                onClick={handleDownload} style={{ marginTop: '12px', width: '100%' }}>
                                {dlDone ? <><CheckCircle size={14} /> Downloaded</> : downloading ? <><Download size={14} /> {Math.round(dlProgress)}%...</> : <><Download size={14} /> Download Firmware</>}
                            </motion.button>
                            {downloading && <div className="progress-track" style={{ marginTop: '8px' }}><div className="progress-fill" style={{ width: `${dlProgress}%`, transition: 'width 0.2s' }} /></div>}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
