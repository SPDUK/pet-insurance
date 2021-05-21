import { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

const PetProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pets, setpets] = useState([]);

  async function submitPet(pet) {
    try {
      setError('');
      setLoading(true);
      const {
        data: { data },
      } = await axios.post('/api/pets', pet);

      setpets(data);
    } catch (err) {
      // basic error handling
      const { instancePath, message } = err.response.data.errors[0];
      setError(`${instancePath.replace('/', '')} ${message}`);
    } finally {
      setLoading(false);
    }
  }

  async function fetchPets() {
    const {
      data: { data },
    } = await axios.get('/api/pets');
    setpets(data);
  }

  useEffect(() => {
    try {
      setLoading(true);
      fetchPets();
    } catch (err) {
      setError('Problem fetching pets');
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    loading,
    error,
    pets,
    submitPet,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

PetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PetProvider;
