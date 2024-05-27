
import { allHomestayDataForListView, listViewUpdateStatus, listviewDeleteHomestay } from '@/actions/homestay';
import React from 'react'
import SearchOption from './SearchOption';

const ListView = async () => {
    
  
  let data = await allHomestayDataForListView()
  data = await data.result
  const modData = await data.map((homestay,index)=>{
        //console.log('Homestay - ',homestay)
        let type = homestay.isUrbanOrRular[0] + '^'+ homestay.isPrivateOrGovt[0] + "^"+homestay.isNormalOrHeritage[0]
        let register = homestay.isRegistredWithDot + '^' +  homestay.isRegisteredWithLocal
        homestay.type = type
        homestay.register = register
        homestay.statuswithid = homestay._id+"^"+homestay.isStatus
        homestay.identity = homestay.homestayName + '^'+homestay.manager+'^'+homestay.contact+'^'+homestay.email
        homestay.location = homestay.address+ '^'+homestay.constituency+ '^'+homestay.district
        return homestay
      }
  )
  
  return (

    <div>
        {
         <SearchOption orgData={modData} handleUpdate={listViewUpdateStatus} handleDelete={listviewDeleteHomestay}/> 
        }
    </div>
  )
}

export default ListView