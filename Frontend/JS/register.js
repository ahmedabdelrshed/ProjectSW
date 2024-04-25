var username = document.getElementById("username");
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
var massage = document.getElementById("massage");
var role = "USER";

submit.addEventListener("click", function (e) {
  e.preventDefault();
  if (username.value === "" || firstName.value === "" || lastName.value === "" || password.value === "") {
    massage.style.display = 'block'
  }else{
    register(firstName.value, lastName.value, username.value, password.value)
    .then(data => {
        setTimeout(() => {
          window.location = 'index.html'
      }, 1500);
       
    })
    .catch(error => {
        console.error('Registration failed:', error);
      massage.style.display = "block";
    });
  }
});

async function register(firstName, lastName, username, password) {
  try {
      const response = await fetch('http://localhost:8050/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ firstName, lastName, username, password ,role})
      });

      if (!response.ok) {
        massage.style.display = "block";
      }

      const data = await response.text();
      return data;
  } catch (error) {
      console.error('Error during registration:', error.message);
    massage.style.display = "block";
     
  }

}


