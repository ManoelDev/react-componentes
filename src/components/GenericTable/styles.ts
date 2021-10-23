import styled from 'styled-components';

const lite = '#ffffff';
const brand = 'transparent';
const size = '18px';

// const blue = rgba(79, 192, 210, 1);
// const green = rgba(82, 210, 154, 1);
// const yellow = rgba(231, 196, 104, 0.7);
// const orange = rgba(235, 118, 85, 1.0);
// const darkBg = rgba(0, 0, 0, 0.9);
// const lightBg = rgba(255, 255, 255, 0.1);
// const text = rgba(255, 255, 255, 0.9);



export const WrapperTable = styled.div``;
export const TitleTable = styled.div``;
export const ContainerTable = styled.div`

  position: relative;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  
  font-family: Nunito Sans;

  

  box-shadow: 3px 3px 5px 0 #e9e9e9;
  border-radius: 3px;
  overflow: hidden;

  color: rgba(255, 255, 255, 0.9);

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
  pointer-events: all;
  width: 100%;
  overflow: auto;


  border: 0;
  border-spacing: 0px;
  border-collapse: collapse;

  table-layout: fixed;

  font-family: Quicksand;
  font-size: 14px;
  font-weight: 400;
  
  col{
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height:6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;      
    border-radius: 5px;
  }

`;

export const Thead = styled.thead`

  background: rgba(0, 0, 0, 0.9);
  tr, th{
    white-space: nowrap;
    text-align: start; 
  }

  th{
    padding: 8px 16px;
    width: 20%;
  }

  .selection-cell-header {
    min-width: 48px!important;
    width: 48px;
    padding: 0;
  }
`;

export const Tbody = styled.tbody`
  /* tr{
    :hover{
     background: rgba(0, 0, 0, 0.4)
    }
  } */
  td {
    
    font-weight: 500;
    padding: 8px 16px;

    white-space: nowrap;
  }
`;

export const Tfoot = styled.tfoot``

export const Th = styled.th``;

export const Td = styled.td`
  margin: 0;
  white-space: nowrap;

  img{
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;

export const Tr = styled.tr`
  /* height: 42px; */
  white-space: normal;
  background: rgba(0, 0, 0, 0.2);

  :nth-child(even){
    background: rgba(0, 0, 0, 0.4);
  }
  tr td .selection-cell {
    min-width: 48px!important;
    width: 48px;
    padding-left: 8px!important;
  }
`;

export const ContainerSpinner = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  .loader-1 {
    width : ${size};
    height: ${size};
    border: 4px solid ${lite};
    border-bottom-color: ${brand};
    border-radius: 50%;
    display: inline-block;
    animation: rotation 0.8s linear infinite;
  }

  @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

  .noItemsToList{
    display: flex;
    white-space: nowrap;
    height: 42px;

    width: 100%;
    /* text-align: center; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  span{
    position: absolute;
  }
`;
