import { getDoc } from 'firebase/firestore'
import { db } from '@/service/FirebaseConfig'
import { doc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'sonner'
import InfoSection from '../../view-trip/components/InfoSection'
import Hotel from '../components/Hotel'
import DayPlan from '../components/DayPlan'

const ViewTrip = () => {

    const {tripid} =useParams()
    const [Trip, setTrip] = useState([])

    useEffect(() => {

        tripid&&GetTripData()
      
    }, [tripid])
    

   const GetTripData = async()=>{
    const decRef =doc(db,'AiTrip' ,tripid )
    const docSnap = await getDoc(decRef)
    if(docSnap.exists()){
        console.log(docSnap.data())
        setTrip(docSnap.data())
    }else{
        console.log("No such document")
        toast("No Trip found")
    }
   }

  return (
    <div className='px-2 md:px-44 sm:px-10 pt-10'>
 
 {/* (tripInfo) */}

 <InfoSection tripInfo={Trip} />


 {/* HotelInfo */}

<Hotel trip={Trip} />

 {/* on day plan */}

 <div  >
 <DayPlan trip={Trip}/>
 </div>



    </div>
  )
}

export default ViewTrip