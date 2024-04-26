var tbody = document.getElementById("t-body");

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
    // Handle response data
    return data; // Return the data if needed
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

var categories = [];

fetchProducts()
  .then((data) => {
    ViewProducts(data);
    console.log(data);
  })
  .catch((error) => {
    // Handle error
  });

function ViewProducts(products) {
  var Productshtml = [];
  products.forEach((product) => {
    Productshtml += `<tr>
    <th scope="row">${product.id}</th>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.amount}</td>
    <td>${product.description}</td>
    <td>${product.category.name}</td>
    <td>
    <img src="data:image/webp;base64,${product.image}" alt="" style="width: 40px; height: 40px;">
</td>
    <td><a href="../../Admin/UpdateProduct.html">  <button type="button" class="btn btn-success btn-sm"
    onClick="update(${product.id},'${product.name}','${product.description}',${product.price},${product.amount},${product.category.id},'${product.image}')">Update</button><a/>
    <button type="button" class="btn btn-danger btn-sm"  onClick="deleteProduct(${product.id})" >Delete</button><td/>
    </tr>`;
  });
  tbody.innerHTML = Productshtml;
}

function update(id, name, description,price,amount,categorie_id,image) {
  var product = {
    id: id,
    name: name,
    description: description,
    price: price,
    amount: amount,
    categorie_id: categorie_id,
    image:image
  };
  console.log(JSON.stringify(product));
  localStorage.setItem("product", JSON.stringify(product));
}

async function deleteProduct(id) {
  const apiUrl = `http://localhost:8050/products/manage/${id}/delete`;
  const jwtToken = sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      return;
    }
    const data = await response.text();
    console.log(data);
    fetchProducts()
      .then((data) => {
        ViewProducts(data);
       
      })
      .catch((error) => {
        // Handle error
      });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
