import { createSignal } from "solid-js";

function List(props) {
    const { items, handleSelect } = props;
    const [getSelectedIdx, setSelectedIdx] = createSignal(null);

    const handleClick = (item, index, onSelect) => {
        setSelectedIdx(index);
        setTimeout(() => {
            setSelectedIdx(null);
        }, 100);
        onSelect && onSelect(item);
        // console.log(`Item clicked: ${item}`);
    };
    return (
        <ul className="list-group">
            {items.map((item, index) => (
                <li onClick={() => handleClick(item, index, handleSelect)} 
                    key={item} 
                    className={`list-group-item ${getSelectedIdx() === index ? 'active' : ''}`}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
    export default List;