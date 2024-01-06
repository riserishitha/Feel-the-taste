let afterFunction = "";
let aftereveryFunction = "";
// async function to randomly get the menu item 
async function getMenudata(gathering) {
  // try and catch is used if the given api is not working then the catch we take the error
  try {
    let totalMenu = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    );
    // to display the output on windows
    displaySingle(totalMenu.data.meals[0]);
  } catch (error) {
    // console.error(error);
  }
}
// onload the function will run
document.addEventListener("DOMContentLoaded", function () {
  getMenudata();
});
document.getElementById("searchButton").addEventListener("click", getData);

function getData() {
  let inputValue = document.getElementById("takeInput").value;
  getMenudata(inputValue);
}
function displaySingle(intake) {
    let menuItems = document.getElementById("showing");
    let imgofItem = intake.strMealThumb;
    let nameofItem = intake.strMeal;  
// Open modal with ingredients on image click
    menuItems.innerHTML = "";
    menuItems.innerHTML = `<div id="dishImage">
  <img src="${imgofItem}" alt="${imgofItem}" id="imageClick"/>

  <p id="dishName">${nameofItem}</p>
</div>`;
document.getElementById("imageClick").addEventListener("click",function(){
openModal(nameofItem, intake.strInstructions, intake.strIngredient1, intake.strIngredient2, intake.strIngredient3, intake.strIngredient4,intake.strIngredient5,intake.strIngredient6,intake.strIngredient7,intake.strIngredient8,intake.strIngredient9,intake.strIngredient10, intake.strIngredient11, intake.strIngredient12, intake.strIngredient13, intake.strIngredient14,intake.strIngredient15,intake.strIngredient16,intake.strIngredient17,intake.strIngredient18,intake.strIngredient19,intake.strIngredient20);
document.getElementById("randomitem").style.display = "none"
})
}
// to open a pop modal to show ingredients and also preparation of the item
function openModal(name, instructions, ...ingredients) {
    let modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>
    <h2>${name}</h2> 
    <div>   
        <ul>
        <h3>Ingredients:</h3>
            ${ingredients.map(ingredient => `<ul>${ingredient}</ul>`).join('')}
        </ul>
        <p class="instruction"><h3>Instructions:</h3> ${instructions}</p>
        </div>`;
    document.getElementById("myModal").style.display = "block";
}
// to close the modal when clicking onit 
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("randomitem").style.display = "block";
    closeButton.style.display = "none";
  }
  
// async function related to the category api

async function menuData(a) {
  try {
    let allMenu = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${a}`
    );
    // to diplay all the items related to the searched category
    displayMultiple(allMenu.data.meals);
  } catch (error) {
    // console.error(error);
  }
}

// to show the results when clicking on the search button

document.getElementById("searchButton").addEventListener("click", takeData);

function takeData() {
  let inputTaken = document.getElementById("takeInput").value;
  menuData(inputTaken);
}

    // to diplay all the items related to the searched category

function displayMultiple(meals) {
  let menuItem = document.getElementById("menuCategory");
  menuItem.innerHTML = "";

  if (!meals || meals.length === 0) {
    let show = document.getElementById("notShow");
    show.innerHTML += `<p>Sorry 🙅🏻 No Results Found 😥</p>`;
  } else {
    meals.forEach((meal) => {
      let imagesofItem = meal.strMealThumb;
      let nameoftheItem = meal.strMeal;

      menuItem.innerHTML += `
        <div class="dishItem">
          <img src="${imagesofItem}" alt="${nameoftheItem}" id="dishItem"/>
          <p id="dishName">${nameoftheItem}</p>
        </div>`;
    });
  }
}

