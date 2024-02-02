import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App'; // Your main App component, which is now a simple component
import About from './About'; // Your About component
import Demo from './Demo'; // Your Demo component that now contains the former App content

const AppRouter = () => {
    return (
        <Router>
            {/*<nav>*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*    <Link to="/about">About</Link>*/}
            {/*    <Link to="/demo">Demo</Link>*/}
            {/*</nav>*/}
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="/demo" element={<Demo />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
