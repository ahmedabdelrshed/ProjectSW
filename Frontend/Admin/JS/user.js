var tbody = document.getElementById("t-body");

async function fetchUsers() {
  const apiUrl = "http://localhost:8050/USER"; // Assuming this is the correct API endpoint
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

fetchUsers()
  .then((data) => {
    ViewUsers(data);
  })
  .catch((error) => {
    // Handle error
  });

function ViewUsers(users) {
  var usersHtml = "";
  users.forEach((user) => {
    var decryptedName = decryptData(user.firstName);
    var decryptedFName = decryptData(user.lastName);
    var decryptedLName = decryptData(user.username);
    usersHtml += `<tr>
         <th scope="row">${user.id}</th>
        <td>${decryptedName}</td>
        <td>${decryptedFName}</td>
        <td>${decryptedLName}</td>
    </tr>`;
  });
  tbody.innerHTML = usersHtml;
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