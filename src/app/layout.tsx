import { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
 </Head>
    {children}
  </>
);

export default RootLayout;
