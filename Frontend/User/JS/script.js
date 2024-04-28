var computers = document.querySelector(".computers");
var mobiles = document.querySelector(".mobiles");
var watches = document.querySelector(".watches");
var cart2 = document.getElementById("cart");
var cartItems = document.querySelector(".cart-items");
var n_item_cart = document.querySelector("#number-items");
var productsapi = [];
function filters(show, hidden, hidden_2) {
  show.style.display = "grid";
  hidden.style.display = "none";
  hidden_2.style.display = "none";
}
if (localStorage.getItem("cart_items")) {
  cart_products = JSON.parse(localStorage.getItem("cart_items"));
  n_item_cart.innerHTML = cart_products.length;
  draw_cart_items(cart_products.slice(0, 3));
}
///////////////////////////////////// Sign /////////////////////////////////////////////
var sign = document.getElementById("sign");

var user = document.getElementById("user");

if (localStorage.getItem("sign")) {
  sign.firstElementChild.style.display = "none";
  sign.children[1].style.display = "none";
  out.style.display = "inline";
  user.style.display = "block";
  user.children[1].innerHTML = localStorage.getItem("username");
}

/////////////////////////////////////////// Products ////////////////////////////////////////////
let dcomputers = document.getElementById("computers2");

// Draw Mobiles in Html ///////////////////////////////

//////////////////////////////cart///////////////////////////////////

cart2.onclick = function () {
  if (cartItems.style.display == "block") {
    cartItems.style.display = "none";
  } else {
    cartItems.style.display = "block";
  }
};
//////////////////////// Add to Cart //////////////////////////////////////////

var cart_products = [];
var count = 0;

function plus(id, i) {
  // Plus Count of the item by one
  cart_products.find((e) => e.id === id).count++;
  localStorage.setItem("cart_items", JSON.stringify(cart_products));
  // update the value of the quantity of the item
  i.parentElement.firstElementChild.innerHTML = cart_products.find(
    (e) => e.id === id
  ).count;
}
function minus(id, i) {
  // minus Count of the item by one
  cart_products.find((e) => e.id === id).count--;
  localStorage.setItem("cart_items", JSON.stringify(cart_products));
  let m = cart_products.find((e) => e.id === id);
  // update the value of the quantity of the item
  if (m.count == 0) {
    let x = cart_products.indexOf(m);
    cart_products.splice(x, 1);
    n_item_cart.innerHTML = cart_products.length;
    if (x <= 2) {
      count--;
      draw_cart_items(cart_products.slice(0, 3));
    }
    let all = [...dcomputers.children, ...dmobiles.children];
    let p = all.find((e) => e.id == id);
    p.children[1].children[3].innerHTML = "Add To Cart";
    p.children[1].children[3].classList.remove("btn-danger");
    p.children[1].children[3].classList.add("btn-warning");
  } else {
    i.parentElement.firstElementChild.innerHTML = cart_products.find(
      (e) => e.id === id
    ).count;
  }
}
/////////////////////////////////// Favorite /////////////////////////////////////////
var heart_icon = document.querySelectorAll(".fa-heart");
heart_icon.forEach(function (e) {
  e.onclick = function () {
    if (e.style.color == "orange") {
      e.style.color = "rgb(194, 184, 184)";
    } else {
      e.style.color = "orange";
    }
  };
});

////////////////// fetch Categories ///////////////////////////////

async function fetchCategories() {
  const apiUrl = "http://localhost:8050/categorie/get";
  const jwtToken = sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse JSON response
    // console.log(data); // Handle response data
    return data; // Return the data if needed
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

fetchCategories()
  .then((data) => {
    ViewCategories(data);
  })
  .catch((error) => {
    // Handle error
  });
var categoriesht = document.getElementById("categories");
function ViewCategories(categories) {
  var categorieshtml = [];
  categorieshtml += `<button class="btn btn-black  btn-outline-dark  border-warning  mx-lg-5"
   onClick="fetchProducts()" >
  All</button>`;
  categories.forEach((categorie) => {
    var name = decryptData(categorie.name);
    console.log(name);
    categorieshtml += `            
    <button class="btn btn-warning  btn-outline-dark  border-warning  mx-lg-5" onClick="searchBycategorie('${name}')">
    ${name}</button>
      `;
  });
  // console.log(categorieshtml);
  categoriesht.innerHTML = categorieshtml;
}

function decryptData(encryptedData) {
  var key = CryptoJS.enc.Utf8.parse("ramzyashrafsaifashraf123"); // Convert key to CryptoJS WordArray
  var iv = CryptoJS.enc.Utf8.parse("qwerqwer");
  var decrypted = CryptoJS.TripleDES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    },
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}

function searchBycategorie(name) {
  var products = [];
  productsapi.forEach((product) => {
    if (product.category.name == name) {
      products += `<div class="card col-lg-3 col-md-4 col-sm-6 mx-lg-5 mt-4" id='${product.id}' >
    <img class="card-img-top" src="data:image/webp;base64,${product.image}" alt="Card image">
    <div class="card-body">
        <h4 class="card-title"> ${product.name}<i class="fas fa-heart mx-4  "></i> </h4>
        <p class="card-text">Categorie : ${product.category.name}</p>
        <p class="card-text" >${product.description}</p>
        <p class="card-text"><span class="bg-warning text-dark">${product.price}</span> List:<del>$999.99</del>
        </p>
        <button href="#" class="btn btn-warning btn-outline-dark" onClick="Add_to_cart(${product.id},this)">Add To Cart</button>
    </div>
    </div>`;
    }
  });
  // console.log(products);
  dcomputers.innerHTML = products;
}
///////////////////// Fetch Product from Api ///////////////////////////////

async function fetchProducts() {
  const apiUrl = "http://localhost:8050/products/get";
  const jwtToken = sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      return;
    }

    const data = await response.json(); // Parse JSON response
    productsapi = data;
    write_Products(data);
    // Handle response data
    return data; // Return the data if needed
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

fetchProducts()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("ERRor");
  });

// Draw Computers in Html ///////////////////////////////
function write_Products(computers) {
  productsapi = computers;
  var products = [];
  computers.forEach((product) => {
    products += `<div class="card col-lg-3 col-md-4 col-sm-6 mx-lg-5 mt-4" id='${product.id}' >
    <img class="card-img-top" src="data:image/webp;base64,${product.image}" alt="Card image">
    <div class="card-body">
        <h4 class="card-title"> ${product.name}<i class="fas fa-heart mx-4  "></i> </h4>
        <p class="card-text">Categorie : ${product.category.name}</p>
        <p class="card-text" >${product.description}</p>
        <p class="card-text"><span class="bg-warning text-dark">${product.price}</span> List:<del>$999.99</del>
        </p>
        <button href="#" class="btn btn-warning btn-outline-dark" onClick="Add_to_cart(${product.id},this)">Add To Cart</button>
    </div>
    </div>`;
  });
  // console.log(products);
  dcomputers.innerHTML = products;
}

function Add_to_cart(id, th) {
  //  First Check if user Already Login
  console.log(productsapi);
  let item = productsapi.find((e) => e.id === id);
  if (th.innerHTML === "Add To Cart") {
    cart_products.push({ ...item, count: 1 });
    localStorage.setItem("cart_items", JSON.stringify(cart_products));
    n_item_cart.innerHTML = cart_products.length;
    draw_cart_items(cart_products.slice(0, 3));
    th.innerHTML = "Remove From Cart";
    th.classList.remove("btn-warning");
    th.classList.add("btn-danger");
  } else {
    th.innerHTML = "Add To Cart";
    th.classList.remove("btn-danger");
    th.classList.add("btn-warning");
    let x = productsapi.indexOf(item);
    cart_products.splice(x, 1);
    draw_cart_items(cart_products.slice(0, 3));
    localStorage.setItem("cart_items", JSON.stringify(cart_products));
    n_item_cart.innerHTML = cart_products.length;
    if (x <= 2) {
      count--;
      draw_cart_items(cart_products.slice(0, 3));
    }
  }
}

function draw_cart_items(items) {
  cartItems.firstElementChild.innerHTML = "";
  for (e in items) {
    cartItems.firstElementChild.innerHTML += `<div class="item" id='${items[e].id}'>
    <img src="data:image/webp;base64,${items[e].image}" alt="">
    <p>${items[e].name}</p>
    <div class="item-info">
        <span class="quantity">1</span>
        <i class="fas fa-plus text-success" onClick=plus(${items[e].id},this)></i>
        <i class="fas fa-minus text-danger" onClick=minus(${items[e].id},this)></i>
    </div>
  </div>
  <hr>`;
  }
}
