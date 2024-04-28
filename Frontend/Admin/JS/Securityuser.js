const jwtToken = sessionStorage.getItem("token");

if (jwtToken) {
  role = extractpayload(jwtToken);
  if (role != "USER") {
    window.location = "../../Admin/form-wizard.html";
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

//////////// log out ////////////

function logout() {
  // e.preventDefault()
  sessionStorage.clear();
  setTimeout(() => {
    window.location = "../../index.html";
  }, 1000);
}


