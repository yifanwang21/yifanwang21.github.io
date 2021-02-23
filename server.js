const stripe = require('stripe')('pk_test_51INt8KH2UY1RbYFHQLSxWrClR7GKq7kkzN1EoVaWPKiHnQg98faPGAmfcJ2jFhex12yHY7QAieo2q1HGHFZbbGkX001M5q3OXC');
const express = require('express');
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'https://www.blakehiltonphotography.com/';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log('Running on port 4242'));