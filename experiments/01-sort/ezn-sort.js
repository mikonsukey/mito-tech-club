/* mito-tech-club 版：謎ノ美兎の画像データは含めていません。顔のデータは window.MITO_ASSETS（lib/mito-assets.js）から読みます。 */
/*!
 * 謎ノ美兎ソート (ezn-sort.js)
 * 使い方: <div id="ezn-sort" class="ezn-widget"></div>（このファイルを script タグで読み込む）
 * 画像はブラウザ内だけで処理されます。
 */
(()=>{
"use strict";
const root = document.getElementById("ezn-sort");
if (!root || root.dataset.eznReady) return;
root.dataset.eznReady = "1";
const B_TONE = window.MITO_ASSETS.tone;

// ------------------------------------------------------------ スタイル（#ezn-sort の中だけに効く）
const css = `
#ezn-sort{--ezn-paper:#fbf6ea;--ezn-ink:#16130f;--ezn-red:#d8261c;--ezn-mute:#6f675a;max-width:640px;margin:0 auto;color:var(--ezn-ink);font-family:system-ui,-apple-system,"Hiragino Sans","Noto Sans JP","Yu Gothic",sans-serif;line-height:1.5}
#ezn-sort *{box-sizing:border-box}
#ezn-sort .ezn-stage{background:#16130f;border-radius:14px;padding:8px}
#ezn-sort canvas{display:block;width:100%;height:auto;border-radius:6px;background:#111}
#ezn-sort .ezn-btn{display:block;width:100%;margin:12px 0 0;padding:15px 10px;border:0;border-radius:6px;background:var(--ezn-red);color:#fff;font-family:inherit;font-weight:800;font-size:17px;line-height:1.3;cursor:pointer;box-shadow:none}
#ezn-sort .ezn-row{display:flex;gap:8px;margin-top:10px;flex-wrap:nowrap}
#ezn-sort .ezn-row>*{flex:1 1 0;min-width:0}
#ezn-sort .ezn-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
#ezn-sort .ezn-grid>*{min-width:0}
#ezn-sort .ezn-sub{padding:11px 6px;border:2px solid var(--ezn-ink);border-radius:6px;background:transparent;color:var(--ezn-ink);font-family:inherit;font-weight:700;font-size:13px;line-height:1.3;cursor:pointer;margin:0}
#ezn-sort .ezn-sub[aria-pressed="true"]{background:var(--ezn-ink);color:#fff}
#ezn-sort select{width:100%;padding:10px 6px;border:2px solid var(--ezn-ink);border-radius:6px;background:var(--ezn-paper);color:var(--ezn-ink);font-family:inherit;font-weight:700;font-size:13px;line-height:1.3;margin:0}
#ezn-sort .ezn-slider{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:13px;font-weight:700}
#ezn-sort .ezn-slider input{flex:1;accent-color:var(--ezn-red);margin:0}
#ezn-sort .ezn-small{font-size:12px;color:var(--ezn-mute);line-height:1.75;margin-top:10px}
#ezn-sort .ezn-spec{position:relative;margin-top:10px;background:#000;border-radius:8px;overflow:hidden}
#ezn-sort .ezn-spec span{position:absolute;left:8px;top:6px;font:11px/1.4 ui-monospace,Menlo,Consolas,monospace;color:#fff;background:rgba(0,0,0,.6);padding:2px 6px;border-radius:3px}
`;
const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

root.innerHTML = `
<div class="ezn-stage"><canvas width="720" height="810" aria-label="4つのソートの進行"></canvas></div>
<button class="ezn-btn" data-a="load">画像を読み込む</button>
<input type="file" accept="image/*" hidden>
<div class="ezn-grid">
  <select data-p="0" aria-label="左上"></select><select data-p="1" aria-label="右上"></select>
  <select data-p="2" aria-label="左下"></select><select data-p="3" aria-label="右下"></select>
</div>
<div class="ezn-row">
  <button class="ezn-sub" data-a="run">■ 停止</button>
  <button class="ezn-sub" data-a="reset">↺ 最初から</button>
  <select data-a="sample" aria-label="サンプル">
    <option value="">サンプル画像…</option>
    <option value="pattern">模様（得意）</option>
    <option value="sunset">夕焼け（苦手）</option>
  </select>
</div>
<div class="ezn-slider"><span>速さ</span><input type="range" min="0" max="100" value="45" data-a="speed" aria-label="速さ"><span data-v="speed" style="width:5.5em;text-align:right"></span></div>
<div class="ezn-row">
  <button class="ezn-sub" data-a="sound" aria-pressed="false">♪ 音で聞く</button>
  <button class="ezn-sub" data-a="png">PNG保存</button>
  <button class="ezn-sub" data-a="rec">動画保存</button>
</div>
<div class="ezn-spec" hidden><canvas width="720" height="200" aria-label="いま鳴っている音のスペクトログラム"></canvas><span>いま鳴っている音のスペクトログラム（0〜11kHz）</span></div>
<p class="ezn-small" data-v="sndhint" hidden>選んだ画像（赤い枠。タップで切り替え）を、左から右へ読み取って音にしています。縦の位置が音の高さ、明るさが音の大きさです。並べ替えが進むと、下に流れる画像も謎ノ美兎に変わっていきます。動画保存すると、この音も入ります。</p>
<p class="ezn-small">画像はこの端末のブラウザ内だけで処理されます。各行の中だけで並べ替えるため、行ごとの明るさの偏りが大きい画像（空など）は顔が崩れます。</p>`;

const $ = s => root.querySelector(s);
const cv = $("canvas"), ctx = cv.getContext("2d");

// ------------------------------------------------------------ アルゴリズム定義
// イベント: [op, a, b]  op: 0=比較, 1=比較して交換, 2=書き込み(a←b), 3=粛清(a), 4=整列配置
const ALGOS = {
  bubble:   {name:"バブルソート"},
  insertion:{name:"挿入ソート"},
  quick:    {name:"クイックソート"},
  merge:    {name:"マージソート"},
  stalin:   {name:"スターリンソート"},
  parallel: {name:"並行世界ソート"},
  bogo:     {name:"ボゴソート"},
};
const DEFAULT = ["bubble","quick","stalin","parallel"];
root.querySelectorAll("select[data-p]").forEach((s,i)=>{
  s.innerHTML = Object.entries(ALGOS).map(([k,v])=>`<option value="${k}">${v.name}</option>`).join("");
  s.value = DEFAULT[i];
});

function genEvents(kind, row){
  const a = Array.from(row), n = a.length, ev = [];
  const cmp=(i,j)=>ev.push(0,i,j), swp=(i,j)=>{ ev.push(1,i,j); const t=a[i]; a[i]=a[j]; a[j]=t; };
  if (kind==="bubble"){
    for (let i=0;i<n;i++){ let sw=false; for (let j=0;j<n-1-i;j++){ if (a[j]>a[j+1]){ swp(j,j+1); sw=true; } else cmp(j,j+1); } if(!sw) break; }
  } else if (kind==="insertion"){
    for (let i=1;i<n;i++){ let j=i; while (j>0){ if (a[j-1]>a[j]){ swp(j-1,j); j--; } else { cmp(j-1,j); break; } } }
  } else if (kind==="quick"){
    const stack=[[0,n-1]];
    while (stack.length){
      const [lo,hi]=stack.pop(); if (lo>=hi) continue;
      const mid=(lo+hi)>>1; if (mid!==hi) swp(mid,hi);
      const piv=a[hi]; let i=lo;
      for (let j=lo;j<hi;j++){ if (a[j]<piv){ if (i!==j) swp(i,j); else cmp(j,hi); i++; } else cmp(j,hi); }
      if (i!==hi) swp(i,hi);
      stack.push([i+1,hi],[lo,i-1]);
    }
  } else if (kind==="merge"){
    for (let w=1; w<n; w*=2){
      for (let lo=0; lo<n; lo+=2*w){
        const mid=Math.min(lo+w,n), hi=Math.min(lo+2*w,n), L=a.slice(lo,mid), R=a.slice(mid,hi); let i=0,j=0,k=lo;
        while (i<L.length||j<R.length){ const v=(j>=R.length||(i<L.length&&L[i]<=R[j]))?L[i++]:R[j++]; ev.push(2,k,v); a[k++]=v; }
      }
    }
  } else if (kind==="stalin"){
    let last=a[0];
    for (let j=1;j<n;j++){ if (a[j]>=last){ ev.push(0,j,j); last=a[j]; } else ev.push(3,j,0); }
    ev.push(4,0,0);
  }
  return Int32Array.from(ev);
}

// ------------------------------------------------------------ 画像と対応づけ
let N = 96, A = null, perm = null, inv = null, FACE = null, FW = 0, FH = 0;
const lum = (r,g,b)=>0.299*r+0.587*g+0.114*b;
function grid(img, n){
  const c=document.createElement("canvas"); c.width=c.height=n; const g=c.getContext("2d");
  g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high"; g.fillStyle="#fff"; g.fillRect(0,0,n,n);
  const w=img.naturalWidth||img.width, h=img.naturalHeight||img.height, s=Math.min(w,h);
  g.drawImage(img,(w-s)/2,(h-s)/2,s,s,0,0,n,n); return g.getImageData(0,0,n,n).data;
}
let faceImg=null;
function prepare(img){
  const d=grid(img,N), b=grid(faceImg,N);
  A=new Uint8ClampedArray(N*N*3); perm=new Int16Array(N*N); inv=new Int16Array(N*N);
  for (let i=0;i<N*N;i++){ A[i*3]=d[i*4]; A[i*3+1]=d[i*4+1]; A[i*3+2]=d[i*4+2]; }
  const la=new Float32Array(N), bt=new Float32Array(N), ox=[...Array(N).keys()], oz=[...Array(N).keys()];
  for (let y=0;y<N;y++){
    for (let x=0;x<N;x++){ const i=y*N+x; la[x]=lum(d[i*4],d[i*4+1],d[i*4+2]); bt[x]=b[i*4]; ox[x]=x; oz[x]=x; }
    ox.sort((p,q)=>la[p]-la[q]||p-q); oz.sort((p,q)=>bt[p]-bt[q]||p-q);
    for (let k=0;k<N;k++){ perm[y*N+ox[k]]=oz[k]; inv[y*N+oz[k]]=ox[k]; }
  }
}

// ------------------------------------------------------------ ペイン
const W=cv.width, P=350, G=8, M=6, LBL=48;
const paneXY = i => [M+(i%2)*(P+G), M+Math.floor(i/2)*(P+LBL+8)];
const off = document.createElement("canvas"), offc = off.getContext("2d");
let panes=[], startT=0, running=false, finishedOrder=0, rafId=0, speed=24;
const lfact = n => { let s=0; for (let k=2;k<=n;k++) s+=Math.log10(k); return s; };

function makePane(i, kind){
  const p={kind, keys:new Int16Array(N*N), ptr:new Int32Array(N), ev:[], cmp:0, swp:0, purged:0, done:false, rank:0, t:0, hl:new Int16Array(N*2).fill(-1), shuffles:0, worlds:0, flash:0};
  for (let i=0;i<N*N;i++) p.keys[i]=perm[i];
  if (["bubble","insertion","quick","merge","stalin"].includes(kind))
    for (let y=0;y<N;y++) p.ev.push(genEvents(kind, p.keys.subarray(y*N,(y+1)*N)));
  return p;
}
function resetAll(autorun){
  panes = [...root.querySelectorAll("select[data-p]")].map((s,i)=>makePane(i,s.value));
  finishedOrder=0; startT=performance.now(); running=!!autorun; setRunLabel(); drawAll();
}
const shuffle = (arr,o,n)=>{ for (let i=n-1;i>0;i--){ const j=(Math.random()*(i+1))|0, t=arr[o+i]; arr[o+i]=arr[o+j]; arr[o+j]=t; } };

function stepPane(p, steps){
  if (p.done) return;
  const k=p.kind;
  if (k==="bogo"){
    for (let y=0;y<N;y++) shuffle(p.keys,y*N,N);
    p.shuffles++; p.cmp += N*(N-1);  // 判定のための比較
    return;
  }
  if (k==="parallel"){
    // 観測するたびに、整列していない世界を破棄する。0.9秒ほどで「整列済みの世界」に到着
    const el=(performance.now()-startT)/1000;
    if (el < 0.9){ for (let y=0;y<N;y++) shuffle(p.keys,y*N,N); p.worlds = el/0.9; p.flash = Math.random()<0.5?1:0; return; }
    for (let y=0;y<N;y++) for (let c=0;c<N;c++) p.keys[y*N+c]=c;
    p.worlds=1; p.flash=0; finish(p); return;
  }
  let alldone=true;
  for (let y=0;y<N;y++){
    const ev=p.ev[y], o=y*N; let q=p.ptr[y]; p.hl[y*2]=-1; p.hl[y*2+1]=-1;
    for (let s=0; s<steps && q<ev.length; s++, q+=3){
      const op=ev[q], a=ev[q+1], b=ev[q+2];
      if (op===0){ p.cmp++; p.hl[y*2]=a; p.hl[y*2+1]=b; }
      else if (op===1){ p.cmp++; p.swp++; const t=p.keys[o+a]; p.keys[o+a]=p.keys[o+b]; p.keys[o+b]=t; p.hl[y*2]=a; p.hl[y*2+1]=b; }
      else if (op===2){ p.cmp++; p.swp++; p.keys[o+a]=b; p.hl[y*2]=a; }
      else if (op===3){ p.cmp++; p.purged++; p.keys[o+a]=-1; p.hl[y*2]=a; }
      else if (op===4){ const kept=[]; for (let c=0;c<N;c++) if (p.keys[o+c]>=0) kept.push(p.keys[o+c]); for (let c=0;c<N;c++) p.keys[o+c]=-1; for (const v of kept) p.keys[o+v]=v; }
    }
    p.ptr[y]=q; if (q<ev.length) alldone=false;
  }
  if (alldone){ p.hl.fill(-1); finish(p); }
}
function finish(p){ p.done=true; p.t=(performance.now()-startT)/1000; p.rank=++finishedOrder; }

// ------------------------------------------------------------ 描画
const fmt = n => Math.round(n).toLocaleString();
function drawPane(i){
  const p=panes[i], [x0,y0]=paneXY(i);
  off.width=off.height=N; const img=offc.createImageData(N,N), d=img.data;
  for (let y=0;y<N;y++) for (let c=0;c<N;c++){
    const k=p.keys[y*N+c], o=(y*N+c)*4;
    if (k<0){ d[o]=17; d[o+1]=17; d[o+2]=17; }
    else { const s=(y*N+inv[y*N+k])*3; d[o]=A[s]; d[o+1]=A[s+1]; d[o+2]=A[s+2]; }
    d[o+3]=255;
  }
  for (let y=0;y<N;y++) for (let h=0;h<2;h++){ const c=p.hl[y*2+h]; if (c>=0){ const o=(y*N+c)*4; d[o]=216; d[o+1]=38; d[o+2]=28; } }
  offc.putImageData(img,0,0);
  ctx.imageSmoothingEnabled=false; ctx.drawImage(off,x0,y0,P,P);
  if (soundOn && i===listen){ ctx.strokeStyle="#ff3b30"; ctx.lineWidth=4; ctx.strokeRect(x0+2,y0+2,P-4,P-4); }
  if (p.flash){ ctx.fillStyle="rgba(255,255,255,0.55)"; ctx.fillRect(x0,y0,P,P); }
  // ラベル
  ctx.fillStyle="#16130f"; ctx.fillRect(x0,y0+P,P,LBL);
  ctx.fillStyle="#f3eee4"; ctx.font="800 16px system-ui,'Hiragino Sans','Noto Sans JP',sans-serif"; ctx.textBaseline="top";
  ctx.fillText(ALGOS[p.kind].name, x0+2, y0+P+5);
  ctx.textAlign="right";
  if (p.done){ ctx.fillStyle = p.rank===1?"#ff5a4f":"#f3eee4"; ctx.fillText(`${p.rank}着 ${p.t.toFixed(2)}秒`, x0+P-2, y0+P+5); }
  else if (p.kind==="bogo" && running){ ctx.fillStyle="#8d887e"; ctx.fillText("終わりません", x0+P-2, y0+P+5); }
  ctx.textAlign="left"; ctx.fillStyle="#a39e93"; ctx.font="12px ui-monospace,Menlo,Consolas,monospace";
  let line;
  if (p.kind==="stalin") line=`比較 ${fmt(p.cmp)}  粛清 ${fmt(p.purged)} / ${fmt(N*N)}`;
  else if (p.kind==="bogo") line=`シャッフル ${fmt(p.shuffles)}回  当たる確率 1/10^${fmt(lfact(N)*N)}`;
  else if (p.kind==="parallel") line= p.done ? `破棄した世界 約10^${fmt(lfact(N)*N)}個` : `破棄した世界 約10^${fmt(lfact(N)*N*p.worlds)}個`;
  else line=`比較 ${fmt(p.cmp)}  ${p.kind==="merge"?"書き込み":"交換"} ${fmt(p.swp)}`;
  ctx.fillText(line, x0+2, y0+P+28);
}
function drawAll(){ ctx.fillStyle="#16130f"; ctx.fillRect(0,0,W,cv.height); for (let i=0;i<panes.length;i++) drawPane(i); }

// ------------------------------------------------------------ 音（いまの画像を、左から右へ読み取って鳴らす）
// 行＝音の高さ（上ほど高い）、明るさ＝音の大きさ。スペクトログラムにすると、いまの画像がそのまま流れる
let soundOn=false, actx=null, recDest=null, proc=null, outGain=null, listen=0;
const SROWS=96, SCAN=1.6, F_LO=700, F_HI=9800;   // 行数・1枚を読み取る秒数・音の高さの範囲
const amp=new Float32Array(SROWS*N);              // 選んだペインの明るさ（行×列）
function sampleAmp(){
  const p=panes[listen]; if (!p||!A) return;
  for (let r=0;r<SROWS;r++) for (let c=0;c<N;c++){
    const y=Math.floor(r*N/SROWS), k=p.keys[y*N+c]; let v=0; if (k>=0){ const q=(y*N+inv[y*N+k])*3; v=lum(A[q],A[q+1],A[q+2])/255; } amp[r*N+c]=(p.flash?0.4:1)*Math.pow(v,1.7);
  }
}
function startSound(){
  if (!actx) actx=new (window.AudioContext||window.webkitAudioContext)();
  if (actx.state==="suspended") actx.resume();
  if (proc) return;
  const sr=actx.sampleRate, w=new Float64Array(SROWS), ph=new Float64Array(SROWS); let pos=0;
  for (let r=0;r<SROWS;r++){ w[r]=2*Math.PI*(F_HI-(F_HI-F_LO)*r/(SROWS-1))/sr; ph[r]=Math.random()*6.283; }
  proc=actx.createScriptProcessor(1024,0,1); outGain=actx.createGain(); outGain.gain.value=0.9;
  const NF=2048, ring=new Float32Array(NF), win=new Float32Array(NF), re=new Float64Array(NF), im=new Float64Array(NF), kMax=Math.floor(11000/(sr/2)*(NF/2)); let rp=0;
  for (let i=0;i<NF;i++) win[i]=0.5-0.5*Math.cos(2*Math.PI*i/NF);
  proc.onaudioprocess=e=>{
    const out=e.outputBuffer.getChannelData(0), step=N/(SCAN*sr);
    sampleAmp();
    for (let i=0;i<out.length;i++){
      const x=pos, c0=Math.floor(x), fr=x-c0, c1=(c0+1)%N; let v=0;
      for (let r=0;r<SROWS;r++){ const a=amp[r*N+c0]*(1-fr)+amp[r*N+c1]*fr; if (a>1e-4) v+=a*Math.sin(ph[r]); ph[r]+=w[r]; }
      out[i]=v*0.04; pos+=step; if (pos>=N) pos-=N; ring[rp]=out[i]; rp=(rp+1)%NF;
    }
    for (let r=0;r<SROWS;r++) ph[r]%=6.283185307;
    // いま作った音を、そのまま周波数に分けてスペクトログラムの1列にする
    for (let i=0;i<NF;i++){ re[i]=ring[(rp+i)%NF]*win[i]; im[i]=0; } fft(re,im);
    const col=new Float32Array(kMax); for (let k=0;k<kMax;k++) col[k]=20*Math.log10(Math.hypot(re[k],im[k])+1e-9);
    cols.push(col); if (cols.length>400) cols.shift();
  };
  proc.connect(outGain); outGain.connect(actx.destination); if (recDest) outGain.connect(recDest);
  specLoop();
}
function stopSound(){ if (proc){ proc.disconnect(); outGain.disconnect(); proc=null; } }
// いま鳴っている音のスペクトログラムを、右から左へ流す
const scv=root.querySelector(".ezn-spec canvas"), sctx=scv.getContext("2d"), cols=[];
function fft(re,im){ const n=re.length; for (let i=1,j=0;i<n;i++){ let b=n>>1; for (;j&b;b>>=1) j^=b; j^=b; if (i<j){ let t=re[i]; re[i]=re[j]; re[j]=t; t=im[i]; im[i]=im[j]; im[j]=t; } }
  for (let len=2;len<=n;len<<=1){ const a=-2*Math.PI/len, wr=Math.cos(a), wi=Math.sin(a);
    for (let i=0;i<n;i+=len){ let cr=1,ci=0; for (let j=0;j<len/2;j++){ const p=i+j, q=p+len/2, tr=re[q]*cr-im[q]*ci, ti=re[q]*ci+im[q]*cr; re[q]=re[p]-tr; im[q]=im[p]-ti; re[p]+=tr; im[p]+=ti; const t=cr*wr-ci*wi; ci=cr*wi+ci*wr; cr=t; } } } }
function specLoop(){
  if (!proc) return; requestAnimationFrame(specLoop);
  const Wd=scv.width, Hd=scv.height, dx=2; if (cols.length*dx>Wd) cols.splice(0,cols.length-Math.floor(Wd/dx)); const n=cols.length; if (!n) return;
  sctx.drawImage(scv,dx*n,0,Wd-dx*n,Hd,0,0,Wd-dx*n,Hd);
  const img=sctx.createImageData(dx*n,Hd), d=img.data, top=26, DR=70;
  for (let c=0;c<n;c++){ const col=cols[c], K=col.length;
    for (let py=0;py<Hd;py++){ const k=Math.round((1-py/(Hd-1))*(K-1)); let v=(col[k]-(top-DR))/DR; v=v<0?0:v>1?1:v; const g=Math.round(255*Math.pow(v,1.2));
      for (let x=0;x<dx;x++){ const o=(py*dx*n+c*dx+x)*4; d[o]=d[o+1]=d[o+2]=g; d[o+3]=255; } } }
  sctx.putImageData(img,Wd-dx*n,0); cols.length=0;
}
// ------------------------------------------------------------ ループ
let frame=0;
function loop(){
  rafId=requestAnimationFrame(loop);
  if (!running || !A) return;
  frame++;
  for (const p of panes) stepPane(p, speed);
  drawAll();
  if (panes.every(p=>p.done)){ running=false; setRunLabel(); }
  if (recStop && panes.every(p=>p.done||p.kind==="bogo") && performance.now()-lastDoneCheck()>1500) recStop();
}
let lastDone=0;
function lastDoneCheck(){ const ts=panes.filter(p=>p.done).map(p=>p.t); const m=ts.length?Math.max(...ts):0; return startT+m*1000; }

// ------------------------------------------------------------ 操作
function setRunLabel(){ const all=panes.length&&panes.every(p=>p.done); $('[data-a="run"]').textContent = running ? "■ 停止" : all ? "▶ もう一度" : "▶ 再開"; }
$('[data-a="run"]').onclick=()=>{ if (!A) return; if (!running && panes.every(p=>p.done)){ resetAll(true); return; } running=!running; setRunLabel(); };
$('[data-a="reset"]').onclick=()=>{ if (A) resetAll(true); };
root.querySelectorAll("select[data-p]").forEach(s=>s.onchange=()=>{ if (A) resetAll(true); });
const spd=$('[data-a="speed"]');
const setSpeed=()=>{ speed=Math.max(1,Math.round(Math.pow(10,(+spd.value)/100*2.6))); root.querySelector('[data-v="speed"]').textContent=`${speed}手/コマ`; };
spd.oninput=setSpeed; setSpeed();
$('[data-a="sound"]').onclick=e=>{ soundOn=!soundOn; e.target.setAttribute("aria-pressed",soundOn); e.target.textContent= soundOn?"■ 音を止める":"♪ 音で聞く";
  root.querySelector(".ezn-spec").hidden=!soundOn; $('[data-v="sndhint"]').hidden=!soundOn;
  if (soundOn){ sctx.fillStyle="#000"; sctx.fillRect(0,0,scv.width,scv.height); startSound(); } else stopSound(); drawAll(); };
// ペインをタップすると、聞く画像を切り替える
cv.addEventListener("click",e=>{ if (!soundOn) return; const r=cv.getBoundingClientRect(), x=(e.clientX-r.left)/r.width*W, y=(e.clientY-r.top)/r.height*cv.height;
  for (let i=0;i<panes.length;i++){ const [x0,y0]=paneXY(i); if (x>=x0&&x<x0+P&&y>=y0&&y<y0+P){ listen=i; drawAll(); } } });
function download(blob,name){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000); }
$('[data-a="png"]').onclick=()=>cv.toBlob(b=>download(b,"nazono-sort.png"),"image/png");
let recStop=null;
$('[data-a="rec"]').onclick=e=>{
  if (recStop) return;
  if (!window.MediaRecorder || !cv.captureStream){ e.target.textContent="動画非対応"; e.target.disabled=true; return; }
  const tracks=[...cv.captureStream(30).getVideoTracks()];
  if (soundOn){ if(!actx) actx=new (window.AudioContext||window.webkitAudioContext)(); recDest=actx.createMediaStreamDestination(); tracks.push(...recDest.stream.getAudioTracks()); if (outGain) outGain.connect(recDest); }
  const types=["video/mp4;codecs=avc1","video/mp4","video/webm;codecs=vp9","video/webm"], mt=types.find(t=>MediaRecorder.isTypeSupported(t))||"";
  let mr; try{ mr=new MediaRecorder(new MediaStream(tracks), mt?{mimeType:mt,videoBitsPerSecond:6e6}:{}); }catch(err){ e.target.textContent="動画非対応"; return; }
  const chunks=[]; mr.ondataavailable=ev=>{ if(ev.data.size) chunks.push(ev.data); };
  mr.onstop=()=>{ recStop=null; if (outGain&&recDest){ try{ outGain.disconnect(recDest); }catch(_){} } recDest=null; e.target.textContent="動画保存"; const ext=(mr.mimeType||"").includes("mp4")?"mp4":"webm"; download(new Blob(chunks,{type:mr.mimeType||"video/webm"}),"nazono-sort."+ext); };
  const t0=performance.now();
  recStop=()=>{ if (mr.state!=="inactive") mr.stop(); };
  setTimeout(()=>recStop&&recStop(), 30000);              // 最長30秒
  e.target.textContent="録画中…"; mr.start(); resetAll(true);
};

// 画像の入力
const fileIn=$('input[type="file"]');
$('[data-a="load"]').onclick=()=>fileIn.click();
function useImage(img){ prepare(img); resetAll(true); }
function loadFile(f){ if (!f||!f.type.startsWith("image/")) return; const u=URL.createObjectURL(f), im=new Image(); im.onload=()=>{ useImage(im); URL.revokeObjectURL(u); }; im.src=u; }
fileIn.onchange=e=>{ loadFile(e.target.files[0]); e.target.value=""; };
const stage=$(".ezn-stage");
["dragenter","dragover"].forEach(t=>stage.addEventListener(t,e=>e.preventDefault()));
stage.addEventListener("drop",e=>{ e.preventDefault(); loadFile(e.dataTransfer.files[0]); });
document.addEventListener("paste",e=>{ const it=[...(e.clipboardData?.items||[])].find(i=>i.type.startsWith("image/")); if (it) loadFile(it.getAsFile()); });

// サンプル画像（その場で描く）
function sample(kind){
  const S=384, c=document.createElement("canvas"); c.width=c.height=S; const g=c.getContext("2d");
  if (kind==="sunset"){
    const gr=g.createLinearGradient(0,0,0,S); gr.addColorStop(0,"#1f3a8a"); gr.addColorStop(.55,"#6b4a7a"); gr.addColorStop(1,"#e08a4a");
    g.fillStyle=gr; g.fillRect(0,0,S,S); g.fillStyle="#ffe9a8"; g.beginPath(); g.arc(292,232,46,0,7); g.fill();
    g.fillStyle="#2a1c3c"; g.beginPath(); g.moveTo(0,300); g.lineTo(90,195); g.lineTo(172,285); g.lineTo(248,225); g.lineTo(S,315); g.lineTo(S,S); g.lineTo(0,S); g.fill();
  } else {
    const gr=g.createLinearGradient(0,0,S,S); gr.addColorStop(0,"#101418"); gr.addColorStop(1,"#f4efe2"); g.fillStyle=gr; g.fillRect(0,0,S,S);
    const cols=["#d8261c","#1f6feb","#f2c14e","#2a9d8f","#16130f","#ffffff","#7a4fd1"]; let seed=7; const rnd=()=>((seed=(seed*16807)%2147483647)/2147483647);
    for (let i=0;i<70;i++){ g.globalAlpha=0.85; g.fillStyle=cols[i%cols.length]; g.beginPath(); g.arc(rnd()*S,rnd()*S,8+rnd()*38,0,7); g.fill(); }
    g.globalAlpha=1;
  }
  return c;
}
$('[data-a="sample"]').onchange=e=>{ if (e.target.value) useImage(sample(e.target.value)); e.target.value=""; };

// テスト・記事用フック
window.__eznSort = { panes:()=>panes, setSpeed:v=>{ spd.value=v; setSpeed(); }, setAlgos:a=>{ root.querySelectorAll("select[data-p]").forEach((s,i)=>s.value=a[i]); resetAll(true); }, sample:k=>useImage(sample(k)), useFile:loadFile, pause:()=>{ running=false; setRunLabel(); }, resume:()=>{ running=true; setRunLabel(); }, sound:()=>$('[data-a="sound"]').click(), listen:i=>{ listen=i; drawAll(); }, amp:()=>amp };

// 起動：画面に入ったら自動で走らせる
faceImg=new Image();
faceImg.onload=()=>{
  prepare(sample("pattern")); resetAll(false); loop();
  const io=new IntersectionObserver(es=>{ if (es.some(e=>e.isIntersecting)){ if (!running && finishedOrder===0){ resetAll(true); } io.disconnect(); } },{threshold:0.35});
  io.observe(cv);
};
faceImg.src=B_TONE;
})();
