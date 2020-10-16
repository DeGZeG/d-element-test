export default function showMessage(text, duration) {
    const message = document.createElement('div');
    message.classList.add('message-popup');
    message.innerHTML = text;
    document.body.append(message);

    setTimeout(() => {
        message.style.opacity = '1';
    }, 0);

    setTimeout(() => {
        message.style.opacity = '0';

        setTimeout(() => {
            message.remove();
        }, 500)
    }, duration-500);
}