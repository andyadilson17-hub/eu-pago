document.addEventListener("DOMContentLoaded", () => {
    
    // Elementos Interativos do Menu
   

    // Eventos de clique simulados para feedback visual tátil
    btnMainScan.addEventListener("click", () => {
        alert("A abrir a câmara para escanear código de barras...");
    });

    actionScan.addEventListener("click", () => {
        alert("Redirecionando para o Scanner...");
    });

    actionCart.addEventListener("click", () => {
        alert("A abrir o seu Carrinho de Compras.");
    });

    actionQr.addEventListener("click", () => {
        alert("A gerar código QR para validação no balcão...");
    });

    actionPay.addEventListener("click", () => {
        alert("A processar integração com o Multicaixa Express...");
    });

    // Controlar a activação dos botões da barra inferior
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", function(e) {
            // Remove a classe active de todos
            navItems.forEach(nav => nav.classList.remove("active"));
            // Adiciona ao item clicado
            this.classList.add("active");
        });
    });
});

const pages = {

    home: document.getElementById("homePage"),
    scanner: document.getElementById("scannerPage"),
    cart: document.getElementById("cartPage"),
    orders: document.getElementById("ordersPage"),
    profile: document.getElementById("profilePage")
};

function showPage(pageId){

    document
        .querySelectorAll(".page-section")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );
        });

    pages[pageId]
        .classList
        .add("active-page");
}

const navItems =
    document.querySelectorAll(
        ".bottom-nav .nav-item"
    );

navItems[0].addEventListener(
    "click",
    () => showPage("home")
);

navItems[1].addEventListener(
    "click",
    () => showPage("scanner")
);

navItems[2].addEventListener(
    "click",
    () => showPage("cart")
);

navItems[3].addEventListener(
    "click",
    () => showPage("orders")
);

navItems[4].addEventListener(
    "click",
    () => showPage("profile")
);

const addBtn =
document.querySelector(".btn-add-cart");

const toast =
document.getElementById(
    "toastMessage"
);

addBtn.addEventListener("click",()=>{

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

});