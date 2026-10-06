# 崔恩侨个人简历网站

这是一个纯 HTML + CSS + JavaScript 的个人简历/作品集网站，可直接部署到 Cloudflare Pages。

## 文件结构

- index.html：网页主体
- style.css：视觉样式
- script.js：滚动动画和导航高亮
- images/profile.jpg：放个人半身照
- images/competition.jpg：放比赛照片

## 修改重点

1. 在 index.html 修改个人简介、项目、经历。
2. 把个人照片放到 images/profile.jpg。
3. 把比赛照片放到 images/competition.jpg。
4. 将 GitHub 地址替换成自己的真实仓库或项目地址。
5. 不要填写虚假的奖项、证书或项目成果。

## Cloudflare Pages

创建 Pages 项目后：
- 如果使用 GitHub：把项目上传到 GitHub，然后在 Cloudflare Pages 连接该仓库。
- Framework preset 选择 None。
- Build command 留空。
- Output directory 使用项目根目录。

这是静态网站，不需要 Node、Python 或数据库。
