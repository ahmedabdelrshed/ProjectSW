var confirum = document.getElementById("Confirm");
confirum.addEventListener("click", () => {
  const emailMessage = getEmailMessage({});
  var to = extractemail();

  var currentDate = new Date();
  var oneWeekLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Adding milliseconds for one week
  var formattedDate = `${
    oneWeekLater.getMonth() + 1
  }/${oneWeekLater.getDate()}/${oneWeekLater.getFullYear()}`;

  // Modify the subject string with the updated date
  var subject = `Dear , Your Order From Our Website will be send at ${formattedDate}`;
  var message = emailMessage;
  fetch("https://sendmail-api-docs.vercel.app/api/send", {
    method: "POST",
    body: JSON.stringify({
      to,
      subject,
      message,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  alert("Check Your Email Address");
});

var orders = JSON.parse(localStorage.getItem("cart_items"));
const getEmailMessage = () => {
  const tableRows = orders
    .map((order) => {
      return `
            <tr>
                <td>${order.id}</td>
                <td>${order.name}</td>
                <td>${order.count}</td>
                <td>${order.price}</td>
            </tr>
        `;
    })
    .join("");
  return `
    <table class="table">
    <thead>
        <tr>
            <th scope="col">product_ID</th>
            <th scope="col">product_Name</th>
            <th scope="col">quantity</th>
            <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody id="t-body">
    <tbody id="t-body">
    ${tableRows} 
</tbody>

    </tbody>
</table>
    `;
};

function extractemail() {
  var token = sessionStorage.getItem("token");
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = atob(payloadBase64);
  const payload = JSON.parse(decodedPayload);
  console.log(payload);
  return payload.sub;
}