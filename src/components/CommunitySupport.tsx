import React, { useState, useEffect } from 'react';
import {
  MessageCircle, Users, Phone, Mail, FileText, Star, Clock, CheckCircle,
  AlertCircle, Send, Search, Filter, MapPin, Calendar, User,
  Headphones, BookOpen, Video, PlusCircle
} from 'lucide-react';

// ---------------------------
// Interfaces
// ---------------------------
interface Community {
  id: string;
  name: string;
  location: string;
  contactPerson: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  projectsCount: number;
  totalArea: number;
  creditsEarned: number;
  lastActivity: string;
  supportTickets: number;
  rating: number;
}

interface SupportTicket {
  id: string;
  communityId: string;
  communityName: string;
  subject: string;
  description: string;
  category: 'technical' | 'documentation' | 'training' | 'payment' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdate: string;
  assignedTo: string;
  messages: {
    id: string;
    sender: 'community' | 'ngo';
    message: string;
    timestamp: string;
    attachments?: string[];
  }[];
}

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  type: 'webinar' | 'workshop' | 'document' | 'video';
  duration: string;
  participants: number;
  scheduledDate?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  materials: string[];
}

// ---------------------------
// Component
// ---------------------------
const CommunitySupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'communities' | 'tickets' | 'training' | 'resources'>('communities');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for communities
  const [communities] = useState<Community[]>([
    {
      id: 'COM-001',
      name: 'Green Valley Community',
      location: 'Coastal Area, West Bengal',
      contactPerson: 'Ravi Kumar',
      email: 'ravi@greenvalley.org',
      phone: '+91-9876543210',
      registrationDate: '2024-01-15',
      status: 'active',
      projectsCount: 3,
      totalArea: 45.2,
      creditsEarned: 904,
      lastActivity: '2024-09-18',
      supportTickets: 2,
      rating: 4.5
    },
    {
      id: 'COM-002',
      name: 'Forest Hills Initiative',
      location: 'Forest Hills, Karnataka',
      contactPerson: 'Priya Sharma',
      email: 'priya@foresthills.org',
      phone: '+91-9876543211',
      registrationDate: '2024-02-20',
      status: 'active',
      projectsCount: 2,
      totalArea: 28.7,
      creditsEarned: 574,
      lastActivity: '2024-09-17',
      supportTickets: 1,
      rating: 4.2
    },
    {
      id: 'COM-003',
      name: 'Rural Development Collective',
      location: 'Rajasthan',
      contactPerson: 'Ajay Singh',
      email: 'ajay@rdc.org',
      phone: '+91-9876543212',
      registrationDate: '2024-03-10',
      status: 'pending',
      projectsCount: 1,
      totalArea: 15.3,
      creditsEarned: 0,
      lastActivity: '2024-09-15',
      supportTickets: 3,
      rating: 3.8
    }
  ]);

  // Dummy data for support tickets
  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-001',
      communityId: 'COM-001',
      communityName: 'Green Valley Community',
      subject: 'Drone survey upload issue',
      description: 'Unable to upload drone survey images for our latest project.',
      category: 'technical',
      priority: 'high',
      status: 'open',
      createdDate: '2024-09-15',
      lastUpdate: '2024-09-18',
      assignedTo: 'Tech Team',
      messages: [
        {
          id: 'MSG-001',
          sender: 'community',
          message: 'Having trouble uploading drone images.',
          timestamp: '2024-09-15 10:30'
        },
        {
          id: 'MSG-002',
          sender: 'ngo',
          message: 'We are checking on this issue, please standby.',
          timestamp: '2024-09-15 12:15'
        }
      ]
    },
    {
      id: 'TCK-002',
      communityId: 'COM-003',
      communityName: 'Rural Development Collective',
      subject: 'Payment not received',
      description: 'Our credits have been approved but payment not received.',
      category: 'payment',
      priority: 'urgent',
      status: 'in_progress',
      createdDate: '2024-09-16',
      lastUpdate: '2024-09-18',
      assignedTo: 'Finance Team',
      messages: [
        {
          id: 'MSG-003',
          sender: 'community',
          message: 'Payment pending for approved credits.',
          timestamp: '2024-09-16 09:00'
        },
        {
          id: 'MSG-004',
          sender: 'ngo',
          message: 'Finance team has been informed.',
          timestamp: '2024-09-16 10:45'
        }
      ]
    }
  ]);

  // Dummy data for training
  const [trainings] = useState<TrainingProgram[]>([
    {
      id: 'TRN-001',
      title: 'Drone Survey Basics',
      description: 'Learn how to capture and upload drone imagery effectively.',
      type: 'webinar',
      duration: '2 hours',
      participants: 25,
      scheduledDate: '2024-10-05',
      status: 'upcoming',
      materials: ['link-to-guide.pdf']
    },
    {
      id: 'TRN-002',
      title: 'Impact Reporting 101',
      description: 'Basics of creating and submitting impact reports.',
      type: 'workshop',
      duration: '3 hours',
      participants: 18,
      status: 'completed',
      materials: ['impact-reporting-guide.pdf', 'sample-report.docx']
    }
  ]);

  // ---------------------------
  // Filter & Search
  // ---------------------------
  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
          Community Support
        </h1>

        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('communities')}
            className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'communities' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Communities
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'tickets' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Support Tickets
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'training' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Training
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 rounded-lg text-sm ${activeTab === 'resources' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Resources
          </button>
        </div>
      </div>

      {/* --------------------------- */}
      {/* Communities Tab */}
      {/* --------------------------- */}
      {activeTab === 'communities' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search communities by name or location..."
              className="border rounded-lg px-4 py-2 w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{community.name}</h3>
                  <Badge status={community.status} />
                </div>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-green-500" /> {community.location}
                </p>
                <p className="text-sm mt-1">Projects: {community.projectsCount} | Area: {community.totalArea} ha</p>
                <p className="text-sm">Credits Earned: {community.creditsEarned}</p>
                <div className="mt-2 flex justify-between items-center">
                  <button className="text-green-600 text-sm hover:underline">View Details</button>
                  <Star className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --------------------------- */}
      {/* Tickets Tab */}
      {/* --------------------------- */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {tickets.map(ticket => (
            <div key={ticket.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{ticket.subject}</h3>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  ticket.priority === 'urgent' ? 'bg-red-500 text-white'
                  : ticket.priority === 'high' ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                }`}>
                  {ticket.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-sm mt-1 text-gray-600">{ticket.description}</p>
              <p className="text-xs mt-1">Community: {ticket.communityName}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Status: {ticket.status}</span>
                <span>Last Updated: {ticket.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------- */}
      {/* Training Tab */}
      {/* --------------------------- */}
      {activeTab === 'training' && (
        <div className="space-y-4">
          {trainings.map(training => (
            <div key={training.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <div className="flex justify-between">
                <h3 className="font-bold">{training.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  training.status === 'upcoming' ? 'bg-green-100 text-green-600'
                  : training.status === 'ongoing' ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-600'
                }`}>
                  {training.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{training.description}</p>
              <p className="text-xs mt-1">Duration: {training.duration}</p>
              <p className="text-xs">Participants: {training.participants}</p>
            </div>
          ))}
        </div>
      )}

      {/* --------------------------- */}
      {/* Resources Tab */}
      {/* --------------------------- */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Guidelines & Documents</h3>
            <ul className="list-disc ml-4 text-sm text-gray-700">
              <li>Drone Survey Guide - PDF</li>
              <li>Impact Reporting Template - DOCX</li>
              <li>Community Engagement Handbook - PDF</li>
            </ul>
          </div>

          <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg mb-2">Video Tutorials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 h-32 flex items-center justify-center">Video 1</div>
              <div className="bg-gray-200 h-32 flex items-center justify-center">Video 2</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------
// Helper Component
// ---------------------------
const Badge: React.FC<{ status: string }> = ({ status }) => {
  const colors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export default CommunitySupport;
