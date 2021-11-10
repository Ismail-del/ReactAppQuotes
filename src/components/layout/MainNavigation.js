import { NavLink, Link } from "react-router-dom";
import css from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={css.header}>
            <Link className={css.logo} to="/">
                Nice Quotes App
            </Link>
            
            <nav className={css.nav}>
                <ul>
                    <li>
                        <NavLink to='/quotes' activeClassName={css.active}>All quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to='/newQuote' activeClassName={css.active}>Add quote</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation
