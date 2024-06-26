import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img sizes='massive' src='/assets/logo2.png' alt='logo' style={{ marginRight: '10px' }} />
                    Bon Voyage!
                </Menu.Item>
                <Menu.Item as={NavLink} to='/vacations' name='Vacations' />
                <Menu.Item>
                    <Button as={NavLink} to='/createVacation' positive content='Create Vacation' />
                </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' style={{ width: '44px', height: '44px' }} />
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profiles/${user?.userName}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
            </Container>
        </Menu>
    );
});