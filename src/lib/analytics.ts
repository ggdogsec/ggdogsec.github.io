export type SiteAnalytics = {
  baiduId: string;
  umami: {
    src: string;
    websiteId: string;
  };
  goatcounter: string;
};

export type ResolvedAnalytics = {
  baiduId: string;
  umami: { src: string; websiteId: string } | null;
  goatcounter: string;
};

function httpsUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    return url.href;
  } catch {
    return '';
  }
}

/** Enabled trackers only. Empty or invalid fields stay off so no script is injected. */
export function resolveAnalytics(analytics: SiteAnalytics): ResolvedAnalytics {
  const baiduId = analytics.baiduId.trim();
  const umamiSrc = httpsUrl(analytics.umami.src.trim());
  const umamiWebsiteId = analytics.umami.websiteId.trim();
  const goatcounter = httpsUrl(analytics.goatcounter.trim());

  return {
    baiduId: /^[A-Za-z0-9]+$/.test(baiduId) ? baiduId : '',
    umami:
      umamiSrc && umamiWebsiteId
        ? { src: umamiSrc, websiteId: umamiWebsiteId }
        : null,
    goatcounter,
  };
}
