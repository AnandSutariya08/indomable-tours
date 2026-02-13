import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">This Privacy Policy explains how IndoMaple Tours (“IndoMaple Tours”, “we”, “our”, or “us”) collects, uses, protects, and discloses your information when you visit our website or use our services.</p>
      <p className="mb-4">We respect your privacy and are committed to protecting your personal information in accordance with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
      <p className="mb-4 text-sm text-gray-600 italic">By using our website or services, you agree to the practices described in this Privacy Policy. This policy may be updated from time to time. We encourage you to review it periodically.</p>
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-2">We may collect the following types of information:</p>
        <h3 className="text-xl font-medium mt-4 mb-2">Personal Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Full name</li>
          <li>Email address</li>
          <li>Telephone number</li>
          <li>Postal code and country of residence</li>
          <li>Passport details (only when required for bookings)</li>
          <li>Payment information (credit/debit card details or other payment method information)</li>
        </ul>
        <h3 className="text-xl font-medium mt-4 mb-2">Travel-Related Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Travel preferences</li>
          <li>Special requests</li>
          <li>Dietary or accommodation requirements</li>
          <li>Details required to process bookings</li>
        </ul>
        <h3 className="text-xl font-medium mt-4 mb-2">Technical Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Website usage data</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-2">We collect and use your information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process and manage travel bookings</li>
          <li>Communicate with you regarding inquiries or reservations</li>
          <li>Provide customer support</li>
          <li>Improve our website and services</li>
          <li>Send relevant updates, offers, or marketing communications (only if you opt in)</li>
          <li>Meet legal, regulatory, and contractual obligations</li>
        </ul>
        <p className="mb-4 italic">We only collect information necessary to provide our services effectively.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Security</h2>
        <p className="mb-4">Payment information is processed securely through trusted third-party payment providers. We do not store complete credit card details on our servers.</p>
        <p className="mb-4">We implement appropriate physical, electronic, and managerial safeguards to protect your personal information from unauthorized access, misuse, or disclosure.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="mb-4">Our website uses cookies to enhance your browsing experience. Cookies help us:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Analyze website traffic</li>
          <li>Understand user behavior</li>
          <li>Improve website functionality</li>
          <li>Personalize your experience</li>
        </ul>
        <p className="mb-4">You can choose to accept or decline cookies through your browser settings. Please note that disabling cookies may affect certain website features.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
        <p className="mb-4">We do not sell, rent, or trade your personal information. We may share your information only when necessary to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Confirm travel bookings with hotels, airlines, transport providers, or local partners</li>
          <li>Comply with legal obligations</li>
          <li>Protect our rights or prevent fraud</li>
        </ul>
        <p className="mb-4 italic">All partners and service providers are expected to maintain appropriate data protection standards.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
        <p className="mb-4">Our website may contain links to third-party websites. Once you leave our site, we are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-2">You have the right to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Request access to your personal information</li>
          <li>Request corrections to inaccurate or incomplete information</li>
          <li>Withdraw consent for marketing communications at any time</li>
        </ul>
        <p className="mb-4">To exercise any of these rights, please contact us at: <a href="mailto:hello@indomapletours.ca" className="text-blue-600 hover:underline">hello@indomapletours.ca</a></p>
        <p className="mb-4 italic">We will respond to your request within a reasonable timeframe.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p className="mb-4">We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
      </section>

      <section className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy or how your information is handled, please contact:</p>
        <p className="mb-4 font-medium">Email: <a href="mailto:hello@indomapletours.ca" className="text-blue-600 hover:underline">hello@indomapletours.ca</a></p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
