// https://github.com/mdn/web-components-examples/blob/master/popup-info-box-external-stylesheet/main.js

// Create a class for the element
class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0); // Tabキーによるフォーカスの移動順序を指定する属性

    let imgUrl;
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img');
    } else {
      imgUrl = 'default.png';
    }

    const img = document.createElement('img');
    img.src = `./img/${imgUrl}`;
    // img.src = `../../assets/img/${imgUrl}`;
    icon.appendChild(img);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');

    const text = this.getAttribute('data-text');
    info.textContent = text;

    switch (imgUrl) {
      case 'alt.png':
        info.style.backgroundColor = '#67cebf';
        break;
      case 'alt_danger.png':
        info.style.backgroundColor = '#fee';
        break;
      case 'alt_success.png':
        info.style.backgroundColor = '#efb';
        break;
      default:
        info.style.backgroundColor = 'white';
    }

    wrapper.appendChild(icon);
    wrapper.appendChild(info);

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', './style_link.css');
    // linkElem.setAttribute('href', '../../sub/hbs/style_link.css');

    // Attach the created elements to the shadow dom
    shadow.appendChild(linkElem);
    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define('popup-info', PopUpInfo);
