const span = document.getElementById("sam");

async function fetchOrderTotalPrice() {
  const apiUrl = "http://localhost:8050/api/orders/total-price"; // Corrected API URL
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

fetchOrderTotalPrice()
  .then((totalPrice) => {
    ViewData(totalPrice);
  })
  .catch((error) => {
    console.error("Error fetching total order price:", error);
    // Handle error
  });

function ViewData(totalPrice) {
  span.innerText = totalPrice;
}
