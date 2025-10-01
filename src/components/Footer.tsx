import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-400 py-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-pattern.png')] bg-repeat opacity-3"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-600/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-0 right-1/3 w-64 h-64 bg-indigo-600/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-6">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-500 flex-wrap">
              <span>友情链接:</span>
              <a
                href="https://bdm.kk8y.com"
                className="hover:text-blue-400 transition-colors"
              >
                佰达梦货源站
              </a>
              <span>|</span>
              <a
                href="https://user.benfuip.com/main/register?aff=95013885"
                className="hover:text-blue-400 transition-colors"
              >
                奔富加速器
              </a>
              <span>|</span>
              <a
                href="http://api.liangziip.com:1234/reg/index.php?code=800106611"
                className="hover:text-blue-400 transition-colors"
              >
                量子加速器
              </a>
              <span>|</span>
              <a
                href="baidameng.ysepan.com"
                className="hover:text-blue-400 transition-colors"
              >
                佰达梦软件下载网盘
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 客服二维码 */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-0.5">
              <div className="bg-gray-900 rounded-lg px-4 py-2">
                <img
                  src="/kefu.png"
                  alt="客服二维码"
                  className="h-24 w-24 object-cover"
                />
                <p className="text-center text-xs mt-1">扫码添加客服</p>
              </div>
            </div>

            {/* 微信公众号二维码 */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-0.5">
              <div className="bg-gray-900 rounded-lg px-4 py-2">
                <img
                  src="/微信公众号.png"
                  alt="微信二维码"
                  className="h-24 w-24 object-cover"
                />
                <p className="text-center text-xs mt-1">微信公众号</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 text-xs mt-6 border-t border-gray-800 pt-6">
          <p className="max-w-6xl mx-auto">
            免责声明:
            请严格遵守中华人民共和国的法律法规规范，任何使用本软件造成的后果，出于个人承担，必要情况下我司会提供协助给监管部门调查。
          </p>
          <div className="flex justify-center">
            <a target="_blank" title="51la网站统计" href=" ">
              <img src="https://sdk.51.la/icon/3-2.png" alt="51la网站统计" />
            </a>
          </div>
          <p className="flex items-center justify-center space-x-2">
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              沪ICP备2024070706号-1
            </a>
            <img src="/备案.png" alt="备案图标" className="h-4" />
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=31011302008320"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              沪公网安备31011302008320号
            </a>
          </p>
          <p className="text-gray-600">© 2023-2024 无忧IP. 保留所有权利</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
