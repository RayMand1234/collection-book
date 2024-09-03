// src/App.js
import React from 'react';
import { stickerDictionaries } from './stickers'; // Import the sticker data

const specificSticker = 'Epic | Poisoned Idan'; // Change this to the specific sticker you want to display
const specificRarity = 'Epic'; // Change this to the specific rarity of the sticker

const App = () => {
    // Fetch the URL of the specific sticker
    const stickerUrl = stickerDictionaries[specificRarity]?.[specificSticker];

    return (
        <div>
            <h1>Specific Sticker</h1>
            {stickerUrl ? (
                <div>
                    <img src={stickerUrl} alt={specificSticker} style={{ width: '200px', height: '200px' }} />
                    <p>{specificSticker}</p>
                </div>
            ) : (
                <p>Sticker not found</p>
            )}
        </div>
    );
};

export default App;