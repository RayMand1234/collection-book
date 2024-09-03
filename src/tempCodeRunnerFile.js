import UserCollection from './UserCollection';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/collection/:userId" element={<UserCollection />} />
            </Routes>
        </Router>
    );
}

export default App;