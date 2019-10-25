import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width:100%
  max-width:900px;
  margin:0 auto;


  header{
    display:flex;
    justify-content:space-between;
    margin:15px 0 0;
    aside{
      display:flex;

      justify-content:center;

    }
    strong{
      color: #fff;
      font-size: 24px;
      margin: 10px 0 0;
    }

  }
  div{
    margin:20px 0 0;
    img{
      width:100%
      max-width:900px;
      max-height:300px;
    }

    p{
      display:block;
      color: #fff;
      font-size: 18px;
    }
    div{
      display:flex;
      align-items: center;
      color: rgba(255,255,255,0.6);
      svg{
        margin-right:10px;
      }
      span{
        font-size: 16px;
        margin-right:50px;
      }
    }
  }
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 116px;
  height: 42px;
  background: #4dbaf9;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  &:hover {
    background: ${darken(0.08, '#4DBAF9')};
  }
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 138px;
  height: 42px;
  margin-left: 10px;
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
`;
