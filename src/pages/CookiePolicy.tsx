import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CookiePolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-card rounded-2xl shadow-xl p-12 space-y-8 leading-relaxed">

          <h1 className="text-3xl font-heading text-primary">
            Cookie Policy
          </h1>

          <p className="text-lg font-medium">
            IndoMaple Tours a Unit of GlobiTrips Hospitality Marketing Services Inc
          </p>

          <p className="text-sm text-foreground/70 italic">
            Last Updated: 4th Feb 2026
          </p>

          <p>This Cookie Policy explains how IndoMaple Tours (“IndoMaple”, “we”, “our”, or “us”) uses cookies and similar technologies on www.indomapletours.ca (the “Website”).</p>

          <p>By continuing to use our Website, you consent to the use of cookies as described in this policy.</p>

          <h2 className="text-2xl font-semibold text-primary">1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites function efficiently, improve user experience, and provide analytical insights.</p>
          <p>Cookies may be:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Session cookies (deleted when you close your browser)</li>
            <li>Persistent cookies (remain on your device for a set period)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary">2. Why We Use Cookies</h2>
          <p>IndoMaple Tours uses cookies for the following purposes:</p>

          <h3 className="text-xl font-medium">a) Essential Cookies</h3>
          <p>These cookies are necessary for the Website to function properly. They enable core features such as page navigation, secure access, and form submissions.</p>

          <h3 className="text-xl font-medium">b) Performance & Analytics Cookies</h3>
          <p>We may use analytics tools (such as Google Analytics or similar services) to understand how visitors use our Website, which pages are most visited, and how users interact with our content. The information collected is aggregated and does not directly identify individual users.</p>

          <h3 className="text-xl font-medium">c) Functional Cookies</h3>
          <p>These cookies remember user preferences such as language settings, form entries, and location preferences to enhance your browsing experience.</p>

          <h3 className="text-xl font-medium">d) Marketing & Advertising Cookies</h3>
          <p>If applicable, we may use cookies to measure effectiveness of digital campaigns, deliver relevant advertising, and retarget visitors who have shown interest in our services.</p>

          <h2 className="text-2xl font-semibold text-primary">3. Third-Party Cookies</h2>
          <p>Some cookies on our Website may be placed by third-party service providers, including analytics providers, advertising platforms, and embedded content providers. We do not control third-party cookies and encourage you to review their respective privacy policies.</p>

          <h2 className="text-2xl font-semibold text-primary">4. Managing Cookies</h2>
          <p>You can control or disable cookies through your browser settings. Most browsers allow you to delete existing cookies, block future cookies, or receive alerts when cookies are being used.</p>
          <p className="italic">Please note that disabling certain cookies may impact the functionality of the Website.</p>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-primary">Contact Us</h2>
            <p>If you have any questions about this Cookie Policy, please contact us at: <a href="mailto:hello@indomapletours.ca" className="text-secondary hover:underline">hello@indomapletours.ca</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
