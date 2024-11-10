import React from 'react';
import '../style.css';

const ShareMenu = ({onClose}) => {
    return (
        <div className='overlay' onClick={onClose}>
            <div className="share-menu" onClick={(e) => e.stopPropagation()}>
                <button className='share-copy'><img src="./src/assets/share/share copy.png" alt="Share Copy"/></button>
                <button className='share-vk'><img src="./src/assets/share/share vk.png" alt="Share VK"/></button>
                <button className='share-tg'><img src="./src/assets/share/share tg.svg" alt="Share TG"/></button>
                <button className='share-ws'><img src="./src/assets/share/share ws.svg" alt="Share WS"/></button>
                <button className='share-fb'><img src="./src/assets/share/share fb.svg" alt="Share FB"/></button>
            </div>
        </div>
    );
};

export default ShareMenu;