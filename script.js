const submitBtn = document.getElementById("submitBtn");
const responseMsg = document.getElementById("responseMsg");

let selectedTariff = null;
let selectedAI = null;

document.querySelectorAll(".tariff-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tariff-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedTariff = btn.dataset.value;
  });
});

document.querySelectorAll(".ai-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".ai-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedAI = btn.dataset.value;
  });
});

submitBtn.addEventListener("click", async () => {
  const phone = document.getElementById("phone").value.trim();
  const street = document.getElementById("street").value.trim();
  const postcode = document.getElementById("postcode").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!/^\d{6}$/.test(phone)) {
    return alert("Введите 6 цифр после +31");
  }

  if (!selectedTariff || !selectedAI) {
    return alert("Выберите тариф и ИИ");
  }

  const data = {
    phone: "+31" + phone,
    tariff: selectedTariff,
    address: {
      street,
      postcode,
      city
    },
    ai: selectedAI
  };

  try {
    const response = await fetch("https://your-n8n-instance.com/webhook/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      responseMsg.textContent = "Данные успешно отправлены!";
      responseMsg.style.color = "green";
    } else {
      responseMsg.textContent = "Ошибка при отправке данных.";
      responseMsg.style.color = "red";
    }
  } catch (error) {
    responseMsg.textContent = "Сетевая ошибка: " + error.message;
    responseMsg.style.color = "red";
  }
});
