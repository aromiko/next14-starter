import Link from 'next/link';
import Links from './links/Links';
import { auth } from '@/lib/auth';
import styles from './navbar.module.css';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <Links session={session} />
    </header>
  );
};

export default Navbar;
