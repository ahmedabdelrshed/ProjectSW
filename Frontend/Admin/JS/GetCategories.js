var tbody = document.getElementById("t-body");

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
  categories.forEach((categorie) => {
    categorieshtml += `<tr>
         <th scope="row">${categorie.id}</th>
        <td>${categorie.name}</td>
        <td>${categorie.description}</td>
        <td>
        <a href="../../Admin/Updatecategorie.html">  <button type="button" class="btn btn-success btn-sm"
        onClick="update(${categorie.id},'${categorie.name}','${categorie.description}')">Update</button><a/>
        
            <button type="button" class="btn btn-danger btn-sm"  onClick="deleteCategory(${categorie.id})" >Delete</button>
        </td>
    </tr>`;
  });
  tbody.innerHTML = categorieshtml;
}

function update(id, name, description) {
  var categorie = {
    id: id,
    name: name,
    description: description,
  };
  console.log(JSON.stringify(categorie));
  localStorage.setItem("categorie", JSON.stringify(categorie));
}

async function deleteCategory(id) {
  const apiUrl = `http://localhost:8050/categorie/manage/${id}/delete`;
  const jwtToken =sessionStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();
    console.log(data);
    fetchCategories()
      .then((data) => {
        ViewCategories(data);
      })
      .catch((error) => {});
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
