document.addEventListener("DOMContentLoaded", () => {
   const loginButton = document.querySelector(".button.login");
   const registerButton = document.querySelector(".button.register");
   const emailInput = document.querySelector("input[type='email']");
   const passwordInput = document.querySelector("input[type='password']");

   loginButton.addEventListener("click", async () => {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || !password) {
         alert("請輸入電子郵件和密碼！");
         return;
      }
      try {
         const response = await fetch("/login-check", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
         });

         if (response.ok) {
            const data = await response.json();
            if (data.success) {
               window.location.href = "/homepage";
            } else {
               alert(data.error || "帳號或密碼錯誤！");
            }
         } else {
            console.error("Login failed:", response.statusText);
            alert("發生錯誤，請稍後再試！");
         }
      } catch (error) {
         console.error("Error:", error);
         alert("無法連接到伺服器，請檢查您的網路！");
      }
   });

   registerButton.addEventListener("click", () => {
      window.location.href = "/register";
   });

   document.querySelector(".forgot").addEventListener("click", () => {
      window.location.href = "/forgot-password";
   });
});