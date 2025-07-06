import React from 'react';
import { Shield, Zap, Globe, Clock } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresElement = document.getElementById('features-section');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // 如果找不到元素，回退到使用hash
      window.location.hash = 'features';
    }
  };

  return (
    <section className="relative px-4 bg-black overflow-hidden h-screen flex items-center justify-center">
      {/* 背景动效 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto relative z-10 py-8 mt-32">
        {/* 主标题 */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-block mb-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-blue-400 text-sm font-medium">
              专业VPN服务 · 可靠安全
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500">
              无忧IP节点一机多IP单IP软件
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            一键切换IP安卓电脑<span className="text-blue-400">全平台通用</span>
          </h2>
          <div className="flex justify-center space-x-4 mb-16">
            <a
              href="http://link.wuyouip.com/663AB"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 hover:-translate-y-1"
            >
              立即开始使用
            </a>
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="px-6 py-2 bg-transparent border border-blue-600/50 text-blue-400 font-medium rounded-lg hover:bg-blue-600/10 transition-all duration-300"
            >
              了解更多
            </a>
          </div>
        </div>

        {/* 特性区域 */}
        <div
          id="features"
          className="grid md:grid-cols-2 gap-16 items-center mx-8"
        >
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-filter backdrop-blur-lg p-5 rounded-2xl border border-blue-500/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <Zap className="text-blue-400 mb-3 h-7 w-7" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  高速IP切换
                </h3>
                <p className="text-gray-400">
                  IP轮换换IP,高速稳定,单台电脑IP无限切换
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-filter backdrop-blur-lg p-5 rounded-2xl border border-blue-500/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <Shield className="text-blue-400 mb-3 h-7 w-7" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  防下线检测
                </h3>
                <p className="text-gray-400">绑定浏览器纯净安全不掉线</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-filter backdrop-blur-lg p-5 rounded-2xl border border-blue-500/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <Globe className="text-blue-400 mb-3 h-7 w-7" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  全国覆盖
                </h3>
                <p className="text-gray-400">
                  全国340+地区任意选择,独享1-30Mbps速率
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 backdrop-filter backdrop-blur-lg p-5 rounded-2xl border border-blue-500/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10">
                <Clock className="text-blue-400 mb-3 h-7 w-7" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  全天候服务
                </h3>
                <p className="text-gray-400">服务有保障,专注7X24技术服务</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              {/* 装饰效果 */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-[22px] blur-md"></div>
              {/* 图片容器 */}
              <div className="relative bg-gray-900 p-2 rounded-2xl border border-blue-500/30">
                <img
                  src="411621419324.gif"
                  alt="IP软件界面"
                  className="rounded-xl w-full shadow-2xl"
                />
                {/* 悬浮装饰 */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs py-1 px-3 rounded-full shadow-lg shadow-blue-500/30">
                  高端技术
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
