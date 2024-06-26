import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Bon Voyage!<Image size='massive' src='/assets/logo2.png' alt='logo' style={{ margineBottom: 12 }} />    
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Plan your dream vacation' />
                        <Button as={Link} to='/vacations' size='huge' inverted>
                            Go to vacations!
                        </Button>
                    </>
                )
                    : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted>
                                Register
                            </Button>
                        </>
                    )}
            </Container>
        </Segment>
    )
})