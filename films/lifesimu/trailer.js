'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const canvas=$('canvas'), ctx=canvas.getContext('2d'), duration=48;
  const assets={}, assetRoot='../../assets/lifesimu/';
  const chapters=[0,8,16,24,33,41];
  const captions=['有些地方，不用急着成为谁。','认识邻居，也认识他们没说出口的话。','线索不只指向一个篮子，也指向一个人的小习惯。','你的选择，会改变接下来听到的故事。','不必每一顿饭，都有人负责热闹。','小鸭漫游记 · 把日常，过成自己的故事。'];
  const frames={duck:[[149,49,428,688],[798,50,432,687],[1457,46,487,689]],dog:[[146,48,573,638],[798,48,577,638],[1478,48,577,638]],otter:[[79,78,548,634],[719,78,544,635],[1382,73,553,639]],props:[[126,236,533,421],[772,308,630,327],[1489,157,640,480]]};
  const colors={ink:'#29473b',paper:'#f4edda',gold:'#aa7a42',soft:'#73836e'};
  let ready=false, playing=false, time=0, last=0, lastUI=-1, sound=true, reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
  const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
  const lerp=(a,b,t)=>a+(b-a)*t;
  const sceneAt=t=>Math.max(0,chapters.findLastIndex(s=>t>=s));
  function text(value,x,y,size=28,color=colors.ink,align='left',serif=false){ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='top';ctx.font=`${serif?'500':'400'} ${size}px ${serif?'"STSong", "SimSun", serif':'"Microsoft YaHei", "PingFang SC", sans-serif'}`;ctx.fillText(value,x,y);}
  function lines(values,x,y,size=68,gap=96,color=colors.ink,align='left'){values.forEach((v,i)=>text(v,x,y+i*gap,size,color,align,true));}
  function rule(x,y,w=65){ctx.fillStyle=colors.gold;ctx.fillRect(x,y,w,2);}
  function tag(value,x,y){text(value,x,y,17,colors.gold);rule(x,y+36);}
  function rounded(x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.3;ctx.stroke();}}
  function background(zoom=1,dx=0,dy=0){ctx.save();ctx.translate(800+dx,450+dy);ctx.scale(zoom,zoom);ctx.drawImage(assets.background,-800,-450,1600,900);ctx.restore();}
  function wash(strength=.97){const g=ctx.createLinearGradient(0,0,1320,0);g.addColorStop(0,`rgba(246,240,220,${strength})`);g.addColorStop(.43,`rgba(246,240,220,${strength*.93})`);g.addColorStop(1,'rgba(246,240,220,0)');ctx.fillStyle=g;ctx.fillRect(0,0,1600,900);}
  function sprite(name,x,y,height,frame=0,flip=false,bob=0){const r=frames[name][frame], w=r[2]/r[3]*height;ctx.save();ctx.translate(x,y+bob);ctx.scale(flip?-1:1,1);ctx.drawImage(assets[name],...r,-w/2,-height,w,height);ctx.restore();}
  function animal(name,x,y,h,frame=0,flip=false,t=0){ctx.save();ctx.fillStyle='#324b3322';ctx.beginPath();ctx.ellipse(x,y+2,h*.23,h*.035,0,0,Math.PI*2);ctx.fill();ctx.restore();const blink=!reduced&&(t+(name==='dog'?1:2))%4.3>4.15; sprite(name,x,y,h,blink?1:frame,flip,reduced?0:Math.sin(t*1.8)*2);}
  function nameplate(title,detail,x,y){rounded(x-14,y-9,267,97,2,'#f4eddaeb');rule(x,y,40);text(title,x,y+19,28);text(detail,x,y+60,18,colors.soft);}
  function card(title,desc,kind,x,y,angle,selected=false){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.shadowColor='#203a3520';ctx.shadowBlur=20;ctx.shadowOffsetY=12;rounded(-125,-180,250,355,9,selected?'#f5e2b7':'#faf4e7',selected?'#b68d46':'#c2c6ac');ctx.shadowColor='transparent';text('一种回应',-98,-152,15,colors.gold);rule(-98,-117,195);ctx.strokeStyle=colors.ink;ctx.lineWidth=4;ctx.beginPath();if(kind===0){ctx.arc(-4,-48,23,0,Math.PI*2);ctx.moveTo(14,-30);ctx.lineTo(37,-7);}else if(kind===1){ctx.moveTo(-33,-36);ctx.quadraticCurveTo(0,9,34,-37);ctx.moveTo(-17,-48);ctx.lineTo(-14,-18);ctx.moveTo(0,-52);ctx.lineTo(0,-12);ctx.moveTo(18,-46);ctx.lineTo(15,-18);}else{ctx.roundRect(-37,-67,74,48,12);ctx.moveTo(-14,-19);ctx.lineTo(-20,-3);ctx.lineTo(2,-19);}ctx.stroke();text(title,0,32,29,colors.ink,'center',true);text(desc[0],0,92,18,colors.soft,'center');text(desc[1],0,120,18,colors.soft,'center');ctx.restore();}
  function draw(t){
    if(!ready)return;
    const scale=canvas.width/1600;ctx.setTransform(scale,0,0,scale,0,0);
    const s=sceneAt(t), start=chapters[s], end=chapters[s+1]??48, u=clamp((t-start)/(end-start));
    const progress=reduced?.5:smooth(u), f=reduced?0:Math.sin(t*.7);
    ctx.fillStyle=colors.paper;ctx.fillRect(0,0,1600,900);
    background(1.045+progress*.035,-20+progress*20,-4);
    if(s===0){
      animal('duck',lerp(1200,1100,progress),777,325,0,true,t);
      wash();tag('LETTERS FROM RIVERSIDE',120,197);
      lines(['有些地方，','不用急着成为谁。'],120,284,72,111);
      text('沿着河走一走。故事，会慢慢发生。',126,546,23,colors.soft);
      text('小鸭漫游记',126,143,24,colors.ink);
    } else if(s===1){
      wash(.98);tag('01 / MEET THE NEIGHBORS',120,170);
      lines(['认识邻居。','也认识他们','没说出口的话。'],120,256,63,91);
      const quote=u<.53?'“只是顺便，多备了几套餐具。”':'“桌子早就修好了。再等一下。”';
      text(quote,126,604,23,colors.soft);
      animal('dog',1040,700,305,0,false,t);animal('otter',1360,708,326,0,true,t);
      nameplate('阿汪','把邀请说成顺便',934,743);nameplate('陶陶','总有一个“再等一下”',1229,743);
    } else if(s===2){
      background(1.18+progress*.035,-70,25);wash(.93);tag('02 / FOLLOW THE SMALL THINGS',120,161);
      lines(['线索不只指向','一个篮子。'],120,247,69,105);
      text('也指向一个人的小习惯。',125,488,25,colors.soft);
      animal('duck',820+progress*140,783,237,0,false,t);
      sprite('props',1305,688,142);
      ctx.save();ctx.setLineDash([5,12]);ctx.strokeStyle='#856e4280';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(934,690);ctx.bezierCurveTo(1080,760,1150,535,1290,585);ctx.stroke();ctx.restore();
      [[1040,680,'蓝丝带'],[1140,590,'面包屑'],[1320,498,'沙地的拖痕']].forEach(([x,y,label],i)=>{ctx.save();ctx.globalAlpha=reduced?1:smooth(u*3-i*.48);ctx.strokeStyle=colors.gold;ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.stroke();text(String(i+1).padStart(2,'0'),x,y-9,17,colors.ink,'center');rounded(x-83,y-71,166,34,3,'#f4eddaef');text(label,x,y-63,17,colors.ink,'center');ctx.restore();});
    } else if(s===3){
      ctx.fillStyle='#eef0e6ef';ctx.fillRect(0,0,1600,900);tag('03 / CHOOSE HOW TO REACH OUT',120,162);
      lines(['同一张牌，','不同的','靠近方式。'],120,253,70,102);
      text('留心观察。搭把翅膀。或只是，聊聊。',125,633,22,colors.soft);
      const active=Math.min(2,Math.floor(u*3));
      card('留心观察',['看看那些','被忽略的细节。'],0,835,470+(active===0?-25:0),reduced?0:-.075,active===0);
      card('搭把翅膀',['有时边做事，','边聊天更容易。'],1,1110,450+(active===1?-25:0),0,active===1);
      card('聊聊近况',['问一句，再给对方','说完的时间。'],2,1380,475+(active===2?-25:0),reduced?0:.075,active===2);
      text('你的选择，会改变接下来听到的故事。',1110,738,23,colors.ink,'center');
    } else if(s===4){
      wash(.98);tag('04 / ONE POSSIBLE AFTERNOON',120,172);
      lines(['不必每一顿饭，','都有人','负责热闹。'],120,264,69,100);
      text('给沉默留个位置。也给彼此留个位置。',125,635,22,colors.soft);
      animal('dog',1000,640,242,0,false,t);animal('otter',1335,640,266,0,true,t);
      sprite('props',1190,772,150,1);sprite('props',1178,684,95,0);
      animal('duck',994,811,252,0,false,t);
    } else {
      ctx.fillStyle='#f4efdfe8';ctx.fillRect(0,0,1600,900);
      text('一场关于相遇与选择的动物小镇冒险',800,180,20,colors.gold,'center');
      text('小鸭漫游记',800,264,114,colors.ink,'center',true);rule(690,421,220);
      text('河畔来信 · 多出来的座位',800,460,29,colors.ink,'center',true);
      text('把日常，过成自己的故事。',800,528,24,colors.soft,'center');
      animal('dog',636,800,143,0,false,t);animal('duck',810,817,160,2,false,t);animal('otter',985,804,159,0,true,t);
      text('开发中  /  DEVELOPMENT PREVIEW',800,845,15,colors.gold,'center');
    }
    // A light letterpress border ties all shots together; no flashes or black cuts.
    ctx.strokeStyle='#6a7b5438';ctx.lineWidth=1;ctx.strokeRect(35,35,1530,830);
    if(!reduced){const fade=Math.max(1-smooth((t-start)/.65),s<5?1-smooth((end-t)/.6):0);if(t>.01&&fade>0){ctx.fillStyle=`rgba(244,237,218,${fade*.92})`;ctx.fillRect(0,0,1600,900);}}
    syncUI(s);
  }
  function syncUI(s=sceneAt(time)){
    $('seek').value=String(time);$('seek').setAttribute('aria-valuetext',`${Math.floor(time)} 秒，共 48 秒`);
    $('time').textContent=`00:${String(Math.floor(time)).padStart(2,'0')} / 00:48`;
    $('play').textContent=playing?'暂停':time>=duration?'重播':'播放';$('play').setAttribute('aria-label',playing?'暂停宣传片':'播放宣传片');
    if(lastUI!==s){lastUI=s;$('caption').textContent=captions[s];document.querySelectorAll('[data-time]').forEach((b,i)=>b.setAttribute('aria-current',String(i===s)));}
    $('start').hidden=playing||time>0&&time<duration;$('start-label').textContent=time>=duration?'再看一次河畔来信':'播放短片 · 48 秒';
    $('caption').classList.toggle('visible',playing&&s===3);
    $('motion').setAttribute('aria-pressed',String(reduced));$('motion').textContent=reduced?'动效 已减弱':'减弱动效';
  }
  // Original, synthesized score. No recorded music, samples or remote audio.
  let audio=null, master=null, notes=[], lastBeat=-1;
  async function ensureAudio(){if(!sound)return;try{if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=.22;master.connect(audio.destination);}await audio.resume();}catch{sound=false;$('sound').textContent='配乐 不可用';$('sound').setAttribute('aria-pressed','false');$('status').textContent='当前浏览器不能播放配乐，仍可静音观看。';}}
  function stopNotes(){notes.forEach(n=>{try{n.stop();}catch{}});notes=[];lastBeat=-1;}
  function tone(midi,length,volume,type='sine'){if(!audio||!sound||audio.state!=='running')return;const now=audio.currentTime,o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=440*2**((midi-69)/12);g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(volume,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+length);o.connect(g);g.connect(master);o.start();o.stop(now+length+.02);notes.push(o);o.onended=()=>{o.disconnect();g.disconnect();notes=notes.filter(n=>n!==o);};}
  function score(){const beat=Math.floor(time/.625);if(beat===lastBeat)return;lastBeat=beat;const melody=[72,76,79,76,74,71,67,71,69,72,76,79,74,72,67,0];const note=melody[beat%melody.length];if(note)tone(note,1.6,.13);if(beat%4===0){const roots=[48,43,45,41],root=roots[Math.floor(beat/8)%4];tone(root,3,.12,'triangle');tone(root+7,2.8,.055);}}
  function pause(){playing=false;stopNotes();if(audio)audio.suspend().catch(()=>{});draw(time);}
  async function play(){if(!ready)return;if(playing){pause();return;}if(time>=duration)time=0;playing=true;last=performance.now();draw(time);await ensureAudio();if(!playing&&audio)audio.suspend().catch(()=>{});}
  function seek(t){time=clamp(Number(t),0,duration);stopNotes();if(time>=duration)pause();draw(time);}
  function resize(){const rect=canvas.getBoundingClientRect();const width=Math.round(Math.min(1920,Math.max(800,rect.width*Math.min(devicePixelRatio||1,2))));canvas.width=width;canvas.height=Math.round(width*9/16);draw(time);}
  function tick(now){if(playing){time=Math.min(duration,time+Math.min((now-last)/1000,.12));if(time>=duration){pause();$('status').textContent='短片播放结束，可以重播。';}else{draw(time);score();}}last=now;requestAnimationFrame(tick);}
  $('play').addEventListener('click',play);$('start').addEventListener('click',play);
  $('replay').addEventListener('click',()=>{pause();seek(0);play();});
  $('seek').addEventListener('input',e=>seek(e.target.value));
  $('retry').addEventListener('click',()=>location.reload());
  $('sound').addEventListener('click',async()=>{sound=!sound;stopNotes();$('sound').textContent=sound?'配乐 开':'配乐 关';$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'关闭配乐':'开启配乐');if(sound&&playing)await ensureAudio();});
  $('motion').addEventListener('click',()=>{reduced=!reduced;draw(time);});
  $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('film').requestFullscreen();}catch{$('status').textContent='当前浏览器不支持全屏，请使用窗口观看。';}});
  document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'退出全屏':'全屏';resize();});
  document.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>{if(ready)seek(Number(b.dataset.time));}));
  document.addEventListener('keydown',e=>{if(e.target.matches('input,button,a,summary,textarea'))return;if(e.code==='Space'){e.preventDefault();play();}if(e.code==='ArrowRight'){e.preventDefault();seek(time+5);}if(e.code==='ArrowLeft'){e.preventDefault();seek(time-5);}if(e.code==='KeyM')$('sound').click();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause();});
  window.addEventListener('resize',resize);
  Promise.all(['background','duck','dog','otter','props'].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>{assets[name]=img;resolve();};img.onerror=()=>reject(new Error(name));img.src=assetRoot+name+'.png';}))).then(()=>{ready=true;['play','replay','start','seek'].forEach(id=>$(id).disabled=false);resize();$('status').textContent='短片已准备好，点击播放开始。';requestAnimationFrame(tick);}).catch(()=>{$('error').hidden=false;$('start').hidden=true;$('status').textContent='宣传片素材加载失败。';});
})();
