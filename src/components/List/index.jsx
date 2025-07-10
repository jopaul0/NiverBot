import '@/components/List/List.css';
import { Plus } from 'lucide-react';

export default function List({
    listName = 'lista',
    list = [],
    background = '#193941',
    onSelect,
    selectedMessage,
    keyArray,
    handleAddMessage
}) {

    return (
        <div className="list-container">
            <div className='header-list'>
                <h1>{listName}</h1>
                <button onClick={() => handleAddMessage(keyArray)}><Plus size={24} /></button>
            </div>
            <ul>
                {list.map((item, index) => {
                    const text = String(item);
                    const displayText = text.length > 100 ? text.slice(0, 100) + '...' : text;
                    const isSelected = selectedMessage === item;

                    return (
                        <li
                            key={index}
                            className={`list-item ${isSelected ? 'selected' : ''}`}
                            style={{ backgroundColor: background, cursor: 'pointer' }}
                            onClick={() => onSelect(item)}
                        >
                            {displayText}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


