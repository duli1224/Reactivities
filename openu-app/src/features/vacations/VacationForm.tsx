import { Button, Header, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VacationFormValues } from "../../app/models/vacation";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { v4 as uuid } from 'uuid';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTexeArea";
import MyDateInput from "../../app/common/form/MyDateInput";
import { vacationCategotyOptions } from "../../app/common/options/vacationCategoryOptions";
import MySelectInput from "../../app/common/form/MySelectInput";

export default observer(function VacationForm()
{
    const {vacationStore} = useStore();
    const { updateVacation , createVacation, loadVacation, loadingInitial} = vacationStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [vacation , setVacation] = useState<VacationFormValues>( new VacationFormValues() );

    const ValidationSchema = Yup.object({
        title : Yup.string().required('The vacation title is required'),
        description : Yup.string().required('The vacation description is required'),
        category : Yup.string().required('The activity categoty is required'),
        startDate : Yup.string().required('The vacation start date is required'),
        endDate : Yup.string().required('The vacation end date is required'),
        location : Yup.string().required('The vacation location is required'),
    })

    useEffect(() => {
        if(id) loadVacation(id).then(vacation => setVacation(new VacationFormValues(vacation)));
    }, [id , loadVacation])

    function handleFormSubmit(vacation: VacationFormValues){
        if (!vacation.id) {
            vacation.id = uuid();
            createVacation(vacation).then(() => navigate(`/vacations/${vacation.id}`))
        }else{
            updateVacation(vacation).then(() => navigate(`/vacations/${vacation.id}`))
        }
        
    }
    if (loadingInitial) return <LoadingComponent content= 'Loading vacation...'/>
    return(
        <Segment clearing>
            <Header content='Vacation Details' sub color='teal'/>
            <Formik validationSchema={ValidationSchema} enableReinitialize initialValues={vacation}
             onSubmit={values => handleFormSubmit(values)} >
                {({ isValid, isSubmitting,dirty, handleSubmit})=>(
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete= 'off'>
                    <MyTextInput placeholder ='Title' name='title'/>
                    <MyTextArea rows={3} placeholder = 'Description' name ='description' />
                    <MySelectInput options={vacationCategotyOptions} placeholder = 'Category' name ='category' />
                    <MyDateInput placeholderText = 'Departing'  name ='startDate' showTimeSelect
                    timeCaption='time' dateFormat='MMM d, yyy h:mm aa' />
                    <MyDateInput placeholderText = 'Returning'  name ='endDate' showTimeSelect
                    timeCaption='time' dateFormat='MMM d, yyy h:mm aa' />
                    <MyTextInput placeholder = 'Location' name ='location' />
                    <Button disabled={isSubmitting || !dirty || !isValid}
                     loading={isSubmitting} floated="right" positive 
                     type='submit' content='Submit'
                     />
                    <Button as = {Link} to = '/vacations' floated="right" type='button' content='Cancel'/>
                </Form>
                )}
            </Formik>
        </Segment>
    )
})