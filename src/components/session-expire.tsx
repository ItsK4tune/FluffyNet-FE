// src/components/auth/SessionExpiredModal.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SessionExpiredModalProps {
  isOpen: boolean;
  // Không cần onClose vì chúng ta sẽ redirect
}

export const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null; // Không hiển thị gì nếu không mở
  }

  const handleRedirect = () => {
    // Chuyển hướng về login, không cần state ở đây vì người dùng chủ động click
    navigate('/login', { replace: true });
  };

  return (
    // --- Lớp Overlay ---
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      {/* --- Nội dung Modal --- */}
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all scale-100 opacity-100">
        <div className="text-5xl mb-4">⚠️</div> {/* Hoặc icon khác */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Session Expired</h2>
        <p className="text-gray-600 mb-6">
          Your session has timed out or is no longer valid. Please log in again to continue your fluffy adventure!
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full shadow hover:bg-pink-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};