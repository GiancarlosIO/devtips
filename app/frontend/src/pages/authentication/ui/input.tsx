import * as React from 'react';
import { styled } from 'src/theme/';

const Wrapper = styled.div`
  position: relative;
`;

const InputStyled = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.lightpurple};
  /* border-radius: 5px; */
  outline: none;
  box-shadow: none;
  margin: 8px 0;
  padding: 8px;
  width: 240px;
`;

interface InputProps {
  inputProps: {
    style?: React.CSSProperties;
    [key: string]: any;
  };
  disabled?: boolean;
  type: string;
  value?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  className?: string;
}

const Input: React.FunctionComponent<InputProps> = ({
  disabled,
  onChange,
  value,
  type,
  className,
  ...rest
}): React.ReactElement => (
  <Wrapper className={className}>
    <InputStyled
      disabled={disabled}
      value={value}
      onChange={onChange}
      type={type}
      {...rest}
    />
  </Wrapper>
);

export default Input;
