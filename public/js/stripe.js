import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  // if (typeof Stripe === 'undefined') {
  //   showAlert('error', 'Stripe is not loaded correctly!');
  //   return;
  // }

  const stripe = Stripe(
    'pk_test_51QdSyzGGvFqnG1G29ksdlB8YbmAt7LTMj7txvBWziGnaDJ3pJqvg8cir2NSnT1ey4vwiYWLVdpkIZhagzhOB7ygi00vgrmX6Ll',
  );

  try {
    // 1) Get the checkout session from the server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
