import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
import { useEffect } from "react";

export default observer(function ProfileFollowings() {
    const { profileStore } = useStore();
    const { profile, loadingFollowings, loadFollowings, followings, activeTab } = profileStore;

    useEffect(() => {
        loadFollowings('following');
    }, [loadFollowings])

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='user' 
                            content={activeTab===3 ? `people following ${profile?.displayName}` : `people ${profile?.displayName} is following`}  />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={5}>
                        {followings.map(profile => (
                            <ProfileCard key={profile.userName} profile={profile} />
                        ))}

                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})