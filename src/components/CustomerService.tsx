import React from 'react';
import { MessageCircle } from 'lucide-react';

const CustomerService = () => {
  return (
    <>
      {/* 在线客服按钮 */}
      <a
        href="https://wpa1.qq.com/I7v4oCfk?_type=wpa&qidian=true"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-8 bottom-8 z-50 group"
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span>在线客服</span>
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </a>
    </>
  );
};

export default CustomerService; 