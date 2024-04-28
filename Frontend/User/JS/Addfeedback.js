var range = document.getElementById("range")
var feedback = document.getElementById("feedback")
var add = document.getElementById("sendfeedback")
var msg = document.getElementById('msg')
add.addEventListener('click' ,function(e){
    e.preventDefault()
if (range.value == '') {
    msg.classList = 'text-danger'
    msg.innerText = "Please Enter The range";
    return;
}
if (feedback.value == '') {
    msg.classList = 'text-danger'
    msg.innerText = "Please Enter The Feedback";
    return;
}
var encryptedtext = encryptData(feedback.value);
addfeedback(range.value,encryptedtext).then((data) => {
   console.log(data);
    })
    .catch((error) => {
      // console.error("There was a problem with the fetch operation:", error);
      //   console.error("Response body:", error.message);
    });;
})

async function addfeedback(raterange, text) {
    const apiUrl = "http://localhost:8050/feedback/add";
    const jwtToken =sessionStorage.getItem("token");
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raterange, text }),
      });
      msg.classList = 'text-primary'
        msg.textContent = await response.text();
        return await response.text();
       
    } catch (error) {
      console.error(error);
    }
  }
  function encryptData(firstName) {
    var key = CryptoJS.enc.Utf8.parse('ramzyashrafsaifashraf123'); // Convert key to CryptoJS WordArray
    var iv = CryptoJS.enc.Utf8.parse('qwerqwer'); // Convert IV to CryptoJS WordArray
  
    var encrypted = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(firstName), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  
    return encrypted.toString();
  }
  function encryptData(firstName) {
    var key = CryptoJS.enc.Utf8.parse('ramzyashrafsaifashraf123'); // Convert key to CryptoJS WordArray
    var iv = CryptoJS.enc.Utf8.parse('qwerqwer'); // Convert IV to CryptoJS WordArray
  
    var encrypted = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(firstName), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  
    return encrypted.toString();
  }
  
  