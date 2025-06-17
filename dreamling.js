require('dotenv').config();

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dl-toggle');
  const panel = document.getElementById('dreamling-panel');
  const chat = document.getElementById('dl-chat');
  const input = document.getElementById('dl-input');

  toggle.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
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
    const should
