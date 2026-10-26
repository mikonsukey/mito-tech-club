/* mito-tech-club 版：謎ノ美兎の画像データは含めていません。顔のデータは window.MITO_ASSETS（lib/mito-assets.js）から読みます。 */
/*!
 * 謎ノ美兎透かし (ezn-mark.js)
 * 使い方: id="ezn-mark" の div を置いて、このファイルを読み込む。文章・音・写真はブラウザ内だけで処理されます。
 */
(()=>{
const root=document.getElementById("ezn-mark");
if(!root||root.dataset.eznReady) return; root.dataset.eznReady="1";
const st=document.createElement("style"); st.textContent='#ezn-mark{--bg:#0e0e0d;--panel:#181816;--ink:#ebe7df;--mute:#8d887e;--line:#2c2b28;--red:#e0352b;margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,"Hiragino Sans","Noto Sans JP","Yu Gothic",sans-serif;-webkit-text-size-adjust:100%;max-width:640px;margin:0 auto;padding:16px 14px 20px;border-radius:14px;line-height:1.5}#ezn-mark button{margin:0;box-shadow:none;text-transform:none;letter-spacing:normal}#ezn-mark small{font-size:11px;font-weight:600;opacity:.8}#ezn-mark textarea{margin-bottom:0}#ezn-mark *{box-sizing:border-box}#ezn-mark .label{font-size:12px;letter-spacing:.08em;color:var(--mute);margin:20px 0 6px;font-weight:700}#ezn-mark .row{display:flex;gap:8px;flex-wrap:wrap}#ezn-mark button{font-family:inherit}#ezn-mark .btn{flex:1 1 0;min-width:0;padding:13px 8px;border:1.5px solid var(--ink);background:transparent;color:var(--ink);border-radius:6px;font-size:14px;font-weight:700;cursor:pointer}#ezn-mark .btn.primary{background:var(--red);border-color:var(--red);color:#fff}#ezn-mark .tabs{display:flex;border-bottom:1.5px solid var(--line)}#ezn-mark .tabs button{flex:1;padding:12px 6px;background:none;border:0;border-bottom:3px solid transparent;color:var(--mute);font-size:15px;font-weight:800;cursor:pointer}#ezn-mark .tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--red)}#ezn-mark .seg{display:flex;border:1.5px solid var(--ink);border-radius:6px;overflow:hidden;margin-top:10px}#ezn-mark .seg button{flex:1;padding:10px 6px;background:none;border:0;color:var(--ink);font-size:13px;font-weight:700;cursor:pointer;line-height:1.4}#ezn-mark .seg button[aria-pressed="true"]{background:var(--ink);color:var(--bg)}#ezn-mark .key{display:flex;align-items:center;gap:10px;font-size:13px;font-weight:700;margin-top:10px}#ezn-mark .key input{flex:1;min-width:0;padding:10px 12px;border:1.5px solid var(--line);border-radius:6px;background:#000;color:var(--ink);font:14px ui-monospace,Menlo,Consolas,monospace}#ezn-mark textarea{width:100%;height:150px;margin-top:8px;padding:10px 12px;border:1px solid var(--line);border-radius:6px;background:#000;color:#d9d4ca;font:13px/1.8 system-ui,-apple-system,"Hiragino Sans","Noto Sans JP",sans-serif;resize:vertical}#ezn-mark .cv{position:relative;margin-top:8px;background:#000;border:1px solid var(--line);border-radius:6px;overflow:hidden}#ezn-mark .cv canvas{display:block;width:100%;height:auto}#ezn-mark .cv canvas.px{image-rendering:pixelated}#ezn-mark .cv .tag{position:absolute;left:8px;top:8px;font:11px/1 ui-monospace,Menlo,monospace;color:#fff;background:rgba(0,0,0,.6);padding:4px 6px;border-radius:3px}#ezn-mark .slider{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:13px;font-weight:700}#ezn-mark .slider input{flex:1;accent-color:var(--red)}#ezn-mark .slider .val{width:4.4em;text-align:right;font-variant-numeric:tabular-nums}#ezn-mark .stat{margin-top:10px;background:#000;border:1px solid var(--line);border-radius:6px;padding:10px 12px;font:12px/1.75 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#bfbab0;white-space:pre-wrap}#ezn-mark .stat b{color:var(--ink)}#ezn-mark .read{margin-top:8px;background:#000;border:1px solid var(--line);border-radius:6px;padding:10px 12px;font-size:14px;line-height:1.9;color:#a39e93}#ezn-mark .read span.on{color:#fff;background:rgba(224,53,43,.35);border-radius:3px}#ezn-mark .more{margin-top:12px;border:1px solid var(--line);border-radius:6px;padding:0 12px}#ezn-mark .more .mbtn{display:block;width:100%;text-align:left;background:none;border:0;color:var(--ink);padding:12px 0;font-size:13px;font-weight:700;cursor:pointer}#ezn-mark .more .mbtn b{color:var(--red);margin-right:4px}#ezn-mark .more .mbody{padding-bottom:12px}#ezn-mark .hint{font-size:12px;color:var(--mute);line-height:1.75;margin-top:8px}#ezn-mark .note{margin-top:26px;padding-top:14px;border-top:1px solid var(--line);font-size:12px;color:var(--mute);line-height:1.8}#ezn-mark .step{margin-top:16px;padding:14px 14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:10px}#ezn-mark .sh{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:900;margin-bottom:10px}#ezn-mark .num{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:var(--red);color:#fff;font-size:14px;font-weight:900;flex:none}#ezn-mark .fld{display:block;margin-top:12px}#ezn-mark .fl{display:block;font-size:13px;font-weight:800;color:var(--ink)}#ezn-mark .fl small{font-weight:600;color:var(--mute)}#ezn-mark .fh{display:block;font-size:11.5px;color:var(--mute);margin-top:2px;line-height:1.6}#ezn-mark .fld input{display:block;width:100%;margin-top:6px;padding:12px;border:1.5px solid #55524c;border-radius:6px;background:#000;color:var(--ink);font:15px ui-monospace,Menlo,Consolas,monospace}#ezn-mark .fld input:focus,#ezn-mark textarea.in:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(224,53,43,.25)}#ezn-mark textarea.in{border:1.5px dashed #6a665f;background:#050505;min-height:170px;color:var(--ink);font-size:14px}#ezn-mark textarea.in::placeholder{color:#8d887e;font-weight:700}#ezn-mark textarea.out{background:#0b0b0a;color:#bdb8ae;border-style:solid}#ezn-mark textarea.out::placeholder,#ezn-mark .fld input::placeholder{color:#5f5b55}#ezn-mark .hidden{display:none}'; document.head.appendChild(st);
root.innerHTML=`<div class="eznmk-in">
  <div class="tabs" role="tablist">
    <button role="tab" id="eznmk-tText" aria-selected="true">文章</button>
    <button role="tab" id="eznmk-tPhoto" aria-selected="false">写真</button>
  </div>

  <!-- ===== 文章 ===== -->
  <section id="eznmk-pText">
    <p class="hint">ふつうの短い文が並んでいるだけですが、合言葉（鍵）で調べると、単語の並びに顔が浮かびます。</p>

    <div class="step">
      <div class="sh"><span class="num">1</span>透かし入りの文章をつくる</div>
      <label class="fld" for="eznmk-kGen"><span class="fl">合言葉（鍵）</span><span class="fh">英数字なら何でもOK。調べるときに同じものを使います</span>
        <input id="eznmk-kGen" value="nazono" autocomplete="off" spellcheck="false" placeholder="例：nazono"></label>
      <div class="fl" style="margin-top:12px">顔の細かさ（＝文章の長さ）</div>
      <div class="seg" role="group" aria-label="顔の細かさ">
        <button id="eznmk-s32" aria-pressed="false">32×32<br><small>約190文</small></button>
        <button id="eznmk-s48" aria-pressed="true">48×48<br><small>約380文</small></button>
        <button id="eznmk-s64" aria-pressed="false">64×64<br><small>約680文</small></button>
      </div>
      <div class="row" style="margin-top:12px"><button class="btn primary" id="eznmk-bGen">文章をつくる</button><button class="btn" id="eznmk-bCopy">コピー</button></div>
      <div class="fl" style="margin-top:12px">できた文章 <small>（ここは編集できません。コピーして使ってください）</small></div>
      <textarea id="eznmk-tGen" class="out" readonly placeholder="「文章をつくる」を押すと、ここに出ます。"></textarea>
      <p class="hint" id="eznmk-hGen"></p>
    </div>

    <div class="step">
      <div class="sh"><span class="num">2</span>文章を調べる</div>
      <div class="row"><button class="btn" id="eznmk-bSend">↓ 1の文章をここに入れる</button></div>
      <label class="fld" for="eznmk-tDet"><span class="fl">調べたい文章</span><span class="fh">貼り付けてください。一部を書き換えたり、消したりしても試せます</span>
        <textarea id="eznmk-tDet" class="in" placeholder="ここをタップして、文章を貼り付け"></textarea></label>
      <label class="fld" for="eznmk-kDet"><span class="fl">合言葉（鍵）</span><span class="fh">1で使ったものと同じにします。違うと顔は出ません</span>
        <input id="eznmk-kDet" value="nazono" autocomplete="off" spellcheck="false" placeholder="例：nazono"></label>
      <div class="row" style="margin-top:12px"><button class="btn primary" id="eznmk-bDet">調べる</button></div>
    </div>

    <div class="step">
      <div class="sh"><span class="num">3</span>結果</div>
      <div class="cv"><canvas id="eznmk-cv" class="px" width="480" height="480"></canvas><span class="tag">単語ごとの判定（白＝グリーン、黒＝レッド）</span></div>
      <div class="slider"><span>折り返す幅</span><input type="range" id="eznmk-rW" min="8" max="96" step="1" value="48"><span class="val" id="eznmk-vW">48</span></div>
      <div class="stat" id="eznmk-stat">まだ調べていません。</div>
    </div>
  </section>

  <!-- ===== 写真 ===== -->
  <section id="eznmk-pPhoto" class="hidden">
    <p class="hint">白い背景（Xのタイムライン）ではふつうの写真、黒い背景（タップして開いた画面）では謎ノ美兎の顔が見える、半透明のPNGを作ります。</p>
    <div class="row" style="margin-top:10px">
      <button class="btn primary" id="eznmk-bPhoto">写真を読み込む</button>
      <button class="btn" id="eznmk-bPSample">サンプル</button>
    </div>
    <input type="file" id="eznmk-fPhoto" accept="image/*" hidden>
    <div class="seg" role="group" aria-label="図柄" style="display:none">
      <button id="eznmk-gLine" aria-pressed="true">線画</button>
      <button id="eznmk-gTone" aria-pressed="false">明暗</button>
    </div>
    <div class="seg" role="group" aria-label="見せ方" style="display:none">
      <button id="eznmk-vAlways" aria-pressed="true">いつも見える<br><small>足し引き</small></button>
      <button id="eznmk-vZoom" aria-pressed="false">拡大すると出る<br><small>4K・高画質向け</small></button>
      <button id="eznmk-vBg" aria-pressed="false">背景で変わる<br><small>タップすると出る</small></button>
    </div>
    <div class="slider" id="eznmk-satBox"><span>写真の色</span><input type="range" id="eznmk-rSat" min="0" max="100" step="1" value="60"><span class="val" id="eznmk-vSat">60%</span></div>
    <p class="hint hidden" id="eznmk-hZoom">1画素ごとに明るい・暗いを入れ替えた細かい縞で顔を描きます。縮小した表示（SNSのタイムラインや普通画質）では縞が打ち消し合って消え、元の大きさで表示したときだけ、縞が明るく見えて顔が浮かびます。「PNG保存」で元の大きさのまま保存し、4K・高画質で読み込める所に投稿して、拡大して見てください。暗すぎる所・明るすぎる所には入りにくいです。</p>
    <div class="slider"><span>顔の明るさ</span><input type="range" id="eznmk-rStr" min="0" max="100" step="1" value="35"><span class="val" id="eznmk-vStr">35%</span></div>
    <p class="hint" id="eznmk-hBg">Xで透明を保つため、長辺800px以下・256色のPNGで保存します。PCのブラウザから投稿してください（スマホアプリから投稿するとJPEGに変換されて透明が消えます）。ダークモードで見ている人には、最初から顔が見えます。「写真の色」を濃くすると、黒い背景の上にも写真がうっすら残ります（不透明度は1画素に1つなので、色の分だけ差が出るため）。</p>
    <div class="more">
      <button class="mbtn" aria-expanded="false"><b>＋</b>位置と大きさ</button>
      <div class="mbody hidden">
      <div class="slider"><span>大きさ</span><input type="range" id="eznmk-rPs" min="20" max="100" step="1" value="80"><span class="val" id="eznmk-vPs">80%</span></div>
      <div class="slider"><span>横の位置</span><input type="range" id="eznmk-rPx" min="0" max="100" step="1" value="50"><span class="val" id="eznmk-vPx">50</span></div>
      <div class="slider"><span>縦の位置</span><input type="range" id="eznmk-rPy" min="0" max="100" step="1" value="50"><span class="val" id="eznmk-vPy">50</span></div>
      </div>
    </div>
    <div class="cv"><canvas id="eznmk-cPhoto" width="720" height="540"></canvas><span class="tag" id="eznmk-tagPhoto">白い背景の上（タイムライン）</span></div>
    <div class="row" style="margin-top:10px">
      <button class="btn" id="eznmk-bHold">押している間 黒い背景で見る</button>
      <button class="btn" id="eznmk-bPng">PNG保存</button>
    </div>
    <p class="hint">「顔の明るさ」を上げると黒い背景の上の顔が明るくなり、そのぶん白い背景の上の写真が白っぽくなります。</p>
  </section>

  <div class="note">
    <span id="eznmk-noteText">文章のしくみ：鍵と「ひとつ前の単語」から、次の単語の候補を白（グリーン）か黒（レッド）に振り分けます。つくるときは、候補8つから顔の絵のその場所と同じ色の単語を選び、調べるときは同じ鍵で色を計算して、決まった幅で折り返して並べます。大規模言語モデル（AI）の出力に入れる電子透かし（グリーンリスト方式）の考え方を、単語1つ＝絵の1マスとして使ったものです。<br></span>
    <span id="eznmk-notePriv">文章も写真も、すべてこの端末のブラウザ内で処理し、どこにも送信しません。<br></span>
    ※ 謎ノ美兎のファン作品（二次創作）です。
  </div>
</div>`;

(()=>{
"use strict";
const $ = id => document.getElementById("eznmk-"+id);
let ART_STAMP = window.MITO_ASSETS.stamp;
let ART_LINE = window.MITO_ASSETS.line;
// ブログでは、顔の図柄を「謎ノ美兎スペクトログラム」のファイルから読み込む（同じ顔を1か所で管理する）
const ART_SRC = ""; // ブログ版はスペクトログラムのファイルから顔を読んでいた
async function artUrls(){ if (!ART_SRC) return; try{ const js=await fetch(ART_SRC).then(r=>r.text()); const g=k=>(js.match(new RegExp(k+' = "(data:[^"]+)"'))||[])[1]; ART_STAMP=g("ART_STAMP")||ART_STAMP; ART_LINE=g("ART_LINE")||ART_LINE; }catch(e){} }
const BITS = window.MITO_ASSETS.bits;

// ================================================================ 文章
// 単語の候補（8つずつ）と読み。6つの枠を順に回して「いつ・だれが・どこで・何を・どうした。ひとこと。」の文にする
const SLOTS = [
  [["朝、","a sa ,"],["昼に","hi ru ni"],["夕方、","yu u ga ta ,"],["夜中に","yo na ka ni"],["今日は","kyo u wa"],["きのう","ki no u"],["雨の日に","a me no hi ni"],["休みの日に","ya su mi no hi ni"]],
  [["猫が","ne ko ga"],["私は","wa ta shi wa"],["弟が","o to u to ga"],["ロボットが","ro bo Q to ga"],["うさぎが","u sa gi ga"],["先生が","se N se i ga"],["隣の人が","to na ri no hi to ga"],["小さな犬が","chi i sa na i nu ga"]],
  [["駅で","e ki de"],["公園で","ko u e N de"],["台所で","da i do ko ro de"],["屋上で","o ku jo u de"],["図書館で","to sho ka N de"],["海辺で","u mi be de"],["商店街で","sho u te N ga i de"],["部屋の隅で","he ya no su mi de"]],
  [["パンを","pa N o"],["古い本を","fu ru i ho N o"],["紅茶を","ko u cha o"],["手紙を","te ga mi o"],["青い傘を","a o i ka sa o"],["写真を","sha shi N o"],["鍵を","ka gi o"],["地図を","chi zu o"]],
  [["見つけた。","mi tsu ke ta ."],["選んだ。","e ra N da ."],["運んだ。","ha ko N da ."],["眺めた。","na ga me ta ."],["落とした。","o to shi ta ."],["磨いた。","mi ga i ta ."],["隠した。","ka ku shi ta ."],["配った。","ku ba Q ta ."]],
  [["少し嬉しい。","su ko shi u re shi i ."],["なぜか眠い。","na ze ka ne mu i ."],["不思議だ。","fu shi gi da ."],["空が青い。","so ra ga a o i ."],["風が冷たい。","ka ze ga tsu me ta i ."],["楽しかった。","ta no shi ka Q ta ."],["誰も知らない。","da re mo shi ra na i ."],["また明日。","ma ta a shi ta ."]],
];
const NS = SLOTS.length, WORDS = SLOTS.map(s=>s.map(w=>w[0])), READ = Object.fromEntries(SLOTS.flat());

function h32(s){ let h=0x811c9dc5; for (let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,0x01000193); }
  h^=h>>>16; h=Math.imul(h,0x85ebca6b); h^=h>>>13; h=Math.imul(h,0xc2b2ae35); h^=h>>>16; return h>>>0; }
const green = (key, prev, tok) => h32(key+"␟"+prev+"␟"+tok) & 1;
const rnd = n => { const a=new Uint32Array(1); crypto.getRandomValues(a); return a[0]%n; };

let size=48, lastToks=[];
function generate(key, n){
  const bits=BITS[n], toks=[]; let prev="^", miss=0;
  for (let i=0;i<bits.length;i++){
    const slot=WORDS[i%NS], want=+bits[i], ok=slot.filter(t=>green(key,prev,t)===want);
    if (!ok.length) miss++;
    const pick=(ok.length?ok:slot)[rnd(ok.length||slot.length)]; toks.push(pick); prev=pick;
  }
  let text=""; for (let i=0;i<toks.length;i++){ text+=toks[i]; if (i%NS===NS-1 && (i+1)%(NS*4)===0) text+="\n"; }
  return {text, toks, miss, n:bits.length};
}
function setSize(n){ size=n; [32,48,64].forEach(v=>$("s"+v).setAttribute("aria-pressed",v===n)); }
[32,48,64].forEach(v=>$("s"+v).onclick=()=>{ setSize(v); $("bGen").onclick(); });
$("bGen").onclick=()=>{
  const r=generate($("kGen").value,size); lastToks=r.toks; $("tGen").value=r.text;
  $("hGen").textContent= `${r.n.toLocaleString()} 単語（${r.text.replace(/\s/g,"").length.toLocaleString()} 文字）。候補8つに目当ての色がなかったのは ${r.miss} 単語で、そこは絵の点が1つ反転します。`;
};
$("bCopy").onclick=async ()=>{ try{ await navigator.clipboard.writeText($("tGen").value); $("bCopy").textContent="コピーしました"; setTimeout(()=>$("bCopy").textContent="コピー",1500); }catch(e){ $("tGen").select(); } };
$("bSend").onclick=()=>{ $("tDet").value=$("tGen").value; $("kDet").value=$("kGen").value; detect(); };

// 文章を単語に区切る。区切れない所（書き換えた所）は、その文の残りを「不明」にして次の文から読み直す
function parse(text){
  const s=text.replace(/\s+/g,""), out=[]; let pos=0, slot=0, broken=0;
  const at=(p,list)=>{ for (const t of list) if (s.startsWith(t,p)) return t; return null; };
  while (pos<s.length){
    const m=at(pos,WORDS[slot]);
    if (m){ out.push(m); pos+=m.length; slot=(slot+1)%NS; continue; }
    // 次に「文の形」がまるごと読める所を探して、そこから読み直す（前後に足した文は飛ばす）
    const whole=q=>{ let p=q; for (let k=0;k<NS;k++){ const t=at(p,WORDS[k]); if (!t) return false; p+=t.length; } return true; };
    let found=-1; for (let q=pos+1;q<s.length;q++) if (whole(q)){ found=q; break; }
    if (found<0) break;
    if (out.length){ broken++; for (let k=slot;k<NS;k++) out.push(null); }
    pos=found; slot=0;
  }
  return {toks:out, broken};
}
let seq=null;
// 一致数の z 検定。絵の白の割合と判定の白の割合から、偶然に一致する率を求めて比べる
function zScore(sq, bits){ let m=0,c=0,a1=0,b1=0; for (let i=0;i<Math.min(sq.length,bits.length);i++){ if (sq[i]<0) continue; c++; a1+=sq[i]; b1+=+bits[i]; if (sq[i]===+bits[i]) m++; }
  if (!c) return {m,c,z:0}; const pa=a1/c, pb=b1/c, e=pa*pb+(1-pa)*(1-pb); return {m,c,z:(m-c*e)/Math.sqrt(c*Math.max(1e-6,e*(1-e)))}; }
function detect(){
  const key=$("kDet").value, text=$("tDet").value;
  if (!text.trim()){ seq=null; $("stat").textContent="文章が空です。"; draw(); return; }
  const P=parse(text), known=P.toks.filter(Boolean).length; let mode="word";
  if (known < Math.max(6, P.toks.length*0.3)){
    const s=text.replace(/\s+/g,""); seq=new Int8Array(s.length); let prev="^";
    for (let i=0;i<s.length;i++){ seq[i]=green(key,prev,s[i]); prev=s[i]; } mode="char";
  } else {
    seq=new Int8Array(P.toks.length); let prev="^";
    for (let i=0;i<P.toks.length;i++){ const t=P.toks[i]; if (t===null){ seq[i]=-1; prev="?"; continue; } seq[i]=green(key,prev,t); prev=t; }
  }
  let best=null;
  for (const n of [32,48,64]){ const r=zScore(seq,BITS[n]); if (r.c>=16 && (!best||r.z>best.z)) best={n,...r}; }
  let g1=0, gc=0; for (const v of seq) if (v>=0){ gc++; g1+=v; }
  const L=[];
  L.push(mode==="word" ? `単語: ${P.toks.length.toLocaleString()} 個（読めなかった部分: ${P.toks.length-known} 単語・${P.broken} か所）` : `決まった文の形になっていないので、1文字ずつ判定しました（${seq.length.toLocaleString()} 文字）。`);
  L.push(`グリーンの割合: ${(g1/Math.max(1,gc)*100).toFixed(1)}%`);
  if (best){ const v = best.z>10 ? "謎ノ美兎の透かしが入っています" : best.z>6 ? "透かしの跡があります" : "透かしは見つかりません";
    L.push(`謎ノ美兎（${best.n}×${best.n}）との一致: ${best.m.toLocaleString()} / ${best.c.toLocaleString()}（${(best.m/best.c*100).toFixed(1)}%）  z = ${best.z.toFixed(1)}`);
    L.push(`判定: ${v}`); setW(best.z>6 ? best.n : size); }
  $("stat").innerHTML=L.join("\n").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/判定: (.*)$/m,"判定: <b>$1</b>");
  draw();
}
function setW(w){ $("rW").value=w; $("vW").textContent=w; }
function draw(){
  const cv=$("cv"), g=cv.getContext("2d"), W=cv.width; g.fillStyle="#000"; g.fillRect(0,0,W,W); if (!seq) return;
  const w=+$("rW").value, rows=Math.ceil(seq.length/w), cell=Math.max(1,Math.floor(Math.min(W/w, W/rows)));
  const ox=Math.floor((W-cell*w)/2), oy=Math.floor((W-cell*Math.min(rows,Math.floor(W/cell)))/2);
  for (let i=0;i<seq.length;i++){ const r=Math.floor(i/w), c=i%w; if (r*cell>=W) break;
    const v=seq[i]; g.fillStyle = v<0 ? "#7a2a24" : v ? "#ebe7df" : "#151514"; g.fillRect(ox+c*cell, oy+r*cell, cell, cell); }
}
$("bDet").onclick=detect;
$("rW").oninput=e=>{ $("vW").textContent=e.target.value; draw(); };

// ================================================================ 共通：図柄
function loadArt(url){ return new Promise(res=>{ const im=new Image(); im.onload=()=>{ const c=document.createElement("canvas"); c.width=im.width; c.height=im.height;
  const g=c.getContext("2d"); g.drawImage(im,0,0); const d=g.getImageData(0,0,im.width,im.height).data, a=new Float32Array(im.width*im.height);
  for (let i=0;i<a.length;i++) a[i]=d[i*4]/255; res({a,w:im.width,h:im.height}); }; im.onerror=()=>res({a:new Float32Array(4),w:2,h:2}); im.src=url; }); }
function artAt(A,fx,fy){
  fx=Math.max(0,Math.min(A.w-1.001,fx)); fy=Math.max(0,Math.min(A.h-1.001,fy));
  const x0=fx|0, y0=fy|0, ax=fx-x0, ay=fy-y0, i=y0*A.w+x0, a=A.a;
  return (a[i]*(1-ax)+a[i+1]*ax)*(1-ay) + (a[i+A.w]*(1-ax)+a[i+A.w+1]*ax)*ay;
}
const ARTS={}; let artsP=null;
const ensureArts=()=> artsP || (artsP=artUrls().then(()=>Promise.all([loadArt(ART_STAMP).then(a=>ARTS.stamp=a), loadArt(ART_LINE).then(a=>ARTS.line=a)])));

// 保存
function download(blob,name){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000); }

// ================================================================ 写真（足し引き）
let photo=null, gmode="line", strength=0.35; const PP={s:0.8,x:0.5,y:0.5};
function loadPhoto(src){ // src: Image か canvas
  const w0=src.naturalWidth||src.width, h0=src.naturalHeight||src.height, sc=Math.min(1,1024/Math.max(w0,h0)), W=Math.round(w0*sc), H=Math.round(h0*sc);
  const c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d"); g.drawImage(src,0,0,W,H);
  const fs=Math.min(1,4096/Math.max(w0,h0)), fW=Math.round(w0*fs), fH=Math.round(h0*fs), fc=document.createElement("canvas"); fc.width=fW; fc.height=fH; fc.getContext("2d").drawImage(src,0,0,fW,fH);
  photo={W,H,data:g.getImageData(0,0,W,H),fW,fH,full:fc.getContext("2d").getImageData(0,0,fW,fH)}; renderPhoto();
}
function boxBlur(L,W,H,r){ const T=new Float32Array(W*H), O=new Float32Array(W*H);
  for (let y=0;y<H;y++){ let acc=0,n=0; for (let x=0;x<Math.min(W,r);x++){ acc+=L[y*W+x]; n++; }
    for (let x=0;x<W;x++){ const a=x+r, d=x-r-1; if (a<W){ acc+=L[y*W+a]; n++; } if (d>=0){ acc-=L[y*W+d]; n--; } T[y*W+x]=acc/n; } }
  for (let x=0;x<W;x++){ let acc=0,n=0; for (let y=0;y<Math.min(H,r);y++){ acc+=T[y*W+x]; n++; }
    for (let y=0;y<H;y++){ const a=y+r, d=y-r-1; if (a<H){ acc+=T[a*W+x]; n++; } if (d>=0){ acc-=T[d*W+x]; n--; } O[y*W+x]=acc/n; } }
  return O; }
let photoOut=null;
let vmode="bg", photoFull=null, zoomPrev=null;
// 拡大すると出る：2×2画素ごとに「明・暗・暗・明」の縞を入れる。4画素の平均は元と同じなので、縮小すると打ち消し合って消える
function renderZoom(){
  const {fW,fH,full}=photo, out=new ImageData(fW,fH), d=out.data; d.set(full.data);
  const A=gmode==="line"?ARTS.line:ARTS.stamp, side=PP.s*Math.min(fW,fH), x0=Math.round(PP.x*fW-side/2), y0=Math.round(PP.y*fH-side/2), amp=strength*255;
  for (let by=Math.max(0,y0)&~1; by<Math.min(fH-1,y0+side); by+=2) for (let bx=Math.max(0,x0)&~1; bx<Math.min(fW-1,x0+side); bx+=2){
    const u=(bx+1-x0)/side, v=(by+1-y0)/side; if (u<0||u>1||v<0||v>1) continue;
    let a=artAt(A,u*(A.w-1),v*(A.h-1)); if (gmode!=="line") a=a>0.05?Math.min(1,Math.max(0,(a-0.18)/0.82))*0.7+0.3:0; if (a<0.05) continue;
    let head=255; for (let dy=0;dy<2;dy++) for (let dx=0;dx<2;dx++){ const o=((by+dy)*fW+bx+dx)*4; for (let k=0;k<3;k++) head=Math.min(head,d[o+k],255-d[o+k]); }
    const q=Math.round(Math.min(amp*a,head)); if (!q) continue;
    for (let dy=0;dy<2;dy++) for (let dx=0;dx<2;dx++){ const s=((dx+dy)&1)?-q:q, o=((by+dy)*fW+bx+dx)*4; d[o]+=s; d[o+1]+=s; d[o+2]+=s; }
  }
  photoFull=out;
  const fc=document.createElement("canvas"); fc.width=fW; fc.height=fH; fc.getContext("2d").putImageData(out,0,0);
  // 縮小のしかたを2通り再現する：ふつうの縮小（色の数値をそのまま平均＝SNSやブラウザ）と、目で見たとき（光の量で平均）
  const W=photo.W, H=photo.H, sm=new ImageData(W,H), ey=new ImageData(W,H), toL=new Float32Array(256);
  for (let i=0;i<256;i++){ const c=i/255; toL[i]=c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
  const toS=y=>255*(y<=0.0031308?12.92*y:1.055*Math.pow(y,1/2.4)-0.055);
  for (let y=0;y<H;y++){ const ya=Math.floor(y*fH/H), yb=Math.max(ya+1,Math.floor((y+1)*fH/H));
    for (let x=0;x<W;x++){ const xa=Math.floor(x*fW/W), xb=Math.max(xa+1,Math.floor((x+1)*fW/W)); const s=[0,0,0], l=[0,0,0]; let n=0;
      for (let yy=ya;yy<yb;yy++) for (let xx=xa;xx<xb;xx++){ const o=(yy*fW+xx)*4; for (let k=0;k<3;k++){ s[k]+=d[o+k]; l[k]+=toL[d[o+k]]; } n++; }
      const o=(y*W+x)*4; for (let k=0;k<3;k++){ sm.data[o+k]=s[k]/n; ey.data[o+k]=toS(l[k]/n); } sm.data[o+3]=ey.data[o+3]=255; } }
  zoomPrev={full:fc, prev:sm, eye:ey}; drawPhoto(false);
}
// 背景で変わる：表示色＝色×不透明度＋背景×(1−不透明度)。白の上で写真、黒の上で顔になる色と不透明度を逆算する
let bgPrev=null;
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function crcTable(){ const T=new Uint32Array(256); for (let n=0;n<256;n++){ let c=n; for (let k=0;k<8;k++) c= c&1 ? 0xEDB88320^(c>>>1) : c>>>1; T[n]=c>>>0; } return T; }
let CRC=null;
async function png8(W,H,idx,pal,alp){
  CRC=CRC||crcTable(); const crc=b=>{ let c=0xFFFFFFFF; for (const v of b) c=CRC[(c^v)&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; };
  const u32=v=>[v>>>24&255,v>>>16&255,v>>>8&255,v&255];
  const chunk=(type,data)=>{ const tb=[...type].map(ch=>ch.charCodeAt(0)), body=new Uint8Array(4+data.length); body.set(tb,0); body.set(data,4); return [new Uint8Array(u32(data.length)), body, new Uint8Array(u32(crc(body)))]; };
  const raw=new Uint8Array((W+1)*H); for (let y=0;y<H;y++) raw.set(idx.subarray(y*W,(y+1)*W), y*(W+1)+1);
  const z=new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream("deflate"))).arrayBuffer());
  const ihdr=new Uint8Array([...u32(W),...u32(H),8,3,0,0,0]);
  return new Blob([new Uint8Array([137,80,78,71,13,10,26,10]), ...chunk("IHDR",ihdr), ...chunk("PLTE",pal), ...chunk("tRNS",alp), ...chunk("IDAT",z), ...chunk("IEND",new Uint8Array(0))],{type:"image/png"});
}
// 256色の作り方：中央値で箱を割っていく（median cut）。値は「白の上の色 R,G,B」と「白と黒での差 K」の4つ
function medianCut(pts, n, dims){
  let boxes=[{idx:Array.from({length:pts.length/dims},(_,i)=>i)}];
  const stat=b=>{ let best=-1, ax=0; for (let d=0;d<dims;d++){ let lo=1e9,hi=-1e9; for (const i of b.idx){ const v=pts[i*dims+d]; if(v<lo)lo=v; if(v>hi)hi=v; } if (hi-lo>best){ best=hi-lo; ax=d; } } b.range=best; b.ax=ax; };
  boxes.forEach(stat);
  while (boxes.length<n){
    let k=-1, sc=0; boxes.forEach((b,i)=>{ const s=b.range*Math.sqrt(b.idx.length); if (b.idx.length>1 && s>sc){ sc=s; k=i; } }); if (k<0) break;
    const b=boxes[k]; b.idx.sort((p,q)=>pts[p*dims+b.ax]-pts[q*dims+b.ax]); const m=b.idx.length>>1;
    const c1={idx:b.idx.slice(0,m)}, c2={idx:b.idx.slice(m)}; stat(c1); stat(c2); boxes.splice(k,1,c1,c2);
  }
  return boxes.map(b=>{ const s=new Array(dims).fill(0); for (const i of b.idx) for (let d=0;d<dims;d++) s[d]+=pts[i*dims+d]; return s.map(v=>v/b.idx.length); });
}
let BG_SAT=0.6;
async function renderBg(){
  const s=Math.min(1,800/Math.max(photo.fW,photo.fH)), W=Math.round(photo.fW*s), H=Math.round(photo.fH*s);
  const fc=document.createElement("canvas"); fc.width=photo.fW; fc.height=photo.fH; fc.getContext("2d").putImageData(photo.full,0,0);
  const c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d"); g.imageSmoothingQuality="high"; g.drawImage(fc,0,0,W,H);
  const src=g.getImageData(0,0,W,H).data, S=ARTS.stamp;
  const top=255*(0.3+0.4*strength);   // 黒の上の顔は 0〜top、白の上の写真は top〜255 の明るさに収める（写真の色はそのまま）
  const side=PP.s*Math.min(W,H), x0=PP.x*W-side/2, y0=PP.y*H-side/2, N=W*H;
  // 目標：白の上では写真の色 Wc、黒の上では顔 B。不透明度は1つなので、差 K＝255×(1−不透明度) は明るさで決める
  const T=new Float32Array(N*4);
  for (let y=0;y<H;y++) for (let x=0;x<W;x++){
    // 色の濃さは SAT 倍に抑える（色の分だけ、黒の上に写真がうっすら残るため）
    const i=y*W+x, o=i*4, L0=(0.299*src[o]+0.587*src[o+1]+0.114*src[o+2]), cs=k=>L0+(src[o+k]-L0)*BG_SAT, Wr=top+(255-top)*cs(0)/255, Wg=top+(255-top)*cs(1)/255, Wb=top+(255-top)*cs(2)/255, Wl=0.299*Wr+0.587*Wg+0.114*Wb;
    const u=(x-x0)/side, v=(y-y0)/side; let B=0;
    if (u>=0&&u<=1&&v>=0&&v<=1){ const a=artAt(S,u*(S.w-1),v*(S.h-1)), m=Math.min(1,Math.max(0,(a-0.06)/0.12)), tt=Math.min(1,Math.max(0,(a-0.18)/0.82)); B=top*m*(0.15+0.85*tt); }
    const K=Math.max(0,Math.min(Math.min(Wr,Wg,Wb),Wl-B));
    T[i*4]=Wr; T[i*4+1]=Wg; T[i*4+2]=Wb; T[i*4+3]=K;
  }
  // 256色を選ぶ（間引いた画素で）
  const step=Math.max(1,Math.floor(N/40000)), sp=[]; for (let i=0;i<N;i+=step) sp.push(T[i*4],T[i*4+1],T[i*4+2],T[i*4+3]);
  const P=medianCut(Float32Array.from(sp),256,4), n=P.length;
  // 誤差を周りに散らしながら（Floyd–Steinberg）いちばん近い色に置き換える
  const idx=new Uint8Array(N), E=Float32Array.from(T), cache=new Int16Array(1<<20).fill(-1);
  const near=(r,g2,b,k)=>{ const q=((Math.max(0,Math.min(255,r))>>3)<<15)|((Math.max(0,Math.min(255,g2))>>3)<<10)|((Math.max(0,Math.min(255,b))>>3)<<5)|(Math.max(0,Math.min(255,k))>>3); let h=cache[q]; if (h>=0) return h;
    let bd=1e18; for (let j=0;j<n;j++){ const p=P[j], dr=p[0]-r, dg=p[1]-g2, db=p[2]-b, dk=p[3]-k, d=dr*dr+dg*dg+db*db+ (dr-dk)*(dr-dk)+(dg-dk)*(dg-dk)+(db-dk)*(db-dk); if (d<bd){ bd=d; h=j; } } cache[q]=h; return h; };
  for (let y=0;y<H;y++) for (let x=0;x<W;x++){
    const i=y*W+x, j=near(E[i*4],E[i*4+1],E[i*4+2],E[i*4+3]); idx[i]=j; const p=P[j];
    for (let d=0;d<4;d++){ const e=E[i*4+d]-p[d]; if (x+1<W) E[(i+1)*4+d]+=e*7/16; if (y+1<H){ if (x>0) E[(i+W-1)*4+d]+=e*3/16; E[(i+W)*4+d]+=e*5/16; if (x+1<W) E[(i+W+1)*4+d]+=e/16; } }
  }
  // パレット：不透明度 α＝1−K/255、色＝(白の上の色 − K)/α
  const pal=new Uint8Array(n*3), alp=new Uint8Array(n), wv=[], bv=[];
  for (let j=0;j<n;j++){ const [r,g2,b,k]=P[j], al=Math.max(0,Math.min(1,1-k/255)); alp[j]=Math.round(al*255); const a8=alp[j]/255;
    const cc=[r,g2,b].map(v=> a8>0 ? Math.max(0,Math.min(255,Math.round((v-255*(1-a8))/a8))) : 0); pal.set(cc,j*3);
    bv.push(cc.map(v=>v*a8)); wv.push(cc.map(v=>v*a8+255*(1-a8))); }
  const white=new ImageData(W,H), black=new ImageData(W,H);
  for (let i=0;i<N;i++){ const j=idx[i], o=i*4; for (let d=0;d<3;d++){ white.data[o+d]=wv[j][d]; black.data[o+d]=bv[j][d]; } white.data[o+3]=black.data[o+3]=255; }
  let blob=null; try{ blob=await png8(W,H,idx,pal,alp); }catch(e){}
  bgPrev={W,H,white,black,blob}; drawPhoto(false);
}
async function renderPhoto(){
  if (!photo) return; await ensureArts();
  if (vmode==="bg") return renderBg();
  if (vmode==="zoom") return renderZoom();
  const {W,H,data}=photo, src=data.data, L=new Float32Array(W*H);
  for (let i=0;i<W*H;i++) L[i]=(0.299*src[i*4]+0.587*src[i*4+1]+0.114*src[i*4+2])/255;
  const side=PP.s*Math.min(W,H), cx=PP.x*W, cy=PP.y*H, x0=Math.round(cx-side/2), y0=Math.round(cy-side/2);
  const m=boxBlur(L,W,H,Math.max(3,Math.round(side/40)));
  const out=new ImageData(W,H), d=out.data; d.set(src);
  const S=ARTS.stamp, Ln=ARTS.line;
  let tm=0,tn=0; for (let i=0;i<S.a.length;i++) if (S.a[i]>0.05){ tm+=S.a[i]; tn++; } tm/=Math.max(1,tn);
  for (let y=Math.max(0,y0); y<Math.min(H,y0+side); y++) for (let x=Math.max(0,x0); x<Math.min(W,x0+side); x++){
    const u=(x-x0)/side, v=(y-y0)/side, i=y*W+x; let nl=L[i];
    if (gmode==="line"){
      // 線画：まわりが暗ければ明るい線、明るければ暗い線
      const a=artAt(Ln,u*(Ln.w-1),v*(Ln.h-1)); if (a<0.03) continue;
      nl = L[i] + (m[i]<0.5?1:-1)*strength*a*1.4;
    } else {
      // 明暗：その場所の明るさを中心に、顔の濃淡を写す
      const t=artAt(S,u*(S.w-1),v*(S.h-1)); if (t<0.03) continue;
      const alpha=Math.min(1,(t-0.03)*12)*strength, target=m[i]+(t-tm)*1.3;
      nl = L[i]*(1-alpha) + target*alpha;
    }
    const dl=(Math.max(0,Math.min(1,nl))-L[i])*255, o=i*4; d[o]=src[o]+dl; d[o+1]=src[o+1]+dl; d[o+2]=src[o+2]+dl;
  }
  photoOut=out; drawPhoto(false);
}
function drawPhoto(orig){
  if (!photo) return; const cv=$("cPhoto"), W=photo.W, H=photo.H;
  if (vmode==="bg" && bgPrev){
    cv.width=bgPrev.W; cv.height=bgPrev.H; cv.getContext("2d").putImageData(orig?bgPrev.black:bgPrev.white,0,0);
    $("tagPhoto").textContent= orig ? "黒い背景の上（タップして開いた画面）" : "白い背景の上（タイムライン）";
    return;
  }
  if (vmode==="zoom" && zoomPrev){
    cv.width=W; cv.height=H; cv.getContext("2d").putImageData(orig?zoomPrev.eye:zoomPrev.prev,0,0);
    $("tagPhoto").textContent= orig ? "元の大きさで見たときの再現（目に入る光の量で平均）" : `縮小した表示（SNSのタイムラインなど。元は ${photo.fW}×${photo.fH}）`;
    return;
  }
  cv.width=W; cv.height=H; cv.getContext("2d").putImageData(orig?photo.data:photoOut,0,0); $("tagPhoto").textContent=orig?"元の写真":"顔入りの写真";
}
$("bPhoto").onclick=()=>$("fPhoto").click();
$("fPhoto").onchange=e=>{ const f=e.target.files[0]; if (!f) return; const u=URL.createObjectURL(f), im=new Image(); im.onload=()=>{ loadPhoto(im); URL.revokeObjectURL(u); }; im.src=u; e.target.value=""; };
// サンプル写真（部屋の写真）はサーバーから必要なときだけ読む。読めないときは、その場で描く夕焼けを使う
const SAMPLE_SRC=""; // ブログ版はサーバーの部屋の写真を使っていた
function sampleImage(){ return new Promise(res=>{
  const done=()=>{ if (!window.__eznPhotoSample) return res(null); const im=new Image(); im.onload=()=>res(im); im.onerror=()=>res(null); im.src=window.__eznPhotoSample; };
  if (window.__eznPhotoSample) return done(); if (!SAMPLE_SRC) return res(null);
  const s=document.createElement("script"); s.src=SAMPLE_SRC; s.onload=done; s.onerror=()=>res(null); document.head.appendChild(s); setTimeout(()=>res(null),8000); }); }
