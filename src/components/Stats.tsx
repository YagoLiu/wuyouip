import React from 'react';
import { Users, Activity, Globe, BarChart3, CheckCircle, Signal, Clock, Server, Shield } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <section className="relative px-4 py-16 bg-gray-900 overflow-hidden min-h-screen">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/world-map-bg.png')] bg-no-repeat bg-center bg-contain opacity-5"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

        {/* 添加更多装饰元素 */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        {/* 添加网格背景 */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-3"></div>
      </div>

      <div className="container mx-auto relative z-10 py-6">
        {/* 顶部信息栏 */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-gray-300 text-sm">系统状态: 运行中</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300 text-sm">7x24小时服务</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-teal-400" />
              <span className="text-gray-300 text-sm">安全防护</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-purple-400" />
              <span className="text-gray-300 text-sm">高速稳定</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block mb-3 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">
            <span className="text-teal-400 text-sm font-medium">
              业界标杆 · 卓越体验
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400">
            VIP 经验100000+代理IP质量翻翻
          </h2>
          <p className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
            用户人数++！可用IP量逐步增高！会员等级逐级提升！全IP代理服务平台,移动端可IP切换,5流量光纤等平台自稳自调IP纯净IP。
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
              高速稳定
            </div>
            <div className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 text-sm border border-teal-500/20">
              快速响应
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">
              全国覆盖
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto mb-16">
          {/* 外发光效果 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-70"></div>

          {/* 内容区域 */}
          <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center transform transition-transform hover:scale-105 duration-300">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-teal-500/10 mb-4 inline-flex items-center justify-center">
                    <Users className="h-10 w-10 text-teal-400" />
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 opacity-50 blur-sm bg-teal-500/20 rounded-lg"></div>
                    <h3 className="text-4xl font-bold mb-2 text-white relative">
                      122,888
                    </h3>
                  </div>
                  <p className="text-teal-400 font-medium mb-2">活跃用户量</p>
                  <p className="text-gray-400 text-sm">每月新增用户 3,000+</p>
                </div>

                <div className="text-center transform transition-transform hover:scale-105 duration-300">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-blue-500/10 mb-4 inline-flex items-center justify-center">
                    <Activity className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 opacity-50 blur-sm bg-blue-500/20 rounded-lg"></div>
                    <h3 className="text-4xl font-bold mb-2 text-white relative">
                      168,888
                    </h3>
                  </div>
                  <p className="text-blue-400 font-medium mb-2">每日使用量</p>
                  <p className="text-gray-400 text-sm">稳定增长 12% / 月</p>
                </div>

                <div className="text-center transform transition-transform hover:scale-105 duration-300">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-cyan-500/10 mb-4 inline-flex items-center justify-center">
                    <Globe className="h-10 w-10 text-cyan-400" />
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-1 opacity-50 blur-sm bg-cyan-500/20 rounded-lg"></div>
                    <h3 className="text-4xl font-bold mb-2 text-white relative">
                      899,188
                    </h3>
                  </div>
                  <p className="text-cyan-400 font-medium mb-2">可用IP量</p>
                  <p className="text-gray-400 text-sm">覆盖 120+ 国家/地区</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 额外信息区块 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* 性能指标 */}
          <div className="p-0.5 rounded-2xl bg-gradient-to-r from-blue-500/50 to-purple-500/50">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">性能指标</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">响应速度</span>
                    <span className="text-blue-400 font-medium">极快</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: '95%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">稳定性</span>
                    <span className="text-blue-400 font-medium">99.9%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: '98%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">连接成功率</span>
                    <span className="text-blue-400 font-medium">99.8%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: '97%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 服务优势 */}
          <div className="p-0.5 rounded-2xl bg-gradient-to-r from-teal-500/50 to-cyan-500/50">
            <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-6 rounded-2xl h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">服务优势</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-teal-500/10 text-teal-400 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">全国覆盖</h4>
                    <p className="text-gray-400 text-sm">全国覆盖340+地区</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-teal-500/10 text-teal-400 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">高速稳定</h4>
                    <p className="text-gray-400 text-sm">5G光纤专线保障</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-teal-500/10 text-teal-400 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">匿名安全</h4>
                    <p className="text-gray-400 text-sm">IP纯净度高达99%</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 rounded bg-teal-500/10 text-teal-400 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">7x24客服</h4>
                    <p className="text-gray-400 text-sm">全天候技术支持</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            加入我们的优质用户群体，体验无忧IP带来的高速稳定服务
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300">
            立即注册体验
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
