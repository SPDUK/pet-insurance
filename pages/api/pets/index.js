import Ajv from 'ajv';
const ajv = new Ajv();
import { v4 as uuidv4 } from 'uuid';
import { PET_STATUS, PET_TYPE } from '../../../enums';

const petSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    age: { type: 'number' },
    type: { enum: Object.values(PET_TYPE) },
    status: { enum: Object.values(PET_STATUS) },
  },
  required: ['name', 'age', 'type', 'status'],
  additionalProperties: false,
};

const validate = ajv.compile(petSchema);

const pets = [{ name: 'Rex', age: 7, type: 'Lizard', status: 'FULLY_COVERED', id: uuidv4() }];

export default function apiHandler(req, res) {
  const methodHandlers = {
    GET: handleGet,
    POST: handlePost,
  };

  const handler = methodHandlers[req.method];
  if (!handler) return res.status(405).end(`${req.method} not allowed`);

  return handler();

  function handleGet() {
    return res.status(200).json({ data: pets });
  }

  function handlePost() {
    const valid = validate(req.body);
    if (!valid) {
      const errors = validate.errors;
      return res.status(400).json({ errors: errors });
    }

    const pet = { ...req.body, id: uuidv4() };
    pets.push(pet);

    return res.status(200).json({ data: pets });
  }
}
