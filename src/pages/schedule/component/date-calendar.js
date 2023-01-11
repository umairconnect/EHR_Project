import React, { useState, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import "./calendar-date-style.css";



export default function DateCalendar(props) {
  const [value, setValue] = useState(props.defaultValue);
  const [open, setOpen] = useState(props.isOpen);
  const [activeStartDate, setActiveStartDate] = useState(props.defaultValue);
  useEffect(() => {
    setValue(props.defaultValue)
    setOpen(props.isOpen)
    setActiveStartDate(props.defaultValue);
    //console.log(props.defaultValue)
  }, [props.defaultValue, props.isOpen, value]);

  const onViewChange =(event)=>{
    // setValue(value)
    //let date = moment(event.activeStartDate).format("yy, MM, DD")
    //console.log(event);

    if (props.dateClick)
    props.dateClick(event.activeStartDate);
    setValue(props.defaultValue)
   }
   const onViewOrDateChange = ({ activeStartDate}) => {

     if (props.dateClick)
     props.dateClick(activeStartDate);
    setActiveStartDate(activeStartDate);
    setValue(props.defaultValue)
  };

  const getCurrentDate = (date) => {

      console.log(date)
      setValue(date)
      props.dateClick(date);
      setActiveStartDate(date);
  }
 
  return (
    <>
    
    <DatePicker
        //format={"MMMM yyyy"}
        //showWeekNumbers
        onViewChange={onViewChange}
        onActiveStartDateChange={onViewOrDateChange}
        activeStartDate={activeStartDate}
        onChange={date => getCurrentDate(date)}
        value={value}
        clearIcon={null}
        calendarIcon={null}
       isOpen={open}
      //view={"year"}
      />
    </>
  );
}