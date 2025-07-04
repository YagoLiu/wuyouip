import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Upload,
  ArrowUp,
  ArrowDown,
  Monitor,
  Smartphone,
} from 'lucide-react';
import {
  supabase,
  loginAdmin,
  DownloadFile,
  getDownloadFiles,
  createDownloadFile,
  updateDownloadFile,
  deleteDownloadFile,
  updateDownloadFileOrder,
  uploadDownloadFile,
} from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const AdminDownloadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadFiles, setDownloadFiles] = useState<DownloadFile[]>([]);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [currentFile, setCurrentFile] = useState<Partial<DownloadFile>>({
    name: '',
    description: '',
    category: 'windows',
    version: '最新版',
    size: '--',
    icon: 'Monitor',
    features: [],
    requirements: [],
    highlights: [],
    detailed_description: '',
  });
  const [uploading, setUploading] = useState(false);
  // 使用布尔型标记上传模式，true表示上传文件，false表示手动输入
  const [isUploadMode, setIsUploadMode] = useState<boolean>(true);
  const [selectedUpload, setSelectedUpload] = useState<File | null>(null);

  // login check on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        fetchDownloadFiles();
      }
    };
    checkSession();
  }, []);

  const fetchDownloadFiles = async () => {
    setLoading(true);
    const { data, error } = await getDownloadFiles();
    if (data) setDownloadFiles(data);
    else if (error) console.error(error);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await loginAdmin(email, password);
    if (error) {
      toast({
        title: '登录失败',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setIsLoggedIn(true);
      toast({ title: '登录成功' });
      fetchDownloadFiles();
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setCurrentFile({
      name: '',
      description: '',
      category: 'windows',
      version: '最新版',
      size: '--',
      icon: 'Monitor',
      features: [],
      requirements: [],
      highlights: [],
      detailed_description: '',
    });
    setDialogMode('create');
    setShowDialog(true);
  };

  const openEditDialog = (file: DownloadFile) => {
    setCurrentFile(file);
    setDialogMode('edit');
    setShowDialog(true);
  };

  const handleFileUpload = async (): Promise<string | null> => {
    if (!selectedUpload) return currentFile.file_path || null;

    // 检查认证状态
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      toast({
        title: '认证错误',
        description: '您的登录已过期，请重新登录',
        variant: 'destructive',
      });
      setIsLoggedIn(false);
      return null;
    }

    setUploading(true);
    // Supabase Storage 只接受 ASCII，可先将文件名转换为安全格式
    const extMatch = selectedUpload.name.match(/\.[^.]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const baseName = selectedUpload.name.replace(/\.[^.]+$/, '');
    const safeBase = baseName
      .normalize('NFKD')
      .replace(/[^a-zA-Z0-9-_]/g, '') // 保留 ASCII、数字、-、_
      .slice(0, 50); // 控制长度
    const filePath = `${Date.now()}_${safeBase}${ext}`;

    try {
      const { error } = await uploadDownloadFile(filePath, selectedUpload);
      setUploading(false);
      if (error) {
        console.error('Upload error details:', error);
        toast({
          title: '上传失败',
          description: `错误: ${error.message}`,
          variant: 'destructive',
        });
        return null;
      }
      return filePath;
    } catch (e) {
      console.error('Upload exception:', e);
      setUploading(false);
      toast({
        title: '上传异常',
        description: '请检查网络连接和文件大小',
        variant: 'destructive',
      });
      return null;
    }
  };

  const handleSaveFile = async () => {
    if (!currentFile.name || !currentFile.description) {
      toast({
        title: '错误',
        description: '名称和描述不能为空',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    // 根据是否有选择上传文件来决定路径
    let finalFilePath = currentFile.file_path || '';

    // 如果选择了上传文件，则执行上传
    if (selectedUpload) {
      const uploadedPath = await handleFileUpload();
      if (uploadedPath === null) {
        setLoading(false);
        return;
      }
      finalFilePath = uploadedPath;
    } else if (!finalFilePath) {
      // 如果既没选文件也没输入路径
      toast({
        title: '错误',
        description: '请上传文件或输入下载链接',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const payloadForUpdate: Partial<DownloadFile> = {
      name: currentFile.name,
      description: currentFile.description,
      category: currentFile.category,
      version: currentFile.version,
      size: currentFile.size,
      icon: currentFile.icon,
      features: currentFile.features,
      requirements: currentFile.requirements,
      highlights: currentFile.highlights,
      detailed_description: currentFile.detailed_description,
      file_path: finalFilePath,
    };

    const payloadForInsert: Omit<
      DownloadFile,
      'id' | 'created_at' | 'updated_at'
    > & { display_order: number } = {
      ...(payloadForUpdate as Omit<
        DownloadFile,
        'id' | 'created_at' | 'updated_at'
      >),
      display_order: downloadFiles.length,
    };

    try {
      if (dialogMode === 'create') {
        await createDownloadFile(payloadForInsert);
        toast({ title: '创建成功' });
      } else if (currentFile.id) {
        await updateDownloadFile(currentFile.id, payloadForUpdate);
        toast({ title: '更新成功' });
      }
      setShowDialog(false);
      fetchDownloadFiles();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      toast({ title: '操作失败', description: errMsg, variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleDeleteFile = async (id: number) => {
    if (!window.confirm('确认删除该文件？')) return;
    setLoading(true);
    await deleteDownloadFile(id);
    toast({ title: '删除成功' });
    fetchDownloadFiles();
    setLoading(false);
  };

  const moveOrder = async (id: number, direction: 'up' | 'down') => {
    const index = downloadFiles.findIndex((f) => f.id === id);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= downloadFiles.length) return;
    // swap display_order values
    const first = downloadFiles[index];
    const second = downloadFiles[newIndex];
    await updateDownloadFileOrder(first.id, second.display_order);
    await updateDownloadFileOrder(second.id, first.display_order);
    fetchDownloadFiles();
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="h-5 w-5" />;
      case 'Monitor':
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  /* ---------------------- UI rendering ----------------------- */

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 p-6 rounded-md w-full max-w-sm space-y-4"
        >
          <h2 className="text-xl font-semibold text-white text-center">
            管理员登录
          </h2>
          <Input
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-gray-200"
          />
          <Input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-gray-200"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '登录中...' : '登录'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">下载文件管理</h1>
          <div className="flex gap-2">
            <Button onClick={openCreateDialog} className="bg-blue-600">
              <Plus className="h-4 w-4 mr-1" /> 新增
            </Button>
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              返回公告管理
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                setIsLoggedIn(false);
              }}
            >
              <LogOut className="h-4 w-4 mr-1" /> 退出
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">加载中...</div>
        ) : downloadFiles.length === 0 ? (
          <div className="text-center py-20">暂无数据</div>
        ) : (
          <div className="space-y-4">
            {downloadFiles.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center bg-gray-900 p-4 rounded-md"
              >
                <div className="w-8 mr-3 text-indigo-400">
                  {getIconComponent(file.icon)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-sm text-gray-400">
                    {file.version} · {file.category}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => moveOrder(file.id, 'up')}
                    disabled={idx === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => moveOrder(file.id, 'down')}
                    disabled={idx === downloadFiles.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => window.open(`/download`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => openEditDialog(file)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? '新增下载文件' : '编辑下载文件'}
            </DialogTitle>
            <DialogDescription>填写文件信息</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div>
              <Label>名称</Label>
              <Input
                value={currentFile.name || ''}
                onChange={(e) =>
                  setCurrentFile({ ...currentFile, name: e.target.value })
                }
                className="bg-gray-800"
              />
            </div>
            <div>
              <Label>描述</Label>
              <Input
                value={currentFile.description || ''}
                onChange={(e) =>
                  setCurrentFile({
                    ...currentFile,
                    description: e.target.value,
                  })
                }
                className="bg-gray-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>分类</Label>
                <Select
                  value={currentFile.category}
                  onValueChange={(v) =>
                    setCurrentFile({ ...currentFile, category: v })
                  }
                >
                  <SelectTrigger className="bg-gray-800 text-gray-200">
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem
                      value="windows"
                      className="focus:bg-gray-700 focus:text-white"
                    >
                      Windows
                    </SelectItem>
                    <SelectItem
                      value="android"
                      className="focus:bg-gray-700 focus:text-white"
                    >
                      Android
                    </SelectItem>
                    <SelectItem
                      value="mac"
                      className="focus:bg-gray-700 focus:text-white"
                    >
                      Mac
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>图标</Label>
                <Select
                  value={currentFile.icon}
                  onValueChange={(v) =>
                    setCurrentFile({ ...currentFile, icon: v })
                  }
                >
                  <SelectTrigger className="bg-gray-800 text-gray-200">
                    <SelectValue placeholder="选择图标" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem
                      value="Monitor"
                      className="focus:bg-gray-700 focus:text-white"
                    >
                      Monitor
                    </SelectItem>
                    <SelectItem
                      value="Smartphone"
                      className="focus:bg-gray-700 focus:text-white"
                    >
                      Smartphone
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>版本</Label>
                <Input
                  value={currentFile.version || ''}
                  onChange={(e) =>
                    setCurrentFile({ ...currentFile, version: e.target.value })
                  }
                  className="bg-gray-800"
                />
              </div>
              <div>
                <Label>大小</Label>
                <Input
                  value={currentFile.size || ''}
                  onChange={(e) =>
                    setCurrentFile({ ...currentFile, size: e.target.value })
                  }
                  className="bg-gray-800"
                />
              </div>
            </div>
            <div>
              <Label>软件特点 (逗号分隔)</Label>
              <Textarea
                rows={2}
                value={currentFile.features?.join(',') || ''}
                onChange={(e) =>
                  setCurrentFile({
                    ...currentFile,
                    features: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="bg-gray-800"
              />
            </div>
            <div>
              <Label>系统要求 (逗号分隔)</Label>
              <Textarea
                rows={2}
                value={currentFile.requirements?.join(',') || ''}
                onChange={(e) =>
                  setCurrentFile({
                    ...currentFile,
                    requirements: e.target.value
                      .split(',')
                      .map((s) => s.trim()),
                  })
                }
                className="bg-gray-800"
              />
            </div>
            <div>
              <Label>产品亮点 (逗号分隔)</Label>
              <Textarea
                rows={2}
                value={currentFile.highlights?.join(',') || ''}
                onChange={(e) =>
                  setCurrentFile({
                    ...currentFile,
                    highlights: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                className="bg-gray-800"
              />
            </div>
            <div>
              <Label>详细描述</Label>
              <Textarea
                rows={4}
                value={currentFile.detailed_description || ''}
                onChange={(e) =>
                  setCurrentFile({
                    ...currentFile,
                    detailed_description: e.target.value,
                  })
                }
                className="bg-gray-800"
              />
            </div>
            <div>
              <Label>下载链接设置</Label>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm text-gray-400">选择方式</Label>
                  <Select
                    value={isUploadMode ? 'upload' : 'manual'}
                    onValueChange={(v) => {
                      if (v === 'manual') {
                        setIsUploadMode(false);
                        setSelectedUpload(null);
                      } else {
                        setIsUploadMode(true);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-gray-800 text-gray-200 mt-1">
                      <SelectValue placeholder="选择链接方式" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem
                        value="upload"
                        className="focus:bg-gray-700 focus:text-white"
                      >
                        上传文件
                      </SelectItem>
                      <SelectItem
                        value="manual"
                        className="focus:bg-gray-700 focus:text-white"
                      >
                        手动输入链接
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!isUploadMode ? (
                  <div>
                    <Label className="text-sm text-gray-400">
                      直接输入下载链接
                    </Label>
                    <Input
                      value={currentFile.file_path || ''}
                      onChange={(e) =>
                        setCurrentFile({
                          ...currentFile,
                          file_path: e.target.value,
                        })
                      }
                      placeholder="例如：/文件名.exe 或 https://..."
                      className="bg-gray-800 mt-1"
                    />
                  </div>
                ) : (
                  <div>
                    <Label className="text-sm text-gray-400">上传文件</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setSelectedUpload(e.target.files?.[0] || null)
                      }
                      className="bg-gray-800 mt-1"
                    />
                    {selectedUpload && (
                      <p className="text-sm mt-1 text-gray-400">
                        {selectedUpload.name}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="bg-gray-800 text-white hover:bg-gray-700 hover:text-white"
            >
              取消
            </Button>
            <Button
              onClick={handleSaveFile}
              disabled={loading || uploading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading || uploading ? '保存中...' : '保存'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDownloadsPage;
