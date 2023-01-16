import React, { useEffect, useState } from "react";

const RANDOM_USER_API = "https://randomuser.me/api"

function User(props){

    const [name, setName] = useState("sample name")
    const [email, setEmail] = useState("sample email")
    const [count, setCount] = useState(0)

    function updateCount(currentCount){
        setCount(currentCount + 1)
    }

    function fetchUser(){
        fetch(RANDOM_USER_API)
            .then((response) => response.json())
            .then((data) => {
                setName(data.results[0].name.first)
                setEmail(data.results[0].email)
            })
    }

    useEffect( fetchUser, [count] )

    return(
        <div>
            <center>
                <h2>NAME: {name}</h2>
                <h5>EMAIL: {email}</h5>
                <button onClick={() => updateCount(count)}>RANDOMIZE</button>
            </center>
        </div>
    )

}

export default User