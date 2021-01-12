import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams, useLocation} from 'react-router-dom';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RenderProposalsToReviewTab from '../partials/AdminPortal/ProposalsToReviewTab';
import RenderAlerts from '../partials/Alerts/Alerts';
import RenderLoadingPage from '../partials/LoadingPage';

import useQueryString from '../utils/useQueryString'; 
import * as GLOBAL_VARS from '../utils/vars';
import RenderManageCategoriesTab from '../partials/AdminPortal/ManageCategoriesTab';
import RenderSetVotingPeriodTab from '../partials/AdminPortal/SetVotingPeriodTab';
import RenderRemoveProfilesTab from '../partials/AdminPortal/RemoveProfilesTab';
import RenderTransferAdminRoleTab from '../partials/AdminPortal/TransferAdminRoleTab';


export default function RenderAdminPortal(props){
    const [tabString, setTabString] = useQueryString(GLOBAL_VARS.TAB_QUERY_STRING_KEY, GLOBAL_VARS.DEFAULT_ADMIN_TAB_KEY);
    let [searchParams, ] = useSearchParams();
    let location = useLocation();

    const [alertList, setAlertList] = useState([]);

    const navigate = useNavigate();

    console.log(tabString);
    useEffect(()=>{
        
        let newTabString = searchParams.get(GLOBAL_VARS.TAB_QUERY_STRING_KEY) || GLOBAL_VARS.DEFAULT_ADMIN_TAB_KEY;
        
        setTabString({value: newTabString, skipUpdateQS: true});   
        
        //eslint-disable-next-line
    }, [location])
    function showAlert(alertObj){
        // Make a copy.
        let alerts = alertList.slice(0);
        // Push new alert to the copied list
        alerts.push(alertObj);
        // Update the list.
        setAlertList(alerts);
    }

    function removeAlert(index){
        // Make a copy.
        let alerts = alertList.slice(0);
        // remove alert at index.
        alerts.splice(index,1);
        // Update the list.
        setAlertList(alerts);
    }
    if(props.queryingAdmin){
        return (<RenderLoadingPage/>);
    }

    if(!props.isAdmin){
        navigate(-1, {replace: true});
    }

    return (
        <div>
            <RenderAlerts
                alertList={alertList}
                removeAlert={removeAlert}
            />
            <Tabs activeKey={tabString} id="admin-portal" onSelect={(k)=>setTabString(k)}>
                <Tab 
                    eventKey={GLOBAL_VARS.PROPOSALS_TO_REVIEW_TAB_KEY} 
                    title="Proposals to review"                     
                >
                    <RenderProposalsToReviewTab
                        activeUser={props.activeUser}
                        categories={props.categories}
                    />                    
                </Tab>
                <Tab 
                    eventKey={GLOBAL_VARS.CATEGORIES_TAB_KEY} 
                    title="Manage categories" 
                >
                    <RenderManageCategoriesTab
                        activeUser={props.activeUser}
                        categories={props.categories}
                        deprecatedCategories={props.deprecatedCategories}
                        queryingCategories={props.queryingConfigs}
                        showAlert={showAlert}
                        rerunCategoriesQuery={props.rerunConfigQuery}
                    />
                </Tab>
                <Tab 
                    eventKey={GLOBAL_VARS.SET_VOTING_TAB_KEY} 
                    title="Set voting period" 
                >
                    <RenderSetVotingPeriodTab
                        activeUser={props.activeUser}
                        votingDuration={props.votingDuration}
                        queryingVotingPeriod={props.queryingConfigs}
                        showAlert={showAlert}
                        rerunVotingPeriodQuery={props.rerunConfigQuery}
                    />

                </Tab>
                <Tab 
                    eventKey={GLOBAL_VARS.REMOVE_PROFILE_TAB_KEY} 
                    title="Remove profiles" 
                >
                    <RenderRemoveProfilesTab
                        activeUser={props.activeUser}
                        showAlert={showAlert}
                    />
                </Tab>
                <Tab 
                    eventKey={GLOBAL_VARS.TRANSFER_ADMIN_ROLE_TAB_KEY} 
                    title="Transfer admin role" 
                >
                    <RenderTransferAdminRoleTab
                        activeUser={props.activeUser}
                        showAlert={showAlert}
                        rerunAdminQuery={props.rerunAdminQuery}
                    />
                </Tab>
                
            </Tabs>
        </div>
    );
}