import { useDrag } from 'react-dnd';

const File = ({ name, extension, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FILE',
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`ml-4 cursor-pointer transition ${isDragging ? 'opacity-50' : ''}`} onClick={() => onClick(name)}>
      📄 {name}
    </div>
  );
};

export default File;
