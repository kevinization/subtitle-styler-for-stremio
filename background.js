// Evento al instalar la extensión, se configuran valores por defecto en local storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
      fontFamily: 'Rubik',    // Fuente por defecto
      fontOutline: 1,         // Contorno por defecto de 1px
      outlineColor: '#000000', // Color de contorno por defecto negro
      bottomApp: 7            // Valor por defecto para el bottom en app.strem.io
  });
});
