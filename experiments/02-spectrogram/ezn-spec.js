/* mito-tech-club 版：謎ノ美兎の画像データは含めていません。顔のデータは window.MITO_ASSETS（lib/mito-assets.js）から読みます。 */
/*!
 * 謎ノ美兎スペクトログラム (ezn-spec.js)
 * 使い方: id="ezn-spec" の div を置いて、このファイルを読み込む。音声はブラウザ内だけで処理されます。
 */
(()=>{
const root=document.getElementById("ezn-spec");
if(!root||root.dataset.eznReady) return; root.dataset.eznReady="1";
const st=document.createElement("style"); st.textContent='#ezn-spec{--bg:#0e0e0d;--panel:#181816;--ink:#ebe7df;--mute:#8d887e;--line:#2c2b28;--red:#e0352b;margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,"Hiragino Sans","Noto Sans JP","Yu Gothic",sans-serif;-webkit-text-size-adjust:100%;max-width:640px;margin:0 auto;padding:16px 14px 20px;border-radius:14px;line-height:1.5}#ezn-spec button{margin:0;box-shadow:none;text-transform:none;letter-spacing:normal}#ezn-spec small{font-size:11px;font-weight:600;opacity:.8}#ezn-spec *{box-sizing:border-box}#ezn-spec .label{font-size:12px;letter-spacing:.08em;color:var(--mute);margin:18px 0 6px;font-weight:700}#ezn-spec .row{display:flex;gap:8px;flex-wrap:wrap}#ezn-spec button{font-family:inherit}#ezn-spec .btn{flex:1 1 0;min-width:0;padding:13px 8px;border:1.5px solid var(--ink);background:transparent;color:var(--ink);border-radius:6px;font-size:14px;font-weight:700;cursor:pointer}#ezn-spec .btn.primary{background:var(--red);border-color:var(--red);color:#fff}#ezn-spec .btn:disabled{opacity:.35;cursor:not-allowed}#ezn-spec .btn.rec{background:var(--red);border-color:var(--red);color:#fff;animation:eznsp-blink 1s steps(2) infinite}#ezn-spec .log{margin-top:10px;background:#000;border:1px solid var(--line);border-radius:6px;padding:10px 12px;font:12px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#bfbab0;height:132px;overflow:auto;white-space:pre-wrap}#ezn-spec .tabs{display:flex;margin-top:22px;border-bottom:1.5px solid var(--line)}#ezn-spec .tabs button{flex:1;padding:12px 6px;background:none;border:0;border-bottom:3px solid transparent;color:var(--mute);font-size:15px;font-weight:800;cursor:pointer}#ezn-spec .tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--red)}#ezn-spec .seg{display:flex;border:1.5px solid var(--ink);border-radius:6px;overflow:hidden;margin-top:12px}#ezn-spec .seg button{flex:1;padding:10px 6px;background:none;border:0;color:var(--ink);font-size:13px;font-weight:700;cursor:pointer;line-height:1.4}#ezn-spec .seg button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}#ezn-spec .cv{position:relative;margin-top:8px;background:#000;border:1px solid var(--line);border-radius:6px;overflow:hidden}#ezn-spec .cv canvas{display:block;width:100%;height:auto}#ezn-spec .cv .tag{position:absolute;left:8px;top:8px;font:11px/1 ui-monospace,Menlo,monospace;color:#fff;background:rgba(0,0,0,.6);padding:4px 6px;border-radius:3px}#ezn-spec .cv .ax{position:absolute;right:8px;font:10px/1.3 ui-monospace,Menlo,monospace;color:#9a958b;background:rgba(0,0,0,.55);padding:2px 5px;border-radius:3px}#ezn-spec .cv .ax.t{top:8px}#ezn-spec .cv .ax.b{bottom:8px}#ezn-spec .slider{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:13px;font-weight:700}#ezn-spec .slider input{flex:1;accent-color:var(--red)}#ezn-spec .hint{font-size:12px;color:var(--mute);line-height:1.75;margin-top:8px}#ezn-spec .note{margin-top:26px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--mute);line-height:1.8}#ezn-spec .slider .val{width:4.6em;text-align:right;font-variant-numeric:tabular-nums}#ezn-spec .cv.wave canvas{cursor:pointer;touch-action:none}#ezn-spec .check{display:flex;gap:10px;align-items:flex-start;margin-top:12px;font-size:13px;font-weight:700;line-height:1.6;cursor:pointer}#ezn-spec .check input{width:18px;height:18px;margin:2px 0 0;accent-color:var(--red);flex:none}#ezn-spec .more{margin-top:12px;border:1px solid var(--line);border-radius:6px;padding:0 12px}#ezn-spec .more .mbtn{display:block;width:100%;text-align:left;background:none;border:0;color:var(--ink);padding:12px 0;font-size:13px;font-weight:700;cursor:pointer}#ezn-spec .more .mbtn b{color:var(--red);margin-right:4px}#ezn-spec .more .mbody{padding-bottom:12px}#ezn-spec .hidden{display:none}@keyframes eznsp-blink{50%{opacity:.6}}'; document.head.appendChild(st);
root.innerHTML=`<div class="eznsp-in">
  <div class="label">1. 音を入れる</div>
  <div class="row">
    <button class="btn primary" id="eznsp-bRec">録音する</button>
    <button class="btn" id="eznsp-bFile">音声・動画ファイル</button>
    <button class="btn" id="eznsp-bSample">サンプル</button>
  </div>
  <input type="file" id="eznsp-file" accept="audio/*,video/*,.mp3,.m4a,.aac,.wav,.flac,.ogg,.opus,.mp4,.mov,.m4v,.3gp,.webm,video/quicktime" hidden>
  <div class="log" id="eznsp-log" aria-live="polite"></div>
  <div id="eznsp-trimBox" class="hidden">
    <div class="label">使う区間（最大20秒）</div>
    <div class="cv wave"><canvas id="eznsp-cWave" width="720" height="84"></canvas><span class="tag">全体（タップで区間を移動）</span></div>
    <div class="slider"><span>開始</span><input type="range" id="eznsp-rStart" min="0" max="0" step="0.1" value="0"><span class="val" id="eznsp-vStart">0:00.0</span></div>
    <div class="slider"><span>長さ</span><input type="range" id="eznsp-rLen" min="1" max="20" step="0.5" value="20"><span class="val" id="eznsp-vLen">20.0 秒</span></div>
  </div>

  <div class="tabs" role="tablist">
    <button role="tab" id="eznsp-tFace" aria-selected="true">顔を埋め込む</button>
    <button role="tab" id="eznsp-tPiano" aria-selected="false">声のない声</button>
  </div>

  <!-- ===== タブ1：顔を埋め込む ===== -->
  <section id="eznsp-pFace">
    <div class="seg" role="group" aria-label="埋め込み方">
      <button id="eznsp-mHide" aria-pressed="true">こっそり<br><small>小さく足す</small></button>
      <button id="eznsp-mPerm" aria-pressed="false">並べ替え<br><small>元の音で描く</small></button>
      <button id="eznsp-mStamp" aria-pressed="false">型押し<br><small>顔を押し付ける</small></button>
    </div>
    <div id="eznsp-hideOpts">
      <div class="seg" role="group" aria-label="見え方">
        <button id="eznsp-kConst" aria-pressed="false">一定<br><small>静かな音向け</small></button>
        <button id="eznsp-kAdapt" aria-pressed="false">音に合わせる<br><small>曲でも見える</small></button>
        <button id="eznsp-kPm" aria-pressed="true">足し引き<br><small>どんな音でも</small></button>
      </div>
      <div id="eznsp-constOpts" class="hidden">
        <div class="slider"><span>足す音の大きさ</span><input type="range" id="eznsp-rLvl" min="-80" max="-30" step="1" value="-58"><span class="val" id="eznsp-vLvl">-58 dB</span></div>
        <p class="hint">小さいほど気づかれにくく、顔は薄くなります。曲で顔が埋もれるときは「音に合わせる」か「足し引き」を。</p>
      </div>
      <div id="eznsp-adaptOpts" class="hidden">
        <div class="slider"><span>まわりの音との差</span><input type="range" id="eznsp-rRel" min="-6" max="18" step="1" value="6"><span class="val" id="eznsp-vRel">+6 dB</span></div>
        <label class="check"><input type="checkbox" id="eznsp-cCarve"><span>くっきりさせる<br><small>線のまわりだけ元の音を少し下げます</small></span></label>
        <p class="hint">まわりの音の大きさに合わせて足します。大きいほど見やすく、気づかれやすくなります。</p>
      </div>
      <div id="eznsp-pmOpts">
        <div class="slider"><span>線の強さ</span><input type="range" id="eznsp-rDepth" min="6" max="30" step="1" value="18"><span class="val" id="eznsp-vDepth">18 dB</span></div>
        <p class="hint">まばらな所は線を足して明るく、詰まった所は線の部分の音を下げて暗くします（元の音を一部書き換えます）。</p>
      </div>
    </div>
    <div id="eznsp-stampOpts" class="hidden">
      <div class="slider"><span>押す強さ</span><input type="range" id="eznsp-rSStr" min="10" max="100" step="5" value="100"><span class="val" id="eznsp-vSStr">100%</span></div>
      <div class="slider"><span>顔の音量（まわりとの差）</span><input type="range" id="eznsp-rSLvl" min="-15" max="9" step="1" value="4"><span class="val" id="eznsp-vSLvl">+4 dB</span></div>
      <div class="slider"><span>顔の明暗の幅</span><input type="range" id="eznsp-rSDR" min="15" max="60" step="5" value="50"><span class="val" id="eznsp-vSDR">50 dB</span></div>
      <div class="seg" role="group" aria-label="型押しの細かさ">
        <button id="eznsp-sFine" aria-pressed="true">細かい<br><small>くっきり</small></button>
        <button id="eznsp-sMid" aria-pressed="false">ふつう</button>
        <button id="eznsp-sCoarse" aria-pressed="false">粗い<br><small>耳に目立ちにくい</small></button>
      </div>
      <p class="hint">違和感が気になるときは「押す強さ」と「顔の音量」を下げるか、「粗い」に。顔は薄くなりますが、元の音に近づきます。</p>
    </div>
    <div class="more">
      <button class="mbtn" aria-expanded="false"><b>＋</b>顔の形と位置</button>
      <div class="mbody hidden">
      <div id="eznsp-hideArt">
        <div class="seg" role="group" aria-label="図柄">
          <button id="eznsp-aLine" aria-pressed="true">線画</button>
          <button id="eznsp-aTone" aria-pressed="false">明暗</button>
        </div>
        <div class="seg" role="group" aria-label="顔の細かさ">
          <button id="eznsp-dFine" aria-pressed="false">細かい<br><small>くっきり</small></button>
          <button id="eznsp-dMid" aria-pressed="true">ふつう</button>
          <button id="eznsp-dCoarse" aria-pressed="false">粗い<br><small>耳に目立ちにくい</small></button>
        </div>
        <div class="seg" role="group" aria-label="帯域">
          <button id="eznsp-bFull" aria-pressed="true">好きな場所に</button>
          <button id="eznsp-bHigh" aria-pressed="false">高音域 16kHz〜に並べる<br><small>ほぼ聞こえない・圧縮に弱い</small></button>
        </div>
      </div>
      <div id="eznsp-posOpts">
        <div class="slider"><span>大きさ</span><input type="range" id="eznsp-rSize" min="20" max="100" step="1" value="100"><span class="val" id="eznsp-vSize">100%</span></div>
        <div class="slider"><span>横の位置</span><input type="range" id="eznsp-rPx" min="0" max="100" step="1" value="50"><span class="val" id="eznsp-vPx">50</span></div>
        <div class="slider"><span>縦の位置</span><input type="range" id="eznsp-rPy" min="0" max="100" step="1" value="50"><span class="val" id="eznsp-vPy">50</span></div>
        <div class="slider"><span>並べる数</span><input type="range" id="eznsp-rRowN" min="1" max="24" step="1" value="1"><span class="val" id="eznsp-vRowN">1</span></div>
        <div id="eznsp-rowOpts" class="hidden">
          <div class="seg" role="group" aria-label="並べる向き">
            <button id="eznsp-dX" aria-pressed="true">横</button>
            <button id="eznsp-dY" aria-pressed="false">縦</button>
            <button id="eznsp-dXY" aria-pressed="false">ななめ</button>
            <button id="eznsp-dG" aria-pressed="false">敷き詰め</button>
          </div>
          <div class="slider"><span>ずらし幅</span><input type="range" id="eznsp-rGap" min="10" max="150" step="5" value="30"><span class="val" id="eznsp-vGap">30%</span></div>
          <label class="check"><input type="checkbox" id="eznsp-cFade" checked><span>奥の顔ほど薄くする</span></label>
        </div>
        <div class="row" style="margin-top:10px"><button class="btn" id="eznsp-bAuto">おまかせ配置（静かな場所へ）</button></div>
        <p class="hint">「元の音」の赤い枠が顔の場所です。上ほど高い音です。</p>
      </div>
      </div>
    </div>
    <div class="cv"><canvas id="eznsp-cIn" width="720" height="420"></canvas><span class="tag">元の音</span><span class="ax t">↑ 22 kHz</span><span class="ax b">0 Hz ・ 時間 →</span></div>
    <div class="cv"><canvas id="eznsp-cOut" width="720" height="420"></canvas><span class="tag" id="eznsp-tagOut">顔入りの音</span></div>
    <div class="row" style="margin-top:10px">
      <button class="btn" id="eznsp-pIn">▶ 元の音</button>
      <button class="btn primary" id="eznsp-pOut">▶ 顔入りの音</button>
      <button class="btn" id="eznsp-pAdd">▶ 足した音</button>
    </div>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="eznsp-sWav">WAV保存</button>
      <button class="btn" id="eznsp-sPng">PNG保存</button>
      <button class="btn" id="eznsp-sMov">動画保存</button>
    </div>
    <p class="hint">保存したWAVを、別のスペクトログラム表示アプリで開いても顔が出ます。MP3やAAC、SNSへの投稿などで圧縮されると、薄い顔や高音域の顔は消えることがあります。</p>
  </section>

  <!-- ===== タブ2：声のない声 ===== -->
  <section id="eznsp-pPiano" class="hidden">
    <div class="seg" role="group" aria-label="音色">
      <button id="eznsp-vPiano" aria-pressed="true">ピアノ<br><small>鍵盤を毎秒20回たたく</small></button>
      <button id="eznsp-vSine" aria-pressed="false">サイン波<br><small>純音だけを重ねる</small></button>
    </div>
    <div class="slider"><span>同時に鳴らす音</span><input type="range" id="eznsp-rPoly" min="4" max="32" step="1" value="16"><span id="eznsp-vPoly" style="width:2.2em;text-align:right">16</span></div>
    <div class="cv"><canvas id="eznsp-cRoll" width="720" height="420"></canvas><span class="tag">鍵盤ロール（88鍵）</span><span class="ax t">↑ 高い音</span><span class="ax b">低い音 ・ 時間 →</span></div>
    <div class="row" style="margin-top:10px">
      <button class="btn" id="eznsp-qIn">▶ 元の音</button>
      <button class="btn primary" id="eznsp-qOut">▶ 声のない声</button>
    </div>
    <div class="row" style="margin-top:8px">
      <button class="btn" id="eznsp-qWav">WAV保存</button>
      <button class="btn" id="eznsp-qMov">動画保存</button>
    </div>
    <p class="hint">人の声を入れると効果が分かりやすいです。何と言っているか知ってから聞くと、急に言葉に聞こえます。</p>
  </section>

  <div class="note">
    音声はこの端末のブラウザ内だけで処理され、どこにも送信されません。長い音は、使う区間（最大20秒）を選べます（読み込みは最初の10分まで）。mp3・m4a・wav・mp4・mov（iPhoneのHEVC動画を含む）などの音声や動画を読み込めます。<br>
    「こっそり」は元の音を一切書き換えず、謎ノ美兎の線画（または濃淡）の形をした小さな音を足すだけです。「並べ替え」は、時間ごとに周波数の成分の並び順だけを入れ替えます（足し引きはしません）。「型押し」は、背景を除いた顔の形の部分だけを、その時間の音量に合わせて置き換えます（顔の外側は元の音のまま）。<br>
    ※ 謎ノ美兎のファン作品（二次創作）です。
  </div>
</div>`;

(()=>{
"use strict";
// 顔の図柄は2枚だけ：線画と、背景を除いた顔（明暗・並べ替え用の顔は、背景を除いた顔から作る）
const ART_LINE = window.MITO_ASSETS.line;
const ART_STAMP = window.MITO_ASSETS.stamp;
const SR = 44100, MAX_SEC = 20, MAX_LOAD = 600, CAP_SEC = 60;
const N1 = 2048, H1 = 512;            // 表示・埋め込み用 STFT
const FACE_W = 0.62;                  // 顔を置く時間幅（全体に対する割合）
const GL_ITERS = 10;                  // 位相推定の反復回数
const DR_DISP = 100;                  // 表示のダイナミックレンジ(dB)
const $ = id => document.getElementById("eznsp-"+id);

// ---------------- ログ ----------------
const logEl = $("log"); let t0log = performance.now();
function log(s, reset){ if(reset){ logEl.textContent=""; t0log=performance.now(); }
  const t = ((performance.now()-t0log)/1000).toFixed(3).padStart(7," ");
  logEl.textContent += `[${t}] ${s}\n`; logEl.scrollTop = logEl.scrollHeight; }
const yieldUI = ()=>new Promise(r=>setTimeout(r,0));
const fmt = n => n.toLocaleString();

// ---------------- FFT ----------------
const FFTS = {};
function fftFor(n){
  if (FFTS[n]) return FFTS[n];
  const rev = new Uint32Array(n), bits = Math.log2(n);
  for (let i=0;i<n;i++){ let r=0; for(let b=0;b<bits;b++) r=(r<<1)|((i>>b)&1); rev[i]=r; }
  const cs = new Float64Array(n/2), sn = new Float64Array(n/2);
  for (let i=0;i<n/2;i++){ cs[i]=Math.cos(2*Math.PI*i/n); sn[i]=Math.sin(2*Math.PI*i/n); }
  const f = (re, im, inv) => {
    for (let i=0;i<n;i++){ const j=rev[i]; if (j>i){ let t=re[i]; re[i]=re[j]; re[j]=t; t=im[i]; im[i]=im[j]; im[j]=t; } }
    for (let size=2; size<=n; size<<=1){
      const half=size>>1, step=n/size;
      for (let i=0;i<n;i+=size){
        for (let j=0,k=0;j<half;j++,k+=step){
          const l=i+j+half, c=cs[k], s= inv ? -sn[k] : sn[k];
          const tr = re[l]*c + im[l]*s, ti = -re[l]*s + im[l]*c;
          re[l]=re[i+j]-tr; im[l]=im[i+j]-ti; re[i+j]+=tr; im[i+j]+=ti;
        }
      }
    }
    if (inv) for (let i=0;i<n;i++){ re[i]/=n; im[i]/=n; }
  };
  return (FFTS[n]=f);
}
const WINS = {};
function hann(n){ if (WINS[n]) return WINS[n]; const w=new Float64Array(n); for(let i=0;i<n;i++) w[i]=0.5-0.5*Math.cos(2*Math.PI*i/n); return (WINS[n]=w); }

function stft(x, N, H){
  const K=N/2+1, F=Math.floor(x.length/H)+1, w=hann(N), fft=fftFor(N), pad=N/2;
  const RE=new Float32Array(F*K), IM=new Float32Array(F*K), re=new Float64Array(N), im=new Float64Array(N);
  for (let f=0; f<F; f++){
    const o=f*H-pad;
    for (let i=0;i<N;i++){ const j=o+i; re[i]=(j>=0&&j<x.length)?x[j]*w[i]:0; im[i]=0; }
    fft(re,im,false);
    for (let k=0;k<K;k++){ RE[f*K+k]=re[k]; IM[f*K+k]=im[k]; }
  }
  return {RE,IM,F,K,N,H,len:x.length};
}
function istft(S){
  const {F,K,N,H,len}=S, w=hann(N), fft=fftFor(N), pad=N/2;
  const out=new Float64Array(len+N+H*2), ws=new Float64Array(len+N+H*2), re=new Float64Array(N), im=new Float64Array(N);
  for (let f=0; f<F; f++){
    for (let k=0;k<K;k++){ re[k]=S.RE[f*K+k]; im[k]=S.IM[f*K+k]; }
    for (let k=K;k<N;k++){ re[k]=re[N-k]; im[k]=-im[N-k]; }
    fft(re,im,true);
    const o=f*H;
    for (let i=0;i<N;i++){ out[o+i]+=re[i]*w[i]; ws[o+i]+=w[i]*w[i]; }
  }
  const y=new Float32Array(len);
  for (let j=0;j<len;j++){ const v=ws[j+pad]; y[j]= v>1e-6 ? out[j+pad]/v : 0; }
  return y;
}
function normalize(x, peak=0.9){ let m=0; for (const v of x) m=Math.max(m,Math.abs(v)); if (m>0){ const g=peak/m; for (let i=0;i<x.length;i++) x[i]*=g; } return x; }

// ---------------- 顔（明るさマップ） ----------------
let FACE=null, FW=0, FH=0;
const ARTS={};
function loadArt(url){ return new Promise(res=>{ const im=new Image(); im.onload=()=>{ const c=document.createElement("canvas"); c.width=im.width; c.height=im.height;
  const g=c.getContext("2d"); g.drawImage(im,0,0); const d=g.getImageData(0,0,im.width,im.height).data, a=new Float32Array(im.width*im.height);
  for (let i=0;i<a.length;i++) a[i]=d[i*4]/255; res({a,w:im.width,h:im.height}); }; im.src=url; }); }
function artAt(A,fx,fy){
  fx=Math.max(0,Math.min(A.w-1.001,fx)); fy=Math.max(0,Math.min(A.h-1.001,fy));
  const x0=fx|0, y0=fy|0, ax=fx-x0, ay=fy-y0, i=y0*A.w+x0, a=A.a;
  return (a[i]*(1-ax)+a[i+1]*ax)*(1-ay) + (a[i+A.w]*(1-ax)+a[i+A.w+1]*ax)*ay;
}
function makeFace(S){
  // 背景を除いた顔（顔の所は 0.18〜1、背景は 0）から、明暗の図柄と、並べ替え用の顔（背景は明るい灰色）を作る
  const n=S.w*S.h, tone=new Float32Array(n); FACE=new Float32Array(n); FW=S.w; FH=S.h;
  for (let i=0;i<n;i++){ const v=S.a[i], m=Math.min(1,Math.max(0,(v-0.06)/0.12)), t=Math.min(1,Math.max(0,(v-0.18)/0.82));
    tone[i]=m*t; FACE[i]=m*t+(1-m)*0.8; }
  ARTS.tone={a:tone,w:S.w,h:S.h};
}
// 顔を粗くする：小さいマス目に平均してから、なめらかに引き伸ばす（音の急な出入りが減り、チリチリ・ザラザラが目立ちにくい）
const lowArts={};
function artFor(kind, d){
  const n=DETAIL[d||detail], A=ARTS[kind]; if (!n||!A) return A; const key=kind+":"+n; if (lowArts[key]) return lowArts[key];
  const w=n, h=Math.max(2,Math.round(n*A.h/A.w)), a=new Float32Array(w*h); let mx=0;
  for (let y=0;y<h;y++) for (let x=0;x<w;x++){ const x0=Math.floor(x*A.w/w), x1=Math.floor((x+1)*A.w/w), y0=Math.floor(y*A.h/h), y1=Math.floor((y+1)*A.h/h); let s=0,c=0;
    for (let yy=y0;yy<y1;yy++) for (let xx=x0;xx<x1;xx++){ s+=A.a[yy*A.w+xx]; c++; } a[y*w+x]=s/Math.max(1,c); if (a[y*w+x]>mx) mx=a[y*w+x]; }
  // 細い線は平均で薄くなるので、いちばん明るい所を1に戻して少し持ち上げる
  for (let i=0;i<a.length;i++) a[i]=Math.pow(a[i]/Math.max(mx,1e-6),0.75);
  return lowArts[key]={a,w,h};
}
// 粗くすると明るい面が広がって足す音の総量が増えるので、元の絵と同じ総量になるように下げる係数
const msq=A=>{ let s=0; for (const v of A.a) s+=v*v; return s/A.a.length; };
const energyFix=kind=>{ const A=ARTS[kind], B=artFor(kind); return (!A||A===B) ? 1 : Math.min(1, Math.sqrt(msq(A)/Math.max(1e-9,msq(B)))); };
function faceAt(fx, fy){
  fx=Math.max(0,Math.min(FW-1.001,fx)); fy=Math.max(0,Math.min(FH-1.001,fy));
  const x0=fx|0, y0=fy|0, ax=fx-x0, ay=fy-y0, i=y0*FW+x0;
  return (FACE[i]*(1-ax)+FACE[i+1]*ax)*(1-ay) + (FACE[i+FW]*(1-ax)+FACE[i+FW+1]*ax)*ay;
}

// ---------------- 埋め込み ----------------
function embed(S, mode, Lyr){
  const {F,K}=S, {V,C}=Lyr;
  const MAG=new Float32Array(F*K), RE=Float32Array.from(S.RE), IM=Float32Array.from(S.IM);
  for (let i=0;i<F*K;i++) MAG[i]=Math.hypot(S.RE[i],S.IM[i]);
  let maxE=0; const E=new Float64Array(F);
  for (let f=0;f<F;f++){ let s=0; for (let k=1;k<K;k++) s+=MAG[f*K+k]**2; E[f]=Math.sqrt(s/(K-1)); maxE=Math.max(maxE,E[f]); }
  const floorE = maxE*Math.pow(10,-32/20), DR=60;
  const srcMag=Float32Array.from(MAG); let cols=0, cells=0;
  for (let f=0; f<F; f++){
    const base=f*K, ks=[]; for (let k=1;k<K;k++) if (C[base+k]) ks.push(k);
    if (ks.length<2) continue; cols++; cells+=ks.length;
    // 並べ替え：その列の、顔の部分の成分だけを、明るさの順に入れ替える
    const ia=ks.slice(), ib=ks.slice();
    ia.sort((p,q)=>srcMag[base+p]-srcMag[base+q]); ib.sort((p,q)=>V[base+p]-V[base+q]);
    for (let r=0;r<ks.length;r++){ const d=base+ib[r], s=base+ia[r]; RE[d]=S.RE[s]; IM[d]=S.IM[s]; MAG[d]=srcMag[s]; }
  }
  return {S:{...S,RE,IM}, MAG, cols, cells};
}
function embedStamp(S, Lyr){
  // 背景を除いた顔（髪＋顔）だけを、枠の中に押し付ける。顔の外側は元の音のまま
  const {F,K}=S, binHz=SR/N1, A=ARTS.stamp;
  const MAG=new Float32Array(F*K), RE=Float32Array.from(S.RE), IM=Float32Array.from(S.IM), fixed=new Uint8Array(F*K).fill(1);
  for (let i=0;i<F*K;i++) MAG[i]=Math.hypot(S.RE[i],S.IM[i]);
  let maxE=0; const E=new Float64Array(F);
  for (let f=0;f<F;f++){ let s=0; for (let k=1;k<K;k++) s+=MAG[f*K+k]**2; E[f]=Math.sqrt(s/(K-1)); maxE=Math.max(maxE,E[f]); }
  const floorE=maxE*Math.pow(10,-32/20), DR=STAMP.dr, gain=Math.pow(10,STAMP.lvl/20), str=STAMP.str;
  const {V,C}=Lyr;
  for (let f=0; f<F; f++){
    const e=Math.max(E[f],floorE)*gain;
    for (let k=1;k<K;k++){
      if (!C[f*K+k]) continue; const a=Math.max(0.02,V[f*K+k]);
      const i=f*K+k, m0=MAG[i], w=Math.min(1,a*6)*str, target=e*Math.pow(10,(a-1)*DR/20);
      const m=(1-w)*m0+w*target; MAG[i]=m; fixed[i]=0;
      if (m0>1e-9){ RE[i]=S.RE[i]/m0*m; IM[i]=S.IM[i]/m0*m; } else { const ph=Math.random()*6.283; RE[i]=Math.cos(ph)*m; IM[i]=Math.sin(ph)*m; }
    }
  }
  return {S:{...S,RE,IM}, MAG, fixed};
}
async function griffinLim(S, MAG, iters, label, fixed, S0){
  let cur=S;
  for (let it=1; it<=iters; it++){
    const y=istft(cur), T=stft(y,cur.N,cur.H);
    for (let i=0;i<MAG.length;i++){
      if (fixed && fixed[i]){ T.RE[i]=S0.RE[i]; T.IM[i]=S0.IM[i]; continue; }   // 顔の外は元の音のまま
      const a=Math.hypot(T.RE[i],T.IM[i]); if (a>1e-12){ T.RE[i]=T.RE[i]/a*MAG[i]; T.IM[i]=T.IM[i]/a*MAG[i]; } else { T.RE[i]=MAG[i]; T.IM[i]=0; } }
    cur=T;
    if (it===1 || it===iters || it%3===0){ log(`${label} ${it}/${iters}`); await yieldUI(); }
  }
  return istft(cur);
}

// ---------------- スペクトログラム画像 ----------------
function specImage(x, W, Hh){
  const S=stft(x,N1,H1), {F,K}=S, dB=new Float32Array(F*K); let mx=-1e9;
  for (let i=0;i<F*K;i++){ dB[i]=20*Math.log10(Math.hypot(S.RE[i],S.IM[i])+1e-9); if (dB[i]>mx) mx=dB[i]; }
  const img=new ImageData(W,Hh), d=img.data, lo=mx-DR_DISP;
  for (let px=0; px<W; px++){
    const f=Math.min(F-1, Math.floor(px/W*F));
    for (let py=0; py<Hh; py++){
      const k=Math.round((1-py/(Hh-1))*(K-1)); let v=(dB[f*K+k]-lo)/DR_DISP; v=v<0?0:v>1?1:v;
      const g=Math.round(255*Math.pow(v,1.15)), o=(py*W+px)*4; d[o]=g; d[o+1]=g; d[o+2]=g; d[o+3]=255;
    }
  }
  return img;
}

// ---------------- 声のない声（ピアノ／サイン波） ----------------
const KEY_LO=21, KEY_HI=108, NK=KEY_HI-KEY_LO+1;
const keyHz = n => 440*Math.pow(2,(n-69)/12);
function pianoAnalyze(x){
  const N=8192, H=2205, S=stft(x,N,H), {F,K}=S, binHz=SR/N, M=new Float32Array(F*NK); let gmax=0;
  const lo=[], hi=[];
  for (let n=0;n<NK;n++){ const f=keyHz(n+KEY_LO); let a=Math.floor(f*Math.pow(2,-1/24)/binHz), b=Math.ceil(f*Math.pow(2,1/24)/binHz); a=Math.max(1,a); b=Math.min(K-1,Math.max(a,b)); lo.push(a); hi.push(b); }
  for (let f=0;f<F;f++) for (let n=0;n<NK;n++){ let m=0; for (let k=lo[n];k<=hi[n];k++){ const v=Math.hypot(S.RE[f*K+k],S.IM[f*K+k]); if (v>m) m=v; } M[f*NK+n]=m; if (m>gmax) gmax=m; }
  return {M,F,H,gmax};
}
function pianoSelect(A, poly){
  const {M,F,gmax}=A, sel=new Float32Array(F*NK), idx=[...Array(NK).keys()];
  for (let f=0;f<F;f++){
    let fm=0; for (let n=0;n<NK;n++) fm=Math.max(fm,M[f*NK+n]);
    const th=Math.max(fm*Math.pow(10,-40/20), gmax*Math.pow(10,-50/20));
    idx.sort((p,q)=>M[f*NK+q]-M[f*NK+p]);
    for (let r=0;r<poly;r++){ const n=idx[r], v=M[f*NK+n]; if (v<th) break; sel[f*NK+n]=v/gmax; }
  }
  return sel;
}
function synthPiano(sel, F, H, len){
  const y=new Float32Array(len+SR); let events=0;
  for (let f=0;f<F;f++) for (let n=0;n<NK;n++){
    const v=sel[f*NK+n]; if (!v) continue; events++;
    const f0=keyHz(n+KEY_LO), w=2*Math.PI*f0/SR, amp=0.25*Math.pow(v,0.7);
    const tau=Math.min(0.6,Math.max(0.05,0.25*Math.pow(220/f0,0.25))), dur=Math.min(0.28,5*tau), ns=Math.floor(dur*SR), st=f*H;
    for (let i=0;i<ns;i++){ const t=i/SR, env=(1-Math.exp(-t/0.004))*Math.exp(-t/tau); y[st+i]+=amp*env*(Math.sin(w*i)+0.35*Math.sin(2*w*i)+0.12*Math.sin(3*w*i)); }
  }
  return {y:normalize(y.subarray(0,len).slice()), events};
}
function synthSine(sel, F, H, len){
  const y=new Float32Array(len); let used=0;
  for (let n=0;n<NK;n++){
    let any=false; for (let f=0;f<F;f++) if (sel[f*NK+n]){ any=true; break; } if (!any) continue; used++;
    const w=2*Math.PI*keyHz(n+KEY_LO)/SR; let ph=0;
    for (let f=0;f<F;f++){ const a0=sel[f*NK+n], a1=f+1<F?sel[(f+1)*NK+n]:0;
      for (let i=0;i<H;i++){ const j=f*H+i; if (j>=len) break; y[j]+=(a0+(a1-a0)*i/H)*Math.sin(ph); ph+=w; } }
  }
  return {y:normalize(y), used};
}
function rollImage(sel, F, W, Hh){
  const img=new ImageData(W,Hh), d=img.data;
  for (let i=0;i<W*Hh;i++){ d[i*4]=8; d[i*4+1]=8; d[i*4+2]=8; d[i*4+3]=255; }
  for (let n=0;n<NK;n++){ const kk=(n+KEY_LO)%12; if ([1,3,6,8,10].includes(kk)){ const y0=Math.floor((NK-1-n)/NK*Hh), y1=Math.floor((NK-n)/NK*Hh); for (let py=y0;py<y1;py++) for (let px=0;px<W;px++){ const o=(py*W+px)*4; d[o]=d[o+1]=d[o+2]=16; } } }
  for (let f=0;f<F;f++){ const x0=Math.floor(f/F*W), x1=Math.max(x0+1,Math.floor((f+1)/F*W));
    for (let n=0;n<NK;n++){ const v=sel[f*NK+n]; if (!v) continue; const g=Math.round(70+185*Math.pow(v,0.35));
      const y0=Math.floor((NK-1-n)/NK*Hh), y1=Math.max(y0+1,Math.floor((NK-n)/NK*Hh));
      for (let py=y0;py<y1;py++) for (let px=x0;px<x1-0;px++){ const o=(py*W+px)*4; d[o]=g; d[o+1]=Math.round(g*0.92); d[o+2]=Math.round(g*0.85); } } }
  return img;
}

// ---------------- 状態 ----------------
let input=null;           // {x, name}（使う区間）
let full=null, segStart=0, segLen=MAX_SEC;   // 読み込んだ音全体と、使う区間（秒）
let detail="mid"; const DETAIL={fine:0, mid:56, coarse:28};   // こっそりの顔の細かさ（横のマス数。0＝元の絵のまま）
let faceMode="hide", voice="piano", tab="face", art="line", band="full", lvl=-58, look="pm", rel=6, carve=false, depth=18;
const ROW={n:1, dir:"x", gap:0.3, fade:true};
const STAMP={str:1, lvl:4, dr:50, detail:"fine"};   // 型押しの強さ・音量差(dB)・明暗の幅(dB)・細かさ
const stampKey=()=>`${STAMP.str}:${STAMP.lvl}:${STAMP.dr}:${STAMP.detail}`;   // 顔を一方向に並べる
const POS={ hide:{s:1,x:.5,y:.5}, perm:{s:1,x:.5,y:.5}, stamp:{s:.55,x:.5,y:.45} };   // 顔の大きさ・横・縦（0〜1）
const posKey=()=>{ const p=POS[faceMode]; return `${p.s}:${p.x}:${p.y}`; };
const usesBox=()=> !(faceMode==="hide" && band==="high");
const rowKey=()=>`${ROW.n}:${ROW.dir}:${ROW.gap}:${ROW.fade}`;
const lookKey=()=> look==="const" ? lvl : look==="adapt" ? rel+":"+carve : "pm:"+depth;
const faceKey=()=> faceMode==="hide" ? `face:hide:${art}:${detail}:${band}:${look}:${lookKey()}:${usesBox()?posKey()+":"+rowKey():""}` : `face:${faceMode}:${posKey()}:${rowKey()}${faceMode==="stamp"?":"+stampKey():""}`;
// 顔を入れる枠（列 t0〜t1、段 kLo〜kHi）。表示で顔が正方形に見える幅にする
function faceBox(F,K){
  const p=POS[faceMode], kSpan=Math.max(16,Math.round(p.s*(K-2)));
  const kc=1+p.y*(K-2), kLo=Math.round(Math.min(Math.max(1,kc-kSpan/2),K-1-kSpan)), kHi=kLo+kSpan;
  const cv=$("cOut"), cols=Math.max(8,Math.min(F,Math.round(F*(kSpan/(K-1))*cv.height/cv.width)));
  const t0=Math.round(Math.min(Math.max(0,p.x*F-cols/2),F-cols));
  return {t0,t1:t0+cols,kLo,kHi};
}
const kHz=(k)=>(k*SR/N1/1000);
// 並べる：枠を一方向にずらして複数つくる（0番が手前。全体の真ん中を faceBox の真ん中に合わせる）
function layerBoxes(F,K){
  const b=faceBox(F,K); if (ROW.n<=1) return [b];
  const w=b.t1-b.t0, h=b.kHi-b.kLo, n=ROW.n;
  if (ROW.dir==="grid"){
    // 敷き詰め：正方形に近い格子に並べる（ずらし幅100%で顔どうしが接する）
    const nc=Math.ceil(Math.sqrt(n)), nr=Math.ceil(n/nc), sx=Math.round(w*ROW.gap), sy=Math.round(h*ROW.gap), g=[];
    for (let i=0;i<n;i++){ const c=i%nc, r=Math.floor(i/nc), inRow=Math.min(nc,n-r*nc);
      const ox=Math.round((c-(inRow-1)/2)*sx), oy=Math.round(((nr-1)/2-r)*sy); g.push({t0:b.t0+ox,t1:b.t1+ox,kLo:b.kLo+oy,kHi:b.kHi+oy,d:Math.hypot(ox/Math.max(1,w),oy/Math.max(1,h))}); }
    g.sort((a,c)=>a.d-c.d);   // 真ん中の顔を手前（0番）に
    return fitBoxes(g.map(({d,...o})=>o),F,K);
  }
  const sx=ROW.dir==="y"?0:Math.round(w*ROW.gap), sy=ROW.dir==="x"?0:Math.round(h*ROW.gap), out=[];
  for (let i=0;i<n;i++){ const ox=Math.round(sx*(n-1)/2-i*sx), oy=Math.round(sy*(n-1)/2-i*sy); out.push({t0:b.t0+ox,t1:b.t1+ox,kLo:b.kLo+oy,kHi:b.kHi+oy}); }
  return fitBoxes(out,F,K);
}
// はみ出す分は、入りきる範囲で全体を内側へ寄せる
function fitBoxes(out,F,K){
  const fit=(lo,hi,min,max)=>{ if (hi-lo>max-min) return Math.round((min+max)/2-(lo+hi)/2); return lo<min ? min-lo : hi>max ? max-hi : 0; };
  const dx=fit(Math.min(...out.map(o=>o.t0)),Math.max(...out.map(o=>o.t1)),0,F), dy=fit(Math.min(...out.map(o=>o.kLo)),Math.max(...out.map(o=>o.kHi)),1,K-1);
  for (const o of out){ o.t0+=dx; o.t1+=dx; o.kLo+=dy; o.kHi+=dy; }
  return out;
}
// 顔の図柄を並べて1枚にする。線画・明暗は重ね合わせ、型押しと並べ替えは手前の顔が奥の顔を隠す
//   kind: line（線画）/ tone（明暗）/ stamp（背景を除いた顔）/ photo（写真・並べ替え用）
function composeLayers(F,K,kind){
  const V=new Float32Array(F*K), C=new Uint8Array(F*K), boxes=layerBoxes(F,K), multi=boxes.length>1;
  const A=kind==="photo"?null:(kind==="stamp"?artFor("stamp",STAMP.detail):artFor(kind)), M=ARTS.stamp, Ln=ARTS.line;
  for (let j=boxes.length-1;j>=0;j--){
    const b=boxes[j], fade=(multi&&ROW.fade)?Math.pow(0.78,j):1, cols=b.t1-b.t0, rows=b.kHi-b.kLo;
    for (let f=Math.max(0,b.t0); f<Math.min(F,b.t1); f++){ const u=(f-b.t0)/Math.max(1,cols-1);
      for (let k=Math.max(1,b.kLo); k<=Math.min(K-1,b.kHi); k++){ const v=1-(k-b.kLo)/Math.max(1,rows), i=f*K+k;
        if (kind==="photo"){ V[i]=faceAt(u*(FW-1),v*(FH-1))*(fade<1?0.25+0.75*fade:1); C[i]=1; continue; }
        const ax=u*(A.w-1), ay=v*(A.h-1), val=artAt(A,ax,ay);
        if (kind==="stamp"){ if (val<0.02) continue; V[i]=val*fade; C[i]=1; continue; }   // 型押し：手前の顔が奥の顔を隠す
        // 線画・明暗：並べた顔どうしは隠さずに重ねる（線が重なった所は明るい方を使う）
        const vv=val*fade; if (vv>V[i]) V[i]=vv; C[i]=1;
      }
    }
  }
  return {V,C,boxes};
}
const cache={};           // 出力のキャッシュ
let imgIn=null, imgOut=null, imgRoll=null;

function drawFull(cv, img){ if(img) cv.getContext("2d").putImageData(img,0,0); }
function drawReveal(cv, img, frac){
  const g=cv.getContext("2d"), W=cv.width, Hh=cv.height, x=Math.floor(frac*W);
  g.fillStyle="#000"; g.fillRect(0,0,W,Hh);
  if (img && x>0) g.putImageData(img,0,0,0,0,x,Hh);
  g.fillStyle="#e0352b"; g.fillRect(Math.min(W-2,x),0,2,Hh);
}
function drawIn(){
  const cv=$("cIn"); drawFull(cv,imgIn); if (!input||!imgIn||tab!=="face"||!usesBox()) return;
  const F=Math.floor(input.x.length/H1)+1, K=N1/2+1, bs=layerBoxes(F,K), g=cv.getContext("2d"), W=cv.width, Hh=cv.height;
  g.save(); g.strokeStyle="#e0352b";
  for (let j=bs.length-1;j>=0;j--){ const b=bs[j], x0=b.t0/F*W, x1=b.t1/F*W, y0=(1-b.kHi/(K-1))*Hh, y1=(1-b.kLo/(K-1))*Hh;
    g.globalAlpha=j?0.45:1; g.lineWidth=j?2:3; g.setLineDash(j?[4,6]:[10,6]); g.strokeRect(x0+1.5,y0+1.5,x1-x0-3,y1-y0-3); }
  g.restore();
}
function blank(cv, msg){ const g=cv.getContext("2d"); g.fillStyle="#000"; g.fillRect(0,0,cv.width,cv.height); if(msg){ g.fillStyle="#555"; g.font="22px ui-monospace,monospace"; g.fillText(msg,24,cv.height/2); } }

let artsP=null;   // 顔と線画の読み込み（操作が先に来ても待ってから計算する）
function ensureArts(){ return artsP || (artsP=Promise.all([loadArt(ART_LINE).then(a=>ARTS.line=a), loadArt(ART_STAMP).then(a=>{ ARTS.stamp=a; makeFace(a); })])); }
async function setInput(x, name){
  await ensureArts();
  stopAll();
  if (x.length > SR*MAX_LOAD) x = x.slice(0, SR*MAX_LOAD);
  full={x,name}; const dur=x.length/SR;
  segLen=Math.min(MAX_SEC,dur); segStart=0;
  $("trimBox").classList.toggle("hidden", dur<=4);
  const rl=$("rLen"); rl.max=Math.min(MAX_SEC,dur).toFixed(1); rl.min=Math.min(1,dur).toFixed(1); rl.value=segLen;
  syncTrim(); waveCache=null; drawWave();
  await applySeg();
}
const tfmt=t=>`${Math.floor(t/60)}:${(t%60).toFixed(1).padStart(4,"0")}`;
function syncTrim(){ if(!full) return; const dur=full.x.length/SR, rs=$("rStart");
  segStart=Math.max(0,Math.min(segStart,dur-segLen)); rs.max=Math.max(0,dur-segLen).toFixed(1); rs.value=segStart;
  $("vStart").textContent=tfmt(segStart); $("vLen").textContent=segLen.toFixed(1)+" 秒"; }
let waveCache=null;
function drawWave(){
  const cv=$("cWave"), g=cv.getContext("2d"), W=cv.width, Hh=cv.height; g.fillStyle="#000"; g.fillRect(0,0,W,Hh); if(!full) return;
  const x=full.x, n=x.length;
  if (!waveCache){ waveCache=new Float32Array(W); let mx=1e-9; for (let px=0;px<W;px++){ const a=Math.floor(px/W*n), b=Math.floor((px+1)/W*n); let m=0; for (let i=a;i<b;i+=4) m=Math.max(m,Math.abs(x[i])); waveCache[px]=m; mx=Math.max(mx,m); } for (let px=0;px<W;px++) waveCache[px]/=mx; }
  const dur=n/SR, s0=segStart/dur*W, s1=(segStart+segLen)/dur*W;
  g.fillStyle="rgba(224,53,43,.28)"; g.fillRect(s0,0,s1-s0,Hh);
  for (let px=0;px<W;px++){ const h=Math.max(1,waveCache[px]*(Hh/2-4)); g.fillStyle=(px>=s0&&px<=s1)?"#ebe7df":"#5d5951"; g.fillRect(px,Hh/2-h,1,h*2); }
  g.fillStyle="#e0352b"; g.fillRect(s0,0,2,Hh); g.fillRect(Math.max(0,s1-2),0,2,Hh);
}
async function applySeg(){
  stopAll(); const {x,name}=full, a=Math.round(segStart*SR), b=Math.min(x.length, a+Math.round(segLen*SR));
  const y=x.slice(a,b); normalize(y);
  input={x:y,name}; for (const k in cache) delete cache[k];
  const whole=full.x.length/SR;
  log(`入力: ${name} / ${(y.length/SR).toFixed(2)} 秒${whole>segLen+0.05?`（全体 ${tfmt(whole)} のうち ${tfmt(segStart)}〜${tfmt(segStart+y.length/SR)}）`:""} / ${SR} Hz / ${fmt(y.length)} サンプル`, true);
  imgIn=specImage(y, $("cIn").width, $("cIn").height); drawIn();
  log(`STFT: ${N1}点・間隔${H1} → ${fmt(Math.floor(y.length/H1)+1)}列 × ${N1/2+1}段`);
  await refresh();
}
async function refresh(){
  if (!input) return;
  if (tab==="face") await runFace(); else await runPiano();
}
function dilate(M,F,K,rt,rk){
  const T=new Uint8Array(F*K), O=new Uint8Array(F*K);
  for (let f=0;f<F;f++) for (let k=0;k<K;k++) if (M[f*K+k]) for (let d=Math.max(0,k-rk); d<=Math.min(K-1,k+rk); d++) T[f*K+d]=1;
  for (let f=0;f<F;f++) for (let k=0;k<K;k++) if (T[f*K+k]) for (let d=Math.max(0,f-rt); d<=Math.min(F-1,f+rt); d++) O[d*K+k]=1;
  return O;
}
function localMag(S, rt, rk){
  const {F,K}=S, M=new Float32Array(F*K), T=new Float32Array(F*K), O=new Float32Array(F*K);
  for (let i=0;i<F*K;i++) M[i]=Math.hypot(S.RE[i],S.IM[i]);
  for (let f=0;f<F;f++){ const b=f*K; let acc=0, n=0;            // 周波数方向
    for (let k=0;k<Math.min(K,rk);k++){ acc+=M[b+k]; n++; }
    for (let k=0;k<K;k++){ const a=k+rk, d=k-rk-1; if (a<K){ acc+=M[b+a]; n++; } if (d>=0){ acc-=M[b+d]; n--; } T[b+k]=acc/n; } }
  for (let k=0;k<K;k++){ let acc=0, n=0;                           // 時間方向
    for (let f=0;f<Math.min(F,rt);f++){ acc+=T[f*K+k]; n++; }
    for (let f=0;f<F;f++){ const a=f+rt, d=f-rt-1; if (a<F){ acc+=T[a*K+k]; n++; } if (d>=0){ acc-=T[d*K+k]; n--; } O[f*K+k]=acc/n; } }
  return O;
}
async function runHide(){
  const key=faceKey();
  if (!cache[key]){
    blank($("cOut"),"計算中…"); await yieldUI();
    const t=performance.now(), x=input.x, S=stft(x,N1,H1), {F,K}=S, binHz=SR/N1;
    let xpk=0; for (let i=0;i<F*K;i++){ const m=Math.hypot(S.RE[i],S.IM[i]); if (m>xpk) xpk=m; }
    const A=artFor(art);
    let MAG, nFace, kLo, kHi;
    if (band==="high"){
      MAG=new Float32Array(F*K); const starts=[];
      kLo=Math.ceil(16000/binHz); kHi=Math.floor(Math.min(20000, SR/2-500)/binHz);
      const aspect=$("cOut").height/$("cOut").width, faceCols=Math.max(8, Math.min(F, Math.round(F*aspect*(kHi-kLo)/(K-1))));
      const gap=Math.round(faceCols*0.3); for (let s0=Math.round(F*0.02); s0+faceCols<=F; s0+=faceCols+gap) starts.push(s0); if (!starts.length) starts.push(0);
      for (const s0 of starts) for (let f=s0; f<Math.min(F,s0+faceCols); f++){
        const fx=(f-s0)/Math.max(1,faceCols-1)*(A.w-1);
        for (let k=kLo;k<=kHi;k++) MAG[f*K+k]=artAt(A,fx,(1-(k-kLo)/(kHi-kLo))*(A.h-1));
      }
      nFace=starts.length;
    } else {
      const Lyr=composeLayers(F,K,art); MAG=Lyr.V; nFace=Lyr.boxes.length;
      const kMin=Math.ceil(80/binHz); for (let f=0;f<F;f++) for (let k=0;k<kMin;k++) MAG[f*K+k]=0;
      kLo=Math.max(kMin,Math.min(...Lyr.boxes.map(b=>b.kLo))); kHi=Math.min(K-1,Math.max(...Lyr.boxes.map(b=>b.kHi)));
    }
    const fLo=kLo*binHz, fHi=kHi*binHz, lookName={const:"一定の小ささ",adapt:"音に合わせる",pm:"足し引き"}[look];
    log(`こっそり: ${art==="line"?"線画":"明暗"} / ${(fLo/1000).toFixed(fLo<1000?2:1)}〜${(fHi/1000).toFixed(1)} kHz / 顔 ${nFace}個 / ${lookName} / 細かさ: ${{fine:"細かい",mid:"ふつう",coarse:"粗い"}[detail]}`);
    let lineMask=null, subMap=null, nAdd=0, nSub=0;
    if (look==="pm"){
      // 足し引き：その場所の音がまばらなら線を足して明るく、詰まっていれば線の部分の元の音を下げて暗くする
      const L=localMag(S,4,8), up=Math.pow(10,depth/20), cap=xpk*Math.pow(10,-34/20), floor=xpk*Math.pow(10,-62/20);
      subMap=new Float32Array(F*K);
      for (let i=0;i<F*K;i++){ const a=MAG[i]; if (a<=0.02){ MAG[i]=0; continue; }
        const want=Math.max(floor, L[i]*up);
        if (want<=cap){ MAG[i]=a*want; nAdd++; } else { MAG[i]=0; subMap[i]=a; nSub++; } }
    }
    if (look==="adapt"){
      // その場所の元の音の大きさ（時間±4列・周波数±8段の平均）に合わせて、足す線の大きさを決める
      const L=localMag(S,4,8), rg=Math.pow(10,rel/20), floor=xpk*Math.pow(10,-58/20);
      if (carve){ lineMask=new Uint8Array(F*K); for (let i=0;i<F*K;i++) if (MAG[i]>0.12) lineMask[i]=1; }
      const ef=energyFix(art); for (let i=0;i<F*K;i++) if (MAG[i]>0) MAG[i]*=Math.max(floor, L[i]*rg)*ef;
    }
    const R=new Float32Array(F*K), I=new Float32Array(F*K);
    for (let i=0;i<F*K;i++){ const ph=Math.random()*6.283185; R[i]=MAG[i]*Math.cos(ph); I[i]=MAG[i]*Math.sin(ph); }
    const s=await griffinLim({...S,RE:R,IM:I}, MAG, 16, "足す音の位相推定");
    let g=1;
    if (look==="const"){ const T=stft(s,N1,H1); let spk=0; for (let i=0;i<F*K;i++){ const m=Math.hypot(T.RE[i],T.IM[i]); if (m>spk) spk=m; }
      g = spk>0 ? xpk*Math.pow(10,lvl/20)/spk*energyFix(art) : 0; }
    let xs=x, carved=0;
    if (subMap){
      const X=stft(x,N1,H1); for (let i=0;i<F*K;i++){ const a=subMap[i]; if (a>0){ const att=Math.pow(10,-depth*Math.min(1,a*1.6)/20); X.RE[i]*=att; X.IM[i]*=att; } }
      xs=istft(X);
    }
    if (lineMask){
      // くっきり：線のまわり（時間±2列・周波数±4段）だけ、元の音を15 dB下げる
      const D=dilate(lineMask,F,K,2,4), att=Math.pow(10,-15/20), X=stft(x,N1,H1);
      for (let i=0;i<F*K;i++) if (D[i]){ X.RE[i]*=att; X.IM[i]*=att; carved++; }
      xs=istft(X);
    }
    const add=new Float32Array(x.length), y=new Float32Array(x.length); let pk=0, ex=0, ea=0, md=0;
    for (let i=0;i<x.length;i++){ add[i]=s[i]*g; y[i]=xs[i]+add[i]; pk=Math.max(pk,Math.abs(y[i])); ex+=x[i]*x[i]; ea+=add[i]*add[i]; md=Math.max(md,Math.abs(add[i])); }
    let sc=1; if (pk>0.99){ sc=0.99/pk; for (let i=0;i<y.length;i++) y[i]*=sc; }
    log(`足した音: 元の音より ${(10*Math.log10(ea/Math.max(ex,1e-12))).toFixed(1)} dB（音量比）／1サンプルの最大の差 ${md.toFixed(4)}`);
    const tail = sc<1 ? `音割れを防ぐため全体を ${(20*Math.log10(sc)).toFixed(2)} dB 下げました。` : "";
    if (subMap){ const tot=Math.max(1,nAdd+nSub); log(`足し引き: 線の ${(nAdd/tot*100).toFixed(0)}% は足して明るく、${(nSub/tot*100).toFixed(0)}% は元の音を最大 ${depth} dB 下げて暗くしました。${tail}`); }
    else log(lineMask ? `くっきり: 線のまわり（全体の ${(carved/(F*K)*100).toFixed(1)}%）だけ元の音を 15 dB 下げました。${tail}` : `元の音は書き換えていません（足し算のみ）。${tail}`);
    const addLoud=normalize(Float32Array.from(add),0.6);
    cache[key]={y, add, addLoud, img:specImage(y,$("cOut").width,$("cOut").height)};
    log(`${((performance.now()-t)/1000).toFixed(2)} 秒で完了。`);
  }
  imgOut=cache[key].img; drawFull($("cOut"), imgOut);
}
async function runFace(){
  $("hideOpts").classList.toggle("hidden", faceMode!=="hide"); $("stampOpts").classList.toggle("hidden", faceMode!=="stamp"); $("pAdd").classList.toggle("hidden", faceMode!=="hide"||look==="pm"); $("hideArt").classList.toggle("hidden", faceMode!=="hide");
  $("posOpts").classList.toggle("hidden", !usesBox()); drawIn();
  if (faceMode==="hide") return runHide();
  const key=faceKey();
  if (!cache[key]){
    blank($("cOut"),"計算中…"); await yieldUI();
    const S=stft(input.x,N1,H1); const t=performance.now();
    let y;
    if (faceMode==="stamp"){
      const Lyr=composeLayers(S.F,S.K,"stamp"), E=embedStamp(S, Lyr), b=Lyr.boxes[0];
      log(`型押し: 背景を除いた顔 ${Lyr.boxes.length}個 / 手前の顔 ${kHz(Math.max(1,b.kLo)).toFixed(1)}〜${kHz(Math.min(S.K-1,b.kHi)).toFixed(1)} kHz / 強さ ${Math.round(STAMP.str*100)}%・音量 ${STAMP.lvl>0?"+":""}${STAMP.lvl} dB・明暗の幅 ${STAMP.dr} dB（顔の外は元の音のまま）`);
      y=await griffinLim(E.S, E.MAG, GL_ITERS, "位相推定", E.fixed, S);
      let pk=0; for (const v of y) pk=Math.max(pk,Math.abs(v)); if (pk>0.99){ const g=0.99/pk; for (let i=0;i<y.length;i++) y[i]*=g; }
    } else {
      const Lyr=composeLayers(S.F,S.K,"photo"), E=embed(S, faceMode, Lyr);
      log(`並べ替え: 顔 ${Lyr.boxes.length}個 / ${fmt(E.cols)}列・${fmt(E.cells)}マスの並び順を入れ替え`);
      y=await griffinLim(E.S, E.MAG, GL_ITERS, "位相推定");
      normalize(y);
    }
    cache[key]={y, img:specImage(y,$("cOut").width,$("cOut").height)};
    log(`出力: ${(y.length/SR).toFixed(2)} 秒。${((performance.now()-t)/1000).toFixed(2)} 秒で完了。`);
  }
  imgOut=cache[key].img; drawFull($("cOut"), imgOut);
}
async function runPiano(){
  const poly=+$("rPoly").value, key=`piano:${voice}:${poly}`;
  if (!cache.pianoA){ const t=performance.now(); cache.pianoA=pianoAnalyze(input.x); log(`鍵盤解析: ${NK}鍵 × ${fmt(cache.pianoA.F)}コマ（1コマ ${(2205/SR*1000).toFixed(0)} ms）${((performance.now()-t)/1000).toFixed(2)} 秒`); }
  if (!cache[key]){
    const A=cache.pianoA, sel=pianoSelect(A,poly), t=performance.now();
    const r = voice==="piano" ? synthPiano(sel,A.F,A.H,input.x.length) : synthSine(sel,A.F,A.H,input.x.length);
    cache[key]={y:r.y, img:rollImage(sel,A.F,$("cRoll").width,$("cRoll").height)};
    log(voice==="piano" ? `ピアノ: 打鍵 ${fmt(r.events)} 回 / 同時 最大${poly}音 / 人の声 0 サンプル` : `サイン波: 純音 ${r.used} 本 / 同時 最大${poly}音 / 人の声 0 サンプル`);
    log(`合成: ${((performance.now()-t)/1000).toFixed(2)} 秒で完了。`);
  }
  imgRoll=cache[key].img; drawFull($("cRoll"), imgRoll);
}
function currentOut(){ return tab==="face" ? cache[faceKey()] : cache[`piano:${voice}:${+$("rPoly").value}`]; }

// ---------------- 再生 ----------------
let actx=null, playing=null;
function ac(){ if (!actx) actx=new (window.AudioContext||window.webkitAudioContext)(); if (actx.state==="suspended") actx.resume(); return actx; }
function stopAll(){ if (playing){ try{ playing.src.stop(); }catch(e){} playing.done(); playing=null; } }
function play(y, cv, img, extraDest, onEnd){
  stopAll();
  const c=ac(), buf=c.createBuffer(1,y.length,SR); buf.copyToChannel(y,0);
  const src=c.createBufferSource(); src.buffer=buf; src.connect(c.destination); if (extraDest) src.connect(extraDest);
  const start=c.currentTime+0.05, dur=y.length/SR; src.start(start);
  let alive=true;
  const p={src, done:()=>{ alive=false; if (cv===$("cIn")) drawIn(); else drawFull(cv,img); if(onEnd) onEnd(); }};
  playing=p;
  src.onended=()=>{ if (playing===p){ playing=null; p.done(); } };
  const step=()=>{ if (!alive) return; const fr=Math.max(0,Math.min(1,(c.currentTime-start)/dur)); drawReveal(cv,img,fr); requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
$("pIn").onclick=()=>{ if(input) play(input.x,$("cIn"),imgIn); };
$("pAdd").onclick=()=>{ const o=cache[faceKey()]; if(o&&o.addLoud) play(o.addLoud,$("cOut"),imgOut); };
$("pOut").onclick=()=>{ const o=cache[faceKey()]; if(o) play(o.y,$("cOut"),imgOut); };
$("qIn").onclick=()=>{ if(input) play(input.x,$("cIn"),imgIn); };
$("qOut").onclick=()=>{ const o=currentOut(); if(o) play(o.y,$("cRoll"),imgRoll); };

// ---------------- 保存 ----------------
function download(blob,name){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000); }
function wav(y){
  const n=y.length, b=new ArrayBuffer(44+n*2), v=new DataView(b), w=(o,s)=>{for(let i=0;i<s.length;i++) v.setUint8(o+i,s.charCodeAt(i));};
  w(0,"RIFF"); v.setUint32(4,36+n*2,true); w(8,"WAVE"); w(12,"fmt "); v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,SR,true); v.setUint32(28,SR*2,true); v.setUint16(32,2,true); v.setUint16(34,16,true); w(36,"data"); v.setUint32(40,n*2,true);
  for (let i=0;i<n;i++) v.setInt16(44+i*2, Math.max(-1,Math.min(1,y[i]))*32767, true);
  return new Blob([b],{type:"audio/wav"});
}
$("sWav").onclick=()=>{ const o=cache[faceKey()]; if(o) download(wav(o.y),"nazono_spectrogram.wav"); };
$("qWav").onclick=()=>{ const o=currentOut(); if(o) download(wav(o.y), `nazono_${voice}.wav`); };
$("sPng").onclick=()=>$("cOut").toBlob(b=>download(b,"nazono_spectrogram.png"),"image/png");
function recordVideo(cv, img, y, name){
  if (!window.MediaRecorder || !cv.captureStream){ log("この環境では動画を保存できません。"); return; }
  const c=ac(), dest=c.createMediaStreamDestination();
  const ms=new MediaStream([...cv.captureStream(30).getVideoTracks(), ...dest.stream.getAudioTracks()]);
  const types=["video/mp4;codecs=avc1,mp4a.40.2","video/mp4","video/webm;codecs=vp9,opus","video/webm"]; const mt=types.find(t=>MediaRecorder.isTypeSupported(t))||"";
  let mr; try{ mr=new MediaRecorder(ms, mt?{mimeType:mt}:{}); }catch(e){ log("この環境では動画を保存できません。"); return; }
  const chunks=[]; mr.ondataavailable=e=>{ if(e.data.size) chunks.push(e.data); };
  mr.onstop=()=>{ const ext=(mr.mimeType||"").includes("mp4")?"mp4":"webm"; download(new Blob(chunks,{type:mr.mimeType||"video/webm"}), `${name}.${ext}`); log(`動画: ${name}.${ext} を保存しました。`); };
  log("動画: 録画中…"); mr.start();
  play(y, cv, img, dest, ()=>setTimeout(()=>{ if(mr.state!=="inactive") mr.stop(); },400));
}
$("sMov").onclick=()=>{ const o=cache[faceKey()]; if(o) recordVideo($("cOut"),imgOut,o.y,"nazono_spectrogram"); };
$("qMov").onclick=()=>{ const o=currentOut(); if(o) recordVideo($("cRoll"),imgRoll,o.y,`nazono_${voice}`); };

// ---------------- 入力：ファイル／録音／サンプル ----------------
async function decodeToMono(arrayBuf){
  const buf=await ac().decodeAudioData(arrayBuf);
  const len=Math.ceil(Math.min(buf.duration,MAX_LOAD)*SR), oc=new OfflineAudioContext(1,len,SR), s=oc.createBufferSource();
  s.buffer=buf; s.connect(oc.destination); s.start(); const r=await oc.startRendering();
  return r.getChannelData(0).slice();
}
// まとめて読めない形式（一部のmov・ALACなど）や大きな動画は、ブラウザで再生しながら先頭60秒の音を取り出す
async function captureFromMedia(file){
  const url=URL.createObjectURL(file), el=document.createElement("video");
  el.playsInline=true; el.preload="auto"; el.src=url;
  try{
    await new Promise((res,rej)=>{ el.onloadedmetadata=res; el.onerror=()=>rej(new Error("media")); setTimeout(()=>rej(new Error("timeout")),15000); });
    const dur=Math.min(CAP_SEC, isFinite(el.duration)&&el.duration>0 ? el.duration : CAP_SEC);
    const ctx=ac(), rate=ctx.sampleRate, src=ctx.createMediaElementSource(el);
    const proc=ctx.createScriptProcessor(4096,2,1), mute=ctx.createGain(); mute.gain.value=0;
    const parts=[]; let got=0;
    proc.onaudioprocess=e=>{ if(el.paused||el.ended) return; const ib=e.inputBuffer, a=ib.getChannelData(0), b=ib.numberOfChannels>1?ib.getChannelData(1):a, m=new Float32Array(a.length);
      for(let i=0;i<a.length;i++) m[i]=(a[i]+b[i])*0.5; parts.push(m); got+=m.length; };
    src.connect(proc); proc.connect(mute); mute.connect(ctx.destination);
    await el.play();
    await new Promise(res=>{ let last=-1; const iv=setInterval(()=>{ const t=Math.floor(el.currentTime);
        if(t!==last){ last=t; log(`動画から音を取り出しています… ${t} / ${Math.ceil(dur)} 秒`); }
        if(el.ended||el.currentTime>=dur){ clearInterval(iv); res(); } },200); el.onended=()=>{ clearInterval(iv); res(); }; });
    el.pause(); proc.disconnect(); src.disconnect(); mute.disconnect();
    if(!got) throw new Error("silent");
    const n=Math.min(got, Math.round(dur*rate)), buf=ctx.createBuffer(1,n,rate), ch=buf.getChannelData(0); let o=0;
    for(const m of parts){ if(o>=n) break; ch.set(m.subarray(0,Math.min(m.length,n-o)),o); o+=m.length; }
    const oc=new OfflineAudioContext(1,Math.ceil(n*SR/rate),SR), s=oc.createBufferSource(); s.buffer=buf; s.connect(oc.destination); s.start();
    return (await oc.startRendering()).getChannelData(0).slice();
  } finally { el.removeAttribute("src"); el.load(); URL.revokeObjectURL(url); }
}
// ---- MP4/MOV（HEVC・H.264など映像の種類によらず）から音声トラックだけを取り出す
// ブラウザが映像（HEVCなど）を再生できなくても、音（AAC・PCM）は自前で切り出して読める
async function demuxMp4Audio(file, maxSec){
  const rd=async (a,n)=>new DataView(await file.slice(a,a+n).arrayBuffer());
  const u8=(v,o)=>v.getUint8(o), u16=(v,o)=>v.getUint16(o), u32=(v,o)=>v.getUint32(o), u64=(v,o)=>v.getUint32(o)*4294967296+v.getUint32(o+4);
  const type=(v,o)=>String.fromCharCode(u8(v,o),u8(v,o+1),u8(v,o+2),u8(v,o+3));
  // 先頭から box を見て moov を探す（mdat がどれだけ大きくても読み飛ばす）
  let pos=0, moov=null; const end=file.size;
  while (pos+8<=end){ const h=await rd(pos,16); let size=u32(h,0), hl=8; const t=type(h,4);
    if (size===1){ size=u64(h,8); hl=16; } else if (size===0) size=end-pos;
    if (size<hl) break;
    if (t==="moov"){ moov=await rd(pos+hl,size-hl); break; }
    pos+=size; }
  if (!moov) throw new Error("no moov");
  const kids=(v,a,b)=>{ const out=[]; let p=a; while(p+8<=b){ let s=u32(v,p), hl=8; const t=type(v,p+4); if(s===1){ s=u64(v,p+8); hl=16; } else if(s===0) s=b-p; if(s<hl||p+s>b) break; out.push({t,a:p+hl,b:p+s}); p+=s; } return out; };
  const find=(v,a,b,path)=>{ let cur=[{a,b}]; for(const t of path){ const nx=[]; for(const c of cur) for(const k of kids(v,c.a,c.b)) if(k.t===t) nx.push(k); cur=nx; } return cur; };
  const V=moov;
  for (const trak of find(V,0,V.byteLength,["trak"])){
    const hd=find(V,trak.a,trak.b,["mdia","hdlr"])[0]; if(!hd||type(V,hd.a+8)!=="soun") continue;
    const md=find(V,trak.a,trak.b,["mdia","mdhd"])[0]; const tsc= u8(V,md.a)===1 ? u32(V,md.a+20) : u32(V,md.a+12);
    const st=find(V,trak.a,trak.b,["mdia","minf","stbl"])[0]; const box=t=>kids(V,st.a,st.b).find(k=>k.t===t);
    const sd=box("stsd"), e0=sd.a+8, fmt=type(V,e0+4), eEnd=e0+u32(V,e0);
    const ver=u16(V,e0+16); let ch=u16(V,e0+24), bits=u16(V,e0+26), rate=u32(V,e0+32)/65536, flags=0;
    if (ver===2){ rate=V.getFloat64(e0+40); ch=u32(V,e0+48); bits=u32(V,e0+56); flags=u32(V,e0+60); }
    // サンプル表
    const sz=box("stsz"), fixed=u32(V,sz.a+4), cnt=u32(V,sz.a+8), sizes=new Array(cnt); for(let i=0;i<cnt;i++) sizes[i]= fixed || u32(V,sz.a+12+i*4);
    const sc=box("stsc"), scn=u32(V,sc.a+4), stsc=[]; for(let i=0;i<scn;i++) stsc.push([u32(V,sc.a+8+i*12), u32(V,sc.a+12+i*12)]);
    const co=box("stco")||box("co64"), big=co.t==="co64", con=u32(V,co.a+4), offs=[]; for(let i=0;i<con;i++) offs.push(big?u64(V,co.a+8+i*8):u32(V,co.a+8+i*4));
    // チャンクごとにまとめて読む
    const isPCM=/^(sowt|twos|lpcm|in24|in32|fl32|fl64)$/.test(fmt);
    let maxSamp=Infinity;
    if (fmt==="mp4a") maxSamp=Math.ceil(maxSec*rate/1024)+4;
    const frames=[]; let si=0, bytes=0;
    for (let c=0;c<offs.length && si<cnt && frames.length<maxSamp;c++){
      let per=0; for(const [fc,n] of stsc) if(c+1>=fc) per=n;
      let len=0; for(let k=0;k<per&&si+k<cnt;k++) len+=sizes[si+k];
      const buf=new Uint8Array(await file.slice(offs[c],offs[c]+len).arrayBuffer()); let o=0;
      for(let k=0;k<per&&si<cnt;k++,si++){ frames.push(buf.subarray(o,o+sizes[si])); o+=sizes[si]; bytes+=sizes[si]; }
      if (isPCM && bytes>=maxSec*rate*ch*Math.max(1,bits/8)) break;
    }
    if (fmt==="mp4a"){
      // esds から AudioSpecificConfig を取り出して ADTS に包む
      let p=-1; for(let i=e0+28;i<eEnd-4;i++) if(type(V,i)==="esds"){ p=i+8; break; }
      if (p<0) throw new Error("no esds");
      const desc=()=>{ const tag=u8(V,p++); let l=0; for(let i=0;i<4;i++){ const b=u8(V,p++); l=(l<<7)|(b&127); if(!(b&128)) break; } return [tag,l]; };
      let [tag]=desc(); if(tag===3){ p+=2; const f=u8(V,p++); if(f&128) p+=2; if(f&64) p+=1+u8(V,p); if(f&32) p+=2; [tag]=desc(); }
      if (tag!==4) throw new Error("esds");
      p+=13; const [t5,l5]=desc(); if(t5!==5) throw new Error("asc");
      const asc=new Uint8Array(V.buffer, V.byteOffset+p, l5).slice();
      let aot=asc[0]>>3, fi=((asc[0]&7)<<1)|(asc[1]>>7), cc=(asc[1]>>3)&15; if(aot===31) aot=2; if(fi===15) fi=4; if(!cc) cc=2;
      const prof=(aot>=1&&aot<=4?aot:2)-1;
      try{
        const total=frames.reduce((s,f)=>s+f.length+7,0), out=new Uint8Array(total); let o=0;
        for(const f of frames){ const L=f.length+7; out[o]=0xFF; out[o+1]=0xF1; out[o+2]=(prof<<6)|(fi<<2)|(cc>>2); out[o+3]=((cc&3)<<6)|(L>>11); out[o+4]=(L>>3)&255; out[o+5]=((L&7)<<5)|31; out[o+6]=0xFC; out.set(f,o+7); o+=L; }
        return await decodeToMono(out.buffer);
      }catch(e){
        if (!window.AudioDecoder) throw e;
        return await decodeWithWebCodecs(frames, asc, rate||48000, ch||2);
      }
    }
    if (isPCM){
      const le= fmt==="sowt" || (fmt==="lpcm" && !(flags&2)), fl= fmt==="fl32"||fmt==="fl64"||(fmt==="lpcm"&&(flags&1));
      const B=bits/8|0 || 2, all=new Uint8Array(bytes); let o=0; for(const f of frames){ all.set(f,o); o+=f.length; }
      const dv=new DataView(all.buffer), n=Math.min(Math.floor(all.length/(B*ch)), Math.ceil(maxSec*rate)), m=new Float32Array(n);
      for(let i=0;i<n;i++){ let s=0; for(let c=0;c<ch;c++){ const q=(i*ch+c)*B; let v;
        if (fl) v= B===8? dv.getFloat64(q,le) : dv.getFloat32(q,le);
        else if (B===2) v=dv.getInt16(q,le)/32768; else if (B===3){ const x= le ? (all[q]|all[q+1]<<8|all[q+2]<<16) : (all[q]<<16|all[q+1]<<8|all[q+2]); v=((x<<8)>>8)/8388608; } else v=dv.getInt32(q,le)/2147483648;
        s+=v; } m[i]=s/ch; }
      return await resampleMono(m, rate);
    }
    throw new Error("codec "+fmt);
  }
  throw new Error("no audio track");
}
async function resampleMono(m, rate){
  if (Math.round(rate)===SR) return m;
  const ctx=ac(), buf=ctx.createBuffer(1,m.length,rate); buf.getChannelData(0).set(m);
  const oc=new OfflineAudioContext(1,Math.ceil(m.length*SR/rate),SR), s=oc.createBufferSource(); s.buffer=buf; s.connect(oc.destination); s.start();
  return (await oc.startRendering()).getChannelData(0).slice();
}
async function decodeWithWebCodecs(frames, asc, rate, ch){
  const outs=[]; let err=null;
  const dec=new AudioDecoder({ output:a=>{ const n=a.numberOfFrames, nc=a.numberOfChannels, m=new Float32Array(n), t=new Float32Array(n);
      for(let c=0;c<nc;c++){ a.copyTo(t,{planeIndex:c,format:"f32-planar"}); for(let i=0;i<n;i++) m[i]+=t[i]/nc; } outs.push(m); a.close(); }, error:e=>{ err=e; } });
  dec.configure({codec:"mp4a.40.2", sampleRate:rate, numberOfChannels:ch, description:asc});
  let ts=0; for(const f of frames){ dec.decode(new EncodedAudioChunk({type:"key", timestamp:ts, data:f})); ts+=Math.round(1024/rate*1e6); }
  await dec.flush(); dec.close(); if(err&&!outs.length) throw err;
  const n=outs.reduce((s,a)=>s+a.length,0), m=new Float32Array(n); let o=0; for(const a of outs){ m.set(a,o); o+=a.length; }
  return await resampleMono(m, rate);
}
async function decodeFile(f){
  const isMp4=/\.(mp4|mov|m4v|m4a|3gp|3g2)$/i.test(f.name) || /mp4|quicktime|3gpp/.test(f.type);
  if (f.size <= 200*1024*1024){ try{ return await decodeToMono(await f.arrayBuffer()); }catch(e){} }
  if (isMp4){ try{ log("動画の中から音だけを取り出しています…"); return await demuxMp4Audio(f, MAX_LOAD); }catch(e){} }
  log(f.size > 200*1024*1024 ? "大きなファイルなので、再生しながら先頭の音だけを取り出します。" : "そのままでは読めない形式なので、再生しながら音を取り出します。");
  return await captureFromMedia(f);
}
$("bFile").onclick=()=>{ ac(); $("file").click(); };
$("file").onchange=async e=>{ const f=e.target.files[0]; if(!f) return;
  try{ log(`読み込み: ${f.name}`, true); await setInput(await decodeFile(f), f.name); }
  catch(err){ log("この形式は読み込めませんでした。音が入っていないか、このブラウザが再生できない形式です（mp3・m4a・wav・mp4に変換すると読めます）。"); } e.target.value=""; };

let recState=null;
$("bRec").onclick=async ()=>{
  if (recState){ recState.stop(); return; }
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder){ log("この環境では録音できません。"); return; }
  let stream; try{ stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}}); }
  catch(e){ log("マイクを使えませんでした。"); return; }
  ac(); const mr=new MediaRecorder(stream), chunks=[]; mr.ondataavailable=e=>{ if(e.data.size) chunks.push(e.data); };
  const t0=performance.now(), btn=$("bRec"); btn.classList.add("rec");
  const timer=setInterval(()=>{ const s=(performance.now()-t0)/1000; btn.textContent=`停止 ${s.toFixed(1)}秒`; if (s>=15) recState&&recState.stop(); },100);
  mr.onstop=async ()=>{ clearInterval(timer); stream.getTracks().forEach(t=>t.stop()); btn.classList.remove("rec"); btn.textContent="録音する"; recState=null;
    try{ await setInput(await decodeToMono(await new Blob(chunks,{type:mr.mimeType}).arrayBuffer()), "録音"); }catch(e){ log("録音を読み込めませんでした。"); } };
  recState={stop:()=>{ if(mr.state!=="inactive") mr.stop(); }};
  log("録音中…（最長15秒。もう一度押すと停止）", true); mr.start();
};

