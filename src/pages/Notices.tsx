import React, { useState, useEffect } from 'react';
import { MessageCircle, AlertCircle, FileText, ChevronRight, X, Calendar } from 'lucide-react';
import { getNotices, Notice } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const NoticesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState(categoryParam || 'all');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // 当URL参数变化时更新activeTab
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      const category = activeTab !== 'all' ? activeTab : undefined;
      const { data, error } = await getNotices(category, 20);
      if (data) {
        setNotices(data);
      }
      setLoading(false);
    };

    fetchNotices();
  }, [activeTab]);

  // 添加自定义滚动条样式
  useEffect(() => {
    // 添加全局样式
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(31, 41, 55, 0.2);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(75, 85, 99, 0.5);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(75, 85, 99, 0.7);
      }
    `;
    document.head.appendChild(styleElement);

    // 组件卸载时移除样式
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // 当标签改变时更新URL参数
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'all') {
      navigate('/notices');
    } else {
      navigate(`/notices?category=${value}`);
    }
  };

  // 打开公告详情
  const openNoticeDetail = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowDialog(true);
  };

  const categories = [
    {
      id: 'official',
      icon: <MessageCircle className="h-5 w-5" />,
      title: "官方公告",
      color: "blue",
    },
    {
      id: 'common',
      icon: <AlertCircle className="h-5 w-5" />,
      title: "常知公告",
      color: "cyan",
    },
    {
      id: 'industry',
      icon: <FileText className="h-5 w-5" />,
      title: "行业资讯",
      color: "purple",
    }
  ];

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id) || categories[0];
  };

  return (
    <section className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-10 flex-1 flex flex-col relative z-10">
        {/* 底部行动区域 */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-800/30 to-gray-900/30 rounded-2xl p-8 text-center border border-indigo-500/10 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">准备好开始使用无忧IP了吗？</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            只需简单几步，您就可以获得全球高质量IP代理服务，无论是数据采集、游戏加速还是全球化业务，无忧IP都能满足您的需求。
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 w-full md:w-auto">
              立即注册开始
            </button>
            <button className="px-6 py-3 bg-gray-800 text-white font-medium rounded-xl border border-indigo-500/20 hover:bg-gray-700 transition-colors duration-300 w-full md:w-auto">
              联系客服咨询
            </button>
          </div>
        </div>

        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-block mb-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">最新动态 · 重要消息</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-400">
            通知公告
          </h2>
          <p className="text-gray-400 text-sm mb-5">
            了解产品最新动态，获取使用技巧，掌握行业资讯
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={handleTabChange}
            className="w-full flex-1 flex flex-col"
          >
            <div className="w-full mb-8">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">全部公告</TabsTrigger>
                <TabsTrigger value="official">官方公告</TabsTrigger>
                <TabsTrigger value="common">常知公告</TabsTrigger>
                <TabsTrigger value="industry">行业资讯</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="flex-1 flex flex-col h-full">
              {loading ? (
                <div className="flex justify-center items-center flex-1">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                </div>
              ) : notices.length === 0 ? (
                <div className="text-center py-20 text-gray-400 flex-1 flex items-center justify-center">
                  暂无相关公告
                </div>
              ) : (
                <div className="space-y-6 overflow-y-auto flex-1 pb-8 custom-scrollbar">
                  {notices.map((notice) => {
                    const category = getCategoryById(notice.category);
                    return (
                      <div 
                        key={notice.id} 
                        className="relative p-0.5 rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => openNoticeDetail(notice)}
                      >
                        <div className={`absolute -inset-1 bg-gradient-to-r from-${category.color}-500/20 to-${category.color}-400/20 rounded-xl blur-sm opacity-30 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-5 relative">
                          <div className="flex items-start">
                            <div className={`p-2 rounded-lg bg-${category.color}-500/10 text-${category.color}-400 mr-4 mt-1 flex-shrink-0`}>
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white">
                                  {notice.title}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  {new Date(notice.created_at).toLocaleDateString('zh-CN')}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm whitespace-pre-line line-clamp-3">
                                {notice.content}
                              </p>
                              <div className="mt-2 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`text-${category.color}-400 opacity-70 hover:opacity-100 hover:bg-${category.color}-500/10 hover:text-${category.color}-300 text-xs font-medium transition-all`}
                                >
                                  查看详情
                                  <ChevronRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-auto pt-6 pb-4 text-center">
          <Button variant="link" onClick={() => navigate('/')}>
            返回首页
          </Button>
        </div>
      </div>



      {/* 公告详情对话框 */}
      {selectedNotice && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 p-0">
            <div className="p-5 border-b border-gray-800/60">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {selectedNotice.category && (
                    <div className={`p-2.5 rounded-lg bg-${getCategoryById(selectedNotice.category).color}-500/15 text-${getCategoryById(selectedNotice.category).color}-400 mr-4`}>
                      {getCategoryById(selectedNotice.category).icon}
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-xl text-white mb-1">{selectedNotice.title}</DialogTitle>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-gray-800/80 text-xs mr-3">
                        {getCategoryById(selectedNotice.category).title}
                      </span>
                      <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      {new Date(selectedNotice.created_at).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-800/80 -mr-2 -mt-1" 
                  onClick={() => setShowDialog(false)}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
              <div className="text-gray-300/90 whitespace-pre-line text-sm leading-relaxed">
                {selectedNotice.content}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800/60 flex justify-end">
              <Button 
                variant="ghost" 
                className={`bg-${getCategoryById(selectedNotice.category).color}-500/10 hover:bg-${getCategoryById(selectedNotice.category).color}-500/20 border border-${getCategoryById(selectedNotice.category).color}-500/30 text-${getCategoryById(selectedNotice.category).color}-400`}
                onClick={() => setShowDialog(false)}
              >
                关闭
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default NoticesPage; 