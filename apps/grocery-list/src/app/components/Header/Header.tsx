import styles from './header.module.scss';

export default function Header(): React.ReactElement {
    return (
        <header className={styles['headerContainer']}>
            <h1>Grocery List</h1>
            <input className={styles['searchInput']} type="text" placeholder="Search" />
        </header>
    )
}