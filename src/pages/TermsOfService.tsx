import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-lg font-medium mb-1">IndoMaple Tours a Unit of GlobiTrips Hospitality Marketing Services Inc</p>
      <p className="text-sm text-gray-500 mb-6 italic">Last Updated: 4th Feb 2026</p>
      
      <p className="mb-4">These Terms of Service (“Terms”) govern the use of the website www.indomapletours.ca (the “Website”) and all travel services provided by IndoMaple Tours (“IndoMaple”, “we”, “our”, “us”).</p>
      <p className="mb-4">By accessing our Website, submitting an inquiry, or booking services through IndoMaple Tours, you agree to be bound by these Terms.</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">1. Nature of Services</h2>
        <p className="mb-4">IndoMaple Tours is a Canada-based Destination Management Company (DMC) specializing in India, Nepal, Bhutan and Sri Lanka.</p>
        <p className="mb-2">We provide:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Customized FIT and private itineraries</li>
          <li>Group tours (leisure, corporate, educational)</li>
          <li>MICE and incentive travel programs</li>
          <li>Ground handling and on-destination logistics</li>
          <li>Hotel, transport, guide and experience coordination</li>
        </ul>
        <p className="mb-4">IndoMaple acts as an intermediary between travelers or travel agencies and third-party service providers (hotels, transport companies, guides, local operators, airlines, etc.).</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">2. Quotations & Booking Process</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>All travel proposals provided by IndoMaple are subject to availability at the time of confirmation.</li>
          <li>Quotations are valid only until the stated expiry date.</li>
          <li>Pricing is subject to change until a booking is confirmed in writing and deposit is received.</li>
          <li>Availability of services is not guaranteed until confirmed by suppliers.</li>
        </ul>
        <p className="mb-2">A booking becomes confirmed only upon:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Receipt of required deposit or full payment, and</li>
          <li>Written confirmation issued by IndoMaple Tours.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">3. Deposits & Payments</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Deposit requirements vary depending on the program, supplier policies, and seasonality.</li>
          <li>Deposits are non-refundable unless otherwise specified in writing.</li>
          <li>Certain services (including flights, special permits, luxury properties, peak-season bookings) may require 100% advance payment.</li>
          <li>Full payment is typically due 60 days prior to departure unless otherwise stated in the quotation.</li>
          <li>For bookings made within 60 days of departure, full payment is required at time of confirmation.</li>
          <li>Failure to make payments by the due date may result in automatic cancellation.</li>
          <li>IndoMaple reserves the right to apply processing or transaction fees where applicable.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">4. Cancellations & Refunds</h2>
        <p className="mb-4">All cancellation requests must be submitted in writing. Cancellation penalties vary depending on supplier policies, time of cancellation, and type of services booked.</p>
        <p className="mb-2">Unless otherwise specified in writing:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Deposits are non-refundable.</li>
          <li>Final payments are non-refundable.</li>
          <li>Air tickets are 100% non-refundable once issued.</li>
        </ul>
        <p className="mb-2">No refunds will be granted for:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Unused services</li>
          <li>Voluntary itinerary changes made during travel</li>
          <li>Early return from the trip</li>
          <li>Force majeure events</li>
        </ul>
        <p className="mb-4 italic text-sm text-gray-600">Refunds, where applicable, are subject to supplier reimbursement timelines.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">5. Force Majeure</h2>
        <p className="mb-4">IndoMaple Tours shall not be liable for cancellation, delay, alteration, or disruption caused by events beyond reasonable control, including but not limited to: natural disasters, government orders, war, civil unrest, strikes, pandemics, or severe weather conditions.</p>
        <p className="mb-4 italic font-medium">No refunds or compensation will be provided for services disrupted by force majeure.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">6. Pricing & Currency</h2>
        <p className="mb-4">All prices are quoted in Canadian Dollars (CAD) unless otherwise specified. Prices may be adjusted prior to final payment due to foreign exchange fluctuations, fuel surcharges, taxes, or supplier revisions.</p>
        <p className="mb-4">If price adjustments exceed 5% of the total land portion, IndoMaple will notify the client in writing.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">7. Itinerary Changes</h2>
        <p className="mb-4">Travel itineraries may require modification due to operational, safety, weather, or local conditions. IndoMaple reserves the right to substitute hotels, adjust routes, or modify transportation. Such changes do not entitle the traveler to compensation.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">8. Traveler Responsibilities</h2>
        <p className="mb-2">Travelers are solely responsible for:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Holding a valid passport</li>
          <li>Obtaining required visas and permits</li>
          <li>Complying with customs, immigration and health regulations</li>
          <li>Ensuring vaccinations or medical documentation are valid</li>
          <li>Obtaining adequate travel insurance</li>
        </ul>
        <p className="mb-4 italic">IndoMaple is not responsible for denied boarding, entry refusal, or travel disruption due to incomplete documentation.</p>
      </section>

      <section className="mt-8 border-t pt-8">
        <p className="mb-4">For more information, please contact us at <a href="mailto:hello@indomapletours.ca" className="text-blue-600 hover:underline">hello@indomapletours.ca</a></p>
      </section>
    </div>
  );
};

export default TermsOfService;
