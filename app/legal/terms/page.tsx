import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
              <CardDescription>
                Last updated: January 1, 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                These Terms of Service ("Terms") govern your use of the BIGBROS AI platform 
                operated by BIGBROS AI Pvt. Ltd.
              </p>

              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using our service, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>

              <h2>Description of Service</h2>
              <p>
                BIGBROS AI provides a WhatsApp marketing automation platform that allows 
                businesses to create, send, and analyze WhatsApp campaigns.
              </p>

              <h2>User Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>Comply with all applicable laws and regulations</li>
                <li>Obtain proper consent before sending marketing messages</li>
                <li>Respect WhatsApp's terms of service and policies</li>
                <li>Not use our service for spam or unauthorized communications</li>
              </ul>

              <h2>Service Availability</h2>
              <p>
                We strive to maintain high availability but cannot guarantee uninterrupted service. 
                We may perform maintenance that temporarily limits access to the platform.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                BIGBROS AI shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of the service.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at legal@bigbros.ai.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}