import { Segment, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

interface Props {
    vacationId: string;
}

export default observer(function ActivityDashboard({ vacationId }: Props) {
    const { activityStore } = useStore();
    const { loadActivities, setSelectedVacationId, activityRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    setSelectedVacationId(vacationId);

    function handelGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size])

    return (
        <Segment.Group>
            <Segment>
                {activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
                    <>
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                        <ActivityListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handelGetNext}
                        hasMore={!loadingNext && !!pagination && pagination?.currentPage < pagination?.totalPages}
                        initialLoad={false}>
                        <ActivityList />
                    </InfiniteScroll>
                )}
            </Segment>

            <Segment>
                <Loader active={loadingNext} />
            </Segment>
        </Segment.Group>
    )
})
