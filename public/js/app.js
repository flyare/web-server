const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message01 = document.querySelector("#message-01")
const message02 = document.querySelector("#message-02")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    message01.textContent = "Loading..."
    message02.textContent = ""

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message01.textContent = data.error
            } else {
                message01.textContent = data.location
                message02.textContent = `latitude: ${data.latitude} longitude: ${data.longitude}`
            }
        })
    })
    
})