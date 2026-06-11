document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. DECLARAÇÃO DE ELEMENTOS (SEGURA)
    // ==========================================
    const btnMainScan = document.getElementById("btnMainScan");
    const actionScan = document.getElementById("actionScan");
    const actionCart = document.getElementById("actionCart");
    const actionQr = document.getElementById("actionQr");
    const actionPay = document.getElementById("actionPay");
    const addBtn = document.querySelector(".btn-add-cart");
    const toast = document.getElementById("toastMessage");

    // Elementos da Câmara
    const video = document.getElementById("webcam");
    const btnStart = document.getElementById("btnStartCamera");
    const btnStop = document.getElementById("btnStopCamera");
    const cameraError = document.getElementById("cameraError");
    let streamMedia = null;

    // ==========================================
    // 2. EVENTOS DE CLIQUE SIMULADOS (HOME)
    // ==========================================
    if (btnMainScan) btnMainScan.addEventListener("click", () => showPage("scanner"));
    if (actionScan) actionScan.addEventListener("click", () => showPage("scanner"));
    if (actionCart) actionCart.addEventListener("click", () => showPage("cart"));
    if (actionQr) actionQr.addEventListener("click", () => alert("A gerar código QR para validação..."));
    if (actionPay) actionPay.addEventListener("click", () => alert("A integrar com o Multicaixa Express..."));

    if (addBtn && toast) {
        addBtn.addEventListener("click", () => {
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2000);
        });
    }

    // ==========================================
    // 3. CONTROLO DE NAVEGAÇÃO ENTRE ABAS
    // ==========================================
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const pageMapping = ["home", "scanner", "cart", "orders", "profile"];
    
    navItems.forEach((item, index) => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Remove estado ativo de todas as abas e adiciona à clicada
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");

            // Se o utilizador sair da aba do scanner, desliga a câmara automaticamente
            if (pageMapping[index] !== "scanner" && streamMedia) {
                stopCamera();
            }

            // Ativa a página correta
            showPage(pageMapping[index]);
        });
    });

    // ==========================================
    // 4. LÓGICA DA CÂMARA (COM VERIFICAÇÃO DE SEGURANÇA)
    // ==========================================
    async function startCamera() {
        if (!video || !cameraError || !btnStart || !btnStop) return;

        cameraError.style.display = "block";
        cameraError.textContent = "A solicitar acesso à câmara...";

        const constraints = {
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        };

        try {
            streamMedia = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = streamMedia;
            
            cameraError.style.display = "none";
            btnStart.style.display = "none";
            btnStop.style.display = "inline-flex";
        } catch (err) {
            console.error("Erro ao aceder à câmara: ", err);
            cameraError.textContent = "Erro: Sem permissão ou câmara não encontrada.";
        }
    }

    function stopCamera() {
        if (streamMedia) {
            const tracks = streamMedia.getTracks();
            tracks.forEach(track => track.stop());
            if (video) video.srcObject = null;
            streamMedia = null;
        }
        if (btnStart && btnStop && cameraError) {
            btnStart.style.display = "inline-flex";
            btnStop.style.display = "none";
            cameraError.style.display = "block";
            cameraError.textContent = "Câmara desligada.";
        }
    }

    // Só adiciona os eventos da câmara se os botões existirem no HTML atual
    if (btnStart) btnStart.addEventListener("click", startCamera);
    if (btnStop) btnStop.addEventListener("click", stopCamera);
});

// ==========================================
    // CONTROLO COMPORTAMENTAL DO CARRINHO
    // ==========================================
    const cartList = document.querySelector(".cart-items-list");
    const btnAddNew = document.getElementById("btnAddNewProduct");

    // 1. Ouvir cliques em toda a lista do carrinho (Delegação de Eventos)
    if (cartList) {
        cartList.addEventListener("click", (e) => {
            // Se clicou no botão de Mais (+)
            if (e.target.classList.contains("btn-plus")) {
                const qtySpan = e.target.previousElementSibling;
                let currentQty = parseInt(qtySpan.textContent);
                qtySpan.textContent = currentQty + 1;
            }
            
            // Se clicou no botão de Menos (-)
            if (e.target.classList.contains("btn-minus")) {
                const qtySpan = e.target.nextElementSibling;
                let currentQty = parseInt(qtySpan.textContent);
                if (currentQty > 1) {
                    qtySpan.textContent = currentQty - 1;
                }
            }

            // Se clicou na lixeira para remover (ou no ícone dentro dela)
            if (e.target.closest(".btn-remove-item")) {
                const cartItem = e.target.closest(".cart-item");
                if (confirm("Deseja remover este produto do carrinho?")) {
                    cartItem.remove();
                }
            }
        });
    }

    // 2. Ação do Botão "Inserir" (Simula a adição de um novo produto com foto)
    if (btnAddNew) {
        btnAddNew.addEventListener("click", () => {
            const newProductHTML = `
                <div class="cart-item">
                    <div class="cart-item-img">
                        <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&auto=format&fit=crop&q=80" alt="Sumo Natural">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-name">Sumo Natural de Laranja Novo</span>
                        <span class="cart-item-price">950 Kz</span>
                    </div>
                    <div class="cart-quantity-controls">
                        <button class="btn-qty btn-minus">-</button>
                        <span class="qty-number">1</span>
                        <button class="btn-qty btn-plus">+</button>
                    </div>
                    <button class="btn-remove-item" title="Remover item">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            if (cartList) {
                cartList.insertAdjacentHTML("beforeend", newProductHTML);
                alert("Novo produto adicionado para simulação!");
            }
        });
    }

// ==========================================
// 5. SISTEMA GLOBAL DE TROCA DE PÁGINAS
// ==========================================
function showPage(pageId) {
    const pages = {
        home: document.getElementById("homePage"),
        scanner: document.getElementById("scannerPage"),
        cart: document.getElementById("cartPage"),
        orders: document.getElementById("ordersPage"),
        profile: document.getElementById("profilePage")
    };

    document.querySelectorAll(".page-section").forEach(page => {
        page.classList.remove("active-page");
    });

    if (pages[pageId]) {
        pages[pageId].classList.add("active-page");
    }
}