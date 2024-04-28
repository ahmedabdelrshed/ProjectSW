var username = document.getElementById("username");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
var massage = document.getElementById("massage");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (username.value === "" || password.value === "") {
    massage.style.display = "block";
  } else {
    
    login(username.value, password.value)
      .then((data) => {
        console.log(data.token);
        var role = extractpayload(data.token);
        sessionStorage.setItem("token", data.token);
        // console.log(sessionStorage.getItem("token"));
        Authorization(role);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }
});

async function login(username, password) {
  try {
    const response = await fetch("http://localhost:8050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      massage.style.display = "block";
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    massage.style.display = "block";
  }
}

function extractpayload(token) {
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = atob(payloadBase64);
  const payload = JSON.parse(decodedPayload);
  console.log(payload);
  return payload.Role;
}

function Authorization(role) {
  if (role == "ADMIN") {
    setTimeout(() => {
      window.location = "../Admin/index2.html";
    }, 1500);
  }
  else{
    setTimeout(() => {
      window.location = "../User/index.html";
    }, 1500);
  }
}
function decryptData(encryptedData) {
  var key = CryptoJS.enc.Utf8.parse('ramzyashrafsaifashraf123'); // Convert key to CryptoJS WordArray
  var iv = CryptoJS.enc.Utf8.parse('qwerqwer');
  var decrypted = CryptoJS.TripleDES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(encryptedData)
  }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
// Example usage:
