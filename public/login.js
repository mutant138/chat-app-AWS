
async function login(e){
    try {
        e.preventDefault()
        
    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    const res = await axios.post('/login',loginDetails)
    if(res.status >= 200 && res.status <300){
        const alert = document.getElementById('alert-success')
        alert.style.display = 'block'
        
        localStorage.setItem('Token', res.data.token)
        window.location.href = '/home'
    }
    } catch (error) {
        errorMessage = error.response?.data?.message || "Failed to signup";
        document.getElementById('error-alert').innerText =   errorMessage //error.response.data.message;
        document.getElementById('error-alert').style.display = 'block';
        console.log(error)
    }
    
}