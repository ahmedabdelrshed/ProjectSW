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
  fetchData(nameCategorie.value, description.value)
    .then((data) => {
    validatename.textContent = "Name cannot be empty";
        setTimeout(() => {
            window.location = "Categories.html";
          }, 1500);
    })
    .catch((error) => {
      // console.error("There was a problem with the fetch operation:", error);
      //   console.error("Response body:", error.message);
    });
});

async function fetchData(name, description) {
  const apiUrl = "http://localhost:8050/categorie/manage/add";
  const jwtToken =sessionStorage.getItem("token");

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
    } else {
      validatename.style.display = "none";
      return await response.text();
    }
  } catch (error) {
    console.error(error);
  }
}
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
}
