import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import Airtable from 'airtable';

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

const AlbumPage = () => {
    const { phoneNumber } = useParams();
    const [stickers, setStickers] = React.useState([]);
    
    React.useEffect(() => {
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

const App = () => (
    <Router>
        <Switch>
            <Route path="/album/:phoneNumber" component={AlbumPage} />
            <Route path="/" exact>
                <h1>Welcome to the Sticker Album App!</h1>
            </Route>
        </Switch>
    </Router>
);

export default App;