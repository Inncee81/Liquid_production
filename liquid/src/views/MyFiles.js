import React from 'react';
import MyTable from '../components/myTable';

const MyFiles = () => {
    return (
        <>
        <h1>My Files</h1>
        <MyTable tag={'liquidapp'} profile={true}/>
      </>
    )
}



export default MyFiles;