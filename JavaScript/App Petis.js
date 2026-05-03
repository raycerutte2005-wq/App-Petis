document.addEventListener('DOMContentLoaded', () => {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const sumaTotalElemento = document.getElementById('sumaTotal');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnEliminar = document.getElementById('btnEliminar');
    // 1. Función para calcular la suma de la columna de números
    function calcularSuma() {
        const celdasNumero = document.querySelectorAll('.celda-numero');
        let suma = 0;
        
        celdasNumero.forEach(celda => {
            // Convierte el texto a número. Si está vacío o es texto, usa 0
            const valor = parseFloat(celda.innerText) || 0; 
            suma += valor;
        });
        
        sumaTotalElemento.innerText = suma;
    }

    // 2. Event listener para actualizar la suma cuando el usuario escribe
    cuerpoTabla.addEventListener('input', (evento) => {
        // Verifica si la celda editada es de la columna de números
        if (evento.target.classList.contains('celda-numero')) {
            calcularSuma();
        }
    });

    // 3. Función para agregar una nueva fila dinámica
    function agregarFila(nombre = '', numero = '0') {
        const tr = document.createElement('tr');
        
        // contenteditable="true" es lo que hace que el texto se pueda modificar
        tr.innerHTML = `
            <td contenteditable="true" class="celda-nombre">${nombre}</td>
            <td contenteditable="true" class="celda-numero">${numero}</td>
        `;
        
        cuerpoTabla.appendChild(tr);
        calcularSuma(); // Recalcula la suma al agregar la fila
    }

    // Botón para agregar fila vacía
    btnAgregar.addEventListener('click', () => agregarFila());

    // 4. Guardar los datos en el LocalStorage del navegador
    btnGuardar.addEventListener('click', () => {
        const filas = [];
        const todasLasFilas = document.querySelectorAll('#cuerpoTabla tr');
        
        todasLasFilas.forEach(fila => {
            const nombre = fila.querySelector('.celda-nombre').innerText;
            const numero = fila.querySelector('.celda-numero').innerText;
            filas.push({ nombre, numero });
        });
        
        // Convertimos el array a texto para guardarlo
        localStorage.setItem('datosTabla', JSON.stringify(filas));
        alert('Datos guardados exitosamente. Puedes recargar la página.');
    });

    // 5. Cargar los datos al iniciar la página
    function cargarDatos() {
        const datosGuardados = localStorage.getItem('datosTabla');
        
        if (datosGuardados) {
            // Si hay datos, los convertimos de texto a array y creamos las filas
            const filas = JSON.parse(datosGuardados);
            filas.forEach(fila => agregarFila(fila.nombre, fila.numero));
        } else {
            // Si es la primera vez que entra, crea dos filas vacías por defecto
            agregarFila();
            agregarFila();
        }
    }
// Event listener para eliminar la última fila
btnEliminar.addEventListener('click', () => {
    // lastElementChild selecciona el último elemento (la última fila) dentro del cuerpo de la tabla
    const ultimaFila = cuerpoTabla.lastElementChild;
    
    if (ultimaFila) {
        cuerpoTabla.removeChild(ultimaFila); // Elimina la fila del HTML
        calcularSuma(); // Recalcula la suma total para restar el número eliminado
    } else {
        alert('No hay filas para eliminar.');
    }
});
    // Iniciar la carga al abrir la página
    cargarDatos();
});