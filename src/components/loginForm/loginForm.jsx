'use client';

import Link from 'next/link';
import { login } from '@/lib/actions';
import styles from './loginForm.module.css';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push('/');
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" name="username" placeholder="username"></input>
      <input type="password" name="password" placeholder="password"></input>
      <button>Login</button>

      {state?.error && <p>{state.error}</p>}

      <Link href="/register">
        Does not have an account? <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
