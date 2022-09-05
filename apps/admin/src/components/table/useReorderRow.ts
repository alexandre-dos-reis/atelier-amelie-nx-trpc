import { useEffect, useState } from 'react';

type ListItem = { id: number; disposition: number };

export function useReorderRow<T extends ListItem>(
  data: T[],
  cb: (listItems: T[]) => void
): [T[], (draggedRowIndex: number, targetRowIndex: number) => void] {
  const [controlledData, setControlledData] = useState<T[]>(data);

  function reorderRow(draggedRowIndex: number, targetRowIndex: number) {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);

    setControlledData([
      ...data.map((c, i) => ({
        ...c,
        disposition: i + 1,
      })),
    ]);
  }

  useEffect(() => {
    cb(controlledData);
  }, [controlledData]);

  return [controlledData.length === 0 ? data : controlledData, reorderRow];
}
