import React, { useState, useEffect } from 'react'
import Semester from './semester/semester'
import store from '../redux/store'
import { setCurrent } from '../redux/actions'
import { connect } from 'react-redux'
import { auth, db } from '../firebase/index'
import { getCurrentUser } from '../redux/utility-functions'


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
  const [data, setData] = useState(currentSemesters)
  const [stuff, setStuff] = useState("The app hasn't re-rendred")
  useEffect(() => {
    setTimeout(() => {
      setStuff('The app has re-rendered')
    }, 2000)
    // getCurrentUser(auth)
    //   .then(user => {
    //     if (localStorage.getItem(user.uid)) {
    //       setData(JSON.parse(localStorage.getItem(user.uid)).data.currentLevel)
    //     }
    //     else {
    //       db.collection('users')
    //       .doc(user.uid).get()
    //         .then(res => setData(res.data()[user.uid].data))
    //     }
    //   })
  })


  const objects = data.map(semester => {
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
      {/* <h1>{stuff} </h1> */}
      {objects}
    </main>
  )
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);