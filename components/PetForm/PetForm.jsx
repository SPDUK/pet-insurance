import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { PET_STATUS, PET_TYPE } from '../../enums';
import { useState } from 'react';
import { enumToCapitalized } from '../../utils';
import { form, btn, err } from './pet-form.module.css';
import { usePetContext } from '../../contexts/PetContext';

function PetForm() {
  const [petState, setPetState] = useState({ name: '', age: null, type: '', status: '' });

  // super basic check to see if input has a value
  const valid = Object.values(petState).every(Boolean);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setPetState({ ...petState, [name]: value });
  }

  const { submitPet, error, loading } = usePetContext();

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    if (valid) {
      const petAgeNum = Number(petState.age);
      const validPetState = { ...petState, age: petAgeNum };
      submitPet(validPetState);
    }
  }

  return (
    <>
      <h1>Submit a pet</h1>
      {error && <h3 className={err}>{error}</h3>}
      <Form onSubmit={handleSubmit} className={form}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="age">Age</Label>
          <Input type="number" name="age" placeholder="Age" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="type">Type</Label>
          <Input defaultValue="" type="select" name="type" id="type" onChange={handleInputChange}>
            <option value="" disabled>
              Select Option
            </option>
            {Object.values(PET_TYPE).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input
            defaultValue=""
            type="select"
            name="status"
            id="status"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Option
            </option>
            {Object.values(PET_STATUS).map((status) => (
              <option value={status} key={status}>
                {enumToCapitalized(status)}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary" className={btn} disabled={loading || !valid}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default PetForm;
