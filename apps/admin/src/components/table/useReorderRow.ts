import { useState } from 'react';

type ListItem = { id: number; disposition: number };

export function useReorderRow<T>(
  data: (T & ListItem)[],
  cb: (listItems: ListItem[]) => void
): [(T & ListItem)[], (draggedRowIndex: number, targetRowIndex: number) => void] {
  const [dataTable, setData] = useState<(T & ListItem)[]>(data);

  function reorderRow(draggedRowIndex: number, targetRowIndex: number) {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as T & ListItem);

    const newDisposition = data.map((c, i) => ({
      id: c.id,
      disposition: i + 1,
    }));

    setData([
      ...data.map((c, i) => ({
        ...c,
        disposition: i + 1,
      })),
    ]);

    cb(newDisposition);

    // return newDisposition;
  }

  return [dataTable, reorderRow];
}
