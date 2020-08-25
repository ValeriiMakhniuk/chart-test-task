import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';

import { EditChartForm } from '../edit-chart-form/editChartForm';

export const EditChartModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isDisabledSubmit, setDisabledSubmit] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = (data: any) => {
    console.log(data);
    // alert(JSON.stringify(data));
    setShow(false);
  };

  const handleClick = () => {
    setShow(true);
  };
  return (
    <>
      <Button type='button' onClick={handleClick}>
        Edit chart data
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation={false}
        scrollable
        size='lg'
        aria-labelledby='edit-chart-modal-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='edit-chart-modal-title'>Edit chart data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditChartForm
            handleEdit={handleEdit}
            setDisabledSubmit={setDisabledSubmit}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            onClick={handleEdit}
            disabled={isDisabledSubmit}
          >
            Save chages
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
