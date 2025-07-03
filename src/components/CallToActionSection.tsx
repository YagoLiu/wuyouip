import React from 'react';

const CallToActionSection: React.FC = () => {
  return (
        <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
    <div className="py-12 px-4 relative overflow-hidden">
      {/* 底部行动区域 */}
<div className="bg-gradient-to-b from-gray-800/30 to-gray-900/30 rounded-2xl py-8 px-4 text-center border border-indigo-500/10">
        <h3 className="text-2xl font-bold text-white mb-4">准备好开始使用无忧IP了吗？</h3>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          只需简单几步，您就可以获得全球高质量IP代理服务，无论是数据采集、游戏加速还是全球化业务，无忧IP都能满足您的需求。
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.open('https://user.wuyouip.com/Sign/Reg?type=2&session=8bf8616bd1d94449b990a9061fb16903', '_blank')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 w-full md:w-auto"
          >
            立即注册开始
          </button>
          <button 
            onClick={() => window.open('https://wpa1.qq.com/I7v4oCfk?_type=wpa&qidian=true', '_blank')}
            className="px-6 py-3 bg-gray-800 text-white font-medium rounded-xl border border-indigo-500/20 hover:bg-gray-700 transition-colors duration-300 w-full md:w-auto"
          >
            联系客服咨询
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default CallToActionSection;
