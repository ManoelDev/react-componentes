import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';
import { Table as GenericTable, ColumnDefinitionType } from './components/GenericTable';

interface DataProps {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

const InfiniteScroll = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const observer = useRef<any>(null);
  const [pagination, setPagination] = useState({
    isLoading: false,
    page: 1,
    totalPages: 4,
  })

  const handlePagination = (key, value) => {
    setPagination((p) => ({ ...p, [key]: value }));
  }

  const LoadData = useCallback(async (page) => {
    handlePagination('isLoading', true);
    const response: any = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=30`,
    );

    if (response.status === 404) {
      handlePagination('totalPages', 1);
    } else if (response.status === 200) {
      setData([...data, ...response.data]);
    }
    handlePagination('isLoading', false);
  }, [data]);

  const lastItemRef = async (node, get) => {
    if (pagination.isLoading) return;
    const options = {
      root: null,
      rootMargin: '10px',
      threshold: 1.0,
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const pageLimit = pagination.totalPages ? pagination.page <= pagination.totalPages : pagination.page;

        if (pageLimit) {
          get(pagination.page)
          setPagination((p) => { return { ...p, page: p.page + 1 } });
        }

      }
    }, options);

    if (node) observer.current.observe(node);
  };

  const oldColumns: ColumnDefinitionType<DataProps, keyof DataProps>[] = [
    {
      key: 'id',
      hidden: false,
      headerTitle: 'ID',
      columnStyle: {
        width: 160,
      },
    },
    {
      key: 'thumbnailUrl',
      headerTitle: 'Thumbnail',
      columnStyle: {
        width: 300,
      },
    },
    {
      key: 'title',
      headerTitle: 'Title',

    },
    {
      key: 'url',
      headerTitle: 'URL',
    },
    {
      key: 'albumId',
      headerTitle: 'Valor (R$)',
      formatCell: (cel, row) => {
        return <div>{cel}</div>;
      },
    },
    {
      key: 'id',
      headerTitle: 'Ações',
      formatCell: (cel, row) => {
        return <div>{cel}</div>;
      },
    },
  ];

  return (
    <div className="container">
      <GenericTable
        data={data}
        columns={oldColumns}
        paginate={pagination}
      />
      <div ref={(ref) => lastItemRef(ref, LoadData)} />
    </div>
  );
};

export default InfiniteScroll;
