import React from "react";
import { Trophy, Award, Star } from "lucide-react";
import { CurrencyUtils } from "../utils/currency";

interface Recognition {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const recognitions: Recognition[] = [
  {
    id: 1,
    title: "Top Performing Panchayat",
    subtitle: "Greenfield Panchayat",
    value: "1200 CCTs",
    icon: <Trophy style={{ width: '2.5rem', height: '2.5rem' }} />,
    bgColor: "#f0fdf4",
    iconColor: "#eab308",
  },
  {
    id: 2,
    title: "Most Verified Projects",
    subtitle: "Coastal Region",
    value: "15 Projects",
    icon: <Award style={{ width: '2.5rem', height: '2.5rem' }} />,
    bgColor: "#eff6ff",
    iconColor: "#3b82f6",
  },
  {
    id: 3,
    title: "Community Engagement",
    subtitle: "Hilltop Panchayat",
    value: "95% Participation",
    icon: <Star style={{ width: '2.5rem', height: '2.5rem' }} />,
    bgColor: "#fefce8",
    iconColor: "#f97316",
  },
];

const PerformanceRecognition: React.FC = () => {
  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#166534',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <Trophy style={{ width: '1.25rem', height: '1.25rem', color: '#15803d' }} />
        Performance & Recognition
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {recognitions.map((recog) => (
          <div
            key={recog.id}
            style={{
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              backgroundColor: recog.bgColor,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid #e5e7eb'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              marginBottom: '0.75rem',
              color: recog.iconColor
            }}>
              {recog.icon}
            </div>
            <h3 style={{
              fontWeight: '600',
              fontSize: '1.125rem',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              {recog.title}
            </h3>
            <p style={{
              color: '#374151',
              fontSize: '0.875rem',
              marginBottom: '0.25rem'
            }}>
              {recog.subtitle}
            </p>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 'bold',
              color: '#111827'
            }}>
              {recog.value}
              {CurrencyUtils.shouldShowConversion(recog.value, recog.title) && (
                <span style={CurrencyUtils.getConversionStyle()}>
                  {CurrencyUtils.getConversionString(recog.value, recog.title)}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceRecognition;
