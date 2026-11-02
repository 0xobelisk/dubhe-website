# Dubhe 最小内容真实性核对

仓库：`0xobelisk/dubhe-website`。实际部署基线：`fa2e3ed3368aea78e046221c24d1c0c4e666d249`。工作分支：`codex/yc-minimal-content-review`。核对日期：2026-11-03。

本集处理文案、链接、未经证实数字/背书、审核标签和必要的文字换行。原社区页面、人员姓名、招募表、任务描述、社区渠道及真实基础设施业务保留。没有禁用领奖按钮，没有改登录、钱包、支付、API或游戏逻辑。Atlas独立，不在本仓库范围。

用户“就这样吧”仅表示接受当前待核对处理，不构成对64项身份、职位、资历、金额或规则的逐项真实性确认。

## 修改前后及移除清单

| 位置 | 修改前 | 修改后 |
| --- | --- | --- |
| 首页 Numeron，16语言 | `12K+ Players`、旧testnet入口、Fantasy AI RPG | 删除玩家数字及Players标签，状态为准备外部测试；入口为 `https://numeron.obelisk.build`。 |
| 当前 Numeron 时间信息 | 开工时间和当前验证状态缺少区分 | 开发起点单独写2026年5月；另一个字段说明目前未上线、未开始外部测试，仅游戏和内部充值流程经过测试。没有把内部验证写成2026年5月的里程碑。 |
| 当前作品与旧作品 | 旧Numeron身份容易混用 | 独立段落说明与2025年黑客松是不同游戏，仅沿用IP；不把历史奖项、人数或团队资历归到当前游戏。 |
| 网络统计 | 随机增长的10M交易、50M操作、50K用户、$500K收入及增长率 | 保留卡片/标签，移除模拟计数器和增长率，数值为`—`，说明等待可追溯来源；没有编造替代数字。 |
| 生态与社区聚合数据 | $45M TVL、50K下载、$2.3M成交；100K成员、50活动、20国家 | 未证实聚合数值不展示；项目卡、活动卡及真实社区渠道保留。 |
| 效率/性能 | 80%自动生成、90%成本降低、10x/15x效率、~20ms/<50ms/1s、Unlimited TPS | 保留schema生成、Move工具和Channel业务；移除缺乏公开测量依据的比率/基准；吞吐描述依赖配置和负载。 |
| Gas | zero gas及大号0 | 可选Gas赞助，不承诺所有交易免费。 |
| 团队页 | 六个姓名、未经证实职位/地点/履历及错配社交handle | 六个姓名保留，职位为待确认；未证实履历不公开。原职位/履历/链接留逐项表。社交按钮JSX基线即被注释，本集未启用。 |
| 大使/版主 | 原名单、每人项目数及人数/服务覆盖 | 全部alias、地区/语言/时区、任务与申请表保留；说明姓名/角色核对中。不展示每人1个项目、聚合覆盖人数或24/7服务实绩。 |
| 投资人页 | $500K收入/PMF、10M交易、社区增长、5+年/10+奖项、100%执行成功率、合作背书 | 保留布局、产品业务、联系/Deck入口；未证实数字、生产规模/PMF断言和奖项先撤下，姓名保留，职位待核对。 |
| Grants/Incubation | $100K/$75K/$50K/$25K及$500K/$1M/$2M资金承诺；VC联合孵化 | 原规则、金额和周期完整保存至确认表；公开为历史规则/当前有效性待确认和中性咨询，不当作已批准资金。技术协作、申请流程与业务页面保留。 |
| Grant成果 | Merak/Numeron/Cyferio拨款、TVL、用户数、开发者数、完成率 | 保留项目名称，移除未证实成果；Numeron用当前准备测试状态。 |
| Token/Proposal | 供应量/分配比例；24提案、2.5M国库、87%、156执行 | 数值暂不公开，类别保留并标历史方案待确认；静态提案明确为示例，不能当实时投票/国库数据。 |
| Portal | 960可领、60,000总奖、0已领、14,400总可领及示例日期/地址 | 余额为`—`；界面与地址标示例，不是实付记录。原handleClaim及3个Button JSX与基线一致，没有禁用动作。 |
| Labs | 旧Numeron OS实验室、10 Engineers、旧站 | 当前Numeron游戏卡使用当前官网和当前状态，不带旧人数。研究区旧Numeron OS独立标历史条目/身份待核对，不归入当前游戏技术团队。真实基础设施条目保留。 |
| Footer/SEO | 80%断言、旧origin、缺失og图片、未证实成立年份/非营利身份/资金Offer | Footer说明Obelisk Labs、Dubhe、Dubhe Wallet与当前Numeron关系；原社区链接文件不改。Metadata/JSON-LD移除这些断言并使用当前origin和真实分享图。 |
| 英文Hero | `A open-source` | `An open-source`。 |

`30+ Projects`、`97% Satisfaction`没有在本仓库实际渲染文案中命中；不把其他站的移除成果记到此仓库。未启用的Incubation导师/融资源码示例没有被当作公开实绩或真实性证据，也没有因此删除整个业务。

## 名单和奖励规则

`COMMUNITY-ITEM-REVIEW.md` / `.json` 共64个稳定ID：TEAM、AMB、MOD、INV、AWARD、RULE、OUTCOME、ORG。每项包含原文、角色/规则、实际原网址或“无个人链接”、源码位置、证据缺口和建议。

