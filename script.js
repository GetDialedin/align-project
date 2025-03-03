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
        document.getElementById('registrationFeedback').innerText = 'Registration failed: ' + error.message;
    } else {
        document.getElementById('registrationFeedback').innerText = 'User ' + username + ' registered successfully.';
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
        a;
    } else {
        document.getElementById('loginFeedback').innerText = 'User ' + loginUsername + ' logged in successfully.';
        window.location.href = '/home';
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
// Initialize Twilio Video call
const callButton = document.getElementById('call-button');

callButton.addEventListener('click', async () => {
    // Fetch a token from the server
    const response = await fetch('/get-twilio-token');
    const data = await response.json();
    const token = data.token;

    // Initialize Twilio Video client
    const Video = Twilio.Video;
    Video.connect(token, { name: 'expert-room' }).then(room => {
        console.log('Connected to Twilio Video room:', room.name);

        // Attach local video and audio tracks to the DOM
        const localTracks = room.localParticipant.tracks;
        localTracks.forEach(trackPublication => {
            if (trackPublication.track) {
                document.getElementById('local-media').appendChild(trackPublication.track.attach());
            }
        });

        // Attach remote participants' video and audio tracks to the DOM
        room.on('participantConnected', participant => {
            console.log('Participant connected:', participant.identity);
            participant.tracks.forEach(trackPublication => {
                if (trackPublication.track) {
                    document.getElementById('remote-media').appendChild(trackPublication.track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                document.getElementById('remote-media').appendChild(track.attach());
            });
        });
    }).catch(error => {
        console.error('Error connecting to Twilio Video:', error);
    });
});
