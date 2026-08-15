const searchInput = document.querySelector('#search-input')
const contactList = document.querySelector('#contact-list')
const contacts = document.querySelectorAll('.contact')

//searchInput.addEventListener(EVENTO, FUNCION)
searchInput.addEventListener('input', function(event) {
    const query = event.target.value.toLowerCase()

    contacts.forEach( function(contact) {
        const name = contact.querySelector('.name').textContent.toLowerCase()
        //por correo
        const email = contact.querySelector('.email').textContent.toLowerCase()
        
        const coincidencias = name.includes(query) || email.includes(query)
        


        console.log(name)

        if (coincidencias) {
            contact.classList.remove('hidden')

        } else {
            contact.classList.add('hidden')
        }
    })



})