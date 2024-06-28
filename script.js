// Function to convert number to words (simple version)
function convertNumberToWords(num) {
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return num.toString().split('').map(digit => words[Number(digit)]).join(' ');
}

// Loan application form validation and handling
// Execute when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the Loan Application page by looking for the form
    if (document.getElementById('loanForm')) {
        document.getElementById('loanForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
             // Collect input values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const pan = document.getElementById('pan').value.trim();
            const loanAmount = document.getElementById('loanAmount').value.trim();

            let valid = true;

            // Full Name validation (minimum two words, each with at least 4 characters)
            const nameRegex = /^[A-Za-z]{4,}\s[A-Za-z]{4,}$/;
            if (!nameRegex.test(fullName)) {
                valid = false;
                document.getElementById('nameError').textContent = "Full name must contain at least two words, each with at least 4 characters.";
            } else {
                document.getElementById('nameError').textContent = "";
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                valid = false;
                document.getElementById('emailError').textContent = "Please enter a valid email address.";
            } else {
                document.getElementById('emailError').textContent = "";
            }

            // PAN validation (format ABCDE1234F)
            const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
            if (!panRegex.test(pan)) {
                valid = false;
                document.getElementById('panError').textContent = "PAN must be in the format ABCDE1234F.";
            } else {
                document.getElementById('panError').textContent = "";
            }

            // Loan Amount validation and conversion
            const loanAmountNum = parseInt(loanAmount, 10);
            if (isNaN(loanAmountNum) || loanAmount.length > 9) {
                valid = false;
                document.getElementById('loanError').textContent = "Loan amount must be a numeric value with a maximum of 9 digits.";
                document.getElementById('amountInWords').textContent = "";
            } else {
                document.getElementById('loanError').textContent = "";
                document.getElementById('amountInWords').textContent = `Amount in words: ${convertNumberToWords(loanAmountNum)}`;
            }

            if (valid) {
                // Store values in localStorage and navigate to confirmation page
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('email', email);
                window.location.href = 'confirm.html';
            }
        });
    }

    // Confirmation page logic
    if (document.getElementById('otpForm')) {
        const fullName = localStorage.getItem('fullName');
        const email = localStorage.getItem('email');
        const firstName = fullName.split(' ')[0];
        const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
        let attempts = 0;

        console.log(`Generated OTP: ${otp}`); // Log the OTP for verification

        document.getElementById('confirmationMessage').textContent = 
         `Dear ${firstName}, Thank you for your inquiry. A 4-digit verification number has been sent to your email: ${email}. Please enter it below:`;

        document.getElementById('otpForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const enteredOtp = document.getElementById('otp').value.trim();

            if (parseInt(enteredOtp, 10) === otp) {
                document.getElementById('otpForm').style.textAlign = 'center';
                document.getElementById('otpForm').style.color = 'green';
                document.getElementById('otpForm').innerHTML = "<p>Validation Successful!</p>";

                // Clear the confirmation message
                document.getElementById('confirmationMessage').textContent = "";
                
                setTimeout(() => {
                    window.location.href = 'https://pixel6.com'; // Optional redirect to the Pixel6 home page 
                }, 2000);
            } else {
                attempts++;
                document.getElementById('otpError').textContent = `Invalid OTP. ${3 - attempts} attempts left.`;
                if (attempts >= 3) {
                    document.getElementById('otpForm').innerHTML = "<p>Validation Failed! Redirecting...</p>";
                    setTimeout(() => {
                        window.location.href = 'https://pixel6.com/404'; // Optional redirect to a 404 page
                    }, 2000);
                }
            }
        });
    }
});

