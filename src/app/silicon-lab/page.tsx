'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Download, Zap, Thermometer, Signal, Battery, CheckCircle } from 'lucide-react';

export default function SiliconLabPage() {
    const [signal, setSignal] = useState(-72);
    const [voltage, setVoltage] = useState(3.7);
    const [temp, setTemp] = useState(41.2);
    const [pps, setPps] = useState(128);
    const [uptime, setUptime] = useState(0);
    const [downloading, setDownloading] = useState(false);
    const [dlProgress, setDlProgress] = useState(0);
    const [dlDone, setDlDone] = useState(false);

    useEffect(() => {
        const iv = setInterval(() => {
            setSignal(v => Math.round((v + (Math.random() - 0.5) * 2) * 10) / 10);
            setVoltage(v => Math.round((v + (Math.random() - 0.5) * 0.05) * 100) / 100);
            setTemp(v => Math.round((v + (Math.random() - 0.5) * 0.8) * 10) / 10);
            setPps(v => Math.round(v + (Math.random() - 0.5) * 8));
            setUptime(v => v + 1);
        }, 1500);
        return () => clearInterval(iv);
    }, []);

    const handleDownload = () => {
        if (downloading || dlDone) return;
        setDownloading(true); setDlProgress(0);
        const iv = setInterval(() => {
            setDlProgress(p => {
                if (p >= 100) { clearInterval(iv); setDownloading(false); setDlDone(true); return 100; }
                return Math.min(p + Math.random() * 12, 100);
            });
        }, 180);
    };

    const fmt = (s: number) => {
        const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const telemetry = [
        { label: 'Signal', value: `${signal} dBm`, icon: Signal, color: '#D4A017', ok: signal > -80 },
        { label: 'Voltage', value: `${voltage.toFixed(2)} V`, icon: Battery, color: '#39F07A', ok: voltage > 3.4 },
        { label: 'Temperature', value: `${temp.toFixed(1)} °C`, icon: Thermometer, color: temp > 60 ? '#FF4444' : '#D4A017', ok: temp < 60 },
        { label: 'Packet Rate', value: `${pps} pps`, icon: Zap, color: '#8DB05A', ok: true },
    ];

    const pinMap = [
        { pin: 'GPIO 18 (SPI CLK)', fn: 'LoRa SX1278 · Clock', color: '#D4A017' },
        { pin: 'GPIO 19 (SPI MISO)', fn: 'LoRa SX1278 · MISO', color: '#D4A017' },
        { pin: 'GPIO 23 (SPI MOSI)', fn: 'LoRa SX1278 · MOSI', color: '#D4A017' },
        { pin: 'GPIO 21 (I2C SDA)', fn: 'Health Sensor · SDA', color: '#39F07A' },
        { pin: 'GPIO 22 (I2C SCL)', fn: 'Health Sensor · SCL', color: '#39F07A' },
        { pin: 'GPIO 21 (Secure)', fn: 'Secure Trigger · HIGH', color: '#FF4444' },
        { pin: 'GPIO 4 (TX)', fn: 'Mesh Beacon · TX', color: '#8DB05A' },
        { pin: 'GPIO 5 (RX)', fn: 'Mesh Beacon · RX', color: '#8DB05A' },
    ];

    return (
        <div className="page-wrap">

            {/* Hero */}
            <div className="page-hero scanline">
                <img src="/army_backdrop.png" alt="Silicon Lab" className="page-hero__img" />
                <div className="page-hero__overlay" />
                <div className="page-hero__content">
                    <div className="page-hero__eyebrow">
                        <div className="hero-dot gold" />
                        <span className="hero-eyebrow-text">HARDWARE SIMULATION · ESP32 VIRTUAL</span>
                    </div>
                    <h1 className="page-hero__title">Silicon <span className="gold">Lab</span></h1>
                    <p className="page-hero__sub">Virtual Node Hardware Simulation · INDRA Node V1.3</p>
                </div>
            </div>

            <div className="content-wrap">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

                    {/* ── Wokwi Simulator ── */}
                    <motion.div className="panel-gold" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        style={{ height: '580px', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '14px 18px',
                            borderBottom: '1px solid rgba(36,51,24,0.7)',
                            flexShrink: 0,
                            background: 'rgba(13,21,9,0.6)',
                        }}>
                            <Cpu size={16} color="#D4A017" />
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', letterSpacing: '2px' }}>
                                WOKWI · ESP32 SIMULATION ENVIRONMENT
                            </span>
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#39F07A', boxShadow: '0 0 8px #39F07A' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#39F07A' }}>RUNNING</span>
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

                    {/* ── Right Panel ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Firmware Spec */}
                        <motion.div className="panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>FIRMWARE SPECIFICATION</span>
                                <span className="status-pill gold">INDRA NODE V1.3</span>
                            </div>
                            {[
                                ['MCU', 'ESP32-S3 Dual-Core 240MHz'],
                                ['Protocol', 'LoRa SX1278 · 433MHz'],
                                ['Encryption', 'AES-256 Hardware'],
                                ['Mesh Stack', 'Zero-Trust TDMA'],
                                ['Build', '2025.02 · CERTIFIED'],
                            ].map(([lbl, val]) => (
                                <div className="data-row" key={lbl}>
                                    <span className="data-label">{lbl}</span>
                                    <span className="data-value">{val}</span>
                                </div>
                            ))}
                            <motion.button
                                className="btn btn-gold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDownload}
                                style={{ marginTop: '14px', width: '100%', opacity: dlDone ? 0.7 : 1 }}
                            >
                                {dlDone
                                    ? <><CheckCircle size={14} /> Firmware Downloaded</>
                                    : downloading
                                        ? <><Download size={14} /> Downloading... {Math.round(dlProgress)}%</>
                                        : <><Download size={14} /> Download Firmware</>
                                }
                            </motion.button>
                            {downloading && (
                                <div className="progress-track" style={{ marginTop: '8px' }}>
                                    <div className="progress-fill" style={{ width: `${dlProgress}%`, transition: 'width 0.2s' }} />
                                </div>
                            )}
                        </motion.div>

                        {/* Live Telemetry */}
                        <motion.div className="panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px' }}>LIVE TELEMETRY</span>
                                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '15px', fontWeight: 700, color: '#D4A017' }}>
                                    ⏱ {fmt(uptime)}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {telemetry.map(m => (
                                    <div key={m.label} style={{
                                        background: 'rgba(8,12,6,0.8)',
                                        border: `1px solid rgba(36,51,24,0.6)`,
                                        borderRadius: '8px',
                                        padding: '14px',
                                        transition: 'all 0.2s',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
                                            <m.icon size={13} color={m.color} />
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '1px' }}>{m.label}</span>
                                        </div>
                                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '17px', fontWeight: 700, color: m.color }}>{m.value}</div>
                                        <span className={`status-pill ${m.ok ? 'green' : 'red'}`} style={{ marginTop: '8px', fontSize: '8px' }}>
                                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
                                            {m.ok ? 'NOMINAL' : 'WARNING'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Pin Map */}
                        <motion.div className="panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#7A8A6A', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
                                VIRTUAL PIN MAPPING
                            </span>
                            {pinMap.map(p => (
                                <div key={p.pin} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: '1px solid rgba(36,51,24,0.4)' }}>
                                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: p.color, boxShadow: `0 0 6px ${p.color}`, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#7A8A6A', width: '168px', flexShrink: 0 }}>{p.pin}</span>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: p.color }}>{p.fn}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
