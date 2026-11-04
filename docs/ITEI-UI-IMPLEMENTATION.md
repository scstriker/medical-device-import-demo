# ITEI 设计系统改造说明

本次改造基于用户上传的 `itei-design-system(1).zip`，保留原项目的 React/Vite 页面组织、Zustand 状态、模拟数据、报告导出、图表和证据交互。

## 规范与代码映射

| 设计系统规范 | 实现文件 | 说明 |
| --- | --- | --- |
| README / AGENTS 约束 | `src/itei-theme.css` | 白底、分隔线、低圆角、内容层级、焦点与响应式 |
| tokens.css 浅色/深色 | `src/itei-tokens.css` | 统一颜色、间距、排版、斜切、图表语义变量 |
| AppHeader | `src/layout/TopBar.tsx` | 56px 蓝色渐变、底部亮蓝线、当前章节 |
| NumberedNav | `src/layout/LeftSidebar.tsx` | 编号导航、15 类指标树、当前项浅蓝背景 |
| SectionTitle | `src/itei-theme.css` | 一级章节深蓝斜切、二级标题亮蓝横线 |
| Card / KpiTile | `src/itei-theme.css` | 直角 1px 边框、深蓝统计数字、重要 KPI 红色顶部强调 |
| DataTable / Tag | `src/itei-theme.css` | 浅色表头、横线分隔、状态配文字 |
| Input / Button | `src/itei-theme.css` | 2px 圆角、品牌深蓝主按钮、焦点环 |
| Footer | `src/layout/AppShell.tsx` | 深蓝色应用底栏、45° 装饰 |
| 跨端规范 | `src/itei-theme.css` | 860px 以下折叠侧栏并提供底部导航 |
| 图表颜色 | `src/pages/ChartGallery.tsx`、`src/layout/BottomCommandBar.tsx` | ITEI 统计图调色板 |

## 交互兼容

继续使用 `useAppStore` 进行导航、助手打开/关闭和问题提交。指标详情、报告和图表跳转保留原入口。深浅色开关使用 `localStorage["itei-theme"]` 存储，仅涉及本地 UI 偏好。

## 演示数据

仓库保留原有内置模拟数据；数据更新时间应理解为演示历史记录。界面不宣称对接了实时后台。

## 本地核验

```bash
npm ci
npm run build
npm run dev
```

建议核验首页、15 类指标树、进出口、注册证、报告导出、图表交互、知识图谱、证据详情、智能问数以及深浅模式和 390px/768px/1440px 响应式布局。当前 PR 未在可连接 npm 的环境运行生产构建。
