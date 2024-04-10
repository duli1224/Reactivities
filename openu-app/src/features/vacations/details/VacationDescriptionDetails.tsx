import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react'
import { format } from 'date-fns';
import { Vacation } from '../../../app/models/vacation';
import { useStore } from '../../../app/stores/store';
import VacationListItemAttendee from '../dashbord/VacationListItemAttendee';

interface Props {
    vacation: Vacation
}

export default observer(function VacationDetailedHeader({ vacation }: Props) {
    const { activityStore } = useStore();
    const { allAttendees} = activityStore;
    const formatDateRange = (startDate: Date, endDate: Date) => {
        const formattedStartDate = format(startDate, 'dd MMM');
        const formattedEndDate = format(endDate, 'dd MMM');
        return `${formattedStartDate} - ${formattedEndDate}`;
    };

    return (
        <Segment.Group>
            <Segment>
                <p><strong>Description:</strong> {vacation.description}</p>
                <p><strong>Date:</strong> {formatDateRange(vacation.startDate!, vacation.endDate!)}</p>
            </Segment>
            <Segment secondary>
                <p><strong> Attendees:</strong> </p>
                <VacationListItemAttendee attendees={allAttendees!} />
            </Segment>
        </Segment.Group>
    )
})
