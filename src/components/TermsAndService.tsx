import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';
import { useState } from 'react';

export const TermsOfServiceDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="underline text-xs text-gray-400 hover:text-white flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Terms of Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Terms of Service
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Last updated: August 2025
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-gray-200">
            <section>
              <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="mb-4">
                By accessing and using MovieDB services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">2. Description of Service</h3>
              <p className="mb-4">
                MovieDB provides users with access to a rich collection of movie and TV show information, ratings, reviews, 
                and related entertainment content. The service is provided "as is" and we reserve the right to modify, 
                suspend, or discontinue the service at any time.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access to movie and TV show databases</li>
                <li>User rating and review systems</li>
                <li>Personalized recommendations</li>
                <li>Watchlist and favorite management</li>
              </ul>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">3. User Accounts and Registration</h3>
              <p className="mb-4">
                To access certain features, you may be required to create an account. You are responsible for maintaining 
                the confidentiality of your account information and for all activities that occur under your account.
              </p>
              <p className="mb-4">
                You agree to provide accurate, current, and complete information during registration and to update 
                such information as necessary.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">4. User Content and Conduct</h3>
              <p className="mb-4">
                Users may submit reviews, ratings, and other content. By submitting content, you grant us a non-exclusive, 
                worldwide, royalty-free license to use, reproduce, and distribute such content.
              </p>
              <p className="mb-4 font-semibold text-yellow-400">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Post offensive, defamatory, or inappropriate content</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Spam or engage in commercial activities without permission</li>
                <li>Attempt to hack or disrupt the service</li>
              </ul>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Intellectual Property</h3>
              <p className="mb-4">
                All content on MovieDB, including but not limited to text, graphics, logos, and software, 
                is the property of MovieDB or its content suppliers and is protected by copyright and other laws.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">6. API Usage</h3>
              <p className="mb-4">
                If you use our API services, additional terms may apply. API usage is subject to rate limiting 
                and must comply with our API documentation and guidelines.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">7. Disclaimers and Limitation of Liability</h3>
              <p className="mb-4">
                MovieDB is provided "as is" without warranties of any kind. We do not guarantee the accuracy, 
                completeness, or reliability of any content. In no event shall MovieDB be liable for any 
                indirect, incidental, special, or consequential damages.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">8. Termination</h3>
              <p className="mb-4">
                We may terminate or suspend your account at any time for violations of these terms or for any other reason. 
                You may also terminate your account at any time by contacting us.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">9. Changes to Terms</h3>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <Separator className="bg-gray-700" />

            <section>
              <h3 className="text-lg font-semibold mb-3">10. Contact Information</h3>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-800 p-4 rounded-lg">
                <p>Email: legal@moviedb.com</p>
                <p>Address: 123 Entertainment St, Hollywood, CA 90210</p>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
