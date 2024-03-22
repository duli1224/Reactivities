import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import VacationListItemPlaceholder from './VacationListItemPlaceholder';
import VacationList from './VacationList';

export default observer(function ActivityDashboard() {
    const { vacationStore } = useStore();
    const { loadVacations, vacationRegistry  } = vacationStore;

    
    useEffect(() => {
        if (vacationRegistry.size <= 1) loadVacations();
    }, [loadVacations, vacationRegistry.size])

    return (
        <Grid>
            <Grid.Column width='10'>
                {vacationStore.loadingInitial && vacationRegistry.size === 0 ? (
                    <>
                        <VacationListItemPlaceholder />
                        <VacationListItemPlaceholder />
                        <VacationListItemPlaceholder />
                    </>
                ) : (      
                        <VacationList/>
                )}
            </Grid.Column>
        </Grid>
    )
})