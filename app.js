updateCartTotal();

document.getElementById("vaciar").addEventListener("click", vaciarCarito);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}
function addToCart(elem) {
    var sibs = [];
    var getprice;
    var obtenerNombreProducto;
    var cart = [];
     var stringCart;
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue;
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productoNombre") {
            obtenerNombreProducto = elem.innerText;
        }
        sibs.push(elem);
    }
    var product = {
        productoNombre : obtenerNombreProducto,
        price : getprice
    };
    //convierte la data de JSON para le storeage
    var stringProduct = JSON.stringify(product);
    
    if(!sessionStorage.getItem('cart')){
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(obtenerNombreProducto);
        updateCartTotal();
    }
    else {
       cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(obtenerNombreProducto);
        updateCartTotal();
    }
}
/* Calcular el Total */
function updateCartTotal(){
    var total = 0;
    var price = 0;
    var items = 0;
    var productoNombre = "";
    var tablaCarito = "";
    if(sessionStorage.getItem('cart')) {
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        items = cart.length;
        for (var i = 0; i < items; i++){
            var x = JSON.parse(cart[i]);
            price = parseFloat(x.price.split('$')[1]);
            productoNombre = x.productoNombre;
            //El total del precio
            tablaCarito += "<tr><td>" + productoNombre + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    document.getElementById("total").innerHTML = total.toFixed(2);
    document.getElementById("tablaCarito").innerHTML = tablaCarito;
    document.getElementById("itemsquantity").innerHTML = items;
}
function addedToCart(pname) {
  var mensaje = pname + " se agrego al carrrito";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = mensaje;
  if(!alerts.classList.contains("mensaje")){
     alerts.classList.add("mensaje");
  }
}
/*El Usuario vacia el carrito manualmente */
function vaciarCarito() {
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("mensaje")){
          alerts.classList.remove("mensaje");
      }
    }
}