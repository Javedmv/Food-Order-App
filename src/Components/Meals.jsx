import { useState } from "react";
import { useEffect } from "react";
import Mealitem from "./Mealitem";

export default function Meals(){
    const [mealsData, setMealsData] = useState([])
    
    useEffect(() => {
        async function fetchMeals () {
            const response = await fetch("http://localhost:3000/meals")
            if(!response.ok){
                return;
            }
    
            const resData = await response.json();
            setMealsData(resData)
        }
        fetchMeals();
    },[])

    return (
        <>
            <ul id="meals">
                {mealsData.map((meal) => (<Mealitem key={meal.id} meal={meal} />))}
            </ul>
        </>
    )
}