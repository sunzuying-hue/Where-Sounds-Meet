const sounds = [
  { id:'call', name:'打电话', category:'voice', categoryName:'人声', color:'#E3C27C', x:73, y:88, positions:{ single:[19.47,59.44], mix:[18.29,58.32] }, file:'打电话.wav', illustration:'assets/illustrations/call.mp4', note:'走到葑门横街的尾端，街道慢慢接向公园和马路。一个大哥一手拎着菜一手在给家里打电话。电话里的内容听不完整，人声只是短暂地从街道里浮出来，又重新混回周围的声音。' },
  { id:'pest', name:'粘鼠板 / 蟑螂药', category:'voice', categoryName:'人声', color:'#E3C27C', x:26, y:95, positions:{ single:[12.43,15.93], mix:[11.59,15.17] }, file:'粘鼠板蟑螂药(1).wav', illustration:'assets/illustrations/pest.png', note:'街上的叫卖并不总是在介绍眼前能看见的东西。“粘鼠板、蟑螂药”这样直接的声音反复穿过街道，在谈话、脚步和摊贩之间出现。走远以后，摊位已经看不清了，声音却还留在后面。' },
  { id:'chestnut', name:'叫卖栗子', category:'voice', categoryName:'人声', color:'#E3C27C', x:57, y:47, positions:{ single:[62.96,44.07], mix:[62.07,43.14] }, file:'叫卖栗子.wav', illustration:'assets/illustrations/chestnut.png', note:'有时候，是先听见声音，才开始寻找它从哪里来。叫卖声从人群和店铺之间穿出来，一遍又一遍。它不像背景里的交谈那么模糊，而是在嘈杂的街道中留下一个很明确的位置。' },
  { id:'cart', name:'拖车', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:49, y:75, positions:{ single:[33.45,39.07], mix:[32.80,38.39] }, file:'拖车.wav', illustration:'assets/illustrations/cart.png', note:'葑门横街靠近出口的地方，人不断从街里向外走。阿姨们拉着小推车从身边经过，轮子压过不同的地面，发出连续又不完全相同的摩擦和震动。它很普通，却几乎一直伴随着这一段路。' },
  { id:'sweep', name:'扫地', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:34, y:26, positions:{ single:[85.90,23.89], mix:[85.98,23.22] }, file:'扫地.wav', illustration:'assets/illustrations/sweep.png', note:'扫帚擦过地面的声音很轻，轻到走路时很容易忽略。真正停下来以后，才会发现它有自己的节奏：靠近、划过、停顿，再重新开始。街道并不是一直在“发生事情”，也有人只是在整理眼前的一小块地方。' },
  { id:'fitness', name:'运动器材', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:29, y:18, positions:{ single:[94.98,19.63], mix:[94.88,19.01] }, file:'运动器材.wav', illustration:'assets/illustrations/fitness.png', note:'街道中段忽然宽了很多，一群老人聚在那里聊天。我们原本以为那里正在卖什么，走近才发现，他们只是待在一起。再往出口走，公园里的运动器材发出金属摩擦和碰撞声，人的动作通过机器被留了下来。' },
  { id:'fry', name:'油炸', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:40, y:46, positions:{ single:[64.87,30.37], mix:[64.27,29.80] }, file:'油炸AI降噪.wav', illustration:'assets/illustrations/fry.png', note:'后来街上也不断遇见糕点和熟食店。路过一家卖萝卜丝饼的小店，油锅里金黄的饼翻动伴随着劈里啪啦的优化油炸的油花迸溅，声音没有叫卖那么突出，却让人很容易意识到：这里正在准备可以被吃掉的东西。' },
  { id:'meat', name:'剁肉', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:23, y:56, positions:{ single:[50.06,50.19], mix:[49.27,49.18] }, file:'肉铺 降噪1.0.wav', illustration:'assets/illustrations/meat.png', note:'走进街里以后，声音一下子变得密集。肉铺里不断传来剁肉声，旁边有人卖菜、问价、讨价还价。一下、一下的撞击非常清楚，却又很快被人声覆盖。那一刻很难只听见一种声音。' },
  { id:'oxygen', name:'打氧', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:62, y:59, positions:{ single:[54.60,13.15], mix:[53.90,12.80] }, file:'打氧.wav', illustration:'assets/illustrations/oxygen.png', note:'左拐进入室内菜市场，鱼和虾的摊位集中在一起。氧气机一直工作，细密的气泡声和机器声形成一种持续的底音。顾客和老板对话，我们站在那里看了一会儿，还讨论了一下想不想吃虾。' },
  { id:'salt', name:'敲盐', category:'ambient', categoryName:'环境音', color:'#C57550', x:43, y:55, positions:{ single:[53.64,31.48], mix:[53.05,30.90] }, file:'敲盐(1).wav', illustration:'assets/illustrations/salt.png', note:'一家店铺老板蹲在摊子门口，敲打一块固体食用盐，在一片连续的人声和交通声里，敲击反而显得格外明确。声音短、硬、有间隔，每一次出现都像在复杂的声景里划出一个小小的边界。' }
];

