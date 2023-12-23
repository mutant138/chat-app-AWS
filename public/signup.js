async function signup(e){
     try {
        e.preventDefault()
        const signupDetails = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const res = await axios.post('/signup', signupDetails)
        if(res.status >= 200 && res.status <300){
            alert(res.data.message)
            window.location.href = '/login'
        }else{
            throw new Error ("Failed to signup")
        }
        //console.log(res.data)
     } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to signup";
        document.getElementById('error-alert').innerText =   errorMessage //error.response.data.message;
        document.getElementById('error-alert').style.display = 'block';
        console.log(error)
     }
}