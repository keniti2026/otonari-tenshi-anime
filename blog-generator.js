/* blog-generator.js */

// デフォルトの作業工程
const DEFAULT_STEPS = [
  '文字起こし全体を読み込み、主要なテーマ・キーポイント・重要な発言を把握する',
  '読者の興味を引く、SEO を意識したキャッチーな記事タイトル（H1）を作成する',
  '記事の価値と概要を伝える導入文（リード文）を書く（200〜300字程度）',
  '本文を3〜5つの章に分けて論理的に構成し、各章に H2 見出しを付ける',
  '各章の内容を詳しく、具体例を交えながら読みやすく記述する',
  '全体のまとめと読者への行動喚起（CTA）を含む締めくくりを書く',
  'SEO メタディスクリプション（120〜160文字）と関連キーワード5個を生成する'
];

let steps = [...DEFAULT_STEPS];
let generatedContent = '';
let isPreviewMode = false;

// ===========================
// 初期化
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initApiKey();
  renderSteps();
  updateCharCount();
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
  if (!key) {
    setApiStatus('APIキーを入力してください', 'error');
    return;
  }
  if (!key.startsWith('sk-ant-')) {
    setApiStatus('APIキーの形式が正しくありません（sk-ant-... で始まる必要があります）', 'error');
    return;
  }
  localStorage.setItem('anthropic_api_key', key);
  setApiStatus('✓ APIキーを保存しました', 'success');
}

function clearApiKey() {
  localStorage.removeItem('anthropic_api_key');
  document.getElementById('api-key-input').value = '';
  setApiStatus('APIキーを削除しました', 'info');
}

function toggleApiVis(btn) {
  const input = document.getElementById('api-key-input');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '隠す';
  } else {
    input.type = 'password';
    btn.textContent = '表示';
  }
}

function setApiStatus(msg, type) {
  const el = document.getElementById('api-status');
  el.textContent = msg;
  el.className = `status-msg status-${type}`;
}

// ===========================
// カード開閉
// ===========================
function toggleCard(id) {
  const body = document.getElementById(`${id}-body`);
  const icon = document.getElementById(`${id}-icon`);
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'flex';
  if (icon) icon.innerHTML = isOpen ? '&#9654;' : '&#9660;';
}

// ===========================
// 作業工程管理
// ===========================
function renderSteps() {
  const list = document.getElementById('steps-list');
  list.innerHTML = '';
  steps.forEach((step, i) => {
    const item = document.createElement('div');
    item.className = 'step-item';
    item.innerHTML = `
      <span class="badge-step">${i + 1}</span>
      <input
        type="text"
        class="step-text-input"
        value="${escHtml(step)}"
        oninput="steps[${i}] = this.value"
        placeholder="ステップを入力..."
      />
      <div class="step-controls">
        <button class="step-btn" onclick="moveStep(${i}, -1)" ${i === 0 ? 'disabled' : ''} title="上へ">&#8593;</button>
        <button class="step-btn" onclick="moveStep(${i}, 1)" ${i === steps.length - 1 ? 'disabled' : ''} title="下へ">&#8595;</button>
        <button class="step-btn step-btn--delete" onclick="removeStep(${i})" title="削除">&#10005;</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function addStep() {
  steps.push('新しいステップを入力してください');
  renderSteps();
  const inputs = document.querySelectorAll('.step-text-input');
  const last = inputs[inputs.length - 1];
  if (last) { last.focus(); last.select(); }
}

function removeStep(i) {
  if (steps.length <= 1) { alert('少なくとも1つのステップが必要です'); return; }
  steps.splice(i, 1);
  renderSteps();
}

function moveStep(i, dir) {
  const ni = i + dir;
  if (ni < 0 || ni >= steps.length) return;
  [steps[i], steps[ni]] = [steps[ni], steps[i]];
  renderSteps();
}

function resetSteps() {
  if (confirm('作業工程をデフォルトに戻しますか？')) {
    steps = [...DEFAULT_STEPS];
    renderSteps();
  }
}

// ===========================
// 文字数カウント
// ===========================
function updateCharCount() {
  const len = document.getElementById('transcription-input').value.length;
  document.getElementById('char-count').textContent = `${len.toLocaleString()} 文字`;
}

// ===========================
// システムプロンプト構築
// ===========================
function buildSystemPrompt() {
  const tone = document.getElementById('blog-tone').value;
  const length = document.getElementById('blog-length').value;
  const format = document.getElementById('blog-format').value;
  const target = document.getElementById('blog-target').value.trim();
  const keywords = document.getElementById('blog-keywords').value.trim();

  const toneMap = {
    professional: 'プロフェッショナル・丁寧な文体',
    friendly:     'フレンドリーで親しみやすい文体',
    casual:       'カジュアルで話し言葉に近い文体',
    formal:       'フォーマルで硬めの文体'
  };
  const lengthMap = {
    short:    '500〜800字程度',
    medium:   '1,000〜1,500字程度',
    long:     '2,000〜3,000字程度',
    detailed: '3,000字以上'
  };
  const formatMap = {
    markdown: 'Markdown 形式（見出しは # 記号、太字は **、リストは - を使用）',
    html:     'HTML 形式（適切な HTML タグを使用）',
    plain:    'プレーンテキスト形式（記号なし）'
  };

  const stepsText = steps.map((s, i) => `${i + 1}. ${s}`).join('\n');

  return `あなたはプロのブログライターです。提供された文字起こしテキストを元に、以下の作業工程に従って高品質なブログ記事を作成してください。

## 作業工程
${stepsText}

## ブログ設定
- 文体・トーン: ${toneMap[tone] || tone}
- 記事の長さ: ${lengthMap[length] || length}
- 対象読者: ${target || '一般読者'}
- 出力フォーマット: ${formatMap[format] || format}
${keywords ? `- SEO キーワード（積極的に含める）: ${keywords}` : ''}

## 重要な注意事項
- 文字起こしの内容を忠実に反映してください
- 指定された文体・トーンを一貫して維持してください
- ${formatMap[format] || format}で出力してください
- 記事の長さは${lengthMap[length] || length}を目安にしてください
- 読者にとって価値のある、読みやすい記事を作成してください
- 作業工程の各ステップを順番に実行した結果として、最終的な記事本文のみを出力してください（工程の解説や「ステップ1:」のような見出しは不要です）`;
}

// ===========================
// ブログ記事生成
// ===========================
async function generateBlog() {
  const apiKey = localStorage.getItem('anthropic_api_key');
  if (!apiKey) {
    alert('APIキーを設定してください（「Claude API キー設定」セクションで設定してください）');
    return;
  }

  const transcription = document.getElementById('transcription-input').value.trim();
  if (!transcription) {
    alert('文字起こしテキストを入力してください');
    return;
  }

  if (steps.every(s => !s.trim())) {
    alert('作業工程を1つ以上設定してください');
    return;
  }

  const model = document.getElementById('model-select').value;
  const generateBtn = document.getElementById('generate-btn');
  const progressWrap = document.getElementById('progress-wrap');
  const outputSection = document.getElementById('output-section');

  // UI 更新
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<span class="btn-icon">&#8987;</span> 生成中...';
  progressWrap.style.display = 'block';
  outputSection.style.display = 'none';
  generatedContent = '';
  isPreviewMode = false;
  document.getElementById('preview-btn').textContent = 'プレビュー';

  progressWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const userMessage = `以下の文字起こしをもとに、指定された作業工程に従ってブログ記事を作成してください。\n\n## 文字起こし\n\n${transcription}`;

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
        model,
        max_tokens: 4096,
        stream: true,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) {
      let errMsg = `HTTP エラー: ${response.status}`;
      try {
        const errJson = await response.json();
        errMsg = errJson.error?.message || errMsg;
      } catch (_) {}
      throw new Error(errMsg);
    }

    // 出力セクションを先に表示（ストリーミング表示のため）
    outputSection.style.display = 'block';
    document.getElementById('output-raw').textContent = '';
    document.getElementById('output-preview').innerHTML = '';

    const reader = response.body.getReader();
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
            generatedContent += evt.delta.text;
            refreshOutputRaw();
          }
        } catch (_) {}
      }
    }

    // 最終更新
    refreshOutputRaw();
    document.getElementById('progress-text').textContent = '✓ 生成が完了しました！';
    setTimeout(() => { progressWrap.style.display = 'none'; }, 1800);
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  } catch (err) {
    progressWrap.style.display = 'none';
    outputSection.style.display = 'block';
    document.getElementById('output-raw').innerHTML =
      `<div class="error-msg">エラーが発生しました：${escHtml(err.message)}<br><br>` +
      `よくある原因：<ul style="margin-top:8px;padding-left:16px;font-size:0.85rem">` +
      `<li>API キーが正しくない、または期限切れ</li>` +
      `<li>API の利用上限に達している</li>` +
      `<li>ネットワーク接続の問題</li>` +
      `</ul></div>`;
    isPreviewMode = false;
  } finally {
    generateBtn.disabled = false;
    generateBtn.innerHTML = '<span class="btn-icon">&#10024;</span> ブログ記事を生成する';
  }
}

// ===========================
// 出力表示更新
// ===========================
function refreshOutputRaw() {
  document.getElementById('output-raw').textContent = generatedContent;
}

// ===========================
// コピー
// ===========================
function copyOutput() {
  if (!generatedContent) return;
  navigator.clipboard.writeText(generatedContent).then(() => {
    const btn = document.getElementById('copy-btn');
    const prev = btn.textContent;
    btn.textContent = '✓ コピー完了';
    setTimeout(() => { btn.textContent = prev; }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = generatedContent;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

// ===========================
// ダウンロード
// ===========================
function downloadOutput() {
  if (!generatedContent) return;
  const fmt = document.getElementById('blog-format').value;
  const ext = { markdown: 'md', html: 'html', plain: 'txt' }[fmt] || 'txt';
  const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `blog-article.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===========================
// プレビュー切替
// ===========================
function togglePreview() {
  isPreviewMode = !isPreviewMode;
  const rawEl  = document.getElementById('output-raw');
  const preEl  = document.getElementById('output-preview');
  const btn    = document.getElementById('preview-btn');

  if (isPreviewMode) {
    rawEl.style.display = 'none';
    preEl.style.display = 'block';
    btn.textContent = 'ソース表示';
    const fmt = document.getElementById('blog-format').value;
    if (fmt === 'markdown') {
      preEl.innerHTML = mdToHtml(generatedContent);
    } else if (fmt === 'html') {
      preEl.innerHTML = generatedContent;
    } else {
      preEl.textContent = generatedContent;
    }
  } else {
    rawEl.style.display = 'block';
    preEl.style.display = 'none';
    btn.textContent = 'プレビュー';
  }
}

// ===========================
// 簡易 Markdown → HTML 変換
// ===========================
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;

  for (let raw of lines) {
    let line = raw;

    // ブロック引用
    if (/^> /.test(line)) {
      if (!inBlockquote) { out.push('<blockquote>'); inBlockquote = true; }
      out.push('<p>' + inlineMarkdown(line.slice(2)) + '</p>');
      continue;
    } else if (inBlockquote) {
      out.push('</blockquote>'); inBlockquote = false;
    }

    // 見出し
    if (/^### /.test(line)) { closeLists(); out.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`); continue; }
    if (/^## /.test(line))  { closeLists(); out.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`); continue; }
    if (/^# /.test(line))   { closeLists(); out.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`); continue; }

    // 水平線
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      closeLists(); out.push('<hr>'); continue;
    }

    // 順序なしリスト
    if (/^[*\-] /.test(line)) {
      if (!inUl) { out.push('<ul>'); inUl = true; }
      out.push(`<li>${inlineMarkdown(line.slice(2))}</li>`); continue;
    } else if (inUl) { out.push('</ul>'); inUl = false; }

    // 順序付きリスト
    if (/^\d+\. /.test(line)) {
      if (!inOl) { out.push('<ol>'); inOl = true; }
      out.push(`<li>${inlineMarkdown(line.replace(/^\d+\. /, ''))}</li>`); continue;
    } else if (inOl) { out.push('</ol>'); inOl = false; }

    // 空行
    if (line.trim() === '') {
      out.push('<br>'); continue;
    }

    // 段落
    out.push(`<p>${inlineMarkdown(line)}</p>`);
  }

  if (inUl) out.push('</ul>');
  if (inOl) out.push('</ol>');
  if (inBlockquote) out.push('</blockquote>');

  return out.join('\n');

  function closeLists() {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
    if (inBlockquote) { out.push('</blockquote>'); inBlockquote = false; }
  }
}

function inlineMarkdown(text) {
  let t = escHtml(text);
  // コードブロック（先にエスケープ済みなのでそのまま適用）
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  // 太字・斜体（**bold**, *italic*, __bold__, _italic_）
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/__(.+?)__/g, '<strong>$1</strong>');
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  t = t.replace(/_(.+?)_/g, '<em>$1</em>');
  // リンク
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
