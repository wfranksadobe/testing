export async function initMap() {
// eslint-disable-next-line no-undef
  const { Map } = await google.maps.importLibrary('maps');

  const map = new Map(document.getElementById('locator-map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    disableDefaultUI: true,
    keyboardShortcuts: false,
    styles: [
      {
        featureType: 'all',
        stylers: [
          { lightness: -5 },
          { saturation: -100 },
          { visibility: 'simplified' },
        ],
      },
    ],
  });
  // eslint-disable-next-line no-undef
  const infoWindow = new google.maps.InfoWindow({
    map,
  });
}

export default function decorate(block) {
//   const pText = block.querySelector('p').textContent;
  block.textContent = '';
  window.initMap = async () => {
    initMap();
  };

  const locatorDOM = document.createRange().createContextualFragment(`
    <div class="shopfinder">
    <div class="sidepanel">
        <h3 class="sidepanel__title">Find a SecurBank near you!</h3>
    <div class="search">
        <p class="search__title">Find another location</p>
        <div class="search__box">
        <input class="search__input" type="text" placeholder="Post Code" name="search"></input>
        <button class="search__button">Search</button>
        </div>
    </div>
    </div>
        <div class="dynamicmap" id="locator-map">
    </div>
    </div>
    `);

  block.append(locatorDOM);
}
