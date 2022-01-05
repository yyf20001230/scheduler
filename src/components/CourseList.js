import React, { useState } from 'react';
import { TermSelector, getCourseTerm } from '../utilities/time.js';
import Course from './Course';

const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

    return (
        <>
            <TermSelector term={term} setTerm={setTerm} />
            <div className="course-list">
                {termCourses.map(course => <Course course={course} selected={selected} setSelected={setSelected} />)}
            </div>
        </>
    )

};


export default CourseList;
