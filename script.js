// ナビゲーションのアクティブ状態管理
(function () {
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ナビリンクのスタイル追加
  var style = document.createElement('style');
  style.textContent = '.main-nav a.active { color: #fff; background: rgba(255,255,255,0.18); }';
  document.head.appendChild(style);

  // フローティングボタンの表示制御
  var floatingBtn = document.querySelector('.floating-back');
  function toggleFloating() {
    if (window.scrollY > 300) {
      floatingBtn.style.opacity = '1';
      floatingBtn.style.pointerEvents = 'auto';
    } else {
      floatingBtn.style.opacity = '0';
      floatingBtn.style.pointerEvents = 'none';
    }
  }

  if (floatingBtn) {
    floatingBtn.style.transition = 'opacity 0.3s, background 0.2s, transform 0.2s, box-shadow 0.2s';
    floatingBtn.style.opacity = '0';
    floatingBtn.style.pointerEvents = 'none';
    window.addEventListener('scroll', toggleFloating, { passive: true });
  }
})();
