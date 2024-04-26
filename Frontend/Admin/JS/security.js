const jwtToken = sessionStorage.getItem("token");

if (jwtToken) {
   role = extractpayload(jwtToken)
   if (role != "ADMIN") {
    setTimeout(() => {
        window.location = "../../Admin/form-wizard.html";
      }, 1500);
   }
} else {
    
        window.location = "../../index.html";
     
}

function extractpayload(token) {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    const payload = JSON.parse(decodedPayload);
    console.log(payload);
    return payload.Role;
  }