// サンプル：合成した母音「あ・い・う・え・お」（フォルマント合成）
function sampleVowels(){
  const V=[[800,1200,2500],[300,2300,3000],[350,1300,2300],[500,1900,2500],[500,800,2500]], BW=[80,100,140];
  const seg=0.42, gap=0.1, lead=0.25, total=lead+V.length*(seg+gap)+0.2, x=new Float32Array(Math.floor(total*SR));
  V.forEach((fm,vi)=>{
    const st=Math.floor((lead+vi*(seg+gap))*SR), n=Math.floor(seg*SR), src=new Float64Array(n); let ph=0;
    for (let i=0;i<n;i++){ const t=i/SR, f0=128-12*t/seg+3*Math.sin(2*Math.PI*5.5*t); ph+=f0/SR; if (ph>=1){ ph-=1; src[i]=1; } src[i]+=0.01*(Math.random()-0.5); }
    let sig=src;
    for (let r=0;r<3;r++){ const R=Math.exp(-Math.PI*BW[r]/SR), th=2*Math.PI*fm[r]/SR, a1=2*R*Math.cos(th), a2=-R*R, out=new Float64Array(n); let y1=0,y2=0;
      for (let i=0;i<n;i++){ const yv=(1-R)*sig[i]+a1*y1+a2*y2; out[i]=yv; y2=y1; y1=yv; } sig=out; }
    for (let i=0;i<n;i++){ const env=Math.min(1,i/(0.03*SR),(n-i)/(0.05*SR)); x[st+i]+=sig[i]*env; }
  });
  return x;
}
$("bSample").onclick=()=>setInput(sampleVowels(),"サンプル（合成した母音 あいうえお）");

