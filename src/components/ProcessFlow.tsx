import React from 'react';
import { UserPlus, Coins, ShoppingBag, KeyRound, ArrowRight, CheckCircle2, Clock, Shield, Layout } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "注册安装",
      description: "点击注册后填写信息",
      number: "01",
      details: "在官网完成注册并下载客户端，安装后登录您的账号即可开始使用我们的服务。",
      benefits: ["便捷注册流程", "多端同步登录", "安全加密保障"]
    },
    {
      icon: <Coins className="h-6 w-6" />,
      title: "金币充值",
      description: "金币充值获取功能",
      number: "02",
      details: "通过多种支付方式便捷充值金币，支持微信、支付宝、银行转账等多种充值方式。",
      benefits: ["灵活支付选择", "实时到账", "优惠套餐"]
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "节点购买",
      description: "购买合适的节点包",
      number: "03",
      details: "根据您的需求选择合适的节点套餐，支持地区筛选、带宽选择和时长定制。",
      benefits: ["全球节点覆盖", "高速稳定连接", "定制化套餐"]
    },
    {
      icon: <KeyRound className="h-6 w-6" />,
      title: "节点分配",
      description: "手动或自动分配",
      number: "04",
      details: "系统自动分配高质量节点，也可手动选择特定区域节点，满足各类场景需求。",
      benefits: ["智能分配算法", "一键快速切换", "稳定保障机制"]
    }
  ];

  return (
    <section className="relative px-4 py-16 bg-black overflow-hidden min-h-screen">
      {/* 背景效果 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-3"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* 额外的背景装饰 */}
        <div className="absolute top-1/4 right-1/5 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-3"></div>
      </div>
      
      <div className="container mx-auto relative z-10 py-6">
        {/* 顶部信息栏 */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-indigo-500/10">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-gray-300 text-sm">使用流程: 简单四步</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span className="text-gray-300 text-sm">快速设置</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300 text-sm">安全保障</span>
            </div>
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-purple-400" />
              <span className="text-gray-300 text-sm">简单易用</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12 max-w-5xl mx-auto">
          <div className="inline-block mb-3 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <span className="text-indigo-400 text-sm font-medium">简单易用 · 强大可靠</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-300 to-purple-400">
            无忧IP操作简单、功能强大、安全可靠
          </h2>
          <p className="text-gray-400 text-lg mb-5 max-w-2xl mx-auto">
            只需简单几步，即可享受高质量的IP代理服务，助您畅游网络世界
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm border border-indigo-500/20">一键设置</div>
            <div className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">快速响应</div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">专业客服</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-16 relative">
          {/* 流程区域 */}
          <div className="relative">
            {/* 波浪形流程线 - 只在中等屏幕及以上显示 */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-0 py-20">
              <svg className="w-full h-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
                <path
                  d="M0,100 Q300,180 600,100 T1200,100"
                  stroke="url(#processGradient)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-draw"
                />
                <defs>
                  <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* 节点指示点 */}
              <div className="absolute top-1/2 left-[12.5%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-500 z-10">
                <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-50"></div>
              </div>
              <div className="absolute top-1/2 left-[37.5%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div>
              </div>
              <div className="absolute top-1/2 left-[62.5%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div>
              </div>
              <div className="absolute top-1/2 left-[87.5%] transform -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 z-10">
                <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-50"></div>
              </div>
            </div>

            {/* 步骤卡片 - 交替上下排列 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative group z-10 ${index % 2 === 0 ? 'md:mt-0 md:mb-40' : 'md:mt-40 md:mb-0'}`}
                >
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
                    <div className="bg-gradient-to-b from-gray-900 to-black p-5 rounded-2xl h-full flex flex-col items-center text-center">
                      <div className="mb-3 p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                      <div className="mt-2 mb-3">
                        <span className="text-4xl font-bold opacity-10 text-indigo-300">{step.number}</span>
                      </div>
                      
                      {/* 小箭头指示，只在中等屏幕及以上显示 */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:flex items-center justify-center mt-3">
                          <ArrowRight className="h-5 w-5 text-indigo-500/50" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 步骤详情区域 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-300 to-purple-400">
            每个步骤详解
          </h3>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30"
              >
                <div className="bg-gradient-to-b from-gray-900/80 to-black/80 p-6 rounded-2xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="p-4 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-white">{step.title}</h4>
                        <span className="px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
                          第{index + 1}步
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{step.details}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {step.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                            <span className="text-gray-400 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
