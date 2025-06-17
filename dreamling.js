
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dl-toggle');
  const panel = document.getElementById('dreamling-panel');
  const chat = document.getElementById('dl-chat');
  const input = document.getElementById('dl-input');

  toggle.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const msg = input.value.trim();
      chat.innerHTML += `<div><b>你：</b>${msg}</div>`;
      input.value = '';
      setTimeout(() => {
        const reply = dreamlingReply(msg);
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

  function dreamlingReply(msg) {
    if (msg.includes("修炼")) return "记得凌晨三点的那次呼吸冥想。";
    if (msg.includes("发布")) return "内容准备好了谁去点击那颗“发布”按钮？";
    return "我随时在，不会让你独行。";
  }
});
