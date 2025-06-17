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
        const reply = await fetchGPTResponse(msg);  // 向后端请求GPT回应
        chat.innerHTML += `<div><b>梦灵：</b>${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
      }, 300);
    }
  });

  // 自动提醒
  setInterval(() => {
    const shouldRemind = Math.random() < 0.1;
    if (shouldRemind) {
      chat.innerHTML += `<div><b>梦灵：</b>你今天还有没完成的事情哦～</div>`;
      chat.scrollTop = chat.scrollHeight;
    }
  }, 30000);

  // GPT 请求函数
  async function fetchGPTResponse(userMessage) {
    const response = await fetch('/api/getGPTResponse', {  // 调用后端API
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    return data.reply;  // 返回GPT的回复
  }
});
