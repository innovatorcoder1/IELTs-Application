import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Pricing from './pages/Pricing';
import Rules from './pages/Rules';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import WritingPractice from './pages/WritingPractice';
import SpeakingPractice from './pages/SpeakingPractice';
import ListeningPractice from './pages/ListeningPractice';
import ReadingPractice from './pages/ReadingPractice';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FullSimulations from './pages/FullSimulations';
import AcademicReading from './pages/AcademicReading';
import Research from './pages/Research';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';


function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/full-simulation" element={<FullSimulations />} />
            <Route path="/academic-reading" element={<AcademicReading />} />
            <Route path="/research" element={<Research />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout/:planName" element={<Checkout />} />
            <Route path="/app" element={<Layout />}>

                <Route index element={<Dashboard />} />
                <Route path="writing/:testType?" element={<WritingPractice />} />
                <Route path="speaking/:testType?" element={<SpeakingPractice />} />
                <Route path="listening/:testType?" element={<ListeningPractice />} />
                <Route path="reading/:testType?" element={<ReadingPractice />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<HelpCenter />} />
            </Route>
        </Routes>
    );
}

export default App;
