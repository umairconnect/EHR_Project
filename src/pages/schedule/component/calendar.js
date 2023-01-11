import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";


export default function CalendarShow(props) {
  const [value, setValue] = useState(props.defaultValue);

const onViewChange =(event)=>{
 // setValue(value)
 let date = moment(event.activeStartDate).format("yy, MM, DD")
 //console.log(event);
 if (props.dateClick)
 props.dateClick(event.activeStartDate);
 setValue(props.defaultValue)
}
const onChange =(event)=>{
  if (props.dateClick)
 props.dateClick(event);
  setValue(event)
  console.log(event)

}
useEffect(() => {
 
  setValue(props.defaultValue)
  //console.log(props.defaultValue)
}, [props.defaultValue]);

  return (
    <>
   
          <Calendar
           onClick={(value) => alert('New date is: ', value)}
            onViewChange={onViewChange}
            value={value}
         
            
             view={"year"}
           // defaultView={"decade"}
           
          />
    </>
  );
}