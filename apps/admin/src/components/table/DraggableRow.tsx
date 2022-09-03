import { DragHandleIcon } from '@chakra-ui/icons';
import { Td, Tr } from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableRowProps<T> {
  row: Row<T>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
}

export function DraggableRow<T>({ reorderRow, row }: DraggableRowProps<T>) {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<T>) => reorderRow(draggedRow.index, row.index),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  return (
    <Tr
      ref={previewRef} //previewRef could go here
      borderBottom="1px solid #dcdcdc"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Td ref={dropRef}>
        <button ref={dragRef}>
          <DragHandleIcon cursor="grab" _active={{ cursor: 'grabbing' }} />
        </button>
      </Td>
      {row.getVisibleCells().map((cell) => (
        <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
      ))}
    </Tr>
  );
}
