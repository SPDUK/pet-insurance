import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

import PetProvider from '../contexts/PetContext';

function MyApp({ Component, pageProps }) {
  return (
    <PetProvider>
      <Component {...pageProps} />
    </PetProvider>
  );
}

export default MyApp;
