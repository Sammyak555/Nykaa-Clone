import { Table, TableCaption, TableContainer, Tbody,Icon, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import { HiOutlineHome } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../Components/Navbar'
import "../css/users.css"
import Singleuser from './Singleuser'
import { NavLink } from 'react-router-dom'
import Loading from '../../Pages/Loading'

const Users = () => {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [data,setData]= useState([])
  const [change,setChange] = useState(false)
  const [page,setPage] = useState(1)

  const getusers = (page) => {
    setLoading(true)
    return axios.get(`https://fair-pear-salmon-suit.cyclic.app/users`,{
      params:{
        _limit:4,
        _page:page
      }
    })
      .then((res) => {
        setTimeout(() => {
          setLoading(false)
          setData(res.data)
          }, 1500)})
      .then((err) => {
        setError(true)
        console.log(err)})
  }
  useEffect(()=>{
    getusers(page)
    setChange(change)
  },[change,page])

  const changingpage=()=>{
    setChange(!change)
  }

// IoIosArrowForward
  return (
    <div>                            
      <Navbar />
      <div className='page-heading'><NavLink to={'/admin/panel'}><Icon color={'green'} as={HiOutlineHome} w={6} h={6} /><Icon as={IoIosArrowForward} w={6} h={6} /></NavLink><h3 style={{marginTop:"1.5px"}}>ＵＳＥＲＳ   ＭＡＮＡＧＥＭＥＮＴ</h3></div>
      <div className='user-table'>
      <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
      <Th>sr.no.</Th>
        <Th>id</Th>
        <Th>name</Th>
        <Th>block user</Th>
        <Th>delete user</Th>
      </Tr>
    </Thead>
    <Tbody>
      {loading ? <div className='loading-ind-users'><Loading /></div>:
        data.length>0&&
        data.map((el,index)=>{
          return<Singleuser key={Math.random()*100+Date.now()} {...el} index={index}  />
        })
      }
     
    </Tbody>
  </Table>
</TableContainer>
<button style={{backgroundColor:"grey",color:"white"}} onClick={()=>setPage(page-1)}>Prev</button>
            <button>{page}</button>
            <button style={{backgroundColor:"grey",color:"white"}} onClick={()=>setPage(page+1)}>Next</button>
      </div>
      </div>
  )
}

export default Users