# SAKURA KART — LP

参考: https://kart.st/jp/ の構成（レイアウトと雰囲気）を桜コンセプトで再現した、インバウンド向けの集客LP。
素のHTML/CSS/JSのみ。ビルド不要。

## ファイル構成
| ファイル | 役割 |
|---|---|
| `index.html` | ページ本体（英語の文言もここに直接書いてある） |
| `css/tokens.css` | 色・フォント・余白などのデザイントークン。**見た目の変更はまずここ** |
| `css/style.css` | レイアウト・各セクションのスタイル |
| `js/config.js` | **コース・料金・時間枠・決済URL・予約の送信先** |
| `js/i18n.js` | 日本語訳（`data-i18n` のキー単位） |
| `js/main.js` | 予約フォーム・タブ・メニューなどの動き |
| `images/` | ロゴ（仮）・花びら |

## セクション構成（参考サイトとの対応）
Header（固定2段） → Hero → News → **Booking**（左：ツアー情報タブ／右：予約カレンダー） → About → Karts → Social → Reviews → Courses → FAQ → Access → Company → Footer ＋ 右下の固定CTA

## 素材が届いたら差し替える場所
- `.ph` クラスの要素がすべて仮画像（`<div class="... ph">` → `<img src="images/xxx.jpg" alt="...">`）
- `images/logo-mark.svg` → 正式ロゴ
- 電話番号・メール・住所・会社情報・SNSリンク（`index.html` 内の `(...)` / `example.com` / `href="#"`）
- 口コミ（サンプル）・料金（`js/config.js` のサンプル値）

## 未実装（決まったら対応）
- 予約データの保存先：`js/config.js` の `submitBooking` を差し替える（現在はブラウザ内に保存するだけ）
- 決済URL：`js/config.js` の `paymentUrl` / `paymentUrls`
- 空き枠の管理（現在は全枠を選択可能）
- 公開先、OGP画像、アクセス解析

## ローカルで確認
```
python3 -m http.server 5173
```
→ http://localhost:5173 （`?lang=ja` で日本語表示）
