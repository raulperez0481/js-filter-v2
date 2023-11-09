document.addEventListener("DOMContentLoaded", function () {
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
      name: "Timex Men's Expedition Scout",
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
      name: "Casio Classic Resin Strap",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 74,
      cat: "Casual",
    },
  ];

  const divProductos = document.querySelector(".productos");
  const divCategorias = document.querySelector(".categorias");
  const rangoPrecios = document.querySelector(".precioRango");
  const precioValor = document.querySelector(".precioValor");
  const busqueda = document.querySelector(".search");


  function pintarProductos(arrProductos) {
    divProductos.innerHTML = "";
    arrProductos.forEach((element) => {
      divProductos.innerHTML += `
        <div class='producto'>
        <img src='${element.img}' alt='${element.name}'>
        <h3>${element.name}</h3>
        <p>${element.price}</p> 
      </div>
    `;
    });
  }

  function aplicarFiltros() {
    // El operador de encadenamiento opcional ?. se utiliza para manejar el caso en el que no se encuentra ningún elemento con la clase "selected", en cuyo caso categoriaSeleccionada será null.
    const categoriaSeleccionada = divCategorias.querySelector(".selected")?.textContent;

    //Aquí se obtiene el valor actual del elemento con el id rangoPrecios
    const precioMaximo = rangoPrecios.value;

    //Esta línea obtiene el valor del elemento con el identificador busqueda (probablemente un campo de entrada de texto) y lo convierte a minúsculas,
    const busquedaTexto = busqueda.value.toLowerCase();

    const productosFiltrados = data.filter((item) => {
      // El producto debe pertenecer a la categoría seleccionada ("All" o la categoría almacenada en categoriaSeleccionada.
      const cumpleCategoria = categoriaSeleccionada === "All" || item.cat === categoriaSeleccionada;

      // El precio del producto debe ser menor o igual al precio máximo especificado en precioMaximo.
      const cumplePrecio = item.price <= precioMaximo;

      //El nombre del producto (convertido a minúsculas) debe contener el texto de búsqueda (busquedaTexto).
      const cumpleBusqueda = item.name.toLowerCase().indexOf(busquedaTexto) !== -1;


     /*  Solo si cumpleCategoria, cumplePrecio y cumpleBusqueda son todos true, la expresión completa será true. En otras palabras, el producto debe cumplir con todos los criterios para ser incluido en la lista de productosFiltrados. Si alguno de los criterios no se cumple, la expresión completa será false, y el producto no se incluirá en la lista filtrada. */
      return cumpleCategoria && cumplePrecio && cumpleBusqueda;
    });
    console.log("este es el array de productos filtrados",productosFiltrados);
    pintarProductos(productosFiltrados);
  }

  divCategorias.addEventListener("click", (e) => {
    //verificamos si el elemento en el que se hizo clic (representado por e.target) tiene una clase llamada "cat".
    if (e.target.classList.contains("cat")) {
      const categorias = divCategorias.querySelectorAll(".cat");
      //iteramos a través de todos los elementos con la clase "cat" y eliminamos la clase "selected" de cada uno de ellos. 
      categorias.forEach((cat) => cat.classList.remove("selected"));
      //agregamos la clase "selected" al elemento en el que se hizo clic (representado por e.target). 
      e.target.classList.add("selected");
      //llamamos a la funcion aplicar filtros
      aplicarFiltros();
    }
  });


  //llamamos a la funcion aplicar filtros cada vez que cambia el valor de la input range
  rangoPrecios.addEventListener("input", aplicarFiltros);

  //llamamos a la funcion aplicar filtros cada vez que cambia el valor de la input de busqueda
  busqueda.addEventListener("input", aplicarFiltros);


  function pintarCategorias() {
    const allCategorias = data.map((item) => item.cat);
    const categorias = new Set(["All", ...allCategorias]);

    categorias.forEach((element) => {
      divCategorias.innerHTML += `<span class="cat">${element}</span>`;
    });
  }

  function pintarPrecio() {
    const allPrecios = data.map((item) => item.price);
    const precioMax = Math.max(...allPrecios);

    rangoPrecios.max = precioMax;
    rangoPrecios.value = precioMax;
    precioValor.textContent = precioMax + " €";

    rangoPrecios.addEventListener("input", (e) => {
      precioValor.textContent = e.target.value + " €";
    });
  }

  pintarCategorias();
  pintarPrecio();
  pintarProductos(data); // Mostrar todos los productos al inicio
});
