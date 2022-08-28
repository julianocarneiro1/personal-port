//método que captura a cor do tema setada no localStorage do navegador
function getTheme() {
    return localStorage.getItem('theme') || 'light';
}

//método que salva a cor do tema no localStorage do navegador
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

//método que aplica o tema de acordo com o momento do clique no botão
const colorScheme = document.querySelector('meta[name="color-scheme"]');
function applyTheme(theme) {
    document.body.className = theme;
    colorScheme.content = theme;
}

//método que faz a mudança do tema que está em vigor no momento
function rotateTheme(theme) {
    if (theme === 'light') {
        return 'dark'
    }
    return 'light';
}

//variável que captura o botão que faz a troca entre temas
const themeSwitcher = document.getElementById('theme-switcher');

//método que captura a ação do botão e aciona os demais métodos
setTimeout(() => {
    let theme = getTheme();
    applyTheme(theme);

    themeSwitcher.onclick = () => {
        const newTheme = rotateTheme(theme);
        applyTheme(newTheme);
        saveTheme(newTheme);

        theme = newTheme;
    }
}, 100);

//capturando elementos relacionados ao "toast" que será exibido ao enviar o e-mail
const toastTrigger = document.getElementById('liveToastBtn')
const toastLive = document.getElementById('liveToast')

//event listener que monitora o botão de envio de e-mail
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        sendEmail()
    })
}

//método que envia o e-mail através de um cliente SMTP e exibe notificação de sucesso no envio
function sendEmail() {
    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const numero = document.getElementById('numero')
    const mensagem = document.getElementById('mensagem')

    Email.send({
        Host: "smtp.gmail.com",
        Username: "testeparauninter@gmail.com",
        Password: "123abc789",
        To: 'julianoomc@gmail.com',
        From: email,
        Subject: "Contato via site",
        Body: nome, numero, mensagem
    }).then(
        (message) => {
            console.log(message)
            const toast = new bootstrap.Toast(toastLive)
            toast.show()
        }
    );
}