const $ = (selector) => document.querySelector(selector);
const state = { mode:'single', singleAudio:null, singleId:null, mix:new Map(), volumes:new Map(), hasVisitedMix:false };
const nodes = new Map();
const scatterChannels = new Map();
const enteringFrames = new WeakMap();

function restartEnteringAnimation(element){
  const pending=enteringFrames.get(element);
  if(pending){ cancelAnimationFrame(pending.first); cancelAnimationFrame(pending.second); }
  element.classList.remove('is-entering');
  const frames={first:0,second:0};
  frames.first=requestAnimationFrame(()=>{
    frames.second=requestAnimationFrame(()=>{
      element.classList.add('is-entering'); enteringFrames.delete(element);
    });
  });
  enteringFrames.set(element,frames);
}

function cancelScatter(channel){
  const current=scatterChannels.get(channel);
  if(!current) return;
  current.animations.forEach(animation=>animation.cancel());
  current.elements.forEach(element=>{ element.textContent=element.textContent; });
  scatterChannels.delete(channel);
}

function scatterSwap(channel,elements,update){
  cancelScatter(channel);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ update(); return Promise.resolve(); }
  const token=Symbol(channel); const animations=[];
  elements.forEach((element,elementIndex)=>{
    const text=element.textContent;
    element.textContent='';
    [...text].forEach((character,index)=>{
      const span=document.createElement('span');
      span.className='scatter-char'; span.textContent=character;
      element.appendChild(span);
      const angle=((index*137.5)+(elementIndex*47))*Math.PI/180;
      const distance=8+(index%5)*3;
      animations.push(span.animate([
        { opacity:1, transform:'translate3d(0,0,0)', filter:'blur(0)' },
        { opacity:0, transform:`translate3d(${Math.cos(angle)*distance}px,${Math.sin(angle)*distance}px,0)`, filter:'blur(2px)' }
      ],{ duration:1000, easing:'cubic-bezier(.4,0,.2,1)', fill:'forwards' }));
    });
  });
  scatterChannels.set(channel,{token,animations,elements});
  return Promise.all(animations.map(animation=>animation.finished.catch(()=>null))).then(()=>{
    const current=scatterChannels.get(channel);
    if(!current || current.token!==token) return;
    scatterChannels.delete(channel); update();
  });
}

function audioPath(sound){ return `assets/sounds/formal/${encodeURIComponent(sound.file)}`; }
function stopSingle(){
  if(state.singleAudio){ state.singleAudio.pause(); state.singleAudio.currentTime=0; }
  state.singleAudio=null; state.singleId=null;
  nodes.forEach(node=>node.classList.remove('is-playing','is-single-playing'));
}
function stopMix(){
  state.mix.forEach(entry=>{ entry.audio.pause(); entry.audio.currentTime=0; });
  state.mix.clear();
  nodes.forEach(node=>node.classList.remove('is-playing'));
  document.querySelectorAll('.mixer-row').forEach(row=>{ row.classList.remove('is-playing'); row.hidden=true; });
  $('#mixGuide').textContent='选择地图上的声音，开始组合。';
}
function stopAll(){ stopSingle(); stopMix(); }

function buildNodes(){
  sounds.forEach((sound,index)=>{
    const button=document.createElement('button');
    button.type='button'; button.className='sound-node'; button.dataset.id=sound.id; button.dataset.category=sound.category;
    const [x,y]=sound.positions[state.mode];
    button.style.cssText=`left:${x}%;top:${y}%;--node-color:${sound.color}`;
    button.innerHTML='<span class="node-ripple" aria-hidden="true"></span><span class="node-ripple" aria-hidden="true"></span><span class="node-ripple" aria-hidden="true"></span>';
    button.setAttribute('aria-label',`${sound.name}，${sound.categoryName}`);
    button.addEventListener('click',()=> state.mode==='single' ? playSingle(sound,index) : toggleMix(sound));
    $('#nodeLayer').appendChild(button); nodes.set(sound.id,button);
  });
}

function updateNodePositions(mode){
  sounds.forEach(sound=>{
    const [x,y]=sound.positions[mode]; const node=nodes.get(sound.id);
    node.style.left=`${x}%`; node.style.top=`${y}%`;
  });
}

function buildMixer(){
  sounds.forEach(sound=>{
    const row=document.createElement('div'); row.className='mixer-row'; row.dataset.id=sound.id; row.style.setProperty('--row-color',sound.color); row.hidden=true;
    row.innerHTML=`<i class="mixer-mark"></i><button class="mixer-toggle" type="button" aria-label="停止${sound.name}">${sound.name}</button><input class="volume" type="range" min="0" max="1" step="0.01" value="0.65" aria-label="${sound.name}音量">`;
    row.querySelector('.mixer-toggle').addEventListener('click',()=>toggleMix(sound));
    row.querySelector('.volume').addEventListener('input',event=>{
      const volume=Number(event.target.value); state.volumes.set(sound.id,volume);
      const entry=state.mix.get(sound.id); if(entry) entry.audio.volume=volume;
    });
    $('#mixerList').appendChild(row);
  });
}

function playSingle(sound,index){
  stopSingle();
  const audio=new Audio(audioPath(sound)); audio.preload='auto';
  state.singleAudio=audio; state.singleId=sound.id; nodes.get(sound.id).classList.add('is-playing','is-single-playing');
  const copy=$('.field-copy');
  scatterSwap('field',[$('#entryNumber'),$('#fieldCategory'),$('#fieldTitle'),$('#fieldText')],()=>{
    $('#entryNumber').textContent=`Field note ${String(index+1).padStart(2,'0')}`;
    $('#fieldCategory').textContent=sound.categoryName; $('#fieldCategory').style.color=sound.color;
    $('#fieldTitle').textContent=sound.name;
    $('#fieldText').textContent=sound.note;
    const illustration=$('#fieldIllustration');
    illustration.classList.add('has-media');
    illustration.innerHTML=sound.illustration.endsWith('.mp4')
      ? `<video src="${sound.illustration}" autoplay loop muted playsinline preload="metadata"></video>`
      : `<img src="${sound.illustration}" alt="" draggable="false">`;
    illustration.style.background=`color-mix(in srgb, ${sound.color} 18%, #f8f5eb)`;
    restartEnteringAnimation(copy);
  });
  $('#singleStatus p').textContent=`正在播放 · ${sound.name}`; $('#singleStatus span').style.background=sound.color;
  audio.addEventListener('ended',()=>{
    if(state.singleAudio!==audio) return;
    nodes.get(sound.id).classList.remove('is-playing','is-single-playing');
    $('#singleStatus p').textContent=`已听完 · ${sound.name}`;
    state.singleAudio=null; state.singleId=null;
  });
  audio.play().catch(()=>{ nodes.get(sound.id).classList.remove('is-playing','is-single-playing'); $('#singleStatus p').textContent='浏览器阻止了播放，请再次点击节点'; });
}

function toggleMix(sound){
  const row=document.querySelector(`.mixer-row[data-id="${sound.id}"]`); const node=nodes.get(sound.id);
  if(state.mix.has(sound.id)){
    const entry=state.mix.get(sound.id); entry.audio.pause(); entry.audio.currentTime=0; state.mix.delete(sound.id);
    row.classList.remove('is-playing'); row.hidden=true; node.classList.remove('is-playing');
  } else {
    const savedVolume=state.volumes.get(sound.id) ?? 0.65;
    row.querySelector('.volume').value=String(savedVolume); row.hidden=false;
    const audio=new Audio(audioPath(sound)); audio.loop=true; audio.volume=savedVolume;
    state.mix.set(sound.id,{audio,sound}); row.classList.add('is-playing'); node.classList.add('is-playing');
    audio.play().catch(()=>{
      if(state.mix.get(sound.id)?.audio!==audio) return;
      state.mix.delete(sound.id); row.classList.remove('is-playing'); row.hidden=true; node.classList.remove('is-playing');
      $('#mixGuide').textContent=state.mix.size ? `已有 ${state.mix.size} 段声音同时响起。` : '选择地图上的声音，开始组合。';
    });
  }
  $('#mixGuide').textContent=state.mix.size ? `已有 ${state.mix.size} 段声音同时响起。` : '选择地图上的声音，开始组合。';
}

