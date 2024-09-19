import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import RealEstate from "./pages/RealEstate";
import Buses from "./pages/Buses";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

const queryClient = new QueryClient();

const App = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Layout>
            {!isOnline && (
              <Alert variant="destructive" className="mb-4">
                <WifiOff className="h-4 w-4" />
                <AlertTitle>انقطع الاتصال</AlertTitle>
                <AlertDescription>
                  أنت حاليًا في وضع عدم الاتصال. بعض الميزات قد لا تعمل.
                </AlertDescription>
              </Alert>
            )}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/buses" element={<Buses />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
