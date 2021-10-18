import React, { ChangeEvent } from 'react';
import * as S from './styles';

interface IProps {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
}

const InputCheckbox: React.FC<IProps> = ({
  id,
  checked,
  onChange,
  labelText,
  disabled,
  ...props
}) => {
  return (
    // eslint-disable-next-line
    <S.checkboxWrapper className="checkbox_wrapper">
      <div className="checkbox_container">
        <div className="round">
          <input
            type="checkbox"
            disabled={disabled ?? false}
            id={id}
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <label htmlFor={id} />
        </div>
      </div>
      {labelText && (
        <span>{labelText}</span>
      )}
    </S.checkboxWrapper>
  );
};

export default InputCheckbox;
