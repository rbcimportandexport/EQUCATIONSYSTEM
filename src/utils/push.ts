import { apiRequest } from './api';

// This is the public VAPID key we generated earlier
const PUBLIC_VAPID_KEY = 'BM5ursJ5EQTs59fDPxzmAaUasmyPfv9XU9NfGXIAjqHhbb8L-wC5KXLjjj3-9JtFyEpig7V5x_xCueX5sfI6UJY';

// Convert base64 string to Uint8Array for the Push API
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribeUserToPush = async (userEmail: string): Promise<boolean> => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported by the browser.');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    // If not, subscribe
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });
    }

    // Send subscription to backend
    const response = await apiRequest<any>('/notifications/subscribe', 'POST', { subscription, email: userEmail });

    return !!response.success;
  } catch (error) {
    console.error('Failed to subscribe user to push notifications:', error);
    return false;
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) return false;
  
  if (Notification.permission === 'granted') return true;
  
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};
