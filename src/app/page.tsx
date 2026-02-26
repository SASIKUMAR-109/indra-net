'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Activity, Wifi, Shield, Radio, Clock, ChevronRight, Target, Layers, Zap } from 'lucide-react';

const DigitalTwinNode = dynamic(() => import('@/components/DigitalTwinNode'), { ssr: false });

const logs = [
  '> Initializing Secure Mesh Protocol...',
  '> Node-03 Connected [IP: 10.0.3.1]',
  '> Frequency Hopping Active [433.5 MHz]',
  '> Zero-Trust Handshake Successful',
  '> AES-256 Encryption Layer Online',
  '> Node-07 Authenticated — HMAC-SHA256',
  '> Edge Node Battery: 87% · Signal: -70dBm',
  '> Mesh Path Optimized: 3 Hops',
  '> All Systems Operational',
  '> Digital Twin Sync: 99.8% Fidelity',
  '> Anomaly Scan: CLEAR',
  '> Cognitive Frequency Allocated: 433.5 MHz',
  '> Self-Healing Triggered: Node-11 Rerouted',
  '> Health Monitor: All Nodes Responsive',
];

const kpis = [
  { label: 'NODES ONLINE', value: '14', color: '#D4A017' },
  { label: 'UPTIME', value: '99.8%', color: '#39F07A' },
  { label: 'THREAT LEVEL', value: 'ALPHA', color: '#FF4444' },
  { label: 'SYNC FIDELITY', value: '99.8%', color: '#D4A017' },
];

const metrics = [
  { label: 'Network Stability', value: '99.8%', icon: Activity, color: '#39F07A', pct: 99.8, status: 'OPTIMAL' },
  { label: 'Active Mesh Nodes', value: '14 / 14', icon: Wifi, color: '#D4A017', pct: 100, status: 'NOMINAL' },
  { label: 'Encryption Layer', value: 'AES-256', icon: Shield, color: '#D4A017', pct: 100, status: 'ACTIVE' },
  { label: 'Cog. Frequency', value: '433.5 MHz', icon: Radio, color: '#8DB05A', pct: 88, status: 'LOCKED' },
  { label: 'Edge Latency', value: '12 ms', icon: Clock, color: '#39F07A', pct: 95, status: 'NOMINAL' },
];

export default function HomePage() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [, setLogIndex] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleLogs([logs[0], logs[1], logs[2]]);
    const iv = setInterval(() => {
      setLogIndex(i => {
        const next = (i + 1) % logs.length;
        setVisibleLogs(prev => [...prev, logs[next]].slice(-12));
        return next;
      });
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [visibleLogs]);

  return (
    <div className="page-wrap">

      {/* ═══ HERO ═══ */}
      <div className="page-hero scanline">
        <img src="/army_backdrop.png" alt="Command Center" className="page-hero__img" />
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <div className="page-hero__eyebrow">
            <div className="hero-dot" />
            <span className="hero-eyebrow-text">LIVE · CLASSIFIED · TOP SECRET</span>
            <div className="army-badge" style={{ marginLeft: '12px' }}>
              GOVT. OF INDIA
            </div>
          </div>
          <h1 className="page-hero__title">
            Global <span className="gold">Operations</span> Center
          </h1>
          <p className="page-hero__sub">
            INDRA NET · Sovereign Defense Communication System · Digital Twin Active
          </p>
        </div>
      </div>

      {/* ═══ KPI BAR ═══ */}
      <div style={{ padding: '20px 32px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              className="kpi-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
              <div className="kpi-label">{k.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="content-wrap">

        {/* Section label */}
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <ChevronRight size={14} color="#D4A017" />
          <span className="section-header__label">Command Dashboard · Real-Time Overview</span>
          <div className="section-header__line" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={12} color="#39F07A" />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#39F07A', letterSpacing: '2px' }}>LIVE</span>
          </div>
        </div>

        {/* 2-col: 3D node + health monitor */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

          {/* 3D Digital Twin */}
          <motion.div
            className="panel-gold"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ height: '460px', position: 'relative', overflow: 'hidden', padding: 0 }}
          >
            {/* Labels */}
            <div style={{
              position: 'absolute', top: '14px', left: '14px', zIndex: 10,
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div className="army-badge"><Target size={9} /> DIGITAL TWIN · LIVE</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#39F07A', boxShadow: '0 0 8px #39F07A', animation: 'pulseDot 2s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#39F07A' }}>RENDERING</span>
            </div>
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', zIndex: 10 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#2A3D1A' }}>
                INDRA-NODE-PRIMARY · UID: 4F3A-9B2C
              </span>
            </div>
            <DigitalTwinNode />
          </motion.div>

          {/* Health monitor */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Layers size={14} color="#D4A017" />
              <span className="section-header__label">System Health Monitor</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="metric-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09 + 0.2 }}
                >
                  <div className="metric-card__left-bar" style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                  <div className="metric-card__icon" style={{ background: `${m.color}14`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={18} color={m.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="metric-card__label">{m.label}</p>
                    <p className="metric-card__value" style={{ color: m.color }}>{m.value}</p>
                    <div className="progress-track" style={{ marginTop: '6px' }}>
                      <motion.div
                        className={`progress-fill ${m.color === '#39F07A' ? 'green' : ''}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.4 }}
                      />
                    </div>
                  </div>
                  <div className="metric-card__status">
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: m.color, boxShadow: `0 0 7px ${m.color}` }} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: m.color }}>{m.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══ TERMINAL ═══ */}
        <motion.div
          className="terminal"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="terminal__topbar">
            <div className="terminal__dots">
              <div className="terminal__dot" style={{ background: '#FF4444' }} />
              <div className="terminal__dot" style={{ background: '#E8820C' }} />
              <div className="terminal__dot" style={{ background: '#39F07A' }} />
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4A6A2A', letterSpacing: '2px', marginLeft: '4px' }}>
              SECURE COMMAND TERMINAL · CH-7 ENCRYPTED
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#D4A017', boxShadow: '0 0 8px #D4A017', animation: 'pulseDot 1.5s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#D4A017' }}>STREAMING</span>
            </div>
          </div>
          <div className="terminal__body" ref={logRef}>
            <AnimatePresence initial={false}>
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  className="terminal__line"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="terminal__timestamp">
                    {new Date().toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                  <span style={{
                    color: log.includes('CLEAR') || log.includes('Operational') || log.includes('Successful')
                      ? '#39F07A' : '#C8D8B8',
                  }}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="terminal__line" style={{ marginTop: '4px' }}>
              <span className="terminal__timestamp" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#D4A017', marginRight: '8px' }}>$</span>
              <div className="terminal__cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
