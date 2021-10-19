import React from 'react';
import { Table, TableProps } from './table'
import * as S from './styles';


interface PageProps extends TableProps<any, any> {
}

const GenericTable: React.FC<PageProps> = ({ columns, data, paginate, selectRow, totalPage }) => {
  console.log(data)
  return (<>
    <S.Container>
      <div>Header</div>
      <Table
        data={data}
        columns={columns}
        totalPage={totalPage}
        paginate={paginate}
        selectRow={selectRow}
      />
    </S.Container>
  </>);
}

export { Table, GenericTable }