import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
const apivalue = createContext();

function AllData({children}) {
    const [api,setapi] =useState([]);
    useEffect( ()=>{
        axios.get('https://dummyjson.com/products').then ((result)=>{
            setapi(result.data.products);
        });
    },[]);
  return(
     <apivalue.Provider value={api}>
        {children}
    </apivalue.Provider>
    )
}

export  {AllData,apivalue};
