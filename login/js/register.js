document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const message = document.getElementById("message");

    // Validasi kosong
    if (!username || !email || !password) {
        message.style.color = "red";
        message.innerText = "Semua kolom wajib diisi!";
        return;
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
                `action=register` +
                `&username=${encodeURIComponent(username)}` +
                `&email=${encodeURIComponent(email)}` +
                `&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            message.style.color = "lime";
            message.innerText = "Registrasi berhasil, redirect ke login...";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);

        } else {
            message.style.color = "red";
            message.innerText = data.message || "Registrasi gagal";
        }

    } catch (error) {
        message.style.color = "red";
        message.innerText = "Server error!";
        console.error(error);
    }
});
