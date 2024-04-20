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
.then(data => {
    console.log('Login successful:', data);
})
.catch(error => {
    console.error('Login failed:', error);
});
  }  
});

async function login(username, password) {
  try {
      const response = await fetch('http://localhost:8050/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
    massage.style.display = "block";
         
      }
        const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error during login:', error.message);
      massage.style.display = "block";
  }
}

// Example usage:

