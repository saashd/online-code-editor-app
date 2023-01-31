import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import "./App.css"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Lobby/>}/>
                <Route path="/code-block/:id" element={<CodeBlock/>}/>
            </Routes>
        </Router>
    );
}

export default App;
