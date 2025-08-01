import React, { useState, useEffect } from 'react';
import { Search, Mail, Clock, BookOpen, Star, Upload, LogOut, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import './App.css';
import { authAPI, profileAPI, teachersAPI, contactAPI } from './services/api';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      if (JSON.parse(user).type === 'student') {
        setCurrentPage('explore');
      } else {
        setCurrentPage('teacher-dashboard');
      }
    }
  }, []);

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full">
          {/* Header Section with Logo */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <img
                    src="/images/logo_.png"
                    alt="Sikado Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Sikado
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect students with exceptional teachers for personalized learning experiences that transform education
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Verified Teachers</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Secure Platform</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img src="/images/student-removebg-preview.png" alt="Student" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">For Students</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Discover qualified teachers, browse detailed profiles, and connect for personalized learning experiences tailored to your needs
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <img src="/images/teacher_image-removebg-preview.png" alt="Teacher" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">For Teachers</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Showcase your expertise, manage student connections, and grow your teaching business with our comprehensive platform
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Seamless Communication</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Direct messaging and contact requests for seamless teacher-student connections with real-time notifications
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setCurrentPage('signup-student')}
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 px-8 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="flex items-center justify-center space-x-3">
                  <img src="/images/student-removebg-preview.png" alt="Student" className="w-6 h-6 object-contain" />
                  <span>Join as Student</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={() => setCurrentPage('signup-teacher')}
                className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-6 px-8 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center justify-center space-x-3">
                  <img src="/images/teacher_image-removebg-preview.png" alt="Teacher" className="w-6 h-6 object-contain" />
                  <span>Join as Teacher</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            <button
              onClick={() => setCurrentPage('login')}
              className="w-full text-gray-600 py-4 rounded-2xl font-semibold hover:bg-white/50 transition-all duration-300 group"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Already have an account?</span>
                <span className="text-purple-600 group-hover:text-purple-700 font-bold">Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Signup Component
  const SignupPage = ({ userType }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      profile_image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profile_image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = async () => {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill all fields');
        return;
      }

      setLoading(true);
      setError('');

      try {
        console.log('Attempting registration with:', { ...formData, type: userType });
        const response = await authAPI.register({
          ...formData,
          type: userType
        });
        console.log('Registration response:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setCurrentUser(response.user);

        if (userType === 'teacher') {
          setCurrentPage('teacher-setup');
        } else {
          setCurrentPage('student-setup');
        }
      } catch (error) {
        console.error('Registration error:', error);
        if (error.response) {
          setError(error.response.data?.error || 'Registration failed - Server error');
        } else if (error.request) {
          setError('Registration failed - No response from server. Please check if the backend is running.');
        } else {
          setError('Registration failed - Network error');
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src={userType === 'student' ? "/images/student-removebg-preview.png" : "/images/teacher_image-removebg-preview.png"}
                  alt={userType}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Join Sikado</h2>
            <p className="text-gray-600 mt-2">Create your account as a {userType}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image"
                />
                <label
                  htmlFor="profile-image"
                  className="flex items-center space-x-3 px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Choose Image</span>
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Login Component
  const LoginPage = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    const handleSubmit = async () => {
      if (!formData.email || !formData.password) {
        setError('Please fill all fields');
        return;
      }

      setLoading(true);
      setError('');

      try {
        console.log('Attempting login with:', formData);
        const response = await authAPI.login(formData);
        console.log('Login response:', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setCurrentUser(response.user);

        if (response.user.type === 'student') {
          setCurrentPage('explore');
        } else {
          setCurrentPage('teacher-dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
          setError(error.response.data?.error || 'Login failed - Server error');
        } else if (error.request) {
          setError('Login failed - No response from server. Please check if the backend is running.');
        } else {
          setError('Login failed - Network error');
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src="/images/logo_.png"
                  alt="Sikado Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your Sikado account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('signup-student')}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors duration-200"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Teacher Setup Component
  const TeacherSetup = () => {
    const [formData, setFormData] = useState({
      subject: '',
      experience: '',
      availability: '',
      bio: '',
      profile_image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profile_image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = async () => {
      if (!formData.subject || !formData.experience || !formData.availability) {
        setError('Please fill all required fields');
        return;
      }

      setLoading(true);
      setError('');

      try {
        await profileAPI.updateTeacherProfile(currentUser.id, formData);
        setCurrentPage('teacher-dashboard');
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Complete Your Teacher Profile</h2>
            <p className="text-gray-600 mt-2">Tell us about your teaching experience</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject(s) *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., 5"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots *
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Mon-Fri 9AM-5PM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell students about your teaching style and experience..."
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="teacher-profile-image"
                />
                <label
                  htmlFor="teacher-profile-image"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image</span>
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Student Setup Component
  const StudentSetup = () => {
    const [formData, setFormData] = useState({
      grade_level: '',
      preferred_subjects: '',
      bio: '',
      profile_image: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profile_image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = async () => {
      if (!formData.grade_level || !formData.preferred_subjects) {
        setError('Please fill all required fields');
        return;
      }

      setLoading(true);
      setError('');

      try {
        await profileAPI.updateStudentProfile(currentUser.id, formData);
        setCurrentPage('explore');
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Complete Your Student Profile</h2>
            <p className="text-gray-600 mt-2">Tell us about your learning goals</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level or Subject of Interest *
              </label>
              <input
                type="text"
                value={formData.grade_level}
                onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Grade 10, College Level"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Subjects *
              </label>
              <input
                type="text"
                value={formData.preferred_subjects}
                onChange={(e) => setFormData({ ...formData, preferred_subjects: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Availability
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Weekends, Evening"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note or Bio (Optional)
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell teachers about your learning goals..."
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="student-profile-image"
                />
                <label
                  htmlFor="student-profile-image"
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image</span>
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Explore Teachers Component
  const ExploreTeachers = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (searchTerm) filters.search = searchTerm;
        if (subjectFilter) filters.subject = subjectFilter;

        const teachersData = await teachersAPI.getTeachers(filters);
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src="/images/logo_.png" alt="Sikado" className="w-6 h-6 object-contain" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Explore Teachers</h1>
              </div>
              <p className="text-xl text-gray-600">Find the perfect teacher for your learning journey</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setCurrentUser(null);
                setCurrentPage('landing');
              }}
              className="flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Logout</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-12 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Search by Name or Subject
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search teachers..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Filter by Subject
                </label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSubjectFilter('');
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Teachers Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-6 text-xl text-gray-600 font-medium">Loading teachers...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={teacher.profile_image || 'https://images.unsplash.com/photo-1494790108755-2616c996085b?w=150&h=150&fit=crop&crop=face'}
                          alt={teacher.name}
                          className="w-20 h-20 rounded-2xl object-cover border-4 border-purple-100 group-hover:border-purple-200 transition-all duration-300"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{teacher.name}</h3>
                        <p className="text-purple-600 font-semibold">{teacher.subject}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{teacher.experience} Years Experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{teacher.availability}</span>
                      </div>
                    </div>

                    {teacher.bio && (
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{teacher.bio}</p>
                    )}

                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setCurrentPage('contact-form');
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl group-hover:shadow-purple-500/25"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span>Contact Teacher</span>
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && teachers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No teachers found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Contact Form Component
  const ContactForm = () => {
    const [formData, setFormData] = useState({
      requirements: '',
      availability: '',
      note: ''
    });

    const handleSubmit = async () => {
      if (!formData.requirements || !formData.availability) {
        setError('Please fill all required fields');
        return;
      }

      setLoading(true);
      setError('');

      try {
        await contactAPI.sendContactRequest({
          student_id: currentUser.id,
          teacher_id: selectedTeacher.id,
          student_name: currentUser.name,
          requirements: formData.requirements,
          availability: formData.availability,
          note: formData.note
        });

        alert('Contact request sent successfully! The teacher will be notified via email.');
        setCurrentPage('explore');
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to send request');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <img
                  src={selectedTeacher?.profile_image || "/images/teacher_image-removebg-preview.png"}
                  alt="Teacher"
                  className="w-8 h-8 object-contain rounded-full"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Request Teacher</h2>
            <p className="text-gray-600 mt-2">Send a request to {selectedTeacher?.name}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-sm border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Requirements *
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe what you want to learn..."
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Availability *
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Weekends, Evening"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Optional Note to Teacher
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Any additional information..."
                rows="4"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('explore')}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <span>Send Request</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Teacher Dashboard Component
  const TeacherDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchRequests();
    }, []);

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const requestsData = await contactAPI.getTeacherRequests(currentUser.id);
        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <img src="/images/logo_.png" alt="Sikado" className="w-6 h-6 object-contain" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Teacher Dashboard</h1>
              </div>
              <p className="text-xl text-gray-600">Welcome back, {currentUser?.name}</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setCurrentUser(null);
                setCurrentPage('landing');
              }}
              className="flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Logout</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{requests.length}</p>
                  <p className="text-gray-600 font-medium">Contact Requests</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">5</p>
                  <p className="text-gray-600 font-medium">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">Mathematics</p>
                  <p className="text-gray-600 font-medium">Subject</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Requests */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Recent Contact Requests</h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
                <p className="mt-6 text-xl text-gray-600 font-medium">Loading requests...</p>
              </div>
            ) : requests.length > 0 ? (
              <div className="space-y-6">
                {requests.map((request) => (
                  <div key={request.id} className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{request.student_name}</h3>
                        <p className="text-sm text-gray-600">{new Date(request.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                        {request.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Requirements:</p>
                          <p className="text-gray-600">{request.requirements}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">Availability:</p>
                          <p className="text-gray-600">{request.availability}</p>
                        </div>
                      </div>
                      {request.note && (
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Note:</p>
                            <p className="text-gray-600">{request.note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No contact requests yet</h3>
                <p className="text-gray-500">Students will appear here when they contact you.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'signup-student':
        return <SignupPage userType="student" />;
      case 'signup-teacher':
        return <SignupPage userType="teacher" />;
      case 'login':
        return <LoginPage />;
      case 'teacher-setup':
        return <TeacherSetup />;
      case 'student-setup':
        return <StudentSetup />;
      case 'explore':
        return <ExploreTeachers />;
      case 'contact-form':
        return <ContactForm />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
};

export default App;