import React, { useContext, Fragment, useRef } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

const Alerts = () => {
  let location = useLocation();

  console.log(location.pathname);
  const alertContext = useContext(AlertContext);

  const { alerts, closeAlert } = alertContext;
  const wrapper = useRef();

  const onClick = () => {
    closeAlert();
  };

  return (
    <Fragment>
      <div className='alertsContainer'>
        <TransitionGroup>
          {alerts.length > 0 &&
            alerts.map((alert) => (
              <CSSTransition key={alert.id} timeout={500} classNames='item'>
                <div
                  className={`alert alert-${
                    location.pathname === '/login' || location.pathname ==='/register' ? 'dark' : ''
                  }`}
                  ref={wrapper}
                >
                  <div className={`side side-${alert.type}`}></div>
                  <div className='alertTextContainer'>
                    {alert.type === 'danger' ? (
                      <h5 className={`alertTitle alertTitle-${alert.type}`}>
                        Error:
                      </h5>
                    ) : (
                      <h5 className={`alertTitle alertTitle-${alert.type}`}>
                        Success:
                      </h5>
                    )}

                    <div className='alertText'>
                      <b>-</b> {alert.msg}
                    </div>
                  </div>
                  <div className='alertBtnContainer'>
                    <button onClick={onClick} className={`close close-${
                    location.pathname === '/login' || location.pathname ==='/register' ? 'dark' : ''
                  }`}></button>
                  </div>
                  <div className='timeline'></div>
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </Fragment>
  );
};

export default Alerts;
