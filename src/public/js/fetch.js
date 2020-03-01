const signin = () => {
    let username = document.getElementById('usernamesi').value
    let email = document.getElementById('emailsi').value
    let password = document.getElementById('passwordsi').value
    document.getElementById('data').innerHTML = `<p>Informacion enviada: </p><br>
    <p>Username: ${username}</p><br>
    <p>Email: ${email}</p><br>
    <p>Password: ${password}</p><br>
    `
    fetch('/signup',{
        method : 'POST',
        body : JSON.stringify({
            username,
            email,
            password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        document.getElementById('res').innerHTML = res.token
    })
    return false
}

const me = () => {
    let token = document.getElementById('tokenme').value
    document.getElementById('data').innerHTML = `<p>Informacion enviada: </p><br>
    <p>Token: ${token}</p><br>
    `
    fetch('/me',{
        method : 'GET',
        headers:{
            'x-access-token': token
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res.message)
        document.getElementById('res').innerHTML = res.message
    })
    return false
}

const authenticate = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    document.getElementById('data').innerHTML = `<p>Informacion enviada: </p><br>
    <p>Email: ${email}</p><br>
    <p>Password: ${password}</p><br>
    `
    fetch('/signin',{
        method : 'POST',
        body : JSON.stringify({
            email,
            password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        
    })
    return false
}

const cls = () => {
    document.getElementById('tokenme').value =''
}