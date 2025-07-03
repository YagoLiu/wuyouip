import React from 'react';
import { 
  ShieldAlert, BarChart3, Shield, ShieldCheck, 
  CircleDollarSign, Zap, FileSpreadsheet, Eye 
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-blue-400" />,
      title: "全新IP池",
      description: "千万级独立IP，日千万次使用"
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-400" />,
      title: "可用率高",
      description: "优质IP独享资源，有效率大于98%以上"
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-400" />,
      title: "切换快",
      description: "自建机房，保证用户独享1-50M带宽"
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-400" />,
      title: "高质量",
      description: "真实家庭住宅IP，延迟低，使用流畅"
    },
    {
      icon: <CircleDollarSign className="h-10 w-10 text-blue-400" />,
      title: "重新分配新IP",
      description: "重启游戏窗口(进程)重新分配新IP"
    },
    {
      icon: <ShieldAlert className="h-10 w-10 text-blue-400" />,
      title: "防封好",
      description: "单端口单IP防封效果更佳"
    },
    {
      icon: <FileSpreadsheet className="h-10 w-10 text-blue-400" />,
      title: "IP散点分布",
      description: "独享真实IP资源散点分布，不连号"
    },
    {
      icon: <Eye className="h-10 w-10 text-blue-400" />,
      title: "售后无忧",
      description: "专业团队提供专属售后技术支持"
    }
  ];

  return (
    <section id="features-section" className="relative py-20 px-4 bg-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block mb-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-blue-400 text-base font-medium">专业服务 · 全面优势</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500">
            无忧IP节点优势
          </h2>
          <p className="text-gray-300 text-base">我们提供业内领先的IP节点解决方案，让您的网络连接高效、安全、稳定</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-filter backdrop-blur-lg p-6 rounded-2xl border border-blue-500/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
