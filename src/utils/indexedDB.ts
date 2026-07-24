// IndexedDB helper for storing large custom videos locally (bypasses MongoDB 16MB BSON limits)
const DB_NAME = 'RBC_Video_Storage';
const DB_VERSION = 1;
const STORE_NAME = 'custom_videos';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'lessonId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export interface IDBVideoRecord {
  lessonId: string;
  moduleId: string;
  title: string;
  videoData: string;
  thumbnailData: string;
  duration: number;
  updatedAt?: string;
}

export const saveVideoToIDB = async (record: IDBVideoRecord): Promise<boolean> => {
  try {
    const db = await openDB();
    return new Promise<boolean>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({
        ...record,
        updatedAt: new Date().toISOString()
      });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.error('saveVideoToIDB error:', err);
    return false;
  }
};

export const getVideoFromIDB = async (lessonId: string): Promise<IDBVideoRecord | null> => {
  try {
    const db = await openDB();
    return new Promise<IDBVideoRecord | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(lessonId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('getVideoFromIDB error:', err);
    return null;
  }
};

export const getAllVideosFromIDB = async (): Promise<IDBVideoRecord[]> => {
  try {
    const db = await openDB();
    return new Promise<IDBVideoRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('getAllVideosFromIDB error:', err);
    return [];
  }
};
