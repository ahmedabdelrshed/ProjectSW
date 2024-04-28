var tbody = document.getElementById("t-body");

async function fetchOrders() {
  const apiUrl = "http://localhost:8050/orders/get-allorders";
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
    console.log(data); // Handle response data
    return data; // Return the data if needed
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}

fetchOrders()
  .then((data) => {
    ViewOrders(data);
  })
  .catch((error) => {
    // Handle error
  });

function ViewOrders(orders) {
  var ordersHtml = "";
  orders.forEach((order) => {
    ordersHtml += `<tr>
         <th scope="row">${order.id}</th>
        <td>${order.product.id}</td>
        <td>${order.product.name}</td>
        <td>${order.quantity}</td>
        <td>${order.itemPrice}</td>
        <td>${order.totalPrice}</td>
    </tr>`;
  });
  tbody.innerHTML = ordersHtml;
}


