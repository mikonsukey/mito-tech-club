/* mito-tech-club 版：謎ノ美兎の画像データは含めていません。顔のデータは window.MITO_ASSETS（lib/mito-assets.js）から読みます。 */
/* たのしいお絵描き（旧：ぐにゃ線ペイント） (ezn-gunya) — ミコンスキー https://zuariya.com/ */
(function(){
var host=document.getElementById('ezn-gunya'); if(!host||host.dataset.ready) return; host.dataset.ready='1';
if(!document.getElementById('ezn-gunya-font')){var l=document.createElement('link');l.id='ezn-gunya-font';l.rel='stylesheet';
 l.href='https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@500;700;900&display=swap';document.head.appendChild(l);}
var st=document.createElement('style'); st.textContent="\n.ezg-widget{--bg:#f4eee2; --dot:rgba(31,27,46,.07); --card:#fffaf0; --ink:#1f1b2e; --sub:#6b6478;\n  --pink:#ff4f8b; --blue:#3a5bff; --yellow:#ffd23f; --mint:#00a676;\n  --edge:#1f1b2e; --shadow:#1f1b2e; --chip:#fff; --tape:rgba(255,210,63,.75); --hl:#ffd23f;}\n.ezg-widget,.ezg-widget *{box-sizing:border-box}\n.ezg-widget{margin:0;color:var(--ink);background-color:var(--bg);\n  background-image:radial-gradient(var(--dot) 1.2px, transparent 1.3px);background-size:18px 18px;\n  font-family:\"Zen Maru Gothic\",\"Hiragino Maru Gothic ProN\",system-ui,sans-serif;font-weight:500}\n.ezg-widget .wrap{max-width:1060px;margin:0 auto;padding:28px 16px 48px}\n.ezg-widget /* ---- header ---- */ header{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:22px}\n.ezg-widget .kicker{display:inline-block;font-size:.72rem;font-weight:900;letter-spacing:.18em;color:var(--card);\n  background:var(--ink);padding:4px 10px;border-radius:99px;margin-bottom:10px}\n.ezg-widget .ttl{font-family:\"Dela Gothic One\",sans-serif;font-weight:400;font-size:clamp(2.1rem,7vw,3.6rem);line-height:1;margin:0;\n  letter-spacing:.02em;text-shadow:3px 3px 0 var(--pink),-2px -1px 0 var(--blue)}\n.ezg-widget .ttl .wig{display:inline-block;animation:ezg-wig 1.2s steps(3) infinite}\n.ezg-widget .ttl .wig:nth-child(2){animation-delay:-.4s}\n.ezg-widget .ttl .wig:nth-child(3){animation-delay:-.8s}\n@keyframes ezg-wig{0%{transform:rotate(-3deg) translateY(0)}33%{transform:rotate(2deg) translateY(-2px)}66%{transform:rotate(-1deg) translateY(1px)}}\n.ezg-widget .lead{max-width:420px;margin:0;font-size:.9rem;line-height:1.75;color:var(--sub)}\n.ezg-widget .lead b{color:var(--ink);background:linear-gradient(transparent 62%,var(--hl) 62%)}\n.ezg-widget /* ---- layout ---- */ .layout{display:grid;grid-template-columns:1fr;gap:22px}\n@container ezg (min-width:860px){.ezg-widget .layout{grid-template-columns:minmax(0,1fr) 270px;align-items:start}}\n.ezg-widget /* ---- sketchbook ---- */ .book{position:relative;background:var(--card);border:2.5px solid var(--edge);border-radius:18px;padding:12px;\n  box-shadow:6px 6px 0 var(--shadow)}\n.ezg-widget .book::before,.ezg-widget .book::after{content:\"\";position:absolute;width:86px;height:24px;background:var(--tape);top:-12px;z-index:2}\n.ezg-widget .book::before{left:28px;transform:rotate(-6deg)}\n.ezg-widget .book::after{right:28px;transform:rotate(5deg)}\n.ezg-widget .cv{position:relative;width:100%;aspect-ratio:4/3;border-radius:10px;overflow:hidden;background:#fffaf0;\n  outline:1.5px dashed rgba(31,27,46,.18);outline-offset:-8px}\n.ezg-widget canvas{display:block;width:100%;height:100%;touch-action:none;cursor:crosshair}\n.ezg-widget canvas.disturb{cursor:grab}\n.ezg-widget .stamp{position:absolute;right:14px;top:14px;width:92px;height:92px;border-radius:50%;\n  border:3px solid var(--pink);color:var(--pink);display:grid;place-items:center;text-align:center;\n  font-family:\"Dela Gothic One\",sans-serif;line-height:1.05;transform:rotate(-12deg) scale(.6);opacity:0;\n  transition:opacity .25s, transform .35s cubic-bezier(.3,1.8,.5,1);pointer-events:none;background:rgba(255,250,240,.75)}\n.ezg-widget .stamp.show{opacity:1;transform:rotate(-12deg) scale(1)}\n.ezg-widget .stamp small{display:block;font-family:\"Zen Maru Gothic\",sans-serif;font-weight:900;font-size:.62rem;letter-spacing:.1em}\n.ezg-widget .stamp span{font-size:1.55rem}\n.ezg-widget .status{display:flex;align-items:center;gap:12px;margin:12px 4px 2px;min-height:26px;font-size:.88rem;font-weight:700}\n.ezg-widget .status .dot{width:10px;height:10px;border-radius:50%;background:var(--mint);flex:none;box-shadow:0 0 0 3px rgba(0,166,118,.2)}\n.ezg-widget .status.morph .dot{background:var(--pink);box-shadow:0 0 0 3px rgba(255,79,139,.25);animation:ezg-pulse 1s infinite}\n@keyframes ezg-pulse{50%{transform:scale(1.35)}}\n.ezg-widget .meter{flex:1;height:8px;border-radius:99px;background:rgba(127,120,140,.2);overflow:hidden;min-width:60px}\n.ezg-widget .meter i{display:block;height:100%;width:0;background:repeating-linear-gradient(45deg,var(--pink) 0 8px,#ff7aa8 8px 16px);transition:width .1s linear}\n.ezg-widget /* ---- tool dock ---- */ .dock{background:var(--card);border:2.5px solid var(--edge);border-radius:18px;padding:16px;box-shadow:6px 6px 0 var(--shadow);\n  display:grid;gap:16px}\n.ezg-widget .sec .sh{margin:0 0 8px;font-size:.72rem;font-weight:900;letter-spacing:.16em;color:var(--sub)}\n.ezg-widget .row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}\n.ezg-widget .sw{width:36px;height:36px;border:2.5px solid var(--edge);cursor:pointer;padding:0;\n  border-radius:58% 42% 55% 45% / 45% 58% 42% 55%;transition:transform .15s}\n.ezg-widget .sw:nth-child(2n){border-radius:45% 55% 40% 60% / 60% 40% 55% 45%}\n.ezg-widget .sw:hover{transform:rotate(-8deg) scale(1.08)}\n.ezg-widget .sw.on{transform:scale(1.12);box-shadow:0 0 0 3px var(--card),0 0 0 6px var(--ink)}\n.ezg-widget .sz{width:46px;height:40px;border-radius:12px;border:2.5px solid var(--edge);background:var(--chip);cursor:pointer;\n  display:grid;place-items:center;padding:0}\n.ezg-widget .sz b{display:block;border-radius:50%;background:var(--ink)}\n.ezg-widget .sz.on{background:var(--yellow)}\n.ezg-widget .sz.on b{background:#1f1b2e}\n.ezg-widget select{width:100%;height:42px;border-radius:12px;border:2.5px solid var(--edge);background:var(--chip);color:var(--ink);\n  font:inherit;font-weight:700;padding:0 10px}\n.ezg-widget .btns{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.ezg-widget .btn{height:44px;padding:0 12px;border-radius:12px;border:2.5px solid var(--edge);background:var(--chip);color:var(--ink);\n  font:inherit;font-weight:900;font-size:.86rem;cursor:pointer;box-shadow:3px 3px 0 var(--shadow);transition:transform .08s, box-shadow .08s}\n.ezg-widget .btn:active:not(:disabled){transform:translate(3px,3px);box-shadow:0 0 0 var(--shadow)}\n.ezg-widget .btn.primary{grid-column:1/-1;height:54px;font-size:1.05rem;background:var(--pink);color:#fff;letter-spacing:.06em}\n.ezg-widget .btn.on{background:var(--blue);color:#fff}\n.ezg-widget .btn:disabled{opacity:.4;cursor:default;box-shadow:none;transform:translate(3px,3px)}\n@container ezg (max-width:859px){.ezg-widget .dock{grid-template-columns:1fr 1fr}\n.ezg-widget .sec.full{grid-column:1/-1}}\n@container ezg (max-width:520px){.ezg-widget .stamp{width:68px;height:68px;right:8px;top:8px}\n.ezg-widget .stamp span{font-size:1.1rem}\n.ezg-widget .dock{grid-template-columns:1fr}\n.ezg-widget .book::before,.ezg-widget .book::after{width:64px}}\n.ezg-widget .how{margin-top:26px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}\n.ezg-widget .step{background:var(--card);border:2px solid var(--edge);border-radius:14px;padding:12px 14px;font-size:.84rem;line-height:1.65;color:var(--sub)}\n.ezg-widget .step b{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--ink);color:var(--card);\n  font-family:\"Dela Gothic One\",sans-serif;font-weight:400;margin-right:6px}\n.ezg-widget .step strong{color:var(--ink)}\n.ezg-widget .foot{margin-top:18px;font-size:.75rem;color:var(--sub);text-align:center}\n@media (prefers-reduced-motion: reduce){.ezg-widget .ttl .wig{animation:ezg-none}}\n.ezg-widget .hdr{margin-bottom:30px}\n.ezg-widget{container:ezg/inline-size;border-radius:22px;padding:4px 0;line-height:1.5}\n.ezg-widget .wrap{padding:22px 14px 26px}\n.ezg-widget button,.ezg-widget select{font-family:inherit;line-height:1.2;margin:0}\n.ezg-widget p{margin:0}\n.ezg-widget .ttl{border:0;padding:0;background:none}\n\n";document.head.appendChild(st);
host["inner"+"HTML"]="<div class=\"ezg-widget\"><div class=\"wrap\">\n  <div class=\"hdr\">\n    <div>\n      <span class=\"kicker\">WIGGLE × MORPH</span>\n      <div class=\"ttl\">たのしい<span class=\"wig\">お</span><span class=\"wig\">絵</span><span class=\"wig\">描</span><span class=\"wig\">き</span></div>\n    </div>\n    <p class=\"lead\">描いた線がぐにゃぐにゃ動き出して、<b>何か</b>が現れます。線の長さは変わらないので、<b>たくさん描くほど完成に近づきます</b>。</p>\n  </div>\n\n  <div class=\"layout\">\n    <div class=\"book\">\n      <div class=\"cv\">\n        <canvas id=\"ezg-cv\" aria-label=\"お絵描きキャンバス\"></canvas>\n        <div class=\"stamp\" id=\"ezg-stamp\"><div><small>完成度</small><span id=\"ezg-pct\">0%</span></div></div>\n      </div>\n      <div class=\"status\" id=\"ezg-statusRow\"><span class=\"dot\"></span><span id=\"ezg-msg\">ペンで描いてみよう</span><div class=\"meter\"><i id=\"ezg-bar\"></i></div></div>\n    </div>\n\n    <aside class=\"dock\">\n      <div class=\"sec\"><div class=\"sh\">COLOR</div><div class=\"row\" id=\"ezg-colors\"></div></div>\n      <div class=\"sec\"><div class=\"sh\">SIZE</div><div class=\"row\" id=\"ezg-sizes\"></div></div>\n      <div class=\"sec full\">\n        <div class=\"sh\">待ち時間</div>\n        <select id=\"ezg-idle\">\n          <option value=\"2\">2秒で変形</option><option value=\"3\" selected>3秒で変形</option>\n          <option value=\"5\">5秒で変形</option><option value=\"8\">8秒で変形</option><option value=\"0\">自動で変形しない</option>\n        </select>\n      </div>\n      <div class=\"btns sec full\">\n        <button class=\"btn primary\" id=\"ezg-go\">すぐ変形！</button>\n        <button class=\"btn\" id=\"ezg-more\" disabled>続きを描く</button>\n        <button class=\"btn\" id=\"ezg-undo\">1つ戻す</button>\n        <button class=\"btn\" id=\"ezg-guide\">お手本</button>\n        <button class=\"btn\" id=\"ezg-clear\">ぜんぶ消す</button>\n      </div>\n    </aside>\n  </div>\n\n  <section class=\"how\">\n    <div class=\"step\"><b>1</b><strong>描く</strong>　好きな線を描くと、線がぷるぷる揺れます。</div>\n    <div class=\"step\"><b>2</b><strong>待つ</strong>　手を止めると、線が切れずに、顔から順に一筆書きの謎ノ美兎へ寄っていきます。</div>\n    <div class=\"step\"><b>3</b><strong>邪魔する</strong>　変形中に触ると線を押しのけられます。でも線は戻っていきます。</div>\n  </section>\n  <p class=\"foot\">目標の線画は試作用の仮トレースです</p>\n</div></div>";
})();

