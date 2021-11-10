import { Fragment } from "react"
import MainNavigation from "./MainNavigation";
import css from './Layout.module.css';

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main className={css.main}>{props.children}</main>
        </Fragment>
    )
}

export default Layout
