let deferredPrompt;
const installBtn = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();            // Prevent Chrome’s default prompt
  deferredPrompt = e;            // Save event for later
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
  installBtn.style.display = 'none';
  deferredPrompt.prompt();       // Show Chrome’s install prompt
  deferredPrompt.userChoice.then(choice => {
    console.log(choice.outcome === 'accepted'
      ? 'User accepted'
      : 'User dismissed');
    deferredPrompt = null;
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW failed:', err));
  });
}
