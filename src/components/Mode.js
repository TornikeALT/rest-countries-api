import classes from '../styles/Mode.module.css';
import '../index.css'

function Mode() {
    return (
        <header className={classes.header}>
            <h2>Where in the world?</h2>
            <span>Dark Mode</span>
        </header>
    );
}

export default Mode;