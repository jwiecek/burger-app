import React, {useState} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props: any) => {

    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerHandler = () => {
        setSideDrawer(!showSideDrawer);
    };

    return (
        <Aux>
            <Toolbar toggle={sideDrawerHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;
