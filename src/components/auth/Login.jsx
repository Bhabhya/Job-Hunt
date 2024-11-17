import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group';
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading,setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const {loading,user}=useSelector(store=>store.auth)

    const navigate=useNavigate()
    const dispatch =useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler=async(e)=>{
        e.preventDefault()

       

        try {
            dispatch(setLoading(true))

            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true,
            });
            if(res.data.success){
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'An unknown error occurred';
            toast.error(errorMessage);
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    return (
        <div>
            <Navbar></Navbar>

            <div className='flex items-center justify-center max-w-7xl mx-auto'>

                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>

                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            placeholder="patel@gmail.com"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="text"
                            placeholder="patel"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex items-center justify-between' >

                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                            <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role === 'student'}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                            <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    className="cursor-pointer"
                                    onChange={changeEventHandler}
                                    checked={input.role === 'recruiter'}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        

                    </div>
                    {
                        loading?<Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'></Loader2>Please wait</Button>:
                        <Button type="submit" className="w-full my-4">Login</Button>
                    }

                    
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>signup</Link></span>
                </form>


            </div>
        </div>
    )
}

export default Login