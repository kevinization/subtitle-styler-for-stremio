document.addEventListener('DOMContentLoaded', function () {
  const fontFamilySelector = document.getElementById('fontFamilySelector');
  const fontOutlineSlider = document.getElementById('fontOutlineSlider');
  const fontOutlineValue = document.getElementById('fontOutlineValue');
  const outlineColorPicker = document.getElementById('outlineColorPicker');
  const bottomAppSlider = document.getElementById('bottomAppSlider');
  const bottomAppValue = document.getElementById('bottomAppValue');

  // Cargar valores almacenados
  chrome.storage.local.get(['fontFamily', 'fontOutline', 'outlineColor', 'bottomApp'], function (result) {
    fontFamilySelector.value = result.fontFamily || 'Rubik';      // Fuente por defecto
    fontOutlineSlider.value = result.fontOutline || 2;            // Contorno por defecto
    fontOutlineValue.textContent = fontOutlineSlider.value;       // Mostrar el valor del contorno
    outlineColorPicker.value = result.outlineColor || '#000000';  // Color de contorno por defecto
    bottomAppSlider.value = result.bottomApp || 7;                // Bottom por defecto
    bottomAppValue.textContent = bottomAppSlider.value;           // Mostrar valor del bottom
  });

  // Cambios en la selección de fuente
  fontFamilySelector.addEventListener('change', function () {
    const newFontFamily = fontFamilySelector.value;
    chrome.storage.local.set({ fontFamily: newFontFamily });  // Guardar la nueva fuente
  });

  // Cambios en el tamaño del contorno
  fontOutlineSlider.addEventListener('input', function () {
    const newFontOutline = fontOutlineSlider.value;
    fontOutlineValue.textContent = newFontOutline;          // Mostrar el nuevo valor
    chrome.storage.local.set({ fontOutline: newFontOutline }); // Guardar el nuevo valor del contorno
  });

  // Cambios en el color del contorno
  outlineColorPicker.addEventListener('input', function () {
    const newOutlineColor = outlineColorPicker.value;
    chrome.storage.local.set({ outlineColor: newOutlineColor }); // Guardar el nuevo color del contorno
  });

  // Cambios en el valor del bottom para app.strem.io
  bottomAppSlider.addEventListener('input', function () {
    const newBottomApp = bottomAppSlider.value;
    bottomAppValue.textContent = newBottomApp;  // Mostrar el nuevo valor del bottom
    chrome.storage.local.set({ bottomApp: newBottomApp }); // Guardar el nuevo valor del bottom
  });
});
