import React, { useState } from 'react';
import axios from 'axios';
import { Link, Copy, ExternalLink, Check } from 'lucide-react';
import BASE_URL from "../utils/constant.js"

const Shortner = () => {
const [url, setUrl] = useState('');
const [customCode, setCustomCode] = useState('');
const [shortCode, setShortCode] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [copied, setCopied] = useState(false);

const handleShorten = async () => {
setError('');
setShortCode('');

if (!url) {
  setError('Please enter a URL');
  return;
}

setLoading(true);

try {
  const res = await axios.post(`${BASE_URL}/shorten`, {
    redirectUrl: url,
    customCode: customCode || undefined, 
  });

  const code =
    res.data.data?.uniqueCode ||
    res.data.code ||
    res.data.shortCode ||
    res.data.uniqueCode;

  setShortCode(code);
} catch (err) {
  if (err.response) {
    setError(err.response.data.message || 'Failed to shorten URL');
  } else {
    setError('Error connecting to server');
  }
} finally {
  setLoading(false);
}

};

const copyToClipboard = () => {
const shortUrl = `${BASE_URL}/${shortCode}`;
navigator.clipboard.writeText(shortUrl);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
};

const getShortUrl = () => `${BASE_URL}/${shortCode}`;

const handleKeyPress = (e) => {
if (e.key === 'Enter') handleShorten();
};

return ( <div className="h-[89vh] bg-linear-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4"> <div className="w-full max-w-2xl"> <div className="bg-white rounded-2xl shadow-2xl p-8"> <div className="flex items-center justify-center mb-6"> <div className="bg-linear-to-r from-purple-600 to-pink-600 p-3 rounded-full"> <Link className="text-white" size={32} /> </div> </div>

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
        URL Shortener
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Transform long URLs into short, shareable links
      </p>
      <div className="mb-6 flex flex-col gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your long URL here..."
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          disabled={loading}
        />

        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="Enter custom code (optional)"
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
          disabled={loading}
        />

        <button
          onClick={handleShorten}
          disabled={loading}
          className="px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {shortCode && (
        <div className="bg-linear-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-purple-700 break-all">
              {getShortUrl()}
            </div>

            <button
              onClick={copyToClipboard}
              className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? <Check className="text-green-500" size={20} /> : <Copy size={20} />}
            </button>

            <a
              href={getShortUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      )}
    </div>

    <div className="text-center text-white text-sm mt-4">
      <p>Your link is secure and ready to share</p>
    </div>
  </div>
</div>

);
};

export default Shortner;
