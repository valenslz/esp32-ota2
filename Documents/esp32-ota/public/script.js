// Importar las funciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgMZ1-GSYCJN3ZNWLDNL9m5e2vSHsW5Rc",
    authDomain: "esp32-8b6f4.firebaseapp.com",
    databaseURL: "https://esp32-8b6f4-default-rtdb.firebaseio.com",
    projectId: "esp32-8b6f4",
    storageBucket: "esp32-8b6f4.appspot.com",
    messagingSenderId: "600698780634",
    appId: "1:600698780634:web:9430818ce12b68fe161ee3",
    measurementId: "G-BJYRPFG9Y2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Inicializa la base de datos

// Obtén la referencia a los switches
const objeto = document.getElementById('oxidacion');
const objeto2 = document.getElementById('suministro');

// Referencias a las rutas en la base de datos
const bd = ref(database, 'esp32/oxidacion');
const bd2 = ref(database, 'suministro');

// Leer y actualizar los estados en tiempo real
onValue(bd, (snapshot) => {
    if (snapshot.exists()) {
        const estado = snapshot.val();
        objeto.checked = estado;
        console.log("Estado del switch 'oxidacion' en tiempo real:", estado);
    } else {
        console.log("No hay datos disponibles");
    }
}, (error) => {
    console.error("Error al leer la base de datos:", error);
});

onValue(bd2, (snapshot) => {
    if (snapshot.exists()) {
        const estado = snapshot.val();
        objeto2.checked = estado;
        console.log("Estado del switch 'suministro' en tiempo real:", estado);
    } else {
        console.log("No hay datos disponibles");
    }
}, (error) => {
    console.error("Error al leer la base de datos:", error);
});

// Función para enviar datos directamente a Firebase
function enviar(ruta, estado) {
    console.log("Enviando datos a Firebase:", ruta, "Estado:", estado);
    set(ref(database, ruta), estado)
        .then(() => {
            console.log('Datos enviados exitosamente a Firebase');
        })
        .catch((error) => {
            console.error('Error al enviar los datos:', error);
        });
}

// Agregar eventos para actualizar el estado en Firebase cuando el usuario cambia los switches
objeto.addEventListener('change', () => {
    const nuevoEstado = objeto.checked;
    enviar('esp32/oxidacion', nuevoEstado);
});

objeto2.addEventListener('change', () => {
    const nuevoEstado = objeto2.checked;
    enviar('suministro', nuevoEstado);
});
