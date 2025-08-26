
window.addEventListener ("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    const formName = document.getElementById("formName");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");
    const errorMessage = document.getElementById('errorMessage');
    const infoMessage = document.getElementById('infoMessage');
    const submitbtn = document.getElementById('submit');
    const form_errors = document.getElementById('form_error');

    const formErrors = [];

    formName.addEventListener("input", (event) => {
        if (!formName.checkValidity()) {
            formName.setCustomValidity("Please enter your name!");
            captureError('formName', 'Please enter your name!');
            console.log(formErrors);
        } else {
            formName.setCustomValidity("");
        }
    });
    email.addEventListener("input", (event) => {
        console.log(email.checkValidity());
        if (email.validity.typeMismatch) {
            email.setCustomValidity("Please ensure you entered a valid email address!");
            captureError('email', 'Please ensure you entered a valid email address!');
            console.log(formErrors);
        } else {
            email.setCustomValidity("");
        }
    });

    comment.addEventListener("input", (event) => {
        if (comment.validity.patternMismatch) {
            comment.setCustomValidity("Please make sure you only use letters, numbers, or !.,?$%");
            captureError('comment', 'Please make sure you only use letters, numbers, or !.,?$%');
            console.log(formErrors);
            errorMessage.textContent = 'Illegal character detected!';
            // Fade out the message over time
            setTimeout(() => {
                errorMessage.textContent = '';
                errorMessage.textContent = 'Error message: Illegal character detected!'
            } ,1000); // Adjust the fade-out duration as needed

                    // Update character count dynamically
        } else {
            comment.setCustomValidity("");
        }

        // Update character count dynamically
        const remainingChars = 50 - comment.value.length;
        infoMessage.textContent = `Info message: Characters remaining: ${remainingChars}`;

        // Update style based on character count
        if (remainingChars < 10) {
            infoMessage.classList.add('error');
            infoMessage.classList.remove('warn');
        } else if (remainingChars < 20) {
            infoMessage.classList.add('warn');
            infoMessage.classList.remove('error');
        } else {
            infoMessage.classList.remove('warn', 'error');
        }
    });

    function captureError(fieldName, errorMessage) {
        formErrors.push({ field: fieldName, message: errorMessage });
    }

    submitbtn.addEventListener("click", (event) => {
        // Encode the formErrors array in JSON format
        const formErrorsJson = JSON.stringify(formErrors);
        console.log(formErrors);
        console.log(formErrorsJson);
        form_errors.value = formErrorsJson;
    });


});