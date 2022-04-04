
//local API URL to access database
const API = "https://wax-api-bcskd.ondigitalocean.app"

//create fetch calls to gets users for login & registration and local & session storage
export const getAllUsers= () => {
    return fetch(`${API}/users`)
                .then(res => res.json())
}

export const checkUserEmail = (email) => {
    return fetch(`${API}/users?email=${email}`)
            .then(res => res.json())
}

export const existingUserInfo = (user) => {
    return fetch(`${API}/users?email=${user.email}`)
            .then(res => res.json())
}


export const sendNewUser = (user) => {
   return fetch("https://wax-api-bcskd.ondigitalocean.app/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
}