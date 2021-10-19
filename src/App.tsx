import React, { useState } from 'react';
import axios from 'axios';
import { GenericTable } from './components/GenericTable';
import { ColumnDefinitionType } from './components/GenericTable/table';

interface DataProps {
  albumId: number
  id: number
  thumbnailUrl: string
  title: string
  url: string
}

const InfiniteScroll = () => {
  const [state, setState] = useState<DataProps[]>([]);
  const [selectedData, setSelectedData] = useState([] as any)

  const getPhotos = async (page) => {
    const { status, data }: any = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=30`)
    if (status === 200) {
      setState([...state, ...data]);
    }
  }

  // useEffect(() => {
  //   getPhotos(1)
  // }, [])

  const oldColumns: ColumnDefinitionType<DataProps, keyof DataProps>[] = [
    {
      key: 'thumbnailUrl',
      headerTitle: 'Thumbnail',
      collWidth: 160,
      // formatCell: (cel, row) => {
      //   return <img src={cel} alt="asd" width='150' height='150' />
      // },

    },
    {
      key: 'title',
      headerTitle: 'Title',
      collWidth: 300,
    },
    {
      key: 'url',
      headerTitle: 'URL',
      // formatCell: (cel, row) => {
      //   return <img src={cel} alt="asd" width='150' />
      // },
    },
    {
      key: 'albumId',
      headerTitle: 'Valor (R$)',
      // collWidth: 80,
      formatCell: (cel, row) => {
        return <div>{cel}</div>
      },
    },
    {
      key: 'id',
      headerTitle: 'Ações',
      collWidth: 100,
    },
  ]

  const selectRow = {
    onSelect: (row, isSelect, rowIndex) => {
      if (!selectedData.find((data) => data.id === row.id) && isSelect)
        setSelectedData((state) => state.concat([row]));
      else
        setSelectedData((state) => state.filter((data) => data.id !== row.id));
    },
    onSelectAll: (rows, isSelect) => {
      if (isSelect) setSelectedData(rows);
      else setSelectedData([]);
    },
    selected: selectedData
  };

  console.log('Selected', selectedData)

  return (
    <div className="container">
      <GenericTable
        data={state}
        columns={oldColumns}
        selectRow={selectRow}
        totalPage={5}
        paginate={(p) => getPhotos(p)}
      />
    </div>
  )
}

export default InfiniteScroll;