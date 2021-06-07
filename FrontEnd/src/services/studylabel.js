const studylabel = {
  getStudiesLabels(){ //get ALL
    const getStudiesLabelsOptions={
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return fetch('/api/studies/labels', getStudiesLabelsOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return answer.json()
    }).catch(error => {
        throw error
    })
  },

  getStudiesLabel(name){ //get Studies for one particular Label
    const getStudiesLabelOptions={
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return fetch('/api/studies/labels/'+name, getStudiesLabelOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return answer.json()
    }).catch(error => {
        throw error
    })
  },

  getStudyLabels(study_instance_uid){ //get Labels for one particular study
    const getStudyLabelsOptions={
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return fetch('/api/studies/'+study_instance_uid+'/labels', getStudyLabelsOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return answer.json()
    }).catch(error => {
        throw error
    })
  },

  getStudyLabelsByStudyOrthancID(study_orthanc_id){
    const getStudyLabelsByStudyOrthancIDOptions={
      method:'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return fetch('/api/studies/orthanc/'+study_orthanc_id+'/labels', getStudyLabelsByStudyOrthancIDOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return answer.json()
    }).catch(error => {
        throw error
    })
  },

  createStudyLabel(study_instance_uid,label_name,patient_id,study_orthanc_id,patient_orthanc_id){
    const createStudyLabelOptions={
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        study_orthanc_id:study_orthanc_id,
        patient_orthanc_id:patient_orthanc_id
      })
    }

    return fetch('/api/patient/'+patient_id+'/studies/'+study_instance_uid+'/labels/'+label_name, createStudyLabelOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return true
    })
    
  },

  deleteStudyLabel(study_instance_uid,name){
    const deleteStudyLabelOptions={
      method:'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
    }

    return fetch('/api/studies/'+study_instance_uid+'/labels/'+name, deleteStudyLabelOptions).then((answer) => {
        if (!answer.ok) { throw answer }
        return true
    })
  }

}

export default studylabel