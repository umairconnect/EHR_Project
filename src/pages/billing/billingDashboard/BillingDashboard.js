import React, { useState,useEffect } from "react";
import Grid from '@material-ui/core/Grid';

import PageTitle from "../../../components/PageTitle/PageTitle";
import BillingSummary from "./components/billingSummary/BillingSummary";
import BillingUpdateBox from "./components/billingUpdateBox/BillingUpdateBox";
import AccountReceiable from "./components/accountReceivable/AccountReceivable";
import PaymentsUnderPaid from "./components/paymentsUnderPaid/PaymentsUnderPaid";
import BalanceLedger from "./components/balanceLedger/BalanceLedger";
import { GetUserInfo } from '../../../Services/GetUserInfo';
import { PostDataAPI } from '../../../Services/PostDataAPI';


//styles
import useStyles from "./styles";

// components

// import { Typography } from "../../components/Wrappers";

export default function Billing(props) {
    var classes = useStyles();
    const [userInfo] = useState(JSON.parse(GetUserInfo()).user);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [daySheet, setDaySheet] = useState({ column1: "0.00", column2: "0.00", column3: "0.00", column4: "0.00" });
    const [accountReceivable, setAccountReceivables] = useState([]);
    const [underPaidItemsCount, setUnderPaidItemsCount] = useState(0);
    const [state, setState] = useState({});

    function loadDaySheetReport() {
        var params = {
            reportName: "Day Sheet",
            Date_From: "",
            Date_To: "",
            Patient: "",
            Location: "",
            Room: "",
            Reason: ""
        }
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            if (result.success && result.data != null) {
                setDaySheet(result.data[0]);
                setIsUpdate(true)
                setTimeout(() => { setIsUpdate(false)},1000);
            }
        });
    }

    function load_era_rej_claims_pending_followups() {
        var params = {
            SPName: "SP_BILLING_DASHBOARD_ERA_REJ_CLAIMS_PENDING_FOLLOWUPS"
        }
        PostDataAPI("ddl/loadItemsBySP", params).then((result) => {
            if (result.success && result.data != null) {
                setState(result.data[0]);
                setIsUpdate(true)
                setTimeout(() => { setIsUpdate(false) }, 1000);
            }
        });
    }

    function loadUnderPaidItems() {
        var params = {
            reportName: "Underpaid Item Reports",
            Code: "",
            Date_From: "",
            Date_To: "",
            Ins_Code: ""
        }
        PostDataAPI("reports/loadReportGrid", params).then((result) => {
            if (result.success && result.data != null) {
                var _count = 0;
                result.data.map((item, i) => {
                    _count++;
                })
                setIsUpdate(true)
                setUnderPaidItemsCount(_count);
                setTimeout(() => { setIsUpdate(false) }, 1000);
            }
        });
    }
    function saveAuditLogInfo() {
        var params = {
            sessionId: userInfo.currentSessionId,
            area: "Billing dashboard",
            activity: "Load billing dashboard details",
            details: "User viewed billing dashboard screen"
        };
        PostDataAPI('userauditlog/add', params, true).then((result) => {
        })
    }

    useEffect(() => {
        load_era_rej_claims_pending_followups();
        loadDaySheetReport();
        loadUnderPaidItems();
        saveAuditLogInfo();
    }, []);
    return (
        <div className={classes.billingMain}>
            <PageTitle title="Dashboard - Billing" />
            <Grid container spacing={1} className={classes.container}>
                {/* BillingSummary component  */}
                <BillingSummary/>

                {/* ERA to Review, Rejected Claims, Pending Follow-up, Frequent Procedures  components  */}
                <BillingUpdateBox data={state} isUpdate={isUpdate} />

                {/* Account Receivable (Top Five) component  */}
                <AccountReceiable data={accountReceivable} isUpdate={isUpdate}/>

                {/* Daily Payments,Under Paid,  components  */}
                <PaymentsUnderPaid data={daySheet} underPaidItemCount={underPaidItemsCount } isUpdate={isUpdate} />

                {/* Patient Balance Ledger, Insurance Balance Ledger  components  */}
                <BalanceLedger />

            </Grid>
        </div>
    );
}