function setMode(mode){
  stopAll(); cancelScatter('field'); state.mode=mode; $('#soundmapScreen').dataset.mode=mode; updateNodePositions(mode);
  document.querySelectorAll('.mode-button').forEach(button=>button.classList.toggle('is-active',button.dataset.mode===mode));
  document.querySelectorAll('.mode-button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
  $('#singlePanel').hidden=mode!=='single'; $('#mixPanel').hidden=mode!=='mix';
  scatterSwap('map-labels',[$('#mapModeLabel'),$('#mapGuide')],()=>{
    $('#mapModeLabel').textContent=mode==='single'?'单独聆听':'自由混音';
    $('#mapGuide').textContent=mode==='single'?'点击地图上的发光节点，听见一段声音。':'让不同声音同时响起，重新组合这条街。';
  });
  if(mode==='mix') state.hasVisitedMix=true;
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(screen=>{ screen.classList.remove('is-active'); screen.hidden=true; });
  const screen=$(id); screen.hidden=false; requestAnimationFrame(()=>screen.classList.add('is-active'));
}

function startExperience(){
  $('#startPrompt').hidden=true; $('#startTitlePanel').hidden=false;
  const ambience=new Audio('assets/sounds/%E8%8E%AB%E9%82%AA%E8%B7%AF(1).wav'); ambience.loop=true; ambience.id='ambienceAudio';
  document.body.appendChild(ambience); ambience.play().catch(()=>{});
  setTimeout(()=>{ $('#enterButton').hidden=false; $('#timerNote').textContent='可以进入了'; },5000);
}
function enterMap(){
  const ambience=$('#ambienceAudio'); if(ambience){ ambience.pause(); ambience.remove(); }
  const transitionMessage=$('#transitionScreen p');
  transitionMessage.textContent='开启一场关于葑门横街的交互式声音实验。';
  $('#startScreen').classList.remove('is-active'); $('#transitionScreen').hidden=false;
  setTimeout(()=>{
    const transition=scatterSwap('transition',[transitionMessage],()=>{});
    const timeout=new Promise(resolve=>setTimeout(resolve,1150));
    Promise.race([transition,timeout]).then(()=>{
      cancelScatter('transition');
      $('#transitionScreen').hidden=true; showScreen('#soundmapScreen'); setMode('single');
    });
  },1900);
}

function showResult(){
  const selection=[...state.mix.values()].map(entry=>({ sound:entry.sound, volume:entry.audio.volume }));
  stopAll(); $('#resultList').innerHTML=''; $('#postcardMap').innerHTML='';
  const source=selection.length ? selection : [];
  if(!source.length) $('#resultList').innerHTML='<p class="result-sound"><span>尚未选择声音</span><span>—</span></p>';
  source.forEach(({sound,volume})=>{
    const item=document.createElement('div'); item.className='result-sound'; item.innerHTML=`<span>${sound.name}</span><span>${Math.round(volume*100)}%</span>`; $('#resultList').appendChild(item);
    const pin=document.createElement('i'); pin.className='result-pin'; pin.style.cssText=`left:${sound.x}%;top:${sound.y}%;--pin-color:${sound.color};--pin-volume:${volume}`; $('#postcardMap').appendChild(pin);
  });
  $('#resultDate').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric'}).format(new Date());
  showScreen('#resultScreen');
}

$('#listenButton').addEventListener('click',startExperience);
$('#enterButton').addEventListener('click',enterMap);
$('#brandButton').addEventListener('click',()=>{ stopAll(); showScreen('#startScreen'); });
document.querySelectorAll('.mode-button').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
$('#resultButton').addEventListener('click',showResult);
$('#backToMap').addEventListener('click',()=>{ showScreen('#soundmapScreen'); setMode('mix'); });
buildNodes(); buildMixer(); setMode('single');

const cursorMedia=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
const listenCursor=$('#listenCursor');
if(cursorMedia.matches && listenCursor){
  document.body.classList.add('custom-cursor-enabled');
  let cursorFrame=0; let cursorX=-100; let cursorY=-100;
  addEventListener('pointermove',event=>{
    cursorX=event.clientX; cursorY=event.clientY;
    listenCursor.classList.add('is-visible');
    if(!cursorFrame) cursorFrame=requestAnimationFrame(()=>{
      listenCursor.style.transform=`translate3d(${cursorX-17}px,${cursorY-10}px,0)`;
      cursorFrame=0;
    });
  },{passive:true});
  addEventListener('pointerout',event=>{ if(!event.relatedTarget) listenCursor.classList.remove('is-visible'); });
}

// Static preview routes are used only for review screenshots.
const previewMode=new URLSearchParams(location.search).get('preview');
if(previewMode==='single'){ showScreen('#soundmapScreen'); setMode('single'); }
if(previewMode==='mix'){ showScreen('#soundmapScreen'); setMode('mix'); }
if(previewMode==='result'){ showResult(); }
