import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'antd/dist/reset.css'; // Import this before other antd CSS to reset default styles
import Login from './component/Login';
import Registration from './component/Registration';
import Dashboard from './component/Dashboard';
import Dbsettings from './component/Dbsettings';
import Sidebar from './component/Sidebar';
import Profile from './component/Profile';
import Test from './component/test';
import Createtest from './component/CreateTest';
import Publish from './component/publish';
import Quiz from './component/quiz'; // Import Quiz component

function App() {
  const location = useLocation(); // Get the current route
  // Check if the current route is either /login or /register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith("/test");

  return (
    <div>
      {/*!isAuthPage && <Header />*/}
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        {/* Conditionally render Sidebar if not on login or register page */}
        {!isAuthPage && <Sidebar />}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0px' }}>
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dbsettings" element={<Dbsettings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/createtest" element={<Createtest />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/quiz" element={<Quiz />} /> {/* New route for the Quiz page */}
    </Routes>
  );
}

function Header() {
  return (
    <div style={{
      height: 60,
      background: 'black',     // Keep the background black
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px',
      fontFamily: 'Arial, sans-serif',
      position: 'fixed',
      top: 0,
      width: '100%',
      fontSize: '25px',
      fontWeight: 'bold',
      zIndex: 1000
    }}>
      <span style={{ color: 'white' }}>VDart</span>
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
