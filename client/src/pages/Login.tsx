import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button, Input, Field, Alert, Card } from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/slices/authSlice';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleDemoLogin() {
    setEmail('admin@blog.com');
    setPassword('Admin@1234');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(clearError());
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/admin');
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background px-4"
      data-icod-id="src_pages_login_tsx_f500">
      <Card
        className="w-full max-w-md p-6 sm:p-8"
        data-icod-id="src_pages_login_tsx_2968">
        <div className="mb-6 text-center" data-icod-id="src_pages_login_tsx_7bd5">
          <h1
            className="mb-2 text-2xl font-bold text-foreground"
            data-icod-id="src_pages_login_tsx_9ad3">Welcome Back</h1>
          <p
            className="text-sm text-muted-foreground"
            data-icod-id="src_pages_login_tsx_2eb0">Sign in to access the admin dashboard</p>
        </div>

        {error && <Alert variant="error" className="mb-4" data-icod-id="src_pages_login_tsx_f8a2">{error}</Alert>}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-icod-id="src_pages_login_tsx_04b4">
          <Field
            label="Email"
            required
            htmlFor="login-email"
            data-icod-id="src_pages_login_tsx_420f">
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              data-icod-id="src_pages_login_tsx_9d26" />
          </Field>

          <Field
            label="Password"
            required
            htmlFor="login-password"
            data-icod-id="src_pages_login_tsx_3ae8">
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              data-icod-id="src_pages_login_tsx_13f3" />
          </Field>

          <Button
            type="submit"
            loading={status === 'loading'}
            className="w-full"
            data-icod-id="src_pages_login_tsx_9591">
            <LogIn className="mr-2 h-4 w-4" data-icod-id="src_pages_login_tsx_1f75" /> Sign In
          </Button>
        </form>

        <div
          className="mt-6 border-t border-border pt-4 text-center"
          data-icod-id="src_pages_login_tsx_c1b4">
          <p
            className="mb-2 text-xs text-muted-foreground"
            data-icod-id="src_pages_login_tsx_0502">Demo login: admin@blog.com / Admin@1234</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs font-medium text-primary hover:underline"
            data-icod-id="src_pages_login_tsx_7238">
            Fill demo credentials
          </button>
        </div>

        <div className="mt-4 text-center" data-icod-id="src_pages_login_tsx_fc9d">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
            data-icod-id="src_pages_login_tsx_c9fa">
            &larr; Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
