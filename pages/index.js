import Head from 'next/head';
import { container } from '../styles/Home.module.css';

import PetForm from '../components/PetForm/PetForm';
import PetList from '../components/PetList/PetList';

export default function Home() {
  return (
    <div className={container}>
      <Head>
        <title>Pet Insurance</title>
        <meta name="description" content="Pet insurance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PetForm />
      <PetList />
    </div>
  );
}
