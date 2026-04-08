import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Leaf,
    TrendingUp,
    Shield,
    Globe,
    Users,
    Award,
    ArrowRight,
    CheckCircle,
    BarChart3,
    Zap,
    Target,
    Menu,
    X,
    Home,
    Heart,
    Building2,
    Landmark
} from 'lucide-react';

const LandingPageNew = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [activeStakeholder, setActiveStakeholder] = useState<any>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: <Leaf className="w-12 h-12" />,
            title: "Blue Carbon Tracking",
            description: "Monitor and verify mangrove restoration projects with satellite-powered NDVI technology for real-time vegetation health assessment."
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: "Carbon Credit Marketplace",
            description: "Trade verified carbon credits on our secure blockchain-powered marketplace with transparent pricing and instant transactions."
        },
        {
            icon: <Shield className="w-12 h-12" />,
            title: "Verified & Secure",
            description: "All projects undergo rigorous NGO verification and government approval ensuring authenticity and environmental impact."
        },
        {
            icon: <Globe className="w-12 h-12" />,
            title: "Satellite Monitoring",
            description: "Advanced NDVI satellite imagery provides accurate vegetation health data and carbon sequestration measurements."
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "Community Driven",
            description: "Empower local communities with direct earnings from carbon credits while promoting sustainable coastal restoration."
        },
        {
            icon: <Award className="w-12 h-12" />,
            title: "Blockchain Certified",
            description: "Immutable blockchain records ensure transparency, traceability, and trust in every carbon credit transaction."
        }
    ];

    const stats = [
        { number: "150+", label: "Active Projects", icon: <Target className="w-8 h-8" /> },
        { number: "50K+", label: "Tons CO₂ Captured", icon: <Leaf className="w-8 h-8" /> },
        { number: "45K+", label: "Carbon Credits", icon: <Award className="w-8 h-8" /> },
        { number: "1.2K+", label: "Active Traders", icon: <Users className="w-8 h-8" /> }
    ];

    const steps = [
        {
            number: "01",
            title: "Register Your Project",
            description: "Sign up and register your blue carbon restoration project with detailed location and scope information."
        },
        {
            number: "02",
            title: "Verification Process",
            description: "NGOs and government officials verify your project using satellite data and field assessments."
        },
        {
            number: "03",
            title: "Earn Carbon Credits",
            description: "Receive verified carbon credits based on measured CO₂ sequestration from your restoration efforts."
        },
        {
            number: "04",
            title: "Trade on Marketplace",
            description: "List and trade your carbon credits on our secure marketplace with corporate buyers worldwide."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white shadow-md transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/clorit-logo.png"
                                alt="CLORIT Logo"
                                className="w-12 h-12 object-contain"
                            />
                            <span className="text-2xl font-bold text-gray-900">
                                CLORIT
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="font-medium text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
                            <a href="#how-it-works" className="font-medium text-gray-700 hover:text-emerald-600 transition-colors">How It Works</a>
                            <button
                                onClick={() => setShowAboutModal(true)}
                                className="font-medium text-gray-700 hover:text-emerald-600 transition-colors bg-transparent border-none cursor-pointer"
                            >
                                About
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2"
                        >
                            {isMenuOpen ? (
                                <X className="text-gray-900" />
                            ) : (
                                <Menu className="text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-4 space-y-3">
                            <a href="#features" className="block py-2 text-gray-700 hover:text-emerald-600">Features</a>
                            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-emerald-600">How It Works</a>
                            <button
                                onClick={() => { setShowAboutModal(true); setIsMenuOpen(false); }}
                                className="block w-full text-left py-2 text-gray-700 hover:text-emerald-600 bg-transparent border-none"
                            >
                                About
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-2.5 text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-semibold"
                            >
                                Sign Up
                            </button>
                            <a
                                href="https://clafin.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold flex items-center justify-center gap-2"
                            >
                                <TrendingUp className="w-5 h-5" />
                                ClaFin Trade Platform
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-8">
                        <Zap className="w-4 h-4 text-emerald-600 mr-2" />
                        <span className="text-sm font-semibold text-emerald-700">Blockchain-Powered Carbon Credits</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Monitor, Verify & Monetize
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            Blue Carbon Ecosystems
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        The world's first comprehensive platform for mangrove restoration tracking,
                        carbon credit trading, and sustainable coastal conservation powered by satellite technology.
                    </p>

                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center"
                        >
                            Sign Up
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-3 text-emerald-600">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Powerful Features for
                            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Sustainable Impact</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive tools and technology to track, verify, and monetize your blue carbon restoration projects
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                                {feature.title === "Carbon Credit Marketplace" && (
                                    <a
                                        href="https://clafin.netlify.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                                    >
                                        Launch ClaFin Platform <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* How It Works Section */}
            < section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Four simple steps to start earning from your blue carbon restoration projects
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full">
                                    <div className="text-6xl font-bold text-emerald-100 mb-4">{step.number}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                        <ArrowRight className="w-8 h-8 text-emerald-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Role-Based Access Section */}
            < section className="py-24 bg-white" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Built for Every Stakeholder
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Customized dashboards and tools for communities, NGOs, government, and corporate buyers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                id: 'communities',
                                title: "Communities",
                                desc: "Track your restoration projects and earn carbon credits",
                                color: "from-emerald-500 to-teal-500",
                                icon: <Home className="w-6 h-6 text-white" />,
                                specs: {
                                    focus: "Direct Earnings & Ecosystem Health",
                                    features: ["Satellite monitoring dashboard", "QR-based credit issuance", "Automated payment settlement"],
                                    journey: ["Project onboarding", "Satellite health monitoring", "Credit issuance", "Automated marketplace sale"]
                                }
                            },
                            {
                                id: 'ngos',
                                title: "NGOs",
                                desc: "Verify projects and monitor environmental impact",
                                color: "from-blue-500 to-cyan-500",
                                icon: <Heart className="w-6 h-6 text-white" />,
                                specs: {
                                    focus: "Trust & Impact Verification",
                                    features: ["Multi-project audit portal", "AI-assisted verification", "Impact reporting engine"],
                                    journey: ["Application review", "Field & Satellite audit", "Certification", "Annual impact reporting"]
                                }
                            },
                            {
                                id: 'government',
                                title: "Government",
                                desc: "Oversee national carbon credit programs",
                                color: "from-purple-500 to-pink-500",
                                icon: <Landmark className="w-6 h-6 text-white" />,
                                specs: {
                                    focus: "National Registry & Compliance",
                                    features: ["Compliance management dashboard", "National carbon ledger", "Trade monitoring"],
                                    journey: ["Regulatory policy setting", "Project approval flow", "Credit issuance oversight", "Global trade reporting"]
                                }
                            },
                            {
                                id: 'corporates',
                                title: "Corporates",
                                desc: "Purchase verified carbon credits for offset",
                                color: "from-orange-500 to-red-500",
                                icon: <Building2 className="w-6 h-6 text-white" />,
                                specs: {
                                    focus: "Scalable Offset & ESG compliance",
                                    features: ["Project portfolio management", "Real-time offset data", "Certified BRSR reports"],
                                    journey: ["Demand analysis", "Credit purchase", "Retirement & Branding", "Continuous impact monitoring"]
                                }
                            }
                        ].map((role, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveStakeholder(role)}
                                className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all cursor-pointer"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-lg mb-4 group-hover:scale-110 transition-transform flex items-center justify-center shadow-lg`}>
                                    {role.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{role.title}</h3>
                                <p className="text-gray-600 mb-4">{role.desc}</p>
                                <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* ClaFin Trade Platform CTA Section */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/20 opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Marketplace Live
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                The Future of <span className="text-emerald-400">Carbon Trading</span> is Here
                            </h2>
                            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
                                Access the world's most transparent blue carbon registry. Start buying, selling, or retiring verified credits today on the ClaFin Trade Platform.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href="https://clafin.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                                >
                                    Go to Trade Platform <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-md">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-slate-800 rounded-2xl p-4 border border-white/10">
                                    <div className="w-full h-48 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 flex items-center justify-center rounded-xl overflow-hidden">
                                        <TrendingUp className="w-24 h-24 text-emerald-500 animate-pulse" />
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">CF</div>
                                            <span className="text-white font-semibold">ClaFin Trade</span>
                                        </div>
                                        <span className="text-emerald-400 font-mono">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Modal helper would go here, but we will put it in the main flow */}

            {/* CTA Section */}
            < section className="py-24 bg-gradient-to-br from-emerald-600 to-blue-600 text-white" >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Make an Impact?
                    </h2>
                    <p className="text-xl mb-10 opacity-90">
                        Join thousands of communities, NGOs, and organizations working together
                        to restore coastal ecosystems and combat climate change.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-10 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-gray-900 text-white py-16" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Footer Content */}
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        {/* About Section */}
                        <div className="md:col-span-1">
                            <div className="flex items-center space-x-3 mb-4">
                                <img
                                    src="/clorit-logo.png"
                                    alt="CLORIT Logo"
                                    className="w-12 h-12 object-contain"
                                />
                                <span className="text-2xl font-bold">CLORIT</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Coastal & Land Observation Research & Innovation Team
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Building a sustainable future through verified blue carbon credits and mangrove restoration tracking.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group">
                                        <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#how-it-works" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group">
                                        <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="/ndvi-dashboard" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group">
                                        <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group">
                                        <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group">
                                        <span className="mr-2 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h4 className="text-lg font-bold mb-4 text-white">Get In Touch</h4>
                            <div className="space-y-4">
                                <a
                                    href="mailto:clorit2025@gmail.com"
                                    className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-105 group"
                                >
                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Email Us</p>
                                        <p className="text-sm font-medium text-white">clorit2025@gmail.com</p>
                                    </div>
                                </a>

                                {/* Social Media */}
                                <div>
                                    <p className="text-sm text-gray-400 mb-3">Follow Us</p>
                                    <div className="flex gap-3">
                                        <a
                                            href="https://x.com/CLORIT_CO2?t=jSZhHYfB01gq5VoCY0TaNA&s=09"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#1DA1F2] text-gray-400 hover:text-white transition-all hover:scale-110"
                                            aria-label="Follow us on X (Twitter)"
                                            title="Twitter/X"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/clorit-396b08382/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#0077B5] text-gray-400 hover:text-white transition-all hover:scale-110"
                                            aria-label="Connect with us on LinkedIn"
                                            title="LinkedIn"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.instagram.com/clorit.2025?igsh=MXUxdHd6NGlhbG8yZw=="
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] text-gray-400 hover:text-white transition-all hover:scale-110"
                                            aria-label="Follow us on Instagram"
                                            title="Instagram"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {showAboutModal && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setShowAboutModal(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"></div>

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowAboutModal(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-emerald-100 text-gray-500 hover:text-emerald-600 rounded-full transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Left Side: Identity */}
                        <div className="md:w-2/5 bg-gradient-to-br from-emerald-600 to-blue-700 p-8 text-white flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <img src="/clorit-logo.png" alt="Logo" className="w-10 h-10 brightness-0 invert" />
                                <span className="text-xl font-bold tracking-tight">CLORIT Protocol</span>
                            </div>

                            <h3 className="text-3xl font-bold mb-6 leading-tight">
                                Bridging Nature & <br /> Digital Trust
                            </h3>

                            <div className="mt-auto space-y-6">
                                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                                    <div className="font-bold text-emerald-300 mb-1 flex items-center gap-2">
                                        <Target size={16} /> Our Mission
                                    </div>
                                    <p className="text-sm opacity-90">Accelerating global restoration through data-backed integrity.</p>
                                </div>
                                <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm">
                                    <div className="font-bold text-blue-300 mb-1 flex items-center gap-2">
                                        <Globe size={16} /> Our Vision
                                    </div>
                                    <p className="text-sm opacity-90">A world where ecological health is the primary global currency.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Narrative */}
                        <div className="md:w-3/5 p-8 md:p-12 overflow-y-auto">
                            <div className="space-y-6 text-gray-600 leading-relaxed mb-10">
                                <p>
                                    CLORIT (Coastal & Land Observation Research & Innovation Team) was born from a simple but powerful vision:
                                    to make climate action as transparent as the ecosystems we strive to protect.
                                </p>
                                <p>
                                    Traditional carbon credit systems suffer from fragmentation and delay. By integrating
                                    <span className="font-semibold text-gray-900"> Satellite NDVI Analytics</span> with
                                    <span className="font-semibold text-gray-900"> Web3 Infrastructure</span>, we provide a unified
                                    protocol where restoration is verified in real-time and value flows directly to the stewards of the land.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: <Shield className="w-5 h-5" />,
                                        title: "Radical Transparency",
                                        desc: "Every credit is linked to unique satellite coordinates and on-chain audit trails.",
                                        color: "text-emerald-600"
                                    },
                                    {
                                        icon: <Zap className="w-5 h-5" />,
                                        title: "Automated Verification",
                                        desc: "Our MRV system uses AI to analyze vegetation growth at scale.",
                                        color: "text-blue-600"
                                    },
                                    {
                                        icon: <Users className="w-5 h-5" />,
                                        title: "Community Direct-Flow",
                                        desc: "80% of protocol fees go directly to local restoration stewards.",
                                        color: "text-teal-600"
                                    }
                                ].map((pillar, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                                        <div className={`shrink-0 mt-1 ${pillar.color}`}>{pillar.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{pillar.title}</h4>
                                            <p className="text-xs text-gray-500">{pillar.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowAboutModal(false)}
                                className="w-full mt-10 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                            >
                                Continue Exploring
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeStakeholder && (
                <div
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setActiveStakeholder(null)}
                >
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
                    <div
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={`p-8 text-white bg-gradient-to-r ${activeStakeholder.color}`}>
                            <button
                                onClick={() => setActiveStakeholder(null)}
                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                    {activeStakeholder.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">{activeStakeholder.title} Solutions</h3>
                                    <p className="text-white/80">{activeStakeholder.specs.focus}</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            <section>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Features</h4>
                                <div className="grid sm:grid-cols-1 gap-3">
                                    {activeStakeholder.specs.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 italic font-medium text-gray-700">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Stakeholder Journey</h4>
                                <div className="relative space-y-6 pl-6 border-l-2 border-dashed border-gray-200 ml-3">
                                    {activeStakeholder.specs.journey.map((step: string, i: number) => (
                                        <div key={i} className="relative">
                                            <div className={`absolute -left-9 top-0 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center text-xs font-bold text-gray-400 border-gray-200`}>
                                                {i + 1}
                                            </div>
                                            <p className="text-gray-700 font-semibold">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <button
                                onClick={() => navigate('/register')}
                                className={`w-full py-4 bg-gradient-to-r ${activeStakeholder.color} text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all`}
                            >
                                Get Started as {activeStakeholder.title}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button (FAB) for Trade */}
            <div className="fixed bottom-8 right-8 z-[100] group animate-bounce-slow">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                <a
                    href="https://clafin.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 px-6 py-4 bg-gray-900 border border-white/10 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-white font-bold whitespace-nowrap"
                >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1">
                        <img
                            src="https://i.postimg.cc/kGNVHBH9/Screenshot_2026_01_03_at_8_45_35_PM_removebg_preview_(1).png"
                            alt="ClaFin"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span>Trade on ClaFin</span>
                </a>
            </div>

            <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div >
    );
};

export default LandingPageNew;
