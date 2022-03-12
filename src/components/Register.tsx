import { useState } from 'react'
import React, { FC } from 'react';
import axios from 'axios';
import {AuthContext} from '../context/AuthProvider';
import { useContext } from 'react';



interface RegisterProps { }
const Register: FC<RegisterProps> = () => {
    const[userName, setUserName] = useState<string>();
    const[password, setPassword] = useState<string>();
    const[firstName, setFirstName] = useState<string>();
    const[lastName, setLastName] = useState<string>();
    const[salary, setSalary] = useState<string>();
    const[gender, setGender] = useState<string>();
    const[dateOfEmployment, setDateOfEmployment] = useState<string>();
    const[dateOfBirth, setDateOfBirth] = useState<string>();
    const { authToken } = useContext(AuthContext); 


  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    
    /*
    
      if (!userName) {
      alert('Login field empty')
      return
    }
    if (!password) {
      alert('Password field empty')
      return
    }
    if (!firstName) {
      alert('First name field empty')
      return
    }
    if (!lastName) {
        alert('Last name field empty')
        return
    }
    if (!salary) {
        alert('Salary field empty')
        return
    }
    if (!gender) {
        alert('Gender field empty')
        return
    }
    if (!dateOfEmployment) {
        alert('Date of employment field empty')
        return
    }
    if (!dateOfBirth) {
        alert('Datw of birth field empty')
        return
    }
      */
    


    var isoDateEmployment = new Date('December 15, 2000 03:24:00').toISOString();
    var isoDateBirth = new Date('December 17, 1995 03:24:00').toISOString();
    
    axios.post('https://bank-app-pcafe-stage.herokuapp.com/api/Employee/create', { userName: userName, password: password, firstName: firstName, lastName: lastName, salary: salary, gender: gender, dateOfEmployment: isoDateEmployment, dateOfBirth: isoDateBirth}, { withCredentials: true, headers: {
      'Content-Type': 'application/json',
        "Authorization": "Bearer " + authToken
    } }).then((response) => {
      //const accessToken = response.data.jwtToken;
      console.log(response);
 
   
    });

    
  
    setUserName('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setSalary('')
    setGender('')
    setDateOfEmployment('')
    setDateOfBirth('')
  }


  return(
    <form onSubmit={onSubmit}>
          <label htmlFor="userName">
              <input id="userName"
                value={userName}
                type="text"
                placeholder="userName"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={(e) => setUserName(e.target.value)}
              />
              </label>
              <label htmlFor="password">
              <input id="password"
                value={password}
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword(e.target.value)}
              />
          </label>
          <label htmlFor="firstName">
              <input id="firstName"
                value={firstName}
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => setFirstName(e.target.value)}
              />
          </label>
          <label htmlFor="lastName">
              <input id="lastName"
                value={lastName}
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => setLastName(e.target.value)}
              />
          </label>
          <label htmlFor="salary">
              <input id="salary"
                value={salary}
                type="text"
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}
                onBlur={(e) => setSalary(e.target.value)}
              />
          </label>
          <label htmlFor="gender">
              <input id="gender"
                value={gender}
                type="text"
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
                onBlur={(e) => setGender(e.target.value)}
              />
          </label>
          <label htmlFor="dateOfEmployment">
              <input id="dateOfEmployment"
                value={dateOfEmployment}
                type="date"
                onChange={(e) => setDateOfEmployment(e.target.value)}
                onBlur={(e) => setDateOfEmployment(e.target.value)}
              />
          </label>
          <label htmlFor="dateOfBirth">
              <input id="dateOfBirth"
                value={dateOfBirth}
                type="date"
                onChange={(e) => setDateOfEmployment(e.target.value)}
                onBlur={(e) => setDateOfEmployment(e.target.value)}
              />
          </label>
          
         
          <button>Submit</button>
      </form>


  );
}

export default Register;