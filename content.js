// Inyectar Google Fonts para Rubik de manera persistente
function loadGoogleFont() {
    return new Promise((resolve) => {
        const linkRubik = document.createElement('link');
        linkRubik.href = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,486;1,486&display=swap';
        linkRubik.rel = 'stylesheet';
        linkRubik.onload = resolve; // Espera a que la fuente esté completamente cargada
        document.head.appendChild(linkRubik);
    });
}

// Aplicar estilos directamente como CSS en el documento
function injectCSSStyles(fontFamily, fontOutline, outlineColor, bottomApp, targetSelector, containerSelector) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        ${targetSelector} {
            font-family: ${fontFamily}, sans-serif !important;
            font-weight: normal !important;  /* Establecer font-weight a normal */
            text-shadow: -${fontOutline}px -${fontOutline}px 0 ${outlineColor}, 
                         0 -${fontOutline}px 0 ${outlineColor}, 
                         ${fontOutline}px -${fontOutline}px 0 ${outlineColor}, 
                         ${fontOutline}px 0 0 ${outlineColor}, 
                         ${fontOutline}px ${fontOutline}px 0 ${outlineColor}, 
                         0 ${fontOutline}px 0 ${outlineColor}, 
                         -${fontOutline}px ${fontOutline}px 0 ${outlineColor}, 
                         -${fontOutline}px 0 0 ${outlineColor} !important;
            padding: 0 !important;  /* Ajuste de padding */
            margin: 0 !important;   /* Ajuste de margin */
        }

        ${window.location.href.includes('app.strem.io') ? `
            ${containerSelector} {
                bottom: ${bottomApp}% !important;  /* Ajuste de bottom para alineación */
                padding: 0 !important;  /* Ajuste de padding del contenedor */
                margin: 0 !important;   /* Ajuste de margin del contenedor */
                max-width: 100% !important; /* Extender el ancho */
            }

            ${containerSelector}:not(.hidden) {
                bottom: ${parseFloat(bottomApp) + 10}% !important;  /* Ajuste de bottom cuando no está oculta */
            }
        ` : ''}
    `;
    document.head.appendChild(styleElement);
}

// Ajustar la alineación de subtítulos en app.strem.io
function applyAlignmentForApp() {
    if (window.location.href.includes('app.strem.io')) {
        chrome.storage.local.get('bottomApp', function (result) {
            const bottomApp = result.bottomApp || 7;  // Valor por defecto 7%
            injectCSSStyles('Rubik', 2, 'black', bottomApp, '#subtitle', '.subtitles-container');  // Aplicar estilos en el span #subtitle y ajustar el contenedor solo en app.strem.io
        });
    }
}

// Determinar la URL y seleccionar el contenedor de subtítulos apropiado
function getTargetSelector() {
    if (window.location.href.includes('app.strem.io')) {
        return { spanSelector: '#subtitle', divSelector: '.subtitles-container' };  // Seleccionamos el span y el contenedor en app.strem.io
    } else if (window.location.href.includes('web.stremio.com')) {
        return { spanSelector: '.video-container-v9_vA .video-tkpQm *', divSelector: '.video-container-v9_vA' };  // Seleccionamos los subtítulos en web.stremio.com
    }
    return null;
}

// Observador de cambios en los subtítulos (MutationObserver)
function observeSubtitleChanges(spanSelector, divSelector) {
    const targetNode = document.querySelector(divSelector); // Nodo donde Stremio coloca los subtítulos

    if (targetNode) {
        const observer = new MutationObserver(() => {
            chrome.storage.local.get(['fontFamily', 'fontOutline', 'outlineColor', 'bottomApp'], function (result) {
                const fontFamily = result.fontFamily || 'Rubik'; // Valor por defecto Rubik
                const fontOutline = result.fontOutline || 2; // Valor por defecto 2px
                const outlineColor = result.outlineColor || 'black'; // Color por defecto del contorno
                const bottomApp = result.bottomApp || 7;  // Valor por defecto 7%

                injectCSSStyles(fontFamily, fontOutline, outlineColor, bottomApp, spanSelector, divSelector); // Reaplicar los estilos como CSS cuando haya cambios en los subtítulos
            });
        });

        // Configurar el observador para escuchar cambios en los subtítulos
        observer.observe(targetNode, { childList: true, subtree: true });
    }
}

// Escuchar cambios en chrome.storage.local y actualizar los estilos en tiempo real
chrome.storage.onChanged.addListener(function (changes) {
    chrome.storage.local.get(['fontFamily', 'fontOutline', 'outlineColor', 'bottomApp'], function (result) {
        const fontFamily = result.fontFamily || 'Rubik'; // Valor por defecto Rubik
        const fontOutline = result.fontOutline || 2; // Valor por defecto 2px
        const outlineColor = result.outlineColor || 'black'; // Color por defecto del contorno
        const bottomApp = result.bottomApp || 7;  // Valor por defecto 7%

        const targetSelectors = getTargetSelector();
        if (targetSelectors) {
            injectCSSStyles(fontFamily, fontOutline, outlineColor, bottomApp, targetSelectors.spanSelector, targetSelectors.divSelector); // Aplicar los valores más recientes en tiempo real
        }
    });
});

// Obtener font-family, font-outline y outlineColor guardados en chrome.storage.local y aplicar la fuente Rubik de inmediato
function getFontFamilyAndApplyStyles() {
    loadGoogleFont().then(() => {
        // Asegurarse de que la fuente Rubik se aplique tan pronto esté disponible
        const applyImmediately = () => {
            chrome.storage.local.get(['fontFamily', 'fontOutline', 'outlineColor', 'bottomApp'], function (result) {
                const fontFamily = result.fontFamily || 'Rubik'; // Valor por defecto Rubik
                const fontOutline = result.fontOutline || 2; // Valor por defecto 2px
                const outlineColor = result.outlineColor || 'black'; // Color por defecto del contorno
                const bottomApp = result.bottomApp || 7;  // Valor por defecto 7%

                const targetSelectors = getTargetSelector();
                if (targetSelectors) {
                    injectCSSStyles(fontFamily, fontOutline, outlineColor, bottomApp, targetSelectors.spanSelector, targetSelectors.divSelector); // Aplicar estilos inmediatamente
                }
            });
        };

        // Aplicar estilos inmediatamente después de cargar la fuente Rubik
        applyImmediately();

        // Monitorear cambios en los subtítulos y aplicar Rubik cuando cambien
        const targetSelectors = getTargetSelector();
        if (targetSelectors) {
            observeSubtitleChanges(targetSelectors.spanSelector, targetSelectors.divSelector);
        }
    });
}

// Ejecutar la función para aplicar los estilos al cargar la página
getFontFamilyAndApplyStyles();
