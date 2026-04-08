import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Leaf } from "lucide-react";

const steps = [
  { id: 1, title: "Welcome", description: "Learn about our mission to restore blue carbon ecosystems." },
  { id: 2, title: "Setup Profile", description: "Add your NGO details and verify your identity." },
  { id: 3, title: "Get Started", description: "Start managing communities and projects." },
];

const WelcomeOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div style={{
      padding: '1.5rem',
      minHeight: '60vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '28rem',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '1.5rem',
          textAlign: 'center' as const
        }}
      >
        <Leaf style={{ 
          width: '3rem', 
          height: '3rem', 
          margin: '0 auto', 
          color: '#059669',
          marginBottom: '1rem'
        }} />
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>
          {steps[currentStep].title}
        </h2>
        <p style={{
          color: '#6b7280',
          marginBottom: '1.5rem'
        }}>
          {steps[currentStep].description}
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={{
                flex: 1,
                height: '0.5rem',
                borderRadius: '9999px',
                margin: '0 0.25rem',
                backgroundColor: index <= currentStep ? '#059669' : '#e5e7eb'
              }}
            />
          ))}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            style={{
              background: '#059669',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#047857';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
          >
            Next
          </button>
        ) : (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#059669',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.75rem',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              margin: '0 auto'
            }}
            onClick={() => alert("Welcome onboard!")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#047857';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
          >
            <CheckCircle style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
            Finish
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomeOnboarding;
