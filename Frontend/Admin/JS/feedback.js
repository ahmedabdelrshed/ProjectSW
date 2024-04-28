var tbody = document.getElementById("t-body");

async function fetchFeedback() {
  const apiUrl = "http://localhost:8050/feedback/get";
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

    const data = await response.json(); 
    console.log(data); 
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; 
  }
}
var feedbackList = [];
fetchFeedback()
  .then((data) => {
    ViewFeedback(data);
  })
  .catch((error) => {
    console.error("Error fetching feedback:", error);
    // Handle error
  });

function ViewFeedback(feedbackList) {
  var feedbackHtml = "";
  feedbackList.forEach((feedback) => {
    var decryptedName = decryptData(feedback.text);
    feedbackHtml += `
      <tr>
        <th scope="row">${feedback.id}</th>
        <td>${feedback.raterange}</td>
        <td>${decryptedName}</td>
      </tr>
    `;
  });
  tbody.innerHTML = feedbackHtml;
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
  

