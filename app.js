const sounds = [
  { id:'call', name:'打电话', category:'voice', categoryName:'人声', color:'#E3C27C', x:73, y:88, positions:{ single:[19.47,59.44], mix:[18.29,58.32] }, file:'打电话.wav', illustration:'assets/videos/call.mp4', meta:{ place:'葑门横街出口', time:'上午 / Soundwalk 末段', range:'近距离可辨认' }, reach:'near', note:'葑门横街的尾端，街道慢慢接向公园和马路。电话里的内容听不完整，人声短暂地从街道里浮出来，又重新混回周围的声音。' },
  { id:'pest', name:'粘鼠板 / 蟑螂药', category:'voice', categoryName:'人声', color:'#E3C27C', x:26, y:95, positions:{ single:[12.43,15.93], mix:[11.59,15.17] }, file:'粘鼠板蟑螂药(1).wav', illustration:'assets/videos/pest.mp4', meta:{ place:'葑门横街外的马路边', time:'上午 / Soundwalk 末段', range:'远距离可辨认' }, reach:'distant', note:'街上的叫卖并不总是在介绍眼前能看见的东西。“粘鼠板、蟑螂药”这样直接的声音反复穿过街道，传得很远很远。' },
  { id:'chestnut', name:'叫卖栗子', category:'voice', categoryName:'人声', color:'#E3C27C', x:57, y:47, positions:{ single:[62.96,44.07], mix:[62.07,43.14] }, file:'叫卖栗子.wav', illustration:'assets/videos/chestnut.mp4', meta:{ place:'葑门横街中段', time:'上午 / Soundwalk 中段', range:'较近距离可辨认' }, reach:'close', note:'叫卖声从人群和店铺之间穿出来，一遍又一遍。它不像背景里的交谈那么模糊，而是在嘈杂的街道中留下一个很明确的位置。' },
  { id:'cart', name:'拖车', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:49, y:75, positions:{ single:[33.45,39.07], mix:[32.80,38.39] }, file:'拖车.wav', illustration:'assets/illustrations/cart.webp', meta:{ place:'葑门横街末段', time:'上午 / Soundwalk 末段', range:'较近距离可辨认，移动声源' }, reach:'close', moving:true, note:'葑门横街靠近出口的地方，人们拉着小推车从身边经过，轮子压过不同的地面，发出连续又不完全相同的摩擦和震动。' },
  { id:'sweep', name:'扫地', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:34, y:26, positions:{ single:[85.90,23.89], mix:[85.98,23.22] }, file:'扫地.wav', illustration:'assets/videos/sweep.mp4', meta:{ place:'葑门横街末段', time:'上午 / Soundwalk 末段', range:'较近距离可辨认' }, reach:'close', note:'扫帚擦过地面的声音很轻，轻到走路时很容易忽略。它有自己的节奏：靠近、划过、停顿，再重新开始。' },
  { id:'fitness', name:'运动器材', category:'mechanical', categoryName:'机械音', color:'#839EAB', x:29, y:18, positions:{ single:[94.98,19.63], mix:[94.88,19.01] }, file:'运动器材.wav', illustration:'assets/videos/fitness.mp4', meta:{ place:'葑门横街末段', time:'上午 / Soundwalk 末段', range:'较近距离可辨认' }, reach:'close', note:'往出口走，公园里的运动器材发出金属摩擦和碰撞声，人的动作通过机器被留了下来。' },
  { id:'fry', name:'油炸', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:40, y:46, positions:{ single:[64.87,30.37], mix:[64.27,29.80] }, file:'油炸AI降噪.wav', illustration:'assets/videos/fry.mp4', meta:{ place:'葑门横街前段', time:'上午 / Soundwalk 前段', range:'较近距离可辨认' }, reach:'close', note:'食物被制作时发出细碎而持续的声音，油炸的声音没有叫卖那么突出，却让人很容易意识到：这里正在准备可以被吃掉的东西。' },
  { id:'meat', name:'剁肉', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:23, y:56, positions:{ single:[50.06,50.19], mix:[49.27,49.18] }, file:'肉铺 降噪1.0.wav', illustration:'assets/videos/meat.mp4', meta:{ place:'葑门横街中段', time:'上午 / Soundwalk 前段', range:'较远距离可辨认' }, reach:'far', note:'肉铺里不断传来剁肉声，旁边有人卖菜、问价、讨价还价。一下、一下的撞击非常清楚，却又很快被人声覆盖。' },
  { id:'oxygen', name:'打氧', category:'cooking', categoryName:'烹饪声', color:'#85976A', x:62, y:59, positions:{ single:[54.60,13.15], mix:[53.90,12.80] }, file:'打氧.wav', illustration:'assets/videos/oxygen.mp4', meta:{ place:'葑门横街中段', time:'上午 / Soundwalk 前段', range:'较远距离可辨认' }, reach:'far', note:'鱼和虾的摊位集中在一起。氧气机一直工作，细密的气泡声和机器声形成一种持续的底音。周围有人说话、挑东西。我们站在那里讨论了一下想不想吃虾。' },
  { id:'salt', name:'敲盐', category:'ambient', categoryName:'环境音', color:'#C57550', x:43, y:55, positions:{ single:[53.64,31.48], mix:[53.05,30.90] }, file:'敲盐(1).wav', illustration:'assets/videos/salt.mp4', meta:{ place:'葑门横街中段', time:'上午 / Soundwalk 中段', range:'较远距离可辨认' }, reach:'far', note:'在一片连续的人声和交通声里，敲击反而显得格外明确。声音短、硬、有间隔。' }
];

const $ = (selector) => document.querySelector(selector);
const state = { mode:'single', singleAudio:null, singleId:null, mix:new Map(), volumes:new Map(), hasVisitedMix:false };
const nodes = new Map();
const dissolveChannels = new Map();
const mapImages = ['assets/interface/soundmap-clean-single.png','assets/interface/soundmap-clean-mix.png'];
// Preloaded so the street ambience starts on the first click instead of after the WAV arrives.
const ambience = new Audio('assets/sounds/%E8%8E%AB%E9%82%AA%E8%B7%AF(1).wav'); ambience.loop=true; ambience.preload='auto';
let ambienceFade=0; let isEntering=false;

function fadeOutAudio(audio,duration){
  cancelAnimationFrame(ambienceFade);
  const startVolume=audio.volume; const began=performance.now();
  const step=now=>{
    const progress=Math.min(Math.max((now-began)/duration,0),1);
    audio.volume=startVolume*(1-progress);
    if(progress<1){ ambienceFade=requestAnimationFrame(step); return; }
    audio.pause(); audio.currentTime=0; audio.volume=startVolume;
  };
  ambienceFade=requestAnimationFrame(step);
}

const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const settled=animations=>Promise.all(animations.map(animation=>animation.finished.catch(()=>null)));

function cancelDissolve(channel){
  const current=dissolveChannels.get(channel);
  if(!current) return;
  current.animations.forEach(animation=>animation.cancel());
  current.elements.forEach(element=>{ element.textContent=element.textContent; });
  dissolveChannels.delete(channel);
}

// After the reference site (chartogne-taillet.com): each character appears or dissolves in place, at its own
// moment, so a line gathers or thins out like ink rather than moving as a block. Opacity only: no drift, no blur.
function dissolveCharacters(elements,{ appear=false, delay=0, spread=1000, duration=500 }={}){
  if(reducedMotion()) return [];
  const animations=[];
  elements.forEach(element=>{
    const text=element.textContent;
    element.textContent='';
    [...text].forEach(character=>{
      const span=document.createElement('span');
      span.className='dissolve-char'; span.textContent=character;
      element.appendChild(span);
      animations.push(span.animate(appear ? [{opacity:0},{opacity:1}] : [{opacity:1},{opacity:0}],
        { delay:delay+Math.random()*spread, duration, easing:'ease-in-out', fill:'both' }));
    });
  });
  return animations;
}

function dissolveSwap(channel,elements,update,timing){
  cancelDissolve(channel);
  if(reducedMotion()){ update(); return Promise.resolve(); }
  const token=Symbol(channel); const animations=dissolveCharacters(elements,timing);
  dissolveChannels.set(channel,{token,animations,elements});
  return settled(animations).then(()=>{
    const current=dissolveChannels.get(channel);
    if(!current || current.token!==token) return;
    dissolveChannels.delete(channel); update();
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
  syncMixReach();
  nodes.forEach(node=>node.classList.remove('is-playing'));
  document.querySelectorAll('.mixer-row').forEach(row=>{ row.classList.remove('is-playing'); row.hidden=true; });
  $('#mixGuide').textContent='选择地图上的声音，开始组合。';
}
function stopAll(){ stopSingle(); stopMix(); }

const soundIcons = {
  call:'phone', pest:'pest-call', chestnut:'chestnut', fry:'frying', salt:'salt',
  cart:'cart', sweep:'sweeping', fitness:'exercise', meat:'chopping', oxygen:'oxygen'
};

function buildNodes(){
  sounds.forEach(sound=>{
    const button=document.createElement('button');
    button.type='button'; button.className='sound-node'; button.dataset.id=sound.id; button.dataset.category=sound.category;
    const [x,y]=sound.positions[state.mode];
    button.style.cssText=`left:${x}%;top:${y}%;--node-color:${sound.color}`;
    button.innerHTML='<span class="node-ripple" aria-hidden="true"></span><span class="node-ripple" aria-hidden="true"></span><span class="node-ripple" aria-hidden="true"></span>';
    const icon=document.createElement('img');
    icon.className='sound-icon'; icon.src=`assets/icons/sounds/${soundIcons[sound.id]}.png`;
    icon.alt=''; icon.draggable=false; icon.setAttribute('aria-hidden','true');
    button.appendChild(icon);
    button.setAttribute('aria-label',`${sound.name}，${sound.categoryName}`);
    button.addEventListener('click',()=> state.mode==='single' ? playSingle(sound) : toggleMix(sound));
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

/* Single: the soundmap is the page. Listening to a node draws its perceived reach on the map and lets its
   field record surface beside it, in whichever nearby space keeps the other nodes visible and clickable. */
const reachShare={ near:.045, close:.065, far:.095, distant:.14 }; // of map width; perceived on the soundwalk, not measured
const shapeShare={ voice:.045, mechanical:.047, cooking:.034, ambient:.048 }; // drawn size of each node shape on the map
let currentMoment=null;
const clamp=(value,min,max)=>Math.min(Math.max(value,min),max);

function seededRandom(seed){
  let hash=2166136261;
  for(const character of seed) hash=Math.imul(hash^character.charCodeAt(0),16777619);
  return ()=>{ hash=Math.imul(hash^(hash>>>15),2246822507); hash=Math.imul(hash^(hash>>>13),3266489909); return ((hash^=hash>>>16)>>>0)/4294967296; };
}
// One organic outline per sound, shared by its reach on the map and the edge of its image.
function blobPoints(seed){
  const random=seededRandom(seed); const count=9;
  return Array.from({length:count},(_,index)=>[index/count*Math.PI*2+(random()-.5)*.35, .9+random()*.18]);
}
function blobPath(points,cx,cy,rx,ry,scale=1){
  const p=points.map(([angle,radius])=>[cx+Math.cos(angle)*radius*rx*scale, cy+Math.sin(angle)*radius*ry*scale]);
  const point=([x,y])=>`${x.toFixed(2)},${y.toFixed(2)}`;
  let path=`M${point(p[0])}`;
  p.forEach((current,index)=>{
    const previous=p[(index-1+p.length)%p.length], next=p[(index+1)%p.length], after=p[(index+2)%p.length];
    path+=`C${point([current[0]+(next[0]-previous[0])/6,current[1]+(next[1]-previous[1])/6])} ${point([next[0]-(after[0]-current[0])/6,next[1]-(after[1]-current[1])/6])} ${point(next)}`;
  });
  return `${path}Z`;
}
function reveal(element,keyframes,delay,duration=700){
  return element.animate(keyframes,{ delay:reducedMotion()?0:delay, duration:reducedMotion()?0:duration, easing:'cubic-bezier(.22,.61,.36,1)', fill:'both' });
}

// Cover the stage with the map while keeping every node a comfortable distance inside the visible edge.
function fitSingleMap(){
  const frame=$('#mapFrame'); const width=frame.clientWidth, height=frame.clientHeight;
  if(state.mode!=='single' || !width || !height) return;
  const xs=sounds.map(sound=>sound.positions.single[0]/100), ys=sounds.map(sound=>sound.positions.single[1]/100);
  const margin=Math.max(56,Math.min(width,height)*.07);
  const span=(values)=>[Math.min(...values),Math.max(...values)];
  const [minX,maxX]=span(xs), [minY,maxY]=span(ys);
  const mapWidth=Math.min(Math.max(width,height*1.5),(width-2*margin)/(maxX-minX),(height-2*margin)*1.5/(maxY-minY));
  const offset=(size,view,min,max)=>{
    const keepNodes=[margin-min*size,view-margin-max*size];
    const lo=Math.max(view-size,keepNodes[0]), hi=Math.min(0,keepNodes[1]);
    return lo<=hi ? clamp((view-size)/2,lo,hi) : clamp((view-size)/2,...keepNodes);
  };
  frame.style.setProperty('--fit-w',`${mapWidth}px`);
  frame.style.setProperty('--fit-x',`${offset(mapWidth,width,minX,maxX)}px`);
  frame.style.setProperty('--fit-y',`${offset(mapWidth/1.5,height,minY,maxY)}px`);
}

function nodeCenters(){
  const frame=$('#mapFrame').getBoundingClientRect(), layer=$('#nodeLayer').getBoundingClientRect();
  return { mapWidth:layer.width, centers:new Map(sounds.map(sound=>{
    const [x,y]=sound.positions[state.mode];
    return [sound.id,[layer.left-frame.left+x/100*layer.width, layer.top-frame.top+y/100*layer.height, shapeShare[sound.category]*layer.width]];
  })) };
}
function rectDistance({x,y,w,h},[px,py]){ return Math.hypot(Math.max(x-px,0,px-x-w),Math.max(y-py,0,py-y-h)); }

// Search the whole map, in four arrangements of the same record (wide, tall, compact, strip), for the free space
// closest to the node: the record may sit anywhere around it, but never on another node or on the node itself.
function placeMoment(moment,sound){
  const frame=$('#mapFrame'); const width=frame.clientWidth, height=frame.clientHeight; const pad=20, step=16;
  const { mapWidth, centers }=nodeCenters(); const [cx,cy]=centers.get(sound.id);
  const keepOwn=mapWidth*.05+16;
  const others=[...centers].filter(([id])=>id!==sound.id).map(([,center])=>center);
  let best=null; moment.style.left='0px'; moment.style.top='0px';
  ['row','column','grid','strip'].forEach((flow,flowIndex)=>{
    moment.dataset.flow=flow; const w=moment.offsetWidth, h=moment.offsetHeight;
    for(let x=pad;x<=Math.max(pad,width-pad-w);x+=step){
      for(let y=pad;y<=Math.max(pad,height-pad-h);y+=step){
        const rect={x,y,w,h}; const distance=rectDistance(rect,[cx,cy]);
        let score=distance+flowIndex*8+Math.max(0,w-width+2*pad)*60+Math.max(0,h-height+2*pad)*60;
        if(distance<keepOwn) score+=1500+(keepOwn-distance)*40;
        let nearestOther=Infinity;
        others.forEach(center=>{
          const gap=rectDistance(rect,center), avoid=center[2]+12; nearestOther=Math.min(nearestOther,gap-center[2]);
          if(gap<avoid) score+=2000+(avoid-gap)*40;
        });
        // A record that sits closer to another shape than to its own reads as belonging to that shape.
        const ownGap=distance-centers.get(sound.id)[2];
        if(nearestOther<ownGap) score+=60+(ownGap-nearestOther)*.8;
        if(!best || score<best.score) best={flow,x,y,w,h,score};
      }
    }
  });
  moment.dataset.flow=best.flow;
  // Keep the image on the side facing the node, so the record reads as coming out of it.
  moment.toggleAttribute('data-reverse',best.flow==='strip' ? false : best.flow==='column' ? best.y+best.h/2<cy : best.x+best.w/2<cx);
  moment.style.left=`${best.x}px`; moment.style.top=`${best.y}px`;
  linkMoment(moment,best,[cx,cy],keepOwn-10,others);
}

// When the nearest free space is some way off, a faint traced line keeps the record tied to its node.
function linkMoment(moment,{x,y},[cx,cy],startRadius,others){
  const link=moment.querySelector('.moment-link'); const media=moment.querySelector('.moment-media'); const frame=$('#mapFrame');
  const a=media.offsetWidth/2, b=media.offsetHeight/2; const mx=x+media.offsetLeft+a, my=y+media.offsetTop+b;
  const length=Math.hypot(mx-cx,my-cy); const ux=(mx-cx)/length, uy=(my-cy)/length;
  const edge=a*b/Math.hypot(b*ux,a*uy)+6; // where the line meets the image's outline
  link.style.cssText=`left:${-x}px;top:${-y}px;width:${frame.clientWidth}px;height:${frame.clientHeight}px`;
  const isNear=length-edge-startRadius<110; link.toggleAttribute('hidden',isNear);
  if(isNear) return;
  const start=[cx+ux*startRadius,cy+uy*startRadius], end=[mx-ux*edge,my-uy*edge]; const span=length-edge-startRadius;
  // Bend the line whichever way keeps it furthest from the other shapes, so it cannot be read as theirs.
  const curve=(bend)=>[(start[0]+end[0])/2-uy*span*bend,(start[1]+end[1])/2+ux*span*bend];
  const clearance=(control)=>Math.min(...[.15,.3,.45,.6,.75,.9].flatMap(t=>others.map(([ox,oy,radius])=>{
    const px=(1-t)**2*start[0]+2*(1-t)*t*control[0]+t*t*end[0], py=(1-t)**2*start[1]+2*(1-t)*t*control[1]+t*t*end[1];
    return Math.hypot(px-ox,py-oy)-radius;
  })));
  const control=[.14,-.14,.3,-.3].map(curve).reduce((best,next)=>clearance(next)>clearance(best)+8 ? next : best);
  link.querySelector('path').setAttribute('d',`M${start.map(Math.round).join(',')}Q${control.map(Math.round).join(',')} ${end.map(Math.round).join(',')}`);
}

function buildReach(sound, mode='single'){
  const [x,y]=sound.positions[mode]; const radius=reachShare[sound.reach]*150; const points=blobPoints(`${sound.id}-reach`);
  const group=document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('class',`reach${sound.moving?' is-moving':''}`); group.style.setProperty('--reach-color',sound.color);
  group.innerHTML=`<path class="reach-field" d="${blobPath(points,x*1.5,y,radius,radius)}"/>`
    +`<path class="reach-line" pathLength="1" d="${blobPath(points,x*1.5,y,radius,radius)}"/>`
    +`<path class="reach-line reach-line--inner" pathLength="1" d="${blobPath(points,x*1.5,y,radius*.55,radius*.55)}"/>`;
  group.dataset.sound=sound.id;
  $(mode==='mix'?'#mixReachLayer':'#reachLayer').appendChild(group);
  reveal(group.querySelector('.reach-field'),[{opacity:0},{opacity:1}],150,900);
  group.querySelectorAll('.reach-line').forEach((line,index)=>reveal(line,[{strokeDashoffset:1},{strokeDashoffset:0}],index*180,900));
  return group;
}

function buildMoment(sound){
  const frame=$('#mapFrame'); const width=frame.clientWidth, height=frame.clientHeight;
  const mediaWidth=Math.round(clamp(Math.min(width*.14,height*.26),160,280)), mediaHeight=Math.round(mediaWidth*.75);
  const moment=document.createElement('article'); moment.className='moment';
  const copyWidth=Math.round(clamp(Math.min(width*.18,height*.34),220,300));
  moment.style.cssText=`--moment-color:${sound.color};--media-w:${mediaWidth}px;--media-h:${mediaHeight}px;--copy-w:${copyWidth}px;--head-w:${Math.round(Math.max(copyWidth*.78,176))}px`;
  const media=sound.illustration.endsWith('.mp4')
    ? `<video src="${sound.illustration}" autoplay loop muted playsinline preload="auto"></video>`
    : `<img src="${sound.illustration}" alt="" draggable="false">`;
  const points=blobPoints(`${sound.id}-media`); const half=[mediaWidth/2,mediaHeight/2];
  const shape=(scale)=>blobPath(points,half[0],half[1],half[0],half[1],scale);
  moment.innerHTML=`<svg class="moment-link" aria-hidden="true"><path pathLength="1"/></svg><figure class="moment-media"><div class="moment-image">${media}</div>`
    +`<svg class="moment-outline" viewBox="0 0 ${mediaWidth} ${mediaHeight}" aria-hidden="true"><path pathLength="1" d="${shape(1.04)}"/></svg></figure>`
    +`<div class="moment-copy"><div class="moment-head"><h2 class="moment-title"></h2><dl class="moment-meta">`
    +`<div><dt>地点</dt><dd></dd></div><div><dt>时间</dt><dd></dd></div><div><dt>范围</dt><dd></dd></div></dl></div>`
    +`<p class="moment-note"></p><p class="moment-status">正在聆听</p></div>`;
  moment.querySelector('.moment-title').textContent=sound.name;
  moment.querySelectorAll('.moment-meta dd').forEach((element,index)=>{ element.textContent=Object.values(sound.meta)[index]; });
  moment.querySelector('.moment-note').textContent=sound.note;
  $('#momentLayer').appendChild(moment);
  placeMoment(moment,sound);
  // The outline is traced first; the image then opens from inside it.
  reveal(moment.querySelector('.moment-link path'),[{strokeDashoffset:1},{strokeDashoffset:0}],350,700);
  reveal(moment.querySelector('.moment-outline path'),[{strokeDashoffset:1},{strokeDashoffset:0}],250,800);
  reveal(moment.querySelector('.moment-image'),[{clipPath:`path('${shape(.08)}')`},{clipPath:`path('${shape(1)}')`}],600,900);
  // Words gather a character at a time, in order: the name, then the record, then the note.
  [['.moment-title',900,500],['.moment-meta dt,.moment-meta dd',1150,600],['.moment-note',1400,900],['.moment-status',1600,400]]
    .forEach(([selector,delay,spread])=>dissolveCharacters([...moment.querySelectorAll(selector)],{ appear:true, delay, spread }));
  reveal(moment.querySelector('.moment-status'),[{opacity:0},{opacity:1}],1600,500); // carries the status rule with it
  return moment;
}

// A record leaves as its words thin out character by character, while the image, link and reach fade into the map.
function releaseMoment({ moment, reach }){
  moment.querySelector('video')?.pause();
  const fade=element=>element.animate([{opacity:getComputedStyle(element).opacity},{opacity:0}],{ duration:reducedMotion()?0:900, fill:'forwards' });
  const words=dissolveCharacters([...moment.querySelectorAll('.moment-title,.moment-meta dt,.moment-meta dd,.moment-note,.moment-status')],{ spread:900, duration:450 });
  const animations=[...words,...[...moment.querySelectorAll('.moment-media,.moment-link,.moment-status')].map(fade),fade(reach)];
  Promise.all(animations.map(animation=>animation.finished.catch(()=>null))).then(()=>{ moment.remove(); reach.remove(); });
}
function dismissMoment(){
  if(!currentMoment) return;
  releaseMoment(currentMoment);
  currentMoment=null; $('#soundmapScreen').classList.remove('has-moment');
}
function setSingleStatus(text){
  if(!currentMoment) return;
  currentMoment.moment.querySelector('.moment-status').textContent=text;
  $('#singleStatus').textContent=`${text} · ${currentMoment.sound.name}`;
}
function quietMoment(){ currentMoment?.reach.classList.add('is-quiet'); }

function playSingle(sound){
  stopSingle(); dismissMoment();
  const audio=new Audio(audioPath(sound)); audio.preload='auto';
  state.singleAudio=audio; state.singleId=sound.id; nodes.get(sound.id).classList.add('is-playing','is-single-playing');
  currentMoment={ sound, reach:buildReach(sound), moment:buildMoment(sound) };
  $('#soundmapScreen').classList.add('has-moment');
  $('#singleStatus').textContent=`正在聆听 · ${sound.name}`;
  audio.addEventListener('ended',()=>{
    if(state.singleAudio!==audio) return;
    nodes.get(sound.id).classList.remove('is-playing','is-single-playing');
    state.singleAudio=null; state.singleId=null;
    setSingleStatus('已听完'); quietMoment();
  });
  audio.play().catch(()=>{
    // A rejection after the user has already moved on to another node is just the old clip being interrupted.
    if(state.singleAudio!==audio) return;
    nodes.get(sound.id).classList.remove('is-playing','is-single-playing');
    state.singleAudio=null; state.singleId=null;
    setSingleStatus('浏览器阻止了播放，请再次点击节点'); quietMoment();
  });
}
function dismissSingle(){ stopSingle(); dismissMoment(); $('#singleStatus').textContent=''; }

function syncMixReach(){
  const layer=$('#mixReachLayer');
  [...layer.children].forEach(group=>{ if(!state.mix.has(group.dataset.sound)) group.remove(); });
  state.mix.forEach(({sound})=>{
    if(!layer.querySelector(`[data-sound="${sound.id}"]`)) buildReach(sound,'mix');
  });
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
      syncMixReach();
  $('#mixGuide').textContent=state.mix.size ? `已有 ${state.mix.size} 段声音同时响起。` : '选择地图上的声音，开始组合。';
    });
  }
  syncMixReach();
  $('#mixGuide').textContent=state.mix.size ? `已有 ${state.mix.size} 段声音同时响起。` : '选择地图上的声音，开始组合。';
}

function setMode(mode){
  stopAll(); dismissMoment(); state.mode=mode; $('#soundmapScreen').dataset.mode=mode; updateNodePositions(mode); fitSingleMap();
  document.querySelectorAll('.mode-button').forEach(button=>button.classList.toggle('is-active',button.dataset.mode===mode));
  document.querySelectorAll('.mode-button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mode===mode)));
  const labels=[[$('#mapModeLabel'),mode==='single'?'单独聆听':'自由混音'],
    [$('#mapGuide'),mode==='single'?'点击地图上的图形，听见一段声音。':'让不同声音同时响起，重新组合这条街。']];
  const showLabels=()=>{
    labels.forEach(([element,text])=>{ element.textContent=text; });
    dissolveCharacters(labels.map(([element])=>element),{ appear:true, spread:600 });
  };
  // Unchanged labels (entering the map) only gather in; changed ones thin out first.
  if(labels.every(([element,text])=>element.textContent===text)){ cancelDissolve('map-labels'); showLabels(); }
  else dissolveSwap('map-labels',labels.map(([element])=>element),showLabels,{ spread:500, duration:400 });
  if(mode==='mix') state.hasVisitedMix=true;
}

function showScreen(id){
  document.querySelectorAll('.screen').forEach(screen=>{ screen.classList.remove('is-active'); screen.hidden=true; });
  const screen=$(id); screen.hidden=false; requestAnimationFrame(()=>screen.classList.add('is-active'));
}

function startExperience(){
  const video=$('#startMapVideo');
  $('#listenButton').hidden=true;
  cancelAnimationFrame(ambienceFade); ambience.volume=1; ambience.currentTime=0; ambience.play().catch(()=>{});
  // Warm the map images while the opening plays, so the soundmap does not appear empty.
  mapImages.forEach(src=>{ new Image().src=src; });
  const continueStart=()=>{
    video.pause(); $('#enterButton').hidden=false; $('#timerNote').textContent='可以进入了';
  };
  video.currentTime=0;
  video.addEventListener('ended',continueStart,{once:true});
  video.addEventListener('error',continueStart,{once:true});
  video.play().catch(continueStart);
}
function enterMap(){
  if(isEntering) return;
  isEntering=true; fadeOutAudio(ambience,1200);
  const transitionMessage=$('#transitionScreen p');
  transitionMessage.textContent='开启一场关于葑门横街的交互式声音实验。';
  $('#startScreen').classList.remove('is-active'); $('#transitionScreen').hidden=false;
  dissolveCharacters([transitionMessage],{ appear:true, delay:200, spread:700 });
  setTimeout(()=>{
    const transition=dissolveSwap('transition',[transitionMessage],()=>{});
    const timeout=new Promise(resolve=>setTimeout(resolve,1700));
    Promise.race([transition,timeout]).then(()=>{
      cancelDissolve('transition');
      $('#transitionScreen').hidden=true; showScreen('#soundmapScreen'); setMode('single');
      isEntering=false;
    });
  },1900);
}
function returnToStart(){
  stopAll(); dismissMoment();
  const video=$('#startMapVideo'); video.pause(); video.currentTime=0;
  $('#listenButton').hidden=false; $('#enterButton').hidden=true; $('#timerNote').textContent='地图抵达后进入';
  showScreen('#startScreen');
}

// Result playback is a snapshot of the final Mix, independent of Mix controls.
let resultSelection=[];
let resultPlayback=[];
let resultPlaybackRun=0;
function stopResultPlayback(){
  resultPlaybackRun++;
  resultPlayback.forEach(audio=>{ audio.pause(); audio.currentTime=0; });
  resultPlayback=[];
  $('#resultPlayback').textContent='个人混音回放';
  $('#resultPlayback').setAttribute('aria-pressed','false');
  $('#resultPlaybackStatus').textContent=resultSelection.length?'点击回放最终混音':'尚未选择声音';
}
function toggleResultPlayback(){
  if(resultPlayback.length){ stopResultPlayback(); return; }
  if(!resultSelection.length) return;
  const run=++resultPlaybackRun;
  resultPlayback=resultSelection.map(({sound,volume})=>{
    const audio=new Audio(audioPath(sound)); audio.loop=true; audio.volume=volume;
    return audio;
  });
  $('#resultPlayback').textContent='停止回放';
  $('#resultPlayback').setAttribute('aria-pressed','true');
  $('#resultPlaybackStatus').textContent=`正在回放 · ${resultSelection.length} 段声音`;
  resultPlayback.forEach(audio=>audio.play().catch(()=>{
    if(run!==resultPlaybackRun) return;
    audio.pause(); resultPlayback=resultPlayback.filter(item=>item!==audio);
    if(!resultPlayback.length){ stopResultPlayback(); $('#resultPlaybackStatus').textContent='播放失败，请点击重试'; }
    else $('#resultPlaybackStatus').textContent=`正在回放 · ${resultPlayback.length} 段声音，部分声音未能加载`;
  }));
}
async function saveResultPostcard(){
  const button=$('#savePostcard'), status=$('#postcardSaveStatus');
  button.disabled=true; status.textContent='正在生成 PNG…';
  try {
    const region=$('.postcard'), image=$('.postcard-art');
    await image.decode();
    const bounds=region.getBoundingClientRect(), imageBounds=image.getBoundingClientRect();
    if(!bounds.width || !bounds.height) throw new Error('Postcard not visible');
    // The left DOM region contains one image with object-fit:contain. Rasterize
    // exactly that visible region with native canvas, including its paper margin.
    const canvas=document.createElement('canvas');
    const scale=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(bounds.width*scale); canvas.height=Math.round(bounds.height*scale);
    const context=canvas.getContext('2d'); context.scale(scale,scale);
    context.fillStyle=getComputedStyle($('#resultScreen')).backgroundColor;
    context.fillRect(0,0,bounds.width,bounds.height);
    const fit=Math.min(imageBounds.width/image.naturalWidth,imageBounds.height/image.naturalHeight);
    const width=image.naturalWidth*fit, height=image.naturalHeight*fit;
    context.drawImage(image,imageBounds.left-bounds.left+(imageBounds.width-width)/2,imageBounds.top-bounds.top+(imageBounds.height-height)/2,width,height);
    const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('PNG encoding failed')),'image/png'));
    const url=URL.createObjectURL(blob), link=document.createElement('a');
    link.href=url; link.download='听见之间-我的声音地图.png';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),10000);
    status.textContent='PNG 下载已开始';
  } catch(error){ status.textContent='保存失败，请重试'; }
  finally { button.disabled=false; }
}

function showResult(){
  const selection=[...state.mix.values()].map(entry=>({ sound:entry.sound, volume:entry.audio.volume }));
  stopResultPlayback(); resultSelection=selection;
  $('#resultPlayback').disabled=!selection.length;
  $('#resultPlaybackStatus').textContent=selection.length?'点击回放最终混音':'尚未选择声音';
  $('#postcardSaveStatus').textContent='下载 PNG 图片';
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
$('#brandButton').addEventListener('click',returnToStart);
document.querySelectorAll('.mode-button').forEach(button=>button.addEventListener('click',()=>{
  if(button.dataset.mode!==state.mode) setMode(button.dataset.mode);
}));
$('#resultButton').addEventListener('click',showResult);
$('#resultPlayback').addEventListener('click',toggleResultPlayback);
$('#savePostcard').addEventListener('click',saveResultPostcard);
addEventListener('pagehide',stopResultPlayback);
$('#backToMap').addEventListener('click',()=>{ stopResultPlayback(); showScreen('#soundmapScreen'); setMode('mix'); });
// Clicking open map (not a node, not the record itself) or pressing Esc lets the map fall quiet again.
$('#mapFrame').addEventListener('click',event=>{
  if(state.mode!=='single' || !currentMoment || event.target.closest('.sound-node')) return;
  const rect=currentMoment.moment.getBoundingClientRect();
  if(event.clientX>=rect.left && event.clientX<=rect.right && event.clientY>=rect.top && event.clientY<=rect.bottom) return;
  dismissSingle();
});
addEventListener('keydown',event=>{ if(event.key==='Escape' && state.mode==='single' && currentMoment) dismissSingle(); });
new ResizeObserver(()=>{
  fitSingleMap();
  if(currentMoment) placeMoment(currentMoment.moment,currentMoment.sound);
}).observe($('#mapFrame'));
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
