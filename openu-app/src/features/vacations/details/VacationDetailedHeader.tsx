import { observer } from 'mobx-react-lite';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Vacation } from '../../../app/models/vacation';

const images = ["airBaloons.jpg", "beach.jpg", "rollercoster.jfif", "Skiing.png", "sunset.jfif"]

const getRandomIndex = (max: number) => Math.floor(Math.random() * max)

const chooseRandomImage = () => {
    const randomIndex = getRandomIndex(images.length);
    return images[randomIndex];
};

const vacationImageStyle = {
    filter: 'brightness(30%)'
};

const vacationImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    vacation: Vacation
}

export default observer(function VacationDetailedHeader({ vacation }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/vacationImages/${chooseRandomImage()}`} fluid style={vacationImageStyle} />
                <Segment style={vacationImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={vacation.title}
                                    style={{ color: 'white' }}
                                />
                                <p><strong>Departing:</strong> {format(vacation.startDate!, 'dd MMM yyyy')}</p>
                                <p><strong>Returning:</strong> {format(vacation.endDate!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${vacation.hostUserName}`}>{vacation.hostUserName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {vacation.isHost && (
                    <>
                        <Button as={Link} to={`/manageVacation/${vacation.id}`} color='orange' floated='right'>
                            Manage Vacation
                        </Button>    
                    </>
                )}
                <Button as={Link} to='/createActivity' positive content='Create Activity' floated='left' />
            </Segment>
        </Segment.Group>
    )
})


