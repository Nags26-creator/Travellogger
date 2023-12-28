import React, { useState, useEffect } from 'react';

function App() {
  const [travelLogs, setTravelLogs] = useState([]);
  const [newLog, setNewLog] = useState({ place: '', date: '' });
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetch('http://localhost:3001/api/logs')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          return response.json();
        })
        .then(setTravelLogs)
        .catch(error => {
          console.error('Error fetching travel logs:', error);
          setError(error.message);
        });
    }
  }, [showHistory]);

  const handleInputChange = (e) => {
    setNewLog({ ...newLog, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    fetch('http://localhost:3001/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLog),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to upload: ${response.status}`);
        }
        return response.json();
      })
      .then(newLog => {
        setTravelLogs(prevLogs => [...prevLogs, newLog]);
        setNewLog({ place: '', date: '' });
        setError('');
      })
      .catch(error => {
        console.error('Error uploading travel log:', error);
        setError(error.message);
      });
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  return (
    <div>
      <h1>Travel Logger</h1>
      <div>
        <label>Place: </label>
        <input type="text" name="place" value={newLog.place} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date: </label>
        <input type="text" name="date" value={newLog.date} onChange={handleInputChange} />
      </div>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleHistoryClick}>History</button>
      {showHistory && (
        <div>
          {travelLogs.length ? (
            travelLogs.map((log, index) => (
              <div key={index}>
                <p>Place: {log.place}</p>
                <p>Date: {log.date}</p>
              </div>
            ))
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
