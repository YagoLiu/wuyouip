import { createClient } from '@supabase/supabase-js';

// 从环境变量获取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 通知类型定义
export interface Notice {
  id: number;
  title: string;
  content: string;
  excerpt?: string; // 摘要，可选
  category: 'official' | 'common' | 'industry'; // 官方公告、常知公告、行业资讯
  created_at: string;
}

// 下载文件类型定义
export interface DownloadFile {
  id: number;
  name: string;
  description: string;
  version: string;
  size: string;
  category: string;
  file_path: string;
  display_order: number;
  icon: string;
  features: string[];
  requirements: string[];
  detailed_description: string;
  highlights: string[];
  created_at: string;
  updated_at: string;
}

// 管理员登录
export const loginAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { data, error };
};

// 获取通知
export const getNotices = async (category?: string, limit = 6) => {
  let query = supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.limit(limit);
  return { data, error };
};

// 创建通知
export const createNotice = async (notice: Omit<Notice, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('notices').insert([notice]).select();
  return { data, error };
};

// 更新通知
export const updateNotice = async (id: number, updates: Partial<Omit<Notice, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase.from('notices').update(updates).eq('id', id).select();
  return { data, error };
};

// 删除通知
export const deleteNotice = async (id: number) => {
  const { error } = await supabase.from('notices').delete().eq('id', id);
  return { error };
};

// 获取下载文件
export const getDownloadFiles = async (category?: string) => {
  let query = supabase
    .from('download_files')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('name');
  return { data, error };
};

// 获取单个下载文件
export const getDownloadFile = async (id: number) => {
  const { data, error } = await supabase
    .from('download_files')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
};

// 创建下载文件
export const createDownloadFile = async (downloadFile: Omit<DownloadFile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase.from('download_files').insert([downloadFile]).select();
  return { data, error };
};

// 更新下载文件
export const updateDownloadFile = async (id: number, updates: Partial<Omit<DownloadFile, 'id' | 'created_at' | 'updated_at'>>) => {
  const { data, error } = await supabase.from('download_files').update(updates).eq('id', id).select();
  return { data, error };
};

// 删除下载文件
export const deleteDownloadFile = async (id: number) => {
  const { error } = await supabase.from('download_files').delete().eq('id', id);
  return { error };
};

// 更新下载文件顺序
export const updateDownloadFileOrder = async (id: number, newOrder: number) => {
  const { data, error } = await supabase
    .from('download_files')
    .update({ display_order: newOrder })
    .eq('id', id)
    .select();
  return { data, error };
};

// 上传文件到存储桶
export const uploadDownloadFile = async (filePath: string, file: File) => {
  const { data, error } = await supabase.storage
    .from('download-files')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    });
  return { data, error };
};

// 删除存储桶中的文件
export const deleteStorageFile = async (filePath: string) => {
  const { error } = await supabase.storage
    .from('download-files')
    .remove([filePath]);
  return { error };
};

// 获取文件公开URL
export const getFileUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from('download-files')
    .getPublicUrl(filePath);
  return data.publicUrl;
}; 