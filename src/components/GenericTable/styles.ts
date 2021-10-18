import styled from 'styled-components';

const lite = '#6d9df9';
const brand = 'transparent';
const size = '32px';

export const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 0px;
  padding-left: 50px;
  padding-right: 50px;

  background: #fafafa;

  .loading {
    line-height: 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #878787;
    font-weight: bold;
    span{
      margin: 24px;
    }
  }
`;

export const Table = styled.table`
  display: inline-block;
  overflow: auto;
  
  box-shadow: 3px 3px 5px 0 #e9e9e9;
  border-radius: 5px;

  pointer-events: all;
  width: 100%;

  border: 0;
  border-spacing: 0px;
  border-collapse: collapse;

  table-layout: fixed;

  font-family: Quicksand;
  font-size: 14px;
  font-weight: 400;
  color: #575757;
  background: #ffffff;

  ::-webkit-scrollbar {
    width: 6px;
    height:6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;      
    border-radius: 6px;
  }
`;

export const Thead = styled.thead`
  background: #edf4fe;
  height: 42px;
  tr, th{
    white-space: nowrap;    
  }

  th{
    padding: 8px 16px;
    width: 100%;
    border: #f3f3f6!important;
    vertical-align: middle;
  }

  .selection-cell-header {
    min-width: 48px!important;
    width: 48px;
    padding: 0;
  }
`;

export const Tbody = styled.tbody`
  td {
    font-family: Nunito Sans;
    font-weight: 500;
    padding: 8px 16px;

    border: 1px solid #ddd;
    border-left: none;
    border-bottom-color: #f3f3f6 !important;
    border-top-color: #f3f3f6 !important;
    border-right: #f3f3f6 !important;
  }
`;

export const Th = styled.th`
  text-align: start;
`;

export const Td = styled.td`
  margin: 0;

  img{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .noItems{
    display: flex;
    white-space: nowrap;
    height: 42px;

    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #575757;
    font-weight: bold;
  }
`;

export const Tr = styled.tr`
  /* height: 42px; */
  white-space: nowrap;

  :nth-child(even){
    background: rgb(248, 249, 251);
  }
  tr td .selection-cell {
    min-width: 48px!important;
    width: 48px;
    padding-left: 8px!important;
  }
`;

export const ContainerSpinner = styled.div`
  .loader-1 {
    width : ${size};
    height: ${size};
    border: 5px solid ${lite};
    border-bottom-color: ${brand};
    border-radius: 50%;
    display: inline-block;
    animation: rotation 0.8s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
`;
