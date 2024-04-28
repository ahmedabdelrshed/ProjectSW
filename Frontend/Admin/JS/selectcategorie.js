
var select = document.getElementById("selectcategorie");

async function fetchCategories() {
    const apiUrl = "http://localhost:8050/categorie/get";
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
  
  var categories = [];
  
  fetchCategories()
    .then((data) => {
      ViewCategories(data);
    })
    .catch((error) => {
      // Handle error
    });
  
  function ViewCategories(categories) {
    var categorieshtml = [];
    categorieshtml = `<option value="0">Choose Categorie</option>`
    categories.forEach((categorie) => {
      var decryptedName = decryptData(categorie.name);
      categorieshtml += `
      <option value="${categorie.id}">${decryptedName}</option>
         `;
    });
    select.innerHTML = categorieshtml;
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
  