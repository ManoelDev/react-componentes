import React, { ReactNode } from 'react';
import * as S from './styles';

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  headerTitle: string;
  headerStyle?: React.CSSProperties;
  columnStyle?: React.CSSProperties;
  hidden?: boolean;
  collWidth?: number;
  formatCell?: (cel, row) => ReactNode;
  formattedRow?: (cel, row) => ReactNode;
}

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  paginate?: {
    isLoading: boolean;
    totalPages: number;
    page: number;
  }
  selectRow?: {
    onSelect?: ((row: any, isSelect: any, rowIndex: any) => any);
    onSelectAll?: ((rows: any, isSelect: any) => any);
    selected?: any[];
  }
}

const Table = <T, K extends keyof T>({ data, columns, paginate }: TableProps<T, K>) => {

  const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>) => {
    const headers = columns.map((column, index) => {

      if (column?.hidden) return null;
      return (
        <S.Th
          key={`headCell-${index}`}
          tabIndex={(index + 1)}
          data-row-selection={false}
          style={column?.columnStyle}
        >
          {column.headerTitle}
        </S.Th>
      );
    });

    return (<>
      <S.Thead>
        <S.Tr>
          {headers}
        </S.Tr>
      </S.Thead >
    </>);
  };

  const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>) => {
    const rows = data.map((row, index) => {
      return (
        <S.Tr key={`row-${index}`}>

          {columns.map((column, index2) => {
            if (column.hidden) return null;
            if (column?.formatCell) {
              return (
                <S.Td key={`cell-${index2}`} style={{ ...column.columnStyle }}  >
                  <div>
                    {column?.formatCell(row[column.key], row)}
                  </div>
                </S.Td>
              )
            }
            return (
              <S.Td key={`cell-${index2}`} style={{ ...column.columnStyle }} >
                <div>
                  {row[column.key]}
                </div>
              </S.Td>
            );

          })}
        </S.Tr>
      );
    });

    return (<>
      <S.Tbody>
        {rows}
      </S.Tbody>
    </>);
  };

  return (
    <S.WrapperTable>

      <S.TitleTable>

        {paginate &&
          <div>
            <h1>Proxima Pagina {paginate.page}</h1>
          </div>
        }
      </S.TitleTable>
      <S.ContainerTable>
        <S.Table>

          <TableHeader columns={columns} />
          <TableRows
            data={data}
            columns={columns}
          />
        </S.Table>
        {!data.length && (
          <S.ContainerSpinner>
            {paginate &&
              paginate.isLoading
              ? <span className="loader-1" />
              : <div className='noItemsToList'>Não há dados a serem exibidos</div>
            }
          </S.ContainerSpinner>
        )}
      </S.ContainerTable>
    </S.WrapperTable>

  );
};

export { Table };