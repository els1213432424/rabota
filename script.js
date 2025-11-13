const form = document.getElementById("feedbackForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://your-n8n-instance.com/webhook/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      responseMsg.textContent = "Сообщение отправлено! Спасибо!";
      responseMsg.style.color = "green";
      form.reset();
    } else {
      responseMsg.textContent = "Ошибка отправки. Попробуйте позже.";
      responseMsg.style.color = "red";
    }
  } catch (error) {
    responseMsg.textContent = "Ошибка сети: " + error.message;
    responseMsg.style.color = "red";
  }
});
