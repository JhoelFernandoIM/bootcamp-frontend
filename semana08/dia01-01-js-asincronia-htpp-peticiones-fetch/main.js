//OBJETIVO: Consultar información en formato JSON desde un servicio web su URL

console.log(fetch('https://jsonplaceholder.typicode.com/posts')) // promise {<pending>} -> devuelve una promesa (Promsie)

//Estados de una promesa -> pending, fulfilled(OK), rejected (Falló)

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json()) // se ejecuta caundo la respuesta llegó correctamente y además convertimos la respuesta a un objeto JS
    .then(data => {
        console.log(data)
        console.log(data[0])
        console.log(data[0].title)
    })

//TODO: Renderizar la lista posts del servicio jsonplaceholder con sus campos titulo, id y body

const renderPosts = (posts = []) => {
    const divApp = document.querySelector('#app')

    let postList = ''

    posts.forEach(post => {
        postList = postList + `
        <div>
            <h2>${post.id} - ${post.title}</h2>
            <p>${post.body}</p>
        </div>` 

    })
    
    divApp.innerHTML = postList
}


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json()) // se ejecuta caundo la respuesta llegó correctamente y además convertimos la respuesta a un objeto JS
    .then(data => {
        console.log(data)
        renderPosts(data)
    })

//TODO: Renderizar la lista de todos del servicio jsonplaceholder con su titulo, id

// URL: https://jsonplaceholder.typicode.com/todos

const renderTodos = (posts = []) => {
    const divTodos = document.querySelector('#todos')

    let postList = ''

    posts.forEach(post => {
        postList = postList + `
        <div>
            <h2>${post.id} - ${post.title}</h2>
        </div>` 

    })
    
    divTodos.innerHTML = postList
}

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())

    .then (data => {
        renderTodos(data)
    })