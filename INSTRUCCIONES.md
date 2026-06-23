# 🌟 Instrucciones de Administración y Despliegue - Festejos Santaella

¡Felicidades! Hemos creado una base web de alta gama, responsiva y con interacciones animadas para **Festejos Santaella**. El código se encuentra estructurado en HTML5 Vanilla, CSS3 y JavaScript moderno para una carga rápida sin dependencias pesadas.

---

## 📂 Estructura de Archivos
*   **[index.html](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/index.html)**: Estructura del contenido, metatags de SEO, código QR e íconos de redes sociales.
*   **[style.css](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/style.css)**: Sistema de diseño (Paleta Vino Tinto & Oro), efectos de vidrio y transiciones responsivas.
*   **[script.js](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/script.js)**: Lógica del "Curador de Momentos" (cotizador interactivo), filtros de galería, lightbox y redirección de WhatsApp.
*   **`assets/`**: Carpeta que almacena las imágenes del sitio:
    *   `logo_hd.png` (Tu logotipo en alta definición).
    *   `qr_code.png` (Tu código QR de contacto).
    *   `hero_bg.png` (Fondo del banner principal).
    *   `boda.png` (Foto real / representación de boda).
    *   `quince.png` (Foto real / representación de 15 años).
    *   `grado.png` (Foto real / representación de grados).

---

## 🔄 ¿Cómo reemplazar las fotos reales del Facebook/Instagram?
El sitio web está diseñado para ser **100% editable** y no perder el formato premium al cambiar de imágenes. Para cambiar las fotos actuales por tus fotos reales, solo debes hacer lo siguiente:

1.  **Reemplazo Directo (Recomendado)**:
    *   Guarda tu nueva foto en la carpeta `assets/`.
    *   Nómbrala exactamente como el archivo que quieres reemplazar (por ejemplo, `boda.png`, `quince.png` o `grado.png`).
    *   Asegúrate de que la extensión sea `.png` (o si es `.jpg`, cambia la extensión en el código del `index.html` en las secciones correspondientes).
2.  **Agregar más fotos a la Galería**:
    *   Abre el archivo [index.html](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/index.html).
    *   Busca la sección `<section class="gallery-section" id="galeria">`.
    *   Duplica uno de los bloques `<div class="gallery-item ...">` y cambia el valor del atributo `data-src` y la etiqueta `src` de la imagen por la ruta de tu nueva foto.

---

## 🌐 ¿Cómo visualizar la Web localmente?
Para ver la web en funcionamiento con todos los efectos y el scroll de forma interactiva:

1.  **Usando Live Server (Recomendado)**:
    *   Abre la carpeta `festejos-santaella` en tu editor de código (como VS Code).
    *   Instala la extensión "Live Server" y haz clic en "Go Live" en la barra inferior.
2.  **Usando Terminal con Python o Node**:
    *   Ejecuta el siguiente comando en la terminal para iniciar un servidor local simple:
        ```powershell
        npx browser-sync start --server --files "*"
        ```
    *   O bien, abre directamente el archivo [index.html](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/index.html) en tu navegador preferido.

---

## 🛠️ Modificar enlaces de Redes Sociales
Si quieres actualizar los links oficiales de Facebook, Instagram o TikTok en el futuro:
*   Busca en [index.html](file:///C:/Users/WIN10/.gemini/antigravity/scratch/festejos-santaella/index.html) las etiquetas que contengan clases como `fab fa-facebook-f`, `fab fa-instagram` o `fab fa-tiktok`.
*   Cambia el enlace del atributo `href="..."` por la dirección de tu nuevo perfil.
