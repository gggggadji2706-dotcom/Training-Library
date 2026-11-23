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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[А-Яа-яЁёA-Za-z]+(?:[ -][А-Яа-яЁёA-Za-z]+)*$/;
function validateField(id, errorId, message) {
    const input = document.getElementById(id);
    document.getElementById(errorId).textContent = message;
    input.classList.toggle('invalid', Boolean(message));
    input.classList.toggle('valid', !message);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
}
function emailCheck(id, errorId) {
    const value = document.getElementById(id).value.trim();
    return validateField(id, errorId, !value ? 'Введите Email' : !emailPattern.test(value) ? 'Введите корректный Email, например example@gmail.com' : '');
}
function loginPasswordCheck() {
    const value = document.getElementById('login-password').value;
    return validateField('login-password','login-password-error', !value ? 'Введите пароль' : value.length < 8 ? 'Минимум 8 символов' : '');
}
function nameCheck() {
    const value = document.getElementById('register-name').value.trim();
    return validateField('register-name','name-error', !value ? 'Введите имя' : value.length < 2 ? 'Минимум 2 буквы' : !namePattern.test(value) ? 'Допустимы только буквы, пробелы и дефисы' : '');
}
function updateRules() {
    const password = document.getElementById('register-password').value;
    const rules = [
        ['rule-length',password.length >= 8,'От 8 символов'],
        ['rule-upper',/[A-ZА-ЯЁ]/.test(password),'Заглавная буква'],
        ['rule-lower',/[a-zа-яё]/.test(password),'Строчная буква'],
        ['rule-number',/\d/.test(password),'Цифра']
    ];
    rules.forEach(([id,ok,label]) => {
        const element = document.getElementById(id);
        element.textContent = `${ok ? '✓' : '○'} ${label}`;
        element.classList.toggle('rule-valid',ok);
    });
}
function registerPasswordCheck() {
    const value = document.getElementById('register-password').value;
    updateRules();
    return validateField('register-password','password-error', !value ? 'Введите пароль' : value.length < 8 ? 'Минимум 8 символов' : !/[A-ZА-ЯЁ]/.test(value) ? 'Нужна заглавная буква' : !/[a-zа-яё]/.test(value) ? 'Нужна строчная буква' : !/\d/.test(value) ? 'Добавьте цифру' : '');
}
function confirmCheck() {
    const confirm = document.getElementById('register-confirm').value;
    return validateField('register-confirm','confirm-error', !confirm ? 'Повторите пароль' : confirm !== document.getElementById('register-password').value ? 'Пароли не совпадают' : '');
}
function message(id, text, success) {
    const element = document.getElementById(id);
    element.textContent = text;
    element.className = 'form-message ' + (success ? 'success' : 'fail');
}
const checks = {
    'login-email': () => emailCheck('login-email','login-email-error'),
    'login-password': loginPasswordCheck,
    'register-name': nameCheck,
    'register-email': () => emailCheck('register-email','email-error'),
    'register-password': registerPasswordCheck,
    'register-confirm': confirmCheck
};
Object.entries(checks).forEach(([id,check]) => {
    document.getElementById(id).addEventListener('input', () => {
        check();
        if (id === 'register-password' && document.getElementById('register-confirm').value) confirmCheck();
        document.getElementById(id.startsWith('login') ? 'login-message' : 'register-message').textContent = '';
    });
});
document.getElementById('demo-captcha').addEventListener('change', () => {
    document.getElementById('captcha-error').textContent = '';
});
loginPanel.addEventListener('submit', event => {
    event.preventDefault();
    const emailOK = checks['login-email']();
    const passwordOK = checks['login-password']();
    const captchaOK = document.getElementById('demo-captcha').checked;
    document.getElementById('captcha-error').textContent = captchaOK ? '' : 'Отметьте «Я не робот»';
    if (emailOK && passwordOK && captchaOK) {
        message('login-message','Поля заполнены правильно. Для настоящего входа нужен сервер авторизации.',true);
window.location.href = 'index 2.html';
        
    } else message('login-message','Исправьте ошибки в форме входа',false);
});
registerPanel.addEventListener('submit', event => {
    event.preventDefault();
    const results = [nameCheck(),checks['register-email'](),registerPasswordCheck(),confirmCheck()];
    if (results.every(Boolean)) message('register-message','Данные заполнены правильно. Для создания аккаунта нужен сервер.',true);
    else message('register-message','Исправьте ошибки в форме регистрации',false);
});
document.querySelectorAll('[data-provider]').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('oauth-message').textContent = `Для входа через ${button.dataset.provider} необходимо подключить авторизацию.`;
    });
});
document.getElementById('subscribeForm').addEventListener('submit', event => {
    event.preventDefault();
    alert('Спасибо за подписку!');
    event.currentTarget.reset();
});
updateRules();

