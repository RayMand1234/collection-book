// src/App.js
import React from 'react';

function importAllImages(requireContext) {
  return requireContext.keys().map(requireContext);
}

function App() {
  // Dynamically import all the webp files from each folder inside 'Stickers'
  const uncommonImages = importAllImages(require.context('./Stickers/Uncommon', false, /\.(webp)$/));
  const rareImages = importAllImages(require.context('./Stickers/Rare', false, /\.(webp)$/));
  const epicImages = importAllImages(require.context('./Stickers/Epic', false, /\.(webp)$/));
  const legendaryImages = importAllImages(require.context('./Stickers/Legendary', false, /\.(webp)$/));
  const mythicImages = importAllImages(require.context('./Stickers/Mythic', false, /\.(webp)$/));

  return (
    <div>
      <h1>Sticker Collection</h1>

      {/* Render Uncommon Stickers */}
      <div>
        <h2>Uncommon</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {uncommonImages.map((src, index) => (
            <img key={index} src={src} alt={`Uncommon Sticker ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </div>

      {/* Render Rare Stickers */}
      <div>
        <h2>Rare</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {rareImages.map((src, index) => (
            <img key={index} src={src} alt={`Rare Sticker ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </div>

      {/* Render Epic Stickers */}
      <div>
        <h2>Epic</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {epicImages.map((src, index) => (
            <img key={index} src={src} alt={`Epic Sticker ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </div>

      {/* Render Legendary Stickers */}
      <div>
        <h2>Legendary</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {legendaryImages.map((src, index) => (
            <img key={index} src={src} alt={`Legendary Sticker ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </div>

      {/* Render Mythic Stickers */}
      <div>
        <h2>Mythic</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {mythicImages.map((src, index) => (
            <img key={index} src={src} alt={`Mythic Sticker ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;