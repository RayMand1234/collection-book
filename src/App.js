import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Airtable from 'airtable';

// Environment variable
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

console.log("Airtable API Key:", AIRTABLE_API_KEY);
console.log("Airtable Base ID:", AIRTABLE_BASE_ID);

const base = new Airtable({ apiKey:  AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

const AlbumPage = () => {
    const { phoneNumber } = useParams();
    const [stickers, setStickers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        base('Stickers')
            .select({
                filterByFormula: `{PhoneNumber} = "${phoneNumber}"`,
            })
            .firstPage()
            .then(records => {
                setStickers(records.map(record => ({
                    url: record.fields.StickerUrl,
                    fileName: record.fields.FileName
                })));
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching stickers:', err);
                setError(err.message);
                setLoading(false);
            });
    }, [phoneNumber]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Your Sticker Album</h1>
            <div>
                {stickers.length === 0 ? <p>No stickers found.</p> : stickers.map(sticker => (
                    <div key={sticker.fileName}>
                        <img src={sticker.url} alt={sticker.fileName} style={{ width: '100px', height: '100px' }} />
                        <p>{sticker.fileName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HomePage = () => (
    <div>
        <h1>Welcome to the Sticker Album App!</h1>
        <p>Use the URL format /album/your-phone-number to view your sticker album.</p>
    </div>
);

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/album/:phoneNumber" element={<AlbumPage />} />
        </Routes>
    </Router>
);

export default App;