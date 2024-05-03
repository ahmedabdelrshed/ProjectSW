var nameproduct = document.getElementById("name");
var price = document.getElementById("price");
var amount = document.getElementById("amount");
var description = document.getElementById("Description");
var selectcategorie = document.getElementById("selectcategorie");
var image = document.getElementById("image");
var imagepro = document.getElementById("imagepro");
var update = document.getElementById("update");
var msg = document.getElementById("msg");

var product = JSON.parse(localStorage.getItem("product"));
console.log(product);
nameproduct.value = product.name;
price.value = product.price;
amount.value = product.amount;
description.value = product.description;
selectcategorie.value = product.categorie_id;
imagepro.innerHTML = `<img src="data:image/webp;base64,${product.image}" alt="" style="width: 50px;
height: 50px;
margin-left: 100px;
">`;

update.addEventListener("click", function (e) {
  e.preventDefault();
  if (nameproduct.value == "") {
    msg.innerHTML = "Please Enter the Product Name";
    return;
  }
  if (price.value == "") {
    msg.innerHTML = "Please Enter the Product price";
    return;
  }
  if (price.value <= 0) {
    msg.innerHTML = "Product Price Cannot be Smaller or Equal Zero";
    return;
  }
  if (amount.value <= 0) {
    msg.innerHTML = "Product Amount Cannot be Smaller or Equal Zero";
    return;
  }
  if (description.value == null) {
    msg.innerHTML = "Please Enter the Product Description";
    return;
  }
  if (selectcategorie.value == 0) {
    msg.innerHTML = "Please Enter the Product Categorie";
    return;
  }
  if (image.files.length == 0) {
    msg.innerHTML = "Please Upload the Product Image";
    return;
  }
  updateProduct(
    product.id,
    image,
    nameproduct,
    price,
    description,
    selectcategorie,
    amount
  );
});

async function updateProduct(
  id,
  image,
  nameproduct,
  price,
  description,
  selectcategorie,
  amount
) {
  try {
    // Create a new FormData object
    const productFormData = new FormData();
    productFormData.append("file", image.files[0]);
    productFormData.append("name", nameproduct.value);
    productFormData.append("price", price.value);
    productFormData.append("description", description.value);
    productFormData.append("categorie", selectcategorie.value);
    productFormData.append("amount", amount.value);
    const jwtToken = sessionStorage.getItem("token");
    const urlSearchParams = new URLSearchParams(productFormData);

    // Append the encoded parameters to the URL

    // Make a POST request with the FormData object in the body
    const response = await fetch(
      `http://localhost:8050/products/manage/${id}/update`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: productFormData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create product");
      return;
    }

    const data = await response.text();
    console.log("Product Updated:", data);
      setTimeout(() => {
          window.location = '../../Admin/products.html'
      }, 1500);
    return data; // Return the response data
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Rethrow the error for handling in the caller
  }
}


