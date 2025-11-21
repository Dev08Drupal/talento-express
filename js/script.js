// VARIABLES GLOBALES
let selectedSkills = [];
let remainingOffers = 4;
let userData = {
  specialty: "",
  skills: [],
  achievement: "",
};

// NAVEGACIÓN ENTRE PANTALLAS
function showScreen(screenId) {
  // Ocultar todas las pantallas
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  // Mostrar pantalla seleccionada
  document.getElementById(screenId).classList.add("active");

  // Actualizar botones de navegación
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Activar botón correspondiente
  const activeBtn = Array.from(document.querySelectorAll(".nav-btn")).find((btn) =>
    btn.textContent.toLowerCase().includes(screenId.toLowerCase().substring(0, 5))
  );
  if (activeBtn) activeBtn.classList.add("active");
}

// ONBOARDING
function nextOnboarding(step) {
  if (step === 2) {
    userData.specialty = document.getElementById("specialty").value;
    showScreen("onboarding2");
  } else if (step === 3) {
    if (selectedSkills.length === 3) {
      userData.skills = selectedSkills;
      showScreen("onboarding3");
    }
  }
}

function completeOnboarding() {
  userData.achievement = document.getElementById("achievement").value;
  console.log("Perfil completado:", userData);
  alert("¡Perfil completado con éxito!");
  showScreen("feed");
}

// SELECCIÓN DE HABILIDADES
function toggleSkill(element) {
  const skill = element.textContent;

  if (element.classList.contains("selected")) {
    // Deseleccionar
    element.classList.remove("selected");
    selectedSkills = selectedSkills.filter((s) => s !== skill);
  } else {
    // Seleccionar si no hay 3 ya
    if (selectedSkills.length < 3) {
      element.classList.add("selected");
      selectedSkills.push(skill);
    } else {
      alert("Solo puedes seleccionar 3 habilidades");
      return;
    }
  }

  // Actualizar display
  document.getElementById("skillCount").textContent = selectedSkills.length;
  document.getElementById("selectedSkills").innerHTML = selectedSkills
    .map((s) => `<span class="tag selected">${s}</span>`)
    .join("");

  // Habilitar/deshabilitar botón continuar
  document.getElementById("continueBtn2").disabled = selectedSkills.length !== 3;
}

// CONTADOR DE CARACTERES
function updateCharCount() {
  const text = document.getElementById("achievement").value;
  document.getElementById("charCount").textContent = text.length;
}

function updateEditCharCount() {
  const text = document.getElementById("editAchievement").value;
  document.getElementById("editCharCount").textContent = text.length;
}

// SWIPE DE OFERTAS
function swipeAction(action) {
  const card = document.getElementById("offerCard");

  // Animación de salida
  if (action === "reject") {
    card.style.transform = "translateX(-150%) rotate(-30deg)";
  } else if (action === "super") {
    card.style.transform = "translateY(-150%) scale(1.2)";
  } else if (action === "like") {
    card.style.transform = "translateX(150%) rotate(30deg)";
  }

  card.style.opacity = "0";
  card.style.transition = "all 0.5s ease";

  setTimeout(() => {
    remainingOffers--;
    document.getElementById("remainingCount").textContent = remainingOffers;

    if (remainingOffers <= 0) {
      showScreen("feedComplete");
    } else {
      // Resetear tarjeta
      card.style.transform = "none";
      card.style.opacity = "1";
    }
  }, 500);

  console.log(`Acción: ${action} en oferta`);
}

// COUNTDOWN TIMER
function startCountdown() {
  let hours = 23;
  let minutes = 59;
  let seconds = 59;

  setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes < 0) {
      minutes = 59;
      hours--;
    }
    if (hours < 0) {
      hours = 23;
    }

    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
      countdownElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }
  }, 1000);
}

// CHAT
function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value;

  if (message.trim()) {
    alert(`Mensaje enviado: "${message}"`);
    input.value = "";
  } else {
    alert("Escribe un mensaje primero");
  }
}

function submitAnswers() {
  alert("¡Respuestas enviadas exitosamente!");
  showScreen("chat");
}

// PERFIL
function saveProfile() {
  userData.specialty = document.getElementById("editSpecialty").value;
  userData.achievement = document.getElementById("editAchievement").value;

  console.log("Perfil actualizado:", userData);
  alert("¡Cambios guardados exitosamente!");
  showScreen("profile");
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  console.log("TalentLink Express cargado");
  startCountdown();
  updateEditCharCount();
});
