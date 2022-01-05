export const hasConflict = (course, selected) => (
    selected.some(selection => courseConflict(course, selection))
);

export const getCourseTerm = course => (
    terms[course.id.charAt(0)]
);

export const getCourseNumber = course => (
    course.id.slice(1, 4)
);

export const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

export const TermSelector = ({ term, setTerm }) => (
    <div className="btn-group">
        {
            Object.values(terms)
                .map(value => <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />)
        }
    </div>
);

export const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

export const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: mapValues(addCourseTimes, schedule.courses)
});

const TermButton = ({ term, setTerm, checked }) => (
    <>
        <input type="radio" id={term} className="btn-check" autoComplete="off" onChange={() => setTerm(term)} checked={checked} />
        <label class="btn btn-success m-1 p-2" htmlFor={term}>
            {term}
        </label>
    </>
);

const courseConflict = (course1, course2) => (
    getCourseTerm(course1) === getCourseTerm(course2)
    && timeConflict(course1, course2)
);

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => (
    days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
    Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
    daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
    const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    return !match ? {} : {
        days,
        hours: {
            start: hh1 * 60 + mm1 * 1,
            end: hh2 * 60 + mm2 * 1
        }
    };
};

const mapValues = (fn, obj) => (
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
    ...course,
    ...timeParts(course.meets)
});






