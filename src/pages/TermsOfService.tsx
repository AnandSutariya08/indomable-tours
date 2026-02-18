import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          <p className="text-lg font-medium">
            IndoMaple Tours a Unit of GlobiTrips Hospitality Marketing Services Inc
          </p>

          <p className="text-sm text-foreground/70 italic">
            Last Updated: 4th Feb 2026
          </p>

          <p>
            These Terms of Service (“Terms”) govern the use of the website
            www.indomapletours.ca (the “Website”) and all travel services
            provided by IndoMaple Tours (“IndoMaple”, “we”, “our”, “us”).
          </p>

          <p>
            By accessing our Website, submitting an inquiry, or booking services
            through IndoMaple Tours, you agree to be bound by these Terms.
          </p>

          {/* 1 */}
          <h2 className="text-2xl font-semibold text-primary">
            1. Nature of Services
          </h2>
          <p>
            IndoMaple Tours is a Canada-based Destination Management Company
            (DMC) specializing in India, Nepal, Bhutan and Sri Lanka.
          </p>
          <p>We provide:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Customized FIT and private itineraries</li>
            <li>Group tours (leisure, corporate, educational)</li>
            <li>MICE and incentive travel programs</li>
            <li>Ground handling and on-destination logistics</li>
            <li>Hotel, transport, guide and experience coordination</li>
          </ul>
          <p>
            IndoMaple acts as an intermediary between travelers or travel
            agencies and third-party service providers (hotels, transport
            companies, guides, local operators, airlines, etc.).
          </p>

          {/* 2 */}
          <h2 className="text-2xl font-semibold text-primary">
            2. Quotations & Booking Process
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All proposals are subject to availability at confirmation.</li>
            <li>Quotations are valid only until the stated expiry date.</li>
            <li>
              Pricing may change until booking is confirmed in writing and
              deposit received.
            </li>
            <li>
              Availability is not guaranteed until confirmed by suppliers.
            </li>
          </ul>
          <p>A booking becomes confirmed only upon:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Receipt of required deposit or full payment, and</li>
            <li>Written confirmation issued by IndoMaple Tours.</li>
          </ol>

          {/* 3 */}
          <h2 className="text-2xl font-semibold text-primary">
            3. Deposits & Payments
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Deposit requirements vary depending on program and seasonality.
            </li>
            <li>
              Deposits are non-refundable unless otherwise specified in writing.
            </li>
            <li>
              Certain services may require 100% advance payment.
            </li>
            <li>
              Full payment is typically due 60 days prior to departure.
            </li>
            <li>
              Bookings within 60 days require full payment at confirmation.
            </li>
            <li>
              Failure to pay by due date may result in automatic cancellation.
            </li>
            <li>
              Processing or transaction fees may apply.
            </li>
          </ul>

          {/* 4 */}
          <h2 className="text-2xl font-semibold text-primary">
            4. Cancellations & Refunds
          </h2>
          <p>All cancellation requests must be submitted in writing.</p>
          <p>Cancellation penalties vary depending on:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Supplier policies</li>
            <li>Time of cancellation</li>
            <li>Type of services booked</li>
          </ul>
          <p>Unless otherwise specified:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Deposits are non-refundable</li>
            <li>Final payments are non-refundable</li>
            <li>Air tickets are 100% non-refundable once issued</li>
          </ul>
          <p>No refunds will be granted for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Unused services</li>
            <li>Voluntary itinerary changes</li>
            <li>Early return from trip</li>
            <li>Force majeure events</li>
          </ul>

          {/* 5 */}
          <h2 className="text-2xl font-semibold text-primary">
            5. Force Majeure
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Natural disasters</li>
            <li>Government orders or border closures</li>
            <li>War, civil unrest, terrorism</li>
            <li>Strikes or labour disruptions</li>
            <li>Pandemics or public health emergencies</li>
            <li>Severe weather conditions</li>
          </ul>
          <p className="italic">
            No refunds or compensation will be provided for force majeure events.
          </p>

          {/* 6 */}
          <h2 className="text-2xl font-semibold text-primary">
            6. Pricing & Currency
          </h2>
          <p>All prices are quoted in Canadian Dollars (CAD).</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Foreign exchange fluctuations</li>
            <li>Fuel surcharges</li>
            <li>Government taxes or levies</li>
            <li>Supplier pricing revisions</li>
          </ul>
          <p>
            If adjustments exceed 5% of total land portion, client will be notified.
          </p>

          {/* 7 */}
          <h2 className="text-2xl font-semibold text-primary">
            7. Itinerary Changes
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Substitute hotels with similar category</li>
            <li>Adjust routes or excursions</li>
            <li>Modify transportation arrangements</li>
          </ul>
          <p>Such changes do not entitle traveler to compensation.</p>

          {/* 8 */}
          <h2 className="text-2xl font-semibold text-primary">
            8. Traveler Responsibilities
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Valid passport</li>
            <li>Required visas and permits</li>
            <li>Compliance with regulations</li>
            <li>Valid vaccinations</li>
            <li>Adequate travel insurance</li>
          </ul>

          {/* 9 */}
          <h2 className="text-2xl font-semibold text-primary">
            9. Health & Fitness
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Be in suitable health condition</li>
            <li>Disclose medical conditions</li>
            <li>Carry required medications</li>
            <li>Obtain medical insurance</li>
          </ul>

          {/* 10 */}
          <h2 className="text-2xl font-semibold text-primary">
            10. Adventure & Remote Travel
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Wildlife encounters</li>
            <li>High altitude environments</li>
            <li>Remote locations with limited medical facilities</li>
          </ul>

          {/* 11 */}
          <h2 className="text-2xl font-semibold text-primary">
            11. Limitation of Liability
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Acts or negligence of suppliers</li>
            <li>Flight delays or cancellations</li>
            <li>Loss or damage to baggage</li>
            <li>Supplier disruptions</li>
          </ul>
          <p>
            Liability limited to value of services booked through IndoMaple.
          </p>

          {/* 12 */}
          <h2 className="text-2xl font-semibold text-primary">
            12. Insurance
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Trip cancellation</li>
            <li>Emergency medical coverage</li>
            <li>Emergency evacuation</li>
            <li>Baggage loss protection</li>
          </ul>

          {/* 13 */}
          <h2 className="text-2xl font-semibold text-primary">
            13. Website Use
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are at least 18 years old</li>
            <li>Information provided is accurate</li>
            <li>No misuse or reproduction of content</li>
          </ul>

          {/* 14 */}
          <h2 className="text-2xl font-semibold text-primary">
            14. Third-Party Links
          </h2>
          <p>
            IndoMaple is not responsible for content or policies of external sites.
          </p>

          {/* 15 */}
          <h2 className="text-2xl font-semibold text-primary">
            15. Privacy
          </h2>
          <p>
            Our Privacy Policy forms part of these Terms.
          </p>

          {/* 16 */}
          <h2 className="text-2xl font-semibold text-primary">
            16. Conduct
          </h2>
          <p>
            IndoMaple may remove any traveler whose behavior is disruptive,
            unlawful, or unsafe.
          </p>

          {/* 17 */}
          <h2 className="text-2xl font-semibold text-primary">
            17. Governing Law & Jurisdiction
          </h2>
          <p>
            Governed by the laws of Nova Scotia and Canada. Disputes submitted
            to courts of Nova Scotia.
          </p>

          {/* 18 */}
          <h2 className="text-2xl font-semibold text-primary">
            18. Amendments
          </h2>
          <p>
            IndoMaple reserves the right to update these Terms at any time.
            Continued use constitutes acceptance.
          </p>

          <div className="border-t pt-6">
            <p>
              For more information, contact us at{" "}
              <a
                href="mailto:hello@indomapletours.ca"
                className="text-secondary hover:underline"
              >
                hello@indomapletours.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
