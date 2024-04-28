var nameproduct = document.getElementById("name");
var price = document.getElementById("price");
var amount = document.getElementById("amount");
var description = document.getElementById("Description");
var selectcategorie = document.getElementById("selectcategorie");
var image = document.getElementById("image");
var add = document.getElementById("add");
var msg = document.getElementById("msg");

add.addEventListener("click", function (e) {
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
  createProduct(
    image,
    nameproduct,
    price,
    description,
    selectcategorie,
    amount
  );
});

async function createProduct(
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

    // Append the encoded parameters to the URL

    // Make a POST request with the FormData object in the body
    const response = await fetch(
      `http://localhost:8050/products/manage/create_product`,
      {
        method: "POST",
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
    console.log("Product created:", data);
    setTimeout(() => {
        window.location = '../../Admin/products.html'
    }, 1500);
    return data; // Return the response data
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Rethrow the error for handling in the caller
  }
}
