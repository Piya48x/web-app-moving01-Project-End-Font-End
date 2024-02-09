import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setShowAlert(true);
      setSuccessAlert(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/reset-password', { email, newPassword });
      setMessage(response.data.message);
      setShowAlert(true);
      setSuccessAlert(true);
      setTimeout(() => {
        alert("Reset Password Success Go to Login");
        navigate('/login');
      }, 1000); // 1000 milliseconds = 1 second
    } catch (error) {
      setError(error.response.data.message);
      setShowAlert(true);
      setSuccessAlert(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        {showAlert && (
          <>
            {(message || error) && (
              <div role="alert" className={`alert ${successAlert ? 'alert-success' : 'alert-error'} flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-current shrink-0 h-6 w-6 mr-2 ${successAlert ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={successAlert ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                </svg>
                <span>{message || error}</span>
              </div>
            )}
          </>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block font-medium">New Password</label>
          <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
