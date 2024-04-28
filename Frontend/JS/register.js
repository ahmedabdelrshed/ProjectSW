var username = document.getElementById("username");
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
var massage = document.getElementById("massage");
var role = "USER";

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    username.value === "" ||
    firstName.value === "" ||
    lastName.value === "" ||
    password.value === ""
  ) {
    massage.style.display = "block";
  } else {
    var encryptedUsername = encryptData(username.value);
    register(firstName.value, lastName.value, encryptedUsername, password.value)
      .then((data) => {})
      .catch((error) => {
        console.error("Registration failed:", error);
        massage.style.display = "block";
      });
  }
});

async function register(firstName, lastName, username, password) {
  try {
    const response = await fetch("http://localhost:8050/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, username, password, role }),
    });

    if (!response.ok) {
      massage.style.display = "block";
    }

    const data = await response.json();
    if (data.token == "User already exists") {
      massage.textContent = data.token;
      massage.style.display = "block";
    } else if (data.token == "Please Enter a valid Email Address") {
      massage.textContent = data.token;
      massage.style.display = "block";
    } else if (data.token == "Password Must be at Least 8 Character") {
      massage.textContent = data.token;
      massage.style.display = "block";
    } else if (data.token == "Please Enter a valid Name") {
      massage.textContent = data.token;
      massage.style.display = "block";
    } else {
      console.log(data);
      setTimeout(() => {
        window.location = "index.html";
      }, 1500);
      return data;
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    massage.style.display = "block";
  }
}
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.firstName = "BadRequestError";
  }
}

function encryptData(firstName) {
  var key = CryptoJS.enc.Utf8.parse("ramzyashrafsaifashraf123"); // Convert key to CryptoJS WordArray
  var iv = CryptoJS.enc.Utf8.parse("qwerqwer"); // Convert IV to CryptoJS WordArray

  var encrypted = CryptoJS.TripleDES.encrypt(
    CryptoJS.enc.Utf8.parse(firstName),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}
