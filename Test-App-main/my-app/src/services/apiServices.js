import axios from 'axios';

// Define the API base URL
export const API_URL = 'http://localhost:8000/api/';

// Create an Axios instance
const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials in requests if needed
});

// Function to get CSRF token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Request interceptor to add the access token and CSRF token to headers
apiInstance.interceptors.request.use(
  (config) => {
    // Get access token from local storage
    const accessToken = localStorage.getItem('access_token');
    
    // If there is an access token, add it to the headers
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Add CSRF token if present
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API service functions

// Corrected: Use apiInstance instead of axios for consistency
export const submitQuestions = async (testTitle,testIntroduction,questions) => {
  try {
    const response = await apiInstance.post('submit-questions/', { testTitle,testIntroduction,questions }); // Changed to apiInstance
    alert("questions submited successfully");
    return response.data;
  } catch (error) {
    console.error('Error submitting questions:', error);
    throw error;
  }
};

export const GetQuestions = async (testID) => {
  try {
    // Using a dynamic URL with the testID
    const response = await apiInstance.post(`get-question/${testID}/`,testID);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; // Propagate the error to be handled by the calling function
  }
};

export const submitQuestions2 = async (testTitle,testIntroduction,questions) => {
  try {
    const response = await apiInstance.post('submit-questions2/', { testTitle,testIntroduction,questions }); // Changed to apiInstance
    alert("questions submited successfully");
    return response.data;
  } catch (error) {
    console.error('Error submitting questions:', error);
    throw error;
  }
};

export const registerUser = (userData) => {
  return apiInstance.post('register/', userData);
};

export const loginUser = (credentials) => {
  return apiInstance.post('login/', credentials);
};

export const getDashboardData = () => {
  return apiInstance.get('dashboard/');
};

export const uploadProfileImage = (formData) => {
  return apiInstance.post('upload-profile-image/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProfileData = async () => {
  return await apiInstance.get('profile/');
};

export const SubmitAnswer = async (answerData) => {
  return await axios.post(`/api/submit-answer/`, answerData);
};
