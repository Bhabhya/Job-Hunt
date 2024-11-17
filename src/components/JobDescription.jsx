import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setsingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const JobDescription = () => {
    
    const { id: jobId } = useParams(); // Destructure params for cleaner code
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.application?.some(application=>application.applicant==user?._id)||false;
    const[isApplied,setisApplied]=useState(isIntiallyApplied)

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log("Response Data:", res.data);  // Log the entire response
            
            if (res.data.success) {
                
                setisApplied(true)
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setsingleJob(updatedSingleJob));
                toast.success(res.data.message);
            } else {
                // If the response doesn't contain `success: true`, show an error message
                toast.error("Application failed. Please try again.");
            }
        } catch (error) {
            console.log("Error:", error); // Log the full error
            toast.error(error.response?.data?.message);
        }
    }
    

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setsingleJob(res.data.job));
                    setisApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title || 'Loading...'}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant='ghost'>
                            {singleJob?.position || 'N/A'} Positions
                        </Badge>
                        <Badge className='text-[#F83802] font-bold' variant='ghost'>
                            {singleJob?.jobType || 'N/A'}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold' variant='ghost'>
                            {singleJob?.salary || 'N/A'} LPA
                        </Badge>
                    </div>
                </div>

                <Button onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border b-gray-300 font-medium py-4'>Job Description</h1>
            <div>
                <h1 className='font-bold my-1'>
                    Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title || 'N/A'}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location || 'N/A'}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description || 'N/A'}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel || 'N/A'}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary || 'N/A'} LPA</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length || 'N/A'}</span>
                </h1>
                <h1 className='font-bold my-1'>
                    Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split('T')[0] || 'N/A'}</span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;