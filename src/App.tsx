import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store/rootReducer';
import { getAccounts } from './store/accounts/accountsSlice';

import { Container, Row, Col, Card } from 'react-bootstrap';

import { AccountsChart } from './components/accounts-chart/accountsChart';
import { Loader } from './components/loader/Loader';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { byId, allIds, isLoading } = useSelector(
    (state: RootState) => state.accounts
  );
  const accounts = allIds.map((accId) => byId[accId]);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <Container className='vh-100'>
      <Row className='h-100 align-items-center'>
        <Col>
          <Card className='p-2' style={{ minHeight: '483px' }}>
            <Card.Title className='text-center'>Accounts</Card.Title>
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
              {isLoading && <Loader />}
              {accounts.length ? <AccountsChart accounts={accounts} /> : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
