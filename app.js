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
        for (const meal of data.meals) {
          console.log(meal.strMeal);
          console.log(meal.strInstructions);
        }
      })
      .catch((err) => {
        console.log("Recipe can't be found!");
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
