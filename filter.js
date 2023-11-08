const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
]

const divProductos=document.querySelector('.productos')
const divCategorias= document.querySelector('.categorias')
const rangoPrecios = document.querySelector(".precioRango");
const precioValor= document.querySelector(".precioValor");
const busqueda= document.querySelector(".search");


function pintarProductos(arrProductos){
  divProductos.innerHTML = ""
  arrProductos.forEach(element => {

  /*const divProducto= document.createElement('div')
    divProducto.classList.add('producto') */

    divProductos.innerHTML +=`
        <div class='producto'>
        <img src='${element.img}' alt='${element.name}'>
        <h3>${element.name}</h3>
        <p>${element.price}</p> 
      </div>
    `
    //divContainer.appendChild(divProducto)
  });
}


const pintarCategorias = () => {
  //genero un nuevo array con .map, quedandome solocon las categorias de lso objetos
  const allCategorias = data.map((item) => item.cat);
  console.log(allCategorias);

  //genero un Set de datos, que es una colección de valores únicos 
  const categorias = new Set(["All",...allCategorias])
  console.log(categorias);
    
  //pinto las categorias
  categorias.forEach(element => {
    divCategorias.innerHTML += `<span class="cat">${element}</span>`
  });

  //añado un addEventListener "click", al div que contiene todas las categorias
  divCategorias.addEventListener("click", (e) => {
    //alamceno el texto del elemento clickado
    const categoriaSeleccionada = e.target.textContent;

    //mando a la funcion pintarProductos() el array filtrado con los objetos
    //que tengan el mismo texto en la categoria que el texto almacenado en categoriaSeleccionada
    categoriaSeleccionada === 'All' 
    ? pintarProductos(data)
    : pintarProductos(data.filter((item) => item.cat === categoriaSeleccionada))
  })
};


const pintarPrecio = () => {
  const allPrecios = data.map((item) => item.price);
  const precioMax = Math.max(...allPrecios);

  rangoPrecios.max = precioMax;
  rangoPrecios.value = precioMax;
  precioValor.textContent = precioMax + " €" ;

  rangoPrecios.addEventListener("input", (e) => {
    precioValor.textContent = e.target.value + " €";
    pintarProductos(data.filter((item) => item.price <= e.target.value));
  });
};

busqueda.addEventListener("input", (e) => {
    //paso a minusculas el valor de la input de busqueda
    const value = e.target.value.toLowerCase();

    //busco si la subcadena de texto value se encuentra en el nombre del producto
    //Si la subcadena no se encuentra, devuelve -1.
    //Compara el resultado de indexOf() con -1. Si el resultado es diferente de -1, significa que la subcadena de texto se encontró en el nombre del producto, 
    //por lo que la función de filtro devolverá true. 
    pintarProductos(data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1));
});

pintarPrecio()
pintarCategorias();
pintarProductos(data)