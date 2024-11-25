// Smoothie class definition
class Smoothie {
    constructor(name, size, ingredients, base) {
        this.name = name;
        this.size = size;
        this.ingredients = ingredients;
        this.base = base;
        this.price = 5; // base price
    }

    // Method to calculate the price of the smoothie
    calculatePrice() {
        this.price += this.ingredients.length * 1.5; // $1.5 for each ingredient
        return this.price.toFixed(2); // Return price rounded to 2 decimal places
    }

    // Method to describe the smoothie
    describe() {
        return `
            Size: ${this.size} <br>
            Base: ${this.base} <br>
            Ingredients: ${this.ingredients.join(', ')} <br>
        `;
    }
}

// Images object for each ingredient
const images = {
    Banana: 'banana.jpg',
    Strawberry: 'strawberry.jpg',  // Correct image path for Strawberry
    Blueberry: 'blueberry.jpg',
    Mango: 'mango.jpg',
    Spinach: 'spinach.jpg',
};

// Function to update the ingredient images display
function updateIngredientImages() {
    const selectedIngredients = document.querySelectorAll("input[name='ingredients']:checked");
    const imageContainer = document.getElementById("ingredients-images");
    imageContainer.innerHTML = ''; // Clear previous images

    selectedIngredients.forEach((checkbox) => {
        const ingredient = checkbox.value;
        const img = document.createElement("img");
        img.src = images[ingredient]; // Use the correct image based on selected ingredient
        img.alt = ingredient;
        imageContainer.appendChild(img);  // Display the image next to the form
    });
}

// Listen for changes on the ingredient checkboxes
const ingredientCheckboxes = document.querySelectorAll(".ingredient");
ingredientCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateIngredientImages);
});

// Form submission to create and display the smoothie
document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value;
    const size = document.querySelector("input[name='size']:checked").value;
    const base = document.querySelector("input[name='base']:checked").value;
    const selectedIngredients = Array.from(document.querySelectorAll("input[name='ingredients']:checked")).map(input => input.value);

    // Create smoothie object
    const smoothie = new Smoothie(name, size, selectedIngredients, base);

    // Display order summary
    document.getElementById("order-summary").style.display = "block";
    document.getElementById("order-output").innerHTML = `${name}, your smoothie is ready! <br> ${smoothie.describe()}`;
    document.getElementById("bill-output").innerHTML = `Total Bill: $${smoothie.calculatePrice()}`;
});
