import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Square, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceMessage {
  id: string;
  text: string;
  timestamp: Date;
  duration: number;
  audioUrl?: string;
}

const VoiceSupport: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: '1',
      text: 'Hello, I need help with my carbon credit application process.',
      timestamp: new Date(Date.now() - 3600000),
      duration: 15
    },
    {
      id: '2',
      text: 'Can you guide me through the project verification steps?',
      timestamp: new Date(Date.now() - 1800000),
      duration: 12
    }
  ]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Simulate adding a new voice message
    const newMessage: VoiceMessage = {
      id: Date.now().toString(),
      text: 'New voice message recorded',
      timestamp: new Date(),
      duration: recordingTime
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#166534',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Mic style={{ width: '1.25rem', height: '1.25rem', color: '#15803d' }} />
          Voice Support
        </h2>
      </div>

      {/* Recording Section */}
      <motion.div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '1rem'
        }}>
          Record Voice Message
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {isRecording && (
            <motion.div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#dc2626'
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {formatTime(recordingTime)}
            </motion.div>
          )}

          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isRecording ? '#dc2626' : '#10b981',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRecording ? (
              <Square style={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Mic style={{ width: '1.5rem', height: '1.5rem' }} />
            )}
          </motion.button>

          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            textAlign: 'center'
          }}>
            {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
          </p>
        </div>
      </motion.div>

      {/* Messages History */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '1rem'
        }}>
          Recent Voice Messages
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
              }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  margin: 0
                }}>
                  {message.text}
                </p>
                
                <button
                  style={{
                    padding: '0.25rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#10b981'
                  }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause style={{ width: '1rem', height: '1rem' }} />
                  ) : (
                    <Play style={{ width: '1rem', height: '1rem' }} />
                  )}
                </button>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                <span>{formatTimestamp(message.timestamp)}</span>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Volume2 style={{ width: '0.75rem', height: '0.75rem' }} />
                  {formatTime(message.duration)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.875rem',
            padding: '2rem'
          }}>
            No voice messages yet. Record your first message above!
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSupport;
