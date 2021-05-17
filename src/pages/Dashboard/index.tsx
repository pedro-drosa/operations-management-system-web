import React, { FormEvent, useEffect, useState } from 'react';
import { toDate, format } from 'date-fns';

import { FcCurrencyExchange } from 'react-icons/fc';
import { FiChevronRight } from 'react-icons/fi';

import Calculator from '../../shared/Calculator.js';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, Title, Form, Conversions } from './styles';

interface ICurrencies {
  id: string;
  code: string;
  name: string;
  price: string;
}

interface IConversions {
  id: string;
  code: string;
  name: string;
  value: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [quantity, setQuantity] = useState('1');
  const [source, setSource] = useState('Dólar');
  const [target, setTarget] = useState('Real');
  const [conversions, setConversions] = useState<IConversions[]>([]);
  const [currencies, setCurrencies] = useState<ICurrencies[]>([]);

  const calculator = new Calculator(currencies);

  async function handleAddConversion(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const response = await api.post('/conversions', {
      code: calculator.findCodeByName(target, currencies),
      name: target,
      value: calculator.convertValues(quantity, source, target),
      date: format(toDate(Date.now()), 'dd/MM/yyyy'),
    });

    setConversions([...conversions, response.data]);
  }

  useEffect(() => {
    async function loadConversions(): Promise<void> {
      const response = await api.get('/conversions');
      setConversions(response.data);
    }
    loadConversions();
  }, []);

  useEffect(() => {
    async function loadCurrencies(): Promise<void> {
      const response = await api.get('/currencies');
      setCurrencies(response.data);
    }
    loadCurrencies();
  }, []);

  return (
    <>
      <Header>
        <img src={logoImg} alt="logo" />
        <span>MuitoDinheiro</span>
      </Header>
      <Title>Cadastro de Operações financeiras</Title>
      <Form onSubmit={handleAddConversion}>
        <label htmlFor="quantity">
          <input
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            id="quantity"
            type="number"
            min="1"
            placeholder="0"
          />
        </label>
        <label htmlFor="source">
          <span>Moeda de Origem</span>
          <select
            value={source}
            onChange={e => setSource(e.target.value)}
            id="source"
            name="source"
          >
            {currencies.map(currencie => (
              <option key={currencie.code} value={currencie.name}>
                {currencie.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="target">
          <span>Moeda de Destino</span>
          <select
            value={target}
            onChange={e => setTarget(e.target.value)}
            id="target"
            name="target"
          >
            {currencies.map(currencie => (
              <option key={currencie.code} value={currencie.name}>
                {currencie.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Comprar</button>
      </Form>
      {conversions.map(conversion => (
        <Conversions>
          <a href="/report" key={conversion.id}>
            <FcCurrencyExchange size="64" />
            <div>
              <strong>
                {conversion.value} {conversion.code}
              </strong>
              <p>{conversion.date}</p>
            </div>
            <FiChevronRight size="20" />
          </a>
        </Conversions>
      ))}
    </>
  );
};

export default Dashboard;
