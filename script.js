let deferredPrompt;
const btnInstalar = document.getElementById("btn-instalar");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstalar.style.display = "block";
});

btnInstalar.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log("Resultado instalación:", outcome);
  deferredPrompt = null;
  btnInstalar.style.display = "none";
});

window.addEventListener("appinstalled", () => {
  console.log("PWA instalada");
  btnInstalar.style.display = "none";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso ", reg))
    .catch((err) => console.error("Error al tratar de registrar el SW ", err));
} else {
  console.log("no hay serviceWorker");
}
