document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    const scrollToTopButton = document.getElementById('scrollToTop');

    window.onscroll = function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    };

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        document.getElementById('clock').textContent = timeString;
    }

    updateClock();
    setInterval(updateClock, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');
    const averageResultDiv = document.getElementById('averageResult');
    const errorMessage = document.getElementById('errorMessage');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        errorMessage.style.display = 'none';
        
        const contactInfo = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            question1: parseInt(document.getElementById('question1').value),
            question2: parseInt(document.getElementById('question2').value),
            question3: parseInt(document.getElementById('question3').value),
            question4: parseInt(document.getElementById('question4').value),
            question5: parseInt(document.getElementById('question5').value),
        };

        if (!contactInfo.firstName.trim()) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Vardas negali būti tuščias!';
            return;
        }

        if (!contactInfo.lastName.trim()) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Pavardė negali būti tuščia!';
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(contactInfo.email)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Neteisingas el. pašto adresas!';
            return;
        }

        const phoneRegex = /^\+?\d{1,4}?[\d\s-]{5,20}$/;
        if (!phoneRegex.test(contactInfo.phone)) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Neteisingas telefono numeris!';
            return;
        }

        if (!contactInfo.address.trim()) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Adresas negali būti tuščias!';
            return;
        }

        const questions = [
            contactInfo.question1,
            contactInfo.question2,
            contactInfo.question3,
            contactInfo.question4,
            contactInfo.question5
        ];

        for (let i = 0; i < questions.length; i++) {
            if (isNaN(questions[i]) || questions[i] < 1 || questions[i] > 10) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = `Klausimas ${i + 1} turi būti skaičius nuo 1 iki 10!`;
                return;
            }
        }

        console.log(contactInfo);

        resultDiv.innerHTML = `
            <div><strong>Vardas:</strong> ${contactInfo.firstName}</div>
            <div><strong>Pavardė:</strong> ${contactInfo.lastName}</div>
            <div><strong>El. paštas:</strong> ${contactInfo.email}</div>
            <div><strong>Telefono numeris:</strong> ${contactInfo.phone}</div>
            <div><strong>Adresas:</strong> ${contactInfo.address}</div>
        `;

        const average = questions.reduce((a, b) => a + b, 0) / questions.length;
        
        let averageText = `Vidutinė įvertinimų reikšmė: ${average.toFixed(2)}`;
        let color = '';
        
        if (average <= 4) {
            color = 'red';
        } else if (average <= 7) {
            color = 'orange';
        } else {
            color = 'green';
        }

        averageResultDiv.innerHTML = `<strong style="color: ${color};">${averageText}</strong>`;
    });
});

