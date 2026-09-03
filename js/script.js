const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll('input[name="extras"]');
const total = document.getElementById("total");


// FORMULARIO

if (nombre) {
    nombre.addEventListener("input", validarNombre);
}

if (apellidos) {
    apellidos.addEventListener("input", validarApellidos);
}

if (telefono) {
    telefono.addEventListener("input", validarTelefono);
}

if (email) {
    email.addEventListener("input", validarEmail);
}


function validarNombre() {

    if (nombre.value.length > 15 || !/^[a-záéíóúñ ]+$/i.test(nombre.value)) {
        nombre.setCustomValidity("Máximo 15 caracteres y solo letras");
    } else {
        nombre.setCustomValidity("");
    }

}


function validarApellidos() {

    if (apellidos.value.length > 40 || !/^[a-záéíóúñ ]+$/i.test(apellidos.value)) {
        apellidos.setCustomValidity("Máximo 40 caracteres y solo letras");
    } else {
        apellidos.setCustomValidity("");
    }

}


function validarTelefono() {

    if (!/^[0-9]{9}$/.test(telefono.value)) {
        telefono.setCustomValidity("Debe tener 9 números");
    } else {
        telefono.setCustomValidity("");
    }

}


function validarEmail() {

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.setCustomValidity("Email incorrecto");
    } else {
        email.setCustomValidity("");
    }

}


if (producto) {
    producto.addEventListener("change", calcular);
}

if (plazo) {
    plazo.addEventListener("input", calcular);
}

extras.forEach(function(extra) {
    extra.addEventListener("change", calcular);
});


function calcular() {

    let precio = Number(producto.value);

    extras.forEach(function(extra) {

        if (extra.checked) {
            precio += Number(extra.value);
        }

    });

    if (plazo.value >= 6) {
        precio *= 0.90;
    } else if (plazo.value >= 3) {
        precio *= 0.95;
    }

    total.value = precio + " €";

}


// GALERÍA

const galeria = document.getElementById("galeria");

const proyectos = [

    {
        imagen: "imagenes/restaurante.jpg",
        categoria: "hosteleria",
        texto: "HOSTELERÍA",
        nombre: "Restaurante"
    },

    {
        imagen: "imagenes/negocio.jpg",
        categoria: "empresa",
        texto: "EMPRESA",
        nombre: "Web Empresarial"
    },

    {
        imagen: "imagenes/blog.jpg",
        categoria: "blog",
        texto: "BLOG",
        nombre: "Blog Personal"
    },

    {
        imagen: "imagenes/portfolio.jpg",
        categoria: "portfolio",
        texto: "PORTFOLIO",
        nombre: "Portfolio Profesional"
    }

];


function mostrarGaleria(filtro) {

    if (!galeria) {
        return;
    }

    galeria.innerHTML = "";

    proyectos.forEach(function(proyecto) {

        if (filtro == "todos" || proyecto.categoria == filtro) {

            galeria.innerHTML += `
                <div>
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}">
                    <div class="info">
                        <span>${proyecto.texto}</span>
                        <h3>${proyecto.nombre}</h3>
                    </div>
                </div>
            `;

        }

    });

}


mostrarGaleria("todos");


// NOTICIAS

const noticias = document.getElementById("noticias");

if (noticias) {

    fetch("datos/noticias.json")
        .then(respuesta => respuesta.json())
        .then(datos => {

            datos.forEach(noticia => {

                noticias.innerHTML += `
                    <article>
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.texto}</p>
                    </article>
                `;

            });

        });

}


// MAPA

const mapa = document.getElementById("mapa");
const botonRuta = document.getElementById("ruta");

console.log("Botón ruta:", botonRuta);

if (mapa) {

    const ubicacion = [39.4653, -0.3768];

    const mapaWeb = L.map("mapa").setView(ubicacion, 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(mapaWeb);

    L.marker(ubicacion)
        .addTo(mapaWeb)
        .bindPopup("<b>MARCWEB</b><br>Calle Historiador Diago, 17")
        .openPopup();

    let ruta;

    botonRuta.addEventListener("click", function() {

    console.log("Botón pulsado");

    navigator.geolocation.getCurrentPosition(

        function(posicion) {
            alert("UBICACIÓN OBTENIDA");
            console.log("Ubicación obtenida");
            console.log(posicion);
        },

        function(error) {
            alert("ERROR: " + error.message);
            console.log("Error:", error.message);
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});

}