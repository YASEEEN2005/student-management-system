import React from 'react'
import axios from 'axios'

function ManiDashboard() {

  const api = 'https://student-management-system-backend-sandy.vercel.app';

  async function getStudent() {
    try {
      const students = await axios.get(`${api}/student`);
      console.log(students.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button type='button' onClick={getStudent}>Click</button>
    </div>
  )
}

export default ManiDashboard;
