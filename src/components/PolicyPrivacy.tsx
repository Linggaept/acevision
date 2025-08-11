import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';
import { useState } from 'react';

export const PrivacyPolicyDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="underline text-xs text-gray-400 hover:text-white flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Privacy Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy Policy
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Last updated: August 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-gray-200">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Information We Collect</h3>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                submit reviews, or contact us for support.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold  mb-2">Personal Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and email address</li>
                    <li>Username and password</li>
                    <li>Profile information and preferences</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold  mb-2">Usage Information:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Movies and shows you view or search for</li>
                    <li>Ratings and reviews you submit</li>
                    <li>Watchlist and favorite items</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">2. How We Use Your Information</h3>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience and recommendations</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you technical notices and security alerts</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">3. Information Sharing and Disclosure</h3>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                except as described in this policy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> We may share information with trusted partners who assist us in operating our services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger or sale of our business</li>
                <li><strong>Public Content:</strong> Reviews and ratings you submit may be publicly visible</li>
              </ul>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">4. Data Security</h3>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                internet is 100% secure.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="font-semibold text-yellow-400 mb-2">Security Measures Include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Monitoring for suspicious activities</li>
                </ul>
              </div>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Cookies and Tracking Technologies</h3>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
              </p>
              <div className="space-y-2">
                <p><strong>Essential Cookies:</strong> Required for basic site functionality</p>
                <p><strong>Analytics Cookies:</strong> Help us understand how you use our service</p>
                <p><strong>Preference Cookies:</strong> Remember your settings and preferences</p>
              </div>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Your Rights and Choices</h3>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Data Retention</h3>
              <p className="mb-4">
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations, 
                resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">8. International Data Transfers</h3>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information during such transfers.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Children's Privacy</h3>
              <p className="mb-4">
                Our services are not intended for children under 13. We do not knowingly collect personal information 
                from children under 13. If we become aware of such collection, we will take steps to delete the information.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Changes to This Policy</h3>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">11. Contact Us</h3>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p>Email: privacy@moviedb.com</p>
                <p>Address: 123 Entertainment St, Hollywood, CA 90210</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
