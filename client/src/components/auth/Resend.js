import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Resend = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  // Countdown
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  const {
    resendEmail,
    user,
    error,
    success,
    clearErrors,
    loadUser,
    timeoutDate,
    isVerified,
    resendReset,
  } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    loadUser();

    if (error === 'This account has already been verified') {
      setAlert(error, 'danger');
      clearErrors();
    } else if(user !== null){
      if (
        success === `A verification email has been sent to ${user.email}`
      ) {
        setAlert(success, 'success');
        clearErrors();
      }
    }
  }, [error, success]);

  const setTime = () => {
    function AddMinutesToDate(date, minutes) {
      return new Date(date.getTime() + minutes * 60000);
    }
    const curDate = new Date();
    let date = AddMinutesToDate(curDate, 5);
    let day = date.getDate();
    console.log(day);
    if (day < 10) {
      day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const year = date.getFullYear();
    let hour = date.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let mins = date.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }
    let secs = date.getSeconds();
    if (secs < 10) {
      secs = `0${secs}`;
    }

    const dateFormat = `${month} ${day} ${year}, ${hour}:${mins}:${secs}`;

    return dateFormat;
  };

  if (!localStorage.date) {
    localStorage.setItem('date', setTime());
  }

  // Resend Email
  const onClick = () => {
    if (user !== null) {
      resendEmail(user.email);
    }
    localStorage.removeItem('date');
    localStorage.setItem('date', setTime());
  };

  let timeTillDate = timeoutDate;
  let timeFormat = 'MM DD YYYY, h:mm:ss ';
  const then = moment(timeTillDate, timeFormat);
  const now = moment();

  useEffect(() => {
    let interval = setInterval(() => {
      if (now < then) {
        const duration = moment.duration(then.diff(now));
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const onLogin = () => {
    localStorage.removeItem('date');
    resendReset();
  };

  let email = 'email@email';

if(user !== null){
  email = user.email
}

  return (
    <div className='resendContainer'>
      {isVerified ? (
        <h1>
          Your email has already been Verified. Please{' '}
          <Link
            className='link resendLink'
            onClick={onLogin}
            to='/login'
            style={{ fontSize: '0.85em' }}
          >
            Log in
          </Link>
        </h1>
      ) : (
        <Fragment>
          <div className='text'>
            <h2>Email Verification</h2>

            <p>
              A verification email was sent to <b>{email}</b>.
            </p>
            <p>Please verify your email within: </p>
            <div className='countdown-wrapper'>
              {now > then && <span>Time is out</span>}
              {minutes && (
                <div className='countdown-item'>
                  <SVGCircle radius={minutesRadius} />
                  <h4>{minutes}</h4>
                  <span>minutes</span>
                </div>
              )}
              {seconds && (
                <div className='countdown-item'>
                  <SVGCircle radius={secondsRadius} />
                  <h4>{seconds}</h4>
                  <span>seconds</span>
                </div>
              )}
            </div>
            <p>
              If you did not receive the email or ran out of time, please click
              the <br></br>Resend Button below
            </p>
          </div>
          <div className='resendDiv'>
            <button className='resendBtn' onClick={onClick}>
              Resend
            </button>
          </div>
        </Fragment>
      )}

      <Alerts />
    </div>
  );
};
const SVGCircle = ({ radius }) => (
  <svg className='countdown-svg'>
    <path
      fill='none'
      stroke='#00af9c'
      strokeWidth='4'
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);
// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');

  return d;
}

function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

export default Resend;
