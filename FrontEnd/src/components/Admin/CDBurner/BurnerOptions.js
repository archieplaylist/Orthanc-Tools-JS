import React, { useEffect, useState } from 'react'
import { Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { keys } from '../../../model/Constant'

import apis from '../../../services/apis'
import { useCustomMutation, useCustomQuery } from '../../CommonComponents/ReactQuery/hooks'


export default () => {

    const [burner, setBurner] = useState({
        burner_monitored_path: '',
        burner_viewer_path: '',
        burner_label_path: '',
        burner_manifacturer: '',
        burner_monitoring_level: '',
        burner_support_type: '',
        burner_date_format: '',
        burner_delete_study_after_sent: false,
        burner_transfer_syntax: null
    })

    const manufacturerOptions = [
        { value: 'Epson', label: 'Epson' },
        { value: 'Primera', label: 'Primera' }
    ]

    const levelOptions = [
        { value: 'Study', label: 'Study' },
        { value: 'Patient', label: 'Patient' }
    ]

    const supportType = [
        { value: 'Auto', label: 'Auto' },
        { value: 'CD', label: 'CD' },
        { value: 'DVD', label: 'DVD' }
    ]

    const dateFormatOptions = [
        { value: 'uk', label: 'MMDDYYYY' },
        { value: 'fr', label: "DDMMYYYY" }
    ]

    const transferSyntaxOptions = [
        { value: 'None', label: 'None (Original TS)' },
        { value: '1.2.840.10008.1.2', label: 'Implicit VR Endian' },
        { value: '1.2.840.10008.1.2.1', label: 'Explicit VR Little Endian' },
        { value: '1.2.840.10008.1.2.1.99', label: 'Deflated Explicit VR Little Endian' },
        { value: '1.2.840.10008.1.2.2', label: 'Explicit VR Big Endian' },
        { value: '1.2.840.10008.1.2.4.50', label: 'JPEG 8-bit' },
        { value: '1.2.840.10008.1.2.4.51', label: 'JPEG 12-bit' },
        { value: '1.2.840.10008.1.2.4.57', label: 'JPEG Lossless' },
        { value: '1.2.840.10008.1.2.4.70', label: 'JPEG Lossless' },
        { value: '1.2.840.10008.1.2.4.80', label: 'JPEG-LS Lossless' },
        { value: '1.2.840.10008.1.2.4.81', label: 'JPEG-LS Lossy' },
        { value: '1.2.840.10008.1.2.4.90', label: 'JPEG 2000 (90)' },
        { value: '1.2.840.10008.1.2.4.91', label: 'JPEG 2000 (91)' },
        { value: '1.2.840.10008.1.2.4.92', label: 'JPEG 2000 (92)' },
        { value: '1.2.840.10008.1.2.4.93', label: 'JPEG 2000 (93)' }

    ]

    const { isLoading } = useCustomQuery(
        [keys.BURNER_KEY],
        () => apis.options.getOptions(),
        undefined,
        (answer) => {
            console.log(answer)
            setBurner({
                burner_monitored_path: answer.burner_monitored_path,
                burner_viewer_path: answer.burner_viewer_path,
                burner_label_path: answer.burner_label_path,
                burner_manifacturer: answer.burner_manifacturer,
                burner_monitoring_level: answer.burner_monitoring_level,
                burner_support_type: answer.burner_support_type,
                burner_date_format: answer.burner_date_format,
                burner_delete_study_after_sent: answer.burner_delete_study_after_sent,
                burner_transfer_syntax: answer.burner_transfer_syntax
            })
        }
    )

    const sendForm = useCustomMutation(
        ({ burner_monitored_path, burner_viewer_path, burner_label_path, burner_manifacturer, 
            burner_monitoring_level, burner_support_type, burner_date_format, 
            burner_delete_study_after_sent, burner_transfer_syntax}) => {
            apis.options.setBurnerOptions(
                burner_monitored_path,
                burner_viewer_path,
                burner_label_path,
                burner_manifacturer,
                burner_monitoring_level,
                burner_support_type,
                burner_date_format,
                burner_delete_study_after_sent,
                burner_transfer_syntax
            )
        },
        [[keys.BURNER_KEY]]
    )


    const handleChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value

        setBurner((burner) => ({
            ...burner,
            [name]: value
        }))

    }

    const handleChangeSelect = (event, metadata) => {
        setBurner((burner) => ({
            ...burner,
            [metadata.name]: event.value
        }))

    }

    const getSelectedObject = (objectArray, searchedValue) => {
        let filteredArray = objectArray.filter(item => {
            return item.value === searchedValue ? true : false
        })

        return filteredArray[0]
    }

    if (isLoading) return "Loading ..."

    return (
        <Form>
            <h2 className="card-title">CD/DVD Burner Options</h2>

            <Row>
                <Col>
                    <FormGroup>
                        <Form.Label>Monitored Folder :</Form.Label>
                        <Form.Control type="text" value={burner.burner_monitored_path} placeholder="Example : C:\\myPath\Epson" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Form.Label>Viewer Folder :</Form.Label>
                        <Form.Control type="text" value={burner.burner_viewer_path} placeholder="Example : C:\\myPath\Viewer" onChange={handleChange} />
                    </FormGroup>
                </Col>
            </Row>

            <Row >
                <Col>
                    <FormGroup>
                        <Form.Label>Label Path : </Form.Label>
                        <Form.Control type="text" value={burner.burner_label_path} placeholder="Example : C:\\myPath\Label" onChange={handleChange} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Form.Label>Transfer Syntax :</Form.Label>
                        <Select value={getSelectedObject(transferSyntaxOptions, burner.burner_transfer_syntax)} options={transferSyntaxOptions} onChange={handleChangeSelect} single />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <Form.Label>Manufacturer : </Form.Label>
                        <Select value={getSelectedObject(manufacturerOptions, burner.burner_manifacturer)} options={manufacturerOptions} onChange={handleChangeSelect} single />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Form.Label>Monitoring Level : </Form.Label>
                        <Select value={getSelectedObject(levelOptions, burner.burner_monitoring_level)} options={levelOptions} onChange={handleChangeSelect} />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <Form.Label>Date Format :</Form.Label>
                        <Select value={getSelectedObject(dateFormatOptions, burner.burner_date_format)} options={dateFormatOptions} onChange={handleChangeSelect} />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Form.Label>Support Type :</Form.Label>
                        <Select value={getSelectedObject(supportType, burner.burner_support_type)} options={supportType} onChange={handleChangeSelect} single />
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Label>Delete Original Images From Orthanc :</Form.Label>
                </Col>
                <Col>
                    <Form.Check Check={burner.burner_delete_study_after_sent} onChange={handleChange} />
                </Col>
            </Row>

            <FormGroup>
                <Row className="justify-content-md-center">
                    <Button onClick={() => sendForm.mutate({...burner})} className='otjs-button otjs-button-blue'> Send </Button>
                </Row>
            </FormGroup>
        </Form>
    )

}