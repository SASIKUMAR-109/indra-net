'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe, Cpu, Network, ShieldCheck, BarChart3, Shield, Lock } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Global Ops Center', sub: 'COMMAND HQ', icon: Globe },
    { href: '/silicon-lab', label: 'Silicon Lab', sub: 'R&D UNIT', icon: Cpu },
    { href: '/mesh-topology', label: 'Mesh Topology', sub: 'NETWORK OPS', icon: Network },
    { href: '/cyber-vault', label: 'Cyber Vault', sub: 'SECURITY', icon: ShieldCheck },
    { href: '/strategic-intelligence', label: 'Strategic Intel', sub: 'INTEL BUREAU', icon: BarChart3 },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside style={{
            position: 'fixed',
            top: 0, left: 0,
            height: '100vh',
            width: '270px',
            minWidth: '270px',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #060905 0%, #080C06 60%, #060905 100%)',
            borderRight: '1px solid rgba(212,160,23,0.18)',
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            {/* Army backdrop image with heavy overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url('/army_sidebar.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.12,
                zIndex: 0,
            }} />

            {/* Gold top-bar accent */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, transparent, #D4A017, #F0C040, #D4A017, transparent)',
                zIndex: 10,
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>

                {/* ── HEADER / LOGO ── */}
                <div style={{
                    padding: '28px 22px 20px',
                    borderBottom: '1px solid rgba(36,51,24,0.8)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Emblem */}
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img
                                src="/army_emblem.png"
                                alt="INDRA NET"
                                style={{
                                    width: '50px', height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(212,160,23,0.55)',
                                    boxShadow: '0 0 18px rgba(212,160,23,0.35), 0 0 50px rgba(212,160,23,0.08)',
                                    objectFit: 'cover',
                                }}
                            />
                            {/* Ping ring */}
                            <div style={{
                                position: 'absolute', inset: '-8px',
                                borderRadius: '50%',
                                border: '1px solid rgba(212,160,23,0.2)',
                                animation: 'pingRing 3s ease-out infinite',
                            }} />
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="glitch" style={{
                                fontFamily: 'Orbitron, sans-serif',
                                fontWeight: 900,
                                fontSize: '16px',
                                color: '#F0C040',
                                letterSpacing: '5px',
                                textShadow: '0 0 14px rgba(212,160,23,0.65), 0 0 35px rgba(212,160,23,0.25)',
                                lineHeight: 1.1,
                            }}>
                                INDRA NET
                            </h1>
                            <p style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '8px',
                                color: '#4A6A2A',
                                letterSpacing: '2.5px',
                                marginTop: '4px',
                            }}>
                                DIGITAL TWIN DEFENSE
                            </p>
                        </div>
                    </div>

                    {/* Classification badge */}
                    <div className="army-badge" style={{ marginTop: '14px', width: '100%', justifyContent: 'center' }}>
                        <Shield size={10} />
                        TOP SECRET · CLASSIFIED
                    </div>

                    {/* System status row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                        <div className="status-pulse" style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            background: '#39F07A',
                            boxShadow: '0 0 8px rgba(57,240,122,0.7)',
                        }} />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A', letterSpacing: '1px' }}>
                            SYS-SECURE · v1.3.0 · ONLINE
                        </span>
                    </div>
                </div>

                {/* ── SECTION LABEL ── */}
                <div style={{ padding: '16px 22px 8px' }}>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                        color: '#2A3D1A', letterSpacing: '3px',
                    }}>
                        ── OPERATIONS ──
                    </span>
                </div>

                {/* ── NAV ── */}
                <nav style={{ flex: 1, padding: '0 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {navItems.map((item, i) => {
                        const active = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    whileHover={{ x: 5 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '13px',
                                        padding: '13px 14px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        background: active
                                            ? 'linear-gradient(135deg, rgba(212,160,23,0.13), rgba(107,140,66,0.07))'
                                            : 'transparent',
                                        border: active
                                            ? '1px solid rgba(212,160,23,0.28)'
                                            : '1px solid transparent',
                                        boxShadow: active ? '0 0 20px rgba(212,160,23,0.08)' : 'none',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Active gold left bar */}
                                    {active && (
                                        <div style={{
                                            position: 'absolute', left: 0, top: '18%', bottom: '18%',
                                            width: '3px', borderRadius: '0 3px 3px 0',
                                            background: 'linear-gradient(180deg, #D4A017, #F0C040)',
                                            boxShadow: '0 0 10px rgba(212,160,23,0.7)',
                                        }} />
                                    )}

                                    {/* Icon container */}
                                    <div style={{
                                        width: '36px', height: '36px',
                                        borderRadius: '8px', flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: active ? 'rgba(212,160,23,0.15)' : 'rgba(36,51,24,0.6)',
                                        border: active ? '1px solid rgba(212,160,23,0.3)' : '1px solid rgba(36,51,24,0.8)',
                                        transition: 'all 0.2s',
                                    }}>
                                        <Icon size={16} color={active ? '#D4A017' : '#4A6A2A'} />
                                    </div>

                                    {/* Labels */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontFamily: 'Rajdhani, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: active ? 700 : 500,
                                            color: active ? '#F0C040' : '#8A9A7A',
                                            whiteSpace: 'nowrap',
                                            textShadow: active ? '0 0 12px rgba(212,160,23,0.35)' : 'none',
                                            letterSpacing: '0.5px',
                                        }}>
                                            {item.label}
                                        </div>
                                        <div style={{
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '9px',
                                            color: active ? '#6B8C42' : '#2A3D1A',
                                            letterSpacing: '1.5px',
                                            marginTop: '1px',
                                        }}>
                                            {item.sub}
                                        </div>
                                    </div>

                                    {/* Active dot */}
                                    {active && (
                                        <div style={{
                                            width: '6px', height: '6px', borderRadius: '50%',
                                            background: '#D4A017',
                                            boxShadow: '0 0 8px rgba(212,160,23,0.9)',
                                            flexShrink: 0,
                                            animation: 'pulseDot 2s ease-in-out infinite',
                                        }} />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── FOOTER ── */}
                <div style={{ padding: '16px 14px', borderTop: '1px solid rgba(36,51,24,0.6)' }}>
                    {/* Encryption bar */}
                    <div style={{
                        background: 'rgba(212,160,23,0.05)',
                        border: '1px solid rgba(36,51,24,0.8)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Lock size={9} color="#4A6A2A" />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A', letterSpacing: '1.5px' }}>ENCRYPTION</span>
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#39F07A' }}>ACTIVE</span>
                        </div>
                        <div className="progress-track">
                            <motion.div
                                className="progress-fill"
                                initial={{ width: '0%' }}
                                animate={{ width: '99.8%' }}
                                transition={{ duration: 2.5, delay: 0.5 }}
                            />
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#2A3D1A', marginTop: '6px' }}>
                            AES-256 · ZERO-TRUST · FIPS-140
                        </p>
                    </div>

                    {/* India flag strip */}
                    <div style={{ display: 'flex', height: '3px', borderRadius: '2px', overflow: 'hidden', marginTop: '10px', gap: '1px' }}>
                        <div style={{ flex: 1, background: '#FF9933' }} />
                        <div style={{ flex: 1, background: '#FFFFFF' }} />
                        <div style={{ flex: 1, background: '#138808' }} />
                    </div>
                    <p style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '8px',
                        color: '#2A3D1A', marginTop: '6px', textAlign: 'center', letterSpacing: '1px',
                    }}>
                        भारत सरकार · GOVT. OF INDIA
                    </p>
                </div>
            </div>
        </aside>
    );
}
