import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/apiServices';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import defaultProfileImage from './profile-image-url.jpg'; // Adjust the path as needed
import "antd/dist/reset.css";
import { DashboardOutlined, UserOutlined, SettingOutlined, LogoutOutlined, FormOutlined, CloudUploadOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setMessage(response.data.message);
        if (response.data.profileImage) {
          setProfileImage(`http://127.0.0.1:8000/${response.data.profileImage}`);
        } else {
          setProfileImage(defaultProfileImage);
        }
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };
    fetchData();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Remove token from local storage
    localStorage.removeItem('testId');
    // navigate('/login'); // Redirect to login page
  };

  const sidebarItems = [
    { label: ' Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
    { label: ' Quiz', icon: <FormOutlined /> ,path: '/createtest' },
    { label: ' Test', icon: <FormOutlined /> ,path: '/test' },
    { label: ' Publish', icon: <CloudUploadOutlined />, path: '/publish' }, //
    { label: ' Profile', icon: <UserOutlined />, path: '/profile' },
    { label: ' Settings', icon: <SettingOutlined />, path: '/dbsettings' },
    { label: ' Logout', icon: <LogoutOutlined />, onClick: handleLogout, path:'/login' }, // Update logout item
  ];

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <h3>{message || 'Loading...'}</h3>
        <label htmlFor="profile-image-input" className="profile-image-label">
          <img src={profileImage || defaultProfileImage} alt="Profile" className="profile-image" />
        </label>
      </div>
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path || '#'} // Fallback to # if path is not defined
              onClick={item.onClick}
              className={location.pathname === item.path ? 'active' : ''}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .sidebar {
          width: 225px;
          height: 100%;
          background-color: #dfe6e9;
          padding: 25px;
          position: fixed;
        }

        .sidebar .profile-section {
          text-align: center;
          margin-bottom: 20px;
        }

        .sidebar .profile-image-label {
          cursor: pointer;
        }

        .sidebar .profile-image {
          border-radius: 50%;
          width: 80px;
          height: 80px;
        }

        .sidebar ul {
          margin-top: 0;
          margin-bottom: 14em;
          list-style-type: none;
          padding: 0;
        }

        .sidebar ul li {
          margin: 15px 0;
        }

        .sidebar ul li a {
          text-decoration: none;
          color: #333;
          font-size: 18px;
          display: block;
          padding: 10px;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .sidebar ul li a.active, .sidebar ul li a:hover {
          background-color: #2f4f4f;
          color: white;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
