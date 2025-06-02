function auth(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //condition
    if(email == "admin@gmail.com" && password == "admin123"){
        window.location.href = "../Components/HomepageLogin/homepagelogin.html";
        alert("Login successful");
    }
    else{
        alert("Login failed. Please check your email and password.");
        return;
    }

}