import React,{useState,useEffect} from "react"
import { MDBInput, MDBDataTable,MDBIcon  } from 'mdbreact';
import { PostDataAPI } from '../../../../../Services/PostDataAPI';
import { GetUserInfo } from '../../../../../Services/GetUserInfo';
import useStyles from './styles'
import { data as gridCnfg } from '../../../../../components/SearchGrid/Data/SetupData';
import { Skeleton } from "@material-ui/lab";
import Erase from "../../../../../images/icons/erase.png"
import Delete from "../../../../../images/icons/trash.png"
import {Button, Icon,Typography,Grid} from "@material-ui/core"
export default function LeftSideMenuGrid({onEdit,onDelete,onAddNew,isSearchAble,ischeckboxes,Title,Action2,...props}){
    var classes = useStyles();
    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [rowsData2, setRowsData2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const ScheduleSlots=[
        {
            providerSlotID:"1900",check:"",scheduleDate:"scheduleDate",scheduleTime:"scheduleDate",locationName:"scheduleDate",
            providerName:"scheduleDate",patientName:"scheduleDate", patientApptReason:"scheduleDate",statusCode: ""
        },
        {
            providerSlotID:"1901",check:"",scheduleDate:"scheduleDate 1",scheduleTime:"scheduleDate 1",locationName:"scheduleDate 1",
            providerName:"scheduleDate 1",patientName:"scheduleDate 1", patientApptReason:"scheduleDate 1", statusCode: ""
        },
        {
            providerSlotID:"1902",check:"",scheduleDate:"scheduleDate 2",scheduleTime:"scheduleDate 2",locationName:"scheduleDate 2",
            providerName:"scheduleDate 2",patientName:"scheduleDate 2", patientApptReason:"scheduleDate 2", statusCode: ""
        },
        {
            providerSlotID:"193",check:"",scheduleDate:"scheduleDate 3",scheduleTime:"scheduleDate 3",locationName:"scheduleDate 3",
            providerName:"scheduleDate 3",patientName:"scheduleDate 3", patientApptReason:"scheduleDate 3", statusCode: ""
        },
    ];
    //
    const [values, setValues] = useState({}); 
    const loadData=()=>{
            setRowsData(
                ScheduleSlots.map((item,i)=>{
                    if(ischeckboxes){
                        item.check=<><MDBInput type="checkbox"  name={item[gridCnfg["ScheduleSlots"][0].field]} color="primary" /></>
                    }                 
                    item.statusCode=   
                                    <>
                                        <Icon> <img src={Erase} onClick={()=>onEdit(item[gridCnfg["ScheduleSlots"][0].field])} className={classes.Icon}/> </Icon>
                                        <Icon> <img src={Delete} onClick={()=>onDelete(item[gridCnfg["ScheduleSlots"][0].field])} className={classes.Icon}/> </Icon>
                                    </>
                                    return {...item}
                }))
    }
    useEffect(()=>{
        loadData();
    },[])
    const tableData = {
        columns: gridCnfg["ScheduleSlots"],
        rows: rowsData,
    };
    return (
        <>
        {isLoading ? (
            <>
                <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                    <div style={{ paddingTop: '27%' }} />
                </Skeleton>
            </>
            ) : (
                <div className={classes.dataTable}>
                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Grid container justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>
                        <Grid container justify="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>
                            {onAddNew ? 
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={loadData}
                                >+ Achieve Selected
                                </Button>:""}
                                
                                {Title ?  <Typography className={classes.title}>{Title}</Typography> : ""}
                        </Grid>  
                        </Grid>
                       
                         <Grid container justify="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                            {/* {onAddNew ? 
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={loadData}
                                >+ Add New
                                </Button>:""}
                                <Button
                                    size="small"
                                    className={classes.newAddBtn2}
                                    onClick={loadData}
                                >+ Add New
                                </Button> */}
                             
                        </Grid>                        
                        
                    </Grid>
                    <>
                    {
                        isSearchAble ?
                        
                        <MDBDataTable
                            striped
                            small
                            btn
                            searching={false}
                            data={tableData}
                        />
                        :
                        <MDBDataTable
                            striped
                            small
                            btn
                            searching={false}
                            data={tableData}
                        />
                    }
                    </>
                </div>
            )   
        }
        </>
    )

}