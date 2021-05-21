import { usePetContext } from '../../contexts/PetContext';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { enumToCapitalized } from '../../utils';
import { card } from './pet-list.module.css';

function PetList() {
  const { pets, loading } = usePetContext();

  return (
    <>
      <h1>Pets list</h1>
      {pets.length
        ? pets.map(({ name, age, type, status, id }) => (
            <Card key={id} className={card}>
              <CardBody>
                <CardTitle tag="h5">{name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  {age}
                </CardSubtitle>
                <CardText>{type}</CardText>
                <CardText>{enumToCapitalized(status)}</CardText>
              </CardBody>
            </Card>
          ))
        : null}
    </>
  );
}

export default PetList;
