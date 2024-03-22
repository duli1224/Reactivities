import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react'
import { format } from 'date-fns';
import { Vacation } from '../../../app/models/vacation';

interface Props {
    vacation: Vacation
}

export default observer(function VacationDetailedHeader({ vacation }: Props) {
    const formatDateRange = (startDate: Date, endDate: Date) => {
        console.log(startDate, endDate)
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
        </Segment.Group>
    )
})
