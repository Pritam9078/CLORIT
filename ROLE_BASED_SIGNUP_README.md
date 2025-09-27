# 🌱 CLORIT - Role-Based Signup System (Frontend Prototype)

A comprehensive role-based authentication and dashboard system for the CLORIT blue carbon marketplace platform, designed to serve three distinct user types: Community Members, NGOs, and Panchayat Officials.

## 🎯 Overview

This frontend prototype demonstrates a complete role-based signup and authentication system with customized forms, dashboard experiences, and data visualization for each user type in the blue carbon ecosystem.

## 🎭 User Roles & Features

### 1. 🏘️ Community Members
**Purpose**: Local communities engaged in blue carbon activities

**Signup Form Fields**:
- Full Name
- Email Address  
- Community/Village Name
- Location (City, State, Country)
- Phone Number
- Password & Confirmation

**Dashboard Features**:
- Personal carbon impact tracking
- Tree planting progress
- Earnings from carbon credits
- Community project participation
- Local environmental metrics

---

### 2. 🏢 NGO Representatives
**Purpose**: Non-governmental organizations verifying and supporting blue carbon projects

**Signup Form Fields**:
- Full Name
- Email Address
- NGO/Organization Name
- Registration Number (Official NGO ID)
- Location (City, State, Country)
- Phone Number (Official contact)
- Website (Optional)
- Password & Confirmation

**Dashboard Features**:
- Project verification status
- Multiple community oversight
- Research and monitoring data
- Educational program metrics
- Funding and grant tracking

---

### 3. 🏛️ Panchayat Officials
**Purpose**: Local government representatives managing district-level blue carbon initiatives

**Signup Form Fields**:
- Full Name
- Email Address
- Panchayat Name
- Ward/Block Number
- Location (City, State, Country)
- Phone Number (Official contact)
- Password & Confirmation

**Dashboard Features**:
- District-wide project management
- Policy implementation tracking
- Multi-community coordination
- Government reporting metrics
- Resource allocation overview

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/Pritam9078/CLORIT.git
cd CLORIT

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎮 Demo Usage

### Option 1: Use Sample Accounts
Pre-configured demo accounts are available for immediate testing:

- **Community**: rajesh@community.com
- **NGO**: priya@greenngo.org  
- **Panchayat**: lakshmi@panchayat.gov.in
- **Password**: any (prototype accepts any password)

### Option 2: Create New Account
1. Navigate to `/signup-options`
2. Choose "User Registration"
3. Select your role (Community/NGO/Panchayat)
4. Fill in the role-specific form fields
5. Submit to create account and access dashboard

## 📱 Application Flow

```
Landing Page
    ↓
Signup Options
    ↓
User Registration → Role Selection → Role-Specific Form → Dashboard
    ↓                    ↓                ↓                    ↓
Community           NGO            Panchayat        Role-Based Dashboard
    ↓                    ↓                ↓                    ↓
Community Form      NGO Form       Panchayat Form      Analytics & Features
```

## 🏗️ Technical Architecture

### Frontend Structure
```
src/
├── components/
│   ├── UserSignup.tsx          # Main signup component with role switching
│   ├── UserLogin.tsx           # Authentication with role detection
│   ├── SignupOptions.tsx       # Entry point for registration
│   └── shared/
│       └── AnalyticsWidget.tsx # Role-based analytics dashboard
├── utils/
│   └── api.ts                  # Prototype authentication utilities
└── ...
```

### Key Technologies
- **React 18** with TypeScript
- **Vite** for build tooling
- **Chart.js** for data visualization
- **LocalStorage** for prototype data persistence
- **Tailwind CSS** for styling

### Prototype Authentication
The system uses localStorage-based authentication for demonstration:

```typescript
// User data structure
interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'community' | 'ngo' | 'panchayat';
  location: string;
  phone: string;
  // Role-specific fields based on selection
}

// Authentication flows
prototypeAuth.login(credentials)    // Login existing user
prototypeAuth.getCurrentUser()      // Get logged-in user
prototypeAuth.logout()              // Clear session
```

## 🎨 Role-Specific UI Features

### Dynamic Form Rendering
The signup form adapts based on selected role:

```typescript
// Community-specific fields
{formData.role === 'community' && (
  <input name="communityName" placeholder="Enter your community name" />
)}

// NGO-specific fields  
{formData.role === 'ngo' && (
  <>
    <input name="ngoName" placeholder="Enter your NGO name" />
    <input name="registrationNumber" placeholder="Enter NGO registration ID" />
    <input name="website" placeholder="Enter NGO website" optional />
  </>
)}

// Panchayat-specific fields
{formData.role === 'panchayat' && (
  <>
    <input name="panchayatName" placeholder="Enter your Panchayat name" />
    <input name="wardBlockNumber" placeholder="Enter your ward or block number" />
  </>
)}
```

### Role-Based Dashboard Data
Each role sees customized analytics:

```typescript
const mockStats = {
  community: {
    carbonCaptured: 25.3,
    treesPlanted: 187,
    earnings: 12500,
    activeProjects: 3
  },
  ngo: {
    carbonCaptured: 156.8,
    treesPlanted: 1240,
    earnings: 89500,
    activeProjects: 15
  },
  panchayat: {
    carbonCaptured: 312.7,
    treesPlanted: 2680,
    earnings: 198500,
    activeProjects: 28
  }
};
```

## 📊 Data Visualization

The AnalyticsWidget provides role-specific data visualization:

- **Line Charts**: Trend analysis for carbon capture, tree planting, earnings
- **Doughnut Charts**: Project distribution by type
- **Metric Cards**: Key performance indicators with growth rates
- **Quick Stats**: Achievement badges and progress indicators

## 🔐 Security Considerations

**Current Prototype Implementation**:
- LocalStorage-based session management
- Client-side validation only
- Mock password verification

**Production Recommendations**:
- JWT-based authentication
- Password hashing (bcrypt)
- Server-side validation
- HTTPS enforcement
- Rate limiting
- CSRF protection

## 🚦 Validation Rules

### Form Validation
- **Email**: Must be valid format and unique
- **Password**: Minimum 6 characters (customizable)
- **Phone**: 10-15 digits
- **Required Fields**: Role-specific field validation
- **Website**: Valid URL format (NGO only, optional)

### Business Logic
- **Role Selection**: Determines form fields and dashboard access
- **Email Uniqueness**: Prevents duplicate accounts
- **Data Persistence**: User data saved locally for demo
- **Session Management**: Automatic dashboard redirection

## 🎯 Future Enhancements

### Authentication
- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] OAuth integration (Google, GitHub)
- [ ] Role-based access control middleware

### User Experience
- [ ] Progressive form validation
- [ ] Auto-save draft functionality
- [ ] Mobile-responsive optimization
- [ ] Accessibility improvements
- [ ] Multi-language support

### Dashboard Features
- [ ] Real-time data updates
- [ ] Export functionality
- [ ] Advanced filtering
- [ ] Collaborative features
- [ ] Notification system

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Pritam9078/CLORIT/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Pritam9078/CLORIT/discussions)
- **Documentation**: [Wiki](https://github.com/Pritam9078/CLORIT/wiki)

## 🙏 Acknowledgments

- Blue carbon ecosystem research community
- Open source contributors
- Environmental conservation organizations
- Local communities pioneering blue carbon projects

---

**Built with ❤️ for environmental sustainability and community empowerment**
