import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTexeArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categotyOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ActivityForm()
{
    const {activityStore} = useStore();
    const { updateActivity , createActivity, loadActivity, loadingInitial, selectedVacationId} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity , steActivity] = useState<ActivityFormValues>( new ActivityFormValues() );

    const ValidationSchema = Yup.object({
        title : Yup.string().required('The activity title is required'),
        description : Yup.string().required('The activity description is required'),
        category : Yup.string().required('The activity categoty is required'),
        date : Yup.string().required('The activity date is required'),
        venue : Yup.string().required('The activity venue is required'),
        city : Yup.string().required('The activity city is required'),
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => steActivity(new ActivityFormValues(activity)));
    }, [id , loadActivity])

    function handleFormSubmit(activity: ActivityFormValues){
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }else{
            activity.vacationId= selectedVacationId!;
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        
    }
    if (loadingInitial) return <LoadingComponent content= 'Loading activity...'/>
    return(
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik validationSchema={ValidationSchema} enableReinitialize initialValues={activity}
             onSubmit={values => handleFormSubmit(values)} >
                {({ isValid, isSubmitting,dirty, handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete= 'off'>
                    <MyTextInput placeholder ='Title' name='title'/>
                    <MyTextArea rows={3} placeholder = 'Description' name ='description' />
                    <MySelectInput options={categotyOptions} placeholder = 'Category' name ='category' />
                    <MyDateInput placeholderText = 'Date'  name ='date' showTimeSelect
                    timeCaption='time' dateFormat='MMM d, yyy h:mm aa' />
                    <Header content='Location Details' sub color='teal'/>
                    <MyTextInput placeholder = 'City' name ='city' />
                    <MyTextInput placeholder = 'Venue' name ='venue' />
                    <Button disabled={isSubmitting || !dirty || !isValid}
                     loading={isSubmitting} floated="right" positive 
                     type='submit' content='Submit'
                     />
                    <Button as = {Link} to = 'vacations' floated="right" type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})