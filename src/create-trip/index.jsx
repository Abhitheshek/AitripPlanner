
import { AI_PROMPT, budgetOptions, travelCompanions } from '@/_data/CardData';
import LocationSearch from '@/components/custom/LocationSearch';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/service/AiModel';
import React, { useState } from 'react';
import { toast } from "sonner"
import { FcGoogle } from "react-icons/fc";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router';



const Index = () => {
    const [formData, setFormData] = useState({
        location: null,
        days: '',
        budget: '',
        companions: ''
    });

    const [openDialog, setopenDialog] = useState(false)

    const [loading, setloading] = useState(false)

    const navigate = useNavigate();

    const handledata = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
    //         // const response = await fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {
    //         //     headers: {
    //         //         Authorization: `Bearer ${tokenResponse.access_token}`,
    //         //     },
    //         // });

    //         // const data = await response.json();
    //         // localStorage.setItem('user', JSON.stringify(data))
    //         // setopenDialog(false)
            GetUserProfile(tokenResponse);
        },
        onError: (errorResponse) => console.log(errorResponse),

    })

    // console.log('Final Form Data:', formData);

    const handleGenerateTrip = async () => {

       try{
        const user = localStorage.getItem('user')
        if (!user) {
            setopenDialog(true)
            return
        }

        if (formData?.days > 5) {
            toast("Please make your trip in b/w 1 to 5 days")
            return
        }
        if (!formData?.location) {
            toast("Please select your destination")
            return
        }
        if (!formData?.budget) {
            toast("Please select your budget")
            return
        }
        if (!formData?.companions) {
            toast("Please select your companions")
            return
        }


        setloading(true)

        const FINAL_PROMPT = AI_PROMPT.replace('{LOCATION}', formData?.location.name).replace('{DAYS}', formData?.days).replace('{TRAVELER}', formData?.companions).replace('{BUGETS}', formData?.budget)

        console.log('Final Prompt:', FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT)

        console.log(result?.response?.text())

        setloading(false)

        SaveAitrip(result?.response?.text())
    } catch (error) {
        setloading(false);
        
        if (error.message.includes('503') || error.message.includes('overloaded')) {
            toast("The AI service is currently busy. Please try again in a few moments.");
        } else {
            toast("An error occurred while generating your trip. Please try again.");
        }
        console.error('Trip generation error:', error);
    }


    };


    // saving data in the firebase 
    const SaveAitrip = async (tripData) => {
        setloading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const docId = Date.now().toString();
            const parsedTripData = JSON.parse(tripData);
            
            await setDoc(doc(db, 'AiTrip', docId), {
                userselection: formData,
                tripData: parsedTripData,
                userEmail: user?.email,
                docId: docId
            });
            
            setloading(false);
            navigate('/view-trip/' + docId);
        } catch (error) {
            console.error(error);
            toast("Something went wrong");
            setloading(false);
        }
    };
    

    const GetUserProfile = (tokeninfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token} `,
            {
                headers: {
                    Authorization: `Bearer ${tokeninfo?.access_token}`,
                    Accept: 'application/json',
                }
            }).then((res) => {
                console.log(res)
                localStorage.setItem('user', JSON.stringify(res?.data))
                setopenDialog(false)
                handleGenerateTrip()
            })
    }


    return (
        <div className='md:px-56 sm:px-16 flex flex-col md:gap-16 gap-6 py-10 px-10'>
            <div>
                <h1 className='md:text-3xl text-lg font-bold'>Tell us your travel preferences</h1>
                <p className='md:text-lg text-xs text-gray-400'>
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>

            <div>
                <h2 className='md:text-xl text-lg md:mb-4 mb-2 font-bold'>What is your destination of choice</h2>
                <LocationSearch handledata={handledata} />
            </div>

            <div>
                <h2 className='md:text-xl text-lg md:mb-4 md-2 font-bold'>How many days are you planning your trip?</h2>
                <input
                    className='w-full rounded-md p-2 shadow-md border'
                    type="number"
                    placeholder='Ex.2'
                    value={formData.days}
                    onChange={(e) => handledata('days', e.target.value)}
                />
            </div>

            <div>
                <h2 className='md:text-xl text-lg font-bold md:mb-4 mb-2'>What is your Budget?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
                    {budgetOptions.map((item, key) => (
                        <div
                            key={key}
                            className={`border p-6 shadow-md rounded-lg cursor-pointer ${formData.budget === item.title && 'border-blue-500 bg-blue-50 shadow-lg'
                                }`}
                            onClick={() => handledata('budget', item.title)}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h3 className='text-xl font-bold'>{item.title}</h3>
                            <p className='text-gray-500'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl font-bold mb-4'>Who do you plan on travelling with on your next adventure?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {travelCompanions.map((item, key) => (
                        <div
                            key={key}
                            className={`border p-6 shadow-md rounded-lg cursor-pointer ${formData.companions === item.title && 'border-blue-500 bg-blue-50 shadow-lg'
                                }`}
                            onClick={() => handledata('companions', item.title)}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h3 className='text-xl font-bold'>{item.title}</h3>
                            <p className='text-gray-500'>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-end'>
                <Button
                    disabled={loading}
                    className='px-8 py-2 '
                    onClick={handleGenerateTrip}
                >
                    {loading ? <AiOutlineLoading3Quarters className='animate-spin mr-2 h-7 w-7' /> :
                        'Generate Trip'}

                </Button>
            </div>

            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>

                        <DialogDescription>

                            <img src="/logo.svg" alt="logo" />
                            <h2 className='text-lg font-bold mt-7'>Sign in with google</h2>
                            <p>sign in to the app with google authenthication securly</p>
                            <Button
                                onClick={login}
                                className='w-full mt-5 flex gap-4 items-center'>
                                <FcGoogle className=' h-7 w-7 font-black' />
                                Sign in with Google</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div>


    );
};

export default Index;
