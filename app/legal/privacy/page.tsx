import { LegalShell } from '@/components/site/legal-shell';

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" path="/legal/privacy" updated="2025-12-19">

          <section>
            <h2>
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
            <h2>
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
            <h2>
              3. Use of Information
            </h2>
            <p>
              We use your personal data to provide services, process
              transactions, improve customer experience, resolve disputes,
              detect fraud, and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2>
              4. Sharing of Information
            </h2>
            <p>
              We may share your personal data with group entities, affiliates,
              service providers, business partners, or government authorities
              where required by law or necessary to provide our services.
            </p>
          </section>

          <section>
            <h2>
              5. Security Practices
            </h2>
            <p>
              We adopt reasonable security practices to protect your data from
              unauthorised access, misuse, or disclosure. However, no method of
              transmission over the internet is completely secure.
            </p>
          </section>

          <section>
            <h2>
              6. Data Retention and Deletion
            </h2>
            <p>
              You may request deletion of your account through the Platform or
              by contacting us. We retain personal data only for as long as
              necessary for lawful and legitimate purposes.
            </p>
          </section>

          <section>
            <h2>
              7. Your Rights
            </h2>
            <p>
              You have the right to access, update, and correct your personal
              data. You may also withdraw consent, subject to applicable laws
              and our Terms of Use.
            </p>
          </section>

          <section>
            <h2>
              8. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any material
              changes will be communicated as required under applicable laws.
            </p>
          </section>
    </LegalShell>
  );
}
