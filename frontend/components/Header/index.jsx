import './Header.css';
import Tabs from '../Tabs';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

const Header = ({ activeTab, setActiveTab }) => {
    return (
        <header className="header">
            <div className='logo-content'>
                <img
                    src={logo}
                    alt="OnTrigger Logo"
                    className="logo"
                />
                <h1>OnTrigger</h1>
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </header>
    );
}

export default Header;
