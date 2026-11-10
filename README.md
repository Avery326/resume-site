# 陈姝璇 · 个人简历网站

一个使用原生 HTML、CSS 和 JavaScript 构建的响应式个人简历网站，采用深海蓝与冰蓝配色，适合在电脑和手机上浏览。

**在线访问：** [averychen.cn](https://averychen.cn/)  
**GitHub Pages 备用地址：** [avery326.github.io/resume-site](https://avery326.github.io/resume-site/)

## 网站内容

- 学校、专业、开发经历与语言能力概览
- 学习经历与工作经历
- 可横向浏览的专业证书、学位证书与技能
- 项目经历和学生会工作
- 荣誉奖项、竞赛与课外活动
- 工作方式与个人特点

## 页面特点

- 桌面端与移动端响应式布局
- 学习和工作经历标题支持桌面端滚动跟随
- 证书与荣誉图片支持鼠标拖动、触屏滑动和左右按钮浏览
- 证书图片可点击查看大图
- 自带打印样式与站点图标
- 纯静态网站，无需安装框架或执行构建

## 技术栈

- HTML5
- CSS3
- 原生 JavaScript
- GitHub Pages

## 项目结构

```text
.
├── index.html          # 页面内容
├── styles.css         # 页面样式与响应式布局
├── script.js          # 导航、滚动与横向拖动交互
├── assets/            # 校徽、证书图片和站点图标
└── CNAME              # GitHub Pages 自定义域名
```

## 本地预览

在项目目录运行：

```powershell
python -m http.server 4173
```

然后访问 `http://localhost:4173`。

也可以直接双击 `index.html` 预览，但通过本地静态服务器运行更接近线上环境。

## 隐私说明

仓库中不包含原始简历、原始证书照片或未遮盖的证件材料。公开的证书图片已对身份证号、学号、证书编号、二维码和签名等敏感信息进行处理。

## 部署

网站通过 GitHub Pages 发布。推送到仓库 `main` 分支后，GitHub Actions 会自动更新线上页面。

自定义域名：`averychen.cn`
