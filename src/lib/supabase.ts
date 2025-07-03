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