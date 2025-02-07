console.log('Client side javascript file is loaded!')
console.log('restart to learn nodejs')
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)
    messageone.textContent = "Loading..."
    messagetwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageone.textContent = data.error
        }
        else{
            messageone.textContent = data.location
            messagetwo.textContent = data.info
        }
        
    })
})
})