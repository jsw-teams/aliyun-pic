# EdgeOne Pages 闲鱼图片上传页

单页单卡片前端 + EdgeOne Pages Node Function 上传中转。

## 功能

- 单页单卡片布局
- 上传前弹出居中人机验证，验证通过后才上传
- 前后端双重限制图片大小为 5MB
- Cookie 由用户手动填写，可选保存在浏览器本地
- 上传成功后以居中弹窗显示图片直链和 Markdown
- 支持 zh-Hans / zh-Hant / en
- 响应式布局、键盘操作、ARIA、状态播报
- 四季背景图使用本地静态文件，便于自行替换为台湾风景图

## 目录

```text
.
├─ index.html
├─ package.json
├─ assets
│  ├─ app.css
│  ├─ app.js
│  ├─ config.example.js
│  └─ logo.svg
├─ images
│  └─ seasons
│     ├─ spring-taiwan.svg
│     ├─ summer-taiwan.svg
│     ├─ autumn-taiwan.svg
│     └─ winter-taiwan.svg
└─ node-functions
   └─ api
      └─ upload.js
```

## 部署前需要做的事

### 1. 配置前端公开参数

复制 `assets/config.example.js` 为 `assets/config.js`，然后按需修改：

- `TURNSTILE_SITE_KEY`: 你的 Cloudflare Turnstile Site Key
- `COOKIE_HELP_URL`: 你的 Cookie 教程文章地址
- `MAX_FILE_MB`: 默认 5

### 2. 配置服务端环境变量

在 EdgeOne Pages 项目后台添加：

- `TURNSTILE_SECRET_KEY` = 你的 Cloudflare Turnstile Secret Key

### 3. 替换背景图

把 `images/seasons/` 下四个占位 SVG 替换成你自己准备的台湾四季风景图，保持文件名不变即可：

- `spring-taiwan.*`
- `summer-taiwan.*`
- `autumn-taiwan.*`
- `winter-taiwan.*`

建议你下载后本地化部署，不要热链第三方图片。

## 上传接口

前端提交到：

- `POST /api/upload`

Node Function 会：

1. 校验 Turnstile token
2. 校验是否为图片、是否超过 5MB
3. 将文件中转上传到闲鱼接口
4. 返回原始响应、解析出的图片 URL、以及 Markdown 插入格式

## 本地调试

需要先安装 EdgeOne CLI。

```bash
npm install
edgeone pages dev
```

## 注意

- 这个项目不会把 Cookie 存到服务端环境变量，而是由用户手动填写。
- “记住 Cookie” 使用的是浏览器 `localStorage`，仅适合个人设备。
- 公共电脑不要勾选“记住 Cookie”。
