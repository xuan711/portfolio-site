import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Gamepad2,
  Layers3,
  Mail,
  Menu,
  MousePointer2,
  Music2,
  Pause,
  Phone,
  Compass,
  Play,
  RotateCcw,
  Settings2,
  Sparkles,
  Table2,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const navItems = [
  { id: 'works', label: '项目作品' },
  { id: 'gallery', label: '视觉画廊' },
  { id: 'capabilities', label: '策划能力' },
  { id: 'games', label: '游戏经历' },
  { id: 'lab', label: '文档实验室' },
]

const pageFrameMeta = {
  works: 'FEATURED PROJECT / 01',
  gallery: 'VISUAL ARCHIVE / 02',
  capabilities: 'SYSTEM DESIGN / 03',
  games: 'GAME EXPERIENCE / 04',
  lab: 'DOCUMENT WORKSHOP / 05',
  contact: 'CONTACT / 06',
}

const tutorialStages = [
  { id: 'I-01', title: '出生与移动', action: '沿可见路线进入下一检测区', verify: '到达区域' },
  { id: 'I-02', title: '装备武器', action: '将玄铁剑装备至主武器槽', verify: '槽位校验' },
  { id: 'I-03', title: '技能与稻草人', action: '学习技能并击败任意 3 个目标', verify: '有效击败' },
  { id: 'I-04', title: '天命印记', action: '阅读五行规则并完成首次选择', verify: '结果记录' },
  { id: 'I-05', title: '身法跨越', action: '使用二段跳与闪避跨越空隙', verify: '到达区域' },
  { id: 'I-06', title: '弓箭与飞鸡靶', action: '切换弓箭并射落 6 个移动靶', verify: '有效命中' },
  { id: 'I-07', title: '成长路线与结束', action: '完成天命三问、开箱并进入主线', verify: '状态提交' },
]

const workbookSheets = {
  阶段总表: {
    headers: ['阶段', '教学目标', '触发方式', '完成判定', '异常处理'],
    rows: [
      ['I-01', '出生与移动', '角色出生', '进入 I-02 检测区', '重登恢复当前阶段'],
      ['I-03', '技能与目标', '进入教学区', '有效击败 3 个稻草人', '无效攻击不计数'],
      ['I-06', '远程射击', '装备玄铁弓', '射落 6 个飞鸡靶', '分批刷新并保留计数'],
      ['I-07', '成长路线', '对话节点完成', '路线确认并成功传送', '未确认不提交选择'],
    ],
  },
  奖励配置: {
    headers: ['配置编号', '奖励', '发放条件', '发放方式', '防重复规则'],
    rows: [
      ['I-02-R01', '玄铁剑', '触发装备教学', '背包 / 邮件兜底', '成功后不重复发放'],
      ['I-06-R01', '玄铁弓', '进入弓箭教学', '背包 / 邮件兜底', '失败保留可重试'],
      ['I-06-R03', '续命丹', '完成远程教学', '即时发放', '成功后写入领取状态'],
      ['I-07-R02', '天命之心', '确认神器路线', '锻造前置道具', '锻造成功后消耗'],
    ],
  },
  场景绑定: {
    headers: ['绑定编号', '对象', '类型', '点位 / 区域', '初始状态'],
    rows: [
      ['SC-I01-01', '玩家出生点', '出生点', 'PT_I01_SPAWN', '朝向 I-02'],
      ['SC-I02-02', 'I-03 入口光幕', '门禁', 'AREA_I03_GATE', '阻挡'],
      ['SC-I03-02', '木桩点位组', '目标点位', 'GRP_I03_DUMMY', '常驻 6 个'],
      ['SC-I07-04', '穿越门', '传送对象', 'PT_I07_PORTAL', '前置完成后开放'],
    ],
  },
}

const DOCUMENT_LINKS = Object.freeze({
  projectOverview: 'https://docs.qq.com/slide/DU1F0YnFMT0hLa1ZR',
  beijunDesign: 'https://docs.qq.com/sheet/DU3FrV0xvUE5JSkVT',
  beijunConfig: 'https://docs.qq.com/sheet/DU29KVGhzdnBnZHZD',
  dungeonDesign: 'https://docs.qq.com/sheet/DU05icndzYWtadmVE',
  tutorialDesign: 'https://docs.qq.com/pdf/DU3R5dVpnZ0JtS21U',
  tutorialConfig: 'https://docs.qq.com/sheet/DU21Ca0tkSm1Hd1pI',
})

const projects = [
  {
    id: 'beijun',
    index: '01',
    eyebrow: '关卡设计 · 副本落地',
    title: '北郡大牢一层',
    subtitle: '在约10分钟的单次流程内，为玩家提供目标清晰、战斗形式有变化、挑战逐步提升且结算反馈明确的副本体验。',
    image: assetUrl('/images/beijun-poster.webp'),
    heroImage: assetUrl('/images/render-clash.webp'),
    heroPosition: '52% center',
    video: 'https://1305541330.vod-qcloud.com/1074853bvodcq1305541330/beadd5be5001834818084504338/ce2Y91PGaa4A.mp4',
    meta: ['30 分钟实例', '阶段与区域', '怪物技能', '掉落公式'],
    value: '对应 JD：关卡规划 → 设定 → 制作跟进 → 测试验证',
    links: [
      { label: '查看关卡策划案文档', href: DOCUMENT_LINKS.beijunDesign },
      { label: '查看关卡案例配表', href: DOCUMENT_LINKS.beijunConfig },
    ],
  },
  {
    id: 'tutorial',
    index: '02',
    eyebrow: '系统设计 · 新手引导',
    title: '七星连珠新手引导',
    subtitle: '通过七座依次开放的空岛，完成移动、装备武器、技能学习与使用、天命印记、身法跨越、武器切换和远程射击教学；同时定义死亡、退出、重登及奖励、传送异常的恢复规则。',
    image: assetUrl('/images/tutorial-poster.webp'),
    heroImage: assetUrl('/images/render-green.webp'),
    heroPosition: '57% center',
    video: 'https://1305541330.vod-qcloud.com/e75e72e3vodtranscq1305541330/b32afe045001834818084029459/v.f100040.mp4',
    meta: ['I-01 — I-07', '10 张配置表', '状态恢复', '上线复盘'],
    value: '对应 JD：系统规则、界面交互、跨职能交付与异常兜底',
    links: [
      { label: '查看新手引导策划案文档', href: DOCUMENT_LINKS.tutorialDesign },
      { label: '查看新手引导配置表', href: DOCUMENT_LINKS.tutorialConfig },
    ],
  },
  {
    id: 'dungeon',
    index: '03',
    eyebrow: '系统策划 · 功能 Demo',
    title: '副本挑战系统',
    subtitle: '副本挑战系统是游戏中的常驻PVE玩法，承接角色养成、战力验证和阶段推进。',
    image: assetUrl('/images/render-boss.webp'),
    heroImage: assetUrl('/images/render-boss.webp'),
    heroPosition: '52% center',
    video: 'https://1305541330.vod-qcloud.com/e75e72e3vodtranscq1305541330/c1713ac55001834818084667434/v.f100800.mp4',
    meta: ['入口规则', '挑战状态', '奖励反馈', '实机验证'],
    value: '对应 JD：核心功能模块设计、推进落地与上线结果调优',
    links: [{ label: '查看副本系统展示文档', href: DOCUMENT_LINKS.dungeonDesign }],
  },
]

const projectOverviewEntry = {
  id: 'project-overview',
  index: '00',
  title: '项目总览',
}

const orderedPortfolioProjects = [projects[1], projects[2], projects[0]].map((project, index) => ({
  ...project,
  index: String(index + 1).padStart(2, '0'),
}))

const portfolioEntries = [projectOverviewEntry, ...orderedPortfolioProjects]

const projectOverviewPages = [
  { id: 'overview', label: '项目全貌' },
  { id: 'systems', label: '系统版图' },
  { id: 'cases', label: '代表案例' },
]

const shanhaiSystemPillars = [
  {
    no: '01',
    tone: 'gold',
    title: '角色与养成',
    summary: '从身份表达、战斗构筑到数值追求，建立长期角色成长路径。',
    image: assetUrl('/images/system-character-user.png'),
    visualMode: 'render-character',
    visualLabel: '角色构筑',
    items: [
      { label: '角色表现', detail: '捏脸 · 时装 · 宠物' },
      { label: '战斗构筑', detail: '装备养成 · 武器技能' },
      { label: '数值成长', detail: '修炼 · 卡牌 · 神器 · 词条' },
    ],
  },
  {
    no: '02',
    tone: 'coral',
    title: '世界与任务',
    summary: '用区域连接、任务目标和玩法入口组织开放世界的探索节奏。',
    image: assetUrl('/images/system-world-user.png'),
    visualMode: 'render-world',
    visualLabel: '世界地图',
    items: [
      { label: '区域连接', detail: '地图 · 区域 · 传送' },
      { label: '目标承载', detail: '任务 · 悬赏' },
      { label: '玩法入口', detail: '副本 · 商店 · 生活技能' },
    ],
  },
  {
    no: '03',
    tone: 'blue',
    title: 'PVE 内容',
    summary: '用多类副本、机关演出和战斗对象承接养成结果与阶段挑战。',
    image: assetUrl('/images/featured-render-mgzd.png'),
    visualMode: 'render-pve',
    visualLabel: '多人副本',
    items: [
      { label: '玩法系统', detail: '线性副本 · 机制副本 · Roguelike 经验本' },
      { label: '关卡内容', detail: '关卡 · 机关 · 演出' },
      { label: '战斗对象', detail: '小怪 · 精英 · Boss' },
    ],
  },
  {
    no: '04',
    tone: 'crimson',
    title: '日常与留存',
    summary: '用每日目标、稳定奖励和阶段激励维持上线动机与长期留存。',
    image: assetUrl('/images/system-retention-user.png'),
    visualMode: 'render-retention',
    visualLabel: '每日目标 · 福利奖励',
    items: [
      { label: '日常目标', detail: '活动 · 日常任务' },
      { label: '稳定奖励', detail: '福利 · 签到 · 在线' },
      { label: '阶段激励', detail: '冲级奖励 · 累充奖励' },
    ],
  },
  {
    no: '05',
    tone: 'teal',
    title: '资源与玩家经济',
    summary: '用玩家交易、资源回收和物品管理维持资源的产出与消耗闭环。',
    image: assetUrl('/images/system-economy-user.png'),
    visualMode: 'render-economy',
    visualLabel: '装备养成 · 玩家交易',
    items: [
      { label: '玩家流通', detail: '交易' },
      { label: '资源回收', detail: '分解 · 回收' },
      { label: '物品管理', detail: '仓库' },
    ],
  },
  {
    no: '06',
    tone: 'plum',
    title: '商业化',
    summary: '用商城、抽取兑换和付费权益连接内容消费与项目持续运营。',
    image: assetUrl('/images/system-commerce-user.png'),
    visualMode: 'render-commerce',
    visualLabel: '商城与兑换',
    items: [
      { label: '付费入口', detail: '商城' },
      { label: '商品获取', detail: '抽奖 · 兑换' },
      { label: '付费权益', detail: '会员 · 付费外观' },
    ],
  },
]

const defaultHeroContent = {
  eyebrow: '2027届系统策划 · 项目落地能力',
  title: '将想法落地成文档，\n并跟进制作与实现。',
  capability: '拆解玩家目标、规则、流程与异常边界；完成新手引导、副本、关卡与 Boss 设计',
  stack: '输出策划案、流程图、界面原型和配置表；对接开发、数值、UI及美术，跟进测试、验收与迭代',
  project: 'Figma：界面原型与交互标注 · ioDraw：业务与状态流程图 · XMind：系统结构与需求拆解\nOffice：策划案、配置表与数据整理 · Codex：策划文档与数值配置提效 · Unity/UE：基础玩法原型与交互 Demo',
  align: 'left',
  width: 'standard',
  vertical: 'center',
  fontScale: 1.15,
}

const shanhaiGameplayShowcase = [
  { src: assetUrl('/images/core-gameplay-demon.png'), label: '降妖伏魔' },
  { src: assetUrl('/images/core-gameplay-artifact.png'), label: '神器养成' },
  { src: assetUrl('/images/core-gameplay-escort.png'), label: '寻宝押镖' },
  { src: assetUrl('/images/core-gameplay-free-career.png'), label: '自由职业' },
  { src: assetUrl('/images/core-gameplay-temple.png'), label: '祖巫神庙' },
]

const heroParticles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: (index * 37 + 7) % 100,
  top: (index * 53 + 11) % 100,
  size: 3 + (index % 5) * 2,
  delay: -((index * 0.43) % 8),
  duration: 6 + (index % 7) * 0.9,
  drift: -36 + (index % 9) * 9,
  tone: index % 4 === 0 ? 'ember' : index % 3 === 0 ? 'shard' : 'aether',
}))

const capabilities = [
  {
    icon: Layers3,
    title: '系统结构化',
    text: '把目标拆为状态、规则、入口、资源、反馈与异常，形成可扩展的功能框架。',
    tags: ['状态机', '核心循环', '功能边界'],
  },
  {
    icon: Table2,
    title: '配置与文档',
    text: '用策划案解释意图，用配表承载执行数据，让程序、美术与测试各取所需。',
    tags: ['Word', 'Excel', '验收清单'],
  },
  {
    icon: Users,
    title: '跨职能落地',
    text: '面向程序、UI、3D、美术与测试明确对象、触发、资源需求和最终验收结果。',
    tags: ['协作', '联调', '功能验收'],
  },
  {
    icon: BarChart3,
    title: '数据与迭代',
    text: '结合日活、次留、付费人数与玩家反馈复盘体验问题，提出可验证的优化方向。',
    tags: ['用户反馈', '运营意识', '数据复盘'],
  },
  {
    icon: Code2,
    title: '技术思维',
    text: '理解配置字段、脚本逻辑与前端原型，以更低沟通成本验证复杂交互。',
    tags: ['JSON / Lua 思维', '交互原型', 'Demo'],
  },
  {
    icon: Sparkles,
    title: 'AI 辅助工作流',
    text: '将 AI 用于资料整理、配置校验、原型开发与表达包装，提升策划交付效率。',
    tags: ['AI 编程', '效率工具', '快速验证'],
  },
]

