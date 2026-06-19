// assets/content-map.js
// Content sections, keyword tags, and a simple search/filter function

const siteConfig = {
  baseUrl: "https://site-main-aiyouxi.com.cn",
  siteName: "爱游戏",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["爱游戏", "热门推荐", "新游上线"],
    summary: "平台入口和精选内容展示"
  },
  {
    id: "games",
    title: "游戏库",
    tags: ["爱游戏", "动作", "角色扮演", "策略", "休闲"],
    summary: "所有游戏列表与分类浏览"
  },
  {
    id: "news",
    title: "新闻资讯",
    tags: ["爱游戏", "更新公告", "活动预告", "行业动态"],
    summary: "游戏相关新闻与公告"
  },
  {
    id: "community",
    title: "社区",
    tags: ["爱游戏", "玩家交流", "攻略分享", "排行榜"],
    summary: "玩家互动与内容分享"
  },
  {
    id: "support",
    title: "客服支持",
    tags: ["爱游戏", "FAQ", "帮助中心", "反馈"],
    summary: "常见问题解答与用户支持"
  }
];

const keywordTags = [
  "爱游戏",
  "热门",
  "最新",
  "动作冒险",
  "模拟经营",
  "多人联机",
  "免费",
  "PC",
  "手机",
  "主机"
];

function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  if (lowerQuery === "") {
    return [];
  }

  const results = [];

  for (const section of contentSections) {
    const matchTitle = section.title.toLowerCase().includes(lowerQuery);
    const matchSummary = section.summary.toLowerCase().includes(lowerQuery);
    const matchTags = section.tags.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    );

    if (matchTitle || matchSummary || matchTags) {
      results.push({
        sectionId: section.id,
        title: section.title,
        summary: section.summary,
        matchType: matchTitle ? "title" : matchSummary ? "summary" : "tags"
      });
    }
  }

  return results;
}

function filterByTag(tag) {
  if (!tag || typeof tag !== "string") {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase().includes(lowerTag))
  ).map(section => ({
    sectionId: section.id,
    title: section.title,
    summary: section.summary
  }));
}

function getAllTags() {
  const tagSet = new Set();
  for (const section of contentSections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  for (const tag of keywordTags) {
    tagSet.add(tag);
  }
  return Array.from(tagSet).sort();
}

function getSectionById(id) {
  if (!id || typeof id !== "string") {
    return null;
  }
  return contentSections.find(s => s.id === id) || null;
}

function getSiteInfo() {
  return {
    name: siteConfig.siteName,
    url: siteConfig.baseUrl,
    lang: siteConfig.defaultLang,
    sectionCount: contentSections.length,
    totalTags: getAllTags().length
  };
}

export {
  siteConfig,
  contentSections,
  keywordTags,
  searchContent,
  filterByTag,
  getAllTags,
  getSectionById,
  getSiteInfo
};