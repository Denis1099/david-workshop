import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../../services/adminService';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await AdminService.login(username, password);
      if (user) {
        navigate('/admin');
      } else {
        setError('שם משתמש או סיסמה שגויים');
      }
    } catch (error) {
      setError('שגיאה בהתחברות. נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center typo-section-title text-text-primary">
            כניסה לפאנל ניהול
          </h2>
          <p className="mt-2 text-center typo-body-regular text-text-primary opacity-80">
            הזן את פרטי ההתחברות שלך
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block typo-body-regular text-text-primary mb-2">
                שם משתמש
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm typo-body-regular focus:outline-none focus:ring-cta focus:border-cta"
                placeholder="הכנס שם משתמש"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block typo-body-regular text-text-primary mb-2">
                סיסמה
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm typo-body-regular focus:outline-none focus:ring-cta focus:border-cta"
                placeholder="הכנס סיסמה"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded typo-body-small">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm typo-button-cta text-white bg-cta hover:bg-cta/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cta disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'מתחבר...' : 'כניסה'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="typo-body-small text-text-primary opacity-60">
            פרטי התחברות לדוגמה: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;