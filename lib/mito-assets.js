/*!
 * mito-assets.js — 実験で使う「顔のデータ」を用意する共通スクリプト
 *
 * 各実験は window.MITO_ASSETS を読みます。中身は次のとおりです。
 *   face      カラーの顔（256×256 の JPEG、data URL）            … pixel-morph の目標
 *   tone      明暗の顔（160×160 のグレー PNG、白い背景）          … sort
 *   stamp     背景を黒にした顔（256×256 のグレー JPEG）           … spectrogram / watermark / tap-photo
 *   line      線画（256×256、黒地に白い線の PNG）                 … spectrogram / watermark / tap-photo
 *   bits      {32,48,64}: 顔を 0/1 にした文字列（1＝明るい）     … watermark
 *   polylines 線画をなぞった折れ線（640×480 の座標）             … drawing
 *   buffon    折れ線を [x, y, 区切り] の並びにしたもの            … buffon
 *   demo      並べ替えの見本に使う、顔ではない画像（data URL）   … pixel-morph
 *
 * assets/mito-assets.js（tools/make-assets.html で作るファイル）があれば、それを使います。
 * なければ、このスクリプトがその場で描いた「見本の顔」を使います。
 * 謎ノ美兎の画像はこのリポジトリに含めていません。README の「自分の画像で試す」を見てください。
 */
(function (global) {
  'use strict';

  // ------------------------------------------------------------ 画像の下ごしらえ
  function canvas(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  // 正方形に切り抜いて size×size に縮める。背景は bg の色で塗る（透明な部分に効く）
  function square(src, size, bg) {
    var w = src.naturalWidth || src.width, h = src.naturalHeight || src.height, s = Math.min(w, h);
    var c = canvas(size, size), g = c.getContext('2d');
    g.fillStyle = bg; g.fillRect(0, 0, size, size);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(src, (w - s) / 2, (h - s) / 2, s, s, 0, 0, size, size);
    return c;
  }
  function grayOf(c) {
    var d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, n = c.width * c.height, L = new Float32Array(n);
    for (var i = 0; i < n; i++) L[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
    return L;
  }
  function grayCanvas(L, w, h) {
    var c = canvas(w, h), g = c.getContext('2d'), im = g.createImageData(w, h);
    for (var i = 0; i < w * h; i++) { var v = Math.max(0, Math.min(255, Math.round(L[i] * 255))); im.data[i * 4] = im.data[i * 4 + 1] = im.data[i * 4 + 2] = v; im.data[i * 4 + 3] = 255; }
    g.putImageData(im, 0, 0); return c;
  }
  function blur3(L, w, h) {
    var o = new Float32Array(w * h);
    for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      var s = 0, n = 0;
      for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) { var X = x + dx, Y = y + dy; if (X >= 0 && Y >= 0 && X < w && Y < h) { s += L[Y * w + X]; n++; } }
      o[y * w + x] = s / n;
    }
    return o;
  }

  // ------------------------------------------------------------ 線画（輪郭を取り出して細くする）
  function edges(L, w, h, keep) {
    var B = blur3(L, w, h), M = new Float32Array(w * h), vals = [];
    for (var y = 1; y < h - 1; y++) for (var x = 1; x < w - 1; x++) {
      var i = y * w + x;
      var gx = -B[i - w - 1] - 2 * B[i - 1] - B[i + w - 1] + B[i - w + 1] + 2 * B[i + 1] + B[i + w + 1];
      var gy = -B[i - w - 1] - 2 * B[i - w] - B[i - w + 1] + B[i + w - 1] + 2 * B[i + w] + B[i + w + 1];
      M[i] = Math.hypot(gx, gy); vals.push(M[i]);
    }
    vals.sort(function (a, b) { return a - b; });
    var th = vals[Math.floor(vals.length * (1 - keep))] || 1e-6, E = new Uint8Array(w * h);
    for (var k = 0; k < w * h; k++) E[k] = M[k] > th ? 1 : 0;
    return E;
  }
  // Zhang-Suen の細線化
  function thin(E, w, h) {
    var changed = true, del = [];
    function p(x, y) { return (x < 0 || y < 0 || x >= w || y >= h) ? 0 : E[y * w + x]; }
    while (changed) {
      changed = false;
      for (var step = 0; step < 2; step++) {
        del.length = 0;
        for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
          if (!E[y * w + x]) continue;
          var n = [p(x, y - 1), p(x + 1, y - 1), p(x + 1, y), p(x + 1, y + 1), p(x, y + 1), p(x - 1, y + 1), p(x - 1, y), p(x - 1, y - 1)];
          var b = n.reduce(function (a, v) { return a + v; }, 0); if (b < 2 || b > 6) continue;
          var a = 0; for (var k = 0; k < 8; k++) if (!n[k] && n[(k + 1) % 8]) a++; if (a !== 1) continue;
          if (step === 0 ? (n[0] * n[2] * n[4] || n[2] * n[4] * n[6]) : (n[0] * n[2] * n[6] || n[0] * n[4] * n[6])) continue;
          del.push(y * w + x);
        }
        for (var d = 0; d < del.length; d++) E[del[d]] = 0;
        if (del.length) changed = true;
      }
    }
    return E;
  }
  // 細線をたどって折れ線にする
  function trace(E, w, h, minLen) {
    var seen = new Uint8Array(w * h), out = [];
    var D = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    function nb(x, y) { var c = 0; for (var k = 0; k < 8; k++) { var X = x + D[k][0], Y = y + D[k][1]; if (X >= 0 && Y >= 0 && X < w && Y < h && E[Y * w + X]) c++; } return c; }
    function walk(x, y) {
      var pts = [[x, y]]; seen[y * w + x] = 1;
      for (;;) {
        var moved = false;
        for (var k = 0; k < 8; k++) {
          var X = x + D[k][0], Y = y + D[k][1];
          if (X >= 0 && Y >= 0 && X < w && Y < h && E[Y * w + X] && !seen[Y * w + X]) { x = X; y = Y; seen[y * w + x] = 1; pts.push([x, y]); moved = true; break; }
        }
        if (!moved) return pts;
      }
    }
    // 端点（つながりが1つの点）から先にたどると、線が途中で切れにくい
    for (var pass = 0; pass < 2; pass++) for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
      if (!E[y * w + x] || seen[y * w + x]) continue;
      if (pass === 0 && nb(x, y) !== 1) continue;
      var pts = walk(x, y);
      if (pts.length >= minLen) out.push(pts.filter(function (_, i) { return i % 2 === 0 || i === pts.length - 1; }));
    }
    return out;
  }

  // ------------------------------------------------------------ まとめて作る
  /**
   * 顔の画像から、全部の実験のデータを作る。
   * img: 顔の画像（img / canvas）。背景を透明にした PNG だと、型押しなどがきれいに出ます。
   */
  function build(img) {
    var onWhite = square(img, 160, '#ffffff');
    var tone = grayCanvas(grayOf(onWhite), 160, 160);

    var onBlack = square(img, 256, '#000000');
    var SL = grayOf(onBlack);
    var stamp = grayCanvas(SL, 256, 256);

    var faceC = square(img, 256, '#ffffff');
    var FL = grayOf(faceC);
    var E = thin(edges(FL, 256, 256, 0.12), 256, 256);
    var LL = new Float32Array(256 * 256); for (var i = 0; i < LL.length; i++) LL[i] = E[i];
    var line = grayCanvas(LL, 256, 256);

    // 0/1 の顔（1＝明るい）。暗い背景と明るい顔を分ける境目は、明るさの平均で決める
    var bits = {};
    [32, 48, 64].forEach(function (n) {
      var c = canvas(n, n), g = c.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(stamp, 0, 0, n, n);
      var L = grayOf(c), m = 0; for (var k = 0; k < L.length; k++) m += L[k]; m /= L.length;
      var s = ''; for (var j = 0; j < L.length; j++) s += L[j] > Math.max(0.15, m) ? '1' : '0';
      bits[n] = s;
    });

    // 線画の折れ線：256×256 を 640×480 の中央に、高さ 470 で置く
    var paths = trace(E, 256, 256, 6), sc = 470 / 256, ox = (640 - 256 * sc) / 2, oy = 5;
    var polylines = paths.map(function (p) { return p.map(function (q) { return [Math.round((q[0] * sc + ox) * 10) / 10, Math.round((q[1] * sc + oy) * 10) / 10]; }); });

    // buffon 用：[x, y, 区切り]。区切りが続く2点の間は線を引かない
    var buffon = [];
    paths.forEach(function (p) {
      p.forEach(function (q, k) { buffon.push(q[0], q[1], (k === 0 || k === p.length - 1) ? 1 : 0); });
    });

    return {
      face: faceC.toDataURL('image/jpeg', 0.9),
      tone: tone.toDataURL('image/png'),
      stamp: stamp.toDataURL('image/jpeg', 0.92),
      line: line.toDataURL('image/png'),
      bits: bits,
      polylines: polylines,
      buffon: buffon,
      demo: demoSource(),
      source: 'build'
    };
  }

  // ------------------------------------------------------------ 見本（謎ノ美兎の代わりに使う、その場で描く顔）
  function sampleFace() {
    var S = 256, c = canvas(S, S), g = c.getContext('2d');
    g.lineCap = 'round'; g.lineJoin = 'round';
    // 髪
    g.fillStyle = '#2b2226'; g.beginPath(); g.ellipse(128, 118, 104, 98, 0, Math.PI, 0); g.lineTo(232, 210); g.lineTo(24, 210); g.closePath(); g.fill();
    // 顔
    g.fillStyle = '#f2d9c4'; g.beginPath(); g.ellipse(128, 138, 78, 88, 0, 0, Math.PI * 2); g.fill();
    // 前髪
    g.fillStyle = '#2b2226'; g.beginPath(); g.moveTo(52, 110); g.quadraticCurveTo(128, 30, 204, 110); g.quadraticCurveTo(170, 86, 150, 104); g.quadraticCurveTo(128, 80, 104, 104); g.quadraticCurveTo(84, 86, 52, 110); g.fill();
    // 目
    [[98, 140], [158, 140]].forEach(function (e) {
      g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(e[0], e[1], 17, 21, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#3a2a4a'; g.beginPath(); g.ellipse(e[0], e[1] + 3, 11, 15, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#ffffff'; g.beginPath(); g.arc(e[0] - 4, e[1] - 4, 4, 0, Math.PI * 2); g.fill();
      g.strokeStyle = '#2b2226'; g.lineWidth = 4; g.beginPath(); g.ellipse(e[0], e[1], 18, 22, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
    });
    // 口
    g.fillStyle = '#b8434a'; g.beginPath(); g.ellipse(128, 188, 14, 10, 0, 0, Math.PI); g.fill();
    g.strokeStyle = '#7a2a30'; g.lineWidth = 3; g.beginPath(); g.moveTo(112, 188); g.lineTo(144, 188); g.stroke();
    return c;
  }
  function demoSource() {
    var S = 256, c = canvas(S, S), g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, S, S); gr.addColorStop(0, '#1f3a8a'); gr.addColorStop(0.5, '#7a4fd1'); gr.addColorStop(1, '#f2c14e');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    var seed = 11; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var cols = ['#d8261c', '#ffffff', '#2a9d8f', '#16130f', '#f4efe2'];
    for (var i = 0; i < 60; i++) { g.globalAlpha = 0.8; g.fillStyle = cols[i % cols.length]; g.beginPath(); g.arc(rnd() * S, rnd() * S, 6 + rnd() * 30, 0, Math.PI * 2); g.fill(); }
    g.globalAlpha = 1;
    return c.toDataURL('image/jpeg', 0.9);
  }

  global.MitoAssets = { build: build, sampleFace: sampleFace, demoSource: demoSource };
  if (!global.MITO_ASSETS) {
    var a = build(sampleFace()); a.source = 'sample'; global.MITO_ASSETS = a;
    if (global.console) console.info('[mito-tech-club] assets/mito-assets.js が見つからないので、見本の顔で動かしています。');
  }
})(window);
