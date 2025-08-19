class Recipe {
  constructor(resource, search) {
    this.resource = resource;
    this.search = search;
  }

  async getApi() {
    const response = await axios.get(this.resource, {
      params: { s: this.search },
    });
    return response.data;
  }

  displayResults() {
    this.getApi().then((data) => {
      for (const meal of data.meals) {
        console.log(meal.strMeal);
        console.log(meal.strInstructions);
      }
    });
  }
}

const recipe = new Recipe(
  "https://www.themealdb.com/api/json/v1/1/search.php",
  "chicken"
);

recipe.displayResults();

axios
  .get("https://www.themealdb.com/api/json/v1/1/search.php", {
    params: { s: "chicken" },
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
