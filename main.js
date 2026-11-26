import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const nav = document.querySelector('#mobileNav');
const toggle = document.querySelector('#mobileNavToggle');
const overlay = document.querySelector('#mobileNavOverlay');

if (nav && toggle && overlay) {
  const navLinks = nav.querySelectorAll('a');

  function openMobileNav() {
    nav.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.classList.add('is-open');

    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');

    document.body.classList.add('mobile-nav-open');
  }

  function closeMobileNav() {
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.classList.remove('is-open');

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');

    document.body.classList.remove('mobile-nav-open');
  }

  function toggleMobileNav() {
    const isOpen = nav.classList.contains('is-open');

    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  toggle.addEventListener('click', toggleMobileNav);
  overlay.addEventListener('click', closeMobileNav);

  // Close after clicking a navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close with Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileNav();
    }
  });

  // Reset mobile state when resized to desktop
  const desktopBreakpoint = window.matchMedia('(min-width: 992px)');

  desktopBreakpoint.addEventListener('change', (event) => {
    if (event.matches) {
      closeMobileNav();
    }
  });
}


// ==========================================
// DARK / LIGHT THEME
// ==========================================

const themeToggles = document.querySelectorAll('.theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);

  // Update desktop and mobile icons
  themeToggles.forEach((button) => {
    const icon = button.querySelector('i');

    if (icon) {
      icon.className =
        theme === 'dark'
          ? 'bi bi-sun'
          : 'bi bi-moon';
    }
  });

  localStorage.setItem('theme', theme);
}


// Use saved theme or OS preference
const savedTheme = localStorage.getItem('theme');

const preferredTheme =
  savedTheme ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');

setTheme(preferredTheme);


// Both buttons control the same theme
themeToggles.forEach((button) => {
  button.addEventListener('click', () => {
    const currentTheme =
      document.documentElement.getAttribute('data-bs-theme');

    const newTheme =
      currentTheme === 'dark'
        ? 'light'
        : 'dark';

    setTheme(newTheme);
  });
});


// ==========================================
// CARD POPUPS
// ==========================================

(() => {

  function initCardPopups() {

    const popup = document.getElementById('cardPopup');
    const title = document.getElementById('cardPopupTitle');
    const body = document.getElementById('cardPopupBody');
    const closeButton = document.getElementById('cardPopupClose');

    // Check whether popup elements exist
    if (!popup || !title || !body || !closeButton) {
      console.error(
        'A popup HTML-elemei hiányoznak. Ellenőrizd az index.html fájlt.'
      );
      return;
    }

    let previouslyFocusedElement = null;


    // ==========================================
    // CARD CONTENTS
    // ==========================================

    const cardContents = {

      history_card: {
        paragraphs: [
          'A gyógyszergyártás története hosszú fejlődési folyamat eredménye. A kezdeti gyógyszerkészítési módszerektől fokozatosan jutottunk el a modern, ellenőrzött ipari gyártásig.',

          'A tudományos felfedezések, a kémia és a technológia fejlődése lehetővé tette, hogy a gyógyszerek előállítása egyre pontosabbá és megbízhatóbbá váljon.',

          'Napjainkban a gyógyszeriparban a kutatás, a minőségbiztosítás és a szigorú szabályozás egyaránt fontos szerepet tölt be.'
        ],

        image: 'aaaa'
      },


      capsule_card: {
        paragraphs: [
          'A kemény kapszulák két részből, egy testből és egy kupakból álló gyógyszerformák. Leggyakrabban por vagy granulátum töltésére használják őket.',

          'A kapszulahéj általában zselatinból vagy növényi eredetű cellulózszármazékból készül. A megfelelő anyag kiválasztása a készítmény tulajdonságaitól függ.',

          'A kapszulák előnye, hogy könnyen lenyelhetők, elfedik a hatóanyag kellemetlen ízét, és pontos adagolást tesznek lehetővé.'
        ],

        image: 'bbbb'
      },


      granulatums_card: {
        paragraphs: [
          'A granulátumok apró, összetapadt porszemcsékből álló szilárd gyógyszerkészítmények. Előállításuk során a por részecskéit nagyobb szemcsékké alakítják.',

          'A granulálás javíthatja az anyag folyási és kezelhetőségi tulajdonságait, valamint segítheti az egyenletes adagolást és a tablettázást.',

          'A granulátumokat közvetlenül is be lehet venni, vagy további feldolgozás után például kapszulák és tabletták készítésére használhatók.'
        ],

        image: 'aaaaaa'
      }

    };


    // ==========================================
    // OPEN POPUP
    // ==========================================

    function openPopup(card) {

      const data = cardContents[card.id] || {};

      title.textContent =
        card.querySelector('.card-title')?.textContent.trim()
        || 'Részletek';

      // Clear previous content
      body.replaceChildren();


      // Add paragraphs
      const paragraphs = data.paragraphs || [
        'Ehhez a kártyához még nincs külön szöveg megadva.',

        'A tartalmat a main.js fájl cardContents részében módosíthatod.',

        'A kép alapértelmezés szerint a kártyán megadott kép lesz.'
      ];


      paragraphs.forEach((text) => {

        const p = document.createElement('p');

        p.textContent = text;

        body.appendChild(p);

      });


      // Add image
      const cardImage = card.querySelector('img');

      const imageSrc =
        data.image || cardImage?.getAttribute('src');


      if (imageSrc) {

        const img = document.createElement('img');

        img.className = 'card-popup__image';

        img.src = imageSrc;

        img.alt = cardImage?.alt || title.textContent;

        img.onerror = () => img.remove();

        body.appendChild(img);

      }


      // Show popup
      previouslyFocusedElement = document.activeElement;

      popup.classList.add('is-open');

      popup.setAttribute('aria-hidden', 'false');

      document.body.classList.add('card-popup-open');

      closeButton.focus();

    }


    // ==========================================
    // CLOSE POPUP
    // ==========================================

    function closePopup() {

      if (!popup.classList.contains('is-open')) {
        return;
      }

      popup.classList.remove('is-open');

      popup.setAttribute('aria-hidden', 'true');

      document.body.classList.remove('card-popup-open');

      body.replaceChildren();


      // Restore previous focus
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }

    }


    // ==========================================
    // CARD CLICK EVENTS
    // ==========================================

    document.addEventListener('click', (event) => {

      const target = event.target;

      const card =
        target instanceof Element
          ? target.closest('.info-card')
          : null;

      if (card) {
        openPopup(card);
      }

    });


    // ==========================================
    // KEYBOARD ACCESSIBILITY
    // ==========================================

    document.querySelectorAll('.info-card').forEach((card) => {

      card.tabIndex = 0;

      card.setAttribute('role', 'button');

      card.setAttribute('aria-haspopup', 'dialog');


      card.addEventListener('keydown', (event) => {

        if (event.target !== card) {
          return;
        }

        if (event.key === 'Enter' || event.key === ' ') {

          event.preventDefault();

          openPopup(card);

        }

      });

    });


    // ==========================================
    // CLOSE BUTTON
    // ==========================================

    closeButton.addEventListener('click', closePopup);


    // Close when clicking outside the popup
    popup.addEventListener('click', (event) => {

      if (event.target === popup) {
        closePopup();
      }

    });


    // Close with Escape
    document.addEventListener('keydown', (event) => {

      if (event.key === 'Escape') {
        closePopup();
      }

    });

  }


  // ==========================================
  // INITIALIZATION
  // ==========================================

  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      initCardPopups,
      { once: true }
    );

  } else {

    initCardPopups();

  }

})();