import { getPixabayImage } from "@/service/GlobleApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Itinerary = ({ trip }) => {

    const defaultImage = "/trip2jpg"


    return (
        <div className="container  py-6">
            <h1 className="text-3xl font-extrabold text-center mb-6 underline ">Travel Itinerary</h1>
            {trip?.tripData?.itinerary.map((dayPlan, index) => (
                <div
                    key={index}
                    className="mb-8  rounded-lg  p-3"
                >
                    <h2 className="text-2xl font-bold underline  mb-4 capitalize">
                        {dayPlan.day}
                    </h2>
                    <p className=" text-orange-500 mb-6">
                        <strong>Best Time to Visit:</strong> {dayPlan.bestTimeToVisit}
                    </p>
                    <div className=" grid grid-cols-1 md:grid-cols-2  gap-6">



                        {dayPlan.plan.map((place, idx) => {

                            const [img, setimg] = useState()



                            useEffect(() => {
                                trip && displayImage()

                            }, [trip])


                            const displayImage = async () => {
                                const name = place.placeName;
                                try {
                                    const imageUrl = await getPixabayImage(name);
                                    console.log("Generated Image URL:", imageUrl);
                                    setimg(imageUrl)

                                } catch (error) {
                                    console.error("Failed to generate image:", error);
                                }
                            };

                            return (



                               <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName}>
                              
                               <div
                                    key={idx}
                                    className=" grid md:grid-flow-col md:h-72 gap-2   border rounded-lg overflow-hidden shadow-xl  p-4 hover:scale-105 transition-all hover:shadow-xl bg-gray-50"
                                >
                                    <div className=" bg-white p-2 border rounded-lg shadow-lg ">
                                    <img
                                        src={img?img:'/trip2.jpg'}
                                        alt={place.placeName}
                                        className="w-full h-40 object-cover rounded-lg mb-2"
                                    />
                                      <p className="text-sm text-yellow-500  mb-1">
                                            <strong>Rating:</strong> {place.rating}⭐
                                        </p>
                                        <p className="text-sm text-blue-500  mb-1 line-clamp-1">
                                            <strong className="text-xl">🎟️</strong> {place.ticketPricing}
                                        </p>
                                    
                                    </div>
                                    
                                    <div className="p-4 border shadow-lg rounded-lg bg-white">

                                    <h3 className="text-lg font-bold  mb-2">
                                            {place.placeName}
                                        </h3>
                                        
                                        <p className="text-gray-600 mb-2 line-clamp-3 ">{place.placeDetails}</p>
                                      
                                        <p className="text-sm  mb-1 text-green-500 line-clamp-1">
                                            <strong>Opening ⏰:</strong> {place.openingTime}
                                        </p>
                                        <p className="text-sm  mb-1 text-red-500 line-clamp-1">
                                            <strong>Closing ⏰:</strong> {place.closingTime}
                                        </p>
                                        <p className="text-sm  mb-1 line-clamp-2">
                                            <strong>Travel Time:</strong> {place.travelTime}
                                        </p>
                                    </div>
                                </div>
                               
                               </Link>

                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Itinerary;
