import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background: #ced6ff;
  width: 100%;
  height: 100vh;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  width: 100%;
  padding: 50px;
`;

export const Title = styled.div`
  font-size: 35px;
`;

export const Subtitle = styled.div`
  font-size: 15px;
  padding-top: 40px;
  line-height: 25px;
`;

export const Link = styled.a`
  text-decoration: none;
  color: #2a4afc;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

export const Icon = styled.img`
  width: 30%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SearchWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  font-size: 22px;
`;

export const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.input`
  background: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  color: #333;
  font-size: 15px;
  width: 40%;
  margin-top: 10px;
`;

export const SubmitContainer = styled.div`
  text-align: right;
  margin-top: 10px;
`;

export const Submit = styled.input`
  background: #fa9629;
  color: white;
  font-size: 15px;
  padding: 10px 50px;
  width: fit-content;
  &:hover {
    background: #fcac2a;
    cursor: pointer;
  }
`;
