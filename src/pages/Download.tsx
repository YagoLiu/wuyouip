import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Download,
  Monitor,
  Smartphone,
  CheckCircle2,
  FileText,
  Shield,
  Clock,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomerService from '@/components/CustomerService';
import { getDownloadFiles, DownloadFile, getFileUrl } from '@/lib/supabase';

const DownloadPage = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<DownloadFile | null>(
    null
  );
  const [softwares, setSoftwares] = useState<DownloadFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloadFiles = async () => {
      setLoading(true);
      const { data, error } = await getDownloadFiles();
      if (data) {
        setSoftwares(data);
      } else if (error) {
        console.error('Error fetching download files:', error);
      }
      setLoading(false);
    };

    fetchDownloadFiles();
  }, []);

  // 根据图标名称返回对应的图标组件
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="h-8 w-8" />;
      case 'Monitor':
      default:
        return <Monitor className="h-8 w-8" />;
    }
  };

  // 获取文件扩展名
  const getFileExtension = (filePath: string): string => {
    const match = filePath.match(/\.[^./?#]+$/);
    return match ? match[0] : '';
  };

  // 判断是否为外部链接
  const isExternalLink = (url: string): boolean => {
    // 检查是否为网页链接(不是直接指向下载文件的URL)
    const webExtensions = ['.html', '.htm', '.asp', '.php', '.jsp'];
    const isWebLink =
      url.startsWith('http') &&
      !webExtensions.some((ext) => url.toLowerCase().includes(ext)) &&
      !url.toLowerCase().includes('download=') &&
      !url.toLowerCase().includes('attachment=');

    // 返回是否需要在新窗口打开而非下载
    return !url.includes('supabase') && isWebLink;
  };

  // 获取正确的下载URL
  const getDownloadUrl = (filePath: string): string => {
    // 如果是完整URL，直接返回
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // 否则通过Supabase获取URL
    return getFileUrl(filePath);
  };

  // 处理下载链接点击
  const handleDownloadClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    software: DownloadFile
  ) => {
    const fileUrl = getDownloadUrl(software.file_path);

    // 如果是外部链接，在新窗口打开
    if (isExternalLink(fileUrl)) {
      e.preventDefault(); // 阻止默认下载行为
      window.open(fileUrl, '_blank');
    }
    // 否则继续默认的下载行为，会使用a标签的download属性指定的文件名
  };

  const renderSoftwareDetail = (software: DownloadFile) => (
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
                {getIconComponent(software.icon)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {software.name}
                </h1>
                <p className="text-gray-400">{software.description}</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" />
                软件介绍
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {software.detailed_description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                产品亮点
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {software.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
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
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
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
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
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
                  <span>
                    更新于{' '}
                    {new Date(software.updated_at).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="text-gray-400">版本 {software.version}</div>
              </div>
              <a
                href={getDownloadUrl(software.file_path)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
                download={
                  isExternalLink(getDownloadUrl(software.file_path))
                    ? undefined
                    : `${software.name}${getFileExtension(software.file_path)}`
                }
                onClick={(e) => handleDownloadClick(e, software)}
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
        <div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
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

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
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
                        {getIconComponent(software.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {software.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {software.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>版本 {software.version}</span>
                      <span className="px-2 py-1 rounded-full bg-gray-800/50">
                        {software.category === 'windows'
                          ? 'Windows'
                          : 'Android'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <CustomerService />
    </div>
  );
};

export default DownloadPage;