缺乏依据不等于判定虚假。全部保持待用户确认；恢复职位/资历、奖项、合作背书、资金额度或成果时，需要相应的公开profile/任命资料、主办方与获奖作品、有效规则、批准主体、拨付交易/验收或可追溯测量。Portal的60×960=57,600与示例总奖60,000不一致，不能从硬编码示例反推实际奖励规则。

2025年Sui Overflow第四名只属于2025旧游戏。本集没有把该奖项描述为当前游戏获得。

## 图片与旧品牌

| 文件/引用 | 已见内容 | 处置 |
| --- | --- | --- |
| `public/mediakit/dubhe/png/a.png` | 已目视：黑色Dubhe标志/字样；PNG真实尺寸3821×906 | 复用作分享图，填写真实尺寸；没有生成品牌图或改二进制素材。 |
| `public/logo/light.png` | 白色Dubhe字样、透明底 | 原深色页脚用法保留；分享预览首图用黑字a.png。 |
| `public/mediakit/numeron/logo.png` | 已目视：青底红色像素头像，无12K/奖项文字，是旧形象 | 当前游戏卡不使用；唯一组件引用在基线即注释的CompaniesSection中。原素材保留，不冒充当前游戏新素材。 |
| `components/home/CompaniesSection.tsx` | 原公司/产品logo区 | 基线已disabled，未启用、未删除、未修改。 |
| 原`/og-*.png` | public不存在对应文件 | Metadata和未使用SEOHead默认图改为现有a.png；JSON-LD旧origin同步。 |
| `public/**/*.svg` | 文本搜索未见Crystal/Mir/Bichon/Sabuk/12K/Overflow字串 | 不修改图形。未做全库二进制OCR；纯路径/文本搜索不冒称完整图像审核。 |

## 检查及最终预览

- 独立TypeScript检查通过。
- 最终Next.js16.2.4 webpack production build及内置TypeScript检查通过，21静态页生成成功。
- `node scripts/check-yc-minimal-content.mjs`：检查16语言状态分离、名单/招募外链保留、Portal原按钮/handler不变、无API/钱包/认证逻辑改动、分享图真实尺寸与最后两处24/7、100%成功率残留。
- `git diff --check`通过。
- `node scripts/check-yc-local-http.mjs`：225/225通过（16语言×14类页面及分享图，全部200，无RSC错误、12K残留或旧SEO origin），完整结果在 `YC-HTTP-CHECKS.json`。
- 原全量翻译结构脚本仍失败：基线15个非EN目录也存在schema差异。本集没有新增缺失键，补齐直接影响本轮页面渲染的缺项；没有重写全站翻译以消除既有差异。部分缺译条目保留原EN，仍需翻译复核。

最终Build ID：`m8yZGB4VaK45CWqYtuT6V`。

最终app源指纹：`02398d7d8db2de75dff929975a23d5cfd6ff29772812b26683130989e94b7259`。

本地服务：`http://127.0.0.1:3281/en`、`/zh-TW`，首页生态区为`#ecosystem`。使用原loader和视口动画，需等加载结束并逐区滚动。最终桌面/手机截图和碰撞测量由root统一执行，HTTP成功不等于截图验收完成。

在`apps/web`执行`pnpm start --hostname 127.0.0.1 --port 3281`可重启。依赖按原锁文件，以既有node_modules junction复用；没有改锁文件。

本分工没有git add/commit/push/merge/deploy。用户后续已授权root统一发布三站当前最小版，Atlas仍独立不发布。

## 修改文件清单

59个app源文件：

- 页面：`apps/web/app/[locale]/{ambassador,channel,engine,events,grants,incubation,labs,moderators,portal,proposal,team,token}/page.tsx`。
- 根SEO：`apps/web/app/[locale]/layout.tsx`。
- 子页SEO：`apps/web/app/[locale]/{ambassador,channel,contact,engine,events,foundation,grants,incubation,investor,labs,moderators,os,portal,privacy,proposal,terms,token,wallet}/layout.tsx`。
- `apps/web/components/ecosystem.tsx`。
- `apps/web/components/network-stats.tsx`。
- `apps/web/components/seo-head.tsx`。
- 新增`apps/web/components/content-review-notice.tsx`。
- `apps/web/components/home/FeaturesSection.tsx`。
- `apps/web/components/investor/{ecosystem-partners,investment-opportunity,investor-hero,problem-solution,product-suite,team-execution,traction-metrics}.tsx`。
- `apps/web/messages/{bn,en,fr,ha,hi,id,ja,ko,pt,ru,th,tr,uk,ur,vi,zh-TW}.json`。

新增审核和检查交付：

- `COMMUNITY-ITEM-REVIEW.md` / `.json`。
- `YC-MINIMAL-REVIEW.md`。
- `YC-HTTP-CHECKS.json`。
- `scripts/check-yc-minimal-content.mjs`。
- `scripts/check-yc-local-http.mjs`。

逐行完整修改前后由该分支相对部署基线的Git diff提供。原布局和全部路由仍在，最小集没有带入旧包中的Portal禁用、社区删除、登录/钱包/支付改动或无关重构。
