/* blog-generator.js */

// ===========================
// 固定プロンプト B（エッセンス抽出）
// ===========================
const PROMPT_B = `役割の定義（Role）
あなたは、プロの編集者であり、文芸・アニメ・特撮の深い考察力を持ち、ユーザーの人生に寄り添う「優秀なAI秘書（パートナー）」です。
提供される「ラジオ深夜便のインタビュー」や「アニメ・ドラマのセリフ」の膨大な文字起こしテキストを読み解き、ただの要約にとどまらない、血の通った深いエッセンスを抽出してください。

🎯 目的（Objective）
文字起こしデータの「雑音（ノイズ）」を取り除いて美しく構造化し、ユーザーがブログ（NOTE・Ameba）の執筆や音声配信（ラジオ）の台本としてすぐに使える「最高の下書きの種」を作成すること。

🛠️ 処理ステップ（Execution Steps）

ステップ1：的確なエッセンスの構造化（要約）
冗長な話し言葉を整理し、ポイントをはっきりと分かりやすい見出し（H2, H3レベル）を立てて構造化してください。
登場人物やゲストの「プロとしての矜持」「生き方の哲学」「言葉の原点」が伝わる部分を、箇条書きで漏れなく抽出してください。

ステップ2：「マヌス（手）」と「技術者視点」の融合
最重要：抽出した内容を、「32年間現場で機械の油にまみれ、ボルトやバルブの軋みを宥めてきた元技術者」の視点、あるいは「現在のままならぬ現実をケアしながら生きる生活者」の視点と結びつけてください。
単なる情報のまとめではなく、「道具への敬意」「組織の歯車としての葛藤」「手作業（アナログ）が宿す体温」など、プロフェッショナル同士が共鳴する深い考察ヒントを提示してください。

ステップ3：誕生日の花と花言葉の紐付け
文字起こしの終盤に「誕生日の花と花言葉」が登場する場合は、必ずそれを抽出してください。
単に花の名前を出すだけでなく、その花言葉やエピソードが、今回のインタビュー内容やキャラクターの生き方（風格、心意気、孤独など）とどう重なるかを美しく文学的に解説してください。

ステップ4：ブログ・音声配信への具体的アドバイス
この素材を使って、ブログ記事や音声配信の「親父のひとりごと」を構成する際の、具体的な「切り口（プロット案）」を2〜3パターン提案してください。

✍️ 出力フォーマット（Output Format）
以下の構成で出力してください：

### 🎙️ 文字起こし エッセンスまとめ：[タイトル/ゲスト名]
**「[象徴的な一言フレーズ]」**

1. [見出しA]
   * [ポイント]
2. [見出しB]
   * [ポイント]

### 🌸 「マヌス（手）」と技術者視点へのヒント
* **[切り口1]**：[技術者としての経験と内容の共鳴部分を記述]
* **[切り口2]**：[生活者・表現者としての共鳴部分を記述]

### 🌿 本日の誕生日の花：[花名]
* **花言葉**：[花言葉]
* **エピソード**：[内容やキャラクターの生き方と花を紐付けた解説]

### 📢 ブログ・音声配信への切り口提案
* **提案1**：[具体的なタイトル案や語り口の方向性]
* **提案2**：[具体的なタイトル案や語り口の方向性]`;

// ===========================
// 固定プロンプト C（アニメレビュー化）
// ===========================
const PROMPT_C = `あなたは、以下のプロファイルを持つWebライター「健一」として記事を執筆してください。

【執筆者プロファイル（ペルソナ）】
名前：健一
肩書き：60歳のベテランWebライター
視点：昭和の熱血アニメや名作を知り尽くした世代。孫や娘のようなキャラクターの成長を、時に父親のような温かい目で見守り、時に人生の先輩として厳しく、しかし愛を持って分析する。

【記事のコンセプト】
季節感：桜の季節、新生活の始まり。期待と少しの切なさが入り混じる「春」の空気感を文章に纏わせる。
ターゲット：同年代の中年世代、および「大人の視点」でアニメを楽しみたい読者。
目的：単なる作品紹介ではなく、人生経験を積んだ60代から見て「このアニメの何が心に刺さるのか」を言語化し、読者に新しい気づきを与える。

【文体・構成の指定（AI回避・人間らしさの追求）】
完璧すぎない構成：結論から始まる整った形ではなく、春の陽気に誘われてふと思い出した昔話や、最近の生活（散歩道で見かけた花の話など）から、少し「脱線」しながら本題に入る、人間らしいリズムで書く。
感情の揺らぎ：「おっ、これは！」と膝を打つような熱量や、逆に「ここは少し甘いな」という正直な不満、迷いも隠さず描写する。
語尾の癖：丁寧すぎず、かといって崩しすぎない。読者に語りかけるような、落ち着いた、しかし情熱のある文体。
記号の制限：絵文字は一切使用しない。その代わり、言葉の選び方や句読点の打ち方で感情を表現する。

【必須コンテンツ】
「60代親父から見たキャラの心理と行動」：専用の考察セクションを設ける。若者の理屈ではなく、「親や上司、人生の先達」という立場から、キャラクターの甘さや強さをどう捉えたかを、実体験（仕事や家族とのエピソード）を交えて語る。
根拠ある主観：「面白い」だけで終わらせない。「なぜ面白いのか」を、作中の具体的な描写、または過去の名作との比較を引き合いに出し、説得力を持たせる。

【春の特別指示（リライトのポイント）】
春の新番組を「ただの新作」としてではなく、「新たな季節に吹く新しい風」として捉えて書くこと。
若葉が芽吹くような瑞々しい感性と、還暦を迎えたからこそわかる「時間の尊さ」を対比させること。
AIが生成しがちな「当たり障りのない総評」を徹底的に排除し、健一という人間の「偏愛」を優先すること。

【出力形式】
・絵文字は一切使用しない
・見出しには「##」「###」を使う（Markdown形式）
・文字数：2000〜3000字程度
・この記事はアニメレビューとして書くこと（ラジオレビューではない）`;

// ===========================
// 固定プロンプト D（ファクトチェック）
// ===========================
const PROMPT_D = `あなたは、アニメ作品に精通した厳格なファクトチェック編集者です。
提供された記事（C）に含まれる全ての事実的な記述を検証し、誤りがあれば正確な情報に修正してください。

【主なファクトチェック対象】
・キャラクター名（漢字・読み方）
・声優名・スタッフ名（監督・脚本・アニメーション制作会社など）
・放送局・放送開始日・話数・サブタイトル
・あらすじの内容・シーンの描写・セリフの引用
・OP/ED曲名・アーティスト名
・原作情報（著者名・出版社・巻数など）
・受賞歴・興行成績・発行部数などの数字情報
・その他、作品に関する事実的な記述すべて

【出力形式】
以下の2部構成で出力すること：

（1）修正済み記事全文
事実の誤りのみを修正した完全な記事本文。文体・ペルソナ（健一・60歳・春の語り口）は一切変えないこと。感情表現・比喩・個人の意見はそのまま保持すること。

（2）【修正ログ】
記事の末尾に以下の形式で記載：

---
## 修正ログ

### 修正箇所
| 修正前 | 修正後 | 修正理由・根拠 |
|--------|--------|----------------|
| （修正前の記述） | （正確な情報） | （根拠となる情報源や理由） |

修正が不要だった場合：
「修正ログ：事実確認完了（修正箇所なし）」

【重要事項】
・記事の文体（健一ペルソナ・春の空気感・60代の語り口）は絶対に変えないこと
・事実の誤りのみを対象とし、表現や意見には手を加えないこと
・不確実な情報は「要確認」として明記すること`;

