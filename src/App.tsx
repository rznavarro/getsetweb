import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'dashboard_metrics';
const AUTH_KEY = 'dashboard_authenticated';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [savedMetrics, setSavedMetrics] = useState<any>(null);

  useEffect(() => {
    try {
      // Load authentication state
      const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
      if (isAuth) {
        setIsAuthenticated(true);
        setIsLoading(true);
      }

      // Load saved metrics with error handling
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedMetrics = JSON.parse(saved);
        // Validate that parsed metrics have the expected structure
        if (parsedMetrics && typeof parsedMetrics === 'object') {
          setSavedMetrics(parsedMetrics);
        }
      }
    } catch (error) {
      console.warn('Error loading data from localStorage:', error);
      // Reset to default state on error
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(STORAGE_KEY);
      setIsAuthenticated(false);
      setIsLoading(false);
      setShowDashboard(false);
      setSavedMetrics(null);
    }
  }, []);

  const handleLogin = (code: string) => {
    if (code.toLowerCase() === 'getsetweb') {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true'); // Persist authentication
      setIsLoading(true);
      return true;
    }
    return false;
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowDashboard(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (showDashboard) {
    return <Dashboard savedMetrics={savedMetrics} onMetricsChange={setSavedMetrics} />;
  }

  // Fallback: show login screen if something goes wrong
  return <LoginScreen onLogin={handleLogin} />;
}

export default App;
