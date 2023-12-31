import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Segment>
            <Header icon>
                <Icon name='search'/>
                Oops - we've looked everywhere but could not fine what you are looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'> 
                Return to main page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}