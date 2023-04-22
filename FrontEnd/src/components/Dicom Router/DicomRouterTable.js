import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import Toggle from 'react-toggle'

import apis from "../../services/apis";
import Table from '../CommonComponents/RessourcesDisplay/ReactTable/CommonTable'

export default ({ modify, refresh, showMessage, data }) => {

  const [deletes, setDeletes] = useState(false)
  const [id_delete, setId_delete] = useState(-1)

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      hidden: true
    },
    {
      Header: 'Router\'s Name',
      accessor: 'name',
    },
    {
      Header: 'Condition',
      accessor: 'condition',
    },
    {
      Header: 'Rules',
      accessor: 'rules',
      Cell: (row) => {
        let rules = row.row.values.rules
        return (
          <div className='container'>
            {rules.map(rule => (<div key={rule.id} className='row m-1 p-2 border border-dark rounded justify-content-center' style={{ 'backgroundColor': 'rgb(88,220,124)' }}>
              <div className='col justify-content-center'>{rule.value}</div>
              <div className='col justify-content-center'>{rule.operator}</div>
              <div className='col justify-content-center'>{rule.target}</div>
            </div>))}
          </div>
        )
      },
    },
    {
      Header: 'Target',
      accessor: 'target',
      hidden: true
    },
    {
      Header: 'AET Destination',
      accessor: 'destination',
    },
    {
      Header: 'Running ?',
      accessor: 'running',
      Cell: (row) => {
        return (
          <span>
            <Toggle key={row.row.values.id} checked={row.row.values.running} onChange={() => { handleSwitch(row.row.original.id, row.row.values.running) }} />
          </span>
        )
      }
    },
    {
      Header: '',
      accessor: 'modify and delete',
      Cell: (row) => {
        return (
          <span>
            <Button className='otjs-button otjs-button-orange me-1' onClick={() => { modify(row.row.values) }}>Modify</Button>
            <Button className='otjs-button otjs-button-red' onClick={() => { showDeleteConfirmation(row.row.values.id) }}>Delete</Button>
          </span>
        )
      }
    }
  ]

  /**
   * Switch ON/OFF the running button by updating the database
   * @param {number} id id of the autorouter to switch
   * @param {boolean} running current value of the switch
   */
  const handleSwitch = async (id, running) => {
    await apis.autorouting.switchOnOff(id, !running)
    await refresh()
    showMessage()
  }

  /**
   * Show the modal dialog that confirm the delete process
   * @param {number} id id of the autorouter to delete
   */
  const showDeleteConfirmation = (id) => {
    setDeletes(true)
    setId_delete(id)
  }

  /**
   * Close the modal dialog made for deleting
   */
  const onHide = () => {
    setDeletes(false)
    setId_delete(-1)
  }

  /**
   * Remove the router after deleting was confirmed on the opened modal dialog
   */
  const removeRouter = async () => {
    await apis.autorouting.deleteAutorouter(id_delete)
    onHide()
    refresh()
    showMessage()
  }

  return (<>
    <Modal
      show={deletes}
      keyboard={true}
      animation={true}
      onHide={() => onHide()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton><h5>Delete Router</h5></Modal.Header>
      <Modal.Body>Are you sure you want to delete this router ?</Modal.Body>
      <Modal.Footer>
        <Button className='otjs-button otjs-button-orange me-1' onClick={() => { onHide() }}>Cancel</Button>
        <Button className='otjs-button otjs-button-red' onClick={() => { removeRouter() }}>Delete</Button>
      </Modal.Footer>
    </Modal>
    <Table columns={columns} tableData={data} />
  </>
  )
}