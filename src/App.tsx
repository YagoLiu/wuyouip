import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const Tutorial = React.lazy(() => import('./pages/Tutorial'));
const Notices = React.lazy(() => import('./pages/Notices'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Download = React.lazy(() => import('./pages/Download'));
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tutorial" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Tutorial />
              </React.Suspense>
            } />
            <Route path="/notices" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Notices />
              </React.Suspense>
            } />
            <Route path="/admin" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Admin />
              </React.Suspense>
            } />
            <Route path="/download" element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Download />
              </React.Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
