import React from 'react';
import { useParams } from 'react-router-dom';
import { stickerDictionaries } from './stickers';

const AlbumPage = () => {
    const { phoneNumber } = useParams();
    const [stickers, setStickers] = React.useState([]);

    React.useEffect(() => {
        // Fetch the user's sticker collection
        base('Stickers')
            .select({
                filterByFormula: `{PhoneNumber} = "${phoneNumber}"`,
            })
            .firstPage()
            .then(records => {
                // Map sticker names to URLs
                const stickerData = records.map(record => {
                    const { Rarity, Name } = record.fields;
                    const url = stickerDictionaries[Rarity]?.[Name];
                    return url ? { url, fileName: Name } : null;
                }).filter(Boolean);

                setStickers(stickerData);
            })
            .catch(error => console.error('Error fetching stickers:', error));
    }, [phoneNumber]);

    return (
        <div>
            <h1>Your Sticker Album</h1>
            <div>
                {stickers.map(sticker => (
                    <div key={sticker.fileName}>
                        <img src={sticker.url} alt={sticker.fileName} />
                        <p>{sticker.fileName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumPage;