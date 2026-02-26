'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Download, Zap, Thermometer, Signal, Battery } from 'lucide-react';

const GOLD = '#D4A017';
const OLIVE = '#6B8C42';
const MUTED = '#7A8A6A';
const GREEN = '#3DFF88';
const RED = '#FF4444';
const CREAM = '#EDE8D0';
const BG_CARD = 'rgba(20,31,15,0.9)';
const BORDER = 'rgba(74,106,42,0.35)';
const BORDER_G = 'rgba(212,160,23,0.25)';

const cardStyle = { background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '22px' };
const labelStyle = { fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px', textTransform: 'uppercase' as const, marginBottom: '14px' };

const pinMap = [
    { pin: 'GPIO 18 (SPI CLK)', fn: 'LoRa SX1278 · Clock', color: GOLD },
    { pin: 'GPIO 19 (SPI MISO)', fn: 'LoRa SX1278 · MISO', color: GOLD },
    { pin: 'GPIO 23 (SPI MOSI)', fn: 'LoRa SX1278 · MOSI', color: GOLD },
    { pin: 'GPIO 21 (I2C SDA)', fn: 'Health Sensor · SDA', color: GREEN },
    { pin: 'GPIO 22 (I2C SCL)', fn: 'Health Sensor · SCL', color: GREEN },
    { pin: 'GPIO 21 (Secure)', fn: 'Secure Trigger · HIGH', color: RED },
    { pin: 'GPIO 4 (TX)', fn: 'Mesh Beacon · TX', color: OLIVE },
    { pin: 'GPIO 5 (RX)', fn: 'Mesh Beacon · RX', color: OLIVE },
];

export default function SiliconLabPage() {
    const [signal, setSignal] = useState(-72);
    const [voltage, setVoltage] = useState(3.7);
    const [temp, setTemp] = useState(41.2);
    const [pps, setPps] = useState(128);
    const [uptime, setUptime] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [dlProgress, setDlProgress] = useState(0);

    useEffect(() => {
        const iv = setInterval(() => {
            setSignal((v) => Math.round((v + (Math.random() - 0.5) * 2) * 10) / 10);
            setVoltage((v) => Math.round((v + (Math.random() - 0.5) * 0.05) * 100) / 100);
            setTemp((v) => Math.round((v + (Math.random() - 0.5) * 0.8) * 10) / 10);
            setPps((v) => Math.round(v + (Math.random() - 0.5) * 8));
            setUptime((v) => v + 1);
        }, 1500);
        return () => clearInterval(iv);
    }, []);

    const handleDownload = () => {
        if (downloading) return;
        setDownloading(true); setDlProgress(0);
        const iv = setInterval(() => {
            setDlProgress((p) => {
                if (p >= 100) { clearInterval(iv); setDownloading(false); return 100; }
                return Math.min(p + Math.random() * 12, 100);
            });
        }, 200);
    };

    const fmt = (s: number) => {
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '1600px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: OLIVE, letterSpacing: '3px' }}>
                        HARDWARE SIMULATION LAB · ESP32 VIRTUAL
                    </span>
                </div>
                <h1 style={{ fontFamily: 'Orbitron, Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', color: CREAM, margin: 0 }}>
                    Silicon{' '}
                    <span style={{ color: GOLD, textShadow: `0 0 15px rgba(212,160,23,0.5)` }}>Lab</span>
                </h1>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: MUTED, marginTop: '8px' }}>
                    Virtual Node Hardware Simulation · INDRA Node V1.3
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Wokwi iframe */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                    style={{ ...cardStyle, border: `1px solid ${BORDER_G}`, height: '540px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: `1px solid ${BORDER}`, marginBottom: '0', flexShrink: 0 }}>
                        <Cpu size={16} color={GOLD} />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: MUTED, letterSpacing: '2px' }}>
                            WOKWI · ESP32 SIMULATION ENVIRONMENT
                        </span>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GREEN }}>RUNNING</span>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                        <iframe
                            src="https://wokwi.com/projects/new/esp32"
                            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                            title="Wokwi ESP32 Simulation"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                    </div>
                </motion.div>

                {/* Right panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Firmware spec */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                            <span style={{ ...labelStyle, marginBottom: 0 }}>Firmware Specification</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GOLD, background: 'rgba(212,160,23,0.1)', padding: '3px 10px', borderRadius: '4px', border: `1px solid rgba(212,160,23,0.25)` }}>
                                INDRA NODE V1.3
                            </span>
                        </div>
                        {[
                            ['MCU', 'ESP32-S3 Dual-Core 240MHz'],
                            ['Protocol', 'LoRa SX1278 · 433MHz Band'],
                            ['Encryption', 'AES-256 Hardware Accelerated'],
                            ['Mesh Stack', 'Zero-Trust TDMA Mesh'],
                            ['Firmware', 'INDRA Node V1.3 · Build 2025.02'],
                        ].map(([lbl, val]) => (
                            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${BORDER}` }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: MUTED }}>{lbl}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: CREAM }}>{val}</span>
                            </div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={handleDownload}
                            style={{
                                marginTop: '14px', width: '100%', padding: '11px',
                                borderRadius: '7px', fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '12px', fontWeight: 600, letterSpacing: '1px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                background: downloading ? 'rgba(42,61,28,0.5)' : 'rgba(212,160,23,0.1)',
                                border: `1px solid ${downloading ? BORDER : 'rgba(212,160,23,0.4)'}`,
                                color: downloading ? MUTED : GOLD,
                            }}
                        >
                            <Download size={15} />
                            {downloading ? `Downloading... ${Math.round(dlProgress)}%` : dlProgress >= 100 ? '✓ Firmware Downloaded' : 'Download Firmware'}
                        </motion.button>
                        {downloading && (
                            <div style={{ marginTop: '8px', height: '3px', background: 'rgba(42,61,28,0.8)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${dlProgress}%`, background: 'linear-gradient(90deg, #D4A017, #F0C040)', borderRadius: '2px', transition: 'width 0.2s' }} />
                            </div>
                        )}
                    </motion.div>

                    {/* Live telemetry */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={cardStyle}>
                        <p style={labelStyle}>Live Telemetry</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[
                                { label: 'Signal Strength', value: `${signal} dBm`, icon: Signal, color: GOLD, ok: signal > -80 },
                                { label: 'Supply Voltage', value: `${voltage.toFixed(2)} V`, icon: Battery, color: GREEN, ok: voltage > 3.4 },
                                { label: 'Temperature', value: `${temp.toFixed(1)} °C`, icon: Thermometer, color: temp > 60 ? RED : GOLD, ok: temp < 60 },
                                { label: 'Packet Rate', value: `${pps} pps`, icon: Zap, color: OLIVE, ok: true },
                            ].map((m) => (
                                <div key={m.label} style={{ background: 'rgba(11,15,8,0.8)', border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <m.icon size={13} color={m.color} />
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED }}>{m.label}</span>
                                    </div>
                                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', fontWeight: 700, color: m.color }}>{m.value}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: m.ok ? GREEN : RED, marginTop: '4px' }}>
                                        {m.ok ? '● NOMINAL' : '● WARNING'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED }}>SYSTEM UPTIME</span>
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '18px', color: GOLD, fontWeight: 700 }}>{fmt(uptime)}</span>
                        </div>
                    </motion.div>

                    {/* Pin mapping */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
                        <p style={labelStyle}>Virtual Pin Mapping</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {pinMap.map((p) => (
                                <div key={p.pin} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '5px 0', borderBottom: `1px solid rgba(42,61,28,0.4)` }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: p.color, flexShrink: 0, boxShadow: `0 0 5px ${p.color}` }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, width: '175px', flexShrink: 0 }}>{p.pin}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: p.color }}>{p.fn}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
