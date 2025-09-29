import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['community', 'ngo', 'panchayat']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Community-specific fields
  communityName: {
    type: String,
    required: function() {
      return this.role === 'community';
    }
  },
  // NGO-specific fields
  ngoName: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  registrationNumber: {
    type: String,
    required: function() {
      return this.role === 'ngo';
    }
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Allow empty string
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return urlRegex.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  // Panchayat-specific fields
  panchayatName: {
    type: String,
    required: function() {
      return this.role === 'panchayat';
    }
  },
  wardBlockNumber: {
    type: String,
    required: function() {
      return this.role === 'panchayat';
    }
  },
  // Common metadata
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date
}, {
  timestamps: true
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

export default mongoose.model('User', userSchema);
