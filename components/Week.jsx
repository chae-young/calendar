import React,{useState} from 'react';
import moment from 'moment'
import Day from './Day'
import { Row } from 'react-bootstrap';

const Week = ({date,month,select,selected})=>{
    let days = [];
    for (var i = 0; i < 7; i++) {
        let day = {
            name: date.format("dd").substring(0, 1),
            daymonth:date.month(),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date
        };
        days.push(
          <Day day={day}
            selected={selected}
            select={select}/>
        );
        date = date.clone();
        date.add(1, "day");
    }

    return(
      <Row>
        {days}
      </Row>
    )
}

export default Week;
