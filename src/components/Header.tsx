import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 backdrop-blur-md bg-opacity-90 top-0 w-full z-50 fixed">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="无忧IP" className="h-10 w-10 rounded-lg shadow-lg" />
          <h1 className="text-xl font-bold ml-3 text-white">无忧IP</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-200 hover:text-blue-300 transition-colors duration-300">首页</Link></li>
              <li><Link to="/tutorial" className="text-gray-200 hover:text-blue-300 transition-colors duration-300">使用教程</Link></li>
              <li><Link to="/download" className="text-gray-200 hover:text-blue-300 transition-colors duration-300">下载中心</Link></li>
              <li><Link to="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=qGlpbRd4xfblBaplmlpCw_YMVvJ2v5yf&authKey=t6tbJZ0S3gygIek3a2jVfouS8sQCitt335SxZek%2BMMt7uz7PkoZ7ybPf73uyjSBo&noverify=0&group_code=2150359024" className="text-gray-200 hover:text-blue-300 transition-colors duration-300">会员一群</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <a 
              href="http://link.wuyouip.com/663AB" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              会员注册
            </a>
            <a 
              href="https://user.wuyouip.com/Sign/Login?type=2&session=8bf8616bd1d94449b990a9061fb16903" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 border border-blue-400 text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
            >
              会员登录
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
