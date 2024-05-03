async function fetchOrdersAndCalculateTotal() {
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
      const totalPrice = calculateTotalPrice(data); // Calculate total price
      displayTotalPrice(totalPrice); // Display total price
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Handle error
    }
  }
  
  function calculateTotalPrice(orders) {
    let total = 0;
    orders.forEach((order) => {
      total += order.totalPrice;
    });
    return total;
  }
  
  function displayTotalPrice(totalPrice) {
    const totalElement = document.getElementById("total");
    if (totalElement) {
      totalElement.textContent = totalPrice + "$";
    }
  }
  
  fetchOrdersAndCalculateTotal();