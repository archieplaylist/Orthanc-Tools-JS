import React from 'react'
import { keys } from '../../../model/Constant';
import apis from '../../../services/apis';
import { useCustomMutation, useCustomQuery } from '../../CommonComponents/ReactQuery/hooks';
import RobotTable from "../../CommonComponents/RessourcesDisplay/ReactTable/RobotTable";
import Spinner from '../../CommonComponents/Spinner';


export default () => {

    const { data: rows, isLoading } = useCustomQuery(
        [keys.ROBOTS_KEY],
        () => apis.retrieveRobot.getAllRobotsDetails(),
        undefined,
        undefined,
        (answerData) => {
            return answerData.map((robotJob) => {
                return ({
                    id: robotJob.id,
                    name: robotJob.details.projectName,
                    username: robotJob.creator,
                    retrieve: robotJob.progress.retrieve + '%',
                    validation: robotJob.progress.validation + '%',
                    state: robotJob.state,
                    queriesNb: robotJob.details.items.length,
                    valid: robotJob.details.valid,
                    approved: robotJob.details.approved
                })
            })
        },
        undefined,
        2000
    )

    const validationRobotHandler = useCustomMutation(
        ({ id }) => apis.retrieveRobot.validateRobot(id),
        [[keys.ROBOTS_KEY]]
    )

    const deleteJobHandler = useCustomMutation(
        ({ id }) => apis.retrieveRobot.deleteRobot(id),
        [[keys.ROBOTS_KEY]]
    )

    if (isLoading) return <Spinner/>

    return (
        <>
            <h2 className="card-title mt-4">Retrieve Robots : </h2>
            <RobotTable robots={rows} deleteJobHandler={deleteJobHandler} validationRobotHandler={validationRobotHandler} />
        </>
    )
}