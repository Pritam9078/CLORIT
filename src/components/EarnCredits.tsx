import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import { AuthUtils } from '../utils/auth';

/**
 * EarnCredits.tsx
 * Community-facing Earn Credits page for CLORIT
 * - Shows token balance, recent transactions
 * - Marketplace to redeem carbon-credit rewards
 * - Claim credits flow, QR voucher placeholder, CSV export
 * - Converted to inline styles to match project styling system
 */

type Tx = {
  id: string;
  date: string;
  type: "earn" | "redeem" | "claim";
  amount: number; // token units
  note?: string;
};

type MarketplaceItem = {
  id: string;
  title: string;
  description: string;
  cost: number; // tokens
};

const sampleTx: Tx[] = [
  { id: "t1", date: "2025-09-10", type: "earn", amount: 50, note: "Verified planting" },
  { id: "t2", date: "2025-09-12", type: "earn", amount: 30, note: "Community milestone" },
  { id: "t3", date: "2025-09-14", type: "redeem", amount: 20, note: "Tree sapling kit" },
];

const marketplace: MarketplaceItem[] = [
  { id: "m1", title: "Sapling Kit", description: "100 mangrove saplings kit for community planting.", cost: 20 },
  { id: "m2", title: "Soil Health Kit", description: "Tools & nutrients for coastal soil restoration.", cost: 45 },
  { id: "m3", title: "Community Grant", description: "Micro-grant for local verification activities.", cost: 120 },
];

