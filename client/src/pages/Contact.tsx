import { useState } from 'react';
import { Send, Mail, User, MessageSquare, FileText } from 'lucide-react';
import { Button, Input, Field, Alert, Card } from '@/components/ui';
import { submitContactForm } from '@/services/contactService';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) return;
    setStatus('loading');
    try {
      await submitContactForm(name.trim(), email.trim(), subject.trim(), message.trim());
      setStatus('success');
      setStatusMsg('Your message has been sent successfully! I\'ll get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus('error');
      setStatusMsg('Failed to send message. Please try again.');
    }
  }

  return (
    <div
      className="min-h-screen bg-background"
      data-icod-id="src_pages_contact_tsx_54bc">
      <div className="bg-muted/30 py-12" data-icod-id="src_pages_contact_tsx_257c">
        <div
          className="mx-auto max-w-3xl px-4 text-center sm:px-6"
          data-icod-id="src_pages_contact_tsx_02e6">
          <h1
            className="mb-4 text-3xl font-bold text-foreground"
            data-icod-id="src_pages_contact_tsx_cbb2">Get In Touch</h1>
          <p
            className="text-muted-foreground"
            data-icod-id="src_pages_contact_tsx_1d75">Have a question, suggestion, or just want to say hello? I'd love to hear from you.</p>
        </div>
      </div>
      <div
        className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8"
        data-icod-id="src_pages_contact_tsx_1004">
        <Card className="p-6 sm:p-8" data-icod-id="src_pages_contact_tsx_3154">
          {status === 'success' && (
            <Alert
              variant="success"
              className="mb-6"
              data-icod-id="src_pages_contact_tsx_5de2">{statusMsg}</Alert>
          )}
          {status === 'error' && (
            <Alert
              variant="error"
              className="mb-6"
              data-icod-id="src_pages_contact_tsx_612b">{statusMsg}</Alert>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-icod-id="src_pages_contact_tsx_a01b">
            <Field
              label="Name"
              required
              htmlFor="contact-name"
              data-icod-id="src_pages_contact_tsx_89bb">
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                data-icod-id="src_pages_contact_tsx_a720" />
            </Field>

            <Field
              label="Email"
              required
              htmlFor="contact-email"
              data-icod-id="src_pages_contact_tsx_91c6">
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                data-icod-id="src_pages_contact_tsx_665f" />
            </Field>

            <Field
              label="Subject"
              required
              htmlFor="contact-subject"
              data-icod-id="src_pages_contact_tsx_79b4">
              <Input
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                required
                data-icod-id="src_pages_contact_tsx_afd1" />
            </Field>

            <Field
              label="Message"
              required
              htmlFor="contact-message"
              data-icod-id="src_pages_contact_tsx_7c9c">
              <textarea
                id="contact-message"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                required
                data-icod-id="src_pages_contact_tsx_0294" />
            </Field>

            <Button
              type="submit"
              loading={status === 'loading'}
              className="w-full"
              data-icod-id="src_pages_contact_tsx_c452">
              <Send className="mr-2 h-4 w-4" data-icod-id="src_pages_contact_tsx_e919" /> Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
