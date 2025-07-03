
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <section className="gradient-bg py-16 px-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">无忧IP，专业的IP代理服务商</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-8">现在注册即享优惠特权</h3>
          
          <Button className="bg-white text-purple-600 hover:bg-gray-100" onClick={() => window.open('https://user.wuyouip.com/Sign/Reg?type=2&session=8bf8616bd1d94449b990a9061fb16903')}>
            立即注册
          </Button>
        </div>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-pink-400 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-purple-400 opacity-30"></div>
    </section>
  );
};

export default CallToAction;