async function samplePhoto(){ const im=await sampleImage(); return im || drawnSample(); }
function drawnSample(){
  // 暗い所と明るい所がまざった、その場で描く風景
  const W=960, H=720, c=document.createElement("canvas"); c.width=W*3; c.height=H*3; const g=c.getContext("2d"); g.scale(3,3);   // 4K向けに大きめに描く
  const gr=g.createLinearGradient(0,0,0,H); gr.addColorStop(0,"#0b1a3a"); gr.addColorStop(0.5,"#e9915a"); gr.addColorStop(1,"#f7e7c4"); g.fillStyle=gr; g.fillRect(0,0,W,H);
  g.fillStyle="#fff6d8"; g.beginPath(); g.arc(640,330,70,0,7); g.fill();
  g.fillStyle="#1d1424"; g.beginPath(); g.moveTo(0,520); g.lineTo(180,330); g.lineTo(330,470); g.lineTo(470,360); g.lineTo(700,540); g.lineTo(W,430); g.lineTo(W,H); g.lineTo(0,H); g.fill();
  let s=11; const r=()=>((s=(s*16807)%2147483647)/2147483647);
  for (let i=0;i<140;i++){ g.fillStyle=`rgba(255,255,255,${0.3+r()*0.6})`; g.fillRect(r()*W,r()*220,2,2); }
  return c;
}
$("bPSample").onclick=()=>samplePhoto().then(loadPhoto);
$("gLine").onclick=()=>{ gmode="line"; $("gLine").setAttribute("aria-pressed",true); $("gTone").setAttribute("aria-pressed",false); renderPhoto(); };
const setV=m=>{ vmode=m; [["vAlways","always"],["vZoom","zoom"],["vBg","bg"]].forEach(([id,v])=>$(id).setAttribute("aria-pressed",m===v)); $("hZoom").classList.toggle("hidden",m!=="zoom"); $("hBg").classList.toggle("hidden",m!=="bg"); $("satBox").classList.toggle("hidden",m!=="bg");
  $("gLine").parentElement.style.display= m==="bg" ? "none" : ""; $("bHold").textContent= m==="zoom" ? "押している間 元の大きさで見る" : m==="bg" ? "押している間 黒い背景で見る" : "押している間 元の写真"; renderPhoto(); };
$("rSat").oninput=e=>{ BG_SAT=+e.target.value/100; $("vSat").textContent=e.target.value+"%"; later(); };
$("vAlways").onclick=()=>setV("always"); $("vZoom").onclick=()=>setV("zoom"); $("vBg").onclick=()=>setV("bg");
$("gTone").onclick=()=>{ gmode="tone"; $("gLine").setAttribute("aria-pressed",false); $("gTone").setAttribute("aria-pressed",true); renderPhoto(); };
let pT=null; const later=()=>{ clearTimeout(pT); pT=setTimeout(renderPhoto,60); };
$("rStr").oninput=e=>{ strength=+e.target.value/100; $("vStr").textContent=e.target.value+"%"; later(); };
[["rPs","s","vPs","%"],["rPx","x","vPx",""],["rPy","y","vPy",""]].forEach(([id,k,vid,u])=>$(id).oninput=e=>{ PP[k]=+e.target.value/100; $(vid).textContent=e.target.value+u; later(); });
const hold=$("bHold"); ["pointerdown"].forEach(t=>hold.addEventListener(t,e=>{ e.preventDefault(); drawPhoto(true); }));
["pointerup","pointerleave","pointercancel"].forEach(t=>hold.addEventListener(t,()=>drawPhoto(false)));
$("bPng").onclick=()=>{ if (vmode==="bg" && bgPrev){ if (bgPrev.blob) download(bgPrev.blob,"nazono_photo_tap.png"); return; } if (vmode==="zoom" && zoomPrev){ zoomPrev.full.toBlob(b=>download(b,"nazono_photo_4k.png"),"image/png"); return; } if (photoOut){ drawPhoto(false); $("cPhoto").toBlob(b=>download(b,"nazono_photo.png"),"image/png"); } };

// ================================================================ タブ
function setTab(t){ ["Text","Photo"].forEach(k=>{ $("t"+k).setAttribute("aria-selected",k===t); $("p"+k).classList.toggle("hidden",k!==t); });
  if (t==="Photo" && !photo) samplePhoto().then(loadPhoto); }
$("tText").onclick=()=>setTab("Text"); $("tPhoto").onclick=()=>setTab("Photo");

// 折りたたみ（「＋」を押すと開く）
(typeof root!=="undefined"?root:document).querySelectorAll(".mbtn").forEach(b=>b.onclick=()=>{ const open=b.getAttribute("aria-expanded")!=="true"; b.setAttribute("aria-expanded",open); b.firstChild.textContent=open?"－":"＋"; b.nextElementSibling.classList.toggle("hidden",!open); });
// テスト用フック
window.__eznMark={ zScore, setKeyDet:k=>{ $("kDet").value=k; }, generate, parse, detect, green, get stat(){ return $("stat").textContent; }, setSize, setTab, renderPhoto, loadPhoto, samplePhoto, setV, zoomFull:()=>zoomPrev&&zoomPrev.full, bgBlob:()=>bgPrev&&bgPrev.blob, setSat:v=>{ BG_SAT=v; return renderPhoto(); }, bgPrev:()=>bgPrev, setPhoto:(m,s)=>{ if(m){ gmode=m; } if(s!==undefined) strength=s; return renderPhoto(); } };

// 記事ごとに出すタブを選べる（ezn-mark の data-tabs が photo なら写真だけ、text なら文章だけ）
const only=(typeof root!=="undefined" && root.dataset.tabs) || "";
if (only==="photo"||only==="text"){ $("tText").parentElement.style.display="none"; if (only==="photo") setTab("Photo");
  $("notePriv").firstChild.nodeValue= (only==="photo"?"写真":"文章")+"は、すべてこの端末のブラウザ内で処理し、どこにも送信しません。"; if (only==="photo") $("noteText").style.display="none"; }
// 起動：例文をつくって、調べた結果も出しておく
$("bGen").onclick(); $("tDet").value=$("tGen").value; detect();
})();

})();
