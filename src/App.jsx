import React, { useState } from 'react';

    function App() {
      const [loggedIn, setLoggedIn] = useState(false);
      const [username, setUsername] = useState('');
      const [loginError, setLoginError] = useState('');
      const [activeTab, setActiveTab] = useState('dashboard');

      const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const enteredUsername = form.username.value;
        const enteredPassword = form.password.value;

        if (enteredUsername === 'testuser' && enteredPassword === 'password123') {
          setLoggedIn(true);
          setUsername(enteredUsername);
          setLoginError('');
        } else {
          setLoginError('Invalid username or password');
        }
      };

      const temperature = 37;

      const handleTabChange = (tab) => {
        setActiveTab(tab);
      };

      const historyData = [
        { time: '08:00', bpm: 70, spo2: 97, temp: 36.8 },
        { time: '09:00', bpm: 72, spo2: 98, temp: 37 },
        { time: '10:00', bpm: 85, spo2: 95, temp: 37.5 },
        { time: '11:00', bpm: 75, spo2: 99, temp: 36.9 },
        { time: '12:00', bpm: 90, spo2: 94, temp: 38 },
      ];

      const nearbyHospitals = [
        'City General Hospital, 123 Main St, Springfield',
        'River Valley Medical Center, 456 Elm St, Springfield',
        'Sunshine Clinic, 789 Pine St, Springfield',
      ];

      return (
        <div>
          <nav>
            <h1>Medical Data Viewer</h1>
            {loggedIn && <span>Welcome, {username}</span>}
          </nav>
          {!loggedIn ? (
            <form onSubmit={handleLogin}>
              <h2>Login</h2>
              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <input type="text" name="username" placeholder="Username" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          ) : (
            <>
              <div className="tabs">
                <button
                  className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleTabChange('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => handleTabChange('history')}
                >
                  History
                </button>
                <button
                  className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
                  onClick={() => handleTabChange('emergency')}
                >
                  Emergency
                </button>
              </div>
              {activeTab === 'dashboard' && (
                <div className="tab-content">
                  <div className="patient-info">
                    <h2>Patient Information</h2>
                    <p>
                      <strong>Name:</strong> John Doe
                    </p>
                    <p>
                      <strong>Age:</strong> 45
                    </p>
                    <p>
                      <strong>Monitoring Doctor:</strong>
                      <br />
                      Name: Dr. Smith
                      <br />
                      Specialization: Cardiologist
                      <br />
                      Contact: +1 234-567-8901
                    </p>
                  </div>
                  <div className="health-data">
                    <div className="health-card heart-rate">
                      <div className="value">72</div>
                      <div className="unit">BPM</div>
                      <div>Heart Rate</div>
                    </div>
                    <div className="health-card spo2">
                      <div className="value">98</div>
                      <div className="unit">%</div>
                      <div>SpO2</div>
                    </div>
                    <div className="health-card temperature">
                      <div className="value">{temperature}</div>
                      <div className="unit">°C</div>
                      <div>Body Temperature</div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div className="tab-content">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>BPM</th>
                        <th>SpO2</th>
                        <th>Temperature (°C)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.time}</td>
                          <td className={item.bpm > 80 || item.bpm < 60 ? 'abnormal' : ''}>{item.bpm}</td>
                          <td className={item.spo2 < 95 ? 'abnormal' : ''}>{item.spo2}</td>
                          <td className={item.temp > 37.5 || item.temp < 36 ? 'abnormal' : ''}>{item.temp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'emergency' && (
                <div className="tab-content">
                  <div className="map-container">
                    <p>Simulated Map View</p>
                  </div>
                  <div className="hospital-section">
                    <h2>Nearby Hospitals</h2>
                    <ul className="hospital-list">
                      {nearbyHospitals.map((hospital, index) => (
                        <li key={index}>{hospital}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }

    export default App;
