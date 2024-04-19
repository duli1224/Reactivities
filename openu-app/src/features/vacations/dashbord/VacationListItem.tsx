import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import { Vacation } from "../../../app/models/vacation";

interface Props {
    vacation: Vacation
}

export default function VacationListItem({ vacation }: Props) {
    

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                    <Item.Image style={{ marginBottom: 5 }} size='tiny' circular src={vacation
                        .host?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/vacations/${vacation.id}`}>
                                {vacation.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by <Link to = {`/profiles/${vacation.host?.userName}`}>{vacation.host?.userName}</Link>
                            </Item.Description>     
                            {vacation.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        This is your vacation
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(vacation.startDate!, 'dd MMM yyyy H:mm aa ')}
                    <Icon name='marker' /> {vacation.location}
                </span>
            </Segment>      
            <Segment clearing>
                <span>{vacation.description} </span>
                <Button as={Link} to={`/vacations/${vacation.id}`} color='teal' floated='right' content='View' />
            </Segment>
        </Segment.Group>
    )
}