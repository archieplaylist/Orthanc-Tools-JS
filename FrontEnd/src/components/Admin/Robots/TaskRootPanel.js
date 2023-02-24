import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AutoRetrieveRootPanel from './AutoRetrieveRootPanel'
import TaskFlushPanel from './TaksFlushPanel'

export default () => {

    const [currentComponent, setcurrentComponent] = useState('retrieve')

    let getComponentToDisplay = () => {
        let component = null
        switch (currentComponent) {
            case 'retrieve':
                component = <AutoRetrieveRootPanel/>
                break;
            case 'flush':
                component = <TaskFlushPanel />
                break;
            default:
                break;
        }

        return component
    }

    let switchTab = (name) => {
        setcurrentComponent(name)
    }

    return (
        <>
            <div>
                <div className='mb-5'>
                    <nav className="otjs-navmenu container-fluid">
                        <div className="otjs-navmenu-nav">
                            <li className='col-6 text-center'>
                                <Button
                                    className={currentComponent === 'retrieve' ? 'otjs-navmenu-nav-link link-button-active link-button' : 'otjs-navmenu-nav-link link-button'}
                                    onClick={() => switchTab('retrieve')}>Auto Retrieve Robots
                                </Button>
                            </li>
                            <li className='col-6 text-center'>
                                <Button
                                    className={currentComponent === 'flush' ? 'otjs-navmenu-nav-link link-button-active link-button' : 'otjs-navmenu-nav-link link-button'}
                                    onClick={() => switchTab('flush')}>Flush Tasks
                                </Button> 
                            </li>
                        </div>
                    </nav>
                </div>
                <div>
                    {getComponentToDisplay()}
                </div>
            </div>
        </>
    )
}