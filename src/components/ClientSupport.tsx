import React, { useEffect, useRef } from 'react';
import { Laptop, Smartphone, Server, Globe, Cpu } from 'lucide-react';
// 导入Swiper组件和样式
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const ClientSupport: React.FC = () => {
  // 上排客户端列表
  const topClients = [
    { icon: "t1.jpg" },
    { icon: "t2.jpg" },
    { icon: "t3.jpg" },
    { icon: "t4.jpg" },
    { icon: "t5.jpg" },
    { icon: "t6.jpg" },
  ];

  // 下排客户端列表
  const bottomClients = [
    { icon: "t7.jpg" },
    { icon: "t8.jpg" },
    { icon: "t9.jpg" },
    { icon: "t10.jpg" },
    { icon: "t11.jpg" },
    { icon: "t12.jpg" },
  ];

  // 重复客户端以确保无缝循环
  const duplicatedTopClients = [...topClients, ...topClients];
  const duplicatedBottomClients = [...bottomClients, ...bottomClients];

  return (
    <section className="relative px-4 bg-gradient-to-b from-black to-gray-900 overflow-hidden h-screen flex items-center">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10 py-6">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-block mb-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-indigo-400 text-sm font-medium">全平台兼容 · 无缝体验</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-blue-400">
            客户端兼容多平台PC全平台应用
          </h2>
          <p className="text-gray-400 text-sm mb-5">为各种设备和平台提供稳定、高效的IP代理服务，确保您在任何环境下都能畅享无忧体验</p>
        </div>
        
        {/* 滚动Logo部分 */}
        <div className="relative max-w-6xl mx-auto">
          {/* 上排Logo: 从右往左滚动 */}
          <div className="mb-6 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-gray-900 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-gray-900 to-transparent"></div>
            
            <Swiper
              modules={[Autoplay]}
              slidesPerView={5}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false
              }}
              className="client-logo-swiper"
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {duplicatedTopClients.map((client, index) => (
                <SwiperSlide key={`top-${index}`}>
                  <div className="p-1 mx-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-blue-500/20 transition-all duration-300 hover:from-indigo-500/30 hover:to-blue-500/30">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 h-full backdrop-blur-xl flex flex-col items-center justify-center">
                      <div className="relative h-20 w-20">
                        <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-md"></div>
                        <img 
                          src={client.icon} 
                          alt="" 
                          className="w-full h-full object-contain relative z-10 transition-transform duration-300 hover:scale-110 rounded-xl p-1"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* 下排Logo: 从左往右滚动 */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-gray-900 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-gray-900 to-transparent"></div>
            
            <Swiper
              modules={[Autoplay]}
              slidesPerView={5}
              loop={true}
              speed={5000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true
              }}
              className="client-logo-swiper"
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
            >
              {duplicatedBottomClients.map((client, index) => (
                <SwiperSlide key={`bottom-${index}`}>
                  <div className="p-1 mx-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-300 hover:from-blue-500/30 hover:to-purple-500/30">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 h-full backdrop-blur-xl flex flex-col items-center justify-center">
                      <div className="relative h-20 w-20">
                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-md"></div>
                        <img 
                          src={client.icon} 
                          alt="" 
                          className="w-full h-full object-contain relative z-10 transition-transform duration-300 hover:scale-110 rounded-xl p-1"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSupport;
