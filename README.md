# 謎ノ美兎技術部（mito-tech-club）

月ノ美兎（にじさんじ）の **非公式ファン技術実験** のコード置き場です。
ソートで画像を並べ替えて謎ノ美兎の顔にする、音や文章に顔を隠す、針を落として円周率と顔を出す……といった実験を、ブラウザだけで動く形で置いています。

> Unofficial fan-made experiments featuring **Tsukino Mito (月ノ美兎, Nijisanji)** and her drawing "謎ノ美兎".
> Every tool runs entirely in your browser. Japanese UI; see [English](#english) below.

- ブログ（記事のまとめ）：[謎ノ美兎技術部｜ミコンスキーの部屋](https://zuariya.com/nazono-tech/)
- YouTube：[@mikonsukey](https://www.youtube.com/@mikonsukey) ／ X：[@mikonsukey](https://x.com/mikonsukey)

## 実験の一覧

| # | 実験 | なにをするか | 記事 | 動画 |
|---|---|---|---|---|
| 00 | [なんでも謎ノ美兎](experiments/00-pixel-morph/) | 好きな画像のピクセルを並べ替えるだけで顔にする（色は変えない） | [記事](https://zuariya.com/nazono-mito-pixel-morph/) | [動画](https://youtu.be/mny-9HApLS4) |
| 01 | [謎ノ美兎ソート](experiments/01-sort/) | バブル・クイック・スターリン・並行世界ソートで、どれが一番速く顔に並ぶか比べる | [記事](https://zuariya.com/nazono-sort/) | [動画](https://youtu.be/Fs893tGabBg) |
| 02 | [謎ノ美兎スペクトログラム](experiments/02-spectrogram/) | 聞くとふつうの音なのに、スペクトログラムにすると顔が出る | [記事](https://zuariya.com/nazono-spectrogram/) | [動画](https://youtu.be/ZOiA2l7YdYk) |
| 03 | [謎ノ美兎透かし（文章）](experiments/03-watermark/) | 合言葉で調べると、単語の並びに顔が浮かぶ文章を作る | [記事](https://zuariya.com/nazono-mark/) | [動画](https://youtu.be/uAZW5zM-jxc) |
| 04 | [たのしいお絵描き](experiments/04-drawing/) | 描いた線が、手を止めると謎ノ美兎の線画に寄っていく | [記事](https://zuariya.com/gunya-sen-paint/) | [動画](https://youtu.be/wGSVN_Mp-Xk) |
| 05 | [タップで出る写真](experiments/05-tap-photo/) | タイムラインではふつうの写真、タップすると顔が見えるPNGを作る | [記事](https://zuariya.com/nazono-photo/) | [動画](https://youtu.be/fkL0rUQ5SKs) |
| 06 | [謎ノ美兎の針](experiments/06-buffon/) | ビュフォンの針を謎ノ美兎の線画でやっても、円周率が出る | [記事](https://zuariya.com/nazono-buffon/) | [動画](https://youtu.be/0ezsRE_0G5c) |

新しい実験は、ブログと動画が公開されるたびに足していきます。

## 動かし方

ファイルを置いたフォルダで、簡単なサーバーを立ててブラウザで開きます（`file://` で直接開くと、画像を読めない実験があります）。

```sh
git clone https://github.com/mikonsukey/mito-tech-club.git
cd mito-tech-club
python -m http.server 8000
# ブラウザで http://localhost:8000/experiments/01-sort/ を開く
```

ビルドもインストールも要りません。各実験は1つのJavaScriptファイルで動きます。

## 自分の画像で試す（謎ノ美兎で動かす）

このリポジトリには **謎ノ美兎の画像を入れていません**。そのまま開くと、その場で描いた「見本の顔」で動きます。

謎ノ美兎（や、好きな顔）で動かすには：

1. 顔の画像を用意します。顔が正方形の真ん中に来る画像がおすすめです。背景を透明にしたPNGだと、スペクトログラムの型押しや写真の透かしがきれいに出ます。
2. `tools/make-assets.html` をブラウザで開いて、画像を読み込みます。
3. 「mito-assets.js を保存」を押し、できた `mito-assets.js` を `assets/` フォルダに置きます。
4. 各実験を開き直すと、その顔で動きます。

画像はブラウザの中だけで処理され、どこにも送られません。`assets/` の中身は Git に入らない設定です。

## しくみ

- `lib/mito-assets.js`：顔の画像から、各実験が使うデータ（明暗の顔・線画・0/1の顔・線画をなぞった折れ線など）を作ります。`assets/mito-assets.js` がなければ見本の顔を描きます。
- `experiments/*/ezn-*.js`：ブログで動いているものと同じ本体です。違いは、顔のデータを埋め込まずに `window.MITO_ASSETS` から読むところだけです。
- 仕組みの解説は、各ブログ記事と動画にあります。

## 注意

- 月ノ美兎（にじさんじ）の **非公式のファン作品** です。ANYCOLOR株式会社とは関係ありません。
- [ANYCOLOR 二次創作ガイドライン](https://www.anycolor.co.jp/guidelines/) に沿って作っています。作ったものを公開するときは、ガイドラインを確認してください。
- ライセンス（MIT）はこのリポジトリの **コードだけ** に適用されます。キャラクター・名前・画像の権利は ANYCOLOR株式会社 にあります。
- 「なんでも謎ノ美兎」の元ネタは [obamify（Spu7Nix）](https://github.com/Spu7Nix/obamify) です。コードは独立に書いています。

## English

**mito-tech-club** is a collection of browser-only fan experiments about Tsukino Mito (Nijisanji) and "謎ノ美兎".
Sort an image until it becomes her face, hide her face in sound (spectrograms) or in text (watermarking), drop Buffon's needles on her line art, and more.

- No images of the character are included. Without assets, every tool runs with a built-in sample face.
- To use your own image: open `tools/make-assets.html`, load a face image, save `mito-assets.js`, and put it in `assets/`.
- Run locally with any static server, e.g. `python -m http.server 8000`.
- This is an unofficial fan project, not affiliated with ANYCOLOR Inc. The MIT license covers the code only.

---

作った人：ミコンスキー（[ブログ](https://zuariya.com/) ／ [YouTube](https://www.youtube.com/@mikonsukey) ／ [X](https://x.com/mikonsukey)）
