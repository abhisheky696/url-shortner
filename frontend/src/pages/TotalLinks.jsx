import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink } from 'lucide-react';
import BASE_URL from "../utils/constant.js"

const TotalLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${BASE_URL}/getAllLinks`);
        console.log(res.data.data)    
        setLinks(res.data.data)    
      } catch (err) {
        setError('Failed to fetch links');
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="bg-linear-to-br from-purple-600 via-pink-500 to-red-500 p-6 shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">All Shortened Links</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && links.length === 0 && <p className="text-gray-600">No links found.</p>}

      <ul className="space-y-3">
        {links.map((link) => {
          const shortUrl = `${BASE_URL}/${link.uniqueCode}`;
          return (
            <li
              key={link._id}
              className="flex justify-between items-center bg-purple-50 px-4 py-3 rounded-lg"
            >
              <div className="flex-1 truncate">
                <p className="font-mono text-purple-700 truncate">{`${BASE_URL}/${link.uniqueCode}`}</p>
                <p className="text-gray-700 truncate">{link.redirectUrl}</p>
              </div>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 p-2 bg-white border rounded-lg hover:bg-gray-50 transition"
              >
                <ExternalLink className="text-gray-700" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TotalLinks;
