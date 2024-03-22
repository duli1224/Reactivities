import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import VacationDetailedHeader from "./VacationDetailedHeader";
import VacationDescriptionDetails from "./VacationDescriptionDetails";
import ActivityDashboard from "../../activities/dashboard/ActivityDashboard";

export default observer (function ActivityDetails() {
    const {vacationStore} = useStore();
    const {selectedVacation: vacation, loadVacation , loadingInitial, clearSelectedVacation} = vacationStore;
    const {id} = useParams();
    useEffect(() => {
        if (id) loadVacation(id);
        return () => clearSelectedVacation();
    } , [id , loadVacation, clearSelectedVacation])

    if(loadingInitial || !vacation) return <LoadingComponent content={""}/>;

    return(
        <Grid>
            <Grid.Column width={10}>
                <VacationDetailedHeader vacation = {vacation}/>
                <VacationDescriptionDetails vacation = {vacation}/>
                <ActivityDashboard vacationId = {vacation.id}/>
            </Grid.Column>  
        </Grid>
    )
})