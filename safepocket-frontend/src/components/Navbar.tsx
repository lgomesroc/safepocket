import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
