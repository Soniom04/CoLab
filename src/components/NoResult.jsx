import React from "react"
import noResultImg from "../assets/noResultImg.png"

const NoResult = ()=>{
    return(
        <div className="mx-auto mt-20 w-96">
            <img src={noResultImg}/>
        </div>
    )
}

export default NoResult;