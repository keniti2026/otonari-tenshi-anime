# Claude Code 引き継ぎ情報

このファイルは、Claude Codeがこのリポジトリで作業するときの基本情報と運用ルールです。

## サイト情報

- リポジトリ: `https://github.com/keniti2026/otonari-tenshi-anime`
- 本番URL: `https://keniti2026.github.io/otonari-tenshi-anime/`
- 本番ブランチ: `main`
- 公開方式: GitHub Pages（`main`ブランチのリポジトリルート）
- アプリ種別: ビルド工程のない静的HTML/CSS/JavaScriptサイト

`main`へマージされた内容が本番サイトへ公開されます。公開前に必ず差分と表示を確認してください。

## ファイル構成

- `index.html`: ページ全体のHTMLとコンテンツ
- `style.css`: デザイン、レイアウト、レスポンシブ表示
- `script.js`: ナビゲーションのアクティブ表示、スクロール時の動作
- `images/`: キービジュアル・ギャラリー画像（`keyvisual1`〜`keyvisual8`など）
- `gallery_notes.txt`: ギャラリー画像に関するメモ

## 作業ルール

1. 作業開始時に`git status`で既存の変更を確認し、他の人の変更を上書きしない。
2. `codex/<短い説明>`または`claude/<短い説明>`の作業ブランチを作り、通常はPull Request経由で`main`へ反映する。
3. ユーザーが明示的に依頼しない限り、フレームワーク、npm、ビルドツール、GitHub Actionsを追加しない。
4. 既存の日本語コンテンツをUTF-8のまま扱い、文字コードの一括変換や不要な整形をしない。
5. 画像を無断で削除・差し替え・圧縮・リネームしない。相対パスを維持する。
6. デスクトップとスマートフォンの両方で見やすいレイアウトを維持する。
7. `target="_blank"`の外部リンクには`rel="noopener noreferrer"`を付ける。
8. PAT、APIキー、パスワード、Cookieなどの秘密情報を、会話・ファイル・コミットへ書き込まない。
9. 変更内容、確認したコマンド、未確認事項を作業終了時に説明する。

## 認証とGitHub操作

このPCではGitHub CLIのブラウザ認証を使います。

```powershell
gh auth status
gh auth login
```

PATをClaude Codeのプロンプトへ貼り付けないでください。認証状態に問題がある場合は、GitHubのブラウザ認証を再実行します。

## ローカル確認

このサイトには依存関係のインストールはありません。リポジトリルートで次を実行できます。

```powershell
node --check script.js
git diff --check
python -m http.server 8000
```

ブラウザで`http://localhost:8000/`を開き、画像、ページ内ナビゲーション、外部リンク、スマートフォン幅の表示、ブラウザコンソールのエラーを確認してください。

## 最近の状態

- 2026-07-17: ページ上部と各話リスト上部のポータルバナーを削除（PR #2、`main`へマージ済み）。
- 2026-07-23: PR #1「Codex管理用設定を追加」（`AGENTS.md`、`README.md`、`.editorconfig`、`.gitignore`）が`main`へマージ済み。サイト本体（HTML/CSS/JS/画像）への変更は含まれない。
- 2026-07-23: PR #3「Claude Code handoff guide」（この`CLAUDE.md`）、PR #4「歴史・反響ページとリンク集ページを追加」（`history.html`、`links.html`）が`main`へマージ済み。
- 2026-07-24: TOPページを含むサイト全体の配色を「昭和モダン」テイスト（テラコッタ・マスタード・ダークブラウン主体）へ変更。`claude/ohayou-msjqui`ブランチで作業中、PR未作成。

## 依頼の出し方

依頼には「目的」「変更対象」「維持する条件」「完了条件」を含めてください。例:

```text
トップページのお知らせ欄を更新してください。
既存のデザインとスマートフォン表示を維持し、
ローカル表示とgit diff --checkを確認してから、変更点を説明してください。
```
