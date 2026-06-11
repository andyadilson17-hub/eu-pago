document.addEventListener("DOMContentLoaded", () => {
    
    // Elementos Capturados da Interface
    const loginForm = document.getElementById("loginForm");
    const btnGoogleLogin = document.getElementById("btnGoogleLogin");
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.getElementById("togglePassword");

    // 1. Funcionalidade Alternar Visibilidade da Senha (Ícone do Olho)
    togglePasswordIcon.addEventListener("click", () => {
        // Altera o tipo do input entre 'password' e 'text'
        const isPassword = passwordInput.getAttribute("type") === "password";
        passwordInput.setAttribute("type", isPassword ? "text" : "password");
        
        // Substitui o ícone com base no estado visual de exibição
        if (isPassword) {
            togglePasswordIcon.classList.remove("fa-eye");
            togglePasswordIcon.classList.add("fa-eye-slash");
        } else {
            togglePasswordIcon.classList.remove("fa-eye-slash");
            togglePasswordIcon.classList.add("fa-eye");
        }
    });

    // 2. Simulação do Envio do Formulário Tradicional
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarga padrão de página
        
        const emailValue = document.getElementById("email").value;
        const passwordValue = passwordInput.value;
        const rememberMeValue = document.getElementById("rememberMe").checked;

        console.log("Tentativa de login processada para o backend:", {
            email: emailValue,
            remember: rememberMeValue
        });

        // Alerta mockado simulando sucesso de autenticação
        alert(`Login efetuado com sucesso para: ${emailValue}`);
    });

    // 3. Simulação de Login Social via Google
    btnGoogleLogin.addEventListener("click", () => {
        alert("Redirecionando para a API de autenticação do Google...");
    });
});