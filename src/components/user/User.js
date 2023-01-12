import { cleanup } from "@testing-library/react";
import React, { useEffect, useState } from "react";

const RANDOM_USER_API = "https://randomuser.me/api"

function User(props){

    const [name, setName] = useState("sample name")
    const [email, setEmail] = useState("sample email")
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState("CREATED")

    function updateCount(currentCount){
        
        setCount(currentCount + 1)
    }

    function logger(){
        setStatus("LOADING...")
        fetch(RANDOM_USER_API)
            .then((response) => response.json())
            .then((data) => {
                const results = data.results
                const user = results[0]
                const userName = `${user.name.title} ${user.name.first} ${user.name.last}`
                const userEmail = user.email

                setName(userName)
                setEmail(userEmail)

            })

            return function cleanup(){
                console.log("cleanup")
                setStatus("COMPLETE")
            }

    }

    useEffect(logger, [count])
    useEffect(logger, [name])

    // const componentDidUpdate = () => {

    // }

    


    return(
        <div>
            <center>
                <h2>NAME: {name}</h2>
                <h5>EMAIL: {email}</h5>
                <h2>STATUS: {status}</h2>
                <button onClick={() => updateCount(count)}>RANDOMIZE</button>
            </center>
        </div>
    )

}

export default User





