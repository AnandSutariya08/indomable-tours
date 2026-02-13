import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
      <p className="text-lg font-medium mb-1">IndoMaple Tours a Unit of GlobiTrips Hospitality Marketing Services Inc</p>
      <p className="text-sm text-gray-500 mb-6 italic">Last Updated: 4th Feb 2026</p>
      
      <p className="mb-4">This Cookie Policy explains how IndoMaple Tours (“IndoMaple”, “we”, “our”, or “us”) uses cookies and similar technologies on www.indomapletours.ca (the “Website”).</p>
      <p className="mb-4">By continuing to use our Website, you consent to the use of cookies as described in this policy.</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
        <p className="mb-4">Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They help websites function efficiently, improve user experience, and provide analytical insights.</p>
        <p className="mb-2">Cookies may be:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Session cookies (deleted when you close your browser)</li>
          <li>Persistent cookies (remain on your device for a set period)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. Why We Use Cookies</h2>
        <p className="mb-4">IndoMaple Tours uses cookies for the following purposes:</p>
        
        <h3 className="text-xl font-medium mt-4 mb-2">a) Essential Cookies</h3>
        <p className="mb-4">These cookies are necessary for the Website to function properly. They enable core features such as page navigation, secure access, and form submissions.</p>
        
        <h3 className="text-xl font-medium mt-4 mb-2">b) Performance & Analytics Cookies</h3>
        <p className="mb-4">We may use analytics tools (such as Google Analytics or similar services) to understand how visitors use our Website, which pages are most visited, and how users interact with our content. The information collected is aggregated and does not directly identify individual users.</p>
        
        <h3 className="text-xl font-medium mt-4 mb-2">c) Functional Cookies</h3>
        <p className="mb-4">These cookies remember user preferences such as language settings, form entries, and location preferences to enhance your browsing experience.</p>
        
        <h3 className="text-xl font-medium mt-4 mb-2">d) Marketing & Advertising Cookies</h3>
        <p className="mb-4">If applicable, we may use cookies to measure effectiveness of digital campaigns, deliver relevant advertising, and retarget visitors who have shown interest in our services.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
        <p className="mb-4">Some cookies on our Website may be placed by third-party service providers, including analytics providers, advertising platforms, and embedded content providers. We do not control third-party cookies and encourage you to review their respective privacy policies.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
        <p className="mb-4">You can control or disable cookies through your browser settings. Most browsers allow you to delete existing cookies, block future cookies, or receive alerts when cookies are being used.</p>
        <p className="mb-4 italic">Please note that disabling certain cookies may impact the functionality of the Website.</p>
      </section>

      <section className="mt-8 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">If you have any questions about this Cookie Policy, please contact us at: <a href="mailto:hello@indomapletours.ca" className="text-blue-600 hover:underline">hello@indomapletours.ca</a></p>
      </section>
    </div>
  );
};

export default CookiePolicy;