// ---------------- タブ・モード ----------------
function setTab(t){ tab=t; $("tFace").setAttribute("aria-selected",t==="face"); $("tPiano").setAttribute("aria-selected",t==="piano");
  $("pFace").classList.toggle("hidden",t!=="face"); $("pPiano").classList.toggle("hidden",t!=="piano"); stopAll(); drawIn(); refresh(); }
$("tFace").onclick=()=>setTab("face"); $("tPiano").onclick=()=>setTab("piano");
function seg(a,b,on){ $(a).setAttribute("aria-pressed",on); $(b).setAttribute("aria-pressed",!on); }
function setFM(m){ faceMode=m; [["mHide","hide"],["mPerm","perm"],["mStamp","stamp"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",v===m)); syncPos(); stopAll(); return refresh(); }
$("mHide").onclick=()=>setFM("hide"); $("mPerm").onclick=()=>setFM("perm"); $("mStamp").onclick=()=>setFM("stamp");
$("aLine").onclick=()=>{ art="line"; seg("aLine","aTone",true); stopAll(); refresh(); };
$("aTone").onclick=()=>{ art="tone"; seg("aLine","aTone",false); stopAll(); refresh(); };
const setDetail=d=>{ detail=d; [["dFine","fine"],["dMid","mid"],["dCoarse","coarse"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",v===d)); };
[["dFine","fine"],["dMid","mid"],["dCoarse","coarse"]].forEach(([id,v])=>$(id).onclick=()=>{ setDetail(v); stopAll(); refresh(); });
$("bFull").onclick=()=>{ band="full"; seg("bFull","bHigh",true); stopAll(); refresh(); };
$("bHigh").onclick=()=>{ band="high"; seg("bFull","bHigh",false); stopAll(); refresh(); };
function setLookUI(l){ look=l; [["kConst","const"],["kAdapt","adapt"],["kPm","pm"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",v===l));
  $("constOpts").classList.toggle("hidden",l!=="const"); $("adaptOpts").classList.toggle("hidden",l!=="adapt"); $("pmOpts").classList.toggle("hidden",l!=="pm"); $("pAdd").classList.toggle("hidden", faceMode!=="hide"||l==="pm"); }
$("kConst").onclick=()=>{ setLookUI("const"); stopAll(); refresh(); };
$("kAdapt").onclick=()=>{ setLookUI("adapt"); stopAll(); refresh(); };
$("kPm").onclick=()=>{ setLookUI("pm"); stopAll(); refresh(); };
let depT=null; $("rDepth").oninput=e=>{ depth=+e.target.value; $("vDepth").textContent=depth+" dB"; clearTimeout(depT); depT=setTimeout(()=>{ stopAll(); refresh(); },250); };
// 型押しの調整
function syncStamp(){ $("rSStr").value=Math.round(STAMP.str*100); $("vSStr").textContent=Math.round(STAMP.str*100)+"%";
  $("rSLvl").value=STAMP.lvl; $("vSLvl").textContent=(STAMP.lvl>0?"+":STAMP.lvl<0?"":"±")+STAMP.lvl+" dB"; $("rSDR").value=STAMP.dr; $("vSDR").textContent=STAMP.dr+" dB";
  [["sFine","fine"],["sMid","mid"],["sCoarse","coarse"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",v===STAMP.detail)); }
let stT=null; const stampRefresh=()=>{ clearTimeout(stT); stT=setTimeout(()=>{ stopAll(); refresh(); },250); };
[["rSStr","str",100],["rSLvl","lvl",1],["rSDR","dr",1]].forEach(([id,k,d])=>{ $(id).oninput=e=>{ STAMP[k]=+e.target.value/d; syncStamp(); stampRefresh(); }; });
[["sFine","fine"],["sMid","mid"],["sCoarse","coarse"]].forEach(([id,v])=>$(id).onclick=()=>{ STAMP.detail=v; syncStamp(); stopAll(); refresh(); });
// 並べる
function syncRow(){ $("rRowN").value=ROW.n; $("vRowN").textContent=ROW.n; $("rGap").value=Math.round(ROW.gap*100); $("vGap").textContent=Math.round(ROW.gap*100)+"%"; $("cFade").checked=ROW.fade;
  [["dX","x"],["dY","y"],["dXY","xy"],["dG","grid"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",v===ROW.dir)); $("rowOpts").classList.toggle("hidden",ROW.n<=1); }
let rowT=null; const rowRefresh=()=>{ clearTimeout(rowT); rowT=setTimeout(()=>{ stopAll(); refresh(); },60); };
$("rRowN").oninput=e=>{ ROW.n=+e.target.value; syncRow(); drawIn(); }; $("rRowN").onchange=rowRefresh;
$("rGap").oninput=e=>{ ROW.gap=+e.target.value/100; syncRow(); drawIn(); }; $("rGap").onchange=rowRefresh;
$("cFade").onchange=e=>{ ROW.fade=e.target.checked; rowRefresh(); };
[["dX","x"],["dY","y"],["dXY","xy"],["dG","grid"]].forEach(([id,v])=>$(id).onclick=()=>{ ROW.dir=v; syncRow(); drawIn(); rowRefresh(); });
$("cCarve").onchange=e=>{ carve=e.target.checked; stopAll(); refresh(); };
let relT=null; $("rRel").oninput=e=>{ rel=+e.target.value; $("vRel").textContent=(rel>0?"+":rel<0?"":"±")+rel+" dB"; clearTimeout(relT); relT=setTimeout(()=>{ stopAll(); refresh(); },250); };
// 顔の大きさ・位置
function syncPos(){ const p=POS[faceMode]; $("rSize").value=Math.round(p.s*100); $("rPx").value=Math.round(p.x*100); $("rPy").value=Math.round(p.y*100);
  $("vSize").textContent=Math.round(p.s*100)+"%"; $("vPx").textContent=Math.round(p.x*100); $("vPy").textContent=Math.round(p.y*100); }
let posT=null;
[["rSize","s"],["rPx","x"],["rPy","y"]].forEach(([id,k])=>{
  $(id).oninput=e=>{ POS[faceMode][k]=+e.target.value/100; syncPos(); drawIn(); };
  $(id).onchange=()=>{ clearTimeout(posT); posT=setTimeout(()=>{ stopAll(); refresh(); },50); };
});
// おまかせ配置：今の大きさのまま、元の音がいちばん静かな場所を探す
function autoPlace(){
  if (!input) return; const S=stft(input.x,N1,H1), {F,K}=S, bt=4, bk=8, GF=Math.ceil(F/bt), GK=Math.ceil(K/bk);
  const P=new Float64Array((GF+1)*(GK+1));
  for (let gf=0;gf<GF;gf++) for (let gk=0;gk<GK;gk++){ let s=0,n=0; for (let f=gf*bt;f<Math.min(F,gf*bt+bt);f++) for (let k=gk*bk;k<Math.min(K,gk*bk+bk);k++){ s+=Math.log10(Math.hypot(S.RE[f*K+k],S.IM[f*K+k])+1e-7); n++; }
    P[(gf+1)*(GK+1)+gk+1]=s/n+P[gf*(GK+1)+gk+1]+P[(gf+1)*(GK+1)+gk]-P[gf*(GK+1)+gk]; }
  const p=POS[faceMode], keep={x:p.x,y:p.y}; let best=null;
  for (let xi=0;xi<=20;xi++) for (let yi=0;yi<=20;yi++){ p.x=xi/20; p.y=yi/20; const b=faceBox(F,K);
    const a0=Math.floor(b.t0/bt), a1=Math.max(a0+1,Math.ceil(b.t1/bt)), c0=Math.floor(b.kLo/bk), c1=Math.max(c0+1,Math.ceil((b.kHi+1)/bk));
    const v=(P[a1*(GK+1)+c1]-P[a0*(GK+1)+c1]-P[a1*(GK+1)+c0]+P[a0*(GK+1)+c0])/((a1-a0)*(c1-c0));
    if (!best||v<best.v-1e-9) best={v,x:p.x,y:p.y}; }
  p.x=best?best.x:keep.x; p.y=best?best.y:keep.y; syncPos(); stopAll(); log(`おまかせ配置: 横 ${Math.round(p.x*100)} / 縦 ${Math.round(p.y*100)}`); return refresh();
}
$("bAuto").onclick=()=>autoPlace();
// 使う区間
let segT=null;
$("rStart").oninput=e=>{ segStart=+e.target.value; syncTrim(); drawWave(); };
$("rLen").oninput=e=>{ segLen=+e.target.value; syncTrim(); drawWave(); };
$("rStart").onchange=$("rLen").onchange=()=>{ clearTimeout(segT); segT=setTimeout(()=>applySeg(),50); };
{ const cv=$("cWave"); let drag=false;
  const at=e=>{ if(!full) return; const r=cv.getBoundingClientRect(), dur=full.x.length/SR, t=(e.clientX-r.left)/r.width*dur; segStart=t-segLen/2; syncTrim(); drawWave(); };
  cv.addEventListener("pointerdown",e=>{ drag=true; cv.setPointerCapture(e.pointerId); at(e); });
  cv.addEventListener("pointermove",e=>{ if(drag) at(e); });
  cv.addEventListener("pointerup",()=>{ if(!drag) return; drag=false; applySeg(); });
  cv.addEventListener("pointercancel",()=>{ drag=false; }); }
let lvlT=null; $("rLvl").oninput=e=>{ lvl=+e.target.value; $("vLvl").textContent=lvl+" dB"; clearTimeout(lvlT); lvlT=setTimeout(()=>{ stopAll(); refresh(); },250); };
$("vPiano").onclick=()=>{ voice="piano"; seg("vPiano","vSine",true); stopAll(); refresh(); };
$("vSine").onclick=()=>{ voice="sine"; seg("vPiano","vSine",false); stopAll(); refresh(); };
let polyT=null; $("rPoly").oninput=e=>{ $("vPoly").textContent=e.target.value; clearTimeout(polyT); polyT=setTimeout(()=>{ stopAll(); refresh(); },200); };

// 折りたたみ（「＋」を押すと開く）
(typeof root!=="undefined"?root:document).querySelectorAll(".mbtn").forEach(b=>b.onclick=()=>{ const open=b.getAttribute("aria-expanded")!=="true"; b.setAttribute("aria-expanded",open); b.firstChild.textContent=open?"－":"＋"; b.nextElementSibling.classList.toggle("hidden",!open); });
// テスト用フック
window.__eznSpec={ decodeFile, sample:()=>setInput(sampleVowels(),"サンプル"), setInput, setTab, refresh,
  setFaceMode:m=>setFM(m), setDetail:d=>{ setDetail(d); return refresh(); }, setHide:(a,b,l)=>{ art=a; band=b; lvl=l; seg("aLine","aTone",a==="line"); seg("bFull","bHigh",b==="full"); $("rLvl").value=l; $("vLvl").textContent=l+" dB"; return refresh(); }, inp:()=>input.x,
  setVoice:v=>{ voice=v; seg("vPiano","vSine",v==="piano"); return refresh(); },
  out:()=>currentOut(), wav, get log(){ return logEl.textContent; },
  setPos:(sz,x,y)=>{ Object.assign(POS[faceMode],{s:sz,x,y}); syncPos(); return refresh(); }, autoPlace,
  setLook:(l,r,c)=>{ setLookUI(l); if(l==="pm"){ if(r!==undefined) depth=r; } else rel=r??rel; if(c!==undefined){ carve=c; $("cCarve").checked=c; } return refresh(); },
  setStamp:o=>{ Object.assign(STAMP,o); syncStamp(); return refresh(); }, boxes:()=>layerBoxes(Math.floor(input.x.length/H1)+1,N1/2+1),
  setRow:(n,dir,gap,fade)=>{ ROW.n=n; ROW.dir=dir||ROW.dir; ROW.gap=gap??ROW.gap; ROW.fade=fade??ROW.fade; syncRow(); return refresh(); },
  setSeg:(st,ln)=>{ segStart=st; segLen=ln; syncTrim(); drawWave(); return applySeg(); }, box:()=>faceBox(Math.floor(input.x.length/H1)+1,N1/2+1) };

// 起動
blank($("cIn"),"音を入れてください"); blank($("cOut")); blank($("cRoll")); syncPos(); syncRow(); setLookUI(look); syncStamp();
const boot=()=>ensureArts().then(()=>{ if(!input) return setInput(sampleVowels(),"サンプル（合成した母音 あいうえお）"); });
const io=new IntersectionObserver(es=>{ if (es.some(e=>e.isIntersecting)){ io.disconnect(); boot(); } },{rootMargin:"200px"});
io.observe($("cIn"));
})();

})();
