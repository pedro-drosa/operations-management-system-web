import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  display: flex;
  align-items: center;

  span {
    font-size: 1.5em;
    font-weight: 700;
    color: #3a3a3a;
  }
`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin-top: 80px;
  max-width: 450px;
  color: #3a3a3a;
`;

export const Form = styled.form`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    display: flex;

    span {
      display: none;
    }

    select,
    input {
      font-size: 26px;
      padding: 10px 30px 10px 10px;
      border: 1px solid #ebe9e9;
      border-radius: 5px;
      background: none;
      color: #3a3a3a;
    }
  }

  button {
    font-size: 26px;
    width: 210px;
    height: 70px;
    border: 1px solid #ebe9e9;
    border-radius: 5px;
    color: #fff;
    background-color: #04d361;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Conversions = styled.div`
  margin-top: 20px;
  max-width: 960px;
  a {
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 5px;
    text-decoration: none;
    transition: transform 0.2s;

    & + a {
      margin-top: 20px;
    }

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 64px;
      height: 64px;
    }

    div {
      margin-left: 20px;
      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg:last-of-type {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
