<template>
  <div class="home">
    <h1>My Recipes</h1>
    <button @click="togglePopup">Add new Recipe</button>

    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.recipes"
        :key="recipe.slug"
      >
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.description }}</p>
        <div class="button-control">
          <router-link :to="`/recipe/${recipe.slug}`">
            <button>View Recipe</button>
          </router-link>
          <button @click="deleteRecipe(recipe.title)">Edit Recipe</button>
          <button @click="deleteRecipe(recipe.title)">Delete Recipe</button>
        </div>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new recipe</h2>

        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div
              class="ingredient"
              v-for="i in newRecipe.ingredientRows"
              :key="i"
            >
              <input type="text" v-model="newRecipe.ingredients[i - 1]" />
            </div>
            <button type="button" @click="addNewIngredient">
              Add Ingredient
            </button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea v-model="newRecipe.method[i - 1]"></textarea>
            </div>
            <button type="button" @click="addNewStep">Add step</button>
          </div>

          <button type="submit">Add Recipe</button>
          <button type="button" @click="togglePopup">Close</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      newRecipe: {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      },
      popupOpen: false,
    };
  },
  methods: {
    togglePopup() {
      this.popupOpen = !this.popupOpen;
    },
    addNewIngredient() {
      this.newRecipe.ingredientRows++;
    },
    addNewStep() {
      this.newRecipe.methodRows++;
    },
    addNewRecipe() {
      this.newRecipe.slug = this.newRecipe.title
        .toLowerCase()
        .replace(/\s/g, "-");

      if (!this.newRecipe.slug) {
        alert("Please enter a title");
        return;
      }

      console.log(this.newRecipe);

      this.$store.dispatch("ADD_RECIPE", { ...this.newRecipe });

      this.newRecipe = {
        title: "",
        description: "",
        ingredients: [],
        method: [],
        ingredientRows: 1,
        methodRows: 1,
      };

      this.togglePopup();
    },
    deleteRecipe(payload) {
      if (confirm("Are you sure for delete recipe ?")) {
        this.$store.dispatch(
          "DELETE_RECIPE",
          payload.toLowerCase().replace(/\s/g, "-")
        );
      }
    },
  },
};
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #0352ad;
}

.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.button-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.259);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
  max-height: 750px;
  overflow: auto;
}

.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.popup-content .group {
  margin-bottom: 1rem;
}

.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}

.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;
}
</style>
