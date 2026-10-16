# gnar127 · AI 作品集

`gnar127.com` 是独立开发者 gnar127 的作品集和所有产品的统一分发入口。nebubu 是吉祥物；现有 Nebubu Invest、Nebubu Diary 和 Nebubu API 产品名继续保留。

## 本地预览

无需安装前端依赖或构建，使用 Node.js 运行：

```powershell
node scripts/preview.cjs
```

打开 http://127.0.0.1:8765 。预览服务仅监听本机，并支持视频分段请求。

## 内容维护

- `index.html`：主站介绍、导航、关于与原版 nebubu 宣传片。
- `styles.css`：响应式布局和视觉样式。
- `projects.js`：七个项目的简介、封面、状态、宣传片、入口和仓库链接。
- `app.js`：分类筛选、视频播放互斥、网页宣传片展开与收起。
- `diary/index.html`：保留远端最新的 Diary 产品介绍页，主站入口文案已适配。
- `films/lifesimu/`：48 秒网页宣传短片，注明素材演绎，非游戏实录。
- `assets/README.md`：素材来源与维护说明。

新增作品直接编辑 `projects.js`。`category` 取 `play`、`tools` 或 `dev`；没有宣传片或网址时使用 `null`，页面自动显示占位。`video` 用于 MP4，`film` 用于独立网页宣传片，二者选其一。分类数量从项目数据自动计算。

## 已收录作品

| 项目 | 入口 | 宣传片 |
| --- | --- | --- |
| 自由都市 · City Runner | https://cityhd.gnar127.com/ | 原项目 MP4 |
| 小鸭漫游记 · LifeSimu | 子站预留 | 48 秒网页短片 |
| Nebubu Invest | https://invest.gnar127.com/ | 预留 |
| Pet Online | 子站预留，附项目 GitHub | 预留 |
| Nebubu Diary | /diary/ | 预留 |
| Asset Calculator | https://asset.gnar127.com/ | 预留 |
| Nebubu API | https://api.gnar127.com/ | 预留 |

Invest、Diary、Asset Calculator、API 的插画是概念封面，Pet Online 使用已有角色概念图；均明确标记，不冒充界面截图。

## 验证

现有环境可用 `playwright-core` 与 Microsoft Edge：

```powershell
node scripts/verify.cjs
```

`PORTFOLIO_BROWSER` 可以指定 Chromium/Edge 路径。验证覆盖分类、媒体播放、Diary 路由、320/390/768/1024/1440px 布局和本地资源加载，截图与报告写入忽略提交的 `.verification/`。验证工具不是网站运行依赖。

## 部署

继续使用仓库现有 Cloudflare 静态部署方式，`wrangler.jsonc` 保留远端配置；HTML、CSS、JS 与素材可直接托管。主域名保持 `gnar127.com`，保留 `/diary/` 和 `/films/lifesimu/` 目录路由。本次本地改动不等于已经发布上线。
