import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Coins,
  Store,
  BarChart3,
  ShieldCheck,
  Settings,
  Users,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../../state/authStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'overview',    label: 'Dashboard Overview',      icon: LayoutDashboard, section: 'main' },
  { id: 'projects',   label: 'Project Management',       icon: FolderKanban,    section: 'main' },
  { id: 'carbon',     label: 'Carbon Control',           icon: Coins,           section: 'main' },
  { id: 'marketplace',label: 'Marketplace Monitoring',   icon: Store,           section: 'main' },
  { id: 'analytics',  label: 'Analytics & Reports',      icon: BarChart3,       section: 'main' },
  { id: 'compliance', label: 'Compliance & Verification',icon: ShieldCheck,     section: 'utility' },
  { id: 'system',     label: 'System Control',           icon: Settings,        section: 'utility' },
  { id: 'users',      label: 'Users & Roles',            icon: Users,           section: 'utility' },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, onPageChange }) => {
  const navigate  = useNavigate();
  const logout    = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const mainItems    = navItems.filter(i => i.section === 'main');
  const utilityItems = navItems.filter(i => i.section === 'utility');

  return (
    <aside
      style={{
        width: '272px',
        background: 'linear-gradient(180deg, #0d1117 0%, #0f172a 60%, #0a1628 100%)',
        borderRight: '1px solid rgba(99,102,241,0.12)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Ambient top glow */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '-30px',
        width: '220px',
        height: '220px',
        background: 'radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      {/* ── BRAND HEADER ─────────────────────── */}
      <div style={{
        padding: '28px 20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        background: 'rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Logo Container */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(56,189,248,0.18))',
            border: '1.5px solid rgba(52,211,153,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 8px 24px -6px rgba(52,211,153,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle gloss effect on logo box */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: 'rotate(45deg)',
              pointerEvents: 'none',
            }} />
            <img
              src="https://i.postimg.cc/02Zv32bV/Screenshot_2025-09-05_at_17.05.30-removebg-preview.png"
              alt="CLORIT"
              style={{ width: '34px', height: '34px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
            />
          </div>

          {/* Text Branding */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{
                fontSize: '22px',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #34d399 0%, #38bdf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.8px',
                lineHeight: 0.9,
              }}>
                CLORIT
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
              }}>
                PRO
              </span>
            </div>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              marginTop: '6px',
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.15)',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#34d399',
                boxShadow: '0 0 8px #34d399',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
              }} />
              <span style={{ 
                fontSize: '10px', 
                fontWeight: 800, 
                color: '#34d399', 
                letterSpacing: '0.5px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN NAV ─────────────────────────── */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* MAIN section label */}
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          padding: '0 8px', marginBottom: '8px',
        }}>
          Main
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {mainItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  fontWeight: active ? 600 : 500,
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.18s ease',
                  background: active
                    ? 'linear-gradient(135deg, rgba(52,211,153,0.22), rgba(56,189,248,0.14))'
                    : 'transparent',
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  boxShadow: active ? 'inset 0 0 0 1px rgba(52,211,153,0.3)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {/* Active left accent bar */}
                {active && (
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: '3px',
                    borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(180deg, #34d399, #38bdf8)',
                  }} />
                )}
                <item.icon
                  size={16}
                  style={{
                    color: active ? '#34d399' : 'rgba(255,255,255,0.35)',
                    flexShrink: 0,
                    transition: 'color 0.18s',
                  }}
                />
                <span style={{ flex: 1, lineHeight: '1.2' }}>{item.label}</span>
                {active && (
                  <ChevronRight
                    size={13}
                    style={{ color: 'rgba(52,211,153,0.6)', marginLeft: 'auto' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* UTILITY section label */}
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px',
          color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
          padding: '0 8px', marginTop: '20px', marginBottom: '8px',
        }}>
          System
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {utilityItems.map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  fontWeight: active ? 600 : 500,
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'all 0.18s ease',
                  background: active
                    ? 'linear-gradient(135deg, rgba(52,211,153,0.22), rgba(56,189,248,0.14))'
                    : 'transparent',
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  boxShadow: active ? 'inset 0 0 0 1px rgba(52,211,153,0.3)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
                  }
                }}
              >
                {active && (
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    height: '60%',
                    width: '3px',
                    borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(180deg, #34d399, #38bdf8)',
                  }} />
                )}
                <item.icon
                  size={16}
                  style={{
                    color: active ? '#34d399' : 'rgba(255,255,255,0.35)',
                    flexShrink: 0,
                    transition: 'color 0.18s',
                  }}
                />
                <span style={{ flex: 1, lineHeight: '1.2' }}>{item.label}</span>
                {active && (
                  <ChevronRight
                    size={13}
                    style={{ color: 'rgba(52,211,153,0.6)', marginLeft: 'auto' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── FOOTER ───────────────────────────── */}
      <div style={{
        padding: '12px 12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px',
            borderRadius: '10px',
            border: '1px solid rgba(239,68,68,0.25)',
            background: 'rgba(239,68,68,0.07)',
            color: '#f87171',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.16)';
            (e.currentTarget as HTMLButtonElement).style.borderColor  = 'rgba(239,68,68,0.45)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.07)';
            (e.currentTarget as HTMLButtonElement).style.borderColor  = 'rgba(239,68,68,0.25)';
          }}
        >
          <LogOut size={15} />
          Safe Disconnect
        </button>
      </div>

      {/* pulse keyframe (inline as a style tag workaround) */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
