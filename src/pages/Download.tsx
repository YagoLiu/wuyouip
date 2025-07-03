import React, { useState } from 'react';
import { Download, Monitor, Smartphone, ArrowLeft, FileText, Clock, Shield, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import CustomerService from '@/components/CustomerService';
import Footer from '@/components/Footer';

interface Software {
  id: string;
  name: string;
  version: string;
  size: string;
  description: string;
  downloadUrl: string;
  icon: JSX.Element;
  category: 'windows' | 'android';
  features: string[];
  requirements: string[];
  updateTime: string;
  detailedDescription: string;
  highlights: string[];
}

const DownloadPage = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);

  const softwares: Software[] = [
    {
      id: 'todesk',
      name: 'ToDesk 远程协助',
      version: '最新版',
      size: '--',
      description: '远程协助工具',
      downloadUrl: '/ToDesk远程协助.exe',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        '远程桌面控制',
        '文件传输',
        '远程打印',
        '多设备管理'
      ],
      requirements: [
        'Windows 7/8/10/11',
        '2GB RAM',
        '100MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: 'ToDesk是一款专业的远程控制软件，支持跨平台远程控制，让您随时随地访问和控制远程设备。软件采用先进的加密技术，确保数据传输安全，同时提供流畅的远程操作体验。',
      highlights: [
        '支持多平台远程控制',
        '文件传输速度快',
        '操作简单易用',
        '安全加密传输'
      ]
    },
    {
      id: 'wuyouip',
      name: '无忧IP8.0',
      version: 'v8.0',
      size: '--',
      description: '无忧IP主程序',
      downloadUrl: '/无忧IP8.0.exe',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        '一键切换IP',
        '多地区节点',
        '智能路由',
        '流量统计'
      ],
      requirements: [
        'Windows 10/11 64位',
        '4GB RAM',
        '500MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧IP8.0是一款功能强大的IP切换工具，支持全球多个地区的IP节点，提供稳定快速的网络连接。软件采用智能路由技术，自动选择最优线路，确保网络稳定性和速度。',
      highlights: [
        '全球节点覆盖',
        '智能路由选择',
        '一键快速切换',
        '实时流量监控'
      ]
    },
    {
      id: 'repair',
      name: '无忧IP修复工具箱',
      version: '最新版',
      size: '--',
      description: '系统修复工具',
      downloadUrl: '/无忧IP修复工具箱.exe',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        '系统修复',
        '网络诊断',
        '驱动修复',
        '一键优化'
      ],
      requirements: [
        'Windows 10/11',
        '2GB RAM',
        '200MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧IP修复工具箱是一款专业的系统修复工具，能够快速诊断和解决网络连接问题。软件提供多种修复方案，包括系统修复、网络诊断、驱动修复等功能，帮助用户快速恢复网络连接。',
      highlights: [
        '一键修复功能',
        '智能诊断系统',
        '驱动自动更新',
        '系统优化加速'
      ]
    },
    {
      id: 'sk5-check',
      name: '无忧 SK5检测工具',
      version: '最新版',
      size: '--',
      description: 'SK5检测工具',
      downloadUrl: '/无忧SK5检测工具.rar',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        'SK5协议检测',
        '连接测试',
        '速度测试',
        '稳定性分析'
      ],
      requirements: [
        'Windows 7/8/10/11',
        '2GB RAM',
        '100MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧SK5检测工具是一款专业的SK5协议检测软件，能够全面检测SK5代理的连接状态、速度和稳定性。软件提供详细的检测报告，帮助用户快速定位和解决连接问题。',
      highlights: [
        '全面协议检测',
        '实时速度测试',
        '稳定性分析',
        '详细检测报告'
      ]
    },
    {
      id: 'sk5-pc',
      name: '无忧SK5电脑版',
      version: '最新版',
      size: '--',
      description: 'SK5电脑客户端',
      downloadUrl: '/无忧SK5电脑版.zip',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        'SK5协议支持',
        '多节点管理',
        '自动切换',
        '流量统计'
      ],
      requirements: [
        'Windows 10/11',
        '4GB RAM',
        '500MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧SK5电脑版是一款功能完善的SK5代理客户端，支持多种SK5协议，提供稳定的代理服务。软件支持多节点管理，自动选择最优线路，并提供详细的流量统计功能。',
      highlights: [
        '多协议支持',
        '智能节点选择',
        '自动线路切换',
        '流量实时统计'
      ]
    },
    {
      id: 'baoji',
      name: '无虑包机',
      version: '最新版',
      size: '--',
      description: '包机工具',
      downloadUrl: '/无虑包机.exe',
      icon: <Monitor className="h-8 w-8" />,
      category: 'windows',
      features: [
        '一键包机',
        '多设备管理',
        '定时任务',
        '状态监控'
      ],
      requirements: [
        'Windows 10/11',
        '4GB RAM',
        '500MB 可用磁盘空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无虑包机是一款专业的包机管理工具，支持多设备同时管理，提供定时任务和状态监控功能。软件操作简单，功能强大，是网吧、机房等场所的理想管理工具。',
      highlights: [
        '多设备管理',
        '定时任务设置',
        '实时状态监控',
        '一键批量操作'
      ]
    },
    {
      id: 'android-full',
      name: '无忧安卓全能版',
      version: '最新版',
      size: '--',
      description: '功能完整的安卓客户端',
      downloadUrl: '/无忧安卓全能版.apk',
      icon: <Smartphone className="h-8 w-8" />,
      category: 'android',
      features: [
        '一键切换IP',
        '多地区节点',
        '智能路由',
        '流量统计'
      ],
      requirements: [
        'Android 6.0 或更高版本',
        '2GB RAM',
        '100MB 可用存储空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧安卓全能版是一款功能完整的安卓客户端，提供全面的IP切换和网络管理功能。软件支持全球多个地区的节点，采用智能路由技术，确保网络连接的稳定性和速度。',
      highlights: [
        '完整功能支持',
        '全球节点覆盖',
        '智能路由选择',
        '流量实时监控'
      ]
    },
    {
      id: 'android-lite',
      name: '无忧安卓精简版',
      version: '最新版',
      size: '--',
      description: '轻量级安卓客户端',
      downloadUrl: '/无忧安卓精简版.apk',
      icon: <Smartphone className="h-8 w-8" />,
      category: 'android',
      features: [
        '基础IP切换',
        '核心功能',
        '低内存占用',
        '快速启动'
      ],
      requirements: [
        'Android 5.0 或更高版本',
        '1GB RAM',
        '50MB 可用存储空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧安卓精简版是一款轻量级的安卓客户端，保留了核心功能，占用资源少，启动速度快。适合配置较低的安卓设备使用，提供基本的IP切换功能。',
      highlights: [
        '轻量级设计',
        '快速启动',
        '低资源占用',
        '核心功能完整'
      ]
    },
    {
      id: 'android-sk5',
      name: '无忧行SK5安卓版',
      version: '最新版',
      size: '--',
      description: 'SK5安卓客户端',
      downloadUrl: '/无忧行SK5安卓版.apk',
      icon: <Smartphone className="h-8 w-8" />,
      category: 'android',
      features: [
        'SK5协议支持',
        '多节点管理',
        '自动切换',
        '流量统计'
      ],
      requirements: [
        'Android 6.0 或更高版本',
        '2GB RAM',
        '100MB 可用存储空间'
      ],
      updateTime: '2024-03-20',
      detailedDescription: '无忧行SK5安卓版是一款专业的SK5代理客户端，专为安卓设备优化，提供稳定的代理服务。软件支持多种SK5协议，提供多节点管理和自动切换功能。',
      highlights: [
        '专业SK5支持',
        '多节点管理',
        '智能线路切换',
        '流量实时统计'
      ]
    }
  ];

  const renderSoftwareDetail = (software: Software) => (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedSoftware(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 mt-16 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            返回下载列表
          </button>

          <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400">
                {software.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{software.name}</h1>
                <p className="text-gray-400">{software.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" />
                软件介绍
              </h2>
              <p className="text-gray-300 leading-relaxed">{software.detailedDescription}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                产品亮点
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {software.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  软件特点
                </h2>
                <ul className="space-y-2">
                  {software.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-400" />
                  系统要求
                </h2>
                <ul className="space-y-2">
                  {software.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>更新于 {software.updateTime}</span>
                </div>
                <div className="text-gray-400">
                  版本 {software.version}
                </div>
              </div>
              <a
                href={software.downloadUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                <Download className="h-5 w-5" />
                立即下载
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CustomerService />
    </div>
  );

  if (selectedSoftware) {
    return renderSoftwareDetail(selectedSoftware);
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {/* 背景效果 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-3"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12 mt-32">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-300 to-purple-400">
            下载中心
          </h1>
          <p className="text-gray-400 text-lg">
            选择适合您系统的版本，开始使用无忧IP
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {softwares.map((software) => (
            <div
              key={software.id}
              onClick={() => setSelectedSoftware(software)}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
                <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                      {software.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{software.name}</h3>
                      <p className="text-gray-400 text-sm">{software.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>版本 {software.version}</span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50">
                      {software.category === 'windows' ? 'Windows' : 'Android'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <CustomerService />
    </div>
  );
};

export default DownloadPage; 