const gameGenres = [
  {
    order: '01',
    title: '沙盒 / 多人服务器',
    game: 'Minecraft Java Edition',
    note: '与现有 MMORPG 项目、服务端系统和内容生产经验直接关联。',
    accent: 'mint',
  },
  {
    order: '02',
    title: 'MMO / 长线养成',
    game: '成长、经济、活动与社交',
    note: '关注系统解锁节奏、资源循环、回流与玩家长期目标。',
    accent: 'blue',
  },
  {
    order: '03',
    title: '竞技 / 战术射击',
    game: 'MOBA · FPS · 搜打撤',
    note: '关注对局目标、信息差、地图节奏、局内外资源与赛季结构。',
    accent: 'orange',
  },
  {
    order: '04',
    title: 'RPG / 策略 / Roguelike',
    game: '构筑、成长与版本循环',
    note: '关注角色构筑、关卡机制、随机池、数值反馈与内容复用。',
    accent: 'violet',
  },
]

const gallery = [
  { src: assetUrl('/images/render-clash.webp'), alt: '红蓝对抗场景渲染图', label: '北郡战斗场景' },
  { src: assetUrl('/images/render-green.webp'), alt: '绿色战场角色渲染图', label: '角色与场景氛围' },
  { src: assetUrl('/images/render-boss.webp'), alt: '祖巫神庙 Boss 渲染图', label: 'Boss 玩法主题' },
  { src: assetUrl('/images/render-fire.webp'), alt: '火焰 Boss 渲染图', label: 'Boss 视觉包装' },
  { src: assetUrl('/images/render-chi-you.webp'), alt: '蚩尤角色渲染图', label: '角色与世界观' },
  { src: assetUrl('/images/beijun-poster.webp'), alt: '北郡大牢关卡展示图', label: '关卡设计证据' },
]

function formatNumber(value, metric) {
  if (metric === 'retention') return `${value.toFixed(1)}%`
  if (metric === 'duration') return `${value.toFixed(0)} min`
  return new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1 }).format(value)
}

function useCommercialData() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    let cancelled = false
    fetch('/data/multi_day_detail.csv')
      .then((response) => response.text())
      .then((text) => {
        if (cancelled) return
        const lines = text.trim().split(/\r?\n/)
        const parsed = lines.slice(1).map((line) => {
          const [date, , diamonds, dau, payers, , retention, duration] = line.split(',')
          return {
            date: `${date.slice(4, 6)}/${date.slice(6, 8)}`,
            diamonds: Number(diamonds),
            dau: Number(dau),
            payers: Number(payers),
            retention: Number(retention) * 100,
            duration: Number(duration),
          }
        })
        setRows(parsed)
      })
      .catch(() => setRows([]))
    return () => {
      cancelled = true
    }
  }, [])

  return rows
}

function DataWorkbench({ compact = false }) {
  const data = useCommercialData()
  const [metric, setMetric] = useState('dau')
  const metricMap = {
    dau: { label: '日活', color: '#2f86ff' },
    retention: { label: '次日留存', color: '#18a67a' },
    payers: { label: '付费人数', color: '#ff7a45' },
    duration: { label: '人均时长', color: '#7b61ff' },
  }

  const stats = useMemo(() => {
    if (!data.length) return { average: 0, peak: 0, max: 1 }
    const values = data.map((item) => item[metric])
    return {
      average: values.reduce((sum, value) => sum + value, 0) / values.length,
      peak: Math.max(...values),
      max: Math.max(...values),
    }
  }, [data, metric])

  return (
    <div className={`data-workbench ${compact ? 'compact' : ''}`}>
      <div className="data-toolbar">
        <div>
          <span className="micro-label">92 DAYS · 2025 Q4</span>
          <h3>商业化与运营数据样本</h3>
        </div>
        <div className="metric-switch" role="tablist" aria-label="切换数据指标">
          {Object.entries(metricMap).map(([key, value]) => (
            <button
              type="button"
              role="tab"
              aria-selected={metric === key}
              className={metric === key ? 'active' : ''}
              key={key}
              onClick={() => setMetric(key)}
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>

      <div className="data-summary">
        <div>
          <span>样本均值</span>
          <strong>{data.length ? formatNumber(stats.average, metric) : '载入中'}</strong>
        </div>
        <div>
          <span>样本峰值</span>
          <strong>{data.length ? formatNumber(stats.peak, metric) : '—'}</strong>
        </div>
        <p>以趋势而非单点观察玩家行为，为体验问题建立可验证的判断依据。</p>
      </div>

      <div className="bar-chart-shell" aria-label={`${metricMap[metric].label}趋势图`}>
        <div className="chart-grid-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="bar-chart">
          {data.map((item, index) => (
            <button
              type="button"
              className="data-bar"
              key={`${item.date}-${index}`}
              style={{
                '--bar-height': `${Math.max((item[metric] / stats.max) * 100, 3)}%`,
                '--bar-color': metricMap[metric].color,
              }}
              aria-label={`${item.date}，${metricMap[metric].label} ${formatNumber(item[metric], metric)}`}
            >
              <span className="bar-tooltip">{item.date}<b>{formatNumber(item[metric], metric)}</b></span>
              <i />
            </button>
          ))}
        </div>
      </div>
      <div className="chart-axis"><span>10/01</span><span>11/01</span><span>12/01</span><span>12/31</span></div>
    </div>
  )
}

function TutorialFlow() {
  const [selected, setSelected] = useState(tutorialStages[0])
  return (
    <div className="flow-preview">
      <div className="flow-track" role="list" aria-label="七星连珠教学阶段">
        {tutorialStages.map((stage, index) => (
          <button
            type="button"
            role="listitem"
            className={selected.id === stage.id ? 'active' : ''}
            key={stage.id}
            onClick={() => setSelected(stage)}
          >
            <span>{stage.id}</span>
            <b>{stage.title}</b>
            {index < tutorialStages.length - 1 && <ChevronRight aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className="flow-detail">
        <div className="flow-detail-id">{selected.id}</div>
        <div>
          <span className="micro-label">PLAYER ACTION</span>
          <h3>{selected.title}</h3>
          <p>{selected.action}</p>
        </div>
        <div className="verify-pill"><CheckCircle2 aria-hidden="true" /> 完成判定：{selected.verify}</div>
      </div>
    </div>
  )
}

function WorkbookPreview() {
  const names = Object.keys(workbookSheets)
  const [sheetName, setSheetName] = useState(names[0])
  const sheet = workbookSheets[sheetName]

  return (
    <div className="workbook-preview">
      <div className="sheet-tabs" role="tablist" aria-label="选择配置表">
        {names.map((name) => (
          <button
            type="button"
            role="tab"
            aria-selected={sheetName === name}
            className={sheetName === name ? 'active' : ''}
            key={name}
            onClick={() => setSheetName(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <thead><tr>{sheet.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
          <tbody>
            {sheet.rows.map((row) => (
              <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sheet-status"><span /> 网页交互预览 · 原始工作簿字段节选</div>
    </div>
  )
}

function DocumentStudio() {
  const [tab, setTab] = useState('plan')
  const tabs = [
    { id: 'plan', label: '策划案', icon: FileText },
    { id: 'sheet', label: '配置表', icon: Table2 },
    { id: 'data', label: '数据复盘', icon: Database },
  ]

  return (
    <div className="studio-window liquid-card">
      <div className="window-topbar">
        <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
        <div className="studio-tabs" role="tablist" aria-label="切换项目资料预览">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? 'active' : ''}
              key={id}
              onClick={() => setTab(id)}
            >
              <Icon aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        <span className="window-title">Shanhai_System_Design</span>
      </div>
      <div className="studio-body">
        {tab === 'plan' && <TutorialFlow />}
        {tab === 'sheet' && <WorkbookPreview />}
        {tab === 'data' && <DataWorkbench compact />}
      </div>
    </div>
  )
}

function VideoModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null
  const primaryDocument = project.links?.[0]
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${project.title}实机视频`} onMouseDown={onClose}>
      <div className="video-modal" onMouseDown={(event) => event.stopPropagation()}>
        <div className="video-modal-head">
          <div><span>{project.eyebrow}</span><h2>{project.title}</h2></div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭视频"><X /></button>
        </div>
        <video src={project.video} poster={project.image} controls autoPlay playsInline preload="metadata" />
        <div className="video-modal-foot">
          <p>{project.subtitle}</p>
          <div>
            {primaryDocument && (
              <a href={primaryDocument.href} target="_blank" rel="noreferrer">
                <ExternalLink />{primaryDocument.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onPlay }) {
  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <article className={`project-card project-${project.id}`} onPointerMove={onPointerMove}>
      <button type="button" className="project-media" onClick={() => onPlay(project)} aria-label={`播放${project.title}实机视频`}>
        <img src={project.image} alt="" loading="lazy" />
        <span className="play-orb"><Play fill="currentColor" /> 实机演示</span>
        <span className="project-index">{project.index}</span>
      </button>
      <div className="project-copy">
        <span className="micro-label">{project.eyebrow}</span>
        <div className="project-heading"><h3>{project.title}</h3><ArrowUpRight aria-hidden="true" /></div>
        <p>{project.subtitle}</p>
        <div className="tag-row">{project.meta.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-value"><CheckCircle2 aria-hidden="true" />{project.value}</div>
        <div className="project-links">
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ExternalLink aria-hidden="true" /></a>
          ))}
        </div>
      </div>
    </article>
  )
}

const highlightedToolNames = new Set(['figma', 'iodraw', 'xmind', 'office', 'codex', 'unity/ue'])

function renderToolProof(text) {
  return String(text || '')
    .split(/(Figma|ioDraw|XMind|Office|Codex|Unity\/UE)/gi)
    .map((part, index) => highlightedToolNames.has(part.toLowerCase())
      ? <strong className="hero-tool-name" key={`${part}-${index}`}>{part}</strong>
      : part)
}

const beijunFlow = [
  ['F01', '入口区'],
  ['F02', '门后战斗'],
  ['F03', '机关牢房'],
  ['F04', '悬笼监牢'],
  ['F05', '厨房战斗'],
  ['F06', '震天吼'],
]

function EvidenceFrame({ src, alt, caption, onOpen, className = '', editorRow, editorLabel }) {
  return (
    <button
      type="button"
      className={`case-evidence-frame ${className}`}
      onClick={() => onOpen({ src, alt, label: caption })}
      aria-label={`放大查看：${caption}`}
    >
      <img src={src} alt={alt} loading="lazy" />
      <span>
        <span className="case-evidence-copy">
          <i {...(editorRow ? editableRowProps(editorRow, editorLabel || '图片说明', caption) : {})}>{caption}</i>
        </span>
        <ArrowUpRight aria-hidden="true" />
      </span>
    </button>
  )
}

function CaseDocumentLink({
  label = '查看详细文档',
  href = DOCUMENT_LINKS.projectOverview,
  message = '当前截图仅展示策划案部分节选；详情文档内容请点击按钮查看，避免不同电脑打开 Excel 出现排版差异。',
  showAction = true,
}) {
  return (
    <div className="case-document-link">
      <span><b>页面说明</b>{message}</span>
      {showAction && (
        <a href={href} target="_blank" rel="noreferrer">
          <FileText aria-hidden="true" />{label}<ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

function BeijunCaseStudy({ onPlay, onOpenImage }) {
  const project = projects[0]

  return (
    <div className="beijun-case-study">
      <nav className="case-project-switcher" aria-label="代表项目切换">
        <div className="case-switcher-title"><span>SELECTED WORK</span><strong>代表项目</strong></div>
        {projects.map((item, index) => (
          <button
            type="button"
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'page' : undefined}
            onClick={() => index > 0 && onPlay(item)}
            key={item.id}
          >
            <small>{item.index}</small>
            <span>{item.title}</span>
            {index === 0 ? <b>当前案例</b> : <Play aria-hidden="true" />}
          </button>
        ))}
      </nav>

      <article className="case-slide case-hero-slide">
        <div className="case-slide-no" aria-hidden="true">01</div>
        <div className="case-hero-copy">
          <span className="case-kicker">LEVEL DESIGN · 关卡策划完整案例</span>
          <h1>北郡大牢一层</h1>
          <h2>把“沿路清怪”重构为<br />有目标、有变化、可验收的副本流程。</h2>
          <p>负责关卡定位、整体流程、空间动线、机关交互、怪物配置、节奏模拟、实机自测与美术资源需求，并将方案推进至可游玩的线上版本。</p>
          <div className="case-stat-row" aria-label="关卡基础信息">
            <span><b>10级</b>开放等级</span>
            <span><b>1—5人</b>支持单人</span>
            <span><b>约10分钟</b>目标体验</span>
            <span><b>震天吼</b>最终 Boss</span>
          </div>
          <div className="case-action-row">
            <button type="button" className="case-primary-action" onClick={() => onPlay(project)}><Play fill="currentColor" />播放实机演示</button>
            <a href="/docs/beijun-plan.xlsx" target="_blank" rel="noreferrer"><FileText />下载策划案</a>
            <a href="/docs/beijun-config.xlsx" target="_blank" rel="noreferrer"><Table2 />下载开发配表</a>
          </div>
        </div>
        <button type="button" className="case-hero-media" onClick={() => onPlay(project)} aria-label="播放北郡大牢一层实机演示">
          <img loading="lazy" decoding="async" src={assetUrl('/images/beijun-poster.webp')} alt="北郡大牢一层实机画面" />
          <span className="case-video-badge"><Play fill="currentColor" />实机演示 · 07:08</span>
          <span className="case-media-note">线上版本实录</span>
        </button>
      </article>

      <article className="case-slide case-design-slide">
        <header className="case-slide-heading">
          <span>01 · DESIGN INTENT</span>
          <h2>先回答“为什么做”，<br />再决定“关卡里放什么”。</h2>
          <p>这不是一张怪物摆放图，而是一段承接剧情、提供成长反馈，并允许玩家重复挑战的战斗体验。</p>
        </header>
        <div className="case-decision-list">
          <section><small>玩家问题</small><h3>长线成长需要阶段目标</h3><p>主线推进后，玩家需要新的成长奖励、等级验证与可重复挑战内容。</p></section>
          <section><small>体验目标</small><h3>十分钟内持续变化</h3><p>用战斗、机关、探索、支线与 Boss 交替，避免单一路径连续清怪。</p></section>
          <section><small>交付标准</small><h3>配置、提示、验收一体化</h3><p>每个区域都写清目标、触发、阻挡、反馈与异常处理，便于开发接入和测试复现。</p></section>
        </div>
        <EvidenceFrame
          src={assetUrl('/images/beijun-case/positioning-export.png')}
          alt="北郡大牢一层关卡定位策划表"
          caption="策划案原页 · 关卡定位与体验目标"
          onOpen={onOpenImage}
          className="case-evidence-positioning"
        />
      </article>

      <article className="case-slide case-flow-slide">
        <header className="case-slide-heading">
          <span>02 · FLOW & SPACE</span>
          <h2>一条主线、一个隐藏分支，<br />六段强弱交替的空间叙事。</h2>
        </header>
        <div className="case-flow-rail" aria-label="关卡主流程">
          {beijunFlow.map(([id, label], index) => (
            <div className="case-flow-node" key={id}>
              <small>{id}</small><strong>{label}</strong>
              {index < beijunFlow.length - 1 && <ChevronRight aria-hidden="true" />}
            </div>
          ))}
          <div className="case-hidden-route"><span>H01</span>隐藏通道 → 厨房战斗</div>
        </div>
        <div className="case-flow-notes">
          <section><b>可读性</b><p>用门禁、火把、视线开口与任务提示，让玩家不依赖小地图也能理解下一目标。</p></section>
          <section><b>变化性</b><p>牢房机关、悬笼营救、厨房伏击和 Boss 战分别承担不同节奏功能。</p></section>
          <section><b>可配置</b><p>把触发器、敌人组、交互物、奖励与结算拆成独立数据，支持后续调优。</p></section>
        </div>
        <div className="case-evidence-pair">
          <EvidenceFrame src={assetUrl('/images/beijun-case/layout-export.png')} alt="北郡大牢一层概念布局图" caption="概念布局 · 区域与投放关系" onOpen={onOpenImage} />
          <EvidenceFrame src={assetUrl('/images/beijun-case/pacing-curve-export.png')} alt="北郡大牢一层挑战强度曲线" caption="关卡节奏 · 空间推进与挑战曲线" onOpen={onOpenImage} />
        </div>
      </article>

      <article className="case-slide case-pacing-slide">
        <header className="case-slide-heading">
          <span>03 · PACING & COMBAT</span>
          <h2>不是把难度一直抬高，<br />而是让压力有蓄力、有释放。</h2>
          <p>按约十分钟目标体验拆分节奏，用短战斗确认规则、机关段制造停顿、连续战斗抬升压力，最终在 Boss 战形成峰值。</p>
        </header>
        <div className="case-timeline" aria-label="关卡节奏时间线">
          <div><b>0—2′</b><span>入口确认</span><p>建立目标与第一场低压战斗。</p></div>
          <div><b>2—6′</b><span>机关与探索</span><p>牢房、悬笼和隐藏路线改变行动方式。</p></div>
          <div><b>6—10′</b><span>厨房与 Boss</span><p>连续战斗升压，在震天吼战形成高潮。</p></div>
          <div><b>5 → 1</b><span>结算释放</span><p>宝箱、任务反馈和离场闭合体验。</p></div>
        </div>
        <EvidenceFrame src={assetUrl('/images/beijun-case/pacing-table-export.png')} alt="北郡大牢一层关卡节奏与心流模拟表" caption="节奏模拟 · 时间、事件与挑战曲线" onOpen={onOpenImage} className="case-evidence-pacing" />
      </article>

      <article className="case-slide case-proof-slide">
        <div className="case-proof-copy">
          <span className="case-kicker">04 · PLAYTEST & DELIVERY</span>
          <h2>策划案的终点不是“写完”，<br />而是能够进游戏验收。</h2>
          <p>我按目标、敌人刷新、击杀进度、怪物行为、门禁、地图引导、Boss 与结算逐项自测，并根据实机结果回调配置。</p>
          <div className="case-proof-grid">
            <div><CheckCircle2 /><b>约 7 分钟</b><span>单次实机自测通关</span></div>
            <div><CheckCircle2 /><b>30 分钟</b><span>副本实例上限</span></div>
            <div><CheckCircle2 /><b>全项通过</b><span>流程与结算检查</span></div>
            <div><CheckCircle2 /><b>线上版本</b><span>真实项目交付</span></div>
          </div>
          <button type="button" className="case-primary-action" onClick={() => onPlay(project)}><Play fill="currentColor" />查看完整实机演示</button>
        </div>
        <EvidenceFrame src={assetUrl('/images/beijun-case/testing-export.png')} alt="北郡大牢一层实机自测清单" caption="验收记录 · 实机自测清单" onOpen={onOpenImage} className="case-evidence-testing" />
      </article>

      <footer className="case-next-project">
        <div><span>NEXT CASE</span><h2>七星连珠新手引导</h2><p>从状态恢复、阶段配置到异常兜底，继续查看系统策划案例。</p></div>
        <button type="button" onClick={() => onPlay(projects[1])}>快速预览<ArrowRight /></button>
      </footer>
    </div>
  )
}

const caseStudyContent = {
  beijun: {
    kicker: 'LEVEL DESIGN · 关卡策划完整案例',
    title: '北郡大牢一层',
    hook: '在约10分钟的单次流程内，为玩家提供目标清晰、战斗形式有变化、挑战逐步提升且结算反馈明确的副本体验。',
    summary: '负责关卡定位、整体流程、空间动线、机关交互、怪物配置、节奏模拟、实机自测与美术资源需求，并将方案推进至可游玩的线上版本。',
    poster: assetUrl('/images/beijun-poster-clean.png'),
    mediaNote: '线上版本实录',
    stats: [['10级', '开放等级'], ['1—5人', '支持单人'], ['约10分钟', '目标体验'], ['震天吼', '最终 Boss']],
    pages: [
      {
        id: 'intent', label: '设计目标', eyebrow: '01 · DESIGN INTENT',
        title: '先回答“为什么做”，\n再决定“关卡里放什么”。',
        intro: '这不是一张怪物摆放图，而是一段承接剧情、提供成长反馈，并允许玩家重复挑战的战斗体验。',
        cards: [
          ['玩家问题', '长线成长需要阶段目标', '主线推进后，玩家需要新的成长奖励、等级验证与可重复挑战内容。'],
          ['体验目标', '十分钟内持续变化', '用战斗、机关、探索、支线与 Boss 交替，避免单一路径连续清怪。'],
          ['交付标准', '配置、提示、验收一体化', '每个区域写清目标、触发、阻挡、反馈与异常处理，便于开发接入和测试复现。'],
        ],
        evidence: [{
          src: assetUrl('/images/beijun-case/positioning-table-user.png'),
          caption: '关卡定位 · 项目需求与体验目标',
        }],
      },
      {
        id: 'flow', label: '流程空间', eyebrow: '02 · FLOW & SPACE',
        title: '一条主线、一个隐藏分支，\n六段强弱交替的空间叙事。',
        intro: '把空间、目标和战斗节奏组织成一条可读、可配置的体验路径。',
        flow: beijunFlow,
        cards: [
          ['可读性', '不依赖小地图也能理解目标', '用门禁、火把、视线开口与任务提示指向下一目标。'],
          ['变化性', '不同区域承担不同节奏', '牢房机关、悬笼营救、厨房伏击和 Boss 战避免重复清怪。'],
          ['可配置', '投放对象拆成独立数据', '触发器、敌人组、交互物、奖励与结算均可单独调优。'],
        ],
        evidence: [
          {
            src: assetUrl('/images/beijun-case/layout-user.png'),
            caption: '概念布局 · 区域、门禁与投放关系',
          },
          {
            src: assetUrl('/images/beijun-case/spatial-user.png'),
            caption: '空间动线 · 逐区设计与验收要求',
          },
        ],
      },
      {
        id: 'pacing', label: '节奏战斗', eyebrow: '03 · PACING & COMBAT',
        title: '不是把难度一直抬高，\n而是让压力有蓄力、有释放。',
        intro: '按约十分钟目标体验拆分节奏，用短战斗确认规则、机关段制造停顿、连续战斗抬升压力，最终在 Boss 战形成峰值。',
        cards: [
          ['0—2′', '入口确认', '建立目标并用第一场低压战斗确认基础规则。'],
          ['2—6′', '机关与探索', '牢房、悬笼和隐藏路线改变玩家行动方式。'],
          ['6—10′', '厨房与 Boss', '连续战斗升压，在震天吼战形成高潮并结算释放。'],
        ],
        evidence: [{
          src: assetUrl('/images/beijun-case/pacing-user.png'),
          caption: '节奏模拟 · 时间、事件与心流变化',
        }],
      },
      {
        id: 'proof', label: '实机验收', eyebrow: '04 · PLAYTEST & DELIVERY',
        title: '策划案的终点不是“写完”，\n而是能够进游戏验收。',
        intro: '按目标、敌人刷新、击杀进度、怪物行为、门禁、地图引导、Boss 与结算逐项自测，并根据实机结果回调配置。',
        metrics: [['约 7 分钟', '单次实机自测通关'], ['30 分钟', '副本实例上限'], ['全项通过', '流程与结算检查'], ['线上版本', '真实项目交付']],
        evidence: [{
          src: assetUrl('/images/beijun-case/testing-results-user.png'),
          caption: '实机验收 · 逐项自测结果',
        }],
      },
    ],
  },
  tutorial: {
    kicker: 'SYSTEM DESIGN · 新手引导完整案例',
    title: '七星连珠新手引导',
    hook: '把七段教学目标组织成\n可恢复、可配置、可验收的入门旅程。',
    summary: '通过七座依次开放的空岛，完成移动、装备武器、技能学习与使用、天命印记、身法跨越、武器切换和远程射击教学；同时定义死亡、退出、重登及奖励、传送异常的恢复规则。',
    poster: assetUrl('/images/tutorial-hongshazhidi-render.png'),
    mediaNote: '七岛流程实机',
    stats: [['I-01—07', '七段教学'], ['10张', '执行配置表'], ['状态机', '中断可恢复'], ['已上线', '真实版本交付']],
    pages: [
      {
        id: 'intent', label: '教学目标', eyebrow: '01 · TEACHING INTENT',
        title: '一次只教一个动作，\n完成后立刻给出结果反馈。',
        intro: '新手引导不是功能说明书，而是让玩家在做中学：每座岛只承载一个核心目标，用门禁与场景变化确认学习结果。',
        cards: [
          ['认知负担', '七段目标逐层递进', '从移动、装备、技能到成长选择，避免同时灌输多个系统。'],
          ['即时验证', '动作完成才推进', '装备槽位、技能击杀、有效命中与到达区域都有明确判定。'],
          ['正式衔接', '教学结束即进入主线', '结尾通过对话、奖励与传送，把新手流程平滑接入正式体验。'],
        ],
        evidence: [{
          src: assetUrl('/images/tutorial-case/tutorial-i07-flow-ui.png'),
          caption: '教学闭环 · 状态判定、界面原型与实机反馈',
        }],
      },
      {
        id: 'flow', label: '阶段状态', eyebrow: '02 · STAGE & STATE',
        title: '七个阶段不是七段文案，\n而是一套可追踪的状态推进。',
        intro: '每阶段统一定义前置、触发、完成判定、门禁、下一阶段与特殊规则，开发和测试可以从同一张总表进入。',
        flow: tutorialStages.map((item) => [item.id, item.title]),
        cards: [
          ['Locked → Ready', '前置完成才开放', '未完成上一步时不允许越级触发后续教学。'],
          ['Active ↔ Suspended', '离开与重登保留进度', '技能击败数和飞鸡靶命中数不会因中断清零。'],
          ['Done', '结果、门禁和奖励同步', '阶段完成后写入状态，解除门禁并激活下一目标。'],
        ],
        evidence: [{
          src: assetUrl('/images/tutorial-case/tutorial-stages.png'),
          caption: '阶段总表 · 目标、触发与完成判定',
        }],
      },
      {
        id: 'delivery', label: '配置交付', eyebrow: '03 · CROSS-FUNCTION DELIVERY',
        title: '把“想让玩家学会”翻译成\n程序、美术与测试都能执行的数据。',
        intro: '阶段总表作为主入口，再拆分教学目标、奖励、文本、对话、场景对象、神器候选、资源需求与测试清单。',
        cards: [
          ['程序', '对象、触发与状态恢复', '明确实例 ID、激活条件、关闭条件、计数保留与失败重试。'],
          ['场景 / UI', '点位、门禁与反馈资源', '定义卷轴、目标组、复位点、光幕、提示与选择界面需求。'],
          ['测试', '用配置索引定位问题', '每个用例可回查阶段、目标、奖励或场景绑定，降低联调成本。'],
        ],
        evidence: [{
          src: assetUrl('/images/tutorial-case/tutorial-resource-delivery-export.png'),
          caption: '资源交付 · 美术、动画、音频与文本需求',
        }],
      },
      {
        id: 'proof', label: '验收复盘', eyebrow: '04 · QA & RETROSPECTIVE',
        title: '不仅验证“能通关”，\n还验证错误操作不会误推进。',
        intro: '把错误槽位、无效攻击、中断重登、背包满、掉线重连与传送失败列为高风险路径，并在上线后根据玩家反馈调整成长路线。',
        metrics: [['16项', '基础联调用例'], ['3 / 6', '技能有效击败'], ['6 / 10', '远程有效命中'], ['可恢复', '重登与失败重试']],
        evidence: [{
          src: assetUrl('/images/tutorial-case/tutorial-qa-checklist-export.png'),
          caption: '测试验收 · 主流程与高风险异常清单',
        }],
      },
    ],
  },
  dungeon: {
    kicker: 'SYSTEM DESIGN · 核心功能完整案例',
    title: '副本挑战系统',
    hook: '把入口、难度、队伍、运行与结算\n组织成可复用的 PVE 挑战闭环。',
    summary: '副本挑战系统是游戏中的常驻PVE玩法，承接角色养成、战力验证和阶段推进。',
    poster: assetUrl('/images/render-boss.webp'),
    mediaNote: '功能原型 Demo',
    stats: [['25档', '难度分层'], ['1—5人', '单人或组队'], ['PVE', '常驻成长玩法'], ['9项P0', '核心功能验收']],
    pages: [
      {
        id: 'intent', label: '系统定位', eyebrow: '01 · SYSTEM INTENT',
        title: '副本不是一次性内容，\n而是养成、验证与下一目标的连接器。',
        intro: '让玩家通过战斗获得成长资源，再以成长结果挑战更高阶段，形成可持续的资源循环与战力验证。',
        cards: [
          ['成长路径', '不同战力都有下一档目标', '低战玩家从基础难度起步，高战玩家继续推进更高挑战。'],
          ['重复价值', '首通之外仍有参与理由', '奖励分层、成绩提升与高品质掉落维持重复挑战动力。'],
          ['内容复用', '一套地图服务多个阶段', '通过敌人组合、机制和奖励分层延长内容使用周期。'],
        ],
        evidence: [{
          src: assetUrl('/images/dungeon-case/dungeon-intent-user.png'),
          caption: '设计概述 · 系统定位、需求与体验目标',
        }],
      },
      {
        id: 'flow', label: '挑战闭环', eyebrow: '02 · PLAYER FLOW',
        title: '挑战前做判断，挑战中看进度，\n挑战后明确收益与下一步。',
        intro: '把玩家看到的界面流程和后台需要的实例生命周期统一起来，避免只画界面、不说明状态。',
        flow: [['F01', '选择副本'], ['F02', '选择难度'], ['F03', '队伍校验'], ['F04', '创建实例'], ['F05', '目标推进'], ['F06', '结算清理']],
        cards: [
          ['挑战前', '可判断难度、成本与收益', '锁定内容可查看条件，但不能进入或产生扣费。'],
          ['挑战中', '全队共享目标进度', '区域、击杀与交互持续更新阶段状态。'],
          ['挑战后', '结算只触发一次', '记录成绩、发放个人奖励、生成出口并清理实例。'],
        ],
        evidence: [{
          src: assetUrl('/images/dungeon-case/dungeon-entry-overview-export.png'),
          caption: '功能设计总览 · 系统入口与准入规则',
        }],
      },
      {
        id: 'delivery', label: '规则交付', eyebrow: '03 · RULES & DELIVERY',
        title: '把界面、规则与程序边界\n写成同一套可接入的交付语言。',
        intro: '明确副本列表刷新、准入与扣费、局内目标、死亡与掉线、结算和资源清理，并将怪物、奖励与关卡投放交给对应配置表。',
        cards: [
          ['准入', '全队校验后再创建实例', '等级、精力或开放条件失败时定位具体成员且不扣费。'],
          ['运行', '共享进度与异常恢复', '掉线保留 120 秒，主动退出不可返回，超时按失败规则处理。'],
          ['结算', '奖励与清理保持幂等', '重复确认、掉线重进或背包满都不能造成重复发奖。'],
        ],
        evidence: [{
          src: assetUrl('/images/dungeon-case/dungeon-rules-delivery-export.png'),
          caption: '规则交付 · 系统行为、状态反馈与异常处理',
        }],
      },
      {
        id: 'proof', label: '功能验收', eyebrow: '04 · ACCEPTANCE',
        title: '用高风险场景证明系统\n不是“看起来完整”，而是真的能落地。',
        intro: '围绕开放状态、难度切换、队伍准入、重复请求、创建失败、同时结算、掉线重连与重复奖励建立 P0 验收。',
        metrics: [['9项', '核心验收场景'], ['P0', '全部关键路径'], ['120秒', '掉线保留时间'], ['一次', '唯一结算与发奖']],
        evidence: [{
          src: assetUrl('/images/dungeon-case/dungeon-acceptance-checklist.png'),
          caption: '验收说明 · 核心场景、操作条件与预期结果',
        }],
      },
    ],
  },
}

const caseDocumentLinks = {
  beijun: {
    intent: 'https://docs.qq.com/sheet/DU3FrV0xvUE5JSkVT?tab=000002',
    flow: 'https://docs.qq.com/sheet/DU3FrV0xvUE5JSkVT?tab=000005',
    pacing: 'https://docs.qq.com/sheet/DU3FrV0xvUE5JSkVT?tab=000006',
    proof: 'https://docs.qq.com/sheet/DU3FrV0xvUE5JSkVT?tab=000009',
  },
  tutorial: {
    intent: 'https://docs.qq.com/doc/DU3FEaHBDaVBCQ2Ji',
    flow: 'https://docs.qq.com/doc/DU3FEaHBDaVBCQ2Ji',
    delivery: 'https://docs.qq.com/document/DU21Ca0tkSm1Hd1pI?tab=000008',
    proof: 'https://docs.qq.com/document/DU21Ca0tkSm1Hd1pI?tab=000009',
  },
  dungeon: {
    intent: 'https://docs.qq.com/sheet/DU05icndzYWtadmVE?tab=000002',
    flow: 'https://docs.qq.com/sheet/DU05icndzYWtadmVE?tab=000004',
    delivery: 'https://docs.qq.com/sheet/DU05icndzYWtadmVE?tab=000005',
    proof: 'https://docs.qq.com/sheet/DU05icndzYWtadmVE?tab=000008',
  },
}

function CasePageRail({ pages, activePage, onNavigate, onHome }) {
  const rail = (
    <aside className="case-page-rail" aria-label="案例子页导航">
      <span className="case-page-rail-title">CASE PAGES</span>
      <button type="button" className="case-page-home" onClick={onHome} aria-label="返回页面顶部">
        <ArrowUp aria-hidden="true" />
        <span>返回顶部</span>
      </button>
      {pages.map((page, index) => (
        <button
          type="button"
          className={activePage === page.id ? 'active' : ''}
          aria-current={activePage === page.id ? 'step' : undefined}
          onClick={() => onNavigate(page.id)}
          key={page.id}
        >
          <small>{String(index + 1).padStart(2, '0')}</small>
          <span>{page.label}</span>
        </button>
      ))}
    </aside>
  )

  return typeof document === 'undefined' ? rail : createPortal(rail, document.body)
}

const editableRowProps = (key, label, defaultText) => ({
  'data-editor-row': key,
  'data-editor-label': label,
  'data-editor-default': String(defaultText ?? ''),
})

function ModuleEditButton({ moduleId, label, onOpen }) {
  return (
    <button
      type="button"
      className="portfolio-module-editor-toggle"
      onClick={() => onOpen(moduleId, label)}
      aria-label={`编辑${label}`}
    >
      <Settings2 aria-hidden="true" />
      <span>编辑内容</span>
    </button>
  )
}

function PortfolioModuleEditor({ editor, edits, onChange, onReset, onClose }) {
  if (!editor || typeof document === 'undefined') return null

  const panel = (
    <>
      <button className="portfolio-module-editor-backdrop" type="button" onClick={onClose} aria-label="关闭模块编辑器" />
      <aside className="portfolio-module-editor" role="dialog" aria-modal="true" aria-label={`${editor.label}内容编辑器`}>
        <header>
          <div><span>MODULE EDITOR</span><h2>{editor.label}</h2></div>
          <button type="button" onClick={onClose} aria-label="关闭编辑器"><X /></button>
        </header>
        <p className="portfolio-editor-tip">逐行修改文案与字号。设置仅保存在当前浏览器，正式浏览时编辑器不会出现。</p>
        <div className="portfolio-editor-rows">
          {editor.rows.map((row) => {
            const saved = edits?.[editor.moduleId]?.[row.key] || {}
            const text = saved.text ?? row.defaultText
            const scale = Number(saved.scale ?? 1)
            return (
              <section className="portfolio-editor-row" key={row.key}>
                <label htmlFor={`portfolio-text-${editor.moduleId}-${row.key}`}>{row.label}</label>
                <textarea
                  id={`portfolio-text-${editor.moduleId}-${row.key}`}
                  rows={text.length > 34 || text.includes('\n') ? 2 : 1}
                  value={text}
                  onChange={(event) => onChange(editor.moduleId, row.key, 'text', event.target.value)}
                />
                <div>
                  <span>字号 <output>{Math.round(scale * 100)}%</output></span>
                  <input
                    type="range"
                    min="0.75"
                    max="1.45"
                    step="0.05"
                    value={scale}
                    onChange={(event) => onChange(editor.moduleId, row.key, 'scale', Number(event.target.value))}
                  />
                </div>
              </section>
            )
          })}
        </div>
        <footer>
          <button type="button" onClick={() => onReset(editor.moduleId)}><RotateCcw />恢复本模块</button>
          <button type="button" className="primary" onClick={onClose}>完成编辑</button>
        </footer>
      </aside>
    </>
  )

  return createPortal(panel, document.body)
}

function ProjectOverview({ sectionDomId, onSelectProject, onOpenImage, onEditModule }) {
  const overviewCases = [projects[1], projects[2], projects[0]]
  const overviewMetrics = [
    ['5人', '核心团队'],
    ['约2年', '持续开发'],
    ['7个月', '上线运营'],
    ['约50万', '首季流水'],
    ['1098', '峰值 DAU'],
    ['42.9%', '平均次留'],
  ]

  return (
    <>
      <article className="case-slide project-overview-hero" id={sectionDomId('overview')} data-portfolio-module="project-overview:overview">
        <ModuleEditButton moduleId="project-overview:overview" label="项目总览·项目全貌" onOpen={onEditModule} />
        <div className="case-slide-no" aria-hidden="true">00</div>
        <div className="project-overview-copy">
          <span className="case-kicker" {...editableRowProps('kicker', '顶部标签', 'PROJECT OVERVIEW · 原创 UGC MMORPG')}>PROJECT OVERVIEW · 原创 UGC MMORPG</span>
          <h1 {...editableRowProps('title', '主标题', '《山海传说》整体项目展示')}>《山海传说》整体项目展示</h1>
          <h2 {...editableRowProps('hook', '项目钩子', '从大世界探索、角色成长到多人 PVE 验证，完成研发、上线与持续运营的国风 MMORPG 项目。')}>从大世界探索、角色成长到多人 PVE 验证，完成研发、上线与持续运营的国风 MMORPG 项目。</h2>
          <div className="project-overview-role">
            <b {...editableRowProps('role-label', '角色标签', '我的角色')}>我的角色</b>
            <span {...editableRowProps('role-copy', '角色说明', '担任系统策划，参与新手引导、副本系统、大牢关卡及其他玩法与系统的设计、配置、测试跟进和版本调整。')}>担任系统策划，参与新手引导、副本系统、大牢关卡及其他玩法与系统的设计、配置、测试跟进和版本调整。</span>
          </div>
          <div className="project-overview-actions">
            <a className="overview-ppt-entry" href={DOCUMENT_LINKS.projectOverview} target="_blank" rel="noreferrer"><ArrowUpRight />项目展示 PPT</a>
            <button className="case-primary-action overview-cases-entry" type="button" onClick={() => onSelectProject('tutorial')}>代表案例开始看<ArrowRight /></button>
          </div>
          <div className="project-overview-case-scope">
            <p {...editableRowProps('case-scope', '代表案例范围说明', '我参与了项目整体系统规划及多个系统的设计、配置与迭代。为控制单次阅读时长，本作品集按玩家体验顺序选取三项代表案例，覆盖新手教学、关卡流程与常驻 PVE；其余参与内容在下方六类系统版图中集中呈现。')}>我参与了项目整体系统规划及多个系统的设计、配置与迭代。为控制单次阅读时长，本作品集按玩家体验顺序选取三项代表案例，覆盖新手教学、关卡流程与常驻 PVE；其余参与内容在下方六类系统版图中集中呈现。</p>
            <ol aria-label="三个代表案例的玩家体验顺序">
              <li><b>01</b><span>新手教学</span><strong>七星连珠新手引导</strong></li>
              <li><b>02</b><span>常驻 PVE</span><strong>副本挑战系统</strong></li>
              <li><b>03</b><span>关卡流程</span><strong>北郡大牢一层</strong></li>
            </ol>
          </div>
        </div>

        <button
          type="button"
          className="project-overview-poster"
          onClick={() => onOpenImage({ src: assetUrl('/images/shanhai-world-banner.webp'), alt: '山海传说完整项目主视觉', label: '《山海传说》原创 UGC MMORPG 项目主视觉' })}
          aria-label="放大查看山海传说项目主视觉"
        >
          <img loading="eager" decoding="async" fetchPriority="high" src={assetUrl('/images/shanhai-world-banner.webp')} alt="山海传说完整项目主视觉" />
          <span><i {...editableRowProps('poster-caption', '主视觉说明', '原创 UGC 商业项目 · 国风神话题材 · MMORPG · 开放世界')}>原创 UGC 商业项目 · 国风神话题材 · MMORPG · 开放世界</i><ArrowUpRight /></span>
        </button>

        <div className="project-overview-metrics" aria-label="项目规模与上线成绩">
          {overviewMetrics.map(([value, label], index) => <span key={label}><b {...editableRowProps(`metric-${index}-value`, `${label}数值`, value)}>{value}</b><small {...editableRowProps(`metric-${index}-label`, `${label}标签`, label)}>{label}</small></span>)}
        </div>
      </article>

      <article className="case-slide project-overview-systems" id={sectionDomId('systems')} data-portfolio-module="project-overview:systems">
        <ModuleEditButton moduleId="project-overview:systems" label="项目总览·系统版图" onOpen={onEditModule} />
        <div className="case-slide-no" aria-hidden="true">01</div>
        <header>
          <span className="case-kicker" {...editableRowProps('kicker', '顶部标签', 'THEME & SYSTEM MAP · 项目主题与系统版图')}>THEME & SYSTEM MAP · 项目主题与系统版图</span>
          <h2 {...editableRowProps('title', '主标题', '系统版图：六类系统支撑长期 MMORPG 体验')}>系统版图：六类系统支撑长期 MMORPG 体验</h2>
          <p {...editableRowProps('intro', '系统版图说明', '按玩家目标、内容供给、日常留存与资源流转拆分项目全貌，呈现角色成长、世界任务、PVE 内容、运营留存、玩家经济与商业化之间的关系。')}>按玩家目标、内容供给、日常留存与资源流转拆分项目全貌，呈现角色成长、世界任务、PVE 内容、运营留存、玩家经济与商业化之间的关系。</p>
        </header>

        <section className="project-theme-feature">
          <button
            type="button"
            onClick={() => onOpenImage({ src: assetUrl('/images/project-overview/theme-world.webp'), alt: '山海传说国风神话世界', label: '主题解读：把山海神话做成可游玩的世界' })}
            aria-label="放大查看山海传说主题世界画面"
          >
            <img loading="lazy" decoding="async" src={assetUrl('/images/project-overview/theme-world.webp')} alt="山海传说国风神话世界" />
            <span>THEME & WORLD<ArrowUpRight /></span>
          </button>
          <div>
            <h3 {...editableRowProps('theme-title', '主题标题', '把山海神话做成可游玩的世界')}>把山海神话做成可游玩的世界</h3>
            <p {...editableRowProps('theme-summary', '主题说明', '让玩家以修行者身份探索区域、处理事件、获取装备并结识伙伴；用东方幻想的地图、怪物与界面表达统一项目气质。')}>让玩家以修行者身份探索区域、处理事件、获取装备并结识伙伴；用东方幻想的地图、怪物与界面表达统一项目气质。</p>
            <ul>
              <li><b {...editableRowProps('theme-0-label', '主题要点一标签', '玩家身份')}>玩家身份</b><span {...editableRowProps('theme-0-copy', '主题要点一说明', '修行、探索与成长')}>修行、探索与成长</span></li>
              <li><b {...editableRowProps('theme-1-label', '主题要点二标签', '世界结构')}>世界结构</b><span {...editableRowProps('theme-1-copy', '主题要点二说明', '区域入口与多人挑战')}>区域入口与多人挑战</span></li>
              <li><b {...editableRowProps('theme-2-label', '主题要点三标签', '主题落地')}>主题落地</b><span {...editableRowProps('theme-2-copy', '主题要点三说明', '地图、怪物与界面统一')}>地图、怪物与界面统一</span></li>
            </ul>
          </div>
        </section>

        <div className="project-system-map">
          {shanhaiSystemPillars.map((pillar, pillarIndex) => (
            <section className={`system-pillar system-pillar--${pillar.tone}`} key={pillar.no}>
              <button
                type="button"
                onClick={() => onOpenImage({ src: pillar.image, alt: `${pillar.title}系统实机截图`, label: `${pillar.no} · ${pillar.title}` })}
                aria-label={`放大查看${pillar.title}系统截图`}
              >
                <div className={`system-pillar-visual system-pillar-visual--${pillar.visualMode || 'single'}`}>
                  <span className="system-pillar-visual-pane system-pillar-visual-primary">
                    <img loading="lazy" decoding="async" src={pillar.image} alt={`${pillar.title}系统实机截图`} />
                  </span>
                  {pillar.detailImage && (
                    <span className="system-pillar-visual-pane system-pillar-visual-secondary">
                      <img loading="lazy" decoding="async" src={pillar.detailImage} alt="" />
                    </span>
                  )}
                  <span className="system-pillar-visual-label">{pillar.visualLabel}</span>
                </div>
              </button>
              <small>{pillar.no}</small>
              <h3 {...editableRowProps(`pillar-${pillarIndex}-title`, `系统${pillar.no}标题`, pillar.title)}>{pillar.title}</h3>
              <p {...editableRowProps(`pillar-${pillarIndex}-summary`, `系统${pillar.no}说明`, pillar.summary)}>{pillar.summary}</p>
              <ul className="system-pillar-list">
                {pillar.items.map((item, itemIndex) => (
                  <li key={`${pillar.no}-${item.label}`}>
                    <b {...editableRowProps(`pillar-${pillarIndex}-item-${itemIndex}-label`, `系统${pillar.no}模块${itemIndex + 1}`, item.label)}>{item.label}</b>
                    <span {...editableRowProps(`pillar-${pillarIndex}-item-${itemIndex}-detail`, `系统${pillar.no}模块${itemIndex + 1}说明`, item.detail)}>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="project-overview-contribution">
          <span {...editableRowProps('contribution-kicker', '个人贡献标签', 'PERSONAL CONTRIBUTION')}>PERSONAL CONTRIBUTION</span>
          <h3 {...editableRowProps('contribution-title', '个人贡献标题', '把想法变成团队可以制作与验收的交付物')}>把想法变成团队可以制作与验收的交付物</h3>
          <div>
            <p><b {...editableRowProps('contribution-0-label', '贡献一标签', '策划设计')}>策划设计</b><span {...editableRowProps('contribution-0-copy', '贡献一说明', '系统规则、玩家流程、关卡节奏与异常边界')}>系统规则、玩家流程、关卡节奏与异常边界</span></p>
            <p><b {...editableRowProps('contribution-1-label', '贡献二标签', '协作交付')}>协作交付</b><span {...editableRowProps('contribution-1-copy', '贡献二说明', '策划案、流程图、界面原型、配置表与资源需求')}>策划案、流程图、界面原型、配置表与资源需求</span></p>
            <p><b {...editableRowProps('contribution-2-label', '贡献三标签', '跟进落地')}>跟进落地</b><span {...editableRowProps('contribution-2-copy', '贡献三说明', '对接制作、实机测试、问题回收与版本调整')}>对接制作、实机测试、问题回收与版本调整</span></p>
          </div>
        </aside>
      </article>

      <article className="case-slide project-overview-cases" id={sectionDomId('cases')} data-portfolio-module="project-overview:cases">
        <ModuleEditButton moduleId="project-overview:cases" label="项目总览·代表案例" onOpen={onEditModule} />
        <div className="case-slide-no" aria-hidden="true">02</div>
        <header>
          <span className="case-kicker" {...editableRowProps('kicker', '顶部标签', 'SELECTED EVIDENCE · 三个代表案例')}>SELECTED EVIDENCE · 三个代表案例</span>
          <h2 {...editableRowProps('title', '主标题', '三个代表模块的设计与落地')}>三个代表模块的设计与落地</h2>
          <p {...editableRowProps('intro', '阅读说明', '我参与了项目整体系统规划及多个系统的设计、配置与迭代；本次作品集按玩家体验顺序，选取三个代表模块，以策划案和实机视频进行重点展示。')}>我参与了项目整体系统规划及多个系统的设计、配置与迭代；本次作品集按玩家体验顺序，选取三个代表模块，以策划案和实机视频进行重点展示。</p>
        </header>
        <div className="project-overview-case-grid">
          {overviewCases.map((item, index) => (
            <button type="button" key={item.id} onClick={() => onSelectProject(item.id)}>
              <img loading="lazy" decoding="async" src={item.image} alt="" />
              <span>0{index + 1}</span>
              <small {...editableRowProps(`case-${index}-eyebrow`, `案例${index + 1}类型`, item.eyebrow)}>{item.eyebrow}</small>
              <h3 {...editableRowProps(`case-${index}-title`, `案例${index + 1}标题`, item.title)}>{item.title}</h3>
              <p {...editableRowProps(`case-${index}-summary`, `案例${index + 1}说明`, item.subtitle)}>{item.subtitle}</p>
              <b>进入完整案例<ArrowRight /></b>
            </button>
          ))}
        </div>
      </article>
    </>
  )
}

function PortfolioCaseStudy({ onPlay, onOpenImage, isActive }) {
  const [selectedProjectId, setSelectedProjectId] = useState('project-overview')
  const [portfolioEdits, setPortfolioEdits] = useState(() => {
    try {
      const saved = window.localStorage.getItem('kz-portfolio-module-content-v1')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })
  const [moduleEditor, setModuleEditor] = useState(null)
  const isProjectOverview = selectedProjectId === 'project-overview'
  const selectedIndex = orderedPortfolioProjects.findIndex((item) => item.id === selectedProjectId)
  const project = isProjectOverview ? null : orderedPortfolioProjects[selectedIndex]
  const content = isProjectOverview ? null : caseStudyContent[selectedProjectId]
  const pages = isProjectOverview
    ? projectOverviewPages
    : [{ id: 'overview', label: '案例概览' }, ...content.pages.map(({ id, label }) => ({ id, label }))]
  const [activeCasePage, setActiveCasePage] = useState('overview')
  const switcherRef = useRef(null)
  const hasSwitchedProject = useRef(false)

  const sectionDomId = (pageId) => `case-${selectedProjectId}-${pageId}`

  useEffect(() => {
    window.localStorage.setItem('kz-portfolio-module-content-v1', JSON.stringify(portfolioEdits))
  }, [portfolioEdits])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.querySelectorAll('[data-portfolio-module]').forEach((moduleElement) => {
        const moduleId = moduleElement.dataset.portfolioModule
        moduleElement.querySelectorAll('[data-editor-row]').forEach((element) => {
          const rowId = element.dataset.editorRow
          const saved = portfolioEdits?.[moduleId]?.[rowId]
          if (!element.dataset.editorBaseSize) element.dataset.editorBaseSize = window.getComputedStyle(element).fontSize
          const fallback = element.dataset.editorDefault ?? ''
          const nextText = saved?.text ?? fallback
          if (element.textContent !== nextText) element.textContent = nextText
          if (saved?.scale && Number(saved.scale) !== 1) {
            const baseSize = Number.parseFloat(element.dataset.editorBaseSize) || 14
            element.style.fontSize = `${(baseSize * Number(saved.scale)).toFixed(2)}px`
          } else {
            element.style.removeProperty('font-size')
          }
        })
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [portfolioEdits, selectedProjectId])

  const openModuleEditor = (moduleId, label) => {
    const moduleElement = Array.from(document.querySelectorAll('[data-portfolio-module]'))
      .find((element) => element.dataset.portfolioModule === moduleId)
    if (!moduleElement) return
    const rows = Array.from(moduleElement.querySelectorAll('[data-editor-row]')).map((element) => ({
      key: element.dataset.editorRow,
      label: element.dataset.editorLabel || element.dataset.editorRow,
      defaultText: element.dataset.editorDefault ?? element.textContent ?? '',
    }))
    setModuleEditor({ moduleId, label, rows })
  }

  const updateModuleRow = (moduleId, rowId, key, value) => {
    setPortfolioEdits((current) => ({
      ...current,
      [moduleId]: {
        ...(current[moduleId] || {}),
        [rowId]: { ...(current[moduleId]?.[rowId] || {}), [key]: value },
      },
    }))
  }

  const resetModuleRows = (moduleId) => {
    setPortfolioEdits((current) => {
      const next = { ...current }
      delete next[moduleId]
      return next
    })
  }

  useEffect(() => {
    setActiveCasePage('overview')
    setModuleEditor(null)
    if (!hasSwitchedProject.current) {
      hasSwitchedProject.current = true
      return undefined
    }
    const timer = window.setTimeout(() => {
      const targetTop = switcherRef.current?.getBoundingClientRect().top + window.scrollY - 112
      if (Number.isFinite(targetTop)) window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }, 40)
    return () => window.clearTimeout(timer)
  }, [selectedProjectId])

  useEffect(() => {
    let frame = 0
    const updateActivePage = () => {
      frame = 0
      const targetLine = window.innerHeight * .38
      const visible = pages
        .map((page) => ({ page, element: document.getElementById(sectionDomId(page.id)) }))
        .filter((item) => item.element)
        .map((item) => ({ ...item, distance: Math.abs(item.element.getBoundingClientRect().top - targetLine) }))
        .sort((a, b) => a.distance - b.distance)[0]
      if (visible) setActiveCasePage(visible.page.id)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActivePage)
    }
    updateActivePage()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [selectedProjectId])

  const goToPage = (pageId) => {
    document.getElementById(sectionDomId(pageId))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectProject = (projectId) => {
    if (projectId !== selectedProjectId) setSelectedProjectId(projectId)
  }

  const nextProject = isProjectOverview
    ? orderedPortfolioProjects[0]
    : orderedPortfolioProjects[(selectedIndex + 1) % orderedPortfolioProjects.length]

  return (
    <div className={`beijun-case-study portfolio-case-study case-${selectedProjectId}`}>
      {isActive && (
        <CasePageRail
          pages={pages}
          activePage={activeCasePage}
          onNavigate={goToPage}
          onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      )}

      <nav className="case-project-switcher" aria-label="代表项目切换" ref={switcherRef}>
        <div className="case-switcher-title"><span>SELECTED WORK</span><strong>代表项目</strong></div>
        {portfolioEntries.map((item) => (
          <button
            type="button"
            className={`${item.id === selectedProjectId ? 'active' : ''}${item.id === 'project-overview' ? ' overview-entry' : ''}`.trim()}
            aria-current={item.id === selectedProjectId ? 'page' : undefined}
            onClick={() => selectProject(item.id)}
            key={item.id}
          >
            <small>{item.index}</small>
            <span>{item.title}</span>
            {item.id === selectedProjectId ? <b>当前案例</b> : <ChevronRight aria-hidden="true" />}
          </button>
        ))}
      </nav>

      {isProjectOverview ? (
        <ProjectOverview sectionDomId={sectionDomId} onSelectProject={selectProject} onOpenImage={onOpenImage} onEditModule={openModuleEditor} />
      ) : (
        <>

      <article className="case-slide case-hero-slide" id={sectionDomId('overview')} data-portfolio-module={`${selectedProjectId}:overview`}>
        <ModuleEditButton moduleId={`${selectedProjectId}:overview`} label={`${content.title}·案例概览`} onOpen={openModuleEditor} />
        <div className="case-slide-no" aria-hidden="true">01</div>
        <div className="case-hero-copy">
          <span className="case-kicker" {...editableRowProps('kicker', '案例类型', content.kicker)}>{content.kicker}</span>
          <h1 {...editableRowProps('title', '案例标题', content.title)}>{content.title}</h1>
          <h2 {...editableRowProps('hook', '案例目标', content.hook)}>{content.hook}</h2>
          <p {...editableRowProps('summary', '职责说明', content.summary)}>{content.summary}</p>
          <div className="case-stat-row" aria-label="案例基础信息">
            {content.stats.map(([value, label], index) => <span key={label}><b {...editableRowProps(`stat-${index}-value`, `${label}数值`, value)}>{value}</b><i {...editableRowProps(`stat-${index}-label`, `${label}标签`, label)}>{label}</i></span>)}
          </div>
          <div className="case-action-row" key={`${selectedProjectId}-case-actions`}>
            <button type="button" className="case-primary-action" onClick={() => onPlay(project)}><Play fill="currentColor" />播放实机演示</button>
            {project.links
              .filter((link, index, links) => links.findIndex((item) => item.href === link.href || item.label === link.label) === index)
              .map((link, index) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={`${selectedProjectId}-${index}-${link.href}`}>
                {index === 0 ? <FileText /> : <Table2 />}{link.label}
              </a>
              ))}
          </div>
          <CaseDocumentLink
            message="当前网页仅展示策划案部分节选；完整策划案文档、界面原型图、流程图和配表请点击上方按钮查看在线文档，以避免不同电脑打开 Excel 时出现排版差异。"
            showAction={false}
          />
        </div>
        <button type="button" className="case-hero-media" onClick={() => onPlay(project)} aria-label={`播放${content.title}实机演示`}>
          <img loading="lazy" decoding="async" src={content.poster} alt={`${content.title}实机画面`} />
          <span className="case-video-badge"><Play fill="currentColor" />播放实机演示</span>
          <span className="case-media-note" {...editableRowProps('media-note', '画面标签', content.mediaNote)}>{content.mediaNote}</span>
        </button>
      </article>

      {content.pages.map((page, pageIndex) => (
        <article
          className={`case-slide case-design-slide case-detail-slide${page.evidence.length > 1 ? ' has-evidence-pair' : ''}`}
          id={sectionDomId(page.id)}
          data-portfolio-module={`${selectedProjectId}:${page.id}`}
          key={page.id}
        >
          <ModuleEditButton moduleId={`${selectedProjectId}:${page.id}`} label={`${content.title}·${page.label}`} onOpen={openModuleEditor} />
          <div className="case-slide-no" aria-hidden="true">{String(pageIndex + 2).padStart(2, '0')}</div>
          <header className="case-slide-heading">
            <span {...editableRowProps('eyebrow', '页面标签', page.eyebrow)}>{page.eyebrow}</span>
            <h2 {...editableRowProps('title', '页面标题', page.title)}>{page.title}</h2>
            <p {...editableRowProps('intro', '页面说明', page.intro)}>{page.intro}</p>
          </header>

          {page.flow && (
            <div className="case-flow-rail case-generic-flow" aria-label={`${content.title}${page.label}流程`}>
              {page.flow.map(([id, label], index) => (
                <div className="case-flow-node" key={id}>
                  <small>{id}</small><strong {...editableRowProps(`flow-${index}`, `流程节点${index + 1}`, label)}>{label}</strong>
                  {index < page.flow.length - 1 && <ChevronRight aria-hidden="true" />}
                </div>
              ))}
            </div>
          )}

          <div className="case-decision-list">
            {page.cards?.map(([eyebrow, title, text], cardIndex) => (
              <section key={`${eyebrow}-${title}`}><small {...editableRowProps(`card-${cardIndex}-eyebrow`, `要点${cardIndex + 1}标签`, eyebrow)}>{eyebrow}</small><h3 {...editableRowProps(`card-${cardIndex}-title`, `要点${cardIndex + 1}标题`, title)}>{title}</h3><p {...editableRowProps(`card-${cardIndex}-copy`, `要点${cardIndex + 1}说明`, text)}>{text}</p></section>
            ))}
            {page.metrics && (
              <div className="case-proof-grid case-generic-metrics">
                {page.metrics.map(([value, label], metricIndex) => <div key={label}><CheckCircle2 /><b {...editableRowProps(`metric-${metricIndex}-value`, `${label}数值`, value)}>{value}</b><span {...editableRowProps(`metric-${metricIndex}-label`, `${label}标签`, label)}>{label}</span></div>)}
              </div>
            )}
            {page.id === 'proof' && (
              <button type="button" className="case-primary-action case-proof-action" onClick={() => onPlay(project)}><Play fill="currentColor" />查看完整实机演示</button>
            )}
          </div>

          <div className={page.evidence.length > 1 ? 'case-evidence-pair case-generic-evidence' : 'case-generic-evidence'}>
            {page.evidence.map((evidence, evidenceIndex) => (
              <EvidenceFrame
                src={evidence.src}
                alt={`${content.title}：${evidence.caption}`}
                caption={evidence.caption}
                onOpen={onOpenImage}
                editorRow={`evidence-${evidenceIndex}`}
                editorLabel={`图片说明${evidenceIndex + 1}`}
                key={evidence.src}
              />
            ))}
            <CaseDocumentLink
              href={caseDocumentLinks[selectedProjectId]?.[page.id] || project.links[0].href}
              label={selectedProjectId === 'beijun' ? '查看完整关卡文档' : selectedProjectId === 'tutorial' ? '查看完整引导文档' : '查看完整系统文档'}
            />
          </div>
        </article>
      ))}

      <footer className="case-next-project">
        <div><span>NEXT CASE</span><h2>{nextProject.title}</h2><p>{nextProject.subtitle}</p></div>
        <button type="button" onClick={() => selectProject(nextProject.id)}>查看下一案例<ArrowRight /></button>
      </footer>
        </>
      )}
      <PortfolioModuleEditor
        editor={moduleEditor}
        edits={portfolioEdits}
        onChange={updateModuleRow}
        onReset={resetModuleRows}
        onClose={() => setModuleEditor(null)}
      />
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [modalProject, setModalProject] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [isEntering, setIsEntering] = useState(false)
  const [featuredProjectIndex, setFeaturedProjectIndex] = useState(0)
  const [bookOpen, setBookOpen] = useState(false)
  const [bookSection, setBookSection] = useState('profile')
  const [pageTurning, setPageTurning] = useState(false)
  const [profileMusicPlaying, setProfileMusicPlaying] = useState(false)
  const [wechatOpen, setWechatOpen] = useState(false)
  const [heroEditorOpen, setHeroEditorOpen] = useState(false)
  const [heroContent, setHeroContent] = useState(() => {
    try {
      const saved = window.localStorage.getItem('kz-hero-content-v4')
      return saved ? { ...defaultHeroContent, ...JSON.parse(saved) } : defaultHeroContent
    } catch {
      return defaultHeroContent
    }
  })
  const profileAudioRef = useRef(null)

  const featuredProject = projects[featuredProjectIndex]

  useEffect(() => {
    if (!lightbox) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setLightbox(null)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  useEffect(() => {
    window.localStorage.setItem('kz-hero-content-v4', JSON.stringify(heroContent))
  }, [heroContent])

  const updateHeroContent = (key, value) => {
    setHeroContent((current) => ({ ...current, [key]: value }))
  }

  const navigate = (id) => {
    setMenuOpen(false)
    setActiveSection(id)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const moveEntryButton = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    event.currentTarget.style.setProperty('--entry-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--entry-y', `${y * 100}%`)
    event.currentTarget.style.setProperty('--entry-rotate-x', `${(0.5 - y) * 4}deg`)
    event.currentTarget.style.setProperty('--entry-rotate-y', `${(x - 0.5) * 5}deg`)
  }

  const resetEntryButton = (event) => {
    event.currentTarget.style.setProperty('--entry-rotate-x', '0deg')
    event.currentTarget.style.setProperty('--entry-rotate-y', '0deg')
  }

  const navigateWithComicWipe = (id) => navigate(id)

  const startExplore = () => navigateWithComicWipe('works')

  const showNextFeaturedProject = () => {
    setFeaturedProjectIndex((current) => (current + 1) % projects.length)
  }

  const turnBookPage = (section) => {
    if (!bookOpen || pageTurning || bookSection === section) return
    setPageTurning(true)
    window.setTimeout(() => setBookSection(section), 230)
    window.setTimeout(() => setPageTurning(false), 560)
  }

  const showNextBookProject = () => {
    if (pageTurning) return
    setPageTurning(true)
    window.setTimeout(() => {
      setFeaturedProjectIndex((current) => (current + 1) % projects.length)
    }, 230)
    window.setTimeout(() => setPageTurning(false), 560)
  }

  const closeBook = () => {
    setBookOpen(false)
    window.setTimeout(() => setBookSection('profile'), 500)
  }

  const moveCollageCharacter = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    event.currentTarget.style.setProperty('--character-parallax-x', `${x * 9}px`)
    event.currentTarget.style.setProperty('--character-parallax-y', `${y * 7}px`)
  }

  const resetCollageCharacter = (event) => {
    event.currentTarget.style.setProperty('--character-parallax-x', '0px')
    event.currentTarget.style.setProperty('--character-parallax-y', '0px')
  }

  const toggleProfileMusic = async () => {
    const audio = profileAudioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
        setProfileMusicPlaying(true)
      } catch {
        setProfileMusicPlaying(false)
      }
    } else {
      audio.pause()
      setProfileMusicPlaying(false)
    }
  }

  return (
    <div className={`site-shell page-${activeSection}${isEntering ? ' is-entering' : ''}`}>
      <header className="top-nav liquid-nav">
        <button type="button" className="brand" onClick={() => navigate('top')} aria-label="返回首页">
          <span>KZ</span><b>孔泽轩</b><i>System Designer</i>
        </button>
        <nav aria-label="主导航" className={menuOpen ? 'open' : ''}>
          {navItems.map((item) => (
            <button type="button" key={item.id} className={activeSection === item.id ? 'active' : ''} aria-current={activeSection === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button type="button" className={`contact-nav ${activeSection === 'contact' ? 'active' : ''}`} aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={() => navigate('contact')}>联系我 <ArrowUpRight /></button>
        <button type="button" className="menu-toggle icon-button" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {activeSection !== 'top' && (
        <>
          <div className="portfolio-page-paper" aria-hidden="true">
            <div className="portfolio-page-paper-grid" />
            <div className="portfolio-page-paper-glow" />
            <div className="portfolio-page-leaves">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
          </div>
          <header className="portfolio-global-toolbar site-width">
            <button className="home-toolbar-person" type="button" onClick={() => navigate('top')} aria-label="返回孔泽轩的个人主页">
              <span className="home-toolbar-avatar"><img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-cartoon.jpg')} alt="孔泽轩的卡通头像" /></span>
              <span className="home-toolbar-name"><span className="home-toolbar-name-line"><b>孔泽轩</b><strong>求职中</strong></span><small>求职系统策划 · 2027届</small></span>
            </button>
            <nav className="home-toolbar-nav" aria-label="全站快捷入口">
              <button type="button" onClick={() => navigate('top')}><Compass /><span>个人主页</span></button>
              <button className={['works', 'gallery', 'capabilities', 'games', 'lab'].includes(activeSection) ? 'is-active' : ''} type="button" onClick={() => navigate('works')}><Layers3 /><span>作品展示</span></button>
              <a href={assetUrl('/files/kong-zexuan-system-designer-resume.pdf')} download="孔泽轩系统策划简历.pdf"><Download /><span>简历下载</span></a>
              <button className={activeSection === 'contact' ? 'is-active' : ''} type="button" onClick={() => navigate('contact')}><Mail /><span>联系方式</span></button>
            </nav>
            <button className="home-toolbar-logo" type="button" onClick={() => navigate('works')} aria-label="查看山海传说项目作品">
              <img loading="lazy" decoding="async" src={assetUrl('/images/resources/shanhai-rpg-logo.png')} alt="山海传说 RPG" />
            </button>
          </header>
          <div className="portfolio-page-margin-label portfolio-page-margin-label-left" aria-hidden="true"><span>KONG ZEXUAN / SYSTEM DESIGN PORTFOLIO</span></div>
          <div className="portfolio-page-margin-label portfolio-page-margin-label-right" aria-hidden="true"><span>{pageFrameMeta[activeSection]}</span></div>
          <img loading="lazy" decoding="async" className="portfolio-page-seal" src={assetUrl('/images/shanhai-paper-seal.png')} alt="" aria-hidden="true" />
        </>
      )}

      <main>
        <section className="hero book-world-hero legacy-book-hidden" id="voxel-top">
          <div className="voxel-desk-scene">
            <div className="desk-spotlight" aria-hidden="true" />
            <div className="desk-scroll desk-prop" aria-hidden="true"><i /><i /><span>山海志</span></div>
            <div className="desk-notes desk-prop" aria-hidden="true"><i /><b>关卡草图</b><span>入口 → 引导 → 验收</span></div>
            <div className="desk-frame desk-prop" aria-hidden="true"><img loading="lazy" decoding="async" src={assetUrl('/images/render-green.webp')} alt="" /></div>
            <div className="desk-cubes desk-prop" aria-hidden="true"><i /><i /><i /></div>

            <div className={`portfolio-book ${bookOpen ? 'is-open' : 'is-closed'} ${pageTurning ? 'is-turning' : ''}`}>
              <button className="book-cover" type="button" onClick={() => setBookOpen(true)} aria-label="翻开山海系统策划作品集">
                <span className="cover-brass-corner corner-a" aria-hidden="true" />
                <span className="cover-brass-corner corner-b" aria-hidden="true" />
                <span className="cover-brass-corner corner-c" aria-hidden="true" />
                <span className="cover-brass-corner corner-d" aria-hidden="true" />
                <span className="cover-emblem" aria-hidden="true">山</span>
                <span className="cover-kicker">山海</span>
                <h1>系统策划<br /><span>作品集</span></h1>
                <strong>孔泽轩</strong>
                <em>2027</em>
                <span className="cover-open-hint">轻触封面 · 翻开手册</span>
                <span className="cover-bookmark">求职中</span>
              </button>

              <div className="book-spread" aria-hidden={!bookOpen}>
                <div className="book-page book-page-left">
                  {bookSection === 'profile' && (
                    <div className="page-character-profile">
                      <span className="page-chapter">个人页</span>
                      <div className="character-rune" aria-hidden="true" />
                      <img loading="lazy" decoding="async" src={assetUrl('/images/client-hero-character.webp')} alt="山海传说持剑角色" />
                      <strong className="physical-status-stamp">求职中</strong>
                      <p>以规则构建体验<br />用文档推动落地</p>
                    </div>
                  )}

                  {bookSection === 'projects' && (
                    <div className="page-project-visual">
                      <span className="page-chapter">代表项目 · {featuredProject.index}</span>
                      <img loading="lazy" decoding="async" key={featuredProject.id} src={featuredProject.heroImage} alt={`${featuredProject.title}项目视觉`} style={{ objectPosition: featuredProject.heroPosition }} />
                      <div className="bestiary-mark"><b>{featuredProject.index}</b><span>山海项目图鉴</span></div>
                      <div className="book-project-dots" aria-label="选择代表项目">
                        {projects.map((project, index) => (
                          <button key={project.id} type="button" className={featuredProjectIndex === index ? 'active' : ''} onClick={() => {
                            if (featuredProjectIndex === index) return
                            setPageTurning(true)
                            window.setTimeout(() => setFeaturedProjectIndex(index), 230)
                            window.setTimeout(() => setPageTurning(false), 560)
                          }}>{project.index}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookSection === 'capabilities' && (
                    <div className="page-illustrated-index">
                      <span className="page-chapter">策划能力</span>
                      <img loading="lazy" decoding="async" src={assetUrl('/images/render-boss.webp')} alt="山海传说战斗场景" />
                      <div className="index-seal">策</div>
                      <p>从设计意图到验收结果<br />建立可沟通、可配置、可追踪的证据链。</p>
                    </div>
                  )}

                  {bookSection === 'games' && (
                    <div className="page-illustrated-index">
                      <span className="page-chapter">游戏经历</span>
                      <img loading="lazy" decoding="async" src={assetUrl('/images/render-green.webp')} alt="山海传说世界场景" />
                      <div className="index-seal">游</div>
                      <p>以玩家体验建立品类坐标<br />再从系统设计视角拆解规则与反馈。</p>
                    </div>
                  )}

                  {bookSection === 'lab' && (
                    <div className="page-illustrated-index document-illustration">
                      <span className="page-chapter">策划文档</span>
                      <img loading="lazy" decoding="async" src={assetUrl('/images/beijun-poster.webp')} alt="北郡大牢系统策划文档预览" />
                      <div className="index-seal">案</div>
                      <p>策划案、配表、流程图与实机验证<br />均可在网页内继续阅读。</p>
                    </div>
                  )}
                </div>

                <div className="book-gutter" aria-hidden="true" />

                <div className="book-page book-page-right">
                  {bookSection === 'profile' && (
                    <div className="page-profile-copy">
                      <span className="ink-overline">孔泽轩的策划手册</span>
                      <h2>孔泽轩</h2>
                      <h3>游戏系统策划</h3>
                      <p>关注新手引导、系统拆解与数值配置，用清晰文档推动玩法体验落地。</p>
                      <dl>
                        <div><dt>求职方向</dt><dd>系统策划 / 游戏设计师</dd></div>
                        <div><dt>项目方向</dt><dd>MMORPG · 新手引导 · 副本</dd></div>
                        <div><dt>当前状态</dt><dd>2027 届 · 求职中</dd></div>
                      </dl>
                      <button type="button" className="book-primary-action" onClick={() => turnBookPage('projects')}>
                        <span>查看代表项目</span><i aria-hidden="true">→</i>
                      </button>
                    </div>
                  )}

                  {bookSection === 'projects' && (
                    <div className="page-project-copy" key={featuredProject.id}>
                      <span className="ink-overline">项目案例 · {featuredProject.index}</span>
                      <h2>{featuredProject.title}</h2>
                      <p>{featuredProject.subtitle}</p>
                      <ul>{featuredProject.meta.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
                      <blockquote>{featuredProject.value}</blockquote>
                      <div className="book-project-actions">
                        <button type="button" className="book-primary-action" onClick={() => setModalProject(featuredProject)}><span>查看完整项目</span><i aria-hidden="true">↗</i></button>
                        <button type="button" className="book-next-action" onClick={showNextBookProject}>下一项目 {String((featuredProjectIndex + 2) > projects.length ? 1 : featuredProjectIndex + 2).padStart(2, '0')} →</button>
                      </div>
                    </div>
                  )}

                  {bookSection === 'capabilities' && (
                    <div className="page-list-copy">
                      <span className="ink-overline">能力目录</span>
                      <h2>把体验拆成<br />能落地的系统。</h2>
                      <ol>
                        <li><b>系统结构化</b><span>规则、状态、异常流程与交互闭环</span></li>
                        <li><b>文档与配置</b><span>策划案、流程图、配表与原型 Demo</span></li>
                        <li><b>验收与调优</b><span>跨职能跟进、测试验证与反馈迭代</span></li>
                      </ol>
                    </div>
                  )}

                  {bookSection === 'games' && (
                    <div className="page-list-copy">
                      <span className="ink-overline">游戏经历</span>
                      <h2>先作为玩家深入，<br />再作为设计者追问。</h2>
                      <p className="page-note">具体游戏名称、时长、段位与成就将在系统策划版简历补充后录入；当前不虚构尚未核验的信息。</p>
                      <ol>
                        <li><b>MMORPG</b><span>成长、任务、副本与多人协作</span></li>
                        <li><b>开放世界</b><span>探索动机、路径引导与反馈密度</span></li>
                        <li><b>动作体验</b><span>技能反馈、战斗节奏与关卡机制</span></li>
                      </ol>
                    </div>
                  )}

                  {bookSection === 'lab' && (
                    <div className="page-list-copy">
                      <span className="ink-overline">策划文档</span>
                      <h2>让附件变成<br />可以探索的项目界面。</h2>
                      <ol>
                        <li><b>系统策划案</b><span>设计目的、规则拆解与异常流程</span></li>
                        <li><b>配置与数据</b><span>Excel 配表与运营数据的交互预览</span></li>
                        <li><b>验证材料</b><span>实机演示、截图与测试结论</span></li>
                      </ol>
                      <button type="button" className="book-text-link" onClick={() => navigate('lab')}>进入文档工坊 →</button>
                    </div>
                  )}
                </div>

                <div className="page-turn-sheet" aria-hidden="true"><i /></div>

                <button className="book-clasp" type="button" onClick={closeBook}>合上手册</button>
              </div>

              <nav className="book-edge-tabs" aria-label="策划手册目录" aria-hidden={!bookOpen}>
                <button type="button" className={bookSection === 'projects' ? 'active' : ''} onClick={() => turnBookPage('projects')}>项目案例</button>
                <button type="button" className={bookSection === 'capabilities' ? 'active' : ''} onClick={() => turnBookPage('capabilities')}>策划能力</button>
                <button type="button" className={bookSection === 'games' ? 'active' : ''} onClick={() => turnBookPage('games')}>游戏经历</button>
                <button type="button" className={bookSection === 'lab' ? 'active' : ''} onClick={() => turnBookPage('lab')}>策划文档</button>
              </nav>
            </div>
          </div>
        </section>

        <section className="hero magazine-cover-hero legacy-magazine-hidden" id="magazine-top">
          <div className="magazine-cover-system site-width" onPointerMove={moveCollageCharacter} onPointerLeave={resetCollageCharacter}>
            <header className="magazine-title-bar">
              <div className="magazine-nameplate">
                <span className="magazine-monogram">KZ</span>
                <div><b>孔泽轩</b><small>游戏系统策划作品集</small></div>
              </div>
              <div className="magazine-status"><i />2027 届 · 求职中</div>
            </header>

            <div className="magazine-cover-body">
              <nav className="magazine-section-index" aria-label="作品集栏目">
                <button type="button" className="active" onClick={() => navigateWithComicWipe('works')}><span>01</span><b>项目作品</b></button>
                <button type="button" onClick={() => navigateWithComicWipe('capabilities')}><span>02</span><b>策划能力</b></button>
                <button type="button" onClick={() => navigateWithComicWipe('games')}><span>03</span><b>游戏经历</b></button>
                <button type="button" onClick={() => navigateWithComicWipe('lab')}><span>04</span><b>策划文档</b></button>
              </nav>

              <article className="magazine-main-visual" aria-live="polite">
                <div key={featuredProject.id} className="magazine-poster-media">
                  <img loading="lazy" decoding="async" src={featuredProject.heroImage} alt={`${featuredProject.title}代表项目主视觉`} style={{ objectPosition: featuredProject.heroPosition }} />
                  <div className="magazine-duotone" aria-hidden="true" />
                  <div className="magazine-halftone" aria-hidden="true" />
                </div>

                <div className="magazine-speed-lines" aria-hidden="true"><i /><i /><i /><i /></div>
                <div className="magazine-mountain-mark" aria-hidden="true"><i /><i /><i /></div>
                <div className="magazine-pixel-mark" aria-hidden="true"><i /><i /><i /><i /></div>

                <div key={`${featuredProject.id}-title`} className="magazine-project-title">
                  <span>代表项目 · {featuredProject.index}</span>
                  <h1>{featuredProject.title}</h1>
                  <p>{featuredProject.eyebrow}</p>
                </div>

                <img loading="lazy" decoding="async" className="magazine-foreground-character" src={assetUrl('/images/client-hero-character.webp')} alt="山海传说持剑角色" />

                <footer className="magazine-identity-strip">
                  <div><span>求职方向</span><h2>游戏系统策划</h2></div>
                  <p>关注新手引导、系统拆解与数值配置，<br />用清晰文档推动玩法体验落地。</p>
                  <button type="button" onClick={() => setModalProject(featuredProject)}>查看代表项目 <ArrowRight /></button>
                </footer>
              </article>

              <aside className="magazine-project-panels" aria-label="代表项目切换">
                <span className="panels-label">代表项目 / 03</span>
                {projects.map((project, index) => (
                  <button
                    type="button"
                    key={project.id}
                    className={featuredProjectIndex === index ? 'active' : ''}
                    aria-pressed={featuredProjectIndex === index}
                    onMouseEnter={() => setFeaturedProjectIndex(index)}
                    onFocus={() => setFeaturedProjectIndex(index)}
                    onClick={() => setFeaturedProjectIndex(index)}
                  >
                    <img loading="lazy" decoding="async" src={project.heroImage} alt="" />
                    <span>{project.index}</span>
                    <b>{project.title}</b>
                  </button>
                ))}
              </aside>
            </div>

            <div className="magazine-cover-folio" aria-hidden="true"><b>山海</b><span>系统策划 · 作品卷</span><i>VOL. 01</i></div>
          </div>
        </section>

        <section className="hero bright-game-hero bento-comic-home" id="top">
          <div className="anime-backdrop-motion" aria-hidden="true">
            <div className="paper-surface-texture" />
            <div className="pastel-circle-accents"><i /><i /><i /><i /><i /></div>
            <div className="bottom-paper-fog" />
            <div className="shanhai-collage-silhouette" />
            <div className="white-dot-accents">
              {Array.from({ length: 30 }, (_, index) => <i key={index} />)}
            </div>
            <div className="gold-leaf-accents">
              {Array.from({ length: 36 }, (_, index) => <i key={index} />)}
            </div>
          </div>
          <div className="home-section-band home-section-band-capability" aria-hidden="true" />
          <div className="home-section-band home-section-band-project" aria-hidden="true" />
          <div className="home-margin-label home-margin-label-left" aria-hidden="true"><span>KONG ZEXUAN / SYSTEM DESIGN PORTFOLIO</span></div>
          <div className="home-margin-label home-margin-label-right" aria-hidden="true"><span>FEATURED PROJECT / 01</span></div>
          <img loading="lazy" decoding="async" className="home-margin-seal" src={assetUrl('/images/shanhai-paper-seal.png')} alt="" aria-hidden="true" />
          <div className="bento-comic-shell site-width">
              <header className="home-personal-toolbar">
                <button className="home-toolbar-person" type="button" onClick={() => navigateWithComicWipe('top')} aria-label="返回孔泽轩的个人主页">
                  <span className="home-toolbar-avatar"><img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-cartoon.jpg')} alt="孔泽轩的卡通头像" /></span>
                  <span className="home-toolbar-name"><span className="home-toolbar-name-line"><b>孔泽轩</b><strong>求职中</strong></span><small>求职系统策划 · 2027届</small></span>
                </button>
                <nav className="home-toolbar-nav" aria-label="首页快捷入口">
                  <button className="is-active" type="button" onClick={() => navigateWithComicWipe('top')}><Compass /><span>个人主页</span></button>
                  <button type="button" onClick={startExplore}><Layers3 /><span>作品展示</span></button>
                  <a href={assetUrl('/files/kong-zexuan-system-designer-resume.pdf')} download="孔泽轩系统策划简历.pdf"><Download /><span>简历下载</span></a>
                  <button type="button" onClick={() => navigateWithComicWipe('contact')}><Mail /><span>联系方式</span></button>
                </nav>
                <button className="home-toolbar-logo" type="button" onClick={startExplore} aria-label="查看山海传说项目作品">
                  <img loading="lazy" decoding="async" src={assetUrl('/images/resources/shanhai-rpg-logo.png')} alt="山海传说 RPG" />
                </button>
              </header>

            <div className="home-cover-board">
              <div className="bento-intro-grid">
                <article className="bento-character-card">
                  <div
                    className={`bento-character-copy align-${heroContent.align} width-${heroContent.width} vertical-${heroContent.vertical}`}
                    style={{
                      '--hero-eyebrow-size': `${(15.2 * (Number(heroContent.fontScale) || 1.15)).toFixed(1)}px`,
                      '--hero-summary-size': `${(14.2 * (Number(heroContent.fontScale) || 1.15)).toFixed(1)}px`,
                      '--hero-summary-label-size': `${(13.7 * (Number(heroContent.fontScale) || 1.15)).toFixed(1)}px`,
                    }}
                  >
                    <span>{heroContent.eyebrow}</span>
                    <h1>{heroContent.title}</h1>
                    <div className="bento-self-summary">
                      <p><b>策划能力</b><em>{heroContent.capability}</em></p>
                      <p><b>协作交付</b><em>{heroContent.stack}</em></p>
                      <p><b>工具验证</b><em className="hero-tool-proof">{renderToolProof(heroContent.project)}</em></p>
                    </div>
                  </div>
                  <button className="hero-explore-button" type="button" onClick={startExplore}>
                    <span><b>开始探索</b><small>查看项目完整作品集</small></span><ArrowRight />
                  </button>
                  <img loading="lazy" decoding="async" className="bento-card-character" src={assetUrl('/images/client-hero-character.webp')} alt="山海传说持剑角色" />
                  <button className="bento-hero-editor-toggle" type="button" onClick={() => setHeroEditorOpen(true)} aria-label="编辑首页主视觉文案" title="编辑首页主视觉文案"><Settings2 /><span>编辑内容</span></button>
                </article>
              </div>

              <section className="home-portfolio-overview" aria-label="作品集概览">
                <article className="overview-info-card overview-project-contribution">
                  <header className="overview-project-identity">
                    <img loading="lazy" decoding="async" src={assetUrl('/images/shanhai-vertical-logo.png')} alt="" />
                    <div><b>山海传说</b><span>原创 UGC 商业项目 · 国风神话题材 · MMORPG · 开放世界</span></div>
                  </header>
                  <h2>项目背景与个人贡献</h2>
                  <div className="overview-contribution-copy">
                    <p><b>项目背景</b><span>在校期间与4名线上成员组成5人核心团队，基于网易《我的世界》中国版UGC平台，从0开发并运营国风MMORPG《山海传说》。项目通过官方审核上线；首季流水约50万元，峰值DAU 1098，累计付费1165人次，次留42.9%。</span></p>
                    <p><b>个人贡献</b><span>担任系统策划，负责新手引导、副本、大牢关卡及其他系统的设计、配置与测试；输出策划案、流程图、界面原型和配置表，跟进制作、实机测试与版本调整，积累从0到上线及跨团队推进经验。</span></p>
                  </div>
                  <div className="overview-achievement-list" aria-label="项目成绩">
                    <b>首季流水约50万</b><b>峰值DAU 1098</b><b>次留42.9%</b>
                  </div>
                </article>
                <div className="overview-project-showcase" aria-label="山海传说项目规模与核心玩法">
                  <div className="overview-showcase-visual-row">
                    <figure className="overview-world-poster">
                      <img loading="lazy" decoding="async" src={assetUrl('/images/shanhai-world-banner.webp')} alt="山海传说完整角色阵容宣传图" />
                    </figure>
                    <figure className="overview-render-card">
                      <img loading="lazy" decoding="async" src={assetUrl('/images/featured-render-wer.png')} alt="山海传说赤焰首领战渲染海报" />
                    </figure>
                    <figure className="overview-render-card">
                      <img loading="lazy" decoding="async" src={assetUrl('/images/featured-render-mgzd.png')} alt="山海传说七星连珠渲染海报" />
                    </figure>
                  </div>
                  <div className="overview-gameplay-strip" aria-label="五项核心玩法">
                    {shanhaiGameplayShowcase.map((item) => (
                      <figure key={item.src}><img loading="lazy" decoding="async" src={item.src} alt={`山海传说核心玩法：${item.label}`} /></figure>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {heroEditorOpen && (
              <aside className="bento-hero-editor" role="dialog" aria-modal="true" aria-label="蓝色主框编辑器">
                <header><div><span>LIVE EDITOR</span><h2>编辑蓝色主框</h2></div><button type="button" onClick={() => setHeroEditorOpen(false)} aria-label="关闭编辑器"><X /></button></header>
                <label><span>顶部标签</span><input value={heroContent.eyebrow} onChange={(event) => updateHeroContent('eyebrow', event.target.value)} /></label>
                <label><span>主标题</span><textarea rows="3" value={heroContent.title} onChange={(event) => updateHeroContent('title', event.target.value)} /></label>
                <label><span>策划能力</span><input value={heroContent.capability} onChange={(event) => updateHeroContent('capability', event.target.value)} /></label>
                <label><span>协作交付</span><input value={heroContent.stack} onChange={(event) => updateHeroContent('stack', event.target.value)} /></label>
                <label><span>工具与验证</span><textarea rows="2" value={heroContent.project} onChange={(event) => updateHeroContent('project', event.target.value)} /></label>
                <div className="bento-editor-layout-row">
                  <label><span>文字对齐</span><select value={heroContent.align} onChange={(event) => updateHeroContent('align', event.target.value)}><option value="left">左对齐</option><option value="center">居中</option></select></label>
                  <label><span>内容宽度</span><select value={heroContent.width} onChange={(event) => updateHeroContent('width', event.target.value)}><option value="compact">紧凑</option><option value="standard">标准</option><option value="wide">加宽</option></select></label>
                  <label><span>垂直位置</span><select value={heroContent.vertical} onChange={(event) => updateHeroContent('vertical', event.target.value)}><option value="top">靠上</option><option value="center">居中</option><option value="bottom">靠下</option></select></label>
                </div>
                <label className="bento-editor-font-control">
                  <span>标签与能力说明字号 <output>{Math.round((Number(heroContent.fontScale) || 1.15) * 100)}%</output></span>
                  <input
                    type="range"
                    min="0.9"
                    max="1.35"
                    step="0.05"
                    value={heroContent.fontScale ?? 1.15}
                    onChange={(event) => updateHeroContent('fontScale', Number(event.target.value))}
                  />
                </label>
                <footer><button type="button" onClick={() => setHeroContent(defaultHeroContent)}><RotateCcw />恢复默认</button><button type="button" className="primary" onClick={() => setHeroEditorOpen(false)}>完成</button></footer>
              </aside>
            )}

            <div className="bento-lower-grid">
              <article className="bento-about-card">
                <span>ABOUT ME</span>
                <h2>把玩家第一次接触系统的<br />每一步，都设计得清楚而有趣。</h2>
                <p>系统策划求职 · 杭州 / 上海 / 广州</p>
              </article>

              <button className="bento-portrait-tile bento-portrait-pink" type="button" onClick={() => navigateWithComicWipe('top')}>
                <img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-cartoon.jpg')} alt="孔泽轩的卡通头像" />
                <span>个人主页</span>
              </button>

              <button className="bento-portrait-tile bento-portrait-male" type="button" onClick={() => navigateWithComicWipe('games')}>
                <img loading="lazy" decoding="async" src={assetUrl('/images/q-avatar-male-bust.png')} alt="白发持剑男性角色头像" />
                <span>游戏经历</span>
              </button>

              <article className="bento-info-tile bento-role-tile">
                <strong>系统策划</strong>
                <span>目标岗位</span>
                <i>01</i>
              </article>

              <article className="bento-info-tile bento-status-tile">
                <strong>2027届</strong>
                <span>当前求职中</span>
              </article>

              <button className="bento-project-tile" type="button" onClick={() => setModalProject(featuredProject)}>
                <img loading="lazy" decoding="async" key={featuredProject.id} src={featuredProject.heroImage} alt={`${featuredProject.title}代表项目缩略图`} style={{ objectPosition: featuredProject.heroPosition }} />
                <span>代表项目</span>
              </button>

              <button className="bento-more-card" type="button" onClick={() => navigateWithComicWipe('works')}>
                <span>查看更多<br />作品</span><ArrowRight />
              </button>
            </div>

            <footer className="bento-contact-dock">
              <div className="bento-party-avatars" aria-label="山海角色小队">
                <img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-cartoon.jpg')} alt="" />
                <img loading="lazy" decoding="async" src={assetUrl('/images/q-avatar-male-bust.png')} alt="" />
                <img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-comic.webp')} alt="" />
                <span>组队中</span>
              </div>
              <div className="bento-contact-actions" aria-label="联系入口">
                <button type="button" aria-label="邮箱" onClick={() => navigateWithComicWipe('contact')}>✉</button>
                <button type="button" aria-label="电话" onClick={() => navigateWithComicWipe('contact')}>☎</button>
                <button type="button" aria-label="微信" onClick={() => navigateWithComicWipe('contact')}>微</button>
                <button type="button" aria-label="查看更多联系信息" onClick={() => navigateWithComicWipe('contact')}>•••</button>
              </div>
              <span className="bento-dock-sign">KONG ZEXUAN · SYSTEM DESIGN</span>
            </footer>
          </div>
        </section>

        <section className="works-section section-pad" id="works">
          <div className="site-width">
            <PortfolioCaseStudy isActive={activeSection === 'works'} onPlay={setModalProject} onOpenImage={setLightbox} />
          </div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="site-width gallery-page-inner">
            <div className="game-page-heading">
              <span>VISUAL ARCHIVE · 02</span>
              <h2>游戏画廊</h2>
              <p>来自《山海传说》的真实角色、Boss 与场景渲染，呈现项目世界的视觉气质。</p>
            </div>
            <div className="game-gallery-grid">
              {gallery.map((item, index) => (
                <button type="button" className="game-gallery-card" key={`${item.src}-${index}`} onClick={() => setLightbox(item)}>
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span><small>0{index + 1}</small>{item.label}<ArrowUpRight aria-hidden="true" /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="capability-section section-pad" id="capabilities">
          <div className="site-width">
            <div className="section-heading horizontal-heading">
              <div><span className="section-no">03</span><span className="micro-label">JD MATCH</span></div>
              <h2>岗位需要的能力，<br />落在每一次<span>可交付</span>里。</h2>
            </div>
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, text, tags }, index) => (
                <article className="capability-card liquid-card" key={title}>
                  <div className="capability-icon"><Icon aria-hidden="true" /></div>
                  <span className="card-order">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="jd-strip liquid-card">
              <span>匹配关键词</span>
              <div>
                <b>玩法功能设计</b><i />
                <b>界面与操作</b><i />
                <b>关卡 / 副本</b><i />
                <b>跨团队推进</b><i />
                <b>测试与调优</b><i />
                <b>AI 辅助 Demo</b>
              </div>
            </div>
          </div>
        </section>

        <section className="games-section section-pad" id="games">
          <div className="site-width">
            <div className="section-heading game-heading">
              <div><span className="section-no">04</span><span className="micro-label">GAME EXPERIENCE</span></div>
              <h2>先建立品类坐标，<br />再用<span>真实时长与成就</span>完成最终版本。</h2>
              <p>首版保留可核验的品类结构；具体游戏时长、段位和成就将在你补充系统策划简历后录入。</p>
            </div>
            <div className="genre-list">
              {gameGenres.map((genre) => (
                <article className={`genre-card accent-${genre.accent}`} key={genre.order}>
                  <span>{genre.order}</span>
                  <div><small>{genre.title}</small><h3>{genre.game}</h3></div>
                  <p>{genre.note}</p>
                  <ArrowUpRight aria-hidden="true" />
                </article>
              ))}
            </div>
            <div className="verification-note"><Gamepad2 aria-hidden="true" /><span><b>信息边界：</b>不虚构游戏时长与排名。网站已准备好承接最终游戏清单、时长、赛季成就和可面试追问的设计观察。</span></div>
          </div>
        </section>

        <section className="lab-section section-pad" id="lab">
          <div className="site-width">
            <div className="section-heading lab-heading">
              <div><span className="section-no">05</span><span className="micro-label">INTERACTIVE DOCUMENTS</span></div>
              <h2>让 Word 与 Excel<br />不再只是附件，而是<span>可探索的项目界面。</span></h2>
              <p>点击切换策划流程、配置表与运营数据。后续可继续把更多工作簿页面转为响应式网页视图。</p>
            </div>
            <DocumentStudio />
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-aurora" aria-hidden="true" />
          <div className="site-width contact-inner">
            <div className="contact-top"><span>KZX · 2027</span><span>GAME SYSTEM DESIGN</span></div>
            <div className="contact-main">
              <section className="contact-self-card" aria-labelledby="contact-self-title">
                <div className="contact-self-copy">
                  <span className="contact-self-kicker">SELF REVIEW · 自我评价</span>
                  <h3 id="contact-self-title">理解游戏，也把想法推进到落地。</h3>
                  <div className="contact-self-points">
                    <p><strong>游戏理解</strong><span>热爱游戏，习惯从玩家与策划角度分析玩法、系统与关卡。</span></p>
                    <p><strong>协作落地</strong><span>有5人线上创业项目经验，能将想法落地成文档、流程图、原型和配置表并跟进实现。</span></p>
                  </div>
                </div>
                <figure className="contact-self-avatar">
                  <img loading="lazy" decoding="async" src={assetUrl('/images/profile-avatar-cartoon.jpg')} alt="孔泽轩的个人头像" />
                </figure>
              </section>
              <div className="contact-methods" aria-label="联系方式">
                <a className="contact-method-card" href="tel:15110397617">
                  <span className="contact-method-icon"><Phone aria-hidden="true" /></span>
                  <span className="contact-method-copy">
                    <small>PHONE · 手机</small>
                    <strong>151 1039 7617</strong>
                  </span>
                  <ArrowUpRight className="contact-method-arrow" aria-hidden="true" />
                </a>
                <article className="contact-method-card">
                  <span className="contact-method-icon"><Mail aria-hidden="true" /></span>
                  <span className="contact-method-copy">
                    <small>EMAIL · 邮箱</small>
                    <strong>3410279745@qq.com</strong>
                  </span>
                </article>
                <article className="contact-method-card contact-wechat-card">
                  <span className="contact-wechat-copy">
                    <small>WECHAT · 微信</small>
                    <strong>扫码添加微信</strong>
                    <em>备注来意，方便及时回复</em>
                  </span>
                  <span className="contact-wechat-visual">
                    <span className="contact-wechat-profile" aria-hidden="true">
                      <img loading="lazy" decoding="async" src={assetUrl('/images/contact-wechat-qr.jpg')} alt="" />
                    </span>
                    <span className="contact-wechat-qr">
                      <img loading="lazy" decoding="async" src={assetUrl('/images/contact-wechat-qr.jpg')} alt="孔泽轩的微信二维码" />
                    </span>
                  </span>
                </article>
              </div>
            </div>
            <div className="contact-footer">
              <span>孔泽轩 · 系统策划作品集</span>
              <button type="button" onClick={() => navigate('top')}>BACK TO TOP <ArrowUpRight /></button>
            </div>
          </div>
        </section>
      </main>

      <VideoModal project={modalProject} onClose={() => setModalProject(null)} />
      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onMouseDown={() => setLightbox(null)}>
          <button type="button" className="icon-button" onClick={() => setLightbox(null)} aria-label="关闭图片"><X /></button>
          <img loading="lazy" decoding="async" src={lightbox.src} alt={lightbox.alt} onMouseDown={(event) => event.stopPropagation()} />
          <span>{lightbox.label}</span>
        </div>
      )}
      <div className="cursor-note" aria-hidden="true"><MousePointer2 /> Explore</div>
    </div>
  )
}

export default App
