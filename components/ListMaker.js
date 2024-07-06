import { useState } from 'react';

const ListMaker = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    setList([...list, newItem]);
    setNewItem('');
  };

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul className="mt-4 list-disc list-inside">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListMaker;
