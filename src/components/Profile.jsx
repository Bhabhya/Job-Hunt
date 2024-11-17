import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs()
    //const skills=["Html","Css","Javascript","Reactjs"]//
    const isResume=true
    const[open,setOpen]=useState(false)
    const{user}=useSelector(store=>store.auth)
  return (
    <div>
      <Navbar></Navbar>
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
      <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
      <Avatar className='h-24 w-24'>
      <AvatarImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJ0T0pY3mW6mMgUMzRF1XSdbpQJYGZNDkoA&s'></AvatarImage>

      </Avatar>
      <div>
        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
        <p>{user?.profile?.bio}</p>
      </div>

      </div>
<Button className='text-right' variant='outline' onClick={()=>setOpen(true)}><Pen></Pen></Button>
      </div>

      <div className='my-5'>

        <div className='flex items-center gap-3 my-2'>
        <Mail></Mail>
        <span>{user?.email}</span>
        </div>

        <div className='flex items-center gap-3 my-2'>
        <Contact></Contact>
        <span>{user?.phoneNumber}</span>

        </div>
      </div>

      <div className='my-5'>
        <h1>Skills</h1>
        <div className='flex items-center gap-1'>
        {
            user?.profile?.skills.length!=0?user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>):<span>NA</span>
        }
        </div>
       
      </div>

      <div className='grid w-full max-w-sm item-center gap-1.5'>
      <Label className='text-md font-bold'>Resume</Label>
      {
        isResume?<a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
      }
      </div>

      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
      <h1 className='font-bold text-lg my-5'>Applied jobs</h1>
      <AppliedJobTable></AppliedJobTable>

      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}></UpdateProfileDialog>
    </div>
  )
}

export default Profile
