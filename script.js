// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add registration logic here
    alert(`User ${username} registered successfully!`);
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    // Add login logic here
    alert(`User ${loginUsername} logged in successfully!`);
});
// Initialize Stripe
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

// Handle payment form submission
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    // Create a payment intent and handle payment processing
    fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => {
        stripe.confirmCardPayment(data.clientSecret).then(function(result) {
            if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                alert('Payment failed: ' + result.error.message);
            } else {
                // The payment has been processed!
                if (result.paymentIntent.status === 'succeeded') {
                    alert('Payment successful!');
                }
            }
        });
    });
});
