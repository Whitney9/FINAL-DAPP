document.addEventListener("DOMContentLoaded", () => {
   const registerButton = document.querySelector("#register-button");
   const nameInput = document.querySelector("#name");
   const birthdateInput = document.querySelector("#birthdate");
   const genderInput = document.querySelector("#gender");
   const emailInput = document.querySelector("#email");
   const passwordInput = document.querySelector("#password");
   const confirmPasswordInput = document.querySelector("#confirm-password");
   const genderOptions = document.getElementById("genderOptions");

   genderInput.addEventListener("click", () => {
      genderOptions.style.display = genderOptions.style.display === "block" ? "none" : "block";
   });

   document.addEventListener("click", (e) => {
      if (!e.target.closest(".gender-input")) {
         genderOptions.style.display = "none";
      }
   });

   genderOptions.querySelectorAll("div").forEach(option => {
      option.addEventListener("click", () => {
         genderInput.value = option.textContent;
         genderOptions.style.display = "none";
      });
   });
   registerButton.addEventListener("click", async () => {
      const name = nameInput.value.trim();
      const birthdate = birthdateInput.value.trim();
      const gender = genderInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      if (!name || !birthdate || !gender || !email || !password || !confirmPassword) {
         alert("請輸入所有必填欄位！");
         return;
      }

      if (password !== confirmPassword) {
         alert("密碼與確認密碼不一致！");
         return;
      }

      try {
         const response = await fetch("/register-user", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name: name,
               birthdate: birthdate,
               gender: gender,
               email: email,
               password: password,
            }),
         });

         if (response.ok) {
            const data = await response.json();
            if (data.success) {
               alert("註冊成功！即將跳轉到登入頁面。");
               window.location.href = "/login";
            } else {
               alert(data.error || "註冊失敗，請稍後再試！");
            }
         } else {
            alert("發生錯誤，請稍後再試！");
         }
      } catch (error) {
         console.error("Error:", error);
         alert("無法連接到伺服器，請檢查您的網路！");
      }
   });
});