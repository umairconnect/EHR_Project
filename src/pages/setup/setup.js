import React, { useState, useEffect } from "react";
import { GetUserRolesRights } from '../../Services/GetUserRolesRights';
import {
    Container,
    Button,
    Fade,
    Grid
} from '@material-ui/core';

// styles
import useStyles from "./styles";
import { Link } from "react-router-dom";

// components

import PageTitle from "../../components/PageTitle";
import { LinkItem } from "../../components/UiElements";
import LocationsIcon from "../../images/icons/locationsIcon.png";
import LabsIcon from "../../images/icons/labsIcon.png";
import AppointmentProfilesIcon from "../../images/icons/appointmentProfilesIcon.png";
import ConsentFormsIcon from "../../images/icons/consentFormsIcon.png";
import ProvidersIcon from "../../images/icons/providersIcon.png";
import StaffIcon from "../../images/icons/staffIcon.png";
import UsersIcon from "../../images/icons/usersIcon.png";
import EPrescriptionIcon from "../../images/icons/ePrescriptionIcon.png";
import ChiefComplaintIcon from "../../images/icons/chiefComplaintIcon.png";
import PayersIcon from "../../images/icons/payersIcon.png";
import BillingProfileIcons from "../../images/icons/billingProfileIcons.png";
import FeeScheduleIcon from "../../images/icons/feeScheduleIcon.png";
import chartTemplate from "../../images/icons/Chart-Templates.png";
import orderDelegration from "../../images/icons/Order-delegation.png";
import listItemsIcon from "../../images/icons/list_items.png";
import reminderSettingIcon from "../../images/icons/Reminder-settings.png";
import emergencyAccessIco from "../../images/icons/emergencyAccessIco.svg";
import chartNoteTypeIco from "../../images/icons/Chart Note-type.png";

import { UserRoleRights } from "../../context/StaticDropDowns";

export default function Setup(props) {

    var classes = useStyles();

    const rightsList = [
        //{
        //    link: "/app/" + "reminderssetting".toLowerCase(),
        //    title: "Reminders Setting",
        //    description: "Update Reminders Setting",
        //    icon: ChiefComplaintIcon
        //},
        //{
        //    link: "/app/" + "ChartNotesTemplates".toLowerCase(),
        //    title: "Chart Notes Templates",
        //    description: "Add, Edit and Delete Items in Chart Notes Templates",
        //    icon: ChiefComplaintIcon
        //}
        //,
        //{
        //    link: "/app/" + "ListItem".toLowerCase(),
        //    title: "List Item",
        //    description: "Add, Edit and Delete Items in List Item",
        //    icon: ChiefComplaintIcon
        //},
        //,
        //{
        //    link: "/app/" + "OrderDelegations".toLowerCase(),
        //    title: "Order Delegations",
        //    description: "Add, Edit and Delete Items in Order Delegations",
        //    icon: ChiefComplaintIcon
        //}
        // {
        //     link: "/app/" + "FormsList".toLowerCase(),
        //     title: "FormsList",
        //     description: "Setup forms list for different patients and procedures",
        //     icon: ChiefComplaintIcon
        // }
        //{
        //    link: "/app/" + "eCQMDashboard".toLowerCase(),
        //    title: "ECQM Dashbaord",
        //    description: "eCQM Dashbaord",
        //    icon: ChiefComplaintIcon
        //}
    ];

    console.info(GetUserRolesRights)

    let user_role_rights_list = JSON.parse(GetUserRolesRights());



    if (user_role_rights_list != null) {

        user_role_rights_list.map((objright) => {

            console.warn(objright)

            if (objright.parentRightId == 6) {

                console.info(objright.rightName)

                switch (objright.rightName) {

                    case 'ChiefComplaintList': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "ChiefComplaintList".toLowerCase(),
                                title: "Chief Complaint List",
                                description: "Add, Edit and Delete Items in Chief Complaint list",
                                icon: ChiefComplaintIcon
                            });
                        }
                        break;
                    }
                    case 'eRXSettings': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "EnablingEPrescription".toLowerCase(),
                                title: "eRx Settings",
                                description: "eRx Settings and Setup for eRx Prescription.",
                                icon: EPrescriptionIcon
                            });
                        }
                        break;
                    }
                    case 'eRXSettingsFor': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "EPrescriptionControlledSubstances".toLowerCase(),
                                title: "eRx Settings For Controlled Substances",
                                description: "eRx Settings and Setup for eRx Prescription.",
                                icon: EPrescriptionIcon
                            });
                        }
                        break;
                    }
                    case 'Payers': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "Payers".toLowerCase(),
                                title: "Payers",
                                description: "Manage Payers",
                                icon: PayersIcon
                            });
                        }
                        break;
                    }
                    case 'BillingProfiles': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "BillingProfiles".toLowerCase(),
                                title: "Billing Profiles",
                                description: "Manage Billing Profiles",
                                icon: BillingProfileIcons
                            });
                        }
                        break;
                    }
                    case 'FeeSchedule': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + "FeeSchedule".toLowerCase(),
                                title: "Fee Schedule",
                                description: "Manage Fee Schedule",
                                icon: FeeScheduleIcon
                            });
                        }
                        break;
                    }
                    case 'Providers': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: ProvidersIcon
                            });
                        }
                        break;
                    }
                    case 'Locations': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: LocationsIcon
                            });
                        }
                        break;
                    }
                    case 'Staff': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: StaffIcon
                            });
                        }
                        break;
                    }
                    case 'ConsentForms': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: ConsentFormsIcon
                            });
                        }
                        break;
                    }
                    case 'AppointmentProfiles': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: AppointmentProfilesIcon
                            });
                        }
                        break;
                    }
                    case 'Specialization': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: LabsIcon
                            });
                        }
                        break;
                    }
                    case 'ScheduleSlots': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: ConsentFormsIcon
                            });
                        }
                        break;
                    }
                    case 'UserRoles': {
                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: UsersIcon
                            });
                        }
                        break;
                    }
                    case 'reminderssetting': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: reminderSettingIcon
                            });
                        }
                        break;
                    }
                    case 'OrderDelegations': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: orderDelegration
                            });
                        }
                        break;
                    }
                    case 'ChartNotesTemplates': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: chartTemplate
                            });
                        }
                        break;
                    }
                    case 'ListItem': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: listItemsIcon
                            });
                        }
                        break;
                    }
                    case 'CDSRules': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: BillingProfileIcons
                            });
                        }
                        break;
                    }

                    case 'EmergencyAccess': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: emergencyAccessIco
                            });
                        }
                        break;
                    }

                    case 'ChartNotesType': {

                        if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                            rightsList.push({
                                link: "/app/" + objright.rightName.toLowerCase(),
                                title: objright.rightLabel,
                                description: objright.rightDescription,
                                icon: chartNoteTypeIco
                            });
                        }
                        break;
                    }
                    //case 'ECQMDashboard': {
                    //
                    //    if (objright.permissionCode == UserRoleRights.ReadOnly || objright.permissionCode == UserRoleRights.Editable) {
                    //        rightsList.push({
                    //            link: "/app/" + objright.rightName.toLowerCase(),
                    //            title: objright.rightLabel,
                    //            description: objright.rightDescription,
                    //            icon: ChiefComplaintIcon
                    //        });
                    //    }
                    //    break;
                    //}

                    default:
                        break;
                }


            }

        });
    }
    //rightsList.push({
    //    link: "/app/" + "CDSRules".toLowerCase(),
    //    title: "Manage CDS Rules",
    //    description: "Manage CDS Rules",
    //    icon: BillingProfileIcons
    //});

    return (
        <>
            <PageTitle title={"Setup"} />

            <Container maxWidth={false}>

                <Container>
                    <Grid container spacing={3}>


                        {rightsList.map((obj, i) => (


                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.setUpItem} key={i}>
                                <LinkItem
                                    itemLink={obj.link}
                                    itemTitle={obj.title}
                                    itemContent={obj.description}
                                    itemImage={obj.icon}
                                />
                            </Grid>

                        ))}

                    </Grid>

                </Container>
            </Container>

        </>
    );
}
