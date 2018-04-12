const drawLogo = (): string => {
    return `<div class="logo">
              <img src="img/icons/logo.svg" alt="Car">
            </div>`;
};

const drawNav = (data: object): string => {
    return `<ul class="nav__list">
              <li class="nav__item">
                <a href="#" class="nav__link">test</a>
              </li>
              <li class="nav__item">
                <a href="#" class="nav__link">test</a>
              </li>
              <li class="nav__item">
                <a href="#" class="nav__link">test</a>
              </li>
            </ul>`;
};

const drawMobileHeader = (): string => {
    return `<header class="outer-block">
              <button type="button" class="hamburger" id="menu-show">
                <div class="hamburger__inner"></div>
              </button>
              ${drawLogo()}
              <button type="button" class="search-btn" id="search-btn"></button>
            </header>`;
};