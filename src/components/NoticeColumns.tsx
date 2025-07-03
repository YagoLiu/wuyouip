import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  AlertCircle,
  FileText,
  ChevronRight,
  Bell,
  Calendar,
  TrendingUp,
  ExternalLink,
  Clock,
  Pin,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNotices, Notice } from '@/lib/supabase';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const NoticeColumns: React.FC = () => {
  const [notices, setNotices] = useState<{
    official: Notice[];
    common: Notice[];
    industry: Notice[];
  }>({
    official: [],
    common: [],
    industry: [],
  });

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'official' | 'common' | 'industry'
  >('official');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchAllNotices = async () => {
      setLoading(true);

      try {
        // 获取各分类的通知
        const [officialResult, commonResult, industryResult] =
          await Promise.all([
            getNotices('official', 8),
            getNotices('common', 8),
            getNotices('industry', 8),
          ]);

        setNotices({
          official: officialResult.data || [],
          common: commonResult.data || [],
          industry: industryResult.data || [],
        });
      } catch (error) {
        console.error('获取通知失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNotices();
  }, []);

  const categories = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: '官方公告',
      color: 'blue',
      category: 'official',
      data: notices.official,
      description: '了解产品更新、服务调整和重要通知',
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      title: '常知公告',
      color: 'cyan',
      category: 'common',
      data: notices.common,
      description: '获取使用技巧、常见问题解答和操作指南',
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: '行业资讯',
      color: 'purple',
      category: 'industry',
      data: notices.industry,
      description: '掌握行业动态、技术趋势和市场分析',
    },
  ];

  // 模拟置顶公告
  const pinnedNotices: Notice[] = [
    {
      id: 10001,
      title: '关于服务升级的重要公告',
      content: '关于服务升级的重要公告',
      created_at: '2024-04-15T00:00:00Z',
      category: 'official',
    },
    {
      id: 10002,
      title: '5月份节点扩容计划及优惠活动',
      content: '5月份节点扩容计划及优惠活动',
      created_at: '2024-04-28T00:00:00Z',
      category: 'official',
    },
  ];

  const getCategoryInfo = (category: string) => {
    const info = categories.find((cat) => cat.category === category);
    return info || categories[0];
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/5 w-64 h-64 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/5 w-72 h-72 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block mb-3 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">
              最新动态 · 重要消息
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-400">
            通知公告中心
          </h2>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            了解产品最新动态，获取使用技巧，掌握行业资讯，助您全面提升使用体验
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20">
              实时更新
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm border border-purple-500/20">
              技术支持
            </div>
            <div className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
              行业洞察
            </div>
          </div>
        </div>

        {/* 置顶公告 */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">重要通知</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotices.map((notice) => (
              <div
                key={notice.id}
                className="relative group overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedNotice(notice);
                  setShowDialog(true);
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative p-0.5 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30">
                  <div className="bg-gradient-to-b from-gray-900/90 to-gray-950/90 p-4 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Pin className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 text-xs font-medium">
                          置顶公告
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{notice.created_at.substring(0, 10)}</span>
                      </div>
                    </div>
                    <h4 className="text-white font-medium text-lg mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {notice.title}
                    </h4>
                    <div className="flex items-center justify-between mt-3">
                      <div className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full">
                        {notice.category === 'official'
                          ? '官方公告'
                          : '系统通知'}
                      </div>
                      <span className="flex items-center text-blue-400 text-sm group-hover:translate-x-1 transition-transform duration-300">
                        查看详情 <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分类标签 */}
        <div className="max-w-6xl mx-auto mb-6">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() =>
                  setActiveTab(
                    category.category as 'official' | 'common' | 'industry'
                  )
                }
                className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  activeTab === category.category
                    ? `bg-${category.color}-500/20 text-${category.color}-400 border border-${category.color}-500/30`
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 公告列表区域 */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-gray-800/50">
            {/* 当前分类描述 */}
            {categories.map(
              (category) =>
                category.category === activeTab && (
                  <div key={category.category} className="mb-8">
                    <div
                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-${category.color}-500/10 mb-4`}
                    >
                      {category.icon}
                      <h3 className={`text-${category.color}-400 font-medium`}>
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 max-w-3xl">
                      {category.description}
                    </p>
                  </div>
                )
            )}

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categories
                  .find((c) => c.category === activeTab)
                  ?.data.map((notice, i) => (
                    <div
                      key={notice.id || i}
                      className="group cursor-pointer"
                      onClick={() => {
                        setSelectedNotice(notice);
                        setShowDialog(true);
                      }}
                    >
                      <div className="flex items-start p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300">
                        <div
                          className={`p-2 rounded-lg bg-${
                            getCategoryInfo(notice.category).color
                          }-500/10 text-${
                            getCategoryInfo(notice.category).color
                          }-400 mr-4 mt-0.5 flex-shrink-0`}
                        >
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-300 font-medium mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                            {notice.title || `公告标题 #${i + 1}`}
                          </h4>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                            {notice.excerpt ||
                              '这里是公告摘要内容，点击可查看完整公告详情...'}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock className="h-3.5 w-3.5" />
                              <span>
                                {notice.created_at?.substring(0, 10) ||
                                  '2024-04-28'}
                              </span>
                            </div>
                            <span
                              className={`flex items-center gap-1 text-${
                                getCategoryInfo(notice.category).color
                              }-400`}
                            >
                              查看详情 <ExternalLink className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="mt-10 text-center">
              <a
                href={`/notices?category=${activeTab}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white rounded-xl border border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                查看更多公告
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
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
                    <div
                      className={`p-2.5 rounded-lg bg-${
                        getCategoryInfo(selectedNotice.category).color
                      }-500/15 text-${
                        getCategoryInfo(selectedNotice.category).color
                      }-400 mr-4`}
                    >
                      {getCategoryInfo(selectedNotice.category).icon}
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-xl text-white mb-1">
                      {selectedNotice.title}
                    </DialogTitle>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-gray-800/80 text-xs mr-3">
                        {getCategoryInfo(selectedNotice.category).title}
                      </span>
                      <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      {selectedNotice.created_at
                        ? new Date(
                            selectedNotice.created_at
                          ).toLocaleDateString('zh-CN')
                        : ''}
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
                {selectedNotice.content || selectedNotice.title}
              </div>
            </div>
            <div className="p-4 border-t border-gray-800/60 flex justify-end">
              <Button
                variant="ghost"
                className={`bg-${
                  getCategoryInfo(selectedNotice.category).color
                }-500/10 hover:bg-${
                  getCategoryInfo(selectedNotice.category).color
                }-500/20 border border-${
                  getCategoryInfo(selectedNotice.category).color
                }-500/30 text-${
                  getCategoryInfo(selectedNotice.category).color
                }-400`}
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

export default NoticeColumns;
