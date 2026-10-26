/*!
 * ezn-widget.js — ピクセル並べ替えモーフ（ミコンスキーの部屋）
 * 使い方:
 *   固定目標版: <div class="ezn-widget" data-target="目標画像URL" data-demo="デモ元画像URL"></div>
 *   汎用版    : <div class="ezn-widget" data-demo="デモ元画像URL" data-demo-target="デモ目標画像URL"></div>
 *   任意属性  : data-target-label="謎ノ美兎"（固定目標版の表示名）
 *               data-mode="simple"（細かい設定を隠し、画像を読み込むボタンだけ出す）
 * 画像は同じドメインに置くこと（別ドメインだとブラウザがピクセルを読めない）。
 * 「逆算を試す」（汎用版）：完成画像と並べ替え表から元画像に戻す。表を壊して戻せなくなる様子も試せる。
 * 「色の比べ方」：RGB／HSV／HSV（円錐）／色相だけ／OKLab を切り替えて席替えできる（2026-10）。
 * 計算過程の可視化：入れ替え回数・ズレの合計のグラフ、ズレの地図、移動の線。
 * 「計算過程を再生」：計算中の並びを世代ごとに記録し、結果だけでなく試行錯誤の過程も再生できる。
 * 元ネタ: obamify by Spu7Nix（https://github.com/Spu7Nix/obamify）。本スクリプトは独立実装。
 */
(function () {
  'use strict';

  var CSS = [
    ':host{all:initial;display:block;font-family:inherit;color:var(--ezn-ink,#1B1B1B);',
    '--a:var(--ezn-accent,#D7261E);--ln:var(--ezn-line,#D9D4CB);--pn:var(--ezn-panel,#FAF8F4);--st:var(--ezn-stage,#15161A);--sb:var(--ezn-sub,#6B6660)}',
    '*,*::before,*::after{box-sizing:border-box}',
    '.w{font:15px/1.6 inherit;font-family:inherit;display:grid;gap:14px;grid-template-columns:minmax(0,1fr)}',
    '@media (min-width:760px){.w{grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:start}}',
    '.w>*{min-width:0}',
    '.stage{background:var(--st);border-radius:6px;padding:8px;position:relative}',
    'canvas.v{display:block;width:100%;height:auto;aspect-ratio:1;image-rendering:pixelated;border-radius:2px}',
    '.stat{position:absolute;left:14px;right:14px;bottom:16px;display:flex;justify-content:space-between;gap:8px;color:#EEE;font-size:12px;text-shadow:0 1px 2px #000;pointer-events:none}',
    '.bar{height:3px;background:rgba(255,255,255,.15);margin-top:6px;border-radius:2px;overflow:hidden}.bar i{display:block;height:100%;width:0;background:var(--a)}',
    '.tp{display:flex;gap:10px;align-items:center;margin-top:10px}.tp input{flex:1;min-width:0}',
    '.pn{background:var(--pn);border:1px solid var(--ln);border-radius:6px;padding:14px}.pn+.pn{margin-top:12px}',
    '.pn h3{font-size:15px;font-weight:700;margin:0 0 10px;padding:0;border:0;background:none}',
    '.slots{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:8px;align-items:center}',
    '.slot{text-align:center;min-width:0}.slot canvas{width:100%;aspect-ratio:1;display:block;border-radius:4px;background:var(--st)}',
    '.slot span{display:block;font-size:13px;color:var(--sb);margin:6px 0 2px}',
    '.fl{display:inline-block;font-size:13px;color:var(--a);font-weight:700;cursor:pointer}.fl input{position:absolute;width:1px;height:1px;opacity:0}',
    '.ar{color:var(--sb);font-size:18px}',
    '.f{display:grid;grid-template-columns:8em minmax(0,1fr) 3.4em;gap:8px;align-items:center;margin:8px 0;font-size:14px}',
    '.f.s{grid-template-columns:8em minmax(0,1fr)}.f output{text-align:right;color:var(--sb);font-size:13px;font-variant-numeric:tabular-nums}',
    'select{font:inherit;font-size:14px;width:100%;padding:5px 6px;border:1px solid var(--ln);border-radius:4px;background:#fff;color:#1B1B1B}',
    'input[type=range]{width:100%;accent-color:var(--a)}',
    'button{font:inherit;cursor:pointer;border-radius:4px}',
    '.pb{border:1px solid var(--ln);background:var(--pn);color:inherit;padding:7px 12px;font-weight:700;min-width:5.5em}',
    '.run{width:100%;margin-top:4px;padding:11px;border:0;background:var(--a);color:#fff;font-weight:700}',
    '.run.stale{outline:2px solid var(--a);outline-offset:2px}',
    '.nt{font-size:12.5px;color:var(--sb);margin:8px 0 0}.hn{font-size:12.5px;color:var(--a);min-height:1em;margin:4px 0 0}',
    ':focus-visible{outline:2px solid var(--a);outline-offset:2px}',
    '.w.simple{display:block;max-width:520px;margin:0 auto}',
    '.w.simple .tp,.w.simple .adv{display:none}',
    '.big{display:block;position:relative;margin-top:12px;padding:13px;border-radius:6px;background:var(--a);color:#fff;font-weight:700;font-size:16px;text-align:center;cursor:pointer}',
    '.big input{position:absolute;width:1px;height:1px;opacity:0}',
    '.big:focus-within{outline:2px solid var(--a);outline-offset:2px}',
    '.seg{display:flex;gap:0;margin-top:10px;border:1px solid var(--ln);border-radius:6px;overflow:hidden}',
    '.seg button{flex:1;border:0;border-radius:0;background:var(--pn);color:inherit;padding:9px 6px;font-weight:700;font-size:14px}',
    '.seg button+button{border-left:1px solid var(--ln)}',
    '.seg button[aria-pressed=true]{background:var(--st);color:#fff}',
    '.two{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.two .pb{min-width:0;width:100%;font-size:13px}',
    '.viz{display:none;margin-top:10px;position:relative}.viz.on{display:block}',
    '.seg.s3 button{font-size:12.5px;padding:7px 4px}',
    '.ch{position:relative;margin-top:10px}.ch .hd{display:flex;justify-content:space-between;align-items:baseline;font-size:12.5px;color:var(--sb)}.ch .hd b{color:inherit;font-weight:700}',
    '.ch svg{display:block;width:100%;height:58px;background:var(--pn);border:1px solid var(--ln);border-radius:4px;cursor:crosshair;touch-action:none}',
    '.tip{position:absolute;z-index:2;pointer-events:none;background:#fff;color:#1B1B1B;border:1px solid var(--ln);border-radius:4px;padding:5px 8px;font-size:12px;line-height:1.5;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.12);display:none;transform:translateY(-100%)}',
    '.ax{font-size:11px;color:var(--sb);margin-top:2px;position:relative;height:14px}.ax span{position:absolute;transform:translateX(-50%)}',
    '.two .fl{display:block;text-align:center;border:1px dashed var(--ln);border-radius:4px;padding:7px 4px;position:relative}'
  ].join('');

  function html(fixed, label, simple) {
    if (simple) return htmlSimple(label);
    return '<div class="w"><div>' +
      '<div class="stage"><canvas class="v" width="512" height="512" aria-label="並べ替えアニメーション"></canvas>' +
      '<div class="stat"><span data-k="sl">準備中</span><span data-k="sr"></span></div><div class="bar"><i data-k="pg"></i></div></div>' +
      '<div class="tp"><button class="pb" type="button" data-k="play">一時停止</button><input type="range" min="0" max="1000" value="0" data-k="scrub" aria-label="再生位置"></div>' +
      '<div class="seg" role="group" aria-label="見せ方"><button type="button" data-k="vmMove" aria-pressed="true">結果へ移動</button><button type="button" data-k="vmProc" aria-pressed="false">計算過程を再生</button></div>' +
      '<div class="viz" data-k="viz">' +
      '<div class="seg s3" role="group" aria-label="表示するもの"><button type="button" data-k="ly0" aria-pressed="true">画像</button><button type="button" data-k="ly1" aria-pressed="false">ズレの地図</button><button type="button" data-k="ly2" aria-pressed="false">移動の線</button></div>' +
      '<div class="ch"><div class="hd"><b>入れ替え回数（世代ごと）</b><span data-k="c1m"></span></div><svg data-k="c1" viewBox="0 0 300 58" preserveAspectRatio="none" aria-label="世代ごとの入れ替え回数のグラフ"></svg><div class="ax" data-k="a1"></div></div>' +
      '<div class="ch"><div class="hd"><b>ズレの合計（小さいほど目標に近い）</b><span data-k="c2m"></span></div><svg data-k="c2" viewBox="0 0 300 58" preserveAspectRatio="none" aria-label="世代ごとのズレの合計のグラフ"></svg><div class="ax" data-k="a2"></div></div>' +
      '<p class="nt" data-k="vnote">横軸は世代（対数目盛り：前半ほど広く表示）。グラフを押すと、その世代へ移動します。</p><div class="tip" data-k="tip"></div></div>' +
      '</div><div>' +
      '<div class="pn"><h3>画像</h3><div class="slots">' +
      '<div class="slot"><canvas width="96" height="96" data-k="ts"></canvas><span>' + (fixed ? '変換する画像' : '元画像（色の材料）') + '</span>' +
      '<label class="fl">画像を選ぶ<input type="file" accept="image/*" data-k="fs"></label></div>' +
      (fixed ? '<span class="ar" aria-hidden="true">→</span>' : '<button class="pb" style="min-width:0;padding:6px 8px" type="button" data-k="swap" aria-label="元画像と目標画像を入れ替える">⇄</button>') +
      '<div class="slot"><canvas width="96" height="96" data-k="tt"></canvas><span>' + (fixed ? label : '目標画像（完成形）') + '</span>' +
      (fixed ? '' : '<label class="fl">画像を選ぶ<input type="file" accept="image/*" data-k="ft"></label>') + '</div>' +
      '</div><p class="nt">画像は中央で正方形に切り抜きます。処理はブラウザの中だけで行い、画像はどこにも送信しません。</p></div>' +
      '<div class="pn"><h3>計算</h3>' +
      '<div class="f s"><label>マスの数</label><select data-k="res"><option value="48">48 × 48</option><option value="64" selected>64 × 64</option><option value="96">96 × 96</option><option value="128">128 × 128（重い）</option></select></div>' +
      '<div class="f"><label>移動のしにくさ</label><input type="range" min="0" max="50" value="13" data-k="prox"><output data-k="proxV">13</output></div>' +
      '<div class="f s"><label>色の比べ方</label><select data-k="cm"><option value="rgb" selected>RGB（標準）</option><option value="hsv">HSV</option><option value="cone">HSV（円錐）</option><option value="hue">色相だけ</option><option value="oklab">OKLab</option></select></div>' +
      '<div class="f s"><label>計算の丁寧さ</label><select data-k="q"><option value="8">速い</option><option value="24" selected>標準</option><option value="64">丁寧</option></select></div>' +
      '<button class="run" type="button" data-k="run">計算し直す</button><p class="hn" data-k="hint"></p></div>' +
      '<div class="pn"><h3>逆算を試す</h3>' +
      '<p class="nt" style="margin-top:0">完成画像と「並べ替え表」があれば、元の画像に完全に戻せます。表を壊すとどうなるかも試せます。</p>' +
      '<div class="f"><label>表の壊れ具合</label><input type="range" min="0" max="100" value="0" data-k="brk"><output data-k="brkV">0%</output></div>' +
      '<button class="run" type="button" data-k="rev">逆算する</button>' +
      '<div class="two"><button class="pb" type="button" data-k="saveImg">完成画像を保存</button><button class="pb" type="button" data-k="saveTab">並べ替え表を保存</button></div>' +
      '<div class="two"><label class="fl">完成画像を読み込む<input type="file" accept="image/png" data-k="ldImg"></label><label class="fl">並べ替え表を読み込む<input type="file" accept=".txt,text/plain" data-k="ldTab"></label></div>' +
      '<p class="hn" data-k="revHint"></p></div>' +
      '<div class="pn"><h3>動き</h3>' +
      '<div class="f s"><label>カーブ</label><select data-k="ease"><option value="io" selected>イーズインアウト</option><option value="back">オーバーシュート</option><option value="lin">リニア</option></select></div>' +
      '<div class="f"><label>移動時間</label><input type="range" min="5" max="60" value="25" data-k="dur"><output data-k="durV">2.5秒</output></div>' +
      '<div class="f"><label>ずらし量</label><input type="range" min="0" max="60" value="25" data-k="stag"><output data-k="stagV">25%</output></div>' +
      '<div class="f s"><label>ずらし方</label><select data-k="sm"><option value="rand" selected>ランダム</option><option value="dist">近いものから先に</option><option value="y">上から順に</option></select></div>' +
      '</div></div></div>';
  }

  // かんたん表示：アニメーションと「画像を読み込む」ボタンだけ。設定は初期値のまま隠して持つ
  function htmlSimple(label) {
    return '<div class="w simple">' +
      '<div class="stage"><canvas class="v" width="512" height="512" aria-label="並べ替えアニメーション"></canvas>' +
      '<div class="stat"><span data-k="sl">準備中</span><span data-k="sr"></span></div><div class="bar"><i data-k="pg"></i></div></div>' +
      '<div class="seg" role="group" aria-label="見せ方"><button type="button" data-k="vmMove" aria-pressed="true">結果へ移動</button><button type="button" data-k="vmProc" aria-pressed="false">計算過程を再生</button></div>' +
      '<div class="viz" data-k="viz">' +
      '<div class="seg s3" role="group" aria-label="表示するもの"><button type="button" data-k="ly0" aria-pressed="true">画像</button><button type="button" data-k="ly1" aria-pressed="false">ズレの地図</button><button type="button" data-k="ly2" aria-pressed="false">移動の線</button></div>' +
      '<div class="ch"><div class="hd"><b>入れ替え回数（世代ごと）</b><span data-k="c1m"></span></div><svg data-k="c1" viewBox="0 0 300 58" preserveAspectRatio="none" aria-label="世代ごとの入れ替え回数のグラフ"></svg><div class="ax" data-k="a1"></div></div>' +
      '<div class="ch"><div class="hd"><b>ズレの合計（小さいほど目標に近い）</b><span data-k="c2m"></span></div><svg data-k="c2" viewBox="0 0 300 58" preserveAspectRatio="none" aria-label="世代ごとのズレの合計のグラフ"></svg><div class="ax" data-k="a2"></div></div>' +
      '<p class="nt" data-k="vnote">横軸は世代（対数目盛り：前半ほど広く表示）。グラフを押すと、その世代へ移動します。</p><div class="tip" data-k="tip"></div></div>' +
      '<label class="big">画像を読み込む<input type="file" accept="image/*" data-k="fs"></label>' +
      '<p class="nt">好きな画像を選ぶと、ピクセルの並べ替えだけで' + label + 'に組み変わります。画像はブラウザの中だけで処理し、どこにも送信しません。</p>' +
      '<p class="hn" data-k="hint"></p>' +
      '<div class="adv" aria-hidden="true">' +
      '<div class="tp"><button type="button" data-k="play"></button><input type="range" min="0" max="1000" value="0" data-k="scrub"></div>' +
      '<canvas width="96" height="96" data-k="ts"></canvas><canvas width="96" height="96" data-k="tt"></canvas>' +
      '<select data-k="res"><option value="64" selected>64</option></select>' +
      '<input type="range" min="0" max="50" value="13" data-k="prox"><output data-k="proxV">13</output>' +
      '<select data-k="cm"><option value="rgb" selected>rgb</option></select><select data-k="q"><option value="24" selected>24</option></select><button type="button" data-k="run"></button>' +
      '<select data-k="ease"><option value="io" selected>io</option></select>' +
      '<input type="range" min="5" max="60" value="25" data-k="dur"><output data-k="durV"></output>' +
      '<input type="range" min="0" max="60" value="25" data-k="stag"><output data-k="stagV"></output>' +
      '<select data-k="sm"><option value="rand" selected>rand</option></select>' +
      '</div></div>';
  }

  function xorshift(seed) { var x = (seed >>> 0) || 1; return function () { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 4294967296; }; }
  function mk(n) { var c = document.createElement('canvas'); c.width = c.height = n; return c; }
  function dims(img) { return [img.naturalWidth || img.width, img.naturalHeight || img.height]; }
  function sample(img, res) {
    var c = mk(res), g = c.getContext('2d'), d = dims(img), s = Math.min(d[0], d[1]);
    g.fillStyle = '#fff'; g.fillRect(0, 0, res, res);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(img, (d[0] - s) / 2, (d[1] - s) / 2, s, s, 0, 0, res, res);
    var px = g.getImageData(0, 0, res, res).data, N = res * res, out = new Float32Array(N * 3);
    for (var i = 0; i < N; i++) { out[i * 3] = px[i * 4] / 255; out[i * 3 + 1] = px[i * 4 + 1] / 255; out[i * 3 + 2] = px[i * 4 + 2] / 255; }
    return out;
  }
  function thumb(cv, img) {
    var g = cv.getContext('2d'), d = dims(img), s = Math.min(d[0], d[1]);
    g.fillStyle = '#fff'; g.fillRect(0, 0, 96, 96); g.imageSmoothingQuality = 'high';
    g.drawImage(img, (d[0] - s) / 2, (d[1] - s) / 2, s, s, 0, 0, 96, 96);
  }
  function loadImg(src) {
    return new Promise(function (ok, ng) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = ng; i.src = src; });
  }
  function feat(c, n, m) {
    var f = new Float32Array(n * 3), i, r, g, b, mx, mn, h, sv, v, a, d;
    for (i = 0; i < n; i++) {
      r = c[i * 3]; g = c[i * 3 + 1]; b = c[i * 3 + 2];
      if (m === 'rgb') { f[i * 3] = r; f[i * 3 + 1] = g; f[i * 3 + 2] = b; continue; }
      if (m === 'oklab') {
        var L = [r, g, b].map(function (x) { return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); });
        var l = Math.cbrt(0.4122214708 * L[0] + 0.5363325363 * L[1] + 0.0514459929 * L[2]), mm = Math.cbrt(0.2119034982 * L[0] + 0.6806995451 * L[1] + 0.1073969566 * L[2]), ss = Math.cbrt(0.0883024619 * L[0] + 0.2817188376 * L[1] + 0.6299787005 * L[2]);
        f[i * 3] = 0.2104542553 * l + 0.7936177850 * mm - 0.0040720468 * ss; f[i * 3 + 1] = 1.9779984951 * l - 2.4285922050 * mm + 0.4505937099 * ss; f[i * 3 + 2] = 0.0259707932 * l + 0.7827717662 * mm - 0.8086757660 * ss; continue;
      }
      mx = Math.max(r, g, b); mn = Math.min(r, g, b); d = mx - mn; v = mx; sv = mx ? d / mx : 0; h = 0;
      if (d) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; if (h < 0) h += 1; }
      a = h * 2 * Math.PI;
      if (m === 'hsv') { f[i * 3] = h; f[i * 3 + 1] = sv; f[i * 3 + 2] = v; }
      else if (m === 'cone') { f[i * 3] = sv * v * Math.cos(a); f[i * 3 + 1] = sv * v * Math.sin(a); f[i * 3 + 2] = v; }
      else { f[i * 3] = 0.5 * Math.cos(a); f[i * 3 + 1] = 0.5 * Math.sin(a); f[i * 3 + 2] = 0; }
    }
    return f;
  }
  function meanDist(A, B, n) {
    var rr = xorshift(7), s = 0, k, i, j, dx, dy, dz;
    for (k = 0; k < 20000; k++) { i = (rr() * n) | 0; j = (rr() * n) | 0; dx = A[i * 3] - B[j * 3]; dy = A[i * 3 + 1] - B[j * 3 + 1]; dz = A[i * 3 + 2] - B[j * 3 + 2]; s += Math.sqrt(dx * dx + dy * dy + dz * dz); }
    return s / 20000 || 1;
  }
  function hash(i) { var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
  var EASE = {
    lin: function (u) { return u; },
    io: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    back: function (u) { var c1 = 1.70158, c3 = c1 + 1, v = u - 1; return 1 + c3 * v * v * v + c1 * v * v; }
  };
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function Widget(host) {
    var fixed = !!host.dataset.target, simple = fixed && host.dataset.mode === 'simple', root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>' + CSS + '</style>' + html(fixed, host.dataset.targetLabel || '目標画像', simple);
    var el = {}; root.querySelectorAll('[data-k]').forEach(function (n) { el[n.dataset.k] = n; });
    var view = root.querySelector('canvas.v'), vctx = view.getContext('2d');
    var S = { srcImg: null, tgtImg: null, phase: 'idle', t: 0, dir: 1, hold: 0, playing: !reduceMotion, last: 0, visible: false, looping: false };
    var res, N, cell, W, srcC, tgtC, fS, fT, posX, posY, slot, packed, K, radius, r0, gen, itInGen, perGen, rng, img32, imgData, bg;
    // 計算過程の記録：世代ごとに「各マスがどの席にいるか」を保存して、あとから再生する
    var snaps = [], swapsLog = [], swapsInGen = 0, viewMode = 'move', cumW = null;
    // 逆算：revCol[j]＝完成画像のj番目の席の色、revTab[j]＝その席にいるマスの元の席
    var costLog = null, layer = 0, curGen = 0, heatNorm = .6;
    var revCol = null, revTab = null, revUse = null, revMatch = 0, revLoadedImg = false, revLoadedTab = false;
    function snapshot() { var inv = new Uint16Array(N); for (var j = 0; j < N; j++) inv[slot[j]] = j; snaps.push(inv); swapsLog.push(swapsInGen); swapsInGen = 0; }

    function setup() {
      res = +el.res.value; N = res * res; cell = Math.max(2, Math.floor(512 / res)); W = res * cell;
      view.width = view.height = W;
      imgData = vctx.createImageData(W, W); img32 = new Uint32Array(imgData.data.buffer);
      srcC = sample(S.srcImg, res); tgtC = sample(S.tgtImg, res);
      var cm = el.cm.value; fS = feat(srcC, N, cm); fT = feat(tgtC, N, cm);
      if (cm !== 'rgb') { var kk = meanDist(srcC, tgtC, N) / meanDist(fS, fT, N); for (var q = 0; q < N * 3; q++) { fS[q] *= kk; fT[q] *= kk; } }
      posX = new Float32Array(N); posY = new Float32Array(N); slot = new Int32Array(N); packed = new Uint32Array(N);
      for (var i = 0; i < N; i++) {
        posX[i] = (i % res) / res; posY[i] = ((i / res) | 0) / res; slot[i] = i;
        packed[i] = (255 << 24) | ((srcC[i * 3 + 2] * 255 | 0) << 16) | ((srcC[i * 3 + 1] * 255 | 0) << 8) | (srcC[i * 3] * 255 | 0);
      }
      bg = (255 << 24) | (0x1A << 16) | (0x16 << 8) | 0x15;
      K = (+el.prox.value) * 0.22; r0 = radius = res / 2; gen = 0; itInGen = 0; perGen = N * (+el.q.value); rng = xorshift(12345);
      snaps = []; swapsLog = []; swapsInGen = 0; cumW = null; snapshot();
      revLoadedImg = revLoadedTab = false; if (viewMode === 'rev') viewMode = 'move';
      costLog = null; el.viz.classList.remove('on');
    }
    function cost(s, j) {
      var s3 = s * 3, j3 = j * 3, dr = fS[s3] - fT[j3], dg = fS[s3 + 1] - fT[j3 + 1], db = fS[s3 + 2] - fT[j3 + 2];
      var dx = posX[s] - posX[j], dy = posY[s] - posY[j], sp = K * (dx * dx + dy * dy);
      return dr * dr + dg * dg + db * db + sp * sp;
    }
    function optimizeFor(ms) {
      var t0 = performance.now();
      while (performance.now() - t0 < ms) {
        var r = Math.max(1, radius | 0), span = 2 * r + 1;
        for (var it = 0; it < 4096; it++) {
          var a = (rng() * N) | 0, ax = a % res, ay = (a / res) | 0;
          var bx = ax + ((rng() * span) | 0) - r, by = ay + ((rng() * span) | 0) - r;
          if (bx < 0) bx = 0; else if (bx >= res) bx = res - 1;
          if (by < 0) by = 0; else if (by >= res) by = res - 1;
          var b = by * res + bx; if (b === a) continue;
          var sa = slot[a], sb = slot[b];
          if (cost(sa, b) + cost(sb, a) < cost(sa, a) + cost(sb, b)) { slot[a] = sb; slot[b] = sa; swapsInGen++; }
        }
        itInGen += 4096;
        if (itInGen >= perGen) { itInGen = 0; gen++; radius *= 0.99; snapshot(); if (radius < 1) return true; }
      }
      return false;
    }
    function render(t, anim) {
      img32.fill(bg);
      var ease = EASE[el.ease.value], st = anim ? (+el.stag.value) / 100 : 0, mode = el.sm.value, span = 1 - st, lim = W - cell;
      for (var j = 0; j < N; j++) {
        var s = slot[j], e = 1;
        if (anim) {
          var d;
          if (mode === 'rand') d = hash(s);
          else if (mode === 'dist') { var dx = posX[s] - posX[j], dy = posY[s] - posY[j]; d = Math.sqrt(dx * dx + dy * dy) / Math.SQRT2; }
          else d = posY[j];
          var u = span > 0 ? (t - d * st) / span : t; u = u < 0 ? 0 : u > 1 ? 1 : u; e = ease(u);
        }
        var px = Math.round((posX[s] + (posX[j] - posX[s]) * e) * W), py = Math.round((posY[s] + (posY[j] - posY[s]) * e) * W);
        if (px < 0) px = 0; else if (px > lim) px = lim; if (py < 0) py = 0; else if (py > lim) py = lim;
        var col = packed[s];
        for (var yy = 0; yy < cell; yy++) { var o = (py + yy) * W + px; for (var xx = 0; xx < cell; xx++) img32[o++] = col; }
      }
      vctx.putImageData(imgData, 0, 0);
    }
    // 計算過程の再生：世代kとk+1の席のあいだを、マスごとになめらかにつなぐ
    function renderProc(t) {
      img32.fill(bg);
      var G = snaps.length - 1, lim = W - cell, k = 0, u = 0;
      if (G >= 1) {
        // 入れ替えが多い世代ほど長く見せる（後半はほとんど動かないので早送り）
        if (!cumW || cumW.length !== G + 1) {
          cumW = new Float64Array(G + 1); var mx = 0, i;
          for (i = 1; i <= G; i++) mx = Math.max(mx, Math.sqrt(swapsLog[i]));
          for (i = 1; i <= G; i++) cumW[i] = cumW[i - 1] + Math.sqrt(swapsLog[i]) + mx * 0.03;
          for (i = 1; i <= G; i++) cumW[i] /= cumW[G];
        }
        var lo = 0, hi = G; while (hi - lo > 1) { var m = (lo + hi) >> 1; if (cumW[m] <= t) lo = m; else hi = m; }
        k = Math.min(G - 1, lo); u = (t - cumW[k]) / Math.max(1e-9, cumW[k + 1] - cumW[k]); u = u < 0 ? 0 : u > 1 ? 1 : u;
      }
      var A = snaps[k], B = snaps[Math.min(G, k + 1)], e = u * u * (3 - 2 * u);
      for (var s = 0; s < N; s++) {
        var pa = A[s], pb = B[s];
        var x = posX[pa] + (posX[pb] - posX[pa]) * e, y = posY[pa] + (posY[pb] - posY[pa]) * e;
        var px = Math.round(x * W), py = Math.round(y * W);
        if (px < 0) px = 0; else if (px > lim) px = lim; if (py < 0) py = 0; else if (py > lim) py = lim;
        var col = packed[s];
        if (layer === 1) {
          // ズレの地図：今いる席の目標色との差。暗い＝合っている、明るい赤＝ズレている
          var v = Math.min(1, colorErr(s, u < .5 ? pa : pb) / heatNorm), R, Gc, Bc;
          if (v < .5) { var q = v * 2; R = 26 + (215 - 26) * q; Gc = 22 + (38 - 22) * q; Bc = 21 + (30 - 21) * q; }
          else { var q2 = (v - .5) * 2; R = 215 + 40 * q2; Gc = 38 + 170 * q2; Bc = 30 + 160 * q2; }
          col = (255 << 24) | ((Bc | 0) << 16) | ((Gc | 0) << 8) | (R | 0);
        }
        for (var yy = 0; yy < cell; yy++) { var o = (py + yy) * W + px; for (var xx = 0; xx < cell; xx++) img32[o++] = col; }
      }
      vctx.putImageData(imgData, 0, 0);
      if (layer === 2) {
        // 移動の線：この世代で席が変わったマスの「元の席→新しい席」
        vctx.strokeStyle = 'rgba(255,255,255,.45)'; vctx.lineWidth = 1; vctx.beginPath(); var h = cell / 2, n = 0;
        for (var s2 = 0; s2 < N && n < 6000; s2++) { var a = A[s2], b = B[s2]; if (a === b) continue; n++;
          vctx.moveTo(posX[a] * W + h, posY[a] * W + h); vctx.lineTo(posX[b] * W + h, posY[b] * W + h); }
        vctx.stroke();
      }
      movePlayhead(k + u);
      return k + (u > .5 ? 1 : 0);
    }
    function renderRev(t) {
      img32.fill(bg);
      var lim = W - cell, ease = EASE.io;
      for (var j = 0; j < N; j++) {
        var s = revUse[j], u = (t - hash(j) * .3) / .7; u = u < 0 ? 0 : u > 1 ? 1 : u; var e = ease(u);
        var px = Math.round((posX[j] + (posX[s] - posX[j]) * e) * W), py = Math.round((posY[j] + (posY[s] - posY[j]) * e) * W);
        if (px < 0) px = 0; else if (px > lim) px = lim; if (py < 0) py = 0; else if (py > lim) py = lim;
        var col = revCol[j];
        for (var yy = 0; yy < cell; yy++) { var o = (py + yy) * W + px; for (var xx = 0; xx < cell; xx++) img32[o++] = col; }
      }
      vctx.putImageData(imgData, 0, 0);
    }
    function near(a, b) {
      return Math.abs((a & 255) - (b & 255)) <= 3 && Math.abs(((a >> 8) & 255) - ((b >> 8) & 255)) <= 3 && Math.abs(((a >> 16) & 255) - ((b >> 16) & 255)) <= 3;
    }
    function revDefaults() {
      if (!revLoadedImg) { revCol = new Uint32Array(N); for (var j = 0; j < N; j++) revCol[j] = packed[slot[j]]; }
      if (!revLoadedTab) { revTab = new Uint16Array(N); for (var k = 0; k < N; k++) revTab[k] = slot[k]; }
    }
    function runRev() {
      if (S.phase !== 'anim') { el.revHint.textContent = '先に計算を終わらせてください。'; return; }
      revDefaults();
      if (revCol.length !== N || revTab.length !== N) { el.revHint.textContent = 'マスの数が合いません。保存したときと同じ「マスの数」で計算してから読み込んでください。'; return; }
      // 表を壊す：選んだ席どうしで中身をぐるっと入れ替える（表としては成り立ったまま中身だけ間違える）
      revUse = new Uint16Array(revTab); var nb = Math.round((+el.brk.value) / 100 * N), r2 = xorshift(777), idx = [], i;
      if (nb > 1) {
        var pool = new Int32Array(N); for (i = 0; i < N; i++) pool[i] = i;
        for (i = 0; i < nb; i++) { var k = i + ((r2() * (N - i)) | 0), tmp = pool[i]; pool[i] = pool[k]; pool[k] = tmp; idx.push(pool[i]); }
        var first = revUse[idx[0]]; for (i = 0; i < nb - 1; i++) revUse[idx[i]] = revUse[idx[i + 1]]; revUse[idx[nb - 1]] = first;
      }
      // 元画像（色の材料）と比べた一致率
      var ok = 0; for (var j = 0; j < N; j++) if (near(revCol[j], packed[revUse[j]])) ok++;
      revMatch = ok / N;
      viewMode = 'rev'; el.viz.classList.remove('on'); el.vmMove.setAttribute('aria-pressed', false); el.vmProc.setAttribute('aria-pressed', false);
      S.t = 0; S.hold = .4; S.playing = !reduceMotion; if (reduceMotion) S.t = 1; label();
      el.revHint.textContent = (revLoadedImg || revLoadedTab ? '読み込んだデータで' : '今の計算結果で') + '逆算しました。' + (nb > 1 ? '表の' + el.brk.value + '%を壊しています。' : '');
    }
    function download(name, blob) {
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    }
    function saveImg() {
      if (S.phase !== 'anim') return;
      var c = mk(res), g = c.getContext('2d'), d = g.createImageData(res, res), u = new Uint32Array(d.data.buffer);
      for (var j = 0; j < N; j++) u[j] = packed[slot[j]];
      g.putImageData(d, 0, 0); c.toBlob(function (b) { download('ezn-kansei-' + res + '.png', b); }, 'image/png');
    }
    function saveTab() {
      if (S.phase !== 'anim') return;
      var b = new Uint8Array(new Uint16Array(slot).buffer), s = '';
      for (var i = 0; i < b.length; i += 8192) s += String.fromCharCode.apply(null, b.subarray(i, i + 8192));
      download('ezn-hyou-' + res + '.txt', new Blob(['EZN-TABLE ' + res + '\n' + btoa(s) + '\n'], { type: 'text/plain' }));
    }
    function loadImgFile(input) {
      var f = input.files && input.files[0]; if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        loadImg(fr.result).then(function (im) {
          var d = dims(im);
          if (d[0] !== d[1]) { el.revHint.textContent = '「完成画像を保存」で保存した正方形のPNGを選んでください。'; return; }
          var c = mk(res), g = c.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(im, 0, 0, d[0], d[1], 0, 0, res, res);
          var px = new Uint32Array(g.getImageData(0, 0, res, res).data.buffer.slice(0));
          revCol = new Uint32Array(N); for (var j = 0; j < N; j++) revCol[j] = px[j] | 0xFF000000;
          revLoadedImg = true; el.revHint.textContent = '完成画像を読み込みました（' + d[0] + '×' + d[1] + '）。' + (d[0] !== res ? 'マスの数と大きさが違うので、ずれることがあります。' : '');
        }, function () { el.revHint.textContent = 'この画像は読み込めませんでした。'; });
      };
      fr.readAsDataURL(f);
    }
    function loadTabFile(input) {
      var f = input.files && input.files[0]; if (!f) return;
      f.text().then(function (txt) {
        var m = /^EZN-TABLE (\d+)\s+([A-Za-z0-9+\/=]+)/.exec(txt);
        if (!m) { el.revHint.textContent = '「並べ替え表を保存」で保存したファイルを選んでください。'; return; }
        if (+m[1] !== res) { el.revHint.textContent = 'この表は ' + m[1] + '×' + m[1] + ' マス用です。「マスの数」を合わせて計算し直してから読み込んでください。'; return; }
        var bin = atob(m[2]), b = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
        revTab = new Uint16Array(b.buffer); revLoadedTab = true; el.revHint.textContent = '並べ替え表を読み込みました。「逆算する」を押してください。';
      });
    }
    function colorErr(s, j) {
      var s3 = s * 3, j3 = j * 3, dr = srcC[s3] - tgtC[j3], dg = srcC[s3 + 1] - tgtC[j3 + 1], db = srcC[s3 + 2] - tgtC[j3 + 2];
      return dr * dr + dg * dg + db * db;
    }
    // 世代ごとのズレの合計（色の差＋移動のしにくさ）を、記録した並びから計算する
    function buildStats() {
      var G = snaps.length - 1; costLog = new Float64Array(G + 1);
      for (var g = 0; g <= G; g++) { var A = snaps[g], c = 0; for (var s = 0; s < N; s++) c += cost(s, A[s]); costLog[g] = c; }
      drawChart(el.c1, swapsLog, 1); drawChart(el.c2, costLog, 0); ticks(el.a1); ticks(el.a2);
      var e0 = new Float64Array(N); for (var s2 = 0; s2 < N; s2++) e0[s2] = colorErr(s2, s2); e0.sort(); heatNorm = Math.max(1e-4, e0[(N * .95) | 0]);
      el.c1m.textContent = '最大 ' + Math.max.apply(null, Array.prototype.slice.call(swapsLog, 1)).toLocaleString() + '回';
      el.c2m.textContent = costLog[0].toFixed(0) + ' → ' + costLog[G].toFixed(0);
    }
    function drawChart(svg, arr, from) {
      var G = snaps.length - 1, mx = 0, i; for (i = from; i <= G; i++) mx = Math.max(mx, arr[i]);
      var X = function (g) { return gx(g) * 300; }, Y = function (v) { return 54 - (mx ? v / mx : 0) * 48; };
      var d = ''; for (i = from; i <= G; i++) d += (i === from ? 'M' : 'L') + X(i).toFixed(1) + ' ' + Y(arr[i]).toFixed(1);
      svg.innerHTML =
        '<line x1="0" y1="54" x2="300" y2="54" stroke="var(--ln)" stroke-width="1" vector-effect="non-scaling-stroke"/>' +
        '<path d="' + d + 'L300 54L' + X(from) + ' 54Z" fill="var(--a)" fill-opacity=".1" stroke="none"/>' +
        '<path d="' + d + '" fill="none" stroke="var(--a)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
        '<line data-ph x1="0" y1="2" x2="0" y2="56" stroke="#1B1B1B" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
    }
    function gx(g) { var G = snaps.length - 1; return Math.log(1 + g) / Math.log(1 + G); }
    function xg(x) { var G = snaps.length - 1; return Math.exp(x * Math.log(1 + G)) - 1; }
    function ticks(box) { var G = snaps.length - 1, h = ''; [0, 1, 10, 100, G].forEach(function (g) { if (g > G || (g === 100 && G < 150)) return; h += '<span style="left:' + (gx(g) * 100).toFixed(1) + '%' + (g === 0 ? ';transform:none' : g === G ? ';transform:translateX(-100%)' : '') + '">' + g + '</span>'; }); box.innerHTML = h; }
    function movePlayhead(f) {
      var x = (gx(f) * 300).toFixed(1);
      [el.c1, el.c2].forEach(function (svg) { var l = svg.querySelector('[data-ph]'); if (l) { l.setAttribute('x1', x); l.setAttribute('x2', x); } });
    }
    function genAt(svg, ev) { var r = svg.getBoundingClientRect(), G = snaps.length - 1; return Math.max(0, Math.min(G, Math.round(xg((ev.clientX - r.left) / r.width)))); }
    function chartEvents(svg) {
      svg.addEventListener('pointermove', function (ev) {
        if (!costLog) return; var g = genAt(svg, ev), host = svg.closest('.viz').getBoundingClientRect(), r = svg.getBoundingClientRect();
        el.tip.innerHTML = '<b>世代 ' + g + '</b><br>入れ替え ' + (swapsLog[g] || 0).toLocaleString() + '回<br>ズレの合計 ' + costLog[g].toFixed(1) + '<br>探索半径 ' + Math.max(1, r0 * Math.pow(.99, g)).toFixed(1) + 'マス';
        el.tip.style.display = 'block';
        var x = ev.clientX - host.left + 12; if (x > host.width - 150) x = ev.clientX - host.left - 150; if (x < 0) x = 0;
        el.tip.style.left = x + 'px'; el.tip.style.top = (r.top - host.top - 10) + 'px';
      });
      svg.addEventListener('pointerleave', function () { el.tip.style.display = 'none'; });
      svg.addEventListener('click', function (ev) {
        if (!costLog || !cumW) return; var g = genAt(svg, ev);
        S.t = cumW[g]; S.playing = false; S.hold = 0; label(); el.scrub.value = Math.round(S.t * 1000);
      });
    }
    function setLayer(n) { layer = n; ['ly0', 'ly1', 'ly2'].forEach(function (k, i) { el[k].setAttribute('aria-pressed', i === n); }); }
    function setMode(m) {
      viewMode = m;
      el.vmMove.setAttribute('aria-pressed', m === 'move'); el.vmProc.setAttribute('aria-pressed', m === 'proc');
      if (S.phase === 'anim' && reduceMotion) S.t = 1;
      if (S.phase === 'anim') { S.t = 0; S.dir = 1; S.hold = .3; if (!reduceMotion) S.playing = true; label(); }
      el.viz.classList.toggle('on', m === 'proc' && S.phase === 'anim');
      if (m === 'proc' && S.phase === 'anim' && !costLog) buildStats();
      if (m === 'move') { el.pg.style.width = '100%'; el.sr.textContent = '世代 ' + (snaps.length - 1) + 'で完成'; }
    }
    function label() { el.play.textContent = S.playing ? '一時停止' : '再生'; }
    function loop(now) {
      if (!S.visible) { S.looping = false; S.last = 0; return; }
      var dt = S.last ? Math.min(.05, (now - S.last) / 1000) : 0; S.last = now;
      if (S.phase === 'opt') {
        var fin = optimizeFor(14); render(1, false);
        var p = Math.log(r0 / Math.max(1, radius)) / Math.log(r0);
        el.pg.style.width = (fin ? 100 : Math.min(1, p) * 100).toFixed(1) + '%';
        el.sl.textContent = fin ? '計算完了' : '計算中';
        el.sr.textContent = '世代 ' + gen + '　探索半径 ' + radius.toFixed(1);
        if (fin) { S.phase = 'anim'; S.t = 0; S.dir = 1; S.hold = .5; if (viewMode === 'proc') { buildStats(); el.viz.classList.add('on'); } if (reduceMotion) { S.t = 1; S.playing = false; } label(); }
      } else if (S.phase === 'anim') {
        var proc = viewMode === 'proc', rev = viewMode === 'rev';
        if (S.playing) {
          if (S.hold > 0) S.hold -= dt;
          else if (rev) { S.t = Math.min(1, S.t + dt / 2.2); if (S.t >= 1) S.playing = false, label(); }
          else if (proc) {
            // 計算過程は「最初から最後まで」を繰り返す（逆再生はしない）
            if (S.t >= 1) { S.t = 0; S.hold = .5; }
            else { S.t += dt / ((+el.dur.value) / 10 * 3); if (S.t >= 1) { S.t = 1; S.hold = 1.8; } }
          } else {
            S.t += S.dir * dt / ((+el.dur.value) / 10);
            if (S.t >= 1) { S.t = 1; S.dir = -1; S.hold = 1.2; } else if (S.t <= 0) { S.t = 0; S.dir = 1; S.hold = .6; }
          }
          el.scrub.value = Math.round(S.t * 1000);
        }
        if (rev) {
          renderRev(S.t);
          el.sl.textContent = S.t < .999 ? '逆算中' : '逆算の結果';
          el.sr.textContent = '元画像との一致 ' + (revMatch * 100).toFixed(1) + '%';
          el.pg.style.width = (S.t * 100).toFixed(1) + '%';
        } else if (proc) {
          var g = renderProc(S.t), G = snaps.length - 1;
          el.sl.textContent = S.t < .001 ? '元画像' : S.t > .999 ? '計算完了' : '計算過程を再生中';
          el.sr.textContent = '世代 ' + g + ' / ' + G + '　入れ替え ' + (swapsLog[g] || 0) + '回';
          el.pg.style.width = (S.t * 100).toFixed(1) + '%';
        } else {
          render(S.t, true);
          el.sl.textContent = S.t < .001 ? '元画像' : S.t > .999 ? '並べ替え後' : '移動中';
        }
      }
      requestAnimationFrame(loop);
    }
    function kick() { if (S.visible && !S.looping) { S.looping = true; requestAnimationFrame(loop); } }
    function start() {
      if (!S.srcImg || !S.tgtImg) return;
      try { setup(); } catch (e) { el.hint.textContent = '画像を読み取れませんでした。画像がこのサイトと同じドメインにあるか確認してください。'; return; }
      S.phase = 'opt'; el.run.classList.remove('stale'); el.hint.textContent = ''; el.pg.style.width = '0'; kick();
    }
    function stale() { if (S.phase !== 'idle') { el.run.classList.add('stale'); el.hint.textContent = '設定が変わりました。「計算し直す」で反映されます。'; } }
    function pick(input, cb) {
      var f = input.files && input.files[0]; if (!f) return;
      var fr = new FileReader();
      fr.onload = function () { loadImg(fr.result).then(cb, function () { el.hint.textContent = 'この画像は読み込めませんでした。PNGかJPEGを選んでください。'; }); };
      fr.readAsDataURL(f);
    }

    el.run.onclick = start;
    el.vmMove.onclick = function () { setMode('move'); };
    el.ly0.onclick = function () { setLayer(0); }; el.ly1.onclick = function () { setLayer(1); }; el.ly2.onclick = function () { setLayer(2); };
    chartEvents(el.c1); chartEvents(el.c2);
    el.vmProc.onclick = function () { setMode('proc'); };
    el.play.onclick = function () { if (S.phase !== 'anim') return; if (viewMode === 'rev' && S.t >= 1) S.t = 0; S.playing = !S.playing; S.hold = 0; label(); };
    el.scrub.oninput = function () { if (S.phase !== 'anim') return; S.playing = false; label(); S.t = el.scrub.value / 1000; };
    el.cm.onchange = function () { stale(); };
    el.prox.oninput = function () { el.proxV.textContent = el.prox.value; stale(); };
    el.res.onchange = stale; el.q.onchange = stale;
    el.dur.oninput = function () { el.durV.textContent = (el.dur.value / 10).toFixed(1) + '秒'; };
    el.stag.oninput = function () { el.stagV.textContent = el.stag.value + '%'; };
    el.fs.onchange = function () { pick(el.fs, function (im) { S.srcImg = im; thumb(el.ts, im); start(); }); };
    if (el.rev) {
      el.rev.onclick = runRev; el.saveImg.onclick = saveImg; el.saveTab.onclick = saveTab;
      el.brk.oninput = function () { el.brkV.textContent = el.brk.value + '%'; };
      el.ldImg.onchange = function () { loadImgFile(el.ldImg); };
      el.ldTab.onchange = function () { loadTabFile(el.ldTab); };
    }
    if (!fixed) {
      el.ft.onchange = function () { pick(el.ft, function (im) { S.tgtImg = im; thumb(el.tt, im); start(); }); };
      el.swap.onclick = function () { var a = S.srcImg; S.srcImg = S.tgtImg; S.tgtImg = a; thumb(el.ts, S.srcImg); thumb(el.tt, S.tgtImg); start(); };
    }
    label();

    var ds = host.dataset, tgtURL = fixed ? ds.target : ds.demoTarget;
    Promise.all([ds.demo ? loadImg(ds.demo) : null, tgtURL ? loadImg(tgtURL) : null]).then(function (r) {
      if (r[0]) { S.srcImg = r[0]; thumb(el.ts, r[0]); }
      if (r[1]) { S.tgtImg = r[1]; thumb(el.tt, r[1]); }
      if (S.srcImg && S.tgtImg) {
        // 画面に入ってから計算を始める（ページ表示を重くしない）
        var started = false;
        var io = new IntersectionObserver(function (es) {
          S.visible = es[0].isIntersecting;
          if (S.visible && !started) { started = true; start(); } else kick();
        }, { rootMargin: '200px' });
        io.observe(host);
      } else {
        el.sl.textContent = '画像を選んでください';
        S.visible = true;
      }
    }, function () { el.hint.textContent = 'デモ画像を読み込めませんでした。data-demo などのURLを確認してください。'; });
  }

  function init() {
    document.querySelectorAll('.ezn-widget').forEach(function (h) { if (!h.shadowRoot) Widget(h); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
