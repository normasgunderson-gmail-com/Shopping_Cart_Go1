//*create a sample cards
const container = document.querySelector('.section-center');

const card = `
  <article class="product-item">
    <img
      src="https://dummyjson.com/image/i/products/1/thumbnail.jpg"
      alt="iPhone"
      9=""
    class="photo"
    />
    <div class="item-info">
      <header>
        <h4>iPhone 9</h4>
      </header>
      <p class="item-text">An apple mobile which is nothing like apple</p>
      <h4 class="price">$549</h4>
    </div>
  </article> 
`;
//place cards into a container, so can loop over t' product.js
// container.innerHTML = card;


//products is an [] of {}
//map will transform it into array of html cards
// const htmlArr = products.map((product) => card);
// container.innerHTML = htmlArr.join('');

function displayProducts(product) {
  //!to create a card for each of the products.js
  const htmlArr = products.map(
    (product) => `
<article class="product-item">
  <img
    src="${product.thumbnail}" 
    alt="${product.title}"
    9=""
  class="photo"
  />
  <div class="item-info">
    <header>
      <h4>"${product.title}</h4>
    </header>
    <p class="item-text">${product.description}</p>
    <h4 class="price">${product.price}</h4>
  </div>
</article> 
`
  );
  container.innerHTML = htmlArr.join('');
}
//*invoked the function 
displayProducts();

//system events, to loads the page

function displayButtons() {
  const categories = ['all'];

  products.forEach((product) => {
    //*one way to sort categories and get one of each
    //   if (categories.includes(products.category)) {
    //   } else {
    //     categories.push(product.category);
    //   }
    // });
    //*one way to sort categories and get one of each
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  // const allCategories = products.map((products) => product.category);
  // console.table(new Set(allCategories));

  // console.table(categories);

  // //!Solution to sort by categories using REDUCE  
  // const categories = products.reduce(
  //   (acc, product) =>
  //     !acc.includes(product.category) ? [...acc, product.category] : acc,[]
  // );
  // console.log(categories);

  //generate buttons for each categories
  const btnContainer = document.querySelector('.btn-container');
  console.log(btnContainer);
  const btnHtml = `
    <button type="button" class="filter-btn" data-id="all">all</button>
    `;

  const btnHtmlArr = categories.map(
    (item) => `
    <button type="button" class="filter-btn" data-id="${item}">${item}</button>
    `
  );
  btnContainer.innerHTML = btnHtmlArr.join('');

  //adding event listener for buttons
  // option 1 collect all the buttons and add event listener to each button 1 by 1  
  // option 2 add event listener to container and check who is sending that e
  btnContainer.addEventListener('click', (e) => {
    console.log(e.targetContent);   //checks which button is clicked
    console.log(e.target.dataset.id);
    const selectedCategory = e.target.dataset.id;
    const filteredProducts = products.filter(product => product.category === selectedCategory
    );
    console.table(filteredProducts);

    displayProducts(filteredProducts);
  });
}
document.getElementById('btn-filter').addEventListener('click', () => {
  const min = document.getElementById('min').ariaValueMax;
  const max = document.getElementById('max').ariaValueMax;
  console.log(min, max);

  if (!min && !max) {
    displayProducts(products);
    return;
  } else if (!min) {
    filteredProducts = products.filter((product) => product.price < max);
  } else if (!max) {
    filteredProducts = products.filter((product) => product.price > min);
  } else {
    // filteredProducts = products.filter((product) => product.price < max);
    // } filteredProducts = filteredProductsfilter((product) => product.price > min);

    //chain the previous filters
    filteredProducts = products.filter((product) => product.price < max);
  } filteredProducts = products
    .filter((product) => product.price < max)
    .filter((product) => product.price > min)

  displayProducts(filteredProducts);
});

document.getElementById('btn-search').addEventListener('click', () => {
  const search = document.getElementById('search').value.toLowerCase();
  console.log(search);

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(search)
)

displayProducts(filteredProducts);
});

window.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
  displayButtons();
});