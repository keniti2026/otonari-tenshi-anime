# お隣の天使様 アニメ総合情報サイト

「お隣の天使様にいつの間にか駄目人間にされていた件」の情報を掲載する静的Webサイトです。

- 公開サイト: https://keniti2026.github.io/otonari-tenshi-anime/
- GitHubリポジトリ: https://github.com/keniti2026/otonari-tenshi-anime
- 公開ブランチ: `main`

## ファイル構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | サイトの文章とHTML構造 |
| `style.css` | デザインとレスポンシブレイアウト |
| `script.js` | ナビゲーションなどの画面動作 |
| `images/` | キービジュアルとギャラリー画像 |
| `AGENTS.md` | Codexが自動参照する作業・確認ルール |

## ローカルで確認する

リポジトリのフォルダで次を実行します。

```powershell
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。終了するときはターミナルで `Ctrl+C` を押します。

JavaScriptの構文とGit差分は次のコマンドで確認できます。

```powershell
node --check script.js
git diff --check
```

## Codexで更新する流れ

1. `main`を最新にする。
2. `codex/<作業内容>`という作業ブランチを作る。
3. Codexへ目的、変更対象、守る条件、完了条件を伝える。
4. ローカル表示と差分を確認する。
5. コミットしてGitHubへpushし、Pull Requestを作成する。
6. 確認後に`main`へマージし、公開サイトを確認する。

依頼例:

```text
トップページのお知らせを更新してください。
既存のデザインとスマートフォン表示を維持し、
ローカルで表示確認してから変更点と確認結果を説明してください。
```

## 公開とセキュリティ

`main`へ反映された内容はGitHub Pagesで公開されます。Personal Access Token、APIキー、パスワードなどの秘密情報は、Codexの会話やリポジトリへ貼り付けないでください。GitHubへの操作には、このPCで認証済みのGitHub CLIを使用します。
