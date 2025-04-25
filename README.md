<div align="center">

# Moneroo React SDK

[![npm version](https://img.shields.io/npm/v/moneroo-react-sdk.svg?style=flat-square)](https://www.npmjs.com/package/moneroo-react-sdk)
[![npm downloads](https://img.shields.io/npm/dm/moneroo-react-sdk.svg?style=flat-square)](https://www.npmjs.com/package/moneroo-react-sdk)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/moneroo-react-sdk?style=flat-square)](https://bundlephobia.com/package/moneroo-react-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Website](https://www.moneroo.io) · [Contact](https://moneroo.io/contact) · [Documentation](https://docs.moneroo.io)

</div>

## Overview

Moneroo React SDK provides a simple and reliable way to integrate payment processing into your React applications, with support for various payment methods across multiple African countries. The SDK offers a flexible API wrapper for seamless payment integration in your React applications.

## Features

- 🌍 **Multi-currency support** - Process payments in XOF, XAF, NGN, GHS, and many other African currencies
- 🔌 **Multiple payment methods** - Support for mobile money, bank transfers, cards, and more
- 🛡️ **Secure transactions** - PCI-compliant payment processing
- 🔧 **Flexible API** - Simple API for quick integration
- 🧪 **Sandbox mode** - Test your integration without real transactions

## Requirements

❗ In order to start using Moneroo React SDK you must have:

- React 16.8.0 or higher
- A Moneroo account and API key (get yours at [moneroo.io](https://moneroo.io))

## Installation

### Via npm

Install via npm:

```bash
npm install moneroo-react-sdk
```

### Via yarn

```bash
yarn add moneroo-react-sdk
```

### Via pnpm

```bash
pnpm add moneroo-react-sdk
```

## Documentation

This README provides basic usage information. For more detailed documentation:

- **Example App**: Check out the complete example below
- **API Reference**: Comprehensive API documentation is available in the code
- **Official Docs**: Visit [docs.moneroo.io](https://docs.moneroo.io) for the official Moneroo documentation

The SDK offers a simple way to integrate payments by providing two main functions:

- `initiatePayment` - Initiates a payment and redirects to the Moneroo checkout page
- `checkTransactionStatus` - Checks the status of a transaction

## Example Usage

Here's a simple example of how to integrate Moneroo payments in your React app:

```jsx
import React from 'react';
import { initiatePayment, checkTransactionStatus } from 'moneroo-react-sdk';

function PaymentButton() {
  const handlePayment = async () => {
    try {
      await initiatePayment(
        {
          amount: 1000, // Amount in smallest currency unit
          currency: 'XOF', // Currency code
          description: 'Premium subscription',
          email: 'customer@example.com',
          firstName: 'John',
          lastName: 'Doe',
          returnUrl: 'https://your-app.com/payment-callback',
          methods: ['mtn_bj', 'moov_bj'], // Optional payment methods
        },
        'YOUR_SECRET_KEY' // Your Moneroo secret key
      );
      // The SDK will automatically redirect to the Moneroo checkout page
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <button onClick={handlePayment}>
      Pay Now
    </button>
  );
}

export default PaymentButton;
```

### Checking Payment Status

```jsx
import React, { useState, useEffect } from 'react';
import { checkTransactionStatus } from 'moneroo-react-sdk';

function PaymentStatus({ transactionId }) {
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const result = await checkTransactionStatus(
          transactionId,
          'YOUR_SECRET_KEY' // Your Moneroo secret key
        );
        setStatus(result.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [transactionId]);

  if (loading) return <p>Checking payment status...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Payment Status</h2>
      <p>Status: {status}</p>
      {status === 'success' && <p>Thank you for your payment!</p>}
      {status === 'failed' && <p>Payment failed. Please try again.</p>}
      {status === 'pending' && <p>Payment is being processed...</p>}
    </div>
  );
}

export default PaymentStatus;
```

## Key Components

- **initiatePayment**: Function to start the payment process
- **checkTransactionStatus**: Function to verify payment status

### Required Parameters for initiatePayment

- **amount**: The amount to charge
- **currency**: The currency code (e.g., 'XOF')
- **description**: Payment description
- **email**: Customer email
- **firstName**: Customer first name
- **lastName**: Customer last name
- **returnUrl**: URL to redirect after payment
- **methods** (optional): Array of payment methods
- **secretKey**: Your Moneroo secret key

## Development

### Sandbox Testing

Moneroo provides a sandbox environment for testing your integration without making real transactions. To use the sandbox mode, use your sandbox API key from the Moneroo dashboard.

In sandbox mode, you can use test cards and payment methods to simulate different payment scenarios. For more information on testing, visit the [Moneroo Testing Documentation](https://docs.moneroo.io/testing).

### Error Handling

The SDK throws errors when API calls fail. It's important to handle these errors in your code:

```jsx
try {
  await initiatePayment(
    {
      // payment parameters
    },
    'YOUR_SECRET_KEY'
  );
} catch (error) {
  // Log the error details
  console.error('Moneroo Error:', error.message);
  
  // Show appropriate message to the user
  alert('Payment failed: ' + error.message);
}
```

## Frequently Asked Questions

### How do I handle payment webhooks?

Moneroo can send webhook notifications to your server when payment status changes. Configure your webhook URL in the Moneroo dashboard and implement an endpoint on your server to process these notifications.

### Can I customize the checkout page?

The checkout page is hosted by Moneroo and provides a consistent, secure payment experience. While the page itself cannot be customized, you can configure certain aspects like your business logo and colors in the Moneroo dashboard.

## Contributing

Contributions are welcome! If you'd like to contribute to the Moneroo React SDK:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Vulnerabilities

If you discover a security vulnerability within Moneroo React SDK, please send an e-mail to Moneroo Security via [hello@moneroo.io](mailto:hello@moneroo.io). All security vulnerabilities will be promptly addressed.

## Support

For support, questions, or feedback:

- 📧 Email: [support@moneroo.io](mailto:support@moneroo.io)
- 📝 Issues: [GitHub Issues](https://github.com/moneroo/moneroo-react-sdk/issues)
- 📚 Documentation: [docs.moneroo.io](https://docs.moneroo.io)

## License

The Moneroo React SDK is open-sourced software licensed under the MIT license.

---

Powered by Moneroo - The Payment Stack for Africa-