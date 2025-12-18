import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function RefundCancellationPage() {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold text-gray-900">
            Refund & Cancellation Policy
          </h1>
          <div className="w-14 h-1 bg-green-600 mx-auto mt-4" />
          <p className="mt-6 text-sm text-gray-500">
            Last updated on {today}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed text-base">
          <section>
            <p>
              This Refund and Cancellation Policy outlines the terms under which
              refunds and cancellations are handled for services provided by
              BIGBROS AI PRIVATE LIMITED through the website
              https://www.bigbrosai.com (the "Platform").
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Cancellation Policy
            </h2>
            <p>
              You may request cancellation of services by contacting us through
              the communication channels provided on the Platform. Cancellation
              requests will be considered only if they are made before the
              service has been initiated or credits have been consumed.
            </p>
            <p className="mt-3">
              Once the service has been activated, configured, or partially
              consumed, cancellation requests may not be accepted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Refund Policy
            </h2>
            <p>
              Refunds, if any, will be processed only in cases where services
              have not been delivered as agreed or where there is a technical
              failure attributable solely to BIGBROS AI PRIVATE LIMITED.
            </p>
            <p className="mt-3">
              Usage-based charges, including but not limited to messaging
              credits, API usage, or platform fees, are non-refundable once
              consumed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Non-Refundable Items
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Used or partially used service credits</li>
              <li>Setup, onboarding, or configuration fees</li>
              <li>Third-party charges including WhatsApp or SMS fees</li>
              <li>Services suspended due to policy violations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Refund Processing
            </h2>
            <p>
              Approved refunds will be processed within 7–10 business days and
              credited back to the original mode of payment. Processing times
              may vary depending on the payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Chargebacks & Disputes
            </h2>
            <p>
              Any chargeback or payment dispute raised without first contacting
              us may result in immediate suspension of services. We reserve the
              right to recover any losses incurred due to unjustified
              chargebacks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Changes to this Policy
            </h2>
            <p>
              BIGBROS AI PRIVATE LIMITED reserves the right to modify this Refund
              and Cancellation Policy at any time. Changes will be effective
              immediately upon posting on the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Contact Information
            </h2>
            <p>
              For any questions or concerns regarding this policy, please
              contact us using the contact details available on the Platform.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
