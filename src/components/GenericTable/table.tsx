import React, { ReactNode, useEffect, useRef, useState } from 'react';
import InputCheckbox from '../InputCheckbox';
import * as S from './styles';



export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  headerTitle: string;
  headerTitleStyle?: React.CSSProperties;
  collWidth?: number;
  formatCell?: (cel, row) => ReactNode;
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
  totalPage?: number;
  paginate?: (any) => any
  selectRow?: {
    onSelect?: ((row: any, isSelect: any, rowIndex: any) => any);
    onSelectAll?: ((rows: any, isSelect: any) => any);
    selected?: any[];
  }
}

const Table = <T, K extends keyof T>({ data, columns, paginate, totalPage = 0, selectRow }: TableProps<T, K>) => {
  const [state, setState] = useState({
    loading: false,
    page: 0,
    totalPage,
    countColumns: 0,
  });

  const loader = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HandleUpDate = (key, value) => {
    setState((old) => {
      return {
        ...old,
        [key]: value
      }
    });
  }

  const LoadData = async (page) => {
    HandleUpDate('loading', true)
    if (paginate)
      await paginate(page)
    HandleUpDate('loading', false)
  }

  useEffect(() => {

    if (!totalPage) {
      LoadData(state.page)
    }

    if (state.page <= totalPage) {
      if (paginate)
        LoadData(state.page)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setState((old) => {
        return {
          ...old,
          page: old.page + 1,
          countColumns: columns.length
        }
      });
    }
  }

  const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>) => {
    const headers = columns.map((column, index) => {

      const style = {
        width: column?.collWidth && column?.collWidth,
        minWidth: column?.collWidth && column?.collWidth,
        maxWidth: column?.collWidth && column?.collWidth,
      };

      return (
        <S.Th
          key={`headCell-${index}`}
          tabIndex={(index + 1)}
          data-row-selection={true}
          style={column?.collWidth ? style : { width: '100%' }}
        >
          {column.headerTitle}
        </S.Th>
      );
    });

    return (
      <S.Thead>
        <S.Tr>
          {selectRow && (
            <S.Th
              className="selection-cell-header"
              style={{ width: '42px' }}
              tabIndex={0}
              data-row-selection={true}
            >
              <InputCheckbox
                disabled={false}
                id="headerSelect"
                onChange={(event) => {
                  selectRow.onSelectAll && selectRow.onSelectAll(data, event?.target.checked)

                }}
                checked={data.length !== 0 && data.length === selectRow.selected?.length}
              />
            </S.Th>
          )}
          {headers}
        </S.Tr>
      </S.Thead >
    );
  };

  const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>) => {
    const rows = data.map((row, index) => {

      return (
        <S.Tr key={`row-${index}`}>
          {selectRow && (
            <S.Td
              style={{ width: '42px' }}
              className="selection-cell"
            >
              <InputCheckbox
                disabled={false}
                id={`row-${index}`}
                onChange={(event) => {
                  if (selectRow.onSelect) selectRow.onSelect(row, event?.target.checked, index)
                }}
                checked={!!selectRow.selected?.find((f) => f.id === Number(row['id']))}
              />
            </S.Td>
          )}
          {columns.map((column, index2) => {
            if (column?.formatCell) {
              return (
                <S.Td key={`cell-${index2}`}>
                  {column?.formatCell(row[column.key], row)}
                </S.Td>
              )
            }
            return (
              <S.Td key={`cell-${index2}`}>
                {row[column.key]}
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
    <S.Container>
      <S.Table>
        <TableHeader columns={columns} />
        <TableRows
          data={data}
          columns={columns}
        />
        {!data.length && (
          <S.Tr>
            <S.Td colSpan={(selectRow ? state.countColumns + 1 : state.countColumns)}>
              <div className='noItems'>Não há dados a serem exibidos</div>
            </S.Td>
          </S.Tr>
        )}
      </S.Table>
      {paginate && (
        <S.ContainerSpinner
          className="loading"
          ref={loader}
        >
          {state.loading && <span className="loader-1"></span>}
          <span className="loader-1"></span>
        </S.ContainerSpinner>
      )}

    </S.Container >
  );
};

export { Table };