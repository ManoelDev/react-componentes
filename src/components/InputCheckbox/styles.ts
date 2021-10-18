import styled from 'styled-components';

export const checkboxWrapper = styled.div`
display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & span {
    margin-left: 8px;
    white-space: nowrap;
  }

  .checkbox_container {
    min-width: 20px;
    min-height: 20px;
    max-height: 20px;
    margin: 2px;

    .round {
      position: relative;

      label {
        background-color: #F8F9FA;
        border: 1px solid #ced4da;
        border-radius: 5px;
        cursor: pointer;
        height: 20px;
        left: 0;
        position: absolute;
        top: 0;
        width: 20px;
      }

      label:after {
        border: 1.5px solid #fff;
        border-top: none;
        border-right: none;
        content: '';
        height: 5px;
        left: 3.5px;
        position: absolute;
        top: 4.5px;
        transform: rotate(-45deg);
        width: 10px;
        opacity: 0;
      }

      input[type='checkbox'] {
        visibility: hidden;
      }

      input[type='checkbox']:checked+label {
        background-color: #6D9DF9;
        border: 1.5px solid #ced4da;
      }

      input[type='checkbox']:checked+label:after {
        opacity: 1;
      }
    }
  }
  
`;

