import React, { useState } from 'react';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'community',
    // Community fields
    communityName: '',
    // NGO fields
    ngoName: '',
    registrationNumber: '',
    website: '',
    // Panchayat fields
    panchayatName: '',
    wardBlockNumber: '',
    // Common fields
    location: '',
    phone: ''
  });

  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '3rem',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2.5rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1rem'
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
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#374151'
    },
    input: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s'
    },
    select: {
      padding: '0.75rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s',
      backgroundColor: 'white'
    },
    roleGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.5rem'
    },
    roleOption: {
      padding: '0.75rem 0.5rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      background: 'white',
      cursor: 'pointer',
      textAlign: 'center' as const,
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s'
    },
    roleSelected: {
      borderColor: '#10b981',
      backgroundColor: '#f0fdf4',
      color: '#059669'
    },
    signupButton: {
      padding: '0.875rem 1.5rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginTop: '0.5rem'
    },
    termsText: {
      fontSize: '0.8rem',
      color: '#6b7280',
      textAlign: 'center' as const,
      lineHeight: 1.5
    },
    backButton: {
      background: 'transparent',
      border: '1px solid #d1d5db',
      color: '#6b7280',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 500,
      transition: 'all 0.2s',
      marginTop: '1.5rem'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate required fields based on role
    if (formData.role === 'community' && !formData.communityName) {
      alert('Community/Village name is required!');
      return;
    }
    if (formData.role === 'ngo' && (!formData.ngoName || !formData.registrationNumber)) {
      alert('NGO name and registration number are required!');
      return;
    }
    if (formData.role === 'panchayat' && (!formData.panchayatName || !formData.wardBlockNumber)) {
      alert('Panchayat name and ward/block number are required!');
      return;
    }

    // Create user object with role-specific data
    const userData = {
      id: Date.now().toString(), // Simple ID generation for prototype
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      location: formData.location,
      phone: formData.phone,
      createdAt: new Date().toISOString(),
      isActive: true,
      // Role-specific fields
      ...(formData.role === 'community' && { communityName: formData.communityName }),
      ...(formData.role === 'ngo' && { 
        ngoName: formData.ngoName, 
        registrationNumber: formData.registrationNumber,
        website: formData.website || null
      }),
      ...(formData.role === 'panchayat' && { 
        panchayatName: formData.panchayatName, 
        wardBlockNumber: formData.wardBlockNumber 
      })
    };

    // Store user data in localStorage (prototype implementation)
    const existingUsers = JSON.parse(localStorage.getItem('clorit_users') || '[]');
    
    // Check if email already exists
    const emailExists = existingUsers.some((user: any) => user.email === formData.email);
    if (emailExists) {
      alert('An account with this email already exists!');
      return;
    }

    // Add new user
    existingUsers.push(userData);
    localStorage.setItem('clorit_users', JSON.stringify(existingUsers));
    
    // Set current user session
    localStorage.setItem('clorit_current_user', JSON.stringify(userData));
    localStorage.setItem('clorit_auth_token', 'prototype_token_' + Date.now());

    // Success message
    const roleNames = {
      community: 'Community Member',
      ngo: 'NGO Representative',
      panchayat: 'Panchayat Official'
    };

    alert(`🎉 Welcome to CLORIT!\n\nAccount created successfully as ${roleNames[formData.role]}.\n\nYou can now access your personalized dashboard.`);
    
    // Route to appropriate dashboard based on role
    switch (formData.role) {
      case 'community':
        window.location.href = '/community-dashboard';
        break;
      case 'ngo':
        window.location.href = '/ngo-dashboard';
        break;
      case 'panchayat':
        window.location.href = '/panchayat-dashboard';
        break;
      default:
        window.location.href = '/dashboard';
    }
  };

  const handleBack = () => {
    window.location.href = '/signup-options';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>User Registration</h1>
          <p style={styles.subtitle}>Join the Blue Carbon Community</p>
        </div>

        <form style={styles.form} onSubmit={handleSignup}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Your Role</label>
            <div style={styles.roleGrid}>
              {[
                { value: 'community', label: '🏘️ Community', desc: 'Member' },
                { value: 'ngo', label: '🏢 NGO', desc: 'Verifier' },
                { value: 'panchayat', label: '🏛️ Panchayat', desc: 'Official' }
              ].map(role => (
                <button
                  key={role.value}
                  type="button"
                  style={{
                    ...styles.roleOption,
                    ...(formData.role === role.value ? styles.roleSelected : {})
                  }}
                  onClick={() => handleRoleSelect(role.value)}
                >
                  <div>{role.label}</div>
                  <div style={{fontSize: '0.7rem', color: '#6b7280'}}>{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Role-specific fields */}
          {formData.role === 'community' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Community/Village Name</label>
              <input
                type="text"
                name="communityName"
                value={formData.communityName}
                onChange={handleInputChange}
                placeholder="Enter your community name"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                required
              />
            </div>
          )}

          {formData.role === 'ngo' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>NGO/Organization Name</label>
                <input
                  type="text"
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleInputChange}
                  placeholder="Enter your NGO name"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                  onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter NGO registration ID"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                  onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  required
                />
              </div>
            </>
          )}

          {formData.role === 'panchayat' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Panchayat Name</label>
                <input
                  type="text"
                  name="panchayatName"
                  value={formData.panchayatName}
                  onChange={handleInputChange}
                  placeholder="Enter your Panchayat name"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                  onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Ward/Block Number</label>
                <input
                  type="text"
                  name="wardBlockNumber"
                  value={formData.wardBlockNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your ward or block number"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                  onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  required
                />
              </div>
            </>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State, Country"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={
                formData.role === 'ngo' || formData.role === 'panchayat' 
                  ? "Enter official contact number"
                  : "Enter your phone number"
              }
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          {/* Website field for NGO only */}
          {formData.role === 'ngo' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Website (Optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Enter NGO website"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = '#10b981')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#10b981')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.signupButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Create Account
          </button>

          <p style={styles.termsText}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>

          <button
            type="button"
            style={styles.backButton}
            onClick={handleBack}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#9ca3af';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ← Back to Signup Options
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
