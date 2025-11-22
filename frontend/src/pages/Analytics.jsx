import React, { useState } from 'react';
import axios from 'axios';
import { BarChart3 } from 'lucide-react';
import BASE_URL from "../utils/constant.js"

const Analytics = () => {
  const [code, setCode] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchAnalytics = async () => {
    setError('');
    setAnalytics(null);

    if (!code) {
      setError('Please enter a short code');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/analytics/${code}`);
      setAnalytics(res.data.analytics);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <div className="flex items-center justify-center mb-6">
            <div className="bg-linear-to-r from-purple-600 to-pink-600 p-3 rounded-full">
              <BarChart3 className="text-white" size={28} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            URL Analytics
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Enter a short code to view its analytics
          </p>

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter short code"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                disabled={loading}
              />
              <button
                onClick={handleFetchAnalytics}
                disabled={loading}
                className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Loading...' : 'Fetch'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {analytics && (
            <div className="bg-linear-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
              <p className="mb-2">
                <span className="font-semibold text-gray-700">Short Code:</span> {code}
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-700">Total Clicks:</span> {analytics.totalClicked}
              </p>
              {analytics.lastClickedTime && (
                <p>
                  <span className="font-semibold text-gray-700">Last Clicked:</span>{' '}
                  {new Date(analytics.lastClickedTime).toLocaleString()}
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Analytics;
