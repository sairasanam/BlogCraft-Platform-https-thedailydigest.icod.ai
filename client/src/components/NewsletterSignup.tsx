import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button, Input, Alert } from '@/components/ui';
import { subscribeEmail } from '@/services/subscriberService';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await subscribeEmail(email.trim());
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  }

  return (
    <section
      className="bg-primary/5 py-16"
      data-icod-id="src_components_newslettersignup_tsx_bf6c">
      <div
        className="mx-auto max-w-2xl px-4 text-center sm:px-6"
        data-icod-id="src_components_newslettersignup_tsx_5a23">
        <Mail
          className="mx-auto mb-4 h-10 w-10 text-primary"
          data-icod-id="src_components_newslettersignup_tsx_2e47" />
        <h2
          className="mb-3 text-2xl font-bold text-foreground"
          data-icod-id="src_components_newslettersignup_tsx_91c0">Stay Updated</h2>
        <p
          className="mb-6 text-muted-foreground"
          data-icod-id="src_components_newslettersignup_tsx_f0fd">
          Subscribe to our newsletter and never miss a new article. No spam, just quality content delivered to your inbox.
        </p>
        {status === 'success' ? (
          <Alert variant="success" data-icod-id="src_components_newslettersignup_tsx_32ee">
            <CheckCircle
              className="mr-2 inline h-4 w-4"
              data-icod-id="src_components_newslettersignup_tsx_70a1" />
            {message}
          </Alert>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            data-icod-id="src_components_newslettersignup_tsx_3e95">
            <div
              className="flex-1"
              data-icod-id="src_components_newslettersignup_tsx_7489">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                data-icod-id="src_components_newslettersignup_tsx_0c3a" />
              {status === 'error' && <p
                className="mt-1 text-xs text-destructive"
                data-icod-id="src_components_newslettersignup_tsx_f2a2">{message}</p>}
            </div>
            <Button
              type="submit"
              loading={status === 'loading'}
              data-icod-id="src_components_newslettersignup_tsx_5b2a">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
