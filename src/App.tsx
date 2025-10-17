import { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'dashboard_metrics';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [savedMetrics, setSavedMetrics] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSavedMetrics(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (code: string) => {
    if (code.toLowerCase() === 'getsetweb') {
      setIsAuthenticated(true);
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

  return null;
}

export default App;
