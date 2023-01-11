import React from "react";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '../../../../../../images/icons/add-icon.png';
import EditIcon from '../../../../../../images/icons/editIcon.png';
// styles
import useStyles from "./styles";

function ListTitle({title,onClick,checkData, disabled, inlineBlock, ...props}) {
    var classes = useStyles();
    return (
        <>
         <div className={classes.listTitle} {...props} style={{display: inlineBlock}} >
                <span>{title}</span>
                {!disabled ? <>
                {checkData ?
                (<span className={classes.editBtn} title={"Edit "+ title} onClick={onClick}><img src={EditIcon} alt="Edit" /></span> )
                :
                (<span className={classes.addNew} title={"Add New "+ title} onClick={onClick}><img src={AddIcon} alt="Add New" /></span>)
                }</>
                :null}
            </div>
        </>
    )
}
function ListView({listData,noRecordedtitle,disabled, ...props}) {
    var classes = useStyles();

    return (
        <>
        {listData.length < 1 ?(
        
        !disabled ?<div className={classes.noRecord}>{noRecordedtitle}</div>:<div className={classes.DisnoRecord}>{noRecordedtitle}</div>):(
                <ul className={classes.treeView} {...props}>
                       {listData.map((item, i) => (
                           <li key={i}>
                               <div className={classes.treeContent}>
                                   {!disabled ?<>
                                   
                                   <div className={classes.DistreeLabel}>{item.listTitle}</div>
                                   </>:<>
                                   
                                   <div className={classes.DistreeLabel}>{item.listTitle}</div></>}
                                
                               </div>
                           </li>
                       )
                       )}
                   </ul>
                   )
            }
        </>
    )
}

export {ListTitle, ListView };
