/**
 * WeChat 合集 (albums), in the only display order the site may use.
 * `order` 1..6 is the sequence on the home nav, the category list, and the
 * sidebar. Never sort this by name, pinyin, or article count.
 * Display names match the GGDog Sec console export captured 2026-11-03.
 * `wechatCount` is that export's album size, not the number of posts on this site.
 */
export const categories = [
  {
    order: 1,
    id: 'xiaozhao-jindu',
    name: '每届校招进度同步',
    description: '按届同步网络安全校招进度。',
    wechatAlbumId: '4732003422634344449',
    wechatCount: 14,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4732003422634344449#wechat_redirect',
  },
  {
    order: 2,
    id: 'daxue-zatan',
    name: '大学杂谈',
    description: '大学阶段的杂谈。',
    wechatAlbumId: '4519548862998609923',
    wechatCount: 12,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4519548862998609923#wechat_redirect',
  },
  {
    order: 3,
    id: 'shixi-xiaozhao',
    name: '实习+校招',
    description: '实习与校招相关的记录。',
    wechatAlbumId: '4519543932728475649',
    wechatCount: 55,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4519543932728475649#wechat_redirect',
  },
  {
    order: 4,
    id: 'mianjing',
    name: '面经',
    description: '面试经验。',
    wechatAlbumId: '4519552702984585219',
    wechatCount: 40,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4519552702984585219#wechat_redirect',
  },
  {
    order: 5,
    id: 'wangan-mianjing-tujie',
    name: '网安面经图解',
    description: '网络安全面经图解。',
    wechatAlbumId: '4724170096997400576',
    wechatCount: 8,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4724170096997400576#wechat_redirect',
  },
  {
    order: 6,
    id: 'wangan-xinzi',
    name: '网安毕业薪资',
    description: '网络安全专业的毕业薪资记录。',
    wechatAlbumId: '4519549441225359363',
    wechatCount: 8,
    wechatUrl:
      'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzYzNzEwNTQ1OA==&action=getalbum&album_id=4519549441225359363#wechat_redirect',
  },
] as const;

export type Category = (typeof categories)[number];
export type CategoryId = Category['id'];

export const categoryIds = categories.map((category) => category.id) as [
  CategoryId,
  ...CategoryId[],
];

/** Copy sorted by `order`. Call sites must use this, not a name or count sort. */
export function orderedCategories(): Category[] {
  return [...categories].sort((a, b) => a.order - b.order);
}

export function getCategory(id: string): Category {
  const category = categories.find((item) => item.id === id);
  if (!category) {
    throw new Error(`未知合集：${id}`);
  }
  return category;
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((category) => category.id === id);
}