export default function EarnCredits(): JSX.Element {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(180);
  const [txs, setTxs] = useState<Tx[]>(sampleTx);

  // Redeem / Claim modal
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [processing, setProcessing] = useState(false);

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
  }, []);

  // Simple purchase flow
  function onRedeem(item: MarketplaceItem) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  async function confirmRedeem() {
    if (!selectedItem) return;
    setProcessing(true);
    // simulate API / wallet interaction
    await new Promise((r) => setTimeout(r, 1200));

    // success: deduct balance and add transaction
    setBalance((b) => b - selectedItem.cost);
    const newTx: Tx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      type: "redeem",
      amount: selectedItem.cost,
      note: selectedItem.title,
    };
    setTxs((p) => [newTx, ...p]);

    setProcessing(false);
    setShowConfirm(false);
    setSelectedItem(null);
  }

  function cancelRedeem() {
    setShowConfirm(false);
    setSelectedItem(null);
  }

  // Claim credits (simulated)
  async function claimCredits(amount: number) {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    setBalance((b) => b + amount);
    setTxs((p) => [
      { id: `tx-${Date.now()}`, date: new Date().toISOString().slice(0, 10), type: "claim", amount, note: "Claimed rewards" },
      ...p,
    ]);
    setProcessing(false);
  }

  // Export transactions to CSV
  function exportCSV() {
    const header = ["id", "date", "type", "amount", "note"].join(",");
    const rows = txs.map((t) => [t.id, t.date, t.type, t.amount, `"${t.note ?? ""}"`].join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clorit_transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const recentEarned = useMemo(() => txs.filter((t) => t.type === "earn").slice(0, 3), [txs]);

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
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
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
      marginBottom: '1rem'
    },
    balanceCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    balanceInfo: {
      flex: 1
    },
    balanceLabel: {
      fontSize: '0.75rem',
      color: '#64748b',
      textTransform: 'uppercase' as const,
      fontWeight: 500
    },
    balanceAmount: {
      fontSize: '3rem',
      fontWeight: 700,
      marginTop: '0.25rem',
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #4CAF50 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    balanceSubtext: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginTop: '0.25rem'
    },
    buttonGroup: {
      marginTop: '0.75rem',
      display: 'flex',
      gap: '0.75rem'
    },
    claimButton: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s',
      color: 'white'
    },
    claimButton25: {
      background: 'linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)'
    },
    claimButton50: {
      background: 'linear-gradient(135deg, #7B61FF 0%, #9D80FF 100%)'
    },
    exportButton: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      background: 'rgba(0, 119, 182, 0.1)',
      border: '1px solid rgba(0, 119, 182, 0.2)',
      color: '#0077B6',
      transition: 'all 0.2s'
    },
    voucherPlaceholder: {
      width: '160px',
      height: '160px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.05) 0%, rgba(123, 97, 255, 0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      fontSize: '0.75rem',
      color: '#64748b',
      border: '2px dashed rgba(0, 119, 182, 0.2)'
    },
    marketplaceGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    marketplaceCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)',
      display: 'flex',
      flexDirection: 'column' as const
    },
    cardContent: {
      flex: 1
    },
    cardTitle: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    cardDescription: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.5
    },
    cardFooter: {
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardCost: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#0077B6'
    },
    redeemButton: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    redeemButtonActive: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      color: 'white'
    },
    redeemButtonDisabled: {
      background: '#f1f5f9',
      color: '#94a3b8',
      cursor: 'not-allowed'
    },
    transactionsCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 119, 182, 0.05)',
      border: '1px solid rgba(0, 119, 182, 0.1)'
    },
    transactionsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    sectionTitle: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#0077B6'
    },
    transactionCount: {
      fontSize: '0.75rem',
      color: '#64748b'
    },
    tableContainer: {
      overflowX: 'auto' as const
    },
    table: {
      width: '100%',
      fontSize: '0.875rem'
    },
    tableHeader: {
      textAlign: 'left' as const,
      fontSize: '0.75rem',
      color: '#64748b',
      paddingBottom: '0.5rem',
      fontWeight: 500,
      textTransform: 'uppercase' as const
    },
    tableRow: {
      borderTop: '1px solid rgba(0, 119, 182, 0.1)'
    },
    tableCell: {
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem'
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    },
    modalTitle: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#0077B6',
      marginBottom: '0.5rem'
    },
    modalText: {
      fontSize: '0.875rem',
      color: '#64748b',
      lineHeight: 1.5
    },
    modalActions: {
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem'
    },
    cancelButton: {
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
    confirmButton: {
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      border: 'none',
      color: 'white',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <DashboardHeader 
        title="Earn Credits"
        subtitle="Redeem your carbon credits and track your environmental impact rewards"
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

        {/* Balance Card */}
        <section style={styles.balanceCard}>
          <div style={styles.balanceInfo}>
            <div style={styles.balanceLabel}>Available Credits</div>
            <div style={styles.balanceAmount}>{balance} CLB</div>
            <div style={styles.balanceSubtext}>(CLB = CLORIT Blue Credits)</div>
            <div style={styles.buttonGroup}>
              <button
                onClick={() => claimCredits(25)}
                style={{...styles.claimButton, ...styles.claimButton25}}
                disabled={processing}
                onMouseEnter={(e) => {
                  if (!processing) e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Claim 25
              </button>
              <button
                onClick={() => claimCredits(50)}
                style={{...styles.claimButton, ...styles.claimButton50}}
                disabled={processing}
                onMouseEnter={(e) => {
                  if (!processing) e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Claim 50
              </button>
              <button 
                onClick={exportCSV} 
                style={styles.exportButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 119, 182, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 119, 182, 0.1)';
                }}
              >
                Export Transactions
              </button>
            </div>
          </div>

          <div style={styles.voucherPlaceholder}>
            Voucher / QR code will appear here when redeeming
          </div>
        </section>

        {/* Marketplace */}
        <section style={styles.marketplaceGrid}>
          {marketplace.map((item) => (
            <div key={item.id} style={styles.marketplaceCard}>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDescription}>{item.description}</p>
              </div>
              <div style={styles.cardFooter}>
                <div style={styles.cardCost}>{item.cost} CLB</div>
                <button
                  onClick={() => onRedeem(item)}
                  disabled={processing || item.cost > balance}
                  style={{
                    ...styles.redeemButton,
                    ...(item.cost > balance ? styles.redeemButtonDisabled : styles.redeemButtonActive)
                  }}
                  onMouseEnter={(e) => {
                    if (item.cost <= balance && !processing) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {item.cost > balance ? "Insufficient" : "Redeem"}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Recent Transactions */}
        <section style={styles.transactionsCard}>
          <div style={styles.transactionsHeader}>
            <h4 style={styles.sectionTitle}>Recent Transactions</h4>
            <div style={styles.transactionCount}>{txs.length} total</div>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Type</th>
                  <th style={styles.tableHeader}>Amount</th>
                  <th style={styles.tableHeader}>Note</th>
                </tr>
              </thead>
              <tbody>
                {txs.map((t) => (
                  <tr key={t.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{t.date}</td>
                    <td style={{...styles.tableCell, textTransform: 'capitalize'}}>{t.type}</td>
                    <td style={{...styles.tableCell, fontWeight: 600, color: '#0077B6'}}>{t.amount} CLB</td>
                    <td style={styles.tableCell}>{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Redeem Confirm Modal */}
      {showConfirm && selectedItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h4 style={styles.modalTitle}>Confirm Redeem</h4>
            <p style={styles.modalText}>
              Redeem <strong>{selectedItem.title}</strong> for <strong>{selectedItem.cost} CLB</strong>?
            </p>

            <div style={styles.modalActions}>
              <button 
                onClick={cancelRedeem} 
                style={styles.cancelButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 119, 182, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 119, 182, 0.1)';
                }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmRedeem} 
                disabled={processing} 
                style={styles.confirmButton}
                onMouseEnter={(e) => {
                  if (!processing) e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {processing ? "Processing..." : "Confirm Redeem"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
