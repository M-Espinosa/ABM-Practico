let lista = new Array();
let listaP = new Array();
let listaCarrito = new Array();
let listaCarritoDos = new Array();
let listaPrecio = new Array();
let sumaPrecio = new Array();
let listaProductosFija = new Array();
let suma = 0;
let nombreU;
let apellidoU;
let mailU;
let telefonoU;
let nombreP;
let precioP;
let idUsuario = 0;
var botonCrear = document.getElementById('botonCrear');
var botonCrearProducto = document.getElementById('crearProducto');
var botonListaU = document.getElementById('botonListaU');
var botonListaP = document.getElementById('botonListaP');
var botonAgregarCarrito = document.getElementById('agregarCarrito');
var botonBorrarP = document.getElementById('borrarProducto');
var botonRealizarCompra = document.getElementById('realizarCompra');
var botonModificarUsuario = document.getElementById('botonModificar');
var botonBuscarUsuario = document.getElementById('buscarId');

class usuario {
    constructor(nombre, apellido, mail, telefono, id) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
        this.id = id;
    }
}
class productos {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}
class carrito {
    constructor(nombre) {
        this.nombre = nombre;
    }
}


botonCrear.addEventListener('click', function () {
    nombreU = document.getElementById('nombre').value.trim();
    apellidoU = document.getElementById('apellido').value.trim();
    mailU = document.getElementById('mail').value.trim();
    telefonoU = document.getElementById('telefono').value.trim();
    idUsuario++;
    if (telefonoU <= 0 || telefonoU.length < 10 || telefonoU.length > 15) {
        alert('ingrese un numero de telefono valido');

    } else {
        if (nombreU == "" || apellidoU == "" || mailU == "" || telefonoU == "") {
            alert('uno de los campos esta vacio');
        } else {
            crearUsuario();
            alert('Usuario creado con exito!!!\n Su ID de usuario es: ' + idUsuario);
            document.getElementById('nombre').value = "";
            document.getElementById('apellido').value = "";
            document.getElementById('mail').value = "";
            document.getElementById('telefono').value = "";
            console.log(lista);
        }
    }


})

botonCrearProducto.addEventListener('click', function () {
    nombreP = document.getElementById('producto').value.trim();
    nombreP = nombreP.toLowerCase();
    precioP = parseFloat(document.getElementById('precio').value.trim());
    precioP = precioP.toFixed(2);
    if (precioP <= 0) {
        alert('ingrese un precio mayor a cero')
    } else {
        if (nombreP == "" || precioP == "") {
            alert('Uno de los campos esta vacio.')
        } else {
            crearProducto();
            alert('Producto creado con exito!!!')
            listaPrecio.push(precioP);
            listaProductosFija.push(nombreP);
            let abc = listaP.map(function (b) {
                return '<option value="' + b.nombre + '">' + b.nombre + '</option>';
            })
            document.getElementById('listaCarrito').innerHTML = abc;
            document.getElementById('producto').value = "";
            document.getElementById('precio').value = "";
        }
    }

})

botonListaU.addEventListener('click', function () {
    imprimirUsuario()
})

botonListaP.addEventListener('click', function () {
    let abc = listaP.map(function (a) {
        return '<ul><li>Nombre producto: ' + a.nombre + '</li><li>Precio: $' + a.precio + '</li></ul>';
    })
    document.getElementById("listadoP").innerHTML = abc;
})

botonAgregarCarrito.addEventListener('click', function () {
    let a = document.getElementById('listaCarrito').value;
    if (a == "vacio") {
        alert('no ha seleccionado ningun producto');
    } else {
        let nuevaCompra = new carrito(a)
        listaCarrito.push(nuevaCompra);
        listaCarritoDos.push(document.getElementById('listaCarrito').value);
        let i = listaProductosFija.indexOf(a);
        //console.log(listaPrecio[i]);
        //console.log(i)
        //console.log(listaPrecio)
        sumaPrecio.push(listaPrecio[i]);
        //console.log(sumaPrecio);
        let abc = listaCarrito.map(function (c) {
            return '<h6>' + c.nombre + '</h6>';
        })
        document.getElementById('listaCompra').innerHTML = abc;
    }

})

botonBorrarP.addEventListener('click', function () {
    let a = document.getElementById('nombreBorrar').value;
    a = a.toLowerCase();
    let i = listaCarritoDos.indexOf(a);
    let indice = listaProductosFija.indexOf(a);
    let precioBorrar = listaPrecio[indice];
    let indiceBorrar = sumaPrecio.indexOf(precioBorrar);
    console.log(i);
    if (a == -1) {
        alert('producto no encontrado');
    } else {
        listaCarrito.splice(i, 1);
        listaCarritoDos.splice(i, 1);
        sumaPrecio.splice(indiceBorrar, 1);
        let abc = listaCarrito.map(function (c) {
            return '<h6>' + c.nombre + '</h6><br>';
        })
        document.getElementById('listaCompra').innerHTML = abc;
    }
    ;
})


botonRealizarCompra.addEventListener('click', function () {
    for (i = 0; i < sumaPrecio.length; i++) {

        numero = parseFloat(sumaPrecio[i]);



        suma += numero;

    }
    alert('Gracias por realizar su compra.\nEl total a pagar es: $' + suma);
})
let idBuscado;
botonBuscarUsuario.addEventListener('click', function () {
    idBuscado = parseInt(document.getElementById('idModificar').value);
    idBuscado--;
    document.getElementById('nombreModificar').value = lista[idBuscado].nombre;
    document.getElementById('apellidoModificar').value = lista[idBuscado].apellido;
    document.getElementById('mailModificar').value = lista[idBuscado].mail;
    document.getElementById('telefonoModificar').value = lista[idBuscado].telefono;

})
botonModificarUsuario.addEventListener('click', function () {
    let nombreModificar = document.getElementById('nombreModificar').value.trim();
    let apellidoModificar = document.getElementById('apellidoModificar').value.trim();
    let mailModificar = document.getElementById('mailModificar').value.trim();
    let telefonoModificar = document.getElementById('telefonoModificar').value.trim();
    if (telefonoModificar <= 0 || telefonoModificar.length < 10 || telefonoModificar.length > 15) {
        alert('ingrese un numero de telefono valido');

    } else {
        if (nombreModificar == "" || apellidoModificar == "" || mailModificar == "" || telefonoModificar == "") {
            alert('uno de los campos esta vacio');
        } else {
            lista[idBuscado].nombre = nombreModificar;
            lista[idBuscado].apellido = apellidoModificar;
            lista[idBuscado].telefono = telefonoModificar;
            lista[idBuscado].mail = mailModificar;
            alert('Usuario modificado con exito!!!');
            document.getElementById('nombreModificar').value = "";
            document.getElementById('apellidoModificar').value = "";
            document.getElementById('mailModificar').value = "";
            document.getElementById('telefonoModificar').value = "";
            console.log(lista);
        }
    }
})

function crearUsuario() {
    let nuevoUsuario = new usuario(nombreU, apellidoU, mailU, telefonoU, idUsuario);
    lista.push(nuevoUsuario);
    console.log(lista);
}

function crearProducto() {
    let nuevoProducto = new productos(nombreP, precioP);
    listaP.push(nuevoProducto);
}
function imprimirUsuario() {
    let abc = lista.map(function (bar) {
        return '<ul><li>Nombre: ' + bar.nombre + '</li><li>Apellido ' + bar.apellido + '</li><li> Mail: ' + bar.mail + '</li><li> Telefono: ' + bar.telefono + '</li><li> ID: ' + bar.id + '</li></ul>';
    })
    document.getElementById("listadoU").innerHTML = abc;
}