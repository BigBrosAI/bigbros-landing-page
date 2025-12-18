import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <div className="w-14 h-1 bg-green-600 mx-auto mt-4" />
          <p className="mt-6 text-sm text-gray-500">
            Last updated on {today}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed text-base">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy describes how BIGBROS AI PRIVATE LIMITED and
              its affiliates ("we", "our", "us") collect, use, share, protect,
              or otherwise process your information through our website
              https://www.bigbrosai.com (the "Platform").
            </p>
            <p className="mt-3">
              By accessing or using the Platform, you agree to be bound by this
              Privacy Policy, the Terms of Use, and applicable laws of India.
              If you do not agree, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Collection of Information
            </h2>
            <p>
              We collect personal data when you register, use our services, or
              otherwise interact with us. This may include your name, address,
              email ID, phone number, date of birth, and identity or address
              proof.
            </p>
            <p className="mt-3">
              Sensitive personal data such as payment details or biometric
              information may be collected with your consent and in accordance
              with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Use of Information
            </h2>
            <p>
              We use your personal data to provide services, process
              transactions, improve customer experience, resolve disputes,
              detect fraud, and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Sharing of Information
            </h2>
            <p>
              We may share your personal data with group entities, affiliates,
              service providers, business partners, or government authorities
              where required by law or necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Security Practices
            </h2>
            <p>
              We adopt reasonable security practices to protect your data from
              unauthorised access, misuse, or disclosure. However, no method of
              transmission over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Data Retention and Deletion
            </h2>
            <p>
              You may request deletion of your account through the Platform or
              by contacting us. We retain personal data only for as long as
              necessary for lawful and legitimate purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Your Rights
            </h2>
            <p>
              You have the right to access, update, and correct your personal
              data. You may also withdraw consent, subject to applicable laws
              and our Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any material
              changes will be communicated as required under applicable laws.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
