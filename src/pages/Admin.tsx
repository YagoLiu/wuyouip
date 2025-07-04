import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Search,
  Calendar,
  MessageCircle,
  AlertCircle,
  FileText,
  ChevronRight,
  X,
  Download,
} from 'lucide-react';
import {
  supabase,
  Notice,
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  loginAdmin,
} from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 对话框状态
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );
  const [currentNotice, setCurrentNotice] = useState<Partial<Notice>>({
    title: '',
    content: '',
    category: 'official',
  });

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

  // 检查用户登录状态
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        fetchNotices();
      }
    };

    checkSession();
  }, []);

  // 获取公告列表
  const fetchNotices = async () => {
    setLoading(true);
    const category = activeTab !== 'all' ? activeTab : undefined;
    const { data } = await getNotices(category, 100);
    if (data) {
      setNotices(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchNotices();
    }
  }, [activeTab, isLoggedIn]);

  // 处理登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await loginAdmin(email, password);

      if (error) {
        toast({
          title: '登录失败',
          description: error.message,
          variant: 'destructive',
        });
      } else if (data) {
        setIsLoggedIn(true);
        toast({
          title: '登录成功',
          description: '欢迎回来，管理员！',
        });
        fetchNotices();
      }
    } catch (error) {
      toast({
        title: '登录失败',
        description: '发生未知错误',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 处理登出
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    toast({
      title: '已登出',
      description: '您已成功退出系统',
    });
  };

  // 打开创建公告对话框
  const openCreateDialog = () => {
    setCurrentNotice({
      title: '',
      content: '',
      category: 'official',
    });
    setDialogMode('create');
    setShowDialog(true);
  };

  // 打开编辑公告对话框
  const openEditDialog = (notice: Notice) => {
    setCurrentNotice(notice);
    setDialogMode('edit');
    setShowDialog(true);
  };

  // 打开查看公告对话框
  const openViewDialog = (notice: Notice) => {
    setCurrentNotice(notice);
    setDialogMode('view');
    setShowDialog(true);
  };

  // 保存公告
  const handleSaveNotice = async () => {
    if (
      !currentNotice.title ||
      !currentNotice.content ||
      !currentNotice.category
    ) {
      toast({
        title: '错误',
        description: '请填写完整信息',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (dialogMode === 'create') {
        await createNotice({
          title: currentNotice.title,
          content: currentNotice.content,
          category: currentNotice.category as
            | 'official'
            | 'common'
            | 'industry',
        });
        toast({
          title: '创建成功',
          description: '公告已成功发布',
        });
      } else {
        if (currentNotice.id) {
          await updateNotice(currentNotice.id, {
            title: currentNotice.title,
            content: currentNotice.content,
            category: currentNotice.category as
              | 'official'
              | 'common'
              | 'industry',
          });
          toast({
            title: '更新成功',
            description: '公告已成功更新',
          });
        }
      }
      setShowDialog(false);
      fetchNotices();
    } catch (error) {
      toast({
        title: '操作失败',
        description: '保存公告时发生错误',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // 删除公告
  const handleDeleteNotice = async (id: number) => {
    if (window.confirm('确定要删除这条公告吗？')) {
      setLoading(true);
      try {
        await deleteNotice(id);
        toast({
          title: '删除成功',
          description: '公告已成功删除',
        });
        fetchNotices();
      } catch (error) {
        toast({
          title: '删除失败',
          description: '删除公告时发生错误',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // 过滤搜索结果
  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 获取分类图标和颜色
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'official':
        return {
          icon: <MessageCircle className="h-5 w-5" />,
          title: '官方公告',
          color: 'blue',
        };
      case 'common':
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          title: '常知公告',
          color: 'cyan',
        };
      case 'industry':
        return {
          icon: <FileText className="h-5 w-5" />,
          title: '行业资讯',
          color: 'purple',
        };
      default:
        return {
          icon: <MessageCircle className="h-5 w-5" />,
          title: '官方公告',
          color: 'blue',
        };
    }
  };

  // 登录页面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <Card className="w-full max-w-md relative z-10 bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-800/50 rounded-full">
                <LogOut className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-white">
              管理员登录
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              请输入您的管理员账号和密码
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  用户名
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="请输入邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  密码
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800/50 border-gray-700 text-gray-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  '登录'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800/40 pt-4">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-gray-300"
              onClick={() => navigate('/')}
            >
              返回首页
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 管理员面板
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <div className="inline-block mb-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="text-purple-400 text-sm font-medium">
                管理中心
              </span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-indigo-400">
              通知公告管理
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800/50"
              onClick={() => navigate('/admin/downloads')}
            >
              <Download className="h-4 w-4 mr-2 text-gray-400" />
              下载文件管理
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800/50"
              onClick={() => navigate('/notices')}
            >
              <Eye className="h-4 w-4 mr-2 text-gray-400" />
              查看公告页面
            </Button>
            <Button
              variant="ghost"
              className="border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索公告标题或内容..."
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={openCreateDialog}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              新增公告
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6 bg-gray-800/70 p-1 border border-gray-700/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-600/80 data-[state=active]:text-white"
              >
                全部公告
              </TabsTrigger>
              <TabsTrigger
                value="official"
                className="data-[state=active]:bg-blue-600/80 data-[state=active]:text-white"
              >
                官方公告
              </TabsTrigger>
              <TabsTrigger
                value="common"
                className="data-[state=active]:bg-cyan-600/80 data-[state=active]:text-white"
              >
                常知公告
              </TabsTrigger>
              <TabsTrigger
                value="industry"
                className="data-[state=active]:bg-purple-600/80 data-[state=active]:text-white"
              >
                行业资讯
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="min-h-[50vh]">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                </div>
              ) : filteredNotices.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  暂无相关公告
                </div>
              ) : (
                <div className="space-y-4 custom-scrollbar overflow-y-auto max-h-[60vh]">
                  {filteredNotices.map((notice) => {
                    const categoryInfo = getCategoryInfo(notice.category);
                    return (
                      <div
                        key={notice.id}
                        className="relative p-0.5 rounded-xl overflow-hidden group"
                      >
                        <div
                          className={`absolute -inset-1 bg-gradient-to-r from-${categoryInfo.color}-500/20 to-${categoryInfo.color}-400/20 rounded-xl blur-sm opacity-30 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-5 relative">
                          <div className="flex items-start">
                            <div
                              className={`p-2 rounded-lg bg-${categoryInfo.color}-500/10 text-${categoryInfo.color}-400 mr-4 mt-1 flex-shrink-0`}
                            >
                              {categoryInfo.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-white">
                                  {notice.title}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                                  {new Date(
                                    notice.created_at
                                  ).toLocaleDateString('zh-CN')}
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm whitespace-pre-line line-clamp-2 mb-3">
                                {notice.content}
                              </p>
                              <div className="flex justify-between items-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full bg-${categoryInfo.color}-500/10 text-${categoryInfo.color}-400 text-xs`}
                                >
                                  {categoryInfo.title}
                                </span>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openViewDialog(notice)}
                                    className={`text-${categoryInfo.color}-400 hover:bg-${categoryInfo.color}-500/10 hover:text-${categoryInfo.color}-300`}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    查看
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => openEditDialog(notice)}
                                    className="text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    编辑
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                      handleDeleteNotice(notice.id)
                                    }
                                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    删除
                                  </Button>
                                </div>
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
      </div>

      {/* 公告对话框 - 查看/编辑/创建 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {dialogMode === 'view' ? (
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800 p-0">
            <div className="p-5 border-b border-gray-800/60">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {currentNotice.category && (
                    <div
                      className={`p-2.5 rounded-lg bg-${
                        getCategoryInfo(currentNotice.category).color
                      }-500/15 text-${
                        getCategoryInfo(currentNotice.category).color
                      }-400 mr-4`}
                    >
                      {getCategoryInfo(currentNotice.category).icon}
                    </div>
                  )}
                  <div>
                    <DialogTitle className="text-xl text-white mb-1">
                      {currentNotice.title}
                    </DialogTitle>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="px-2 py-0.5 rounded-full bg-gray-800/80 text-xs mr-3">
                        {currentNotice.category &&
                          getCategoryInfo(currentNotice.category).title}
                      </span>
                      <Calendar className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                      {currentNotice.created_at &&
                        new Date(currentNotice.created_at).toLocaleDateString(
                          'zh-CN'
                        )}
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
                {currentNotice.content}
              </div>
            </div>

            <div className="p-4 border-t border-gray-800/60 flex justify-between">
              <Button
                variant="ghost"
                className="text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
                onClick={() => setDialogMode('edit')}
              >
                <Edit className="h-4 w-4 mr-2" />
                编辑
              </Button>
              <Button
                variant="ghost"
                className={`bg-${
                  currentNotice.category &&
                  getCategoryInfo(currentNotice.category).color
                }-500/10 hover:bg-${
                  currentNotice.category &&
                  getCategoryInfo(currentNotice.category).color
                }-500/20 border border-${
                  currentNotice.category &&
                  getCategoryInfo(currentNotice.category).color
                }-500/30 text-${
                  currentNotice.category &&
                  getCategoryInfo(currentNotice.category).color
                }-400`}
                onClick={() => setShowDialog(false)}
              >
                关闭
              </Button>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-gray-950 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                {dialogMode === 'create' ? '创建新公告' : '编辑公告'}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                请填写以下信息以
                {dialogMode === 'create' ? '发布新公告' : '更新公告'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 overflow-y-auto custom-scrollbar max-h-[60vh]">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  标题
                </Label>
                <Input
                  id="title"
                  placeholder="公告标题"
                  value={currentNotice.title || ''}
                  onChange={(e) =>
                    setCurrentNotice({
                      ...currentNotice,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-800/50 border-gray-700 text-gray-200 px-3 w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  分类
                </Label>
                <Select
                  value={currentNotice.category}
                  onValueChange={(value) =>
                    setCurrentNotice({
                      ...currentNotice,
                      category: value as 'official' | 'common' | 'industry',
                    })
                  }
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-gray-200 w-full">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="official">官方公告</SelectItem>
                    <SelectItem value="common">常知公告</SelectItem>
                    <SelectItem value="industry">行业资讯</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300">
                  内容
                </Label>
                <Textarea
                  id="content"
                  placeholder="公告内容"
                  rows={8}
                  value={currentNotice.content || ''}
                  onChange={(e) =>
                    setCurrentNotice({
                      ...currentNotice,
                      content: e.target.value,
                    })
                  }
                  className="bg-gray-800/50 border-gray-700 text-gray-200 min-h-[200px] w-full px-3 py-2"
                />
              </div>
            </div>

            <DialogFooter className="border-t border-gray-800/60 pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  dialogMode === 'edit' && currentNotice.id
                    ? setDialogMode('view')
                    : setShowDialog(false)
                }
                className="border-gray-700 hover:bg-gray-800 text-gray-300"
              >
                {dialogMode === 'edit' && currentNotice.id
                  ? '返回查看'
                  : '取消'}
              </Button>
              <Button
                onClick={handleSaveNotice}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading
                  ? '保存中...'
                  : dialogMode === 'create'
                  ? '发布'
                  : '更新'}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default AdminPage; 