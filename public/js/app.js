const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("/weather?address=" + location).then((response) =>{
    response.json().then((data) =>{
        if (data.error){
            messageTwo.textContent = data.error
        }else {
            messageOne.textContent = data.forecast + '. It is currently ' + data.temperature + ' degrees in '+ data.location + 
            '. The humidity is at ' + data.humidity + '% and the wind speed is ' + data.wind + 'Km/h'
        }
    })
})
})

