import React from 'react';

const RoleBasedSignupDemo = () => {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '2rem'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '3rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    description: {
      fontSize: '1rem',
      color: '#4b5563',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: 1.6
    },
    rolesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: '3rem'
    },
    roleCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    roleIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      display: 'block'
    },
    roleName: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    roleDescription: {
      color: '#6b7280',
      marginBottom: '1.5rem',
      lineHeight: 1.5
    },
    fieldsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    fieldItem: {
      padding: '0.5rem 0',
      borderBottom: '1px solid #f3f4f6',
      fontSize: '0.9rem',
      color: '#4b5563',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    requiredBadge: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      borderRadius: '4px',
      fontWeight: 500
    },
    optionalBadge: {
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      borderRadius: '4px',
      fontWeight: 500
    },
    actionSection: {
      textAlign: 'center' as const,
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    actionTitle: {
      fontSize: '1.8rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap' as const,
      marginTop: '1.5rem'
    },
    primaryButton: {
      padding: '0.875rem 2rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textDecoration: 'none',
      display: 'inline-block'
    },
    secondaryButton: {
      padding: '0.875rem 2rem',
      background: 'transparent',
      color: '#059669',
      border: '2px solid #10b981',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      textDecoration: 'none',
      display: 'inline-block'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      maxWidth: '900px',
      margin: '2rem auto 0',
    },
    featureCard: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center' as const
    },
    featureIcon: {
      fontSize: '2rem',
      marginBottom: '1rem',
      display: 'block'
    },
    featureTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    featureDescription: {
      fontSize: '0.9rem',
      color: '#6b7280',
      lineHeight: 1.4
    }
  };

  const roles = [
    {
      icon: '🏘️',
      name: 'Community Member',
      description: 'Local communities engaged in blue carbon activities and environmental conservation',
      color: '#10b981',
      fields: [
        { name: 'Full Name', required: true },
        { name: 'Email Address', required: true },
        { name: 'Community/Village Name', required: true },
        { name: 'Location (City, State, Country)', required: true },
        { name: 'Phone Number', required: true },
        { name: 'Password & Confirmation', required: true }
      ]
    },
    {
      icon: '🏢',
      name: 'NGO Representative',
      description: 'Non-governmental organizations verifying and supporting blue carbon projects',
      color: '#3b82f6',
      fields: [
        { name: 'Full Name', required: true },
        { name: 'Email Address', required: true },
        { name: 'NGO/Organization Name', required: true },
        { name: 'Registration Number', required: true },
        { name: 'Location (City, State, Country)', required: true },
        { name: 'Official Phone Number', required: true },
        { name: 'Website URL', required: false },
        { name: 'Password & Confirmation', required: true }
      ]
    },
    {
      icon: '🏛️',
      name: 'Panchayat Official',
      description: 'Local government representatives managing district-level blue carbon initiatives',
      color: '#8b5cf6',
      fields: [
        { name: 'Full Name', required: true },
        { name: 'Email Address', required: true },
        { name: 'Panchayat Name', required: true },
        { name: 'Ward/Block Number', required: true },
        { name: 'Location (City, State, Country)', required: true },
        { name: 'Official Phone Number', required: true },
        { name: 'Password & Confirmation', required: true }
      ]
    }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Role-Based Experience',
      description: 'Customized forms and dashboards tailored to each user type'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Optimized for desktop, tablet, and mobile devices'
    },
    {
      icon: '🔒',
      title: 'Secure Authentication',
      description: 'Prototype implementation with localStorage for demonstration'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Role-specific data visualization and progress tracking'
    }
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🌱 CLORIT Role-Based Signup System</h1>
        <p style={styles.subtitle}>Blue Carbon Marketplace Authentication</p>
        <p style={styles.description}>
          A comprehensive role-based authentication system designed for the blue carbon ecosystem, 
          featuring customized signup forms and dashboards for Community Members, NGOs, and Panchayat Officials.
        </p>
      </div>

      <div style={styles.rolesGrid}>
        {roles.map((role, index) => (
          <div
            key={index}
            style={{
              ...styles.roleCard,
              borderColor: role.color + '20'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderColor = role.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <span style={styles.roleIcon}>{role.icon}</span>
            <h3 style={{ ...styles.roleName, color: role.color }}>{role.name}</h3>
            <p style={styles.roleDescription}>{role.description}</p>
            
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
              Registration Fields:
            </h4>
            <ul style={styles.fieldsList}>
              {role.fields.map((field, fieldIndex) => (
                <li key={fieldIndex} style={styles.fieldItem}>
                  <span>{field.name}</span>
                  <span style={field.required ? styles.requiredBadge : styles.optionalBadge}>
                    {field.required ? 'Required' : 'Optional'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={styles.actionSection}>
        <h2 style={styles.actionTitle}>Try the Role-Based Signup System</h2>
        <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
          Experience the complete authentication flow with role-specific forms and dashboards
        </p>
        <p style={{ color: '#4b5563', fontSize: '0.9rem', fontStyle: 'italic' }}>
          🎭 Prototype Mode: Data is stored locally in your browser for demonstration
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryButton}
            onClick={() => handleNavigation('/signup-options')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🚀 Start Registration
          </button>
          
          <button
            style={styles.secondaryButton}
            onClick={() => handleNavigation('/user-login')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#059669';
            }}
          >
            🔑 Demo Login
          </button>
        </div>

        <div style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <span style={styles.featureIcon}>{feature.icon}</span>
              <h4 style={styles.featureTitle}>{feature.title}</h4>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleBasedSignupDemo;
