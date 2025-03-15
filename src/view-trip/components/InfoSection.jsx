import {  getPixabayImage } from '@/service/GlobleApi'
import React, { useEffect, useState } from 'react'

const InfoSection = ({ tripInfo }) => {

    const [img, setimg] = useState()
    


    useEffect(() => {
        tripInfo&& displayImage()
     
    }, [tripInfo])
    

    const displayImage = async () => {
        const name = tripInfo?.userselection?.location?.name;
        try {
            const imageUrl = await getPixabayImage(name);
            console.log("Generated Image URL:", imageUrl);
            setimg(imageUrl)
            
        } catch (error) {
            console.error("Failed to generate image:", error);
        }
    };
    
   
    

    return (
        <div>
            <img className='w-full h-[350px] rounded-lg object-cover' src={img} alt="trip image" />
            <h2 className=' sm:text-xl text-lg md:text-2xl font-extrabold my-3'>{tripInfo?.userselection?.location?.name} </h2>
            <div className='flex md:gap-5 gap-2'>
                <h2 className='px-3 py-2 font-bold bg-slate-200 rounded-xl text-xs md:text-base text-center text-blue-500'>📅{tripInfo?.tripData?.duration} </h2>
                <h2 className='px-3 py-2 font-bold bg-slate-200 rounded-xl text-xs md:text-base text-center text-green-500'>💰{tripInfo?.userselection?.budget} budget </h2>
                <h2 className='px-3 py-2 font-bold bg-slate-200 rounded-xl text-xs md:text-base text-center text-red-500'>🍹travelers:{tripInfo?.userselection?.companions} </h2>
            </div>

        </div>
    )
}

export default InfoSection