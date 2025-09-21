import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';

type Project = {
  id: string;
  name: string;
  treesPlanted: number;
  co2Captured: number; // in tons
  status: "submitted" | "ngo" | "panchayat" | "nccr" | "verified";
  createdAt: string;
};

const sampleProjects: Project[] = [
  {
    id: "p-001",
    name: "Mangrove Restoration - Bay Village",
    treesPlanted: 120,
    co2Captured: 1.8,
    status: "ngo",
    createdAt: "2025-07-14",
  },
  {
    id: "p-002",
    name: "Coastal Buffer - Sundarbans Fringe",
    treesPlanted: 450,
    co2Captured: 6.1,
    status: "panchayat",
    createdAt: "2025-06-01",
  },
  {
    id: "p-003",
    name: "Community Grove - Keralan Estuary",
    treesPlanted: 80,
    co2Captured: 0.9,
    status: "submitted",
    createdAt: "2025-08-28",
  },
];

export default function TrackImpact(): JSX.Element {
  const navigate = useNavigate();
  const [projects] = useState<Project[]>(sampleProjects);

  // Upload / Geo photos
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setUploadedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  }

  // Simple sparkline data from sample projects
  const sparkData = useMemo(() => projects.map((p) => p.treesPlanted), [projects]);

  // Voice to text (basic Web Speech API usage) — progressive enhancement
  const [voiceText, setVoiceText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize mock user profile if not exists
    const currentUser = AuthUtils.getCurrentUser();
    if (!currentUser) {
      const mockUser = {
        id: 'community-001',
        name: 'Rajesh Kumar',
        email: 'community@example.com',
        role: 'community',
      };
      AuthUtils.saveUserProfile(mockUser);
    }

    // Setup speech recognition
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const r = new SpeechRecognition();
    r.interimResults = true;
    r.lang = "en-IN";
    r.onresult = (ev: any) => {
      const transcript = Array.from(ev.results)
        .map((res: any) => res[0].transcript)
        .join(" ");
      setVoiceText(transcript);
    };
    r.onend = () => setListening(false);
    recognitionRef.current = r;
  }, []);

  function toggleListening() {
    const r = recognitionRef.current;
    if (!r) return alert("Voice recognition not supported in this browser.");
    if (listening) {
      r.stop();
    } else {
      try {
        r.start();
        setListening(true);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  // Helper: status badge
  function statusLabel(s: Project["status"]) {
    switch (s) {
      case "submitted":
        return { text: "Submitted", backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#FF6B35' };
      case "ngo":
        return { text: "NGO Review", backgroundColor: 'rgba(0, 119, 182, 0.1)', color: '#0077B6' };
      case "panchayat":
        return { text: "Panchayat", backgroundColor: 'rgba(123, 97, 255, 0.1)', color: '#7B61FF' };
      case "nccr":
        return { text: "NCCR", backgroundColor: 'rgba(156, 128, 255, 0.1)', color: '#9D80FF' };
      case "verified":
        return { text: "Verified", backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' };
    }
  }

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#F8FAF9',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    },
    mainContent: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    backButton: {
      background: 'rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      color: '#0077B6',
      fontSize: '0.9rem',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s',
      marginBottom: '2rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statIcon: {
      fontSize: '2.5rem',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
      borderRadius: '12px',
      color: 'white',
      filter: 'drop-shadow(0 4px 8px rgba(0, 119, 182, 0.2))'
    },
    statContent: {
      flex: 1
    },
    statNumber: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.25rem'
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: 500
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem'
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.75rem'
    },
    cardSubtitle: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '1.5rem'
    },
    mapPlaceholder: {
      height: '208px',
      borderRadius: '8px',
      border: '2px dashed rgba(0, 119, 182, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(248, 250, 249, 1) 0%, rgba(0, 180, 216, 0.05) 100%)',
      fontSize: '0.875rem',
      color: '#64748b',
      textAlign: 'center' as const
    },
    actionRow: {
      marginTop: '1.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    sparklineRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    sparklineLabel: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    buttonRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    uploadButton: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    verifyButton: {
      background: 'rgba(0, 119, 182, 0.1)',
      color: '#0077B6',
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      transition: 'all 0.2s'
    },
    uploadGrid: {
      marginTop: '1rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '0.5rem'
    },
    uploadPreview: {
      height: '96px',
      width: '100%',
      background: '#f8f9fa',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: '#64748b',
      textAlign: 'center' as const
    },
    voiceSection: {
      background: 'white',
      borderRadius: '12px',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    voiceTitle: {
      fontWeight: 600,
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    voiceSubtitle: {
      fontSize: '0.75rem',
      color: '#64748b',
      marginBottom: '0.75rem'
    },
    voiceButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.75rem'
    },
    recordButton: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: '1px solid',
      transition: 'all 0.2s'
    },
    copyButton: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      background: 'rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      color: '#0077B6',
      transition: 'all 0.2s'
    },
    textarea: {
      width: '100%',
      borderRadius: '6px',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      padding: '0.5rem',
      fontSize: '0.875rem',
      height: '112px',
      resize: 'vertical' as const,
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    projectList: {
      marginTop: '0.75rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.75rem'
    },
    projectItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem'
    },
    projectIcon: {
      flexShrink: 0,
      width: '40px',
      height: '40px',
      borderRadius: '6px',
      background: 'linear-gradient(135deg, #4CAF50 0%, #00B4D8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'white'
    },
    projectContent: {
      flex: 1
    },
    projectName: {
      fontWeight: 500,
      color: '#1f2937',
      fontSize: '0.875rem'
    },
    projectMeta: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    statusBadge: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.75rem',
      borderRadius: '6px',
      fontWeight: 500
    },
    table: {
      width: '100%',
      marginTop: '0.75rem',
      fontSize: '0.875rem'
    },
    tableHeader: {
      textAlign: 'left' as const,
      fontSize: '0.75rem',
      color: '#64748b',
      paddingBottom: '0.5rem'
    },
    tableRow: {
      borderTop: '1px solid #e2e8f0'
    },
    tableCell: {
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem'
    },
    timelineContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    timelineItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem'
    },
    timelineIndicator: {
      width: '8px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center'
    },
    timelineDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#00B4D8',
      marginTop: '0.25rem'
    },
    timelineLine: {
      flex: 1,
      width: '1px',
      background: '#e2e8f0'
    },
    timelineContent: {
      flex: 1
    },
    timelineHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.75rem'
    },
    timelineName: {
      fontWeight: 500,
      color: '#1f2937'
    },
    timelineDate: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    stagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '0.5rem'
    },
    stageItem: {
      textAlign: 'center' as const,
      padding: '0.5rem 0.25rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 500
    }
  };

  return (
    <div style={styles.container}>
      <DashboardHeader 
        title="Track Impact"
        subtitle="Monitor plantation progress, geo-tagged photos, and verification timeline"
        userRole="community"
      />

      <main style={styles.mainContent}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/community-dashboard')}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 119, 182, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 119, 182, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)';
          }}
        >
          ← Back to Dashboard
        </button>

        {/* Top Stats */}
        <section style={styles.statsGrid}>
          <StatCard label="Trees Planted" value={730} icon="🌱" />
          <StatCard label="CO₂ Captured" value="9.2 tons" icon="🌍" />
          <StatCard label="Earnings" value="₹24,500" icon="💰" />
          <StatCard label="Active Projects" value={projects.length} icon="🏆" />
        </section>

        <section style={styles.contentGrid}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Track Impact</h3>
              <p style={styles.cardSubtitle}>Monitor plantation progress, geo-tagged photos, and verification timeline.</p>

              {/* Map placeholder */}
              <div style={styles.mapPlaceholder}>
                Map placeholder — integrate Mapbox/Leaflet here to show geo-tagged markers.
              </div>

              {/* Sparkline + actions */}
              <div style={styles.actionRow}>
                <div style={styles.sparklineRow}>
                  <div style={styles.sparklineLabel}>Recent plantation growth</div>
                  <Sparkline data={sparkData} />
                </div>

                <div style={styles.buttonRow}>
                  <label style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                    <input type="file" multiple accept="image/*" onChange={onFileChange} style={{display: 'none'}} />
                    <span style={styles.uploadButton}>Upload Geo Photos</span>
                  </label>

                  <button
                    onClick={() => alert('Open verification flow')}
                    style={styles.verifyButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 119, 182, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 119, 182, 0.1)';
                    }}
                  >
                    Start Verification
                  </button>
                </div>
              </div>

              {/* Uploaded previews */}
              {uploadedFiles.length > 0 && (
                <div style={styles.uploadGrid}>
                  {uploadedFiles.map((f, idx) => (
                    <div key={idx} style={styles.uploadPreview}>
                      {f.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Timeline */}
            <div style={styles.card}>
              <h4 style={styles.cardTitle}>Verification Timeline</h4>
              <Timeline projects={projects} styles={styles} />
            </div>
          </div>

          {/* Right Column */}
          <aside style={styles.rightColumn}>
            <div style={styles.voiceSection}>
              <h5 style={styles.voiceTitle}>Voice Support</h5>
              <p style={styles.voiceSubtitle}>Use voice-to-text to fill quick observations (for low-literacy users).</p>

              <div style={styles.voiceButtons}>
                <button
                  onClick={toggleListening}
                  style={{
                    ...styles.recordButton,
                    backgroundColor: listening ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 180, 216, 0.1)',
                    borderColor: listening ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0, 180, 216, 0.2)',
                    color: listening ? '#EF4444' : '#00B4D8'
                  }}
                >
                  {listening ? "Stop" : "Record"}
                </button>

                <button
                  onClick={() => { navigator.clipboard?.writeText(voiceText); alert('Copied'); }}
                  style={styles.copyButton}
                  disabled={!voiceText}
                >
                  Copy
                </button>
              </div>

              <textarea
                style={styles.textarea}
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                placeholder="Voice input will appear here"
                onFocus={(e) => (e.currentTarget.style.borderColor = '#0077B6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(0, 119, 182, 0.2)')}
              />
            </div>

            <div style={styles.card}>
              <h5 style={styles.cardTitle}>Project Activity</h5>
              <ul style={styles.projectList}>
                {projects.map((p) => (
                  <li key={p.id} style={styles.projectItem}>
                    <div style={styles.projectIcon}>{p.treesPlanted}</div>
                    <div style={styles.projectContent}>
                      <div style={styles.projectName}>{p.name}</div>
                      <div style={styles.projectMeta}>{p.createdAt} • {p.co2Captured} tons CO₂</div>
                    </div>
                    <div style={{
                      ...styles.statusBadge,
                      backgroundColor: statusLabel(p.status).backgroundColor,
                      color: statusLabel(p.status).color
                    }}>
                      {statusLabel(p.status).text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.card}>
              <h5 style={styles.cardTitle}>History & Records</h5>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Project</th>
                    <th style={styles.tableHeader}>Trees</th>
                    <th style={styles.tableHeader}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{p.name}</td>
                      <td style={styles.tableCell}>{p.treesPlanted}</td>
                      <td style={styles.tableCell}>{statusLabel(p.status).text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

/* ---------- Small subcomponents ---------- */
function StatCard({ label, value, icon }: { label: string; value: number | string; icon?: string }) {
  const styles = {
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    icon: {
      fontSize: '2.5rem',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
      borderRadius: '12px',
      color: 'white',
      filter: 'drop-shadow(0 4px 8px rgba(0, 119, 182, 0.2))'
    },
    content: {
      flex: 1
    },
    value: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#0077B6',
      marginBottom: '0.25rem'
    },
    label: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: 500
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.icon}>
        {icon}
      </div>
      <div style={styles.content}>
        <div style={styles.value}>{value}</div>
        <div style={styles.label}>{label}</div>
      </div>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const width = 120;
  const height = 36;
  if (!data || data.length === 0) return <div style={{fontSize: '0.75rem', color: '#9ca3af'}}>—</div>;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = max === min ? height / 2 : height - ((d - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height}>
      <polyline 
        points={points} 
        fill="none" 
        stroke="#0077B6" 
        strokeWidth={2} 
        strokeLinejoin="round" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

function Timeline({ projects, styles }: { projects: Project[], styles: any }) {
  const stages = ["submitted", "ngo", "panchayat", "nccr", "verified"] as Project["status"][];
  
  return (
    <div style={styles.timelineContainer}>
      {projects.map((p) => (
        <div key={p.id} style={styles.timelineItem}>
          <div style={styles.timelineIndicator}>
            <span style={styles.timelineDot} />
            <div style={styles.timelineLine} />
          </div>
          <div style={styles.timelineContent}>
            <div style={styles.timelineHeader}>
              <div style={styles.timelineName}>{p.name}</div>
              <div style={styles.timelineDate}>{p.createdAt}</div>
            </div>
            <div style={styles.stagesGrid}>
              {stages.map((s) => {
                const completedIndex = stages.indexOf(p.status);
                const thisIndex = stages.indexOf(s);
                const completed = thisIndex <= completedIndex;
                return (
                  <div 
                    key={s} 
                    style={{
                      ...styles.stageItem,
                      backgroundColor: completed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                      color: completed ? '#4CAF50' : '#9ca3af'
                    }}
                  >
                    {s}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