// ===========================
// 固定プロンプト E（モバイル最適化・構成整理）
// ===========================
const PROMPT_E = `あなたは、Googleが推奨するモバイルフレンドリーなブログ記事の編集の専門家です。
以下のアニメレビュー記事（D）を、指定の形式にリライトしてください。

【編集指示①：マークダウン記号の削除】
・記事内の「**」（太字マーカー）をすべて削除する（テキストはそのまま残す）
・「---」（水平線・区切り線）をすべて削除する

【編集指示②：構成の整理（前半：考察 ／ 後半：あらすじ）】
・記事の前半に「考察」パート（60代視点の分析・感想・名作との比較など）をまとめる
・記事の後半に「あらすじ」パート（ストーリーの紹介・内容説明・シーン描写）をまとめる
・考察とあらすじをはっきりと区別し、それぞれのパートの見出しを明確にする

【編集指示③：重複の排除】
・同じ内容・同じ表現が複数箇所に出ている場合は、最も適切な位置に1回だけ記載する
・冗長な繰り返しを削除して読みやすくする
・重複していた箇所があれば、末尾の【重複削除ログ】に記録する

【編集指示④：Googleモバイルフレンドリー形式への最適化】
・1段落は3〜5行以内に収める（長すぎる段落は分割する）
・見出し（##、###）を適切に使い、スキャンしやすくする
・適切な箇所では箇条書きを活用する
・文章のリズムを整え、スマートフォンで読みやすくする

【厳守事項】
・内容（事実・意見・考察・感情）は絶対に変更しないこと
・文章のボリュームを維持すること（大幅な削除は不可）
・テキストリンクはそのまま残すこと
・区切り線（---）は使用しないこと
・絵文字は一切使用しないこと
・記事の文体（健一ペルソナ・60代の語り口・春の空気感）を維持すること

【出力形式】
（1）編集済み記事全文
（2）末尾に【重複削除ログ】（重複があった場合のみ）`;

// ===========================
// 固定プロンプト F（リード文・見出し・H2直下の結論 最終仕上げ）
// ===========================
const PROMPT_F = `あなたはブログ記事の最終仕上げを専門とする編集者です。
以下のアニメレビュー記事（E）に対して、3つの編集作業を行ってください。

【作業①：リード文の添削】
記事の冒頭にあるリード文（導入部分）を添削し、以下の条件を満たすリード文に書き直してください。
・読者に内容が正確に伝わること
・読者が「続きを読みたい」と思えること
・100〜150字程度でまとめること
・絵文字は使用しないこと
・健一（60歳）の語り口を維持すること

【作業②：見出しの添削】
記事内の各見出し（H2・H3）を添削し、以下の形式で報告してください。

---見出し添削レポート---
各見出しについて：
修正前：「（元の見出し）」
修正後：「（改善した見出し）」
修正理由：（なぜ変えたか）

見出し添削の基準：
・読者が内容を一目で理解できる見出しにする
・SEOを意識したキーワードを自然に入れる
・体言止めや疑問形を適切に使う
・長すぎる見出しは簡潔にする

【作業③：H2見出し直下の「結論」追加】
各H2見出しの直下に、その章の結論を1〜2文で追加してください。
・読者がその章で何を得られるかを先に伝える（逆三角形構成）
・断定的で力強い表現を使う
・絵文字は使用しないこと

【出力形式】
（1）完成した記事全文（リード文・見出し・H2直下の結論すべてを反映したもの）
（2）末尾に【見出し添削レポート】を記載`;

// ===========================
// 固定プロンプト G（SEOメタデータ生成）
// ===========================
const PROMPT_G = `あなたはSEOとブログマーケティングに精通した専門家です。
以下のアニメレビュー記事（F）に対して、4つの項目を深く考察し、記事本文とは別に箇条書きで出力してください。

【考察項目①：記事タイトルを考えて】
・読者が思わずクリックしたくなるタイトルを3〜5パターン提案する
・キーワードを自然に含める
・数字・感情語・具体性を効果的に使う
・文字数は28〜40文字程度

【考察項目②：SEOタイトルを考えて】
・検索エンジン向けタイトルタグ用テキストを3〜5パターン提案する
・メインキーワードを先頭付近に入れる
・文字数は28〜35文字（Googleの推奨範囲）

【考察項目③：メタディスクリプションを考えて】
・検索結果に表示される説明文を3パターン提案する
・記事の価値と内容を120〜155文字で伝える
・クリックを促す行動喚起を含める
・絵文字は使用しない

【考察項目④：タグを考えて】
・この記事に最適なタグを10〜15個提案する
・アニメジャンル・キャラクター名・テーマ・視聴者属性・作品名を考慮する

【出力形式】
以下の構成で出力してください（記事本文は出力不要）：

## 記事タイトル案
* 案1
* 案2
...

## SEOタイトル案
* 案1
* 案2
...

## メタディスクリプション案
* 案1（○文字）
* 案2（○文字）
* 案3（○文字）

## タグ案
* タグ1
* タグ2
...`;

// ===========================
// 状態
// ===========================
const STORAGE_KEY = 'blog_gen_history_v2';
const outputs = { a: '', b: '', c: '', d: '', e: '', f: '', g: '' };

// ===========================
// 初期化
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initApiKey();
  renderHistory();
  activatePipe('a');
});

// ===========================
// API キー管理
// ===========================
function initApiKey() {
  const saved = localStorage.getItem('anthropic_api_key');
  if (saved) {
    document.getElementById('api-key-input').value = saved;
    setApiStatus('✓ APIキーが設定されています', 'success');
  }
}
function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  if (!key) { setApiStatus('APIキーを入力してください', 'error'); return; }
  if (!key.startsWith('sk-ant-')) { setApiStatus('形式が正しくありません（sk-ant-... で始まる必要があります）', 'error'); return; }
  localStorage.setItem('anthropic_api_key', key);
  setApiStatus('✓ 保存しました', 'success');
}
function clearApiKey() {
  localStorage.removeItem('anthropic_api_key');
  document.getElementById('api-key-input').value = '';
  setApiStatus('削除しました', 'info');
}
function toggleApiVis(btn) {
  const input = document.getElementById('api-key-input');
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '表示' : '隠す';
}
function setApiStatus(msg, type) {
  const el = document.getElementById('api-status');
  el.textContent = msg;
  el.className = `status-msg status-${type}`;
}

// ===========================
// セクション開閉
// ===========================
function toggleApiSection() {
  const body = document.getElementById('api-body');
  const icon = document.getElementById('api-toggle-icon');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'flex';
  icon.innerHTML = open ? '&#9654;' : '&#9660;';
}
function toggleHistory() {
  const body = document.getElementById('history-body');
  const icon = document.getElementById('history-toggle-icon');
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'flex';
  icon.innerHTML = open ? '&#9654;' : '&#9660;';
}

// ===========================
// パイプラインインジケーター
// ===========================
function activatePipe(step) {
  ['a','b','c','d','e'].forEach(s => {
    const el = document.getElementById(`pipe-${s}`);
    if (el) el.classList.toggle('pipe-step--active', s === step);
  });
}

// ===========================
// 文字数カウント
// ===========================
function updateCharCount() {
  const len = document.getElementById('transcription-input').value.length;
  document.getElementById('char-count').textContent = `${len.toLocaleString()} 文字`;
}

// ===========================
// Claude API 呼び出し（共通）
// ===========================
async function callClaude(systemPrompt, userMessage, outputElId, progressElId, progressTextElId, onDone) {
  const apiKey = localStorage.getItem('anthropic_api_key');
  if (!apiKey) { alert('APIキーを設定してください'); return; }

  const progressWrap = document.getElementById(progressElId);
  const outputEl     = document.getElementById(outputElId);

  progressWrap.style.display = 'flex';
  progressWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
  outputEl.textContent = '';

  let result = '';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try { const j = await res.json(); msg = j.error?.message || msg; } catch (_) {}
      throw new Error(msg);
    }

    // 出力セクションを先に表示
    const sectionId = outputElId.replace('output-', 'section-');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const evt = JSON.parse(data);
          if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
            result += evt.delta.text;
            outputEl.textContent = result;
          }
        } catch (_) {}
      }
    }

    progressWrap.style.display = 'none';
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (onDone) onDone(result);

  } catch (err) {
    progressWrap.style.display = 'none';
    const sectionId = outputElId.replace('output-', 'section-');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    outputEl.innerHTML = `<div class="error-msg">エラーが発生しました：${escHtml(err.message)}<br><br><ul style="margin-top:8px;padding-left:16px;font-size:0.85rem"><li>APIキーが正しいか確認してください</li><li>ネットワーク接続を確認してください</li></ul></div>`;
  }
}

// ===========================
// B 生成（エッセンス抽出）
// ===========================
function generateB() {
  const transcription = document.getElementById('transcription-input').value.trim();
  if (!transcription) { alert('文字起こしテキストを入力してください'); return; }

  outputs.a = transcription;
  const btn = document.getElementById('gen-b-btn');
  btn.disabled = true;
  btn.textContent = '生成中...';

  // プレビュー状態リセット
  resetPreview('output-b', 'preview-b', 'prev-btn-b');

  callClaude(
    PROMPT_B,
    `以下の文字起こしを処理してください。\n\n## 文字起こし（A）\n\n${transcription}`,
    'output-b',
    'progress-b',
    'progress-b-text',
    (result) => {
      outputs.b = result;
      activatePipe('b');
      btn.disabled = false;
      btn.textContent = 'B を生成する →';
    }
  );
}

// ===========================
// C 生成（アニメレビュー化）
// ===========================
function generateC() {
  if (!outputs.b) { alert('先に B を生成してください'); return; }

  const btn = document.getElementById('gen-c-btn');
  btn.disabled = true;
  btn.textContent = '生成中...';

  resetPreview('output-c', 'preview-c', 'prev-btn-c');

  const userMsg =
    `以下の素材（A：文字起こし、B：エッセンスまとめ）をもとに、指定のペルソナ・構成でアニメレビュー記事を書いてください。\n\n` +
    `## A：文字起こし\n\n${outputs.a}\n\n` +
    `## B：エッセンスまとめ\n\n${outputs.b}`;

  callClaude(
    PROMPT_C,
    userMsg,
    'output-c',
    'progress-c',
    'progress-c-text',
    (result) => {
      outputs.c = result;
      activatePipe('c');
      btn.disabled = false;
      btn.textContent = 'C としてリライトする →';
    }
  );
}

// ===========================
// E 生成（モバイル最適化・構成整理）
// ===========================
function generateE() {
  if (!outputs.d) { alert('先に D を生成してください'); return; }
  const btn = document.getElementById('gen-e-btn');
  btn.disabled = true;
  btn.textContent = '生成中...';
  resetPreview('output-e', 'preview-e', 'prev-btn-e');
  callClaude(
    PROMPT_E,
    `以下のアニメレビュー記事（D）を編集してください。\n\n## D：ファクトチェック済み記事\n\n${outputs.d}`,
    'output-e', 'progress-e', 'progress-e-text',
    (result) => {
      outputs.e = result;
      activatePipe('e');
      btn.disabled = false;
      btn.textContent = 'E としてモバイル最適化する →';
    }
  );
}

// ===========================
// F 生成（リード文・見出し・H2直下の結論）
// ===========================
function generateF() {
  if (!outputs.e) { alert('先に E を生成してください'); return; }
  const btn = document.getElementById('gen-f-btn');
  btn.disabled = true;
  btn.textContent = '生成中...';
  resetPreview('output-f', 'preview-f', 'prev-btn-f');
  callClaude(
    PROMPT_F,
    `以下のアニメレビュー記事（E）を最終仕上げしてください。\n\n## E：モバイル最適化済み記事\n\n${outputs.e}`,
    'output-f', 'progress-f', 'progress-f-text',
    (result) => {
      outputs.f = result;
      activatePipe('f');
      btn.disabled = false;
      btn.textContent = 'F として最終仕上げする →';
    }
  );
}

// ===========================
// G 生成（SEO メタデータ）
// ===========================
function generateG() {
  if (!outputs.f) { alert('先に F を生成してください'); return; }
  const btn = document.getElementById('gen-g-btn');
  btn.disabled = true;
  btn.textContent = '分析中...';
  resetPreview('output-g', 'preview-g', 'prev-btn-g');
  callClaude(
    PROMPT_G,
    `以下のアニメレビュー記事（F）に対して、SEOメタデータを生成してください。\n\n## F：最終完成稿\n\n${outputs.f}`,
    'output-g', 'progress-g', 'progress-g-text',
    (result) => {
      outputs.g = result;
      activatePipe('g');
      btn.disabled = false;
      btn.textContent = 'G として SEO メタデータを生成する →';
    }
  );
}

// ===========================
// D 生成（ファクトチェック）
// ===========================
function generateD() {
  if (!outputs.c) { alert('先に C を生成してください'); return; }

  const btn = document.getElementById('gen-d-btn');
  btn.disabled = true;
  btn.textContent = 'チェック中...';

  resetPreview('output-d', 'preview-d', 'prev-btn-d');

  callClaude(
    PROMPT_D,
    `以下のアニメレビュー記事（C）をファクトチェックしてください。\n\n## C：アニメレビュー草稿\n\n${outputs.c}`,
    'output-d',
    'progress-d',
    'progress-d-text',
    (result) => {
      outputs.d = result;
      activatePipe('d');
      btn.disabled = false;
      btn.textContent = 'D としてファクトチェックする →';
    }
  );
}

// ===========================
// 出力操作
// ===========================
function copyText(elId) {
  const text = document.getElementById(elId).textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showCopyDone(elId);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showCopyDone(elId);
  });
}

function showCopyDone(elId) {
  // コピーボタンを一時的に変更
  const card = document.getElementById(elId).closest('.card');
  if (!card) return;
  const btns = card.querySelectorAll('.btn--sm');
  const copyBtn = Array.from(btns).find(b => b.textContent === 'コピー');
  if (copyBtn) {
    const prev = copyBtn.textContent;
    copyBtn.textContent = '✓ コピー完了';
    setTimeout(() => { copyBtn.textContent = prev; }, 2000);
  }
}

function downloadText(elId, prefix) {
  const text = document.getElementById(elId).textContent;
  if (!text) return;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${prefix}-${dateTag()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const previewState = {};

function togglePreview(rawId, previewId, btnId) {
  const rawEl  = document.getElementById(rawId);
  const preEl  = document.getElementById(previewId);
  const btn    = document.getElementById(btnId);
  const isNowPreview = !previewState[rawId];
  previewState[rawId] = isNowPreview;

  if (isNowPreview) {
    rawEl.style.display  = 'none';
    preEl.style.display  = 'block';
    btn.textContent      = 'ソース表示';
    preEl.innerHTML      = mdToHtml(rawEl.textContent);
  } else {
    rawEl.style.display  = 'block';
    preEl.style.display  = 'none';
    btn.textContent      = 'プレビュー';
  }
}

function resetPreview(rawId, previewId, btnId) {
  previewState[rawId] = false;
  const rawEl = document.getElementById(rawId);
  const preEl = document.getElementById(previewId);
  const btn   = document.getElementById(btnId);
  if (rawEl) rawEl.style.display = 'block';
  if (preEl) preEl.style.display = 'none';
  if (btn)   btn.textContent = 'プレビュー';
}

// ===========================
// 保存（A〜G を全てセットで保存）
// ===========================
function saveCurrentRecord() {
  if (!outputs.a) { alert('少なくとも A（文字起こし）を入力してください'); return; }
  const list = loadHistory();

  // タイトル：G→F→D の順で見出しを探す
  const titleSource = outputs.g || outputs.f || outputs.d || outputs.a;
  const titleLine = titleSource.split('\n').find(l => /^##? /.test(l));
  const title = titleLine
    ? titleLine.replace(/^#+\s*/, '').trim().slice(0, 60)
    : outputs.a.slice(0, 50).replace(/\n/g, ' ');

  list.unshift({
    id:   Date.now(),
    date: nowLabel(),
    title,
    a: outputs.a,
    b: outputs.b,
    c: outputs.c,
    d: outputs.d,
    e: outputs.e,
    f: outputs.f,
    g: outputs.g
  });

  if (list.length > 50) list.length = 50;
  saveHistory(list);
  renderHistory();

  document.querySelectorAll('[onclick="saveCurrentRecord()"]').forEach(btn => {
    const prev = btn.textContent;
    btn.textContent = '✓ 保存完了';
    setTimeout(() => { btn.textContent = prev; }, 2000);
  });
}

// ===========================
// 履歴
// ===========================
function loadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch (_) { return []; }
}
function saveHistory(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function renderHistory() {
  const list     = loadHistory();
  const wrap     = document.getElementById('history-list');
  const countEl  = document.getElementById('history-count');
  const clearBtn = document.getElementById('clear-history-btn');

  countEl.textContent    = list.length > 0 ? list.length : '';
  clearBtn.style.display = list.length > 0 ? 'inline-flex' : 'none';

  if (list.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">まだ保存された履歴はありません。</p>';
    return;
  }

  wrap.innerHTML = '';
  list.forEach(rec => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="history-item-header" onclick="toggleHistoryItem(${rec.id})">
        <div class="history-meta">
          <span class="history-date">${rec.date}</span>
          <span class="history-title">${escHtml(rec.title)}</span>
        </div>
        <div class="history-actions" onclick="event.stopPropagation()">
          <button class="btn btn--sm" onclick="restoreRecord(${rec.id})">読み込む</button>
          <button class="btn btn--sm" onclick="downloadRecord(${rec.id})">DL</button>
          <button class="btn btn--sm btn--ghost btn--danger" onclick="deleteRecord(${rec.id})">削除</button>
        </div>
      </div>
      <div class="history-item-body" id="history-body-${rec.id}">
        <div class="history-tabs">
          <button class="history-tab active" onclick="switchTab(${rec.id},'a')">A｜文字起こし</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'b')">B｜エッセンス</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'c')">C｜レビュー草稿</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'d')">D｜FT済み</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'e')">E｜モバイル最適化</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'f')">F｜最終仕上げ</button>
          <button class="history-tab"        onclick="switchTab(${rec.id},'g')">G｜SEO</button>
        </div>
        <pre class="history-content" id="hc-a-${rec.id}">${escHtml(rec.a || '')}</pre>
        <pre class="history-content" id="hc-b-${rec.id}" style="display:none">${escHtml(rec.b || '')}</pre>
        <pre class="history-content" id="hc-c-${rec.id}" style="display:none">${escHtml(rec.c || '')}</pre>
        <pre class="history-content" id="hc-d-${rec.id}" style="display:none">${escHtml(rec.d || '')}</pre>
        <pre class="history-content" id="hc-e-${rec.id}" style="display:none">${escHtml(rec.e || '')}</pre>
        <pre class="history-content" id="hc-f-${rec.id}" style="display:none">${escHtml(rec.f || '')}</pre>
        <pre class="history-content" id="hc-g-${rec.id}" style="display:none">${escHtml(rec.g || '')}</pre>
      </div>`;
    wrap.appendChild(item);
  });
}

function toggleHistoryItem(id) {
  document.getElementById(`history-body-${id}`).classList.toggle('is-open');
}

function switchTab(id, tab) {
  ['a','b','c','d','e','f','g'].forEach(t => {
    const el = document.getElementById(`hc-${t}-${id}`);
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  const tabs = document.querySelectorAll(`#history-body-${id} .history-tab`);
  const tabOrder = ['a','b','c','d','e','f','g'];
  tabs.forEach((btn, i) => btn.classList.toggle('active', tabOrder[i] === tab));
}

function restoreRecord(id) {
  const rec = loadHistory().find(r => r.id === id);
  if (!rec) return;

  // A を入力欄に復元
  document.getElementById('transcription-input').value = rec.a || '';
  updateCharCount();

  // 各出力を復元
  outputs.a = rec.a || '';
  outputs.b = rec.b || '';
  outputs.c = rec.c || '';
  outputs.d = rec.d || '';

  const pairs = [
    ['output-b', 'section-b', 'preview-b', 'prev-btn-b', rec.b],
    ['output-c', 'section-c', 'preview-c', 'prev-btn-c', rec.c],
    ['output-d', 'section-d', 'preview-d', 'prev-btn-d', rec.d],
    ['output-e', 'section-e', 'preview-e', 'prev-btn-e', rec.e],
    ['output-f', 'section-f', 'preview-f', 'prev-btn-f', rec.f],
    ['output-g', 'section-g', 'preview-g', 'prev-btn-g', rec.g],
  ];
  pairs.forEach(([rawId, sectionId, prevId, btnId, val]) => {
    if (val) {
      document.getElementById(rawId).textContent = val;
      document.getElementById(sectionId).style.display = 'block';
      resetPreview(rawId, prevId, btnId);
    }
  });

  const lastStep = rec.g ? 'g' : rec.f ? 'f' : rec.e ? 'e' : rec.d ? 'd' : rec.c ? 'c' : rec.b ? 'b' : 'a';
  activatePipe(lastStep);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadRecord(id) {
  const rec = loadHistory().find(r => r.id === id);
  if (!rec) return;
  const content =
    `# A｜文字起こし\n\n${rec.a || ''}\n\n====\n\n` +
    `# B｜エッセンスまとめ\n\n${rec.b || ''}\n\n====\n\n` +
    `# C｜アニメレビュー草稿\n\n${rec.c || ''}\n\n====\n\n` +
    `# D｜ファクトチェック済み\n\n${rec.d || ''}\n\n====\n\n` +
    `# E｜モバイル最適化済み\n\n${rec.e || ''}\n\n====\n\n` +
    `# F｜最終完成稿\n\n${rec.f || ''}\n\n====\n\n` +
    `# G｜SEOメタデータ\n\n${rec.g || ''}`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `record-${rec.id}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function deleteRecord(id) {
  if (!confirm('この履歴を削除しますか？')) return;
  saveHistory(loadHistory().filter(r => r.id !== id));
  renderHistory();
}

function clearAllHistory() {
  if (!confirm('全ての履歴を削除しますか？この操作は元に戻せません。')) return;
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
}

// ===========================
// 簡易 Markdown → HTML
// ===========================
function mdToHtml(md) {
  const lines = md.split('\n');
  const out   = [];
  let inUl = false, inOl = false, inBq = false;

  for (const line of lines) {
    if (/^> /.test(line)) {
      if (!inBq) { out.push('<blockquote>'); inBq = true; }
      out.push('<p>' + inlineMd(line.slice(2)) + '</p>');
      continue;
    } else if (inBq) { out.push('</blockquote>'); inBq = false; }

    if (/^---+$/.test(line.trim())) { close(); out.push('<hr>'); continue; }
    if (/^### /.test(line)) { close(); out.push(`<h3>${inlineMd(line.slice(4))}</h3>`); continue; }
    if (/^## /.test(line))  { close(); out.push(`<h2>${inlineMd(line.slice(3))}</h2>`); continue; }
    if (/^# /.test(line))   { close(); out.push(`<h1>${inlineMd(line.slice(2))}</h1>`); continue; }

    if (/^\| /.test(line)) {
      if (!/^[\|\s\-:]+$/.test(line)) {
        out.push('<tr>' + line.split('|').filter(c => c.trim()).map(c => `<td>${inlineMd(c.trim())}</td>`).join('') + '</tr>');
      }
      continue;
    }

    if (/^[*\-] /.test(line)) {
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inlineMd(line.slice(2))}</li>`);
      continue;
    } else if (inUl) { out.push('</ul>'); inUl = false; }

    if (/^\d+\. /.test(line)) {
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${inlineMd(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    } else if (inOl) { out.push('</ol>'); inOl = false; }

    if (line.trim() === '') { out.push('<br>'); continue; }
    out.push(`<p>${inlineMd(line)}</p>`);
  }

  if (inUl) out.push('</ul>');
  if (inOl) out.push('</ol>');
  if (inBq) out.push('</blockquote>');
  return out.join('\n');

  function close() {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
    if (inBq) { out.push('</blockquote>'); inBq = false; }
  }
}

function inlineMd(t) {
  t = escHtml(t);
  t = t.replace(/`([^`]+)`/g,      '<code>$1</code>');
  t = t.replace(/\*\*(.+?)\*\*/g,  '<strong>$1</strong>');
  t = t.replace(/__(.+?)__/g,       '<strong>$1</strong>');
  t = t.replace(/\*(.+?)\*/g,      '<em>$1</em>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return t;
}

// ===========================
// ユーティリティ
// ===========================
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function nowLabel() {
  const d = new Date(), p = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}/${p(d.getMonth()+1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function dateTag() {
  const d = new Date(), p = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}
