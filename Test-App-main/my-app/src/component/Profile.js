/*import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData, uploadProfileImage } from '../services/apiServices';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import defaultProfileImage from './profile-image-url.jpg'; // Your default image path

const Dbsettings = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setMessage(response.data.message);
        if (response.data.profileImage) {
          setProfileImage("http://127.0.0.1:8000/" + response.data.profileImage);
        } else {
          setProfileImage(defaultProfileImage);
        }
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/dashboard')
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL('image/jpeg'));
  };

  const handleUpload = async () => {
    if (croppedImage) {
      const formData = new FormData();
      formData.append('profile_image', dataURLtoBlob(croppedImage), 'profile_image.jpg');

      try {
        await uploadProfileImage(formData);
        const response = await getDashboardData();
        setProfileImage("http://127.0.0.1:8000/" + response.data.profileImage || defaultProfileImage);
        setSelectedFile(null);
        setCroppedImage(null);
      } catch (error) {
        setError('Failed to upload image.');
      }
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const [header, data] = dataURL.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
  };
  

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2>Welcome to your dashboard!</h2>
        <h3>{message || 'Loading...'}</h3>
        {error && <p className="error">{error}</p>}

        <div className="profile-section">
          <input
            type="file"
            id="profile-image-input"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="profile-image-input" className="profile-image-label">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </label>

          {selectedFile && (
            <div className="cropper-container">
              <Cropper
                src={selectedFile}
                style={{ height: 400, width: '100%' }}
                aspectRatio={1}
                viewMode={1}
                guides={false}
                ref={cropperRef}
              />
              <button className="crop-button" onClick={handleCrop}>Crop</button>
            </div>
          )}

          {croppedImage && <button className="upload-button" onClick={handleUpload}>Upload</button>}
        </div>
      </div>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
        }


        .dashboard-wrapper {
          display: flex;
          height: 100vh;
        }

        .dashboard-container {
          background: #ffffff;
          padding: 20px;
          flex-grow: 1;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .dashboard-container h2 {
          margin-bottom: 20px;
        }

        .profile-section {
          margin: 20px 0;
          text-align: center;
        }

        .profile-image-label {
          cursor: pointer;
          display: inline-block;
        }

        .profile-image {
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
          border: 2px solid #000000;
          transition: border-color 0.3s ease;
        }

        .profile-image:hover {
          border-color: #fafbfc;
        }

        .cropper-container {
          margin-top: 10px;
        }

        .crop-button, .upload-button {
          background-color: #007bff;
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .crop-button:hover, .upload-button:hover {
          background-color: #000000;
        }

        .logout-button {
          background-color: #dc3545;
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }

        .logout-button:hover {
          background-color: #c82333;
        }

        .error {
          color: #dc3545;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dbsettings;*/
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/apiServices';
import defaultProfileImage from './profile-image-url.jpg'; // Your default image path
const Profile = () => {
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getDashboardData(); // Fetch data using getDashboardData
        setMessage(response.data.message);
        console.log(message);
        setEmail(response.data.email);
        if (response.data.profileImage) {
          setProfileImage("http://127.0.0.1:8000/" + response.data.profileImage);
        }
      } catch (error) {
        setError('Failed to load profile data.');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error && <p className="error">{error}</p>}

      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h3>{message || 'Username'}</h3>
        <p>{email || 'Email'}</p>
      </div>

      <style jsx>{`
        .profile-container {
          justify-content: center;
          background: #ffffff;
          position: relative;
          align-items: center;
          padding: 16px;
          height: 100vh;
          margin-left: 225px;
          flex-grow: 1;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .profile-section {
          margin: 20px 0;
        }

        .profile-image {
          border-radius: 50%;
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
          border: 2px solid #000;
        }

        .profile-section h3 {
          margin-top: 10px;
        }

        .error {
          color: #dc3545;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
