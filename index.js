//Utilizo Destructuring con process.argv para obtener el método, el endpoint y los argumentos de la línea de comandos.
const [, , method, endpoint, ...args] = process.argv;

//Muestro por pantalla el métod y el endpoint
console.log(`Metodo: ${method}`);
console.log (`Endpoint: ${endpoint}`);

//NOTA: utilizo una API que creamos para el proyecto de React.

//Muestro todos los productos.
//npm start GET productos
if (method === 'GET' && endpoint === 'productos') {
    console.log('Obteniendo productos...');

    try {
        const response = await fetch('https://69162780a7a34288a27c82d0.mockapi.io/api/Productos');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

//Consulto solo un producto en particular
//npm start GET productos/5
    //Separo el recurso del id
    const[recurso, id] = endpoint.split('/');
    
if (method === 'GET' && endpoint.startsWith('productos/')) {
    console.log('Obteniendo productos...');

    try {
        const response = await fetch(`https://69162780a7a34288a27c82d0.mockapi.io/api/Productos/${id}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

//Inserto un registro
//npm start POST productos/"Rúcula & Crudo" 19.500 "Rúcula, jamón crudo, queso parmesano y aderezo de limón" "Especial"
if (method === 'POST') {
    //Armo el objeto
    const producto = {'nombre': args[0], 'precio': args[1], 'descripcion': args[2], 'tipo': args[3]};
//    console.log(producto);
     try {
        fetch('https://69162780a7a34288a27c82d0.mockapi.io/api/Productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        })
            .then(response => response.json())
            .then(data => console.log('Producto agregado:', data));
    } catch (error) {
        console.error('Error al ingresar el nuevo producto:', error);
    }
}

//Elimino un producto en particular
//npm start DELETE productos/8
if (method === 'DELETE' && endpoint.startsWith('productos/')) {
    console.log('Eliminando producto...');

    try {
        const response = await fetch(`https://69162780a7a34288a27c82d0.mockapi.io/api/Productos/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Producto eliminado:', data);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}
