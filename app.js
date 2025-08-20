class Recipe {
  constructor(resource, search) {
    this.resource = resource;
    this.search = search.value;
  }

  async getApi() {
    const response = await axios.get(this.resource, {
      params: { s: this.search },
    });
    return response.data;
  }

  displayResults() {
    this.getApi()
      .then((data) => {
        document.getElementById("mealResults").innerHTML = "";
        document.getElementById("mealError").innerHTML = "";

        for (const meal of data.meals) {
          // creating elements
          // console.log(meal.strMealThumb);
          const div = document.createElement("div");
          div.classList.add("card");
          const imgThumb = document.createElement("img");
          imgThumb.src = meal.strMealThumb;
          const h1 = document.createElement("h1");
          h1.style.alignItems = "center";
          h1.textContent = meal.strMeal;
          const p = document.createElement("p");
          p.style.fontSize = "1.3rem";
          p.textContent = meal.strInstructions;

          div.appendChild(imgThumb);
          div.appendChild(h1);
          div.appendChild(p);

          document.getElementById("mealResults").appendChild(div);
        }
      })
      .catch((err) => {
        document.getElementById("mealError").textContent =
          "Recipe can't be found!";
        // console.log("Recipe can't be found!");
      });
  }
}

const form = document.getElementById("mealForm");
const mealQuery = document.getElementById("mealQuery");

form.addEventListener("submit", (e) => {
  const recipe = new Recipe(
    "https://www.themealdb.com/api/json/v1/1/search.php",
    mealQuery
  );
  e.preventDefault();
  recipe.displayResults();
  mealQuery.value = "";
});