(function(){
const TARGET = window.MITO_ASSETS.polylines;
const W = 640, H = 480;
const COLORS = ['#1f1b2e','#ff4f8b','#3a5bff','#00a676','#ff7a1a','#8b5cf6'];
const SIZES = [3,6,10];
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const BOIL_AMP = reduce ? 0.6 : 1.8;

const cv = document.getElementById('ezg-cv'), ctx = cv.getContext('2d');
const msg = document.getElementById('ezg-msg'), bar = document.getElementById('ezg-bar');
const goBtn = document.getElementById('ezg-go'), moreBtn = document.getElementById('ezg-more');
const idleSel = document.getElementById('ezg-idle'), guideBtn = document.getElementById('ezg-guide');
const stamp = document.getElementById('ezg-stamp'), pctEl = document.getElementById('ezg-pct'), statusRow = document.getElementById('ezg-statusRow');

let color = COLORS[0], size = SIZES[1];
let strokes = [];          // {color,size,pts:[[x,y]],rs:[[x,y]]}
let cur = null;            // stroke being drawn
let mode = 'draw';         // 'draw' | 'morph'
let lastInput = performance.now();
let showGuide = false;
let parts = null;          // morph particles (Float32 arrays)
let morphT = 0, settled = false;
let pointer = {down:false, x:0, y:0, px:0, py:0, active:false};

// ---------- UI ----------
const cWrap = document.getElementById('ezg-colors');
COLORS.forEach((c,i)=>{ const b=document.createElement('button'); b.className='sw'+(i===0?' on':'');
  b.style.background=c; b.setAttribute('aria-label','色 '+(i+1));
  b.onclick=()=>{color=c; [...cWrap.querySelectorAll('.sw')].forEach(x=>x.classList.remove('on')); b.classList.add('on');};
  cWrap.appendChild(b); });
const sWrap = document.getElementById('ezg-sizes');
SIZES.forEach((s,i)=>{ const b=document.createElement('button'); b.className='sz'+(i===1?' on':'');
  b.setAttribute('aria-label','太さ '+s); const d=document.createElement('b'); d.style.width=d.style.height=(s+3)+'px'; b.appendChild(d);
  b.onclick=()=>{size=s; [...sWrap.querySelectorAll('.sz')].forEach(x=>x.classList.remove('on')); b.classList.add('on');};
  sWrap.appendChild(b); });
goBtn.onclick = ()=>{ if(strokes.length) startMorph(); };
moreBtn.onclick = ()=>{ if(mode==='morph') freeze(); };
document.getElementById('ezg-undo').onclick = ()=>{ if(mode==='morph') freeze(); strokes.pop(); touch(); };
document.getElementById('ezg-clear').onclick = ()=>{ strokes=[]; parts=null; mode='draw'; touch(); };
guideBtn.onclick = ()=>{ showGuide=!showGuide; guideBtn.classList.toggle('on',showGuide); };
idleSel.onchange = touch;
function touch(){ lastInput = performance.now(); updateButtons(); }
function updateButtons(){
  goBtn.disabled = !strokes.length || mode==='morph';
  moreBtn.disabled = mode!=='morph';
  cv.classList.toggle('disturb', mode==='morph');
  statusRow.classList.toggle('morph', mode==='morph');
  if(mode!=='morph') stamp.classList.remove('show');
}

// ---------- canvas sizing ----------
let scale = 1, dpr = 1;
function resize(){
  const r = cv.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio||1, 2);
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr); scale = cv.width / W;
}
new ResizeObserver(resize).observe(cv); resize();
function toLocal(e){ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*W, (e.clientY-r.top)/r.height*H]; }

// ---------- geometry helpers ----------
function polyLen(p){ let L=0; for(let i=1;i<p.length;i++) L+=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]); return L; }
function resample(p, n){            // n points evenly along polyline p
  if(p.length===1){ const o=[]; for(let i=0;i<n;i++) o.push([p[0][0],p[0][1]]); return o; }
  const L=polyLen(p), out=[]; let seg=1, acc=0, segLen=Math.hypot(p[1][0]-p[0][0],p[1][1]-p[0][1]);
  for(let i=0;i<n;i++){
    const d = n===1?0:L*i/(n-1);
    while(seg<p.length-1 && acc+segLen<d){ acc+=segLen; seg++; segLen=Math.hypot(p[seg][0]-p[seg-1][0],p[seg][1]-p[seg-1][1]); }
    const t = segLen>0? Math.min(1,(d-acc)/segLen):0, a=p[seg-1], b=p[seg];
    out.push([a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]);
  }
  return out;
}
function rsOf(p){ const L=polyLen(p); return resample(p, Math.max(2, Math.round(L/4)+1)); }

// target: cumulative arc length across all paths (gaps between paths are not counted)
const tSeg = []; let tLen = 0;
TARGET.forEach((p,pi)=>{ for(let i=1;i<p.length;i++){ const l=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);
  tSeg.push({a:p[i-1],b:p[i],s:tLen,l:l,pi:pi}); tLen+=l; } });
function targetAt(f){
  const d = Math.max(0,Math.min(1,f))*tLen; let lo=0, hi=tSeg.length-1;
  while(lo<hi){ const m=(lo+hi+1)>>1; if(tSeg[m].s<=d) lo=m; else hi=m-1; }
  const s=tSeg[lo], t=s.l>0?Math.min(1,(d-s.s)/s.l):0;
  return [s.a[0]+(s.b[0]-s.a[0])*t, s.a[1]+(s.b[1]-s.a[1])*t, s.pi];
}

// ---------- pseudo random ----------
function sn(i, j){ const c=Math.floor(i/6), f=i/6-c, u=f*f*(3-2*f); return hash(c,j)*(1-u)+hash(c+1,j)*u; }
function hash(i, j){ let h = (i*374761393 + j*668265263) | 0; h = (h ^ (h>>>13)) * 1274126177 | 0; h ^= h>>>16; return ((h>>>0)/4294967296)*2-1; }

// ---------- morph ----------
// target sampled at fixed spacing S. Each user point takes exactly one free sample,
// so the drawn line keeps its length: a short drawing only fills part of the figure.
const S = 4;
// The target is turned into ONE continuous line (一筆書き): starting at the face, it hops to the
// nearest unused part (preferring parts near the face) and the hop itself is drawn as a short
// connecting line. A user stroke then slides onto a stretch of this line and is never cut.
const FACE = (()=>{ let sx=0,sy=0,n=0; TARGET.forEach(p=>p.forEach(q=>{ sx+=q[0]; sy+=q[1]; n++; })); return n?[sx/n,sy/n]:[320,240]; })();
// ブログ版は道順を手で並べた表を持っていた。ここでは顔の中心から近い線を順にたどって道順を作る
const ORDER = (()=>{ const used=new Uint8Array(TARGET.length), out=[]; let at=FACE;
  for (let k=0;k<TARGET.length;k++){ let best=-1, bd=1e18, br=0;
    TARGET.forEach((p,i)=>{ if(used[i]||p.length<2) return; const a=p[0], b=p[p.length-1];
      const da=(a[0]-at[0])**2+(a[1]-at[1])**2, db=(b[0]-at[0])**2+(b[1]-at[1])**2;
      if (da<bd){ bd=da; best=i; br=0; } if (db<bd){ bd=db; best=i; br=1; } });
    if (best<0) break; used[best]=1; out.push([best,br]); const p=TARGET[best]; at = br ? p[0] : p[p.length-1]; }
  return out; })();   // [pathIndex, reversed] — precomputed: face parts first, short hops
const TS = (function(){
  const x=[], y=[], c=[];
  const add=(seg,flag)=>{ const n=Math.max(2, Math.round(polyLen(seg)/S)+1);
    resample(seg,n).forEach((q,i)=>{ if(x.length && i===0) return; x.push(q[0]); y.push(q[1]); c.push(flag); }); };
  let at=null;
  ORDER.forEach(([pi,rev])=>{ const path = rev ? TARGET[pi].slice().reverse() : TARGET[pi];
    if(at && Math.hypot(path[0][0]-at[0], path[0][1]-at[1])>0.5) add([at, path[0]], 1);   // connecting line
    add(path, 0); at = path[path.length-1]; });
  return {x, y, c, p:x.map(()=>0), n:x.length};
})();
const TLINE = (function(){ const o=[]; for(let i=0;i<TS.n;i++) o.push([TS.x[i],TS.y[i]]); return o; })();
let coverage = 0;
function startMorph(){
  if(cur){ finishStroke(); }
  if(!strokes.length) return;
  const occ = new Uint8Array(TS.n); let used=0, layers=0;
  const plans = strokes.map(s=>{
    const n = Math.max(2, Math.round(polyLen(s.pts)/S)+1);
    return {s, n, pts: resample(s.pts, n)};
  });
  const N = plans.reduce((a,b)=>a+b.n,0);
  const P = { n:N, x:new Float32Array(N), y:new Float32Array(N), vx:new Float32Array(N), vy:new Float32Array(N),
    tx:new Float32Array(N), ty:new Float32Array(N), tp:new Int32Array(N), delay:new Float32Array(N), runs:[],
    sx:new Float32Array(N), sy:new Float32Array(N), tc:new Uint8Array(N), ox:new Float32Array(N), oy:new Float32Array(N), end:0 };
  let k=0, gap=0;
  plans.forEach((pl,si)=>{
    if(used>=TS.n){ occ.fill(0); used=0; layers++; }
    // fill in face-first order; flip the stroke if its tail is closer to where it starts
    let j = 0; while(occ[j]) j++;
    let pts = pl.pts;
    const dA=(pl.pts[0][0]-TS.x[j])**2+(pl.pts[0][1]-TS.y[j])**2, dB=(pl.pts[pl.n-1][0]-TS.x[j])**2+(pl.pts[pl.n-1][1]-TS.y[j])**2;
    if(dB<dA) pts = pl.pts.slice().reverse();
    const start=k, sDelay = 0.9*si/Math.max(1,plans.length-1);
    let prev=-2;
    for(let i=0;i<pl.n;i++){
      if(used>=TS.n){ occ.fill(0); used=0; layers++; }
      while(occ[j]) j=(j+1)%TS.n;
      if(!(j===prev+1 && TS.p[j]===TS.p[prev])) gap++;
      occ[j]=1; used++;
      P.x[k]=pts[i][0]; P.y[k]=pts[i][1]; P.tx[k]=TS.x[j]; P.ty[k]=TS.y[j]; P.tp[k]=gap; P.tc[k]=(TS.c[j] && TS.c[(j+1)%TS.n]) || (TS.c[j] && TS.c[(j+TS.n-1)%TS.n]) ? 1 : 0;
      P.sx[k]=pts[i][0]; P.sy[k]=pts[i][1];
      P.delay[k] = 0.2 + sDelay + 0.35*i/pl.n;   // smooth along the line, no per-point noise
      prev=j; j=(j+1)%TS.n; k++;
    }
    P.runs.push({start, end:k, color:pl.s.color, size:pl.s.size});
  });
  for(let i=0;i<N;i++) P.end=Math.max(P.end,P.delay[i]+DUR);
  coverage = Math.min(100, Math.round((layers*TS.n+used)/TS.n*100));
  parts = P; morphT = 0; settled = false; mode = 'morph'; updateButtons();
  msg.textContent = '変形中…　触ると邪魔できます';
}
function freeze(){   // current shapes become ordinary strokes again (split where lines are hidden)
  if(!parts) return;
  const P=parts; strokes=[];
  P.runs.forEach(r=>{ let pts=[];
    for(let i=r.start;i<r.end;i++){
      if(i>r.start && P.tp[i]!==P.tp[i-1] && progressOf(i)>0.5){ if(pts.length) strokes.push({color:r.color,size:r.size,pts,rs:rsOf(pts)}); pts=[]; }
      pts.push([P.x[i],P.y[i]]);
    }
    if(pts.length) strokes.push({color:r.color,size:r.size,pts,rs:rsOf(pts)});
  });
  parts=null; mode='draw'; touch(); msg.textContent='続きを描いてね（描いた分だけ完成に近づきます）';
}
const DUR = 1.6;   // seconds each point takes to travel
function ease(x){ return x<=0?0: x>=1?1: (x<0.5? 4*x*x*x : 1-Math.pow(-2*x+2,3)/2); }
function progressOf(i){ return ease((morphT - parts.delay[i]) / DUR); }

// position = smooth eased path from start to target + a springy offset that only the pointer disturbs
function step(dt){
  if(mode!=='morph' || !parts) return;
  morphT += dt;
  const P=parts, K=60, C=11, R=70;
  let disturbed = 0;
  const px=pointer.x, py=pointer.y, pvx=(pointer.x-pointer.px)/Math.max(dt,1e-3), pvy=(pointer.y-pointer.py)/Math.max(dt,1e-3);
  for(let i=0;i<P.n;i++){
    const e = progressOf(i);
    const bx = P.sx[i] + (P.tx[i]-P.sx[i])*e, by = P.sy[i] + (P.ty[i]-P.sy[i])*e;
    let ax = -K*P.ox[i] - C*P.vx[i], ay = -K*P.oy[i] - C*P.vy[i];
    if(pointer.down){
      const dx=bx+P.ox[i]-px, dy=by+P.oy[i]-py, d2=dx*dx+dy*dy;
      if(d2<R*R){ const d=Math.sqrt(d2)+0.01, f=(1-d/R);
        ax += dx/d*f*f*9000; ay += dy/d*f*f*9000;
        ax += pvx*f*6; ay += pvy*f*6; }
    }
    P.vx[i]+=ax*dt; P.vy[i]+=ay*dt; P.ox[i]+=P.vx[i]*dt; P.oy[i]+=P.vy[i]*dt;
    P.x[i]=bx+P.ox[i]; P.y[i]=by+P.oy[i];
    if(Math.abs(P.ox[i])+Math.abs(P.oy[i])>1.5) disturbed++;
  }
  pointer.px=pointer.x; pointer.py=pointer.y;
  const done = morphT>=P.end && disturbed===0;
  if(!settled && done){ settled=true; pctEl.textContent=coverage+'%'; stamp.classList.add('show'); msg.textContent = coverage>=100 ? '謎ノ美兎になりました！ 触ると崩せます' : '「続きを描く」で描き足すと完成に近づきます'; }
  else if(settled && disturbed>P.n*0.02){ settled=false; stamp.classList.remove('show'); msg.textContent='戻ろうとしています…'; }
}

// ---------- render ----------
let boil = 0;
function render(){
  ctx.setTransform(1,0,0,1,0,0);
  ctx.fillStyle = '#fffaf0'; ctx.fillRect(0,0,cv.width,cv.height);
  ctx.setTransform(scale,0,0,scale,0,0);
  ctx.fillStyle='rgba(58,91,255,.13)'; for(let gx=20;gx<W;gx+=20) for(let gy=20;gy<H;gy+=20) ctx.fillRect(gx-0.8,gy-0.8,1.6,1.6);
  ctx.lineCap='round'; ctx.lineJoin='round';
  if(showGuide){
    ctx.strokeStyle='rgba(255,79,139,.22)'; ctx.lineWidth=3;
    ctx.beginPath(); TLINE.forEach((q,i)=> i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])); ctx.stroke();
  }
  const amp = BOIL_AMP;
  if(mode==='draw'){
    const all = cur? strokes.concat([cur]) : strokes;
    all.forEach((s,si)=>{
      const p = s.rs || rsOf(s.pts);
      ctx.strokeStyle=s.color; ctx.fillStyle=s.color; ctx.lineWidth=s.size;
      if(p.length<2 || polyLen(p)<1){ ctx.beginPath(); ctx.arc(p[0][0]+hash(si*997,boil)*amp, p[0][1]+hash(si*991,boil+5)*amp, s.size/2,0,Math.PI*2); ctx.fill(); return; }
      ctx.beginPath();
      p.forEach((q,i)=>{ const x=q[0]+sn(si*600+i,boil)*amp, y=q[1]+sn(si*600+i+300000,boil+7)*amp; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
      ctx.stroke();
    });
  } else if(parts){
    const P=parts;
    P.runs.forEach(r=>{
      ctx.strokeStyle=r.color; ctx.lineWidth=r.size;
      ctx.globalAlpha=1; ctx.beginPath(); let open=false;
      const fades=[];
      for(let i=r.start+1;i<r.end;i++){
        let a=1;
        if(P.tp[i]!==P.tp[i-1]){ const m=Math.min(progressOf(i), progressOf(i-1)); a = 1 - Math.min(1, m*2.5); }
        const x0=P.x[i-1]+sn(i-1,boil)*amp, y0=P.y[i-1]+sn(i-1+300000,boil+7)*amp;
        const x1=P.x[i]+sn(i,boil)*amp, y1=P.y[i]+sn(i+300000,boil+7)*amp;
        // connecting lines stay attached but turn thin and faint, so the figure reads clearly
        let wmul=1;
        if(P.tc[i] && P.tc[i-1]){ const m=Math.min(progressOf(i), progressOf(i-1)); a*=1-0.65*m; wmul=1-0.6*m; }
        if(a>=0.999){ if(!open){ ctx.moveTo(x0,y0); open=true; } ctx.lineTo(x1,y1); }
        else { open=false; if(a>0.01) fades.push([x0,y0,x1,y1,a,wmul]); }
      }
      ctx.stroke();
      fades.forEach(f=>{ ctx.globalAlpha=f[4]; ctx.lineWidth=r.size*(f[5]||1); ctx.beginPath(); ctx.moveTo(f[0],f[1]); ctx.lineTo(f[2],f[3]); ctx.stroke(); });
      ctx.globalAlpha=1;
    });
    if(pointer.down){ ctx.strokeStyle='rgba(58,91,255,.45)'; ctx.lineWidth=2; ctx.setLineDash([6,6]); ctx.beginPath(); ctx.arc(pointer.x,pointer.y,70,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); }
  }
}

// ---------- input ----------
function finishStroke(){ if(!cur) return; cur.rs = rsOf(cur.pts); strokes.push(cur); cur=null; touch(); }
cv.addEventListener('pointerdown', e=>{
  e.preventDefault(); cv.setPointerCapture(e.pointerId);
  const [x,y]=toLocal(e);
  pointer.down=true; pointer.x=pointer.px=x; pointer.y=pointer.py=y;
  if(mode==='draw'){ cur={color,size,pts:[[x,y]],rs:null}; msg.textContent='描いています…'; }
  touch();
});
cv.addEventListener('pointermove', e=>{
  if(!pointer.down) return;
  const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
  (evs.length?evs:[e]).forEach(ev=>{
    const [x,y]=toLocal(ev); pointer.x=x; pointer.y=y;
    if(cur){ const l=cur.pts[cur.pts.length-1]; if(Math.hypot(x-l[0],y-l[1])>1.5){ cur.pts.push([x,y]); cur.rs=null; } }
  });
  if(cur && cur.pts.length%6===0) cur.rs = rsOf(cur.pts);
  if(mode==='draw') touch();
});
function up(){ if(!pointer.down) return; pointer.down=false; if(cur){ finishStroke(); msg.textContent='手を止めると変形が始まります'; } }
cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('lostpointercapture', up);

// ---------- loop ----------
let last = performance.now(), boilClock = 0;
function frame(now){
  const dt = Math.min(0.033, (now-last)/1000); last = now;
  boilClock += dt; if(boilClock > 1/10){ boilClock = 0; boil = (boil+1)%3; }
  // fixed substeps for stable springs
  const n = 2; for(let i=0;i<n;i++) step(dt/n);
  // idle countdown
  const idle = +idleSel.value;
  if(mode==='draw' && strokes.length && !pointer.down && idle>0){
    const f = (now-lastInput)/1000/idle;
    bar.style.width = Math.min(100,f*100)+'%';
    if(f>=1){ bar.style.width='0'; startMorph(); }
  } else bar.style.width='0';
  render();
  requestAnimationFrame(frame);
}
updateButtons();
requestAnimationFrame(frame);
})();
