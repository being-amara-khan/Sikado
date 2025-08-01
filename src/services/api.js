import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API functions
export const authAPI = {
    // Register user
    register: async (userData) => {
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('type', userData.type);

        if (userData.profile_image) {
            formData.append('profile_image', userData.profile_image);
        }

        const response = await api.post('/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Login user
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    },
};

export const profileAPI = {
    // Update teacher profile
    updateTeacherProfile: async (userId, profileData) => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('subject', profileData.subject);
        formData.append('experience', profileData.experience);
        formData.append('availability', profileData.availability);
        formData.append('bio', profileData.bio);

        if (profileData.profile_image) {
            formData.append('profile_image', profileData.profile_image);
        }

        const response = await api.put('/teacher/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update student profile
    updateStudentProfile: async (userId, profileData) => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('grade_level', profileData.grade_level);
        formData.append('preferred_subjects', profileData.preferred_subjects);
        formData.append('bio', profileData.bio);

        if (profileData.profile_image) {
            formData.append('profile_image', profileData.profile_image);
        }

        const response = await api.put('/student/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get user profile
    getUserProfile: async (userId) => {
        const response = await api.get(`/user/${userId}`);
        return response.data;
    },
};

export const teachersAPI = {
    // Get all teachers
    getTeachers: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.subject) params.append('subject', filters.subject);

        const response = await api.get(`/teachers?${params.toString()}`);
        return response.data;
    },
};

export const contactAPI = {
    // Send contact request
    sendContactRequest: async (requestData) => {
        const response = await api.post('/contact-request', requestData);
        return response.data;
    },

    // Get teacher requests
    getTeacherRequests: async (teacherId) => {
        const response = await api.get(`/teacher/requests/${teacherId}`);
        return response.data;
    },
};

export default api; 