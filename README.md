# GGDog Sec

GGDog Sec 的个人博客脚手架，用来镜像微信公众号。站点地址是 [https://ggdogsec.github.io](https://ggdogsec.github.io)。

文章只按公众号的 **合集** 归档，没有标签系统。这一版只搭站和分类，不迁入真实文章。每个合集里有一篇标题带「示例·可删除」的占位文，用来确认路由，正式写文章前删掉即可。首页的篇数不计入这些示例，所以现在是 0。

分类顺序与合集列表顺序一致；合集内文章顺序与公众号合集当前顺序一致，禁止按时间倒序打乱。

## 本地运行

需要 Node.js `>= 22.23.4`。

```bash
npm install
npm run dev
```

开发服务器默认在 `http://localhost:4321`。

生产构建：

```bash
npm run build
npm run preview
```

静态文件在 `dist/`。

## GitHub Pages

仓库是用户站 `ggdogsec.github.io`，所以 `astro.config.mjs` 里：

- `site` = `https://ggdogsec.github.io`
- `base` = `/`

推送到 `main` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 用官方 [withastro/action](https://github.com/withastro/action) 构建，再用 `actions/deploy-pages` 发布。这是 [Astro 文档推荐的 Pages 流程](https://docs.astro.build/en/guides/deploy/github/)。

合并到 `main` 之后，需要在 GitHub 上打开一次 Pages：

1. 打开仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选 **GitHub Actions**。
3. 若启用之前第一次部署失败，到 **Actions** 里重跑 **Deploy to GitHub Pages**。

之后每次推到 `main` 都会重新构建并发布。也可以在 Actions 里手动运行这个 workflow。Pull request 只跑构建（`.github/workflows/ci.yml`），不会部署。

## 添加一篇合集文章

1. 在对应合集目录新建 Markdown，文件名会变成网址末段。例如 `src/content/posts/mianjing/2026-offer.md` 的地址是 `/posts/mianjing/2026-offer/`。
2. 写 frontmatter。`category` 必须是下表里的 id，并和目录名一致。`albumOrder` 是这篇文章在该公众号合集里的位置，**1 表示合集界面当前的第一篇**。按合集从上到下编号，不要按发布时间倒序重排。不要加 `sample: true`。`pubDate` 只作为页面上的日期，不参与排序。

```md
---
title: 文章标题
description: 一两句摘要，用于列表和 meta。
pubDate: 2026-11-03
category: mianjing
albumOrder: 3
---

正文。
```

3. 未完成的稿子加 `draft: true`，构建时不会生成页面，也不会计入篇数，也不进入连续阅读。
4. 同一合集里 `albumOrder` 不能重复，构建时会直接报错。
5. 本地 `npm run dev` 看合集页和首页。首页「正式文章」和合集页只把非示例、非草稿算作正式文章。合集页的列表包含示例，但位置仍按 `albumOrder`。文章页底部的「上一篇 / 下一篇」沿这个顺序连续阅读：数字更小的是上一篇。

删掉示例时，直接删除 `src/content/posts/<合集 id>/sample.md`。六个合集页仍然在，即使该合集还没有正式文章。

## 顺序

分类顺序与合集列表顺序一致；合集内文章顺序与公众号合集当前顺序一致，禁止按时间倒序打乱。

合集顺序写在 `src/data/categories.ts` 的有序数组里，每项有 `order: 1` 到 `order: 6`。首页导航、合集列表和侧栏都调用 `orderedCategories()`，按 `order` 升序渲染，不会按名称、拼音或篇数排序。

合集内的文章按 frontmatter 的 `albumOrder` 升序。`1` 是公众号该合集当前显示的第一篇。发布时间 `pubDate` 只显示，不参与排序，也不能把顺序倒过来。六篇示例的 `albumOrder` 都是 `1`。迁入真实文章时保留它们在合集里的位置。文章页的连续阅读（上一篇 / 下一篇）用同一顺序。

## 合集

显示名与公众号合集一致。id 是目录名和网址用的 ASCII slug。`公众号篇数` 来自 2026-11-03 的合集导出，只作对照，本站尚未迁入。

| 顺序 | 合集 | id | 目录 | 公众号篇数 |
| --- | --- | --- | --- | --- |
| 1 | 每届校招进度同步 | `xiaozhao-jindu` | `src/content/posts/xiaozhao-jindu/` | 14 |
| 2 | 大学杂谈 | `daxue-zatan` | `src/content/posts/daxue-zatan/` | 12 |
| 3 | 实习+校招 | `shixi-xiaozhao` | `src/content/posts/shixi-xiaozhao/` | 55 |
| 4 | 面经 | `mianjing` | `src/content/posts/mianjing/` | 40 |
| 5 | 网安面经图解 | `wangan-mianjing-tujie` | `src/content/posts/wangan-mianjing-tujie/` | 8 |
| 6 | 网安毕业薪资 | `wangan-xinzi` | `src/content/posts/wangan-xinzi/` | 8 |

合集页路径是 `/heji/<id>/`。名称、简介、`order` 和公众号合集链接写在 `src/data/categories.ts`。新增合集时把新项追加进这个数组并写上 `order`，再在 `src/content/posts/` 下建同名目录。不要改成按名字索引的对象。
