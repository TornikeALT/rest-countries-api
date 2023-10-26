import classes from '../styles/Mode.module.css';
import '../index.css'
import { BsMoonFill, BsMoon } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';


function Mode() {
    const { theme, toggleTheme } = useTheme();

    const styles = theme ? 'half_dark' : 'white'

    return (
        <header className={`${classes.header} ${styles}`} id='header'>
            <a href="/" >
                <h2 className={styles}>Where in the world?</h2>
            </a>
            <div className='moon'>
                {theme ? <BsMoonFill size={15} /> : <BsMoon size={15} />}
                <span onClick={toggleTheme}>Dark Mode</span>
            </div>
        </header>
    );
}

export default Mode;