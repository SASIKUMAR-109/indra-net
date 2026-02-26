'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Activity, Wifi, Shield, Radio, Clock, ChevronRight, Target, Layers } from 'lucide-react';

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

const metrics = [
  { label: 'Network Stability', value: '99.8%', icon: Activity, color: '#3DFF88', status: 'OPTIMAL' },
  { label: 'Active Mesh Nodes', value: '14', icon: Wifi, color: '#D4A017', status: 'NOMINAL' },
  { label: 'Encryption', value: 'AES-256', icon: Shield, color: '#D4A017', status: 'ACTIVE' },
  { label: 'Cog. Frequency', value: '433.5 MHz', icon: Radio, color: '#8DB05A', status: 'LOCKED' },
  { label: 'Edge Latency', value: '12 ms', icon: Clock, color: '#3DFF88', status: 'NOMINAL' },
];

const GOLD = '#D4A017';
const CREAM = '#EDE8D0';
const OLIVE = '#6B8C42';
const MUTED = '#7A8A6A';
const GREEN = '#3DFF88';
const BG_CARD = 'rgba(20,31,15,0.88)';
const BORDER = 'rgba(74,106,42,0.35)';
const BORDER_GOLD = 'rgba(212,160,23,0.25)';

export default function HomePage() {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [, setLogIndex] = useState(0);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleLogs([logs[0], logs[1], logs[2]]);
    const interval = setInterval(() => {
      setLogIndex((i) => {
        const next = (i + 1) % logs.length;
        setVisibleLogs((prev) => [...prev, logs[next]].slice(-12));
        return next;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [visibleLogs]);

  return (
    <div style={{ padding: '0', minHeight: '100vh' }}>

      {/* ── HERO BANNER ── */}
      <div style={{
        position: 'relative',
        height: '280px',
        overflow: 'hidden',
        borderBottom: `1px solid ${BORDER_GOLD}`,
      }}>
        {/* Hero background image */}
        <img
          src="/army_backdrop.png"
          alt="Army Command Center"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(8,12,5,0.82) 0%, rgba(15,22,8,0.65) 50%, rgba(8,12,5,0.75) 100%)',
        }} />
        {/* Gold scanline animation */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(212,160,23,0.04) 50%, transparent 100%)',
          backgroundSize: '100% 6px',
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '40px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: GREEN, boxShadow: `0 0 10px ${GREEN}`,
              animation: 'pulse 2s infinite',
            }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: OLIVE, letterSpacing: '4px' }}>
              LIVE · CLASSIFIED · TOP SECRET
            </span>
            <div style={{
              marginLeft: '16px', padding: '3px 10px',
              background: 'rgba(212,160,23,0.12)',
              border: '1px solid rgba(212,160,23,0.3)',
              borderRadius: '3px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: GOLD, letterSpacing: '2px',
            }}>
              GOVT. OF INDIA · CLASSIFIED
            </div>
          </div>

          <h1 style={{
            fontFamily: 'Orbitron, Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: '40px',
            color: '#FFFFFF',
            lineHeight: 1.1,
            margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            letterSpacing: '2px',
          }}>
            Global{' '}
            <span style={{ color: GOLD, textShadow: `0 0 20px rgba(212,160,23,0.6)` }}>
              Operations
            </span>{' '}Center
          </h1>

          <p style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '16px', fontWeight: 500,
            color: '#A0A880', marginTop: '10px', letterSpacing: '1px',
          }}>
            INDRA NET · Sovereign Defense Communication System · Digital Twin Active
          </p>

          {/* Quick stats row */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            {[
              { label: 'NODES ONLINE', val: '14' },
              { label: 'UPTIME', val: '99.8%' },
              { label: 'THREAT LVL', val: 'ALPHA' },
              { label: 'SYNC', val: '99.8%' },
            ].map((s) => (
              <div key={s.label} style={{
                background: 'rgba(8,12,5,0.7)',
                border: `1px solid ${BORDER_GOLD}`,
                borderRadius: '6px',
                padding: '8px 14px',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: MUTED, letterSpacing: '1.5px' }}>{s.label}</div>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '16px', fontWeight: 700, color: GOLD, marginTop: '2px' }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ padding: '28px 32px', maxWidth: '1600px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <ChevronRight size={16} color={GOLD} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '3px' }}>
            COMMAND DASHBOARD · REAL-TIME OVERVIEW
          </span>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${BORDER_GOLD}, transparent)` }} />
        </div>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

          {/* 3D Digital Twin */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              background: BG_CARD,
              border: `1px solid ${BORDER_GOLD}`,
              borderRadius: '10px',
              height: '440px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(212,160,23,0.07)',
            }}
          >
            {/* Top left label */}
            <div style={{
              position: 'absolute', top: '14px', left: '14px', zIndex: 10,
              fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GOLD,
              background: 'rgba(212,160,23,0.1)', padding: '4px 10px', borderRadius: '4px',
              border: `1px solid rgba(212,160,23,0.25)`, letterSpacing: '2px',
            }}>
              DIGITAL TWIN NODE · LIVE RENDER
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'absolute', top: '14px', right: '14px', zIndex: 10 }}>
              <Target size={12} color={OLIVE} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: OLIVE }}>TRACKING</span>
            </div>
            <div style={{ position: 'absolute', bottom: '14px', left: '14px', zIndex: 10 }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#3D4D2A' }}>
                INDRA-NODE-PRIMARY · UID: 4F3A-9B2C
              </span>
            </div>
            <DigitalTwinNode />
          </motion.div>

          {/* Health Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Layers size={14} color={GOLD} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px' }}>
                SYSTEM HEALTH MONITOR
              </span>
            </div>

            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                style={{
                  background: BG_CARD,
                  border: `1px solid ${BORDER}`,
                  borderRadius: '8px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left gold bar */}
                <div style={{
                  position: 'absolute', left: 0, top: '15%', bottom: '15%',
                  width: '2px', background: m.color, borderRadius: '2px',
                  boxShadow: `0 0 6px ${m.color}`,
                }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${m.color}14`, border: `1px solid ${m.color}33`,
                    flexShrink: 0,
                  }}>
                    <m.icon size={18} color={m.color} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: MUTED, letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>
                      {m.label}
                    </p>
                    <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '20px', fontWeight: 700, color: m.color, margin: '2px 0 0', lineHeight: 1 }}>
                      {m.value}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: m.color }}>{m.status}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Terminal Log */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: BG_CARD,
            border: `1px solid ${BORDER_GOLD}`,
            borderRadius: '10px',
            padding: '20px 24px',
            boxShadow: '0 0 24px rgba(212,160,23,0.05)',
          }}
        >
          {/* Terminal top bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#FF4444' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#E8820C' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#3DFF88' }} />
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: MUTED, letterSpacing: '2px' }}>
              SECURE COMMAND TERMINAL · ENCRYPTED CH-7
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: GOLD }}>STREAMING</span>
            </div>
          </div>

          <div ref={logRef} style={{ height: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <AnimatePresence initial={false}>
              {visibleLogs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}
                >
                  <span style={{ color: 'rgba(212,160,23,0.5)', flexShrink: 0, fontSize: '10px', paddingTop: '1px' }}>
                    {new Date().toLocaleTimeString('en-US', { hour12: false })}
                  </span>
                  <span style={{
                    color: log.includes('CLEAR') || log.includes('Operational') || log.includes('Successful')
                      ? GREEN : CREAM,
                  }}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: GOLD }}>$</span>
              <div style={{ width: '9px', height: '17px', backgroundColor: GOLD, animation: 'blink 1s step-end infinite', boxShadow: `0 0 8px ${GOLD}` }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
