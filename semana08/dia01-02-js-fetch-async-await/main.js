const url = 'https://jsonplaceholder.typicode.com/users'

// fetch(url)
//     .then(respuesta => respuesta.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => {
//         console.log(error)
//     })

const fetchUserSinRetorno = async () => {
    const response = await fetch(url)

    const data = await response.json()

    console.log(data)
}

fetchUserSinRetorno()

const fetchUserConRetorno = async () => {
    const response = await fetch(url)

    return await response.json()
}


// fetchUserConRetorno()//retorna una promesa
//     .then(users => console.log(users))

const renderUsers = (users = []) => {
    const divApp = document.querySelector('#app')

    let userLists = ''

    users.forEach(user => {
        userLists = userLists + `
            <div>
                <h2>${user.id} - ${user.name}</h2>
                <p>${user.company.name}</p>
            </div>`
    })

    divApp.innerHTML = userLists

}

const fetchUsersConManejoDeErrores = async () => {
    try {
        const response = await fetch(url)

        console.log(response.status)

        if (response.status === 404) {
            console.log('Tuvimos problemas para caragar el recurso users')
            throw new Error('ERROR HTTP: ' + response.status)
        }

        return await response.json()

    } catch (error) {
        console.log(error)
    }
}

fetchUsersConManejoDeErrores()
    .then(users => {
        console.log(users)
        renderUsers(users)
    })