/* blog-generator.js */

// ===========================
// 固定システムプロンプト
// ===========================
const SYSTEM_PROMPT = `役割の定義（Role）
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
以下の構成で必ず出力してください：

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
// 状態
// ===========================
const STORAGE_KEY = 'blog_generator_history';
let currentOutput = '';   // B（現在のアウトプット）
let isPreviewMode = false;

// ===========================
// 初期化
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initApiKey();
  renderHistory();
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
  if (!key.startsWith('sk-ant-')) {
    setApiStatus('形式が正しくありません（sk-ant-... で始まる必要があります）', 'error'); return;
  }
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
// 文字数カウント
// ===========================
function updateCharCount() {
  const len = document.getElementById('transcription-input').value.length;
  document.getElementById('char-count').textContent = `${len.toLocaleString()} 文字`;
}

// ===========================
// 生成メイン処理
// ===========================
async function generateBlog() {
  const apiKey = localStorage.getItem('anthropic_api_key');
  if (!apiKey) {
    alert('APIキーを設定してください（上部の「Claude API キー設定」から設定できます）');
    return;
  }

  // A：文字起こし
  const transcription = document.getElementById('transcription-input').value.trim();
  if (!transcription) {
    alert('文字起こしテキストを入力してください');
    return;
  }

  const generateBtn   = document.getElementById('generate-btn');
  const progressWrap  = document.getElementById('progress-wrap');
  const outputSection = document.getElementById('output-section');

  // UI 初期化
  generateBtn.disabled = true;
  generateBtn.textContent = '生成中...';
  progressWrap.style.display  = 'flex';
  outputSection.style.display = 'none';
  currentOutput   = '';
  isPreviewMode   = false;
  document.getElementById('preview-btn').textContent = 'プレビュー';

  progressWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
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
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `以下の文字起こしを処理してください。\n\n## 文字起こし（A）\n\n${transcription}`
        }]
      })
    });

    if (!response.ok) {
      let msg = `HTTP ${response.status}`;
      try { const j = await response.json(); msg = j.error?.message || msg; } catch (_) {}
      throw new Error(msg);
    }

    // 出力エリア表示（ストリーミング用）
    outputSection.style.display = 'block';
    document.getElementById('output-raw').textContent = '';

    // ストリーミング読み取り
    const reader  = response.body.getReader();
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
            currentOutput += evt.delta.text;
            document.getElementById('output-raw').textContent = currentOutput;
          }
        } catch (_) {}
      }
    }

    // 完了 → A と B を保存
    saveRecord(transcription, currentOutput);

    progressWrap.style.display = 'none';
    document.getElementById('progress-text').textContent = 'Claude が下書きを作成しています...';
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    progressWrap.style.display = 'none';
    outputSection.style.display = 'block';
    document.getElementById('output-raw').innerHTML =
      `<div class="error-msg">エラーが発生しました：${escHtml(err.message)}<br><br>` +
      `<ul style="margin-top:8px;padding-left:16px;font-size:0.85rem">` +
      `<li>API キーが正しいか確認してください</li>` +
      `<li>ネットワーク接続を確認してください</li>` +
      `<li>Anthropic の利用上限に達していないか確認してください</li>` +
      `</ul></div>`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = '✨ 下書きを生成する';
  }
}

// ===========================
// 出力操作
// ===========================
function copyOutput() {
  if (!currentOutput) return;
  navigator.clipboard.writeText(currentOutput).then(() => {
    const btn = document.getElementById('copy-btn');
    const prev = btn.textContent;
    btn.textContent = '✓ コピー完了';
    setTimeout(() => { btn.textContent = prev; }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = currentOutput;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

function downloadOutput() {
  if (!currentOutput) return;
  const blob = new Blob([currentOutput], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `blog-draft-${dateTag()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function togglePreview() {
  isPreviewMode = !isPreviewMode;
  const rawEl  = document.getElementById('output-raw');
  const preEl  = document.getElementById('output-preview');
  const btn    = document.getElementById('preview-btn');

  if (isPreviewMode) {
    rawEl.style.display = 'none';
    preEl.style.display = 'block';
    btn.textContent     = 'ソース表示';
    preEl.innerHTML     = mdToHtml(currentOutput);
  } else {
    rawEl.style.display = 'block';
    preEl.style.display = 'none';
    btn.textContent     = 'プレビュー';
  }
}

// ===========================
// 保存履歴（A + B をセットで保存）
// ===========================
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (_) { return []; }
}

function saveHistory(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function saveRecord(transcription, output) {
  const list = loadHistory();

  // タイトルを B の1行目から自動抽出
  const titleLine = output.split('\n').find(l => l.includes('🎙️') || l.startsWith('###'));
  const title = titleLine
    ? titleLine.replace(/^#+\s*/, '').replace(/🎙️\s*/, '').replace(/文字起こし.*?：/, '').trim().slice(0, 60)
    : '（タイトル未取得）';

  list.unshift({
    id:            Date.now(),
    date:          nowLabel(),
    title,
    transcription, // A
    output         // B
  });

  // 最大50件まで保持
  if (list.length > 50) list.length = 50;
  saveHistory(list);
  renderHistory();
}

function renderHistory() {
  const list  = loadHistory();
  const wrap  = document.getElementById('history-list');
  const countEl = document.getElementById('history-count');
  const clearBtn = document.getElementById('clear-history-btn');

  countEl.textContent = list.length > 0 ? list.length : '';
  clearBtn.style.display = list.length > 0 ? 'inline-flex' : 'none';

  if (list.length === 0) {
    wrap.innerHTML = '<p class="empty-msg">まだ保存された履歴はありません。</p>';
    return;
  }

  wrap.innerHTML = '';
  list.forEach(record => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.id = `history-item-${record.id}`;
    item.innerHTML = `
      <div class="history-item-header" onclick="toggleHistoryItem(${record.id})">
        <div class="history-meta">
          <span class="history-date">${record.date}</span>
          <span class="history-title">${escHtml(record.title)}</span>
        </div>
        <div class="history-actions" onclick="event.stopPropagation()">
          <button class="btn btn--sm" onclick="restoreRecord(${record.id})">読み込む</button>
          <button class="btn btn--sm" onclick="downloadRecord(${record.id})">DL</button>
          <button class="btn btn--sm btn--ghost btn--danger" onclick="deleteRecord(${record.id})">削除</button>
        </div>
      </div>
      <div class="history-item-body" id="history-body-${record.id}">
        <div class="history-tabs">
          <button class="history-tab active" id="tab-a-${record.id}"
            onclick="switchTab(${record.id},'a')">A｜文字起こし</button>
          <button class="history-tab" id="tab-b-${record.id}"
            onclick="switchTab(${record.id},'b')">B｜アウトプット</button>
        </div>
        <pre class="history-content" id="content-a-${record.id}">${escHtml(record.transcription)}</pre>
        <pre class="history-content" id="content-b-${record.id}" style="display:none">${escHtml(record.output)}</pre>
      </div>
    `;
    wrap.appendChild(item);
  });
}

function toggleHistoryItem(id) {
  const body = document.getElementById(`history-body-${id}`);
  body.classList.toggle('is-open');
}

function switchTab(id, tab) {
  const aContent = document.getElementById(`content-a-${id}`);
  const bContent = document.getElementById(`content-b-${id}`);
  const aTab     = document.getElementById(`tab-a-${id}`);
  const bTab     = document.getElementById(`tab-b-${id}`);
  if (tab === 'a') {
    aContent.style.display = 'block';
    bContent.style.display = 'none';
    aTab.classList.add('active');
    bTab.classList.remove('active');
  } else {
    aContent.style.display = 'none';
    bContent.style.display = 'block';
    aTab.classList.remove('active');
    bTab.classList.add('active');
  }
}

function restoreRecord(id) {
  const list   = loadHistory();
  const record = list.find(r => r.id === id);
  if (!record) return;

  // A を入力エリアに復元
  document.getElementById('transcription-input').value = record.transcription;
  updateCharCount();

  // B を出力エリアに表示
  currentOutput = record.output;
  document.getElementById('output-raw').textContent = currentOutput;
  document.getElementById('output-section').style.display = 'block';
  isPreviewMode = false;
  document.getElementById('preview-btn').textContent = 'プレビュー';
  document.getElementById('output-raw').style.display  = 'block';
  document.getElementById('output-preview').style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadRecord(id) {
  const list   = loadHistory();
  const record = list.find(r => r.id === id);
  if (!record) return;

  // A と B を1ファイルにまとめてダウンロード
  const content = `# A｜文字起こし\n\n${record.transcription}\n\n---\n\n# B｜アウトプット\n\n${record.output}`;
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `blog-record-${record.id}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function deleteRecord(id) {
  if (!confirm('この履歴を削除しますか？')) return;
  const list = loadHistory().filter(r => r.id !== id);
  saveHistory(list);
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

  for (const raw of lines) {
    const line = raw;

    if (/^> /.test(line)) {
      if (!inBq) { out.push('<blockquote>'); inBq = true; }
      out.push('<p>' + inlineMd(line.slice(2)) + '</p>');
      continue;
    } else if (inBq) { out.push('</blockquote>'); inBq = false; }

    if (/^---+$/.test(line.trim())) { closeLists(); out.push('<hr>'); continue; }
    if (/^### /.test(line)) { closeLists(); out.push(`<h3>${inlineMd(line.slice(4))}</h3>`); continue; }
    if (/^## /.test(line))  { closeLists(); out.push(`<h2>${inlineMd(line.slice(3))}</h2>`); continue; }
    if (/^# /.test(line))   { closeLists(); out.push(`<h1>${inlineMd(line.slice(2))}</h1>`); continue; }

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

  function closeLists() {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
    if (inBq) { out.push('</blockquote>'); inBq = false; }
  }
}

function inlineMd(t) {
  t = escHtml(t);
  t = t.replace(/`([^`]+)`/g,  '<code>$1</code>');
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/__(.+?)__/g,     '<strong>$1</strong>');
  t = t.replace(/\*(.+?)\*/g,  '<em>$1</em>');
  t = t.replace(/_(.+?)_/g,    '<em>$1</em>');
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
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function dateTag() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}
