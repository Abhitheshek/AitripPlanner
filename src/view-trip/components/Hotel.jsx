import { getPixabayImage } from '@/service/GlobleApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

const Hotel = ({ trip }) => {


    return (
        <div className='my-4'>
            <h2 className='text-2xl font-extrabold'>Hotel Recommendation</h2>

            <div className='flex flex-row items-center justify-center flex-wrap gap-4  '>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => {

                    const [img, setimg] = useState()



                    useEffect(() => {
                        trip && displayImage()

                    }, [trip])


                    const displayImage = async () => {
                        const name = hotel.hotelName;
                        try {
                            const imageUrl = await getPixabayImage(name);
                            console.log("Generated Image URL:", imageUrl);
                            setimg(imageUrl)

                        } catch (error) {
                            console.error("Failed to generate image:", error);
                        }
                    };
                    return (
                        <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName}>
                            <div key={index} className='mt-4 px-3 pt-3 pb-5 shadow-lg border rounded-xl w-72 hover:scale-105 transition-all hover:shadow-xl'>
                                <img className='rounded-xl h-56 w-72' src={img} alt="" />
                                <h3 className='text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap mt-3'>{hotel.hotelName}</h3>
                                <p className='text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap mt-3'>📍{hotel.hotelAddress}</p>
                                <p className=' overflow-hidden text-ellipsis whitespace-nowrap text-green-500 mt-3 font-bold'>💸{hotel.price}</p>
                                <p className=' text-yellow-500 mt-3 font-bold'>⭐{hotel.rating} Stars</p>
                            </div>
                        </Link>

                    )
                })
                }
            </div>




        </div>
    )
}

export default Hotel