

import { listviewDeleteHomestay,listViewUpdateStatus} from '@/actions/homestay';
import PaginatedTable from '../_components/ListView';
const project = {
  isUrbanOrRular: 1,
  isPrivateOrGovt: 1,
  isNormalOrHeritage:1,
  state:1,
  district:1,
  constituency:1,
  address: 1,
  homestayName: 1,
  manager: 1,
  isRegistredWithDot:1,
  isRegisteredWithLocal:1,
  contact: 1,
  email: 1,

  isStatus: 1,

}


const ListView  = async () => {
  const type = {
    district: '',
    registration: '',
    type: '',
    gender: '',
}
  
  const fetchData = async(query={})=>{

    let result=[]
    try {
      //setIsLoading(true)
      //setModelStatus(true)
      let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/search`
      const pageSize = 5
      
      const input = {
        "query":query,
        "project":project

      }
      let res = await fetch(url,{
          method:'POST',
          cache:'no-cache',
          header:{
          "Content-Type":"application/json"
          },
          body:JSON.stringify(input)
      });
      if(res.status==200){
        result = await res.json()
        result = await result
        //setModelStatus(false)
        return result
        //setOrgResults(result)
      }else{
        console.log('Error in api')
      }
    } catch (error) {
      console.log("eRROR IN BUTTON CLICK ",error)
    }finally{
      //setModelStatus(false)
    }
    return result
  }
  const data = await fetchData()
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
    <div className='pt-4 pb-2'>
      <PaginatedTable inputData = {modData} handleUpdate={listViewUpdateStatus} handleDelete={listviewDeleteHomestay}/>
    </div>
    );
}

export default ListView