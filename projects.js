/* 作品的单一数据入口。video / film / url 为 null 时显示占位，不生成空链接。 */
window.PORTFOLIO_PROJECTS = [
  {
    id: 'city-runner', category: 'play', title: '自由都市', subtitle: 'City Runner',
    description: '开上小小卡丁车，沿着山海公路出发。在海底隧道穿行，在磁吸赛道翻转，也可以慢下来，接一单城市配送。',
    tags: ['网页 3D 驾驶', '开放探索', 'AI 协作开发'],
    status: '可在线试玩', state: 'available', cover: 'assets/projects/city-runner.webp',
    alt: '自由都市封面：小狐狸驾驶黄色卡丁车，驶向夕阳下的沿海公路与灯塔',
    video: 'assets/projects/city-runner-trailer.mp4', film: null,
    url: 'https://cityhd.gnar127.com/', action: '进入游戏', repo: null, featured: true
  },
  {
    id: 'lifesimu', category: 'play', title: '小鸭漫游记', subtitle: 'LifeSimu',
    description: '一场绘本里的动物小镇冒险。跟着小鸭子沿河探索、认识邻居，用代表本领的卡牌回应日常里的小麻烦，让选择长成自己的故事。',
    tags: ['动物小镇', '卡牌成长', '叙事冒险'],
    status: '开发中', state: 'development', cover: 'assets/projects/lifesimu.webp',
    alt: '小鸭漫游记宣传画：小鸭站在河畔水车小屋前，画面写着有些地方不用急着成为谁',
    video: null, film: 'films/lifesimu/', filmNote: '48 秒 · 素材演绎，非游戏实录',
    url: null, action: null, repo: null
  },
  {
    id: 'invest', category: 'tools', title: 'Nebubu Invest', subtitle: '',
    description: '把行情、资产组合和 AI 分析放在同一个工作台。查看市场变化、比较资产表现，也给每一次投资判断多一点依据。',
    tags: ['投资工作台', '市场观察', 'AI 分析'],
    status: '已有网站', state: 'available', cover: 'assets/projects/invest.svg',
    alt: '概念封面：一条向上生长的绿色曲线与太阳', concept: true,
    video: null, film: null, url: 'https://invest.gnar127.com/', action: '打开工作台', repo: null
  },
  {
    id: 'pet-online', category: 'play', title: 'Pet Online', subtitle: '',
    description: '让陪伴从一个窗口开始。正在探索桌面常驻、宠物养成与自主生活，也计划让同一只小伙伴在不同设备间延续自己的日常。',
    tags: ['桌面宠物', '养成陪伴', '跨端探索'],
    status: '开发中', state: 'development', cover: 'assets/projects/pet-online.webp',
    alt: 'Pet Online 角色概念图：水彩风格的 nebubu 小猫，展示挥星星、吃饼干与睡觉的姿态', concept: true,
    video: null, film: null, url: null, action: null, repo: 'https://github.com/Gnar127/pet_online'
  },
  {
    id: 'diary', category: 'tools', title: 'Nebubu Diary', subtitle: '',
    description: '不只记住一笔交易，也记住当时的自己。用对话或订单导入积累交易日历，让 AI 帮你复盘决策、情绪和反复出现的风险。',
    tags: ['交易日记', 'AI 复盘', '决策记忆'],
    status: '产品介绍页', state: 'local', cover: 'assets/projects/diary.svg',
    alt: '概念封面：翻开的交易手记、彩色日历和一枚温暖的星星', concept: true,
    video: null, film: null, url: 'diary/', action: '了解 Diary', repo: null
  },
  {
    id: 'asset-calculator', category: 'tools', title: 'Asset Calculator', subtitle: '资产计算器',
    description: '一个即用即走的资产计算小工具。把复杂的计算过程收起来，让数字和结果更容易看懂，给日常的规划与比较多一点清晰。',
    tags: ['轻量工具', '资产计算'],
    status: '已有网站', state: 'available', cover: 'assets/projects/asset.svg',
    alt: '概念封面：奶油黄色计算器和三枚圆润的硬币', concept: true,
    video: null, film: null, url: 'https://asset.gnar127.com/', action: '打开计算器', repo: null
  },
  {
    id: 'nebubu-api', category: 'dev', title: 'Nebubu API', subtitle: '',
    description: '给自己的 AI 创作接上动力。提供兼容 OpenAI 格式的模型调用入口，连接应用、工具和下一次实验。项目包含 API 门户与接入文档。',
    tags: ['模型接口', '开发者工具', 'API 门户'],
    status: '已有入口', state: 'available', cover: 'assets/projects/api.svg',
    alt: '概念封面：两朵用橙色线缆相连的云，代表应用与 AI 接口', concept: true,
    video: null, film: null, url: 'https://api.gnar127.com/', action: '访问 API 入口', repo: 'https://github.com/Gnar127/nebubu-api'
  }
];
