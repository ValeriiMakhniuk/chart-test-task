import React, { useEffect } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';

import { Form, Col, Button } from 'react-bootstrap';

import { EditChartFormRow } from './editChartFormRow';

import { MAccount } from '../../api/api';
import { useChartData } from '../../hooks/useChartData';

interface IEditChartFormProps {
  handleEdit: (data: any) => void;
  setDisabledSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditChartForm: React.FC<IEditChartFormProps> = ({
  handleEdit,
  setDisabledSubmit,
}) => {
  const {
    accounts,
    maxBarCount,
    initialBarColor,
    barColorsById,
  } = useChartData();

  const { control, handleSubmit, errors, formState } = useForm({
    defaultValues: { accounts },
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'accounts',
  });

  useEffect(() => {
    setDisabledSubmit(!formState.isValid);
  }, [formState, setDisabledSubmit]);

  return (
    <Form onSubmit={handleSubmit(handleEdit)} noValidate>
      {fields.map((account, index) => {
        const color = barColorsById[account.id!];
        return (
          <EditChartFormRow
            key={account.id}
            {...(account as MAccount)}
            control={control}
            index={index}
            color={color ? color : initialBarColor}
            remove={() => remove(index)}
            errors={errors.accounts}
          />
        );
      })}
      <Form.Row className='justify-content-center'>
        <Col xs='auto'>
          <Button
            type='button'
            variant='link'
            disabled={maxBarCount === fields.length}
            onClick={() => append({ name: '', amount: '', color: '' })}
          >
            + add new account
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};
