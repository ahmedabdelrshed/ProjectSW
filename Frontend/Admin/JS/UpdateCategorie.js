var nameCategorie = document.getElementById("name");
var description = document.getElementById("desc");

var updatebutton = document.getElementById("update");
var validatename = document.querySelector(".name-validation");
var validatedesc = document.querySelector(".des-validation");
var successmsg = document.getElementById("success");
var categorie = JSON.parse(localStorage.getItem("categorie"));

nameCategorie.value = categorie.name;
description.value = categorie.description;

updatebutton.addEventListener("click", function (e) {
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
  updateCategory(categorie.id, nameCategorie.value, description.value)
    .then((data) => {
        successmsg.innerHTML = "Categorie Updated successfully"
        setTimeout(() => {
            window.location = "Categories.html";
          }, 1500);
    })
    .catch((error) => {});
});

async function updateCategory(id, name, description) {
  const apiUrl = `http://localhost:8050/categorie/manage/${id}/update`;
  const jwtToken =sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      return;
    }

    const data = await response.text(); 
    console.log(data); 
    return data; 
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; 
  }
}
