//const method = process.argv[2];
//const endpoint = process.argv[3];

const [, , method, endpoint, ...args] = process.argv;

console.log(`Metodo: ${method}`);
console.log (`Endpoint: ${endpoint}`);

//Muestro todos los productos.
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
    //Separo el recurso del id
  //  const[recurso, id] = endpoint.split('/');
    
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

//Elimino solo un producto en particular
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
