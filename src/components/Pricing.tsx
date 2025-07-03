
import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "大带宽",
      price: "¥30/月",
      speed: "限速1.5M",
      mode: "支持静态模式",
      ports: "支持10端口",
      features: ["混合代理，提供超多节点,可用大量的代理IP"]
    },
    {
      name: "15元区",
      price: "¥15/月",
      speed: "限速1.2M",
      mode: "移动模式/支持10端口",
      ports: "动态模式支持10端口",
      features: ["多区域+支持端口"]
    },
    {
      name: "12元区",
      price: "¥12/月",
      speed: "限速1.1M",
      mode: "支持静态模式/移动支持5端口",
      ports: "大城市动态模式/支持10端口",
      features: ["支持多终端,云平台/机顶盒/微信账号IP"]
    },
    {
      name: "无线包月",
      price: "¥48/10端口",
      speed: "动态包月模式",
      mode: "支持终端6功能",
      ports: "管理模式/常用功能",
      features: ["限点高级账号,同步终端户"]
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="section-title">无忧IP海量节点资源、线路灵活选择</h2>
        <div className="section-underline"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {plans.map((plan, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="bg-blue-500 text-white py-4 text-center font-bold">
                {plan.name}
              </div>
              <div className="p-6">
                <div className="text-center text-brand-red font-bold mb-4">
                  {plan.price}
                </div>
                <ul className="space-y-2 text-sm">
                  <li>{plan.speed}</li>
                  <li>{plan.mode}</li>
                  <li>{plan.ports}</li>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
