'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Globe,
    Cpu,
    Network,
    ShieldCheck,
    BarChart3,
    Shield,
} from 'lucide-react';

const navItems = [
    { href: '/', label: 'Global Ops Center', icon: Globe, sub: 'COMMAND HQ' },
    { href: '/silicon-lab', label: 'Silicon Lab', icon: Cpu, sub: 'R&D UNIT' },
    { href: '/mesh-topology', label: 'Mesh Topology', icon: Network, sub: 'NETWORK OPS' },
    { href: '/cyber-vault', label: 'Cyber Vault', icon: ShieldCheck, sub: 'SECURITY' },
    { href: '/strategic-intelligence', label: 'Strategic Intel', icon: BarChart3, sub: 'INTEL BUREAU' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                width: '260px',
                minWidth: '260px',
                maxWidth: '260px',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, #0D1509 0%, #0B1208 40%, #0A1007 100%)',
                borderRight: '1px solid rgba(74,106,42,0.4)',
                overflowY: 'auto',
                backgroundImage: "url('/army_sidebar.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Dark overlay on sidebar image */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(8,12,5,0.94) 0%, rgba(10,16,6,0.90) 50%, rgba(8,12,5,0.96) 100%)',
                zIndex: 0,
            }} />

            {/* Gold top accent bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg, transparent, #D4A017, #F0C040, #D4A017, transparent)',
                zIndex: 2,
            }} />

            {/* Content wrapper */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>

                {/* Logo / Header */}
                <div style={{
                    padding: '28px 20px 18px',
                    borderBottom: '1px solid rgba(74,106,42,0.35)',
                }}>
                    {/* Emblem row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img
                                src="/army_emblem.png"
                                alt="INDRA NET Emblem"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(212,160,23,0.6)',
                                    boxShadow: '0 0 16px rgba(212,160,23,0.4), 0 0 40px rgba(212,160,23,0.1)',
                                    objectFit: 'cover',
                                }}
                            />
                            {/* Pulse ring */}
                            <div style={{
                                position: 'absolute', inset: '-6px',
                                borderRadius: '50%',
                                border: '1px solid rgba(212,160,23,0.25)',
                                animation: 'pingRing 2.5s ease-out infinite',
                            }} />
                        </div>
                        <div>
                            <h1
                                className="glitch"
                                style={{
                                    fontFamily: 'Orbitron, Montserrat, sans-serif',
                                    fontWeight: 800,
                                    fontSize: '17px',
                                    color: '#F0C040',
                                    letterSpacing: '5px',
                                    textShadow: '0 0 12px rgba(212,160,23,0.7), 0 0 30px rgba(212,160,23,0.3)',
                                    lineHeight: 1.1,
                                }}
                            >
                                INDRA NET
                            </h1>
                            <p style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '8px',
                                color: '#6B8C42',
                                letterSpacing: '2.5px',
                                marginTop: '4px',
                            }}>
                                DIGITAL TWIN DEFENSE
                            </p>
                        </div>
                    </div>

                    {/* Classification badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(212,160,23,0.08)',
                        border: '1px solid rgba(212,160,23,0.2)',
                        borderRadius: '4px',
                        padding: '6px 10px',
                    }}>
                        <Shield size={10} color="#D4A017" />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#D4A017', letterSpacing: '2px' }}>
                            TOP SECRET · CLASSIFIED
                        </span>
                    </div>

                    {/* Status dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                        <div style={{
                            width: '7px', height: '7px', borderRadius: '50%',
                            backgroundColor: '#3DFF88',
                            boxShadow: '0 0 8px rgba(61,255,136,0.7)',
                            animation: 'pulse 2s infinite',
                        }} />
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#6B8C42' }}>
                            SYS-SECURE · v1.3.0 · ONLINE
                        </span>
                    </div>
                </div>

                {/* Nav section label */}
                <div style={{ padding: '14px 20px 6px' }}>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: '9px',
                        color: '#4A6A2A', letterSpacing: '3px', textTransform: 'uppercase',
                    }}>
                        ── OPERATIONS ──
                    </span>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ x: 4, backgroundColor: 'rgba(107,140,66,0.12)' }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '11px 14px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        background: active
                                            ? 'linear-gradient(135deg, rgba(212,160,23,0.12), rgba(107,140,66,0.08))'
                                            : 'transparent',
                                        border: active
                                            ? '1px solid rgba(212,160,23,0.3)'
                                            : '1px solid transparent',
                                        boxShadow: active ? '0 0 16px rgba(212,160,23,0.1), inset 0 1px 0 rgba(212,160,23,0.08)' : 'none',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {/* Active left bar */}
                                    {active && (
                                        <div style={{
                                            position: 'absolute', left: 0, top: '20%', bottom: '20%',
                                            width: '3px', borderRadius: '2px',
                                            background: 'linear-gradient(180deg, #D4A017, #F0C040)',
                                            boxShadow: '0 0 8px rgba(212,160,23,0.6)',
                                        }} />
                                    )}

                                    {/* Icon box */}
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '6px', flexShrink: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: active ? 'rgba(212,160,23,0.15)' : 'rgba(74,106,42,0.1)',
                                        border: active ? '1px solid rgba(212,160,23,0.3)' : '1px solid rgba(74,106,42,0.2)',
                                    }}>
                                        <Icon size={15} color={active ? '#D4A017' : '#6B8C42'} />
                                    </div>

                                    {/* Labels */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontFamily: 'Rajdhani, sans-serif',
                                            fontSize: '13px',
                                            fontWeight: active ? 700 : 500,
                                            color: active ? '#F0C040' : '#A0A880',
                                            whiteSpace: 'nowrap',
                                            textShadow: active ? '0 0 10px rgba(212,160,23,0.4)' : 'none',
                                        }}>
                                            {item.label}
                                        </div>
                                        <div style={{
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '8px',
                                            color: active ? '#6B8C42' : '#3D4D2A',
                                            letterSpacing: '1.5px',
                                        }}>
                                            {item.sub}
                                        </div>
                                    </div>

                                    {/* Active indicator dot */}
                                    {active && (
                                        <div style={{
                                            width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                                            backgroundColor: '#D4A017',
                                            boxShadow: '0 0 8px rgba(212,160,23,0.8)',
                                            animation: 'pulse 2s infinite',
                                        }} />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div style={{ padding: '16px', borderTop: '1px solid rgba(74,106,42,0.3)' }}>
                    <div style={{
                        background: 'rgba(212,160,23,0.05)',
                        border: '1px solid rgba(74,106,42,0.3)',
                        borderRadius: '6px',
                        padding: '12px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#4A6A2A', letterSpacing: '1.5px' }}>ENCRYPTION</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#3DFF88' }}>ACTIVE</span>
                        </div>
                        <div style={{ width: '100%', height: '3px', background: '#1C2A15', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div
                                style={{ height: '100%', background: 'linear-gradient(90deg, #D4A017, #F0C040)', borderRadius: '2px' }}
                                initial={{ width: '0%' }}
                                animate={{ width: '99.8%' }}
                                transition={{ duration: 2.5, delay: 0.5 }}
                            />
                        </div>
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#3D4D2A', marginTop: '6px' }}>
                            AES-256 · ZERO-TRUST · GOV-CERTIFIED
                        </p>
                    </div>
                    {/* India flag colors strip */}
                    <div style={{ display: 'flex', height: '3px', borderRadius: '2px', overflow: 'hidden', marginTop: '10px', gap: '1px' }}>
                        <div style={{ flex: 1, backgroundColor: '#FF9933' }} />
                        <div style={{ flex: 1, backgroundColor: '#FFFFFF' }} />
                        <div style={{ flex: 1, backgroundColor: '#138808' }} />
                    </div>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '8px', color: '#3D4D2A', marginTop: '6px', textAlign: 'center', letterSpacing: '1px' }}>
                        भारत सरकार · GOVT. OF INDIA
                    </p>
                </div>
            </div>
        </aside>
    );
}
