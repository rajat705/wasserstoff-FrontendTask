import { useState } from 'react';
import { useDrop } from 'react-dnd';

const Folder = ({ name, children, onDrop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FILE',
    drop: (item) => onDrop(item, name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={drop} className={`cursor-pointer transition ${isOver ? 'bg-gray-200' : ''}`}>
      <div onClick={toggleFolder} className="cursor-pointer">
        {isOpen ? '📂' : '📁'} {name}
      </div>
      <div className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};

export default Folder;
