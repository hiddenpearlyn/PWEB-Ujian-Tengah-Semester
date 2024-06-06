// menu.js
let allMenu = [];
const itemsPerPage = 6;
let currentPage = 1;

function fetchMenu() {
  const loadingContainer = document.getElementById("loading-container");
  loadingContainer.style.display = "block"; // Display the loading container

  // Hardcoded burger menu data
  const menuData = [
    {
      title: "Classic Beef Burger",
      description: "Juicy beef patty with fresh lettuce, tomato, and cheese",
      duration: "15 mins",
      price: 8.99,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/beef-burger-with-cheddar-lettuces-onion_140725-5718.jpg?t=st=1717654262~exp=1717657862~hmac=ef577536ced175d762a4c678ef27dda050d938d5b68026bb93f24c51bafa8269&w=740"
    },
    {
      title: "Cheese Lover's Burger",
      description: "Loaded with melted cheddar, Swiss, and mozzarella cheese",
      duration: "20 mins",
      price: 9.99,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/yummy-cheeseburger-with-french-fries_23-2148374855.jpg?t=st=1717654579~exp=1717658179~hmac=b5e5204f317cdf665307379e3c9e82e3c0cbb4d7edcabb06316dba01509dc5af&w=996"
    },
    {
      title: "Veggie Delight Burger",
      description: "Grilled veggie patty with avocado, lettuce, and tomato",
      duration: "15 mins",
      price: 7.99,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/tasty-hamburger-avocado_23-2148575432.jpg?t=st=1717654640~exp=1717658240~hmac=0e13929d5100f3c4222d2e9bc3ad212f1e04bd45fda52a017cf29cf4458fbfa2&w=996"
    },
    {
      title: "Spicy Chicken Burger",
      description: "Crispy chicken fillet with spicy mayo and jalapeños",
      duration: "18 mins",
      price: 8.49,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/sandwich-with-chicken-burger-tomatoes-lettuce_2829-16584.jpg?t=st=1717654688~exp=1717658288~hmac=35389df2e223c8bd6d723b935aaaf20b9b786bc5fe6971734e352ec14fa9c436&w=996"
    },
    {
      title: "BBQ Bacon Burger",
      description: "Beef patty with BBQ sauce, bacon, and onion rings",
      duration: "20 mins",
      price: 10.49,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/meat-cheeseburger-with-bacon-french-fries-brown-bread_140725-5673.jpg?t=st=1717654723~exp=1717658323~hmac=ed1f6c99c0467e429401429a378e1c689705aa6cee9c50f2d63f5adcb6a71ea4&w=996"
    },
    {
      title: "Mushroom Swiss Burger",
      description: "Beef patty with sautéed mushrooms and Swiss cheese",
      duration: "15 mins",
      price: 9.49,
      currency: "USD",
      image: "https://img.freepik.com/free-photo/arrangement-with-delicious-vegan-burger_23-2149039339.jpg?t=st=1717654756~exp=1717658356~hmac=7038aeec4f96739a2ccde7900c8dc1d263e44bf54b182625e84d72d6161af8a7&w=360"
    },
    // Add more burger items as needed
  ];

  setTimeout(() => {
    allMenu = menuData;
    displayMenu(currentPage);
    loadingContainer.style.display = "none"; 
  }, 1000); 
}

function displayMenu(page, menu = allMenu) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedMenu = menu.slice(start, end);

  paginatedMenu.forEach((pkg) => {
    const card = createPackageCard(pkg);
    container.appendChild(card);
  });

  setupPagination(menu.length, itemsPerPage);
}

function createPackageCard(packageData) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-md-4 mb-4";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100 package-card";

  cardDiv.innerHTML = `
    <img src="${packageData.image}" class="card-img-top" alt="${packageData.title}">
    <div class="card-body">
        <h5 class="card-title">${packageData.title}</h5>
        <p class="card-text">${packageData.description}</p>
        <p><strong>Duration:</strong> ${packageData.duration}</p>
        <p><strong>Price:</strong> ${packageData.price} ${packageData.currency}</p>
    </div>
  `;

  colDiv.appendChild(cardDiv);

  const buyButton = document.createElement("button");
  buyButton.className = "btn btn-primary mt-2";
  buyButton.innerText = "Add to Cart";
  buyButton.onclick = () => {
    addToCart(packageData);
  };

  cardDiv.appendChild(buyButton);

  return colDiv;
}

function addToCart(packageData) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(packageData);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  showToast("Added to cart!");
}

function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    createToastContainer();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.style.minWidth = "250px";
  toast.innerHTML = `
    <div class="toast-body bg-success text-white">
        <i class="fas fa-check-circle"></i> ${message}
    </div>
  `;

  document.getElementById("toast-container").appendChild(toast);

  $(toast).toast({ delay: 1000 }); // Adjust delay to 1 second (1000 milliseconds)
  $(toast).toast("show");
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  container.style.position = "fixed";
  container.style.top = "10px";
  container.style.right = "10px";
  container.style.zIndex = "9999";
  document.body.appendChild(container);
}

function setupPagination(totalItems, itemsPerPage) {
  const paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = "";
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = "page-item";
    const pageLink = document.createElement("a");
    pageLink.className = "page-link";
    pageLink.href = "#";
    pageLink.innerText = i;
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      displayMenu(i);
    });

    pageItem.appendChild(pageLink);
    paginationControls.appendChild(pageItem);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchMenu();
  createToastContainer();
  updateCartCount();

  document
    .getElementById("apply-filters")
    .addEventListener("click", function () {
      const filteredAndSortedMenu = filterAndSortMenu();
      displayMenu(1, filteredAndSortedMenu); // Reset to page 1 after filtering
    });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.textContent = cart.length;
}

function filterAndSortMenu() {
  const menuFilter = document.getElementById("menu-filter").value.toLowerCase();
  const durationSortOption = document.getElementById("duration-sort").value;
  const priceSortOption = document.getElementById("price-sort").value;

  let filteredMenu = allMenu;

  // Filter by menu
  if (menuFilter) {
    filteredMenu = filteredMenu.filter((item) =>
      item.title.toLowerCase().includes(menuFilter)
    );
  }

  // Sort by duration
  if (durationSortOption !== "default") {
    filteredMenu.sort((a, b) => {
      return durationSortOption === "asc"
        ? a.duration.localeCompare(b.duration)
        : b.duration.localeCompare(a.duration);
    });
  }

  // Sort by price
  if (priceSortOption !== "default") {
    filteredMenu.sort((a, b) => {
      return priceSortOption === "asc" ? a.price - b.price : b.price - a.price;
    });
  }

  return filteredMenu;
}
