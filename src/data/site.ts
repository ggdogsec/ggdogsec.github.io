import type { SiteAnalytics } from '../lib/analytics';

export const site = {
  title: 'GGDog Sec',
  description:
    'GGDog Sec 面向大学生 (网络安全) 实习与校招，集校招就业，面试指导，考证，推荐，咨询等等于一体。作者v:_ggf_zhu',
  url: 'https://ggdogsec.github.io',
  footerNote: '镜像自微信公众号 GGDog Sec',
  /**
   * 访问统计只在对应字段非空时注入脚本，页面上不显示浏览量。
   * 三项都可以留空。
   */
  analytics: {
    /** 百度统计站点 ID（hm.js? 后面那串，仅字母数字）。留空则不加载。 */
    baiduId: '',
    umami: {
      /** Umami script.js 的 https 地址，例如 https://cloud.umami.is/script.js。需与 websiteId 同时填写才加载。 */
      src: '',
      /** Umami 的 data-website-id。留空则不加载。 */
      websiteId: '',
    },
    /** GoatCounter 计数地址，例如 https://名字.goatcounter.com/count。留空则不加载。 */
    goatcounter: '',
  } satisfies SiteAnalytics,
} as const;
