import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAdmin();
  }, []);

  const verifyAdmin = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login', { state: { returnTo: window.location.pathname } });
      return;
    }

    try {
      const res = await fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        navigate('/admin/login', { state: { returnTo: window.location.pathname } });
        return;
      }

      setIsVerified(true);
    } catch (error) {
      navigate('/admin/login', { state: { returnTo: window.location.pathname } });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <img src="/provoid-logo.png" alt="PROVOID" className="h-16 w-auto object-contain animate-pulse" />
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return children;
};

export default AdminProtected;
