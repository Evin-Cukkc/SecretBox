import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  // 1. Jika masih loading, tampilkan SplashScreen
  if (loading) {
    return <SplashScreen />;
  }

  // 2. Jika loading selesai, langsung panggil AppRoutes 
  return <AppRoutes />;
}

export default App;