(() => {
  'use strict';
  const projects = window.PORTFOLIO_PROJECTS;
  const grid = document.getElementById('project-grid');
  const featured = document.getElementById('featured-project');
  const count = document.getElementById('work-count');
  const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const external = url => /^https:\/\//.test(url) ? ' target="_blank" rel="noreferrer"' : '';
  const status = p => `<span class="project-status ${safe(p.state)}"><span class="status-dot" aria-hidden="true"></span>${safe(p.status)}</span>`;
  const tags = p => `<div class="project-tags">${p.tags.map(t => `<span>${safe(t)}</span>`).join('')}</div>`;
  document.querySelectorAll('[data-filter]').forEach(button => {
    const total = projects.filter(p => button.dataset.filter === 'all' || p.category === button.dataset.filter).length;
    button.querySelector('span').textContent = String(total).padStart(2, '0');
  });
  function actions(p) {
    const entry = p.url ? `<a class="${p.featured ? 'button primary' : 'text-link'}" href="${safe(p.url)}"${external(p.url)}>${safe(p.action)} <span aria-hidden="true">↗</span></a>` : '<span class="pending">子站筹备中</span>';
    const repo = p.repo ? `<a class="text-link" href="${safe(p.repo)}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>` : '';
    const pendingVideo = !p.video && !p.film ? '<span class="pending-video">宣传片筹备中</span>' : '';
    return `<div class="project-actions">${entry}${repo}${pendingVideo}</div>`;
  }
  function media(p) {
    const play = p.video || p.film ? `<button type="button" class="play-button" data-play="${safe(p.id)}" aria-label="观看${safe(p.title)}宣传片"${p.film ? ' aria-expanded="false" aria-controls="film-lifesimu"' : ''}><span class="play-icon" aria-hidden="true">▶</span>看宣传片${p.film ? ' · 48 秒' : ''}</button>` : '';
    return `<div class="project-media" id="media-${safe(p.id)}"><img class="project-cover" src="${safe(p.cover)}" alt="${safe(p.alt)}" width="1280" height="720" loading="lazy">${play}${p.concept ? '<span class="media-note">概念封面</span>' : ''}</div>`;
  }
  function render(filter = 'all') {
    pauseMedia();
    const visible = projects.filter(p => filter === 'all' || p.category === filter);
    featured.innerHTML = ''; grid.innerHTML = '';
    visible.forEach(p => {
      if (p.featured) {
        featured.innerHTML = `<article class="featured" id="${safe(p.id)}" aria-labelledby="title-${safe(p.id)}">${media(p)}<div class="featured-copy"><p class="featured-kicker">✳ &nbsp; 正在打磨 · FEATURED PROJECT</p>${status(p)}<h3 id="title-${safe(p.id)}">${safe(p.title)}</h3><p class="english-title">${safe(p.subtitle)}</p><p class="project-description">${safe(p.description)}</p>${tags(p)}${actions(p)}</div></article>`;
      } else {
        const article = document.createElement('article');
        article.className = 'project'; article.id = p.id;
        article.setAttribute('aria-labelledby', `title-${p.id}`);
        article.innerHTML = `${media(p)}<div class="project-heading"><h3 id="title-${safe(p.id)}">${safe(p.title)}${p.subtitle ? `<small>${safe(p.subtitle)}</small>` : ''}</h3>${status(p)}</div><p class="project-description">${safe(p.description)}</p>${tags(p)}${actions(p)}`;
        grid.append(article);
      }
    });
    count.textContent = `${visible.length} 个作品${filter === 'all' ? '，继续生长中' : ''}`;
  }
  function pauseMedia(except) {
    document.querySelectorAll('video').forEach(v => { if (v !== except) v.pause(); });
    document.querySelectorAll('.inline-film').forEach(panel => panel.remove());
    document.querySelectorAll('[aria-controls="film-lifesimu"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    document.querySelectorAll('[data-filter]').forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    render(button.dataset.filter);
  }));
  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-play]');
    if (!button) return;
    const p = projects.find(project => project.id === button.dataset.play);
    if (!p) return;
    if (p.film && button.getAttribute('aria-expanded') === 'true') { pauseMedia(); return; }
    pauseMedia();
    if (p.video) {
      const container = document.getElementById(`media-${p.id}`);
      const video = document.createElement('video');
      video.controls = true; video.playsInline = true; video.preload = 'metadata'; video.poster = p.cover; video.src = p.video;
      video.setAttribute('aria-label', `${p.title}宣传片`);
      container.replaceChildren(video);
      video.addEventListener('error', () => {
        const error = document.createElement('p'); error.className = 'media-error'; error.textContent = '视频暂时无法播放。';
        const link = document.createElement('a'); link.href = p.video; link.textContent = '直接打开视频';
        error.append(link); container.append(error);
      }, {once:true});
      video.focus();
      try { await video.play(); } catch { /* 保留原生控件，允许再次点击。 */ }
    } else if (p.film) {
      button.setAttribute('aria-expanded', 'true');
      const panel = document.createElement('section'); panel.className = 'inline-film'; panel.id = 'film-lifesimu';
      panel.setAttribute('aria-label', '小鸭漫游记宣传片');
      panel.innerHTML = `<div class="film-heading"><span>河畔来信 · ${safe(p.filmNote)}</span><button class="film-close" type="button">收起 ×</button></div><iframe src="${safe(p.film)}" title="小鸭漫游记：河畔来信，48 秒素材演绎短片" allow="fullscreen" allowfullscreen></iframe><a class="film-fallback" href="${safe(p.film)}" target="_blank" rel="noreferrer">在独立页面观看 ↗</a>`;
      button.closest('article').after(panel);
      panel.querySelector('.film-close').addEventListener('click', () => { panel.remove(); button.setAttribute('aria-expanded', 'false'); button.focus(); });
      panel.querySelector('.film-close').focus({preventScroll:true});
      panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
    }
  });
  document.addEventListener('play', event => { if (event.target instanceof HTMLVideoElement) pauseMedia(event.target); }, true);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pauseMedia(); });
  document.getElementById('year').textContent = new Date().getFullYear();
  render();
})();
