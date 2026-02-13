import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-card rounded-2xl shadow-xl p-12 space-y-8 leading-relaxed">

          <h1 className="text-3xl font-heading text-primary">
            Privacy Policy
          </h1>

          <p>This Privacy Policy explains how IndoMaple Tours (“IndoMaple Tours”, “we”, “our”, or “us”) collects, uses, protects, and discloses your information when you visit our website or use our services.</p>

          <p>We respect your privacy and are committed to protecting your personal information in accordance with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA).</p>

          <p className="text-sm text-foreground/70 italic">By using our website or services, you agree to the practices described in this Privacy Policy. This policy may be updated from time to time. We encourage you to review it periodically.</p>

          <h2 className="text-2xl font-semibold text-primary">Information We Collect</h2>
          <p>We may collect the following types of information:</p>

          <h3 className="text-xl font-medium">Personal Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Telephone number</li>
            <li>Postal code and country of residence</li>
            <li>Passport details (only when required for bookings)</li>
            <li>Payment information (credit/debit card details or other payment method information)</li>
          </ul>

          <h3 className="text-xl font-medium">Travel-Related Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Travel preferences</li>
            <li>Special requests</li>
            <li>Dietary or accommodation requirements</li>
            <li>Details required to process bookings</li>
          </ul>

          <h3 className="text-xl font-medium">Technical Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Website usage data</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary">How We Use Your Information</h2>
          <p>We collect and use your information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Process and manage travel bookings</li>
            <li>Communicate with you regarding inquiries or reservations</li>
            <li>Provide customer support</li>
            <li>Improve our website and services</li>
            <li>Send relevant updates, offers, or marketing communications (only if you opt in)</li>
            <li>Meet legal, regulatory, and contractual obligations</li>
          </ul>
          <p className="italic">We only collect information necessary to provide our services effectively.</p>

          <h2 className="text-2xl font-semibold text-primary">Payment Security</h2>
          <p>Payment information is processed securely through trusted third-party payment providers. We do not store complete credit card details on our servers.</p>
          <p>We implement appropriate physical, electronic, and managerial safeguards to protect your personal information from unauthorized access, misuse, or disclosure.</p>

          <h2 className="text-2xl font-semibold text-primary">Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. Cookies help us:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Analyze website traffic</li>
            <li>Understand user behavior</li>
            <li>Improve website functionality</li>
            <li>Personalize your experience</li>
          </ul>
          <p>You can choose to accept or decline cookies through your browser settings. Please note that disabling cookies may affect certain website features.</p>

          <h2 className="text-2xl font-semibold text-primary">Sharing of Information</h2>
          <p>We do not sell, rent, or trade your personal information. We may share your information only when necessary to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Confirm travel bookings with hotels, airlines, transport providers, or local partners</li>
            <li>Comply with legal obligations</li>
            <li>Protect our rights or prevent fraud</li>
          </ul>
          <p className="italic">All partners and service providers are expected to maintain appropriate data protection standards.</p>

          <h2 className="text-2xl font-semibold text-primary">Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. Once you leave our site, we are not responsible for the privacy practices of those websites. We encourage you to review their privacy policies.</p>

          <h2 className="text-2xl font-semibold text-primary">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to your personal information</li>
            <li>Request corrections to inaccurate or incomplete information</li>
            <li>Withdraw consent for marketing communications at any time</li>
          </ul>
          <p>To exercise any of these rights, please contact us at: <a href="mailto:hello@indomapletours.ca" className="text-secondary hover:underline">hello@indomapletours.ca</a></p>
          <p className="italic">We will respond to your request within a reasonable timeframe.</p>

          <h2 className="text-2xl font-semibold text-primary">Data Retention</h2>
          <p>We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-primary">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or how your information is handled, please contact:</p>
            <p className="font-medium">Email: <a href="mailto:hello@indomapletours.ca" className="text-secondary hover:underline">hello@indomapletours.ca</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
