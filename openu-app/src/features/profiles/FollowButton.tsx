import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Reveal, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { SyntheticEvent } from "react";

interface Props {
    profile: Profile;
}

export default observer(function followButton({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    if (userStore.user?.userName === profile.userName) return null;

    function handelFollow(e: SyntheticEvent, userName: string) {
        e.preventDefault();
        profile.following ? updateFollowing(userName, false) : updateFollowing(userName, true);
    }

    return (
        <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
                <Button 
                    fluid 
                    color='teal' 
                    content={profile.following ? 'Following' : 'Not following'} />
            </Reveal.Content>
            <Reveal.Content hidden style={{ width: '100%' }}>
                <Button 
                    fluid color={profile.following ? 'red' : 'green'} 
                    content={profile.following ? 'Unfollow' : 'Follow'}
                    loading={loading}
                    onClick={(e) => handelFollow(e, profile.userName)} />
            </Reveal.Content>
        </Reveal>
    )
})