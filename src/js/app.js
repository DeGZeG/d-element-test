import showMessage from "./message";

class App {
    constructor() {
        this.togglePopupOnMousedown = this.togglePopupOnMousedown.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.lets_talk_btn = document.getElementById('lets-talk-btn');
        this.lets_talk_popup = document.getElementById('lets-talk-popup');
        this.lets_talk_overlay = document.getElementById('lets-talk-overlay');
        document.addEventListener('mousedown', this.togglePopupOnMousedown);

        this.form = document.getElementById('form');
        this.form.addEventListener('submit', this.submitForm);
    }

    togglePopup() {
        this.lets_talk_popup.classList.toggle('hide');
    }

    togglePopupOnMousedown(event) {
        if (event.target === this.lets_talk_btn || event.target === this.lets_talk_overlay)
            this.togglePopup();
    }

    validate(name, value) {
        switch (name) {
            case 'name':
                return /^[A-ZА-ЯЁ][a-zа-яё]*\s[A-ZА-ЯЁ][a-zа-яё]*$/.test(value);
            case 'email':
                const emailReg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return emailReg.test(value);
            default:
                return value !== '';
        }
    };

    clearErrors() {
        const errors = this.form.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    }

    async submitForm(event) {
        event.preventDefault();

        this.clearErrors();

        const formData = new FormData(this.form);
        const validation = [];
        for (let [name, value] of formData) {
            validation.push(this.validate(name, value));
        }

        for (let i = 0; i < validation.length; i++) {
            if (!validation[i]) {
                const error = document.createElement('label');
                error.className = 'popup__label error';
                error.innerHTML = 'Check this field!';
                this.form[i].parentElement.insertBefore(error, this.form[i]);
            }
        }

        if (!validation.includes(false)) {
            let response = await fetch('https://jsonplaceholder.typicode.com/comments/', {
                method: 'POST',
                body: new FormData(this.form)
            });

            for (let i = 0; i < validation.length; i++) {
                this.form[i].value = '';
            }

            this.togglePopup();

            if (response.ok) showMessage('Message sent successfully!', 4000);
            else showMessage('Sending failed', 4000);
        }
    }
}

const app = new App();
