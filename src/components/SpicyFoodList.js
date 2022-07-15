import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");
  /* foodsToDisplay is a new array that has gone through 
filtering according to the user select value*/
  const foodsToDisplay = foods.filter((food)=>
  {
    if (filterBy === "ALL")
    {
      return true;
    }else {
      return food.cuisine === filterBy;
    }
  });
//A function that would handle the filter change in the select DOM element
function handleFilterChange(event){
  setFilterBy(event.target.value)
}
  //A function to add food to our state when a button is clicked
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)   
  }
  //A function that will remove elements from arrays in state
  /*The element clicked has an id and therefore if this id is passed to 
  handleLiClick we filter it out using the filter method.*/
  function handleLiClick(id){
    const newFoodArray = foods.filter((food) => food.id !== id)
    setFoods(newFoodArray)
  }
//A sample function that would update elements in an array in state
  function handleUpdateArray (){
    const newFoodArray = foods.map(food=> {
      if(food.id === id){
        return {
          ...food,
          heatLevel : food.heatLevel + 1
        };}
        else{
          return food;
        }
    })
      setFoods(newFoodArray)
  }

  // Iterating through our array to give us a list of foods
  // const foodList = foods.map((food) => (
  //   <li key={food.id} onClick={() => handleLiClick(food.id)}>
  //     {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  //   </li>
  // ));
  
  //Displays a list according to the select value of the user
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));
  
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select name = "filter" onChange={handleFilterChange}>
        <option value ="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
