import React, { Fragment, Component } from 'react'
import SearchForm from './SearchForm'
import apis from '../../services/apis'
import TablePatients from './TablePatients'

import TableSeries from './TableSeries'
import tableSeriesFillFromParent from './TableSeriesFillFromParent'
import tablePatientWithNestedStudies from './TablePatientsWithNestedStudies'


const TableSeriesFillFromParent = tableSeriesFillFromParent(TableSeries);
const TablePatientsWithNestedStudies = tablePatientWithNestedStudies(TablePatients)

class ContentPanel extends Component {

  state = {
    studies: [], 
    currentSelectedStudyId : ""
  } 

  constructor(props){
    super(props)
    this.sendSearch = this.sendSearch.bind(this)
    this.onDeletePatient = this.onDeletePatient(this)
    this.onDeleteStudy = this.onDeleteStudy(this)
    this.onDeleteSeries = this.onDeleteSeries.bind(this)
  }


  async sendSearch(dataFrom){
    let studies = await apis.content.getContent(dataFrom)
    let hirachicalAnswer = this.traitementStudies(studies)
    let dataForPatientTable = this.prepareDataForTable(hirachicalAnswer)
    this.setState({ studies: dataForPatientTable })
  }


  prepareDataForTable(responseArray){
    let answer = []
    for(let patient in responseArray) {
        answer.push( {
            patientOrthancID  : patient,
            ...responseArray[patient]
        })
    }
    return answer

  }

  traitementStudies(studies){
      let responseMap = []
      studies.forEach(element => {
              responseMap[element.ParentPatient] = {
                  patientBirthDate: element.PatientMainDicomTags.PatientBirthDate,
                  patientID : element.PatientMainDicomTags.PatientID,
                  patientName: element.PatientMainDicomTags.PatientName, 
                  patientSex: element.PatientMainDicomTags.PatientSex, 
                  studies: { 
                          [element.ID]: {
                              isStable: element.IsStable,
                              lastUpdate: element.LastUpdate,
                              patientId: element.PatientMainDicomTags.PatientID,
                              accessionNumber: element.MainDicomTags.AccessionNumber, 
                              studyDate: element.MainDicomTags.StudyDate, 
                              studyDescription: element.MainDicomTags.StudyDescription, 
                              studyInstanceUID: element.MainDicomTags.StudyInstanceUID, 
                              studyTime: element.MainDicomTags.StudyTime, 
                              series: element.Series
                          }
                      }

              } 
              
          })
      return responseMap
      
  }

  onDeletePatient(idDeleted){


  }

  onDeleteStudy(idDeleted){

  }

  onDeleteSeries(idDeleted){

    this.setState({
      currentSelectedStudyId : ''
    })

  }

  selectRow={
    mode: 'checkbox', 
    onSelect: this.handleRowSelect
  }

  async handleRowSelect(row){
      console.log("Selected row : ", row)
  }

  rowEventsStudies = {
      onClick: (e, row, rowIndex) => {
          this.setState({
              currentSelectedStudyId : row.studyOrthancID
          })
      } 
  }
  
  render() {
      return (
      <Fragment>
        <div className='jumbotron'>
          <div >
            <SearchForm onSubmit={this.sendSearch}/>
          </div>
          <div className='row'>
              <div className='col-sm'>
                  <TablePatientsWithNestedStudies patients={this.state.studies} selectRow={ this.selectRow } rowEventsStudies={ this.rowEventsStudies } onDeletePatient={this.onDeletePatient} onDeleteStudy={this.onDeleteStudy} />
              </div>
              <div className='col-sm'>
                  <TableSeriesFillFromParent studyID={this.state.currentSelectedStudyId} onDelete = {this.onDeleteSeries} />
              </div>
          </div>
        </div>
      </Fragment>
    )
  }

}

export default ContentPanel