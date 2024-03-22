import { Header} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import VacationListItem from './VacationListItem';

export default observer(function VacationList() {
    const { vacationStore } = useStore();
    const { GrupedVacations } = vacationStore;
    return (
        <>
            {GrupedVacations.map(([group, vacations]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                            {vacations.map(vacation => (
                                <VacationListItem key={vacation.id} vacation={vacation} />
                            ))}
                </Fragment>
            ))}
        </>

    )
})