import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, Book, PlayCircle, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';

// 定义视频和文档的接口类型
interface VideoItem {
  id: number;
  title: string;
  url: string;
  description: string;
  duration: string;
  type: 'video';
}

interface DocItem {
  id: number;
  title: string;
  url: string;
  description: string;
  updateTime: string;
  type: 'doc';
}

// 联合类型，可以是视频或文档
type TutorialItem = VideoItem | DocItem;

const tutorialVideos: VideoItem[] = [
  { 
    id: 1, 
    title: "1: 注册账号", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "本教程详细介绍了如何在平台上注册账号，包括邮箱验证、设置安全密码和完善个人资料等步骤。通过本教程，您将能够快速完成账号注册流程。",
    duration: "3:45",
    type: 'video'
  },
  { 
    id: 2, 
    title: "2: 金币充值", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "金币是平台内的虚拟货币，用于购买各类服务。本教程展示了多种充值方式，包括支付宝、微信支付、银行卡转账以及加密货币支付等选项，并提供充值优惠的相关信息。",
    duration: "4:20",
    type: 'video'
  },
  { 
    id: 3, 
    title: "3: 节点购买", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "本教程指导用户如何选择适合自己需求的节点类型并完成购买流程。我们详细比较了不同节点的特点、适用场景和性价比，帮助您做出最佳选择。",
    duration: "5:12",
    type: 'video'
  },
  { 
    id: 4, 
    title: "4: 节点分配", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "购买节点后，需要合理分配资源以优化使用体验。本视频详细讲解了节点分配的原则和操作方法，包括如何根据不同设备和应用场景进行智能分配。",
    duration: "6:30",
    type: 'video'
  },
  { 
    id: 5, 
    title: "5: 节点续费", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "为避免服务中断，及时续费非常重要。本教程介绍了节点到期提醒机制、自动续费设置以及各种续费套餐的优惠政策，帮助用户获得最优惠的价格。",
    duration: "3:18",
    type: 'video'
  },
  { 
    id: 6, 
    title: "6: 模拟器绑定", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "在不同模拟器环境中使用我们的服务需要进行特殊绑定。本教程覆盖了主流模拟器的绑定方法，包括BlueStacks、NoxPlayer和MuMu等，确保在模拟环境中获得最佳性能。",
    duration: "7:42",
    type: 'video'
  },
  { 
    id: 7, 
    title: "7: 替修和检测", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "系统问题诊断与修复是保障服务稳定的关键。本教程详细介绍了常见问题的检测方法和修复步骤，帮助用户自行解决大部分技术问题，提高使用体验。",
    duration: "8:15",
    type: 'video'
  },
  { 
    id: 8, 
    title: "8: 节点切换", 
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    description: "根据网络环境和使用需求灵活切换节点，可以显著提升服务质量。本教程介绍了节点切换的时机、方法以及如何测试并选择最适合当前环境的节点。",
    duration: "4:55",
    type: 'video'
  },
];

const tutorialDocs: DocItem[] = [
  { 
    id: 9, 
    title: "包机下载安装指南", 
    url: "/docs/package-download-install.pdf", 
    description: "详细的图文教程，指导用户如何正确下载并安装包机软件。包含Windows、macOS和Linux三个平台的安装步骤，以及常见问题的解决方案。",
    updateTime: "2023-10-15",
    type: 'doc'
  },
  { 
    id: 10, 
    title: "包机购买授权流程", 
    url: "/docs/package-authorization.pdf", 
    description: "本文档详细说明了包机授权的级别、价格和对应权限，以及完整的购买流程。包含促销活动信息和批量购买折扣政策。",
    updateTime: "2023-11-20",
    type: 'doc'
  },
  { 
    id: 11, 
    title: "包机续费指南", 
    url: "/docs/package-renewal.pdf", 
    description: "介绍包机服务的续费选项、价格和优惠政策。解释了不同时长续费的性价比，以及如何设置自动续费避免服务中断。",
    updateTime: "2023-12-05",
    type: 'doc'
  },
  { 
    id: 12, 
    title: "包机线路切换技巧", 
    url: "/docs/package-line-switching.pdf", 
    description: "详细介绍不同线路的特点和适用场景，以及如何根据网络状况灵活切换线路，优化连接速度和稳定性。",
    updateTime: "2024-01-10",
    type: 'doc'
  },
  { 
    id: 13, 
    title: "包机授权分配方案", 
    url: "/docs/package-auth-distribution.pdf", 
    description: "适合团队使用的授权分配指南，包括如何合理分配授权给不同用户，设置使用权限，以及监控使用情况的方法。",
    updateTime: "2024-02-18",
    type: 'doc'
  },
  { 
    id: 14, 
    title: "包机代理模式详解", 
    url: "/docs/package-proxy-modes.pdf", 
    description: "介绍包机支持的各种代理模式，包括HTTP、SOCKS5、SSH等不同协议的配置方法，以及与各类软件的兼容性说明。",
    updateTime: "2024-03-22",
    type: 'doc'
  },
  { 
    id: 15, 
    title: "常见问题解答(FAQ)", 
    url: "/docs/faq.pdf", 
    description: "汇总了用户最常遇到的问题和相应解决方案，包括连接问题、账号问题、支付问题和性能优化等多个方面。",
    updateTime: "2024-04-01",
    type: 'doc'
  },
  { 
    id: 16, 
    title: "安全使用指南", 
    url: "/docs/security-guide.pdf", 
    description: "介绍如何安全地使用我们的服务，包括账号安全、数据保护、隐私设置以及防范常见网络风险的建议。",
    updateTime: "2024-04-15",
    type: 'doc'
  },
];

const Tutorial = () => {
  const [selectedItem, setSelectedItem] = useState<TutorialItem>(tutorialVideos[0]);
  const [currentType, setCurrentType] = useState<'videos' | 'docs'>('videos');

  // 根据所选标签更新默认选中的项目
  const handleTabChange = (value: string) => {
    if (value === 'videos') {
      setCurrentType('videos');
      setSelectedItem(tutorialVideos[0]);
    } else if (value === 'docs') {
      setCurrentType('docs');
      setSelectedItem(tutorialDocs[0]);
    }
  };

  // 导航到下一个或上一个教程项目
  const navigateItem = (direction: 'next' | 'prev') => {
    const currentList = currentType === 'videos' ? tutorialVideos : tutorialDocs;
    const currentIndex = currentList.findIndex(item => item.id === selectedItem.id);
    
    if (direction === 'next' && currentIndex < currentList.length - 1) {
      setSelectedItem(currentList[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedItem(currentList[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 bg-gray-50 pt-20">
        <div className="w-72 border-r bg-white shadow-sm">
          <Tabs defaultValue="videos" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                视频教程
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                帮助文档
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <TabsContent value="videos" className="m-0">
                <div className="space-y-1 p-2">
                  {tutorialVideos.map((video) => (
                    <button
                      key={video.id}
                      onClick={() => setSelectedItem(video)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center ${
                        selectedItem.id === video.id
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <PlayCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{video.title}</div>
                        <div className="text-xs text-gray-500">{video.duration}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="docs" className="m-0">
                <div className="space-y-1 p-2">
                  {tutorialDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedItem(doc)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center ${
                        selectedItem.id === doc.id
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-xs text-gray-500">更新: {doc.updateTime}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-6">{selectedItem.description}</p>
              
              {selectedItem.type === 'video' ? (
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <iframe 
                    src={selectedItem.url} 
                    className="w-full h-full"
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <a 
                    href={selectedItem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    查看文档
                  </a>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <button 
                  onClick={() => navigateItem('prev')}
                  className="px-4 py-2 flex items-center text-gray-700 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:hover:text-gray-700"
                  disabled={
                    (currentType === 'videos' && selectedItem.id === tutorialVideos[0].id) ||
                    (currentType === 'docs' && selectedItem.id === tutorialDocs[0].id)
                  }
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  上一个
                </button>
                <button 
                  onClick={() => navigateItem('next')}
                  className="px-4 py-2 flex items-center text-gray-700 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:hover:text-gray-700"
                  disabled={
                    (currentType === 'videos' && selectedItem.id === tutorialVideos[tutorialVideos.length - 1].id) ||
                    (currentType === 'docs' && selectedItem.id === tutorialDocs[tutorialDocs.length - 1].id)
                  }
                >
                  下一个
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">相关教程推荐</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(currentType === 'videos' ? tutorialVideos : tutorialDocs)
                .filter(item => item.id !== selectedItem.id)
                .slice(0, 4)
                .map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="text-left p-4 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      {item.type === 'video' 
                        ? <PlayCircle className="h-4 w-4 mr-2 text-blue-600" />
                        : <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      }
                      <h4 className="font-medium">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutorial;
