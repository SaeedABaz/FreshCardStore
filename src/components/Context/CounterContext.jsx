import { createContext, useState } from "react";


export const CounterContext = createContext();


export default function CounterContextProvider({children}){
    const [nameOne, setNameOne] = useState("Saeed")
    const [nameTwo, setNameTwo] = useState("Ahmed")

    return (
        <CounterContext.Provider value={{nameOne, setNameOne , nameTwo, setNameTwo}}>

            {children}
        </CounterContext.Provider>

    );
}