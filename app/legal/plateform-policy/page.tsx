import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PlatformPolicyPage() {
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
            Platform Usage Policy
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
              This Platform Usage Policy ("Policy") governs the access and use of
              the BIGBROS AI platform operated by BIGBROS AI PRIVATE LIMITED
              ("we", "us", "our"). This Policy applies to all users, customers,
              and partners accessing the platform at
              https://www.bigbrosai.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Permitted Use
            </h2>
            <p>
              The Platform may be used only for lawful business communication
              purposes. Users are permitted to send messages, emails, or
              notifications only to recipients who have provided valid and
              verifiable consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Prohibited Activities
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Sending spam, bulk unsolicited, or deceptive messages</li>
              <li>Violating WhatsApp, Meta, SMS, Email, or RCS platform policies</li>
              <li>Sending content that is illegal, abusive, or misleading</li>
              <li>Attempting to bypass rate limits, filters, or security controls</li>
              <li>Using the Platform for phishing, scams, or fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. User Content Responsibility
            </h2>
            <p>
              Users are solely responsible for the content of messages sent
              using the Platform. BIGBROS AI does not pre-approve or monitor
              message content but reserves the right to review content in case
              of complaints or policy violations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Compliance Requirements
            </h2>
            <p>
              Users must comply with all applicable laws including but not
              limited to the Information Technology Act, 2000, data protection
              laws, TRAI regulations, and platform-specific policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Monitoring and Enforcement
            </h2>
            <p>
              We reserve the right to monitor platform usage for abuse,
              excessive failure rates, spam indicators, or security risks. Any
              violation may result in suspension or termination of services
              without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Suspension and Termination
            </h2>
            <p>
              BIGBROS AI may suspend or terminate access to the Platform if a
              user violates this Policy, applicable laws, or third-party
              provider rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              BIGBROS AI shall not be liable for service interruptions, message
              delivery failures, account suspensions by third-party providers,
              or losses resulting from misuse of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Policy Updates
            </h2>
            <p>
              We may update this Platform Usage Policy from time to time.
              Continued use of the Platform after updates constitutes acceptance
              of the revised Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Contact Information
            </h2>
            <p>
              For questions or concerns related to this Policy, please contact
              us using the contact information provided on the Platform.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
