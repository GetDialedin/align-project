// Initialize Supabase
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Register user with Supabase
    const { user, error } = await supabase.auth.signUp({
        email: username,
        password: password
    });
    
    if (error) {
        alert('Registration failed: ' + error.message);
    } else {
        alert('User ' + username + ' registered successfully.');
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    
    // Login user with Supabase
    const { user, error } = await supabase.auth.signIn({
        email: loginUsername,
        password: loginPassword
    });
    
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        alert('User ' + loginUsername + ' logged in successfully.');
    }
});

// Initialize Stripe
const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');

// Handle payment form submission
document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    
    // Create a payment intent and handle payment processing
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    });
    const data = await response.json();

    // Use Stripe to confirm the payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
        },
    });

    if (result.error) {
        alert('Payment failed: ' + result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
    }
});
