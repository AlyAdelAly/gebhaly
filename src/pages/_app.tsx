import '@/styles/globals.css';
import '@/styles/product.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { CartProvider } from '@/context/CartContext';


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
