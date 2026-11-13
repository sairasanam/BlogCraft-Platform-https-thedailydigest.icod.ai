import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button, Input, Field, Card, Spinner, Alert } from '@/components/ui';
import { fetchComments, createComment } from '@/services/commentService';
import type { Comment as CommentType } from '@/types';

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchComments(articleId);
        if (res.success && res.data) setComments(res.data);
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, [articleId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !email.trim() || !content.trim()) return;
    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      await createComment(articleId, author.trim(), email.trim(), content.trim());
      setSubmitStatus('success');
      setAuthor('');
      setEmail('');
      setContent('');
    } catch {
      setSubmitStatus('error');
    }
    setSubmitting(false);
  }

  return (
    <section
      className="mt-12 border-t border-border pt-8"
      data-icod-id="src_components_commentsection_tsx_3de2">
      <h3
        className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground"
        data-icod-id="src_components_commentsection_tsx_bec2">
        <MessageCircle className="h-5 w-5" data-icod-id="src_components_commentsection_tsx_9c73" />
        Comments ({comments.length})
      </h3>
      {/* Comment list */}
      {loading ? (
        <div
          className="flex justify-center py-8"
          data-icod-id="src_components_commentsection_tsx_4ebf"><Spinner data-icod-id="src_components_commentsection_tsx_fbd1" /></div>
      ) : comments.length === 0 ? (
        <p
          className="mb-8 text-muted-foreground"
          data-icod-id="src_components_commentsection_tsx_cec9">No comments yet. Be the first to share your thoughts!</p>
      ) : (
        <div
          className="mb-8 space-y-4"
          data-icod-id="src_components_commentsection_tsx_63cf">
          {comments.map((c) => (
            <Card
              key={c._id}
              className="p-4"
              data-icod-id={`src_components_commentsection_tsx_4574_${c._id}`}>
              <div
                className="mb-2 flex items-center justify-between"
                data-icod-id={`src_components_commentsection_tsx_c8a3_${c._id}`}>
                <span
                  className="font-semibold text-foreground"
                  data-icod-id={`src_components_commentsection_tsx_0e3b_${c._id}`}>{c.author}</span>
                <span
                  className="text-xs text-muted-foreground"
                  data-icod-id={`src_components_commentsection_tsx_4dd2_${c._id}`}>
                  {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p
                className="text-sm text-muted-foreground"
                data-icod-id={`src_components_commentsection_tsx_a4f7_${c._id}`}>{c.content}</p>
            </Card>
          ))}
        </div>
      )}
      {/* Comment form */}
      <Card className="p-6" data-icod-id="src_components_commentsection_tsx_cf5f">
        <h4
          className="mb-4 text-lg font-semibold text-foreground"
          data-icod-id="src_components_commentsection_tsx_3a46">Leave a Comment</h4>
        {submitStatus === 'success' && (
          <Alert
            variant="success"
            className="mb-4"
            data-icod-id="src_components_commentsection_tsx_40fb">
            Comment submitted! It will appear after approval.
          </Alert>
        )}
        {submitStatus === 'error' && (
          <Alert
            variant="error"
            className="mb-4"
            data-icod-id="src_components_commentsection_tsx_776c">Failed to submit comment. Please try again.</Alert>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-icod-id="src_components_commentsection_tsx_20c0">
          <div
            className="grid gap-4 sm:grid-cols-2"
            data-icod-id="src_components_commentsection_tsx_deb7">
            <Field
              label="Name"
              required
              data-icod-id="src_components_commentsection_tsx_e07e">
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                data-icod-id="src_components_commentsection_tsx_c487" />
            </Field>
            <Field
              label="Email"
              required
              data-icod-id="src_components_commentsection_tsx_674c">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-icod-id="src_components_commentsection_tsx_da0f" />
            </Field>
          </div>
          <Field
            label="Comment"
            required
            data-icod-id="src_components_commentsection_tsx_e581">
            <textarea
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              data-icod-id="src_components_commentsection_tsx_5657" />
          </Field>
          <Button
            type="submit"
            loading={submitting}
            data-icod-id="src_components_commentsection_tsx_f38e">
            <Send
              className="mr-2 h-4 w-4"
              data-icod-id="src_components_commentsection_tsx_5a97" /> Submit Comment
          </Button>
        </form>
      </Card>
    </section>
  );
}
