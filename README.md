# 医疗器械进口分析 Demo

面向医疗器械产业调研与汇报场景的交互式前端演示，集中展示进口指标、注册证指标、专题报告、分析图表、证据详情和知识图谱。

## 功能

- 医疗装备进口总额与来源结构展示
- 注册证指标和指标目录
- 进出口专题报告预览及 HTML 导出
- 指标、证据、实体与报告关系图谱
- 基于演示问题的分析助手交互

## 在线演示

[https://medical-device-import-demo.vercel.app](https://medical-device-import-demo.vercel.app)

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

打开终端显示的本地地址即可访问。

## 生产构建

```bash
npm run build
```

构建结果输出到 `dist/`。

## 数据说明

本项目是界面与交互原型，使用仓库内置的 mock 数据，不依赖线上后端服务。页面中的指标数值和研究结论仅用于功能演示，不应直接作为正式决策依据。
