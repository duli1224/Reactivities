import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent, useEffect } from "react";
import { Card, Grid, Header, Tab, TabProps, Image} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { UserActivity } from "../../app/models/profile";

export default observer(function ProfileActivityList() {
    const { profileStore } = useStore();
    const { loadingActivities, loadUserActivities, profile, userActivitiesList } = profileStore;

    useEffect(() => {
        loadUserActivities(profile!.userName);
    }, [loadUserActivities, profile]);

    const handleTabChange = (_e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(profile!.userName, panes[data.activeIndex as number].pane.key);
    };

    const panes = [
        { menuItem: 'Past Activities', pane: { key: 'past' } },
        { menuItem: 'Future Activities', pane: { key: 'future' } },
        { menuItem: 'Activities Im Hosting', pane: { key: 'hosting' } },
    ];

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar'
                        content={'Activities'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userActivitiesList.map((activity: UserActivity) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{minHeight: 100, objectFit:'cover'}}
                                />
                                <Card.Content>
                                    <Card.Header
                                        textAlign='center'>{activity.title}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(new Date(activity.date),
                                            'do LLL')}</div>
                                        <div>{format(new Date(activity.date),
                                            'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});
       
