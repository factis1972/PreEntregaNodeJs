//Utilizo Destructuring con process.argv para obtener el método, el endpoint y los argumentos de la línea de comandos.
const [, , method, endpoint, ...args] = process.argv;

//Muestro por pantalla el métod y el endpoint
console.log(`Metodo: ${method}`);
console.log (`Endpoint: ${endpoint}`);

//NOTA: utilizo una API que creamos para el proyecto de React.

//Muestro todos los productos.
//npm start GET products
if (method === 'GET' && endpoint === 'products') {
    console.log('Obteniendo productos...');

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

//Consulto solo un producto en particular
//npm start GET products/5
    //Separo el recurso del id
    const[recurso, id] = endpoint.split('/');
    
if (method === 'GET' && endpoint.startsWith('products/')) {
    console.log('Obteniendo producto...');

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error al obtener producto:', error);
    }
}

//Inserto un registro
//npm start POST products/"Short Fútbol AFA" 125600 "Nuevo lanzamiento especial Mundial 2026" "Deporte" "http://example.com"
if (method === 'POST') {
    //Armo el objeto
    const producto = {'title': args[0], 'price': args[1], 'description': args[2], 'category': args[3], 'image': args[4]};
//    console.log(producto);
     try {
        fetch("https://fakestoreapi.com/products", {
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
if (method === 'DELETE' && endpoint.startsWith('products/')) {
    console.log('Eliminando producto...');

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Producto eliminado:', data);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}
