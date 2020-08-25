import React from 'react';

import { Controller } from 'react-hook-form';

import { Form, Col, InputGroup, Button } from 'react-bootstrap';

interface EditChartFormRowProps {
  id: string;
  control: any;
  index: number;
  name: string;
  amount: number;
  color: string;
  errors: any;
  remove: () => void;
}

export const EditChartFormRow: React.FC<EditChartFormRowProps> = ({
  id,
  control,
  index,
  name,
  amount,
  color,
  errors,
  remove,
}) => {
  const error = errors ? errors[index] : null;

  return (
    <Form.Row>
      <Form.Group as={Col} xs={6}>
        <Form.Label>Name</Form.Label>
        <Controller
          as={
            <Form.Control
              autoFocus={!id}
              isInvalid={error && error.name}
              required
            />
          }
          name={`accounts[${index}].name`}
          control={control}
          defaultValue={name}
          rules={{
            required: 'Name is required',
          }}
        />
        <Form.Control.Feedback type='invalid'>
          {error ? error.name?.message : null}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} xs={4}>
        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Controller
            as={
              <Form.Control
                type='number'
                isInvalid={error && error.amount}
                required
              />
            }
            name={`accounts[${index}].amount`}
            control={control}
            defaultValue={amount}
            rules={{
              required: 'Amount is required',
              min: {
                value: 0,
                message: 'Should be grater then 0',
              },
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {error ? error.amount?.message : null}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group as={Col} xs={1}>
        <Form.Label>Color</Form.Label>
        <Controller
          as={<Form.Control type='color' />}
          name={`accounts[${index}].color`}
          control={control}
          defaultValue={color}
        />
      </Form.Group>
      <Button
        type='button'
        variant='link'
        className='text-secondary text-decoration-none align-self-center mt-1 mb-1'
        onClick={remove}
      >
        x
      </Button>
    </Form.Row>
  );
};
