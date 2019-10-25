import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;

    button {
      width: 162px;
      margin: 0 20px 0;
      height: 42px;
      background: #f64c75;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
      div {
        display: flex;
        justify-content: center;

        svg {
          margin: 0 15px 0 0;
          align-items: baseline;
        }
      }
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  ul {
    margin-top: 30px;
  }
`;

export const Item = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0 0;
  padding: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  opacity: ${props => (props.past ? 0.6 : 1)};
  strong {
    display: block;
    color: #fff
    font-size: 20px;
    font-weight: normal;
  }
  div {
    display: flex;
    align-items: center;

    span {
      color: #fff;
      opacity: 0.6;
    }
    svg {
      margin: 0 20px 0;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: ${darken(0.3, '#fff')};
      }
    }
  }
`;
