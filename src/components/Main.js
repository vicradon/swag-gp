import React from 'react'
import Semester from './semester/semester'
import store from '../redux/store'
import { setCurrent } from '../redux/actions'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    currentSemesters: state.data.currentLevel,
    currentLevelId: state.data.currentLevelId
  }
};

const mapDispatchToProps = {
  setCurrent
};

const { currentLevelId } = mapStateToProps(store.getState());
store.dispatch(setCurrent(currentLevelId));


function Main({ currentSemesters }) {

  const objects = currentSemesters.map(semester => {
    return <Semester
      key={semester.id}
      id={semester.id}
      name={semester.name}
      level={semester.level}
      courses={semester.courses}
      form={semester.form}
      details={semester.details}
      editing={semester.editing}
      levelid={semester.levelid}
    />
  });

  return (
    <main>
      {objects}
    </main>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);