import React, { useState, useEffect } from 'react';
import { useDAO, formatCurrency, formatTimeRemaining, getRoleColor, getRoleName, UserRole } from '../../contexts/DAOContext';

const DAODashboard = () => {
  const { user, proposals, stats, login, logout, vote, hasVoted, getUserVote } = useDAO();
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'failed'>('all');
  const [showCreateProposal, setShowCreateProposal] = useState(false);

  // Auto-login based on URL params for demo
  useEffect(() => {
    if (!user) {
      const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get('role') as UserRole;
      if (role && ['community', 'ngo', 'panchayat'].includes(role)) {
        login(role);
      }
    }
  }, [user, login]);

  if (!user) {
    return <LoginPrompt onLogin={login} />;
  }

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });

  const canCreateProposal = user.role === 'ngo' || user.role === 'panchayat';

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      color: 'white'
    },
    header: {
      backgroundColor: '#1e293b',
      borderBottom: '1px solid #334155',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#22d3ee'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    walletButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#22d3ee',
      color: '#0f172a',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#334155',
      borderRadius: '8px'
    },
    main: {
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '2rem',
      color: '#f1f5f9'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #334155'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#22d3ee',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#94a3b8',
      fontSize: '1rem'
    },
    section: {
      marginBottom: '3rem'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#f1f5f9'
    },
    filterTabs: {
      display: 'flex',
      gap: '0.5rem'
    },
    filterTab: {
      padding: '0.5rem 1rem',
      backgroundColor: 'transparent',
      color: '#94a3b8',
      border: '1px solid #334155',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s'
    },
    filterTabActive: {
      backgroundColor: '#22d3ee',
      color: '#0f172a',
      borderColor: '#22d3ee'
    },
    createButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    proposalGrid: {
      display: 'grid',
      gap: '1.5rem'
    },
    proposalCard: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #334155',
      transition: 'all 0.3s ease'
    },
    proposalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    proposalTitle: {
      fontSize: '1.3rem',
      fontWeight: 600,
      color: '#f1f5f9',
      marginBottom: '0.5rem'
    },
    proposalMeta: {
      display: 'flex',
      gap: '1rem',
      fontSize: '0.8rem',
      color: '#94a3b8',
      marginBottom: '1rem'
    },
    proposalDescription: {
      color: '#cbd5e1',
      lineHeight: 1.6,
      marginBottom: '1.5rem'
    },
    votingSection: {
      backgroundColor: '#0f172a',
      borderRadius: '8px',
      padding: '1rem'
    },
    progressBar: {
      backgroundColor: '#334155',
      borderRadius: '6px',
      height: '8px',
      marginBottom: '1rem',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
      transition: 'width 0.3s ease'
    },
    voteStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontSize: '0.9rem'
    },
    voteButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    voteButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      flex: 1
    },
    voteYes: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    voteNo: {
      backgroundColor: '#ef4444',
      color: 'white'
    },
    voteDisabled: {
      backgroundColor: '#374151',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: 600
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#10b981', color: 'white' };
      case 'passed':
        return { backgroundColor: '#3b82f6', color: 'white' };
      case 'failed':
        return { backgroundColor: '#ef4444', color: 'white' };
      case 'expired':
        return { backgroundColor: '#6b7280', color: 'white' };
      default:
        return { backgroundColor: '#374151', color: '#9ca3af' };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          🏛️ CLORIT DAO
        </div>
        <div style={styles.headerRight}>
          <button style={styles.walletButton}>
            🔗 {user.walletAddress}
          </button>
          <div style={styles.userInfo}>
            <span className={getRoleColor(user.role)} style={{ 
              padding: '0.25rem 0.5rem', 
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              {getRoleName(user.role)}
            </span>
            <span style={{ fontSize: '0.9rem' }}>{user.name}</span>
          </div>
          <button 
            onClick={logout}
            style={{
              ...styles.walletButton,
              backgroundColor: '#ef4444'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>DAO Governance Dashboard</h1>

        {/* Stats Section */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.totalMembers}</div>
            <div style={styles.statLabel}>Total Members</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.activeProposals}</div>
            <div style={styles.statLabel}>Active Proposals</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.votingParticipation}%</div>
            <div style={styles.statLabel}>Voting Participation</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{user.votingPower}</div>
            <div style={styles.statLabel}>Your Voting Power</div>
          </div>
        </div>

        {/* Proposals Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Proposals</h2>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={styles.filterTabs}>
                {[
                  { key: 'all', label: 'All' },
                  { key: 'active', label: 'Active' },
                  { key: 'passed', label: 'Passed' },
                  { key: 'failed', label: 'Failed' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    style={{
                      ...styles.filterTab,
                      ...(filter === tab.key ? styles.filterTabActive : {})
                    }}
                    onClick={() => setFilter(tab.key as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {canCreateProposal && (
                <button
                  style={styles.createButton}
                  onClick={() => setShowCreateProposal(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 211, 238, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✨ Create Proposal
                </button>
              )}
            </div>
          </div>

          <div style={styles.proposalGrid}>
            {filteredProposals.map(proposal => {
              const totalWeight = proposal.totalYesWeight + proposal.totalNoWeight;
              const yesPercentage = totalWeight > 0 ? (proposal.totalYesWeight / totalWeight) * 100 : 0;
              const userVote = getUserVote(proposal.id);
              const voted = hasVoted(proposal.id);
              const canVote = proposal.status === 'active' && !voted;

              return (
                <div
                  key={proposal.id}
                  style={styles.proposalCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#22d3ee';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.proposalHeader}>
                    <div>
                      <h3 style={styles.proposalTitle}>{proposal.title}</h3>
                      <div style={styles.proposalMeta}>
                        <span>💰 {proposal.fundingAmount ? formatCurrency(proposal.fundingAmount) : 'No funding'}</span>
                        <span>⏰ {formatTimeRemaining(proposal.deadline)}</span>
                        <span>👤 By {proposal.createdBy}</span>
                      </div>
                    </div>
                    <span style={{
                      ...styles.statusBadge,
                      ...getStatusBadgeStyle(proposal.status)
                    }}>
                      {proposal.status.toUpperCase()}
                    </span>
                  </div>

                  <p style={styles.proposalDescription}>{proposal.description}</p>

                  <div style={styles.votingSection}>
                    <div style={styles.progressBar}>
                      <div 
                        style={{
                          ...styles.progressFill,
                          width: `${yesPercentage}%`
                        }}
                      />
                    </div>

                    <div style={styles.voteStats}>
                      <span style={{ color: '#10b981' }}>
                        ✅ Yes: {proposal.totalYesWeight} votes ({yesPercentage.toFixed(1)}%)
                      </span>
                      <span style={{ color: '#ef4444' }}>
                        ❌ No: {proposal.totalNoWeight} votes ({(100 - yesPercentage).toFixed(1)}%)
                      </span>
                    </div>

                    {voted && (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '0.5rem',
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#22d3ee'
                      }}>
                        ✅ You voted: {userVote === 'yes' ? 'YES' : 'NO'} (Weight: {user.votingPower})
                      </div>
                    )}

                    <div style={styles.voteButtons}>
                      <button
                        style={{
                          ...styles.voteButton,
                          ...(canVote ? styles.voteYes : styles.voteDisabled)
                        }}
                        onClick={() => canVote && vote(proposal.id, 'yes')}
                        disabled={!canVote}
                      >
                        ✅ Vote Yes
                      </button>
                      <button
                        style={{
                          ...styles.voteButton,
                          ...(canVote ? styles.voteNo : styles.voteDisabled)
                        }}
                        onClick={() => canVote && vote(proposal.id, 'no')}
                        disabled={!canVote}
                      >
                        ❌ Vote No
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProposals.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#94a3b8',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155'
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
              <h3>No {filter !== 'all' ? filter : ''} proposals found</h3>
              <p>
                {canCreateProposal 
                  ? 'Be the first to create a proposal!' 
                  : 'Check back later for new proposals to vote on.'
                }
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Create Proposal Modal */}
      {showCreateProposal && (
        <CreateProposalModal 
          onClose={() => setShowCreateProposal(false)}
          user={user}
        />
      )}
    </div>
  );
};

// Login Prompt Component
const LoginPrompt: React.FC<{ onLogin: (role: UserRole) => void }> = ({ onLogin }) => {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '3rem',
      maxWidth: '500px',
      width: '100%',
      border: '1px solid #334155',
      textAlign: 'center' as const
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      marginBottom: '1rem',
      color: '#22d3ee'
    },
    subtitle: {
      color: '#94a3b8',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    roleButtons: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    roleButton: {
      padding: '1rem 1.5rem',
      backgroundColor: '#334155',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏛️ Join CLORIT DAO</h1>
        <p style={styles.subtitle}>
          Choose your role to access the DAO dashboard and participate in governance decisions.
        </p>
        <div style={styles.roleButtons}>
          {[
            { role: 'community', label: '🏘️ Community Member', desc: 'Voting power: 1' },
            { role: 'ngo', label: '🏢 NGO Representative', desc: 'Voting power: 3 • Can create proposals' },
            { role: 'panchayat', label: '🏛️ Panchayat Official', desc: 'Voting power: 2 • Can create proposals' }
          ].map(item => (
            <button
              key={item.role}
              style={styles.roleButton}
              onClick={() => onLogin(item.role as UserRole)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#22d3ee';
                e.currentTarget.style.color = '#0f172a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>{item.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Create Proposal Modal Component
const CreateProposalModal: React.FC<{ 
  onClose: () => void; 
  user: { id: string; name: string; role: UserRole } 
}> = ({ onClose, user }) => {
  const { createProposal } = useDAO();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fundingAmount: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const deadline = new Date(formData.deadline);
    const fundingAmount = formData.fundingAmount ? parseInt(formData.fundingAmount) : undefined;

    createProposal({
      title: formData.title,
      description: formData.description,
      fundingAmount,
      deadline,
      createdBy: user.id
    });

    onClose();
  };

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      padding: '2rem',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      border: '1px solid #334155'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      color: '#22d3ee'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem'
    },
    label: {
      color: '#f1f5f9',
      fontWeight: 600
    },
    input: {
      padding: '0.75rem',
      backgroundColor: '#334155',
      color: 'white',
      border: '1px solid #475569',
      borderRadius: '8px',
      fontSize: '1rem'
    },
    textarea: {
      padding: '0.75rem',
      backgroundColor: '#334155',
      color: 'white',
      border: '1px solid #475569',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical' as const
    },
    buttons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
      color: 'white'
    },
    cancelButton: {
      backgroundColor: '#374151',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>✨ Create New Proposal</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Proposal Title</label>
            <input
              style={styles.input}
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter proposal title..."
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your proposal in detail..."
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Funding Amount (Optional)</label>
            <input
              style={styles.input}
              type="number"
              value={formData.fundingAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, fundingAmount: e.target.value }))}
              placeholder="Enter funding amount in INR..."
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Voting Deadline</label>
            <input
              style={styles.input}
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>

          <div style={styles.buttons}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
            >
              🚀 Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DAODashboard;
