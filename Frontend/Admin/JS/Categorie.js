var nameCategorie = document.getElementById("name");
var description = document.getElementById("desc");

var add = document.getElementById("add");
var validatename = document.querySelector(".name-validation");
var validatedesc = document.querySelector(".des-validation");

add.addEventListener("click", function (e) {
  e.preventDefault();
  if (nameCategorie.value === "") {
    validatename.textContent = "Name cannot be empty";
    validatename.style.display = "block";
    return;
  }
  if (description.value === "") {
    validatedesc.style.display = "block";
    return;
  }
  var encryptedName = encryptData(nameCategorie.value);
  var encryptedDescription = encryptData(description.value);
  fetchData(encryptedName, encryptedDescription)
    .then((data) => {
     
     
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

async function fetchData(name, description) {
  const apiUrl = "http://localhost:8050/categorie/manage/add";
  const jwtToken = sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
    if (response.status === 400) {
      validatename.textContent = await response.text();
      validatename.style.display = "block";
      return;
    } else {
    validatename.style.display = "none";
    setTimeout(() => {
      window.location = "Categories.html";
    }, 1500);
    return await response.text();
  }
  } catch (error) {
    console.error("Fetch operation failed:", error.message);
    throw error;
  }
}



function encryptData(name) {
  var key = CryptoJS.enc.Utf8.parse("ramzyashrafsaifashraf123"); // Convert key to CryptoJS WordArray
  var iv = CryptoJS.enc.Utf8.parse("qwerqwer"); // Convert IV to CryptoJS WordArray

  var encrypted = CryptoJS.TripleDES.encrypt(
    CryptoJS.enc.Utf8.parse(name),
    key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}
