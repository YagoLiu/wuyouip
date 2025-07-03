import React from 'react';
import { Shield, Repeat, Clock, Gamepad2, GitBranch, Radio } from 'lucide-react';

const QualityIPFeatures: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: '全新版本发布，全新UI更佳体验',
      description: '我们推出全新界面设计，操作更简单，体验更流畅。'
    },
    {
      icon: <Repeat className="h-6 w-6 text-blue-400" />,
      title: '自动过滤重复，动态IP每日更新',
      description: 'IP资源每日自动更新，保障IP资源的持续可用性。'
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-400" />,
      title: '可设定时自动切换，无需人员看管',
      description: '设置定时切换，全自动运行，无需人工干预。'
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-blue-400" />,
      title: '换IP即可开启清除游戏缓存功能',
      description: '一键清除游戏缓存，提供更流畅的游戏体验。'
    },
    {
      icon: <GitBranch className="h-6 w-6 text-blue-400" />,
      title: '运行指定进程，国内线路任意选择',
      description: '灵活选择国内线路，满足不同应用场景需求。'
    }
  ];

  // 模拟IP节点数据
  const ipNodes = [
    { name: '九江市电信1', signal: 'high' },
    { name: '苏州市电信1', signal: 'high' },
    { name: '苏州市电信2', signal: 'high' },
    { name: '兰州市电信2', signal: 'high' },
    { name: '保定市电信1', signal: 'high' },
    { name: '保定市电信2', signal: 'high' },
    
    { name: '郑州市电信1', signal: 'high' },
    { name: '榆林市电信1', signal: 'high' },
    { name: '沈阳市电信1', signal: 'high' },
    { name: '镇江市电信2', signal: 'high' },
    { name: '淮南市电信2', signal: 'high' },
    { name: '黄山市电信', signal: 'high' },
    
    { name: '九江电信01', signal: 'high' },
    { name: '腾讯香港', signal: 'high' },
    { name: '腾讯韩国', signal: 'high' },
    { name: '腾讯新加坡', signal: 'high' },
    { name: '腾讯南港', signal: 'high' },
    { name: '东京香港', signal: 'high' },
    
    { name: '优刻云港', signal: 'high' },
    { name: '阿里云电信', signal: 'high' },
    { name: '九江市VPS节点', signal: 'high' },
    { name: '徐州市电信1', signal: 'high' },
    { name: '无锡市电信1', signal: 'high' },
    { name: '嘉兴市电信1', signal: 'high' },
    
    { name: '张家港市电信1', signal: 'high' },
    { name: '九江市联通1', signal: 'high' },
    { name: '上饶市电信', signal: 'high' },
    { name: '盐城市电信1', signal: 'high' },
    { name: '汕头市电信', signal: 'high' },
    { name: '济宁市电信', signal: 'high' },
    
    { name: '徐州市电信', signal: 'high' },
    { name: '深圳电信', signal: 'high' },
    { name: '镇江电信', signal: 'high' },
    { name: '贵山电信', signal: 'high' },
    { name: '哈尔滨电信', signal: 'high' },
    { name: '深圳电信', signal: 'high' }
  ];

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-3"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            无忧为您提供<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">干净的优质IP</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            用户通过无忧IP官方网站下载软件，注册充值后即时开通，立享100%无限制切换IP，支持自动清理内存，自由换IP。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="col-span-1">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-500/20 hover:border-blue-400/30 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-500/20 rounded-lg mr-3 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-white text-md font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 border border-gray-800/50 overflow-hidden">
              <img 
                src="/1.gif" 
                alt="无忧IP演示" 
                className="w-full h-auto rounded-lg object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityIPFeatures; 