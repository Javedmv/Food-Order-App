import { useState } from "react";
import { useEffect } from "react";

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
                {mealsData.map((meal) => (<li key={meal.id}>{meal.name}</li>))}
            </ul>
        </>
    )
}