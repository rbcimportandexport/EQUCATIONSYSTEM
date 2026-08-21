import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RefreshCw, Cpu, HardDrive } from 'lucide-react';
import { subscribeUserToPush, requestNotificationPermission } from '../utils/push';

export const Settings: React.FC = () => {
  const { resetDatabase, offlineMode, setOfflineMode, showConfirm, currentUser, showAlert } = useApp();

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      // Browsers don't let you un-request permissions programmatically.
      showAlert('Notice', 'To disable notifications, please change your browser site settings.', 'info');
      return;
    }
    
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationsEnabled(true);
      if (currentUser?.email) {
        const subscribed = await subscribeUserToPush(currentUser.email);
        if (subscribed) {
          showAlert('Success', 'Push Notifications enabled! You will receive daily reminders.', 'success');
        } else {
          showAlert('Warning', 'Permission granted, but failed to subscribe to push server.', 'warning');
        }
      } else {
        showAlert('Error', 'Please login to enable Push Notifications.', 'error');
      }
    } else {
      showAlert('Error', 'Notification permission was denied.', 'error');
    }
  };

  const [slowCache, setSlowCache] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === 'granted');

  // Calculate simulated local storage size
  const getLocalStorageUsage = () => {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += (localStorage[key].length * 2); // 2 bytes per char in JS
      }
    }
    return `${(total / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="settings-view" style={{ height: '100%', overflowY: 'auto', padding: '32px' }}>
      <div className="card settings-card">
        <h3 className="card-title">Simulated Storage & Connectivity</h3>
        <p className="card-subtitle">Test and review caching constraints</p>
        

        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-label">Daily Push Reminders</span>
            <span className="setting-desc">Get notified 3 times a day to complete your learning progress.</span>
          </div>
          <button 
            className={`btn ${notificationsEnabled ? 'btn-primary' : 'btn-outlined'}`}
            onClick={handleToggleNotifications}
          >
            {notificationsEnabled ? 'ENABLED' : 'ENABLE'}
          </button>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-label">Offline Simulation</span>
            <span className="setting-desc">Simulate structural disconnection to test downloaded offline materials</span>
          </div>
          <button 
            className={`btn ${offlineMode ? 'btn-primary' : 'btn-outlined'}`}
            onClick={() => setOfflineMode(!offlineMode)}
          >
            {offlineMode ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-label">Artificial Cache Delay</span>
            <span className="setting-desc">Add a 1-second simulated delay to resource loading to test UI loading states</span>
          </div>
          <button 
            className={`btn ${slowCache ? 'btn-primary' : 'btn-outlined'}`}
            onClick={() => setSlowCache(!slowCache)}
          >
            {slowCache ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div className="card settings-card">
        <h3 className="card-title">System Allocation</h3>
        <p className="card-subtitle">LocalStorage allocations for databases</p>

        <div className="quota-row">
          <div className="quota-item">
            <HardDrive size={18} className="quota-icon" />
            <div className="quota-details">
              <span className="quota-label">Disk Storage Used</span>
              <span className="quota-val">{getLocalStorageUsage()}</span>
            </div>
          </div>
          <div className="quota-item">
            <Cpu size={18} className="quota-icon" />
            <div className="quota-details">
              <span className="quota-label">API Thread Pool</span>
              <span className="quota-val">Client Side (In-Memory)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card settings-card danger-zone">
        <h3 className="card-title text-danger">Danger Zone</h3>
        <p className="card-subtitle">Actions that overwrite local state</p>

        <div className="setting-row border-none">
          <div className="setting-info">
            <span className="setting-label text-danger">Reset Local Database</span>
            <span className="setting-desc">Wipe all cached user progress, bookmarks, and Admin-created courses, reverting the application to the initial seed blueprint.</span>
          </div>
          <button 
            className="btn btn-outlined btn-danger"
            onClick={() => {
              showConfirm(
                'Reset Local Database',
                'Wipe everything? This action is permanent.',
                () => resetDatabase()
              );
            }}
          >
            <RefreshCw size={14} />
            <span>Restore Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
