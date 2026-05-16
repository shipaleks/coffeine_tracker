// localStorage service for caffeine tracker
// Replaces Supabase for offline-first approach

const STORAGE_KEYS = {
  LOGS: 'caffeine_logs',
  PROFILE: 'caffeine_profile',
  USER: 'caffeine_user',
};

// Helper to get data from localStorage
const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Helper to set data in localStorage
const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// LOGS OPERATIONS

export const getLogs = () => {
  return getStorageItem(STORAGE_KEYS.LOGS, []);
};

export const addLog = (log) => {
  const logs = getLogs();
  const newLog = {
    ...log,
    id: generateId(),
    created_at: new Date().toISOString(),
  };
  logs.unshift(newLog);
  setStorageItem(STORAGE_KEYS.LOGS, logs);
  return newLog;
};

export const deleteLog = (id) => {
  const logs = getLogs();
  const filtered = logs.filter(log => log.id !== id);
  setStorageItem(STORAGE_KEYS.LOGS, filtered);
  return filtered;
};

export const getTodayLogs = () => {
  const logs = getLogs();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return logs.filter(log => {
    const logDate = new Date(log.consumed_at);
    return logDate >= today;
  });
};

export const getRecentLogs = (days = 30) => {
  const logs = getLogs();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return logs.filter(log => {
    const logDate = new Date(log.consumed_at);
    return logDate >= cutoffDate;
  });
};

// PROFILE OPERATIONS

export const getProfile = () => {
  const defaultProfile = {
    daily_limit_mg: 400,
    email: 'guest@user.local',
    created_at: new Date().toISOString(),
  };
  return getStorageItem(STORAGE_KEYS.PROFILE, defaultProfile);
};

export const updateProfile = (updates) => {
  const profile = getProfile();
  const updated = { ...profile, ...updates };
  setStorageItem(STORAGE_KEYS.PROFILE, updated);
  return updated;
};

// USER OPERATIONS (simplified auth)

export const getCurrentUser = () => {
  return getStorageItem(STORAGE_KEYS.USER, null);
};

export const setCurrentUser = (user) => {
  setStorageItem(STORAGE_KEYS.USER, user);
  if (user) {
    // Initialize profile for new user
    const existingProfile = getStorageItem(STORAGE_KEYS.PROFILE);
    if (!existingProfile) {
      setStorageItem(STORAGE_KEYS.PROFILE, {
        daily_limit_mg: 400,
        email: user.email || 'guest@user.local',
        created_at: new Date().toISOString(),
      });
    }
  }
};

export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export storage keys for debugging
export { STORAGE_KEYS };
