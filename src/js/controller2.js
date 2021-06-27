import "bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// Live site is hosted in https://the-impressionists.netlify.app/
const cardsVanGogh = document.querySelector('#artworks-vangogh');
const cardsPaulGauguin = document.querySelector('#artworks-paulgauguin');
const cardsPaulCezanne = document.querySelector('#artworks-paulcezanne');
const cardsEdgarDegas = document.querySelector("#artworks-edgardegas");



// function to get artsworks based on artist's name
const getArtworks = async function (artist,cardId) {
  try {
    console.log(artist);
  const res = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&isHighlight=true&q=${artist}`
  );
  const data = await res.json();
  cardId.innerHTML = '';
  data.objectIDs.forEach(item => artwork(item,cardId))
} catch(err) {
  console.log(err);
}
};


//function to get artwork based on id
const artwork = async function (id,cardId) {
  try {
  const res = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  const data = await res.json();
  //destructuring data object
  const { title, objectDate, dimensions, medium, primaryImageSmall } = data;


  const markup = `
  <div class="card col-12">
  <img src="${primaryImageSmall}" class="card-img-top" alt="${title}">
  <div class="card-body">
    <ul class="list-unstyled">
      <li class="fw-bold">${title}</li>
      <li>- ${objectDate}</li>
      <li>- ${medium}</li>
      <li>- ${dimensions}</li>
    </ul>
  </div>
</div>`;

// clear markup in html
// cardsVanGogh.innerHTML = '';
cardId.insertAdjacentHTML('afterbegin', markup)

  } catch(err) {
    console.log(err);
  }
};

const getJson = async function (url) {
  try {
    // const res = await fetch(`${url}`);
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

getArtworks("Vincent van Gogh",cardsVanGogh);
getArtworks("Paul Gauguin", cardsPaulGauguin);
getArtworks("Paul Cézanne", cardsPaulCezanne);
getArtworks("Edgar Degas", cardsEdgarDegas);
//  getArtworks("Claude Monet")
// artwork(435882);
