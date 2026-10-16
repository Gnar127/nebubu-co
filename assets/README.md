# 素材清单

所有素材为本次用户指定的项目素材，或现有主站素材的优化副本；没有替换原始 nebubu 图片。

| 路径 | 来源 / 用途 |
| --- | --- |
| logo-128.png、logo-full.png | 既有主站品牌图片 |
| nebubu-promo.mp4、nebubu-promo-poster.jpg | Gnar127/nebubu-co，origin/main 92c5ef9；原版宣传片及海报，原样保留 |
| nebubu-mascot.webp | 既有 nebubu-animate/main.png 的缩小压缩副本 |
| projects/city-runner.webp | I:/code/cityhd/build/cover/city-runner-cover.png 的压缩副本 |
| projects/city-runner-trailer.mp4 | I:/code/cityhd/build/cover/city-runner-trailer.mp4，原样复制 |
| projects/lifesimu.webp | J:/life_simu/promo/trailer/.verification/01-cover.png，裁掉播放器外框后压缩 |
| lifesimu/*.png | J:/life_simu/game/GodotProject/assets/town/soft-comic/ 中 background、duck、dog、otter、props 原样复制；只供现有宣传短片使用 |
| projects/pet-online.webp | I:/code/petonline/pet_assets/nebubu/v002/concept/nebubu-cafe-companion.png，已有角色概念图，等比例缩放并留边 |
| projects/invest.svg、diary.svg、asset.svg、api.svg | 本次原创矢量概念封面；生成源为 scripts/create-covers.cjs，不是产品界面截图 |

LifeSimu 网页短片源自 J:/life_simu/promo/trailer/ 的 HTML/CSS/JS；只调整了相对素材目录。它是 48 秒素材演绎，非游戏录屏，含原有浏览器合成配乐。完整素材来源说明保留在原工程的 ART_SOURCE.md。

原始 nebubu-animate/ 目录保留，包含用户本来已有的修改与未提交素材。本次未覆盖这些文件。

## 更新封面

编辑 projects.js 对应路径。正式产品截图可随时替换概念插画，替换后移除 concept 标记并更新图片说明。

assets/ 的现有缓存策略为长缓存，替换已经发布的素材时请使用新文件名并更新引用，避免旧缓存继续显示。视频使用 preload=none 或按点击加载，避免打开首页就下载全部影片。
