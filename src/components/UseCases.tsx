import React from 'react';
import { ChartBar, ShoppingCart, GamepadIcon, LineChart, Database } from 'lucide-react';

const UseCases: React.FC = () => {
  const cases = [
    {
      icon: <Database className="w-8 h-8" />,
      iconUrl: "/lovable-uploads/61251851-1381-45ef-a174-84a2aecf6511.png",
      title: "账单数据采集",
      description: "财务相关数据收集"
    },
    {
      icon: <ChartBar className="w-8 h-8" />,
      iconUrl: "/lovable-uploads/6738d7aa-eb53-4af9-9e17-974ef499477b.png",
      title: "效率计量 ASO优化",
      description: "提高应用效率"
    },
    {
      icon: <GamepadIcon className="w-8 h-8" />,
      iconUrl: "/lovable-uploads/8778f87d-d646-4d95-93bc-e13fb60a024e.png",
      title: "图像监测 游戏优化",
      description: "图像识别和优化"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      iconUrl: "/lovable-uploads/baafff62-53d6-459e-a877-aafefeee014f.png",
      title: "市场分析",
      description: "数据收集与分析"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      iconUrl: "/lovable-uploads/61251851-1381-45ef-a174-84a2aecf6511.png",
      title: "电商采集",
      description: "电商数据收集"
    }
  ];

  return (
    <section className="relative px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden h-screen flex items-center">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10 py-6">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-block mb-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="text-cyan-400 text-sm font-medium">多元应用 · 解决方案</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
            多样化应用场景
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            无忧IP在众多领域得到广泛应用，提供稳定可靠的IP代理服务，为工作效率提升、节点类型丰富等平台应用提供了强力的网络连接支持。
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {cases.map((item, index) => (
            <div 
              key={index} 
              className="p-1 rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30 group transform transition-all duration-300 hover:scale-105 hover:from-cyan-400/40 hover:to-blue-400/40"
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 h-full flex flex-col items-center text-center">
                <div className="mb-3 relative">
                  <div className="absolute -inset-3 bg-cyan-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-cyan-400 relative z-10">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-white text-base font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.description}</p>
                <div className="mt-auto pt-2">
                  <div className="w-6 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
