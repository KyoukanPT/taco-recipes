import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    recipeName : "",
    proteinName : "",
    proteinPreparation : "",
    salsaName: "",
    everyOtherTopping: "",
  });
});

app.post("/recipe", (req, res) => {
  var choice = req.body.choice;
  var recipes = JSON.parse(recipeJSON);
  var choiceNumber = null;

  if (choice === "chicken") {
    choiceNumber = 0
  } else if (choice === "beef") {
    choiceNumber = 1
  }
  else {
    choiceNumber = 2
  }
  
  var toppings = function() {
    var toppingsLength = recipes[choiceNumber].ingredients.toppings.length;
    var toppingsArray = [];
    for (let i = 0; i <= toppingsLength - 1; i++) {
      toppingsArray.push(recipes[choiceNumber].ingredients.toppings[i].quantity + " of " + recipes[choiceNumber].ingredients.toppings[i].name);
  }
  return toppingsArray;
}

  res.render("index.ejs", {
    recipeName : recipes[choiceNumber].name,
    proteinName : recipes[choiceNumber].ingredients.protein.name,
    proteinPreparation : recipes[choiceNumber].ingredients.protein.preparation,
    salsaName : recipes[choiceNumber].ingredients.salsa.name,
    everyOtherTopping : toppings()
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
