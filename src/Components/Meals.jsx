import { useState } from "react";
import { useEffect } from "react";
import Mealitem from "./Mealitem";
import useHttp from "./Hooks/useHttp";
import Error from "./Error.jsx"

const requestConfig = {};

export default function Meals(){
    const {data: mealsData, isLoading, error} = useHttp("http://localhost:3000/meals", requestConfig, []);

    if(isLoading){
        return <p className="center">Fetching meals...</p>
    }
    if(error){
        <Error title="Failed to fetch meals" message={error}/>
    }

    return (
        <>
            <ul id="meals">
                {mealsData.map((meal) => (<Mealitem key={meal.id} meal={meal} />))}
            </ul>
        </>
    )
}