import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ClientSupport from '@/components/ClientSupport';
import UseCases from '@/components/UseCases';
import Stats from '@/components/Stats';
import ProcessFlow from '@/components/ProcessFlow';
import NoticeColumns from '@/components/NoticeColumns';
import CallToActionSection from '@/components/CallToActionSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import CustomerService from '@/components/CustomerService';
import QualityIPFeatures from '@/components/QualityIPFeatures';

const Index: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  // 处理"了解更多"的平滑滚动
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#features' && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // 初始检查
    handleHashChange();
    
    // 监听hash变化
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
          <Hero />
          <QualityIPFeatures />
          <Features />
          <ClientSupport />
          {/* <UseCases /> */}

          <Stats />
          <ProcessFlow />
          {/* <CallToAction /> */}
          <NoticeColumns />
          <CallToActionSection />
          <div className="mt-auto">
            <Footer />
          </div>
      </main>
      <CustomerService />
    </div>
  );
};

export default Index;
