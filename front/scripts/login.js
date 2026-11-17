const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');

const loginPanel = document.getElementById('login-panel');
const registerPanel = document.getElementById('register-panel');

function selectTab(tab) {
    const isLogin = tab === 'login';

    loginTab.classList.toggle('active', isLogin);
    registerTab.classList.toggle('active', !isLogin);

    loginTab.setAttribute('aria-selected', String(isLogin));
    registerTab.setAttribute('aria-selected', String(!isLogin));

    loginPanel.hidden = !isLogin;
    registerPanel.hidden = isLogin;

    document.getElementById('oauth-message').textContent = '';
}

loginTab.addEventListener('click', () => selectTab('login'));

registerTab.addEventListener('click', () => selectTab('register'));

loginPanel.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.getElementById('login-message');

    const login = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!login || !password) {
        message.textContent = 'Заполните логин и пароль.';
        return;
    }

    if (!document.getElementById('demo-captcha').checked) {
        message.textContent =
            'Отметьте демонстрационную проверку «Я не робот».';
        return;
    }

    message.textContent =
        'Форма готова. ';

        window.location.href = 'index 2.html';
});


registerPanel.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = document.getElementById('register-message');

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email');
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;

    if (!name || !email.validity.valid || !email.value.trim()) {
        message.textContent = 'Укажите имя и корректный Email.';
        return;
    }

    if (password.length < 6) {
        message.textContent =
            'Пароль должен содержать не менее 6 символов.';
        return;
    }

    if (password !== confirm) {
        message.textContent = 'Пароли не совпадают.';
        return;
    }

    message.textContent =
        'Форма готова. ';
        window.location.href = 'login.html';
});

document.querySelectorAll('[data-provider]').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('oauth-message').textContent =
            ` Входа через ${button.dataset.provider} пока не доступен.`;
    });
});

document.getElementById('subscribeForm').addEventListener('submit', event => {
    event.preventDefault();

    alert('Спасибо за подписку!');

    event.currentTarget.reset();
});