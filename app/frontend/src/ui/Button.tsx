import { styled } from 'src/theme';

const Button = styled.button`
  background-color: #fff;
  background-color: ${props => props.theme.colors.purple};
  color: ${props => props.theme.colors.whiteblue};
  transition: box-shadow 0.3s ease-in-out;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    box-shadow: 5px 7px 20px 0px rgba(0, 0, 0, 0.1);
  }
`;

export default Button;
