
//local API URL to access database
const API = "http://localhost:8088"

//create fetch calls to gets users for login & registration and local & session storage
export const getAllUsers= () => {
    return fetch(`${API}/users`)
                .then(res => res.json())
}

export const checkUserEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}

export const existingUserInfo = (user) => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
}

export const sendNewUser = (user) => {
   return fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
}