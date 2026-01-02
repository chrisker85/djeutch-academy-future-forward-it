import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import FormationsPage from "./pages/FormationsPage";
import ContactPage from "./pages/ContactPage";
import ActualitesPage from "./pages/ActualitesPage";
import InscriptionPage from "./pages/InscriptionPage";
import DevisPage from "./pages/DevisPage";
import FAQPage from "./pages/FAQPage";
import OrientationTestPage from "./pages/OrientationTestPage";
import GalleryPage from "./pages/GalleryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/formations" element={<FormationsPage />} />
            <Route path="/formations/:slug" element={<FormationsPage />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/inscription" element={<InscriptionPage />} />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/test-orientation" element={<OrientationTestPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
