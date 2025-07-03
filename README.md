# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/64e40c2e-523e-4f4e-bed1-2efd6c1c3a2b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/64e40c2e-523e-4f4e-bed1-2efd6c1c3a2b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/64e40c2e-523e-4f4e-bed1-2efd6c1c3a2b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# 通知公告系统

## 功能概述

- 公告展示：支持分类展示官方公告、常知公告和行业资讯
- 后台管理：管理员可以登录后台创建、编辑和删除公告
- 响应式设计：适配不同设备的屏幕尺寸

## 技术栈

- 前端：React、TypeScript、Tailwind CSS
- 数据库：Supabase（PostgreSQL）
- 认证：Supabase Auth
- API：Supabase API

## 安装与设置

1. 安装依赖：

```bash
npm install
```

2. 配置环境变量：

创建一个`.env`文件，添加以下内容：

```
VITE_SUPABASE_URL=您的Supabase项目URL
VITE_SUPABASE_ANON_KEY=您的Supabase匿名密钥
```

3. 设置Supabase数据库：

在Supabase SQL编辑器中执行`docs/supabase-sql-setup.sql`文件中的SQL脚本。

4. 创建管理员账户：

在Supabase的Authentication页面中创建一个用户账户，此账户将用于登录后台管理系统。

5. 启动开发服务器：

```bash
npm run dev
```

## 页面路由

- `/notices` - 通知公告页面
- `/admin` - 后台管理页面

## Supabase数据库结构

### notices表

| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | BIGINT | 主键，自增 |
| title | TEXT | 公告标题 |
| content | TEXT | 公告内容 |
| category | TEXT | 公告分类（official、common、industry） |
| created_at | TIMESTAMPTZ | 创建时间 |
| updated_at | TIMESTAMPTZ | 更新时间 |

## 安全策略

- 匿名用户只能查看公告
- 已登录用户（管理员）可以创建、编辑和删除公告
- 所有数据操作通过Supabase的RLS（行级安全）策略进行控制
