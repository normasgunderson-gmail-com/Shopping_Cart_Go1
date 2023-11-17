let products;

// make a connection with container
const container = document.querySelector('.section-center');
// console.log(container);

// create a sample card
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

// place cards into container
// container.innerHTML = card + card + card;

// products is an array of objects
// map will transform it into array of html cards
// const htmlArr = products.map((product) => card);
// console.log(htmlArr.join(''));

function displayProducts(products) {
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
            <h4>${product.title}</h4>
          </header>
          <p class="item-text">${product.description}</p>
          <h4 class="price">$${product.price}</h4>
        </div>
      </article>
      `
  );

  container.innerHTML = htmlArr.join('');
}

// displayProducts();

function displayButtons() {
  // collect unique categories
  const categories = ['all'];

  products.forEach((product) => {
    // if (categories.includes(product.category)) {
    // } else {
    //   categories.push(product.category);
    // }
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  // solution with SET
  //   const allCategories = products.map((product) => product.category);
  //   console.log(new Set(allCategories));

  // solution with reduce
  //   const categories = products.reduce(
  //     (acc, product) =>
  //       !acc.includes(product.category) ? [...acc, product.category] : acc,
  //     []
  //   );
  console.log(categories);

  // generate buttons for each category
  // make a connection with container
  const btnContainer = document.querySelector('.btn-container');
  console.log(btnContainer);
  const btnHtml = `
  <button type="button" class="filter-btn" data-id="all">all</button>
  `;
  // btnContainer.innerHTML = btnHtml + btnHtml + btnHtml;
  // const btnHtmlArr = categories.map((item) => btnHtml);
  const btnHtmlArr = categories.map(
    (item) => `
  <button type="button" class="filter-btn" data-id="${item}">${item}</button>
  `
  );
  btnContainer.innerHTML = btnHtmlArr.join('');

  // adding event listener for buttons
  // option-1 collect all the buttons and add event listener to each button one by one
  // option-2 add event listener to container and check who is sending that event
  btnContainer.addEventListener('click', (e) => {
    // check which button is clicked
    console.log(e.target.textContent);
    console.log(e.target.dataset.id);
    const selectedCategoty = e.target.dataset.id;
    if (selectedCategoty === 'all') displayProducts(products);
    else {
      // apply a filter according to the selected category
      const filteredProducts = products.filter(
        (product) => product.category === selectedCategoty
      );

      console.log(filteredProducts);

      displayProducts(filteredProducts);
    }
  });
}

document.getElementById('btn-filter').addEventListener('click', () => {
  const min = document.getElementById('min').value;
  const max = document.getElementById('max').value;
  console.log(min, max);
  let filteredProducts;

  if (!min && !max) {
    displayProducts(products);
    return;
  } else if (!min) {
    filteredProducts = products.filter((product) => product.price < max);
  } else if (!max) {
    filteredProducts = products.filter((product) => product.price > min);
  } else {
    // filteredProducts = products.filter((product) => product.price < max);
    // filteredProducts = filteredProducts.filter(
    //   (product) => product.price > min
    // );
    // filteredProducts = products
    //   .filter((product) => product.price < max)
    //   .filter((product) => product.price > min);

    filteredProducts = products.filter(
      (product) => product.price < max && product.price > min
    );
  }

  displayProducts(filteredProducts);
});

document.getElementById('btn-search').addEventListener('click', () => {
  const search = document.getElementById('search').value.toLowerCase();
  console.log(search);

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(search)
  );

  displayProducts(filteredProducts);
});

window.addEventListener('DOMContentLoaded', () => {
  fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
      console.log(data.products)
      products = data.products;
      displayProducts(products);
      displayButtons();
    });
  // displayProducts(products);
  // displayButtons();
});