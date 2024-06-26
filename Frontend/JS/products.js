///////////////////////////////////// Sign /////////////////////////////////////////////

var out = document.getElementById("log-out");
var user = document.getElementById("user");
var dproducts = document.querySelector("#products-items");


var products = [];
if (localStorage.getItem("cart_items")) {
  products = JSON.parse(localStorage.getItem("cart_items"));
  draw_products(products);
  console.log(products);
} else {
  window.location("index.html");
}

function draw_products(items) {
  for (e in items) {
    dproducts.innerHTML += `<div class="item">
        <img src="data:image/webp;base64,${items[e].image}" alt="">
        <div class="item-content">
            <p>Product : ${items[e].name}</p>
            <p>Price: ${items[e].price * items[e].count} $</p>
            <div class="plus">
                <span>${items[e].count}</span>
                <span ><i class="fas fa-plus text-success" onClick=plus(${
                  items[e].id
                },this)></i></span>
                <span ><i class="fas fa-minus text-danger" onClick=minus(${
                  items[e].id
                },this)></i></span>
            </div>
            <button class="btn btn-danger" onClick=remove(${
              items[e].id
            })>Remove</button>
        
        </div>
        </div>`;
  }
}

function plus(id, i) {
  // Plus Count of the item by one
  products.find((e) => e.id === id).count++;
  localStorage.setItem("cart_items", JSON.stringify(products));
  // update the value of the quantity of the item
  i.parentElement.parentElement.firstElementChild.innerHTML = products.find(
    (e) => e.id === id
  ).count;
  i.parentElement.parentElement.parentElement.children[1].innerHTML = `Price : ${
    products.find((e) => e.id === id).price *
    products.find((e) => e.id === id).count
  } $`;
}

function minus(id, i) {
  // minus Count of the item by one
  products.find((e) => e.id === id).count--;
  localStorage.setItem("cart_items", JSON.stringify(products));
  let m = products.find((e) => e.id === id);
  // update the value of the quantity of the item
  if (m.count == 0) {
    remove(id);
  } else {
    i.parentElement.parentElement.firstElementChild.innerHTML = products.find(
      (e) => e.id === id
    ).count;
    i.parentElement.parentElement.parentElement.children[1].innerHTML = `Price : ${
      products.find((e) => e.id === id).price *
      products.find((e) => e.id === id).count
    } $`;
  }
}

function remove(id) {
  let m = products.find((e) => e.id === id);
  let x = products.indexOf(m);
  products.splice(x, 1);
  localStorage.setItem("cart_items", JSON.stringify(products));
  products = JSON.parse(localStorage.getItem("cart_items"));
  dproducts.innerHTML = "";
  draw_products(products);
}


