import { LegalShell } from '@/components/site/legal-shell';

export default function PlatformPolicyPage() {
  return (
    <LegalShell title="Platform Usage Policy" path="/legal/plateform-policy" updated="2025-12-19">

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
            <h2>
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
            <h2>
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
            <h2>
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
            <h2>
              4. Compliance Requirements
            </h2>
            <p>
              Users must comply with all applicable laws including but not
              limited to the Information Technology Act, 2000, data protection
              laws, TRAI regulations, and platform-specific policies.
            </p>
          </section>

          <section>
            <h2>
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
            <h2>
              6. Suspension and Termination
            </h2>
            <p>
              BIGBROS AI may suspend or terminate access to the Platform if a
              user violates this Policy, applicable laws, or third-party
              provider rules.
            </p>
          </section>

          <section>
            <h2>
              7. Limitation of Liability
            </h2>
            <p>
              BIGBROS AI shall not be liable for service interruptions, message
              delivery failures, account suspensions by third-party providers,
              or losses resulting from misuse of the Platform.
            </p>
          </section>

          <section>
            <h2>
              8. Policy Updates
            </h2>
            <p>
              We may update this Platform Usage Policy from time to time.
              Continued use of the Platform after updates constitutes acceptance
              of the revised Policy.
            </p>
          </section>

          <section>
            <h2>
              9. Contact Information
            </h2>
            <p>
              For questions or concerns related to this Policy, please contact
              us using the contact information provided on the Platform.
            </p>
          </section>
    </LegalShell>
  );
}
