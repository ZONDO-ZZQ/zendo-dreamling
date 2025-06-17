document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dl-toggle');
  const panel = document.getElementById('dreamling-panel');
  const chat = document.getElementById('dl-chat');
  const input = document.getElementById('dl-input');

  // 切换显示/隐藏
  toggle.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' || panel.style.display === '' ? 'flex' : 'none';
  });

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const msg = input.value.trim();
      chat.innerHTML += `<div><b>你：</b>${msg}</div>`;
      input.value = '';
      setTimeout(async () => {
        const reply = await fetchGPTResponse(msg);
        chat.innerHTML += `<div><b>梦灵：</b>${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
      }, 300);
    }
  });

  // dreamling 自动弹话机制
  setInterval(() => {
    const shouldRemind = Math.random() < 0.1;
    if (shouldRemind) {
      chat.innerHTML += `<div><b>梦灵：</b>你今天还有没完成的事情哦～</div>`;
      chat.scrollTop = chat.scrollHeight;
    }
  }, 30000);

  // GPT 请求函数
  async function fetchGPTResponse(userMessage) {
    const apiKey = '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';  // 直接在这里写你的 API 密钥
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',  // 使用 GPT-4 模型
        prompt: userMessage,
        max_tokens: 150
      })
    });

    const data = await response.json();
    return data.choices[0].text.trim();  // 返回 GPT 的回复
  }
});
