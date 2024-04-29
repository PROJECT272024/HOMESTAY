'use client'
import React, { useEffect,  useState} from 'react'
import {Spinner} from "@nextui-org/spinner";
import homeStay, { setBlockA, setBlockB, setBlockC, setBlockD, setBlockE, setBlockF, sethomeStay } from '@/app/model/HomeStayStructure';
import { district ,getConstituency} from '@/utils/district-constituency';
import HomeStayFromSelector from '@/app/homestay/_components/HomeStayFromSelector';
import RadioGroupTypeStyle from '@/components/formfields/RadioGroupTypeStyle'
import InputTextStyle from '@/components/formfields/InputTypeStyle';
import DropDownTypeStyle from '@/components/formfields/DropDownTypeStyle';
import TextBoxTypeStyle from '@/components/formfields/TextBoxTypeStyle';
import InputNumberTextStyle from '@/components/formfields/InputNumberTypeStyle';
import { useSession } from "next-auth/react"
import { toast } from 'react-toastify'
import { useRouter,useParams } from 'next/navigation';
import FileUploadStyle from '@/components/formfields/FileUploadStyle';
import DateInputTextStyle from '@/components/formfields/DateInputTypeStyle';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import WhiteModal from '@/components/WhiteModal';
import { createPublicId } from '@/utils/extras';
import { MdArrowBack,MdArrowForward  } from "react-icons/md";



const HomestayEditForm =  ({params}) => {
    const [feilds,setFeilds]=useState(homeStay)
    const [activeBlock,setActiveBlock] = useState(1)
    const [isChange, setIsChange] = useState(false)
    const qualification = ['Doctorate','Post Graduate','Graduate','Higher Secondary','Primary','Illiterate']
    const router = useRouter()
    const {id} = useParams()
    const { data: session, status } = useSession()
    const [modelStatus,setModelStatus]=useState(false)
    const [modelMessage,setModelMessage]=useState("")
    const [isImageChange,setImageChange]=useState(false)


    const [files,setFile] = useState(null)
    const [startLoading,setStartLoading]=useState(true)
    const [imageList,setImageList] = useState(null)


    const [selConstituency,setSelConstituency] = useState([])
    
    useEffect(()=>{ 

        const getData = async()=>{
            const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
            console.log('I am from useeffect getData ',url)
            try {
                console.log('Id value: ',id)
                const response = await fetch(url,{
                    mode: 'no-cors'
                })
                if(response.status==200){
                    const data= await response.json()
                    setSelConstituency(getConstituency(data.district)) 
                    setFeilds(()=>({
                            ...data,
                            'establishmentDate':data.establishmentDate ? new Date(data.establishmentDate).toISOString().split('T')[0]: '',
                            'renewDateDot': data.renewDateDot ? new Date(data.renewDateDot).toISOString().split('T')[0] : '',
                            'renewDateLocal': data.renewDateLocal ? new Date(data.renewDateLocal).toISOString().split('T')[0] : '',
                            ['agoda']:{
                                ...data['agoda'],
                                ['percentage']:data.agoda.percentage? data.agoda.percentage: ''
                              },
                            ['makeMyTrip']:{
                                ...data['makeMyTrip'],
                                ['percentage']:data.makeMyTrip.percentage? data.makeMyTrip.percentage: ''
                              },
                            ['airBnb']:{
                                ...data['airBnb'],
                                ['percentage']:data.airBnb.percentage? data.airBnb.percentage: ''
                              },
                            ['goIbibo']:{
                                ...data['goIbibo'],
                                ['percentage']:data.goIbibo.percentage? data.goIbibo.percentage: ''
                              },
                            'gender':data.gender
                              
                        }))
                    setImageList(feilds.homestayImages)  
                    setIsChange(true)        
                  }else{
                    console.log("I am here no data was fetched")
                    return null
                  }
            } catch (error) {
                console.log("There was error ",error)
            }finally{
                console.log("Fianlly done")
            }
        }
        
        getData()
    },[]);

    useEffect(()=>{
        if(isChange){
            let allBtn = [['isUrbanOrRular',feilds.isUrbanOrRular],['isPrivateOrGovt',feilds.isPrivateOrGovt],
                        ['isNormalOrHeritage',feilds.isNormalOrHeritage],['gender',feilds.gender],
                        ['isRegistredWithDot',feilds.isRegistredWithDot],['isRegisteredWithLocal',feilds.isRegisteredWithLocal],
                        ['transportation',feilds.transportation],
                        ['wasteDisposal.isYesorNo',feilds.wasteDisposal.isYesorNo],
                        ['drinkingWater.isYesorNo',feilds.drinkingWater.isYesorNo],
                        ['firstAid.isYesorNo',feilds.firstAid.isYesorNo],
                        ['ecoFriendly.isYesorNo',feilds.ecoFriendly.isYesorNo],
                        ['cleaning.isYesorNo',feilds.cleaning.isYesorNo],
                        ['makeMyTrip.isRegistered',feilds.makeMyTrip.isRegistered],
                        ['agoda.isRegistered',feilds.agoda.isRegistered],
                        ['airBnb.isRegistered',feilds.airBnb.isRegistered],
                        ['goIbibo.isRegistered',feilds.goIbibo.isRegistered],
                        ['isRecordMaintained',feilds.isRecordMaintained],
                        ['isManualorDigital',feilds.isManualorDigital],
                        ['isDigitalized',feilds.isDigitalized],
                        ['isAccountMaintained',feilds.isAccountMaintained],
                        ['isAccountDigital',feilds.isAccountDigital]
                    ]
            for(let i=0;i<allBtn.length;i++){
                let selBtn = document.getElementsByName(allBtn[i][0])
                for(let j=0;j<selBtn.length;j++){
                    if(selBtn[j].value==allBtn[i][1]){
                        selBtn[j].click()
                    }
                }
            }
        }
        setStartLoading(false)
    },[isChange]);
    useEffect(()=>{
        if(imageList){
            if(imageList[0]=='signature'){
                console.log("Did this triggered: ",imageList)
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    "signature":imageList[1],
                    "modifiedBy":session.user.email
                }))
            }else{
                console.log("Did this triggered ", imageList )
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'homestayImages':imageList[1],
                    ['modifiedBy']:session.user.email
                }))
            }
        }
        
    },[isImageChange])

    const handleSubmitSave= (e,i)=>{
        e.preventDefault()
        setActiveBlock(i)
    }

    const handleSelectFile = (e)=>{
        setFile(e.target.files)
    }
    const handleDeleteFileSignature = async (e)=>{
        e.preventDefault()
        setModelStatus(true)
        setModelMessage("Deleting Image")
        const fileName = feilds.signature
        try{
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email,
                ['signature']:'',
            }));
            console.log('Image to be deleted - - ',fileName)
            //const userData = sethomeStay(feilds)
            let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
            let res = await fetch(url,{
                method:'PUT',
                header:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "signature":""
                    })
            });
            
            if(res.status==201){
                url =  `${process.env.NEXT_PUBLIC_API_DOMAIN}api/upload/signature/del/`   
                let delFileId = createPublicId(fileName)
                res =  await fetch(url,{
                    method:'POST',
                    header:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify(
                        {"fileName":delFileId}
                    )
                });
                if(res.status==201){
                    //setImageChange(!isImageChange)

                    setError(false)
                    setErrorMessageList(()=>[])
                    toast.success('File Deleted Saved Successfully')
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['signature']:fileName,
                    }));
                    setError(true)
                    setErrorMessageList(()=>["Problem in Deleting File"])
                    toast.error('Problem in Deleting File')    
                }
   
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['signature']:fileName,
                }));
                setError(true)
                setErrorMessageList(()=>["Problem in Deleting File"])
                toast.error('Problem in Deleting File')
            }
            
        }catch(error){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['signature']:fileName,
            }));
            setError(true)
            setErrorMessageList(()=>['Problem in deleting files'])
            toast.error('Problem in deleting files Data')
            console.log(error)
        }finally{
            setModelStatus(false)
        }
    }
    const handleDeleteFile = async (e,i)=>{
        e.preventDefault()
        setModelStatus(true)
        setModelMessage("Deleting Image")
        let val = feilds.homestayImages
        const fileName = feilds.homestayImages[i]
        const oldVal=val
        val.splice(i,1)
        try{
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email,
                ['homestayImages']:val,
            }));
            console.log('Image to be deleted - ',i,' - ',fileName)
            //const userData = sethomeStay(feilds)
            let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
            let res = await fetch(url,{
                method:'PUT',
                header:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ['modifiedBy']:session.user.email,
                    ['homestayImages']:val
                })
            });
            
            if(res.status==201){
                url =  `${process.env.NEXT_PUBLIC_API_DOMAIN}api/upload/homestay/del/`   
                let delFileId = createPublicId(fileName)
                res =  await fetch(url,{
                    method:'POST',
                    header:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify(
                        {"fileName":delFileId}
                    )
                });
                if(res.status==201){
                    setError(false)
                    setErrorMessageList(()=>[])
                    toast.success('File Deleted Saved Successfully')
                    //setImageChange(!isImageChange)
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['homestayImages']:oldVal,
                    }));
                    setError(true)
                    setErrorMessageList(()=>["Problem in Deleting File"])
                    toast.error('Problem in Deleting File')    
                }
   
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['homestayImages']:oldVal,
                }));
                setError(true)
                setErrorMessageList(()=>["Problem in Deleting File"])
                toast.error('Problem in Deleting File')
            }
            
        }catch(error){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['homestayImages']:oldVal,
            }));
            setError(true)
            setErrorMessageList(()=>['Problem in deleting files'])
            toast.error('Problem in deleting files Data')
            console.log(error)
        }finally{
            setModelStatus(false)
        }
    }
    const handleHomestayFileSubmit = async (e)=>{
        e.preventDefault();
        try {
            setModelStatus(true)
            setModelMessage("Uploading Homestay images")
            if(!files){
                toast.warning("No file selected")
                return
            }
            const imageData = new FormData();
            const oldList=feilds.homestayImages
            const imgLength = oldList.length
            let checkImageCount=0
            for(let i=0;i<files.length;i++){
                if(i+imgLength>4) {
                    checkImageCount=1
                    break
                }
                imageData.append(files[i].name,files[i]);
                
            }
            if(checkImageCount==1){
                toast.warning('Only five images are allowed for homestay to upload');
                return;
            }
            let url = process.env.NEXT_PUBLIC_API_DOMAIN + 'api/upload/homestay'
            
            const res = await fetch(url,{
                method:"POST",
                body:imageData
            })
            if(res.status==201) {
                const responseData = await res.json()
                const returnedFile = responseData.fileName
                returnedFile.map((val,index)=>(
                    oldList.push(val)
                ));
                //const userData = sethomeStay(feilds)
                url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
                const res2 = await fetch(url,{
                    method:'PUT',
                    header:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        "homestayImages":oldList,
                        "modifiedBy":session.user.email
                    })
                });
                
                if(res2.status==201){
                    setError(false)
                    setErrorMessageList(()=>[])
                    toast.success('Data Updated Successfully')
                    setImageList(["homestayImages",oldList])
                    setImageChange(!isImageChange)
                    console.log('1. Returning after success')
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        'homestayImages':oldList
                        
                    }))
                    setError(true)
                    setErrorMessageList(()=>["Problem in Updating Data"])
                    toast.error('Problem in Updating Data')
                }
                
                toast.success('File Uploaded Sucessfully')
            }else {
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'homestayImages':oldList
                }))
                toast.error('Problem in File Upload')
            }
        } catch (error) {
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'homestayImages':oldList
            }))
            toast.error('Error in File Upload')
            console.log('2. Error in uploading',error)
        }finally{
            setModelStatus(false)
        }
    }

    const handleSignatureFileSubmit = async (e)=>{
        e.preventDefault();
        console.log('1. I am inside handle signature file submit ')
        console.log('2 ',files)
        try {
            setModelStatus(true)
            setModelMessage("Uploading Signature")
            if(!files){
                toast.warning("No file selected")
                return
            }
            const imageData = new FormData();
            
            imageData.append(files[0].name,files[0]);
                
            let url = process.env.NEXT_PUBLIC_API_DOMAIN+'api/upload/signature'
                     
            const res = await fetch(url,{
                method:"POST",
                body:imageData
            })
            console.log('4 Ok till here  ',url)
            if(res.status==201) {
                const responseData = await res.json()
                const fileName = responseData.fileName
                console.log('5. I am here SGFTER DATA IS SAVED SUCESSFULLY IN DATABASE')
                //const userData = sethomeStay(feilds)
                url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
                const res2 = await fetch(url,{
                    method:'PUT',
                    header:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        "signature":fileName,
                        "modifiedBy":session.user.email
                    })
                });
                
                if(res2.status==201){
                    console.log('6. File is loaded SUCESSFULLY')
                    setError(false)
                    setErrorMessageList(()=>[])
                    toast.success('Data Updated Successfully')
                    setImageList(["signature",fileName])
                    setImageChange(!isImageChange)
                }else{
                    console.log('7. I am here in error after file is loaded')
                    setError(true)
                    setErrorMessageList(()=>["Problem in Updating Data"])
                    toast.error('Problem in Updating Data')
                }
                toast.success('File Uploaded Sucessfully')
            }else {
                console.log('8. I am here in after DATA LOADING FAILED file is loaded')
                toast.error('Problem in File Upload')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error in File Upload') 
        }finally{
            setModelStatus(false)
        }
    }
    
    const handleAttractionTextChange = (e,i)=>{
            e.preventDefault()
            let valList = feilds.nearByAttraction
            let txtName = e.target.name
            if(txtName.startsWith('name')){
                valList[i].name=e.target.value 
            }else{
                let value = e.target.value
                let val = value.charCodeAt(value.length-1)
                if(val<48 || val>57){
                    e.preventDefault()
                    toast.warning('Only Digits are allowed')
                    return                    
                }
                valList[i].distance=value
            }
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'nearByAttraction':valList
            }
            ));
        }
    const handleBtnDelAttraction = (e,i)=>{
        e.preventDefault()
        let val = feilds.nearByAttraction
        val.splice(i,1)
        setFeilds((prevFeilds)=>({
            ...prevFeilds,
            'nearByAttraction':val
        }
        ));
    }

    const handleBtnAddAttraction = (e,i)=>{
        e.preventDefault()
        setFeilds((prevFeilds)=>({
            ...prevFeilds,
            'nearByAttraction':[...prevFeilds.nearByAttraction,{name:"",distance:""}]
        }
        ));
    }
    const handleChange = (e)=>{
        const {name,value} = e.target
        
        if(name.includes('.')){
          const [outerKey,innerKey] = name.split(".")
          setFeilds((prevFeilds)=>({
              ...prevFeilds,
              [outerKey]:{
                ...prevFeilds[outerKey],
                [innerKey]:value
              }            
          }));
        }else{
          setFeilds((prevFeilds)=>({
            ...prevFeilds,
            [name]:value
          }));
        }      
    };
    const handleTextNumberChange = (e)=>{
        let {name,value} = e.target
        
        let val = value.charCodeAt(value.length-1)
        if(val<48 || val>57){
            e.preventDefault()
            return
            
        }else if(name=='contact'){
            if(value.length>10){
                e.preventDefault()
                return
             }else{
                 setFeilds((prevFeilds)=>({
                     ...prevFeilds,
                     ['contact']:value
                 }));
             }
        }else if(name=='singleRoom'){
            
            
                if(feilds.doubleRoom!=''){
                    let countSingle = 0;
                    if(value!=''){
                        countSingle = Number.parseInt(value);
                    }
                    const countDouble =   Number.parseInt(feilds.doubleRoom);
                    const totalRooms = (countSingle+countDouble).toString();
                    const capacity = (countSingle+ (countDouble*2)).toString();
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['roomNumbers']:totalRooms,
                        ['carryingCapacity']:capacity,
                        ['singleRoom']:value
                    }));       
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['roomNumbers']:value,
                        ['carryingCapacity']:value,
                        ['singleRoom']:value
                    }));
                }
        }else if(name=='doubleRoom'){
            
                if(feilds.singleRoom!=''){
                    let countDouble = 0;
                    if(value!=''){
                        countDouble = Number.parseInt(value);
                    }       
                    const countSingle =   Number.parseInt(feilds.singleRoom);
                    const totalRooms = (countSingle+countDouble).toString();
                    const totalCapacity = (countSingle+(countDouble*2)).toString();
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['roomNumbers']:totalRooms,
                        ['carryingCapacity']:totalCapacity,
                        ['doubleRoom']:value
                    }));       
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['roomNumbers']:value,
                        ['carryingCapacity']:(Number.parseInt(value) * 2).toString(),
                        ['doubleRoom']:value
                    }));
                }
        }else if(name=='trainedStaff'){
            const countLocal = Number.parseInt(feilds.localStaff)
            const countOther = Number.parseInt(feilds.otherStaff)
            
            let countTrained = 0
            if(value!=""){
                countTrained=Number.parseInt(value)
            }
            const total = countLocal+countOther
            if(total<countTrained){
                e.preventDefault()
                toast.warning("Trained Staff Cannot be greater than total Staff")
                return
            }else{

                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['nontrainedStaff']:(total-countTrained).toString(),
                    ['trainedStaff']:value
                }));
            }
        }else if(name=='makeMyTrip.percentage'){
            let  percentage = 0 
            
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['makeMyTrip']:{
                        ...prevFeilds["makeMyTrip"],
                        ["percentage"]:value
                    }            
                }));
            }
        }else if(name=='agoda.percentage'){
            let  percentage = 0 
            
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['agoda']:{
                        ...prevFeilds["agoda"],
                        ["percentage"]:value
                    }            
                }));
            }
        }else if(name=='airBnb.percentage'){
            let  percentage = 0 
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['airBnb']:{
                        ...prevFeilds["airBnb"],
                        ["percentage"]:value
                    }            
                }));
            }
        }else if(name=='goIbibo.percentage'){
            let  percentage = 0 
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['goIbibo']:{
                        ...prevFeilds["goIbibo"],
                        ["percentage"]:value
                    }            
                }));
            }
        }else if(name=='occupancyInPeak'){
            let  percentage = 0 
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['occupancyInPeak']:value
                }));
            }
        }else if(name=='occupancyInLean'){
            let  percentage = 0 
            if(value!=""){
                percentage=Number.parseInt(value)
            }
            if(percentage>100){
                e.preventDefault()
                toast.warning("Percentage cannot be greater than 100")
                return
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['occupancyInLean']:value
                }));
            }
        }else if(name=='touristInYear'){
            if(feilds.domesticTourist!=''){
                let countTotal = 0;
                if(value!=''){
                    countTotal = Number.parseInt(value);
                }       
                const countDomestic =   Number.parseInt(feilds.domesticTourist);
                const foreignTourist = (countTotal-countDomestic).toString();
                if(foreignTourist<0){
                    e.preventDefault()
                    toast.warning("Domestic Visitor cannot be larger than total number of visitor")
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['foreignTourist']:"",
                        ['touristInYear']:value
                    }));
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['foreignTourist']:foreignTourist,
                        ['touristInYear']:value
                    }));
                }
                       
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['foreignTourist']:value,
                    ['touristInYear']:value
                }));
            }
        }else if(name=='domesticTourist'){
            if(feilds.touristInYear!=''){
                let countDomestic = 0;
                if(value!=''){
                    countDomestic = Number.parseInt(value);
                }       
                const countTotal =   Number.parseInt(feilds.touristInYear);
                const foreignTourist = (countTotal-countDomestic).toString();
                if(foreignTourist<0){
                    e.preventDefault()
                    toast.warning("Domestic Visitor cannot be larger than total number of visitor")
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['foreignTourist']:"",
                        ['domesticTourist']:value
                    }));    
                }else{
                    setFeilds((prevFeilds)=>({
                        ...prevFeilds,
                        ['foreignTourist']:foreignTourist,
                        ['domesticTourist']:value
                    }));
                }
                       
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['foreignTourist']:value,
                    ['domesticTourist']:value
                }));
            }
        }else{

            if(name.includes('.')){
                const [outerKey,innerKey] = name.split(".")
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    [outerKey]:{
                        ...prevFeilds[outerKey],
                        [innerKey]:value
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    [name]:value
                }));
            }
        }
              
    };
    const handleRadioChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value ; 
        if(name=='isRegistredWithDot'){
            if(value=='Yes'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegistredWithDot':value,
                    'registrationNumberDot':'',
                    'establishmentDate':'',
                    'renewDateDot':''
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegistredWithDot':value                    
                }));
            }
        }else if(name=='isRegisteredWithLocal'){
            if(value=='Yes'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegisteredWithLocal':value,
                    'registrationLocal':'',
                    'renewDateLocal':''
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegisteredWithLocal':value
                }));
            }
        }else if(name=='makeMyTrip.isRegistered'){
            if(value=='No'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['makeMyTrip']:{
                      ['isRegistered']:value,
                      ['percentage']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['makeMyTrip']:{
                        ...prevFeilds['makeMyTrip'],
                        ['isRegistered']:value
                    }            
                }));
            }
        }else if(name=='agoda.isRegistered'){
            if(value=='No'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['agoda']:{
                      ['isRegistered']:value,
                      ['percentage']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['agoda']:{
                        ...prevFeilds['agoda'],
                        ['isRegistered']:value
                    }            
                }));
            }
        }else if(name=='airBnb.isRegistered'){
            if(value=='No'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['airBnb']:{
                      ['isRegistered']:value,
                      ['percentage']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['airBnb']:{
                        ...prevFeilds['airBnb'],
                        ['isRegistered']:value
                    }            
                }));
            }
        }else if(name=='goIbibo.isRegistered'){
            if(value=='No'){
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['goIbibo']:{
                      ['isRegistered']:value,
                      ['percentage']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['goIbibo']:{
                        ...prevFeilds['goIbibo'],
                        ['isRegistered']:value
                    }            
                }));
            }
        }else if(name=='wasteDisposal.isYesorNo'){
            if(value=='No'){ 
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['wasteDisposal']:{
                      ['isYesorNo']:value,
                      ['description']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['wasteDisposal']:{
                        ...prevFeilds['wasteDisposal'],
                        ['isYesorNo']:value
                    }            
                }));
            }
        }else if(name=='drinkingWater.isYesorNo'){
            if(value=='No'){ 
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['drinkingWater']:{
                      ['isYesorNo']:value,
                      ['description']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['drinkingWater']:{
                        ...prevFeilds['drinkingWater'],
                        ['isYesorNo']:value
                    }            
                }));
            }
        }else if(name=='firstAid.isYesorNo'){
            if(value=='No'){ 
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['firstAid']:{
                      ['isYesorNo']:value,
                      ['description']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['firstAid']:{
                        ...prevFeilds['firstAid'],
                        ['isYesorNo']:value
                    }            
                }));
            }
        }else if(name=='ecoFriendly.isYesorNo'){
            if(value=='No'){ 
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['ecoFriendly']:{
                      ['isYesorNo']:value,
                      ['description']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['ecoFriendly']:{
                        ...prevFeilds['ecoFriendly'],
                        ['isYesorNo']:value
                    }            
                }));
            }
        }else if(name=='cleaning.isYesorNo'){
            if(value=='No'){ 
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['cleaning']:{
                      ['isYesorNo']:value,
                      ['description']:''
                    }            
                }));
            }else{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['cleaning']:{
                        ...prevFeilds['cleaning'],
                        ['isYesorNo']:value
                    }            
                }));
            }
        }else if(name.includes('.')){
            const [outerKey,innerKey] = name.split(".")
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                [outerKey]:{
                  ...prevFeilds[outerKey],
                  [innerKey]:value
                }            
            }));
          }else{
            setFeilds((prevFeilds)=>({
              ...prevFeilds,
              [name]:value
            }));
          } 
        /*if(name=='isUrbanOrRular'){
            
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isUrbanOrRular':value
                }
            ));
        }else if(name=='isPrivateOrGovt'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isPrivateOrGovt':value
                }
            ));
        }else if(name=='isNormalOrHeritage'){
            setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isNormalOrHeritage':value
                }
            ));
        } else if(name=='gender'){
            
            setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'gender':value
                }
            ));
        } else if(name=='isRegistredWithDot'){
            console.log('is this called isregistredwithdor handler')
            setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegistredWithDot':value
                }
            ));
            
        } else if(name=='isRegisteredWithLocal'){
            setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    'isRegisteredWithLocal':value
                }
            ));
        }else if(name=='wasteDisposal.isYesorNo'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['wasteDisposal']:{
                  ...prevFeilds['wasteDisposal'],
                  ['isYesorNo']:value
                }            
            }));
        }else if(name=='drinkingWater.isYesorNo'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['drinkingWater']:{
                  ...prevFeilds['drinkingWater'],
                  ['isYesorNo']:value
                }            
            }));
        }else if(name=='firstAid.isYesorNo'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['firstAid']:{
                  ...prevFeilds['firstAid'],
                  ['isYesorNo']:value
                }            
            }));
        }else if(name=='ecoFriendly.isYesorNo'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['ecoFriendly']:{
                  ...prevFeilds['ecoFriendly'],
                  ['isYesorNo']:value
                }            
            }));
        }else if(name=='cleaning.isYesorNo'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['cleaning']:{
                  ...prevFeilds['cleaning'],
                  ['isYesorNo']:value
                }            
            }));
        }else if(name=='makeMyTrip.isRegistered'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['makeMyTrip']:{
                  ...prevFeilds['makeMyTrip'],
                  ['isRegistered']:value
                }            
            }));
        }else if(name=='agoda.isRegistered'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['agoda']:{
                  ...prevFeilds['agoda'],
                  ['isRegistered']:value
                }            
            }));
        }else if(name=='airBnb.isRegistered'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['airBnb']:{
                  ...prevFeilds['airBnb'],
                  ['isRegistered']:value
                }            
            }));
        
        }else if(name=='goIbibo.isRegistered'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['goIbibo']:{
                  ...prevFeilds['goIbibo'],
                  ['isRegistered']:value
                }            
            }));
        }else if(name=='isRecordMaintained'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isRecordMaintained':value
            }));
        }else if(name=='isManualorDigital'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isManualorDigital':value
            }));
        }else if(name=='isAccountMaintained'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isAccountMaintained':value
            }));
        }else if(name=='isDigitalized'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isDigitalized':value
            }));
        }else if(name=='isAccountDigital'){
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'isAccountDigital':value
            }));
        }*/

    }
    
    const [error,setError]=useState(false)
    const [errorMessageList,setErrorMessageList]=useState([])

    const handleSubmitBlockG = async(e)=>{
        e.preventDefault()
        setModelStatus(false)
        
        try{
            
            router.replace(`/homestay/${id}`)
            
            router.refresh()   
            toast.success('Homestay updated Successfully')             
            
        }catch(error){
            toast.error('Problem in Updating Data')
        }
        
    }
    
    const handleSubmitBlockA = async(e)=>{
        e.preventDefault()
        let message = []
        setModelStatus(true)
        setModelMessage("Updating Block A Data")
        
        if(feilds.constituency.trim()==""){
          message.push("Select Constituency")
        }
        if(feilds.villageOrTown.trim()==""){
          message.push("Enter Village or Town")
        }
        if(feilds.mcnpgpuward.trim()==""){
          message.push("Enter Municipal / Panchayat / GPU / Ward")
        }
        if(feilds.address.trim()==""){
          message.push("Enter Address")
        }
        if(message.length!=0){
          setError(true)
          setErrorMessageList(message)
          toast.error('Enter all require feilds') 
          setModelStatus(false)
        }else{
            
            try{
                setFeilds((prevFeilds)=>({
                    ...prevFeilds,
                    ['modifiedBy']:session.user.email
                }));
                const userData = setBlockA(feilds)
                let url = `${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`
                const res = await fetch(url,{
                    method:'PUT',
                    header:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify(userData)
                });
                
                if(res.status==201){
                    setError(false)
                    setErrorMessageList(()=>[])
                    toast.success('Data Updated Successfully')
                }else{
                    setError(true)
                    setErrorMessageList(()=>["Problem in Updating Data"])
                    toast.error('Problem in Updating Data')
                }
                
            }catch(error){
                setError(true)
                setErrorMessageList(()=>['Problem in updating'])
                toast.error('Problem in Updating Data')
            }finally{
                setModelStatus(false)
            }
        }
    }

    const handleSubmitBlockB = async (e)=>{
        e.preventDefault()
        
        let message = []
        setModelStatus(true)
        setModelMessage("Updating Block B Data")
        setError(false)
        e.preventDefault()
        if(feilds.homestayName.trim()==""){
          message.push("Enter HomeStay Name")
        }
        if(feilds.ownerName.trim()==""){
          message.push("Enter Owner Name")
        }
        if(feilds.manager.trim()==""){
          message.push("Enter Property Managed By")
        }
        if(feilds.address.trim()==""){
          message.push("Enter Address Location")
        }
        if(feilds.isRegistredWithDot=='Yes'){
            if(feilds.registrationNumberDot.trim()==""){
                message.push("Enter Registration Number")
            }
            if(feilds.renewDateDot.trim()==""){
                message.push("Enter Renewed upto")
            }
        }
        if(feilds.isRegisteredWithLocal=='Yes'){
            if(feilds.registrationLocal.trim()==""){
                message.push("Enter Registration Number")
            }
            
            if(feilds.renewDateLocal.trim()==""){
                message.push("Enter Renewed upto")
            }
        }
        
        if(feilds.singleRoom==""){
            message.push("Enter Single Room Number")
        }
        if(feilds.doubleRoom==""){
            message.push("Enter Double Room Number")
        }
        if(feilds.carryingCapacity==""){
            message.push("Enter Carrying Capacity Number")
        }
        if(feilds.localStaff==""){
            message.push("Enter Local Staff Number")
        }
        if(feilds.otherStaff==""){
            message.push("Enter Non Local Staff Number")
        }
        if(feilds.trainedStaff==""){
            message.push("Enter Trained Staff Number")
        }
        
        if(feilds.contact.trim()==""){
          message.push("Enter Mobile Phone Number")
        }
        if(message.length!=0){
          setError(true)
          setErrorMessageList(message)
          setModelStatus(false)
          toast.error("Provide input to all required feilds")
        }else{
          const userData = setBlockB(feilds)
          try {
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email
            }));
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`,{
              method:"PUT",
              header:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(userData)
            });
            
            
            if(res.status==201){
              setError(false)
              setErrorMessageList(()=>[])
              toast.success("Data Updated Sucessfully")
            }else{
                
              setError(true)
              setErrorMessageList(()=>["Problem in Updating data"])
              toast.error("Probelm in Updating Data")
            }  
          } catch (error) {
            setError(true)
            setErrorMessageList(()=>["Problem in Updating Data"])
            toast.error("Problem in Updating data")
          }finally{
            setModelStatus(false)
          }
        }
      }//end of block b

      const handleSubmitBlockC= async (e)=>{
        e.preventDefault()
        setModelStatus(true)
        setModelMessage("Updating Block C Data")
        try {
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email
            }));
            const userData = setBlockC(feilds)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`,{
                method:"PUT",
                header:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
              });
            if(res.status==201){
              setError(false)
              setErrorMessageList(()=>[])
              
              toast.success("Data updated Sucessfully")
            }else{
            setErrorMessageList(()=>["Problem in Updating Data"])
              setError(true)
              toast.error("Problem in Updating Data")
            }  
          } catch (errors) {
            setErrorMessageList(()=>["Problem in Updating Data"])
            setError(true)
            toast.error("Problem in updating Data")
          }finally{
            setModelStatus(false)
          }
      }
      const handleSubmitBlockD = async (e)=>{
        e.preventDefault()
        let message = []
        setModelStatus(true)
        setModelMessage("Updating Block D Data")        
        if(feilds.wasteDisposal.isYesorNo=="Yes" && 
            feilds.wasteDisposal.description.trim()==""){
          message.push("Enter Description related to Waste Disposal")
        }
        if(feilds.drinkingWater.isYesorNo=="Yes" && 
            feilds.drinkingWater.description.trim()==""){
          message.push("Enter Description related to Safe Water Drinking")
        }
        if(feilds.firstAid.isYesorNo=="Yes" && 
            feilds.firstAid.description.trim()==""){
          message.push("Enter Description related to Medical Facilities")
        }
        if(feilds.ecoFriendly.isYesorNo=="Yes" && 
            feilds.ecoFriendly.description.trim()==""){
          message.push("Enter Description related to Sustainable Development")
        }
        if(feilds.cleaning.isYesorNo=="Yes" && 
            feilds.cleaning.description.trim()==""){
          message.push("Enter Description related to Cleaniness")
        }
          
        if(message.length!=0){
          setError(true)
          setErrorMessageList(message)
          toast.error("Provide value to all required feilds")
          setModelStatus(false)
        }else{
          
          try {
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email
            }));
            const userData = setBlockD(feilds)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`,{
                method:"PUT",
                header:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
              });
            if(res.status==201){
              setError(false)
              setErrorMessageList(()=>[])
              
              toast.success("Data Updated Sucessfully")
            }else{
            setErrorMessageList(()=>["Problem in Updating Data"])
              setError(true)
              toast.error("Problem in Updating Data")
            }  
          } catch (errors) {
            setErrorMessageList(()=>["Problem in Updating Data"])
            setError(true)
            toast.error("Problem in Upadting Data")
          }finally{
            setModelStatus(false)
          }
        }
      }
      //end of block d
      const handleSubmitBlockE = async (e)=>{
        e.preventDefault()
        let message = []
        setModelStatus(true)
        setModelMessage("Updating Block E Data")

        let totalPercentage=0
        if(feilds.makeMyTrip.isRegistered=="Yes" && 
            feilds.makeMyTrip.percentage==''){
            message.push("Enter Percentage related to MakeMyTrip")
        }else{
            totalPercentage+=Number.parseInt(feilds.makeMyTrip.percentage)
        }
        if(feilds.agoda.isRegistered=="Yes" && 
            feilds.agoda.percentage==''){
            message.push("Enter Percentage related to Agoda")
        }else{
            totalPercentage+=Number.parseInt(feilds.agoda.percentage)
        }
        if(feilds.airBnb.isRegistered=="Yes" && 
            feilds.airBnb.percentage==''){
            message.push("Enter Percentage related to airBnb")
        }else{
            totalPercentage+=Number.parseInt(feilds.airBnb.percentage)
        }
        if(feilds.goIbibo.isRegistered=="Yes" && 
            feilds.goIbibo.percentage==''){
            message.push("Enter Percentage related to goIbibo")
        }else{
            totalPercentage+=Number.parseInt(feilds.goIbibo.percentage)
        }

        if(message.length!=0){
            setError(true)
            setErrorMessageList(message)
            setModelStatus(false)
            toast.error("Provide data to required feilds")
          }else if(totalPercentage>100){
              setError(true)
              setErrorMessageList(['"Total Percentage should not be greater than 100"'])
              setModelStatus(false)
              toast.error("Total Percentage should not be greater than 100")
          }else{
          
          try {
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email
            }));
            const userData = setBlockE(feilds)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`,{
                method:"PUT",
                header:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
              });
            if(res.status==201){
              setError(false)
              setErrorMessageList(()=>[])
              
              toast.success("Data Updated Sucessfully")
            }else{
              setError(true)
              setErrorMessageList(()=>["Problem in updating data"])
              toast.error("Problem in updating data")
            }  
          } catch (error) {
            setErrorMessageList(()=>['Problem in Updating data'])
            setError(true)
            toast.error("Problem in Updating Data")
            
          }finally{
            setModelStatus(false)
          }
        }
      }
      //end of block e
      const handleSubmitBlockF = async (e)=>{
        e.preventDefault()
        let message = []
        setModelStatus(true)
        setModelMessage("Updating Block F Data")
        if(feilds.occupancyInPeak==''){
            message.push("Enter Occupancy percentage in Peak Season")
        }
        if(feilds.occupancyInLean==''){
            message.push("Enter Occupancy percentage in Lean Season")
        }
        if(feilds.touristInYear==''){
            message.push("Enter Tourist vistor in last 12 months")
        }
        if(feilds.domesticTourist==''){
            message.push("Enter Domestic Toursist Number")
        }
        if(feilds.foreignTourist==''){
            message.push("Enter Foreign Toursist Number")
        }

        if(feilds.occupancyInPeak==''){
            message.push("Enter Occupancy percentage in Peak Season")
        }
          
        if(feilds.isDigitalized=="Digital" && 
            feilds.digitalEquiment.trim()==''){
            message.push("Enter Digital Technology Used")
        }
        if(message.length!=0){
          setError(true)
          setErrorMessageList(message)
          toast.warning("Provide value to all required feilds")
          setModelStatus(false)
        }else{
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                ['modifiedBy']:session.user.email
            }));
          const userData = setBlockF(feilds)
          try {
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}api/hs/${id}`,{
                method:"PUT",
                header:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
              });
            if(res.status==201){
              setErrorMessageList(()=>[])
              setError(false)
              toast.success("Data updated sucessfully")
              
            }else{
              setError(true)
              setErrorMessageList(()=>["Error in Updating Data"])
              toast.error("Error in Updating Data.")
            }  
            }catch (error) {
                setErrorMessageList(()=>["Error in Updating Data"])
                setError(true)
                toast.error("Problem in updating data")

            }finally{
                setModelStatus(false)
            }
        }
      }//end of block f



    const handleDropdownSelection= (e)=>{
        const {name,value} = e.target
        
        if(name=='district'){
            const constituent = getConstituency(value)
            setSelConstituency(constituent)
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                'district':value,
                'constituency':constituent[0]
            }
            ));
        }else{
            setFeilds((prevFeilds)=>({
                ...prevFeilds,
                [name]:value
            }
            ));
        }
    }
    

    return (
    <section className="w-full p-2 md:w-[90%] grid grid-cols-1 lg:grid-cols-10 gap-1 mx-auto place-content-center">
        
        <div className="lg:col-span-3 grid grid-cols-1 lg:gap-3 items-start p-2 my-4 bg-green-800 text-white">
            <HomeStayFromSelector number={1} isActive={(activeBlock==1)? 'true':'false'} handler={()=>setActiveBlock(1)} 
                content={'Block A : IDENTIFICATION PARTICULARS '}/>
            <HomeStayFromSelector number={2} isActive={(activeBlock==2)? 'true':'false' } handler={()=>setActiveBlock(2)}
                content={'Block B : DETAILS OF ESTABLISHMENTS'}/>
            <HomeStayFromSelector number={3} isActive={(activeBlock==3)? 'true':'false'} handler={()=>setActiveBlock(3)}
                content={'Block C : ACTIVITIES AND NEARBY ATTRACTIONS'}/>
            <HomeStayFromSelector number={4} isActive={(activeBlock==4)? 'true':'false'} handler={()=>setActiveBlock(4)}
                content={'Block D : TRANSPORTATION, ACCESSIBILITY AND OTHERS FACILITIES'}/>
            <HomeStayFromSelector number={5} isActive={(activeBlock==5)? 'true':'false'} handler={()=>setActiveBlock(5)}
                content={'Block E : REGISTRATION WITH ONLINE TRAVEL AGGREGATORS'}/>
            <HomeStayFromSelector number={6} isActive={(activeBlock==6)? 'true':'false'} handler={()=>setActiveBlock(6)}
                content={'Block F : RECORD KEEPING , OCCUPANCY DETAILS AND OTHER INFORMATION'}/>
            <HomeStayFromSelector number={7} isActive={(activeBlock==7)? 'true':'false'} handler={()=>setActiveBlock(7)}
                content={'Block G : FILE UPLOADING'}/>
            <div className='flex gap-2 items-center justify-between p-2 lg:hidden'>
                <button onClick={()=>setActiveBlock(activeBlock-1)} disabled={activeBlock==1}>
                    <div className='flex gap-2 items-center p-2 border-1 border-gray-50 rounded-md hover:border-3 hover:border-white hover:font-bold' >
                        <MdArrowBack />
                        <p>Prev Block</p>
                    </div>
                </button>
                <button onClick={()=>setActiveBlock(activeBlock+1)} disabled={activeBlock==7}>
                    <div className='flex gap-2 items-center p-2 border-1 border-gray-50 rounded-md hover:border-3 hover:border-white hover:font-bold'>
                        <p>Next Block</p>
                        <MdArrowForward />
                    </div>
                </button>
            </div>
        </div>
        
        {startLoading && <div className='lg:col-span-7 flex justify-center items-center'><Spinner label="Loading Data..." color="primary" size='lg'/></div>}
        {!startLoading && <div className="lg:col-span-7 flex flex-row  lg:p-2 bg-white text-white">
            <div name="groupA" className={(`${activeBlock==1? '':'hidden'} w-[200%]`)}>
                <form action="" onSubmit={handleSubmitBlockA} className='flex flex-col justify-start'>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Establishment Types</h2>
                        <div className='mt-2  sm:grid sm:grid-cols-3 gap-1'>
                            <RadioGroupTypeStyle id="isUrbanOrRular" name="isUrbanOrRular"
                                type='horizontal' value={feilds.isUrbanOrRular}
                                handler={handleRadioChange} title='Type 1'
                                options={[['Rular','Rular'],['Urban','Urban']]}/>
                            
                            <RadioGroupTypeStyle id="isPrivateOrGovt" name="isPrivateOrGovt"
                                type='horizontal' value={feilds.isPrivateOrGovt}
                                handler={handleRadioChange} title='Type 2'
                                options={[['Government','Government'],['Private','Private']]}/>
                            
                            <RadioGroupTypeStyle id="isNormalOrHeritage" name="isNormalOrHeritage"
                                type='horizontal' value={feilds.isNormalOrHeritage}
                                handler={handleRadioChange} title='Type 3'
                                options={[['Heritage','Heritage'],['Normal','Normal']]}/>
                            
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Location</h2>
                        <div className='mt-2 grid grid-col-1 sm:grid-cols-2 gap-2'>
                            <InputTextStyle id='state' name='state' required='true' 
                                readonly='true' value={feilds.state} placeholder='State'/>
                            <DropDownTypeStyle id='district' name='district'
                                options={district}  handler={handleDropdownSelection} 
                                placeholder='Select District' required='true' 
                                selectValue={feilds.district} />
                            <DropDownTypeStyle id='constituency' name='constituency'
                                options={selConstituency}  handler={handleDropdownSelection} 
                                placeholder='Select Constituency' required='true' 
                                selectValue={feilds.constituency} />
                            <InputTextStyle id='villageOrTown' name='villageOrTown' required='true' 
                                readonly='false' value={feilds.villageOrTown} 
                                placeholder='Enter Village/Town' handler={handleChange}/>
                                
                        </div>
                        <div className="grid gap-2 mt-2">
                            <InputTextStyle id='mcnpgpuward' name='mcnpgpuward' required='true' 
                                readonly='false' value={feilds.mcnpgpuward} 
                                placeholder='Enter Municipal / Panchayat / GPU / Ward' handler={handleChange}/>

                            <InputTextStyle id='address' name='address' required='true' 
                                readonly='false' value={feilds.address} 
                                placeholder='Enter Address' handler={handleChange}/>    
                                                            
                        </div>
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                        }
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                        <button type="submit" className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 '>Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,2)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*End of group A */}
            <div name="groupB" className={(`${activeBlock==2? '':'hidden'} w-[400%]`)}>
                <form action="" onSubmit={handleSubmitBlockB} className='flex flex-col justify-start'>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Details of Establishment</h2>
                        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <InputTextStyle id='homestayName' name='homestayName' required='true' 
                                readonly='false' value={feilds.homestayName} 
                                placeholder='Enter Homestay Name' handler={handleChange}/> 
                            <InputTextStyle id='ownerName' name='ownerName' required='true' 
                                readonly='false' value={feilds.ownerName} 
                                placeholder='Enter Owner Name' handler={handleChange}/> 
                                                        
                            <DropDownTypeStyle id='qualification' name='qualification'
                                options={qualification}  handler={handleDropdownSelection} 
                                placeholder='Select Qualification' required='true' 
                                selectValue={feilds.qualification} />
                            <RadioGroupTypeStyle id="gender" name="gender"
                                type='horizontal' value={feilds.gender}
                                handler={handleRadioChange}
                                options={[['Female','Female'],['Male','Male'],
                                    ['Others','Others']]} title='Gender'/>
                            <InputTextStyle id='manager' name='manager' required='true' 
                                readonly='false' value={feilds.manager} 
                                placeholder='Enter Manager Name' handler={handleChange}/>

                               
                            <RadioGroupTypeStyle id="isRegistredWithDot" name="isRegistredWithDot"
                                type='horizontal' value={feilds.isRegistredWithDot}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Registered with DOT&CAV'/>                          
                            
                            <InputTextStyle id='registrationNumberDot' name='registrationNumberDot' 
                                value={feilds.registrationNumberDot} 
                                readonly={feilds.isRegistredWithDot=='Yes'? 'false':'true' } 
                                required={feilds.isRegistredWithDot=='Yes'? 'true':'false' }
                                placeholder='Enter Registration Number' handler={handleChange}/>

                            <DateInputTextStyle id='establishmentDate' name='establishmentDate' 
                                value={feilds.establishmentDate} 
                                placeholder='Enter Establishment Date' 
                                handler={handleChange}
                                readonly={feilds.isRegistredWithDot=='Yes'? 'false':'true' } 
                                required={feilds.isRegistredWithDot=='Yes'? 'true':'false' } max='true'/>

                            <DateInputTextStyle id='renewDateDot' name='renewDateDot' 
                                value={feilds.renewDateDot} 
                                placeholder='Enter Renewed Upto' handler={handleChange}
                                readonly={feilds.isRegistredWithDot=='Yes'? 'false':'true' } 
                                required={feilds.isRegistredWithDot=='Yes'? 'true':'false' }
                                min={feilds.establishmentDate}/>
                            
                            <RadioGroupTypeStyle id="isRegisteredWithLocal" name="isRegisteredWithLocal"
                                type='horizontal' value={feilds.isRegisteredWithLocal}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Registered with Local Bodies'/> 
                            
                            <InputTextStyle id='registrationLocal' name='registrationLocal' 
                                value={feilds.registrationLocal} type='text'
                                placeholder='Enter Local Registration Number' handler={handleChange}
                                readonly={feilds.isRegisteredWithLocal=='Yes'? 'false':'true' } 
                                required={feilds.isRegisteredWithLocal=='Yes'? 'true':'false' }/>

                            <DateInputTextStyle id='renewDateLocal' name='renewDateLocal' 
                                value={feilds.renewDateLocal}
                                placeholder='Enter Renewal Date' handler={handleChange}
                                readonly={feilds.isRegisteredWithLocal=='Yes'? 'false':'true' } 
                                required={feilds.isRegisteredWithLocal=='Yes'? 'true':'false' }/>
                            
                            <InputNumberTextStyle id='contact' name='contact' 
                                value={feilds.contact} required='true'
                                placeholder='Enter Mobile Number' handler={handleTextNumberChange}/>

                            <InputTextStyle id='email' name='email' 
                                value={feilds.email} type='email'
                                placeholder='Enter Email Address' handler={handleChange}/>
                            <InputTextStyle id='website' name='website' 
                                value={feilds.website} type='text'
                                placeholder='Enter Website Url Address' handler={handleChange}/>

                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Rooms Capacity</h2>
                        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            
                            
                            <InputNumberTextStyle id='singleRoom' name='singleRoom' 
                            value={feilds.singleRoom} required='true'
                            placeholder='Enter Number of Single Rooms' 
                            handler={handleTextNumberChange}/>

                            <InputNumberTextStyle id='doubleRoom' name='doubleRoom' 
                            value={feilds.doubleRoom} required='true'
                            placeholder='Enter Number of Double Rooms' 
                            handler={handleTextNumberChange}/>  
                            <InputNumberTextStyle id='roomNumbers' name='roomNumbers' 
                            value={feilds.roomNumbers} required='true'
                            placeholder='Enter Total Number of Rooms' 
                            readonly='true'/>      
                        <InputNumberTextStyle id='carryingCapacity' name='carryingCapacity' 
                            value={feilds.carryingCapacity} required='true'
                            placeholder='Enter Total Carrying Capacity' 
                            handler={handleTextNumberChange}/>        
                                
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Staff Type</h2>
                        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <InputNumberTextStyle id='localStaff' name='localStaff' 
                                value={feilds.localStaff} required='true'
                                placeholder='Enter Local Staff Numbers' 
                                handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='otherStaff' name='otherStaff' 
                                value={feilds.otherStaff} required='true'
                                placeholder='Enter Non-Local Staff Numbers' 
                                handler={handleTextNumberChange}/>    
                            <InputNumberTextStyle id='trainedStaff' name='trainedStaff' 
                                value={feilds.trainedStaff} required='true'
                                readonly={(feilds.otherStaff=='' || feilds.localStaff=='')?'true':'false'}
                                placeholder='Enter Trained Staff Numbers' 
                                handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='nontrainedStaff' name='nontrainedStaff' 
                                value={feilds.nontrainedStaff} required='true' readonly='true'
                                placeholder='Enter Non-Trained Staff Numbers' />
                        </div>
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                        }  
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2">
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,1)}>PREVIOUS</button>
                        <button type="submit" className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 '
                              >Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,3)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*Group B End */}
            <div name="groupC" className={(`${activeBlock==3? '':'hidden'} w-[200%]`)}>
                <form className='flex flex-col justify-start'>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Activities</h2>
                        <div className='mt-2 grid gap-2'>
                        
                            <TextBoxTypeStyle id='villageTour' name='villageTour' required='false' 
                            readonly='false' value={feilds.villageTour} 
                            placeholder='Enter Village Tour / Walk Description' handler={handleChange}/>
                            
                            <TextBoxTypeStyle id='birdWatching' name='birdWatching' required='false' 
                            readonly='false' value={feilds.birdWatching} 
                            placeholder='Enter Bird Watching Description' handler={handleChange}/>
                            
                            <TextBoxTypeStyle id='organicFarming' name='organicFarming' required='false' 
                            readonly='false' value={feilds.organicFarming} 
                            placeholder='Enter Organic Farming Description' handler={handleChange}/>
                            
                            <TextBoxTypeStyle id='anyOtherActivity' name='anyOtherActivity' required='false' 
                            readonly='false' value={feilds.anyOtherActivity} 
                            placeholder='Enter Any Other Activity Description' handler={handleChange}/>
                            
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Popular Destination</h2>
                        {
                        feilds.nearByAttraction.map((val,i,arr)=>(
                             <div key={i} className='mt-2 grid grid-cols-3 gap-2'>
                                <InputTextStyle  name={'name'+i} readonly='false' value={val.name} 
                                    placeholder='Destination Name' 
                                    handler={(e)=>handleAttractionTextChange(e,i)}/>
                                <InputNumberTextStyle id={'distance'+i} name={'distance'+i}  
                                    value={val.distance} 
                                    placeholder='Distance in Km' handler={(e)=>handleAttractionTextChange(e,i)}/>
                                
                                <div className='flex align-middle gap-1'>
                                    {(arr.length>1) && <button className='w-6 p-2 bg-red-400 hover:bg-red-700 font-white rounded-md'
                                        onClick={(e)=>handleBtnDelAttraction(e,i)}>-</button>}
                                    {(i==arr.length-1)&& <button className='w-6 p-2 bg-green-400 hover:bg-green-700 font-white rounded-md'
                                    onClick={(e)=>handleBtnAddAttraction(e,i)}>+</button>}
                                    
                                </div>
                            </div>
                            
                         ))}                        
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2">
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,2)}>PREVIOUS</button>
                        <button onClick={handleSubmitBlockC} className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 ' 
                              >Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,4)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*Group C end */}
            <div name="groupD" className={(`${activeBlock==4? '':'hidden'} w-[200%]`)}>
                <form action="" onSubmit={handleSubmitBlockD} className='flex flex-col justify-start'>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Facilities</h2>
                        <div className='mt-2 grid gap-2'>
                        
                            <RadioGroupTypeStyle id="transportation" name="transportation"
                                type='horizontal' value={feilds.transportation}
                                handler={handleRadioChange}
                                options={[['Luxury','Luxury'],['Non-Luxury','Non-Luxury'],['Both','Luxury & Non-Luxury'],['None','None']]}
                                title='Transportation'/>
                            <TextBoxTypeStyle id='manager' name='accessibility'  
                                readonly='false' value={feilds.accessibility} 
                                placeholder='Enter Accessibility' handler={handleChange}/>
                            
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <RadioGroupTypeStyle id="wasteDisposal_isYesorNo" name="wasteDisposal.isYesorNo"
                                type='horizontal' value={feilds.wasteDisposal.isYesorNo}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Proper Waste Disposal System'/>
                            <InputTextStyle id='wasteDisposal_description' name='wasteDisposal.description'
                             value={feilds.wasteDisposal.description} 
                                placeholder='Specify' handler={handleChange}
                                readonly={feilds.wasteDisposal.isYesorNo=='Yes'? 'false':'true' } 
                                required={feilds.wasteDisposal.isYesorNo=='Yes'? 'true':'false' }/>

                            <RadioGroupTypeStyle id="drinkingWater_isYesorNo" name="drinkingWater.isYesorNo"
                                type='horizontal' value={feilds.drinkingWater.isYesorNo}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Safe Drinking Water'/>
                            <InputTextStyle id='drinkingWater_description' name='drinkingWater.description'
                             value={feilds.drinkingWater.description} 
                                placeholder='Specify' handler={handleChange}
                                readonly={feilds.drinkingWater.isYesorNo=='Yes'? 'false':'true' } 
                                required={feilds.drinkingWater.isYesorNo=='Yes'? 'true':'false' }/>

                            <RadioGroupTypeStyle id="firstAid_isYesorNo" name="firstAid.isYesorNo"
                                type='horizontal' value={feilds.firstAid.isYesorNo}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='First Aid'/>
                            <InputTextStyle id='firstAid_description' name='firstAid.description'
                             value={feilds.firstAid.description} 
                                placeholder='Specify' handler={handleChange}
                                readonly={feilds.firstAid.isYesorNo=='Yes'? 'false':'true' } 
                                required={feilds.firstAid.isYesorNo=='Yes'? 'true':'false' }/>

                            <RadioGroupTypeStyle id="ecoFriendly_isYesorNo" name="ecoFriendly.isYesorNo"
                                type='horizontal' value={feilds.ecoFriendly.isYesorNo}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Eco Friendly and Sustainable Development'/>
                            <InputTextStyle id='ecoFriendly_description' name='ecoFriendly.description'
                             value={feilds.ecoFriendly.description} 
                                placeholder='Specify' handler={handleChange}
                                readonly={feilds.ecoFriendly.isYesorNo=='Yes'? 'false':'true' } 
                                required={feilds.ecoFriendly.isYesorNo=='Yes'? 'true':'false' }/>

                            <RadioGroupTypeStyle id="cleaning_isYesorNo" name="cleaning.isYesorNo"
                                type='horizontal' value={feilds.cleaning.isYesorNo}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} 
                                title='Clean Surroundings'/>
                            <InputTextStyle id='cleaning_description' name='cleaning.description'
                             value={feilds.cleaning.description} 
                                placeholder='Specify' handler={handleChange}
                                readonly={feilds.cleaning.isYesorNo=='Yes'? 'false':'true' } 
                                required={feilds.cleaning.isYesorNo=='Yes'? 'true':'false' }/>

                        </div>
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2">
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,3)}>PREVIOUS</button>
                        <button type="submit" className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 '
                              >Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,5)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*Group D ends */}
            <div name="groupE" className={(`${activeBlock==5? '':'hidden'} w-[200%]`)}>
                <form action="" onSubmit={handleSubmitBlockE} className='flex flex-col justify-start'>
                    
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        <RadioGroupTypeStyle id="makeMyTrip_isRegistered" name="makeMyTrip.isRegistered"
                            type='horizontal' value={feilds.makeMyTrip.isRegistered}
                            handler={handleRadioChange}
                            options={[['Yes','Yes'],['No','No']]} title='MakeMyTrip Registered'/>
                        <InputNumberTextStyle id='makeMyTrip_percentage' name='makeMyTrip.percentage' 
                            value={feilds.makeMyTrip.percentage} 
                            placeholder='Enter Percentage' handler={handleTextNumberChange}
                            readonly={feilds.makeMyTrip.isRegistered=='Yes'? 'false':'true' } 
                            required={feilds.makeMyTrip.isRegistered=='Yes'? 'true':'false' }
                        />    

                        <RadioGroupTypeStyle id="agoda_isRegistered" name="agoda.isRegistered"
                            type='horizontal' value={feilds.agoda.isRegistered}
                            handler={handleRadioChange}
                            options={[['Yes','Yes'],['No','No']]} title='Agoda Registered'/>

                        <InputNumberTextStyle id='agoda_percentage' name='agoda.percentage' 
                            value={feilds.agoda.percentage} 
                            placeholder='Enter Percentage' handler={handleTextNumberChange}
                            readonly={feilds.agoda.isRegistered=='Yes'? 'false':'true' } 
                            required={feilds.agoda.isRegistered=='Yes'? 'true':'false' }
                        />     

                        <RadioGroupTypeStyle id="airBnb_isRegistered" name="airBnb.isRegistered"
                            type='horizontal' value={feilds.airBnb.isRegistered}
                            handler={handleRadioChange}
                            options={[['Yes','Yes'],['No','No']]} title='AirBnb Registered'/>

                        <InputNumberTextStyle id='airBnb_percentage' name='airBnb.percentage' 
                            value={feilds.airBnb.percentage} 
                            placeholder='Enter Percentage' handler={handleTextNumberChange}
                            readonly={feilds.airBnb.isRegistered=='Yes'? 'false':'true' } 
                            required={feilds.airBnb.isRegistered=='Yes'? 'true':'false' }
                        /> 
                        <RadioGroupTypeStyle id="goIbibo_isRegistered" name="goIbibo.isRegistered"
                            type='horizontal' value={feilds.goIbibo.isRegistered}
                            handler={handleRadioChange}
                            options={[['Yes','Yes'],['No','No']]} title='GoIbibo Registered'/>

                        <InputNumberTextStyle id='goIbibo_percentage' name='goIbibo.percentage' 
                            value={feilds.goIbibo.percentage} 
                            placeholder='Enter Percentage' handler={handleTextNumberChange}
                            readonly={feilds.goIbibo.isRegistered=='Yes'? 'false':'true' } 
                            required={feilds.goIbibo.isRegistered=='Yes'? 'true':'false' }
                        /> 
                            
                            <div className='col-span-2'>
                                <TextBoxTypeStyle id='otherOnline' name='otherOnline' 
                                    value={feilds.otherOnline} 
                                    placeholder='Enter Other Online Methods' handler={handleChange}
                                /> 

                            </div>
                        </div>
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                            }
                            
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2">
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,4)}>PREVIOUS</button>
                        <button type="submit" className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 '
                             >Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,6)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*Group E ends */}

            <div name="groupF" className={(`${activeBlock==6? '':'hidden'} w-[200%]`)}>
                <form action="" onSubmit={handleSubmitBlockF} className='flex flex-col justify-start'>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Record Keeping</h2>
                        <div className='mt-2 sm:grid sm:grid-cols-2 gap-2'>
                        <RadioGroupTypeStyle id="isRecordMaintained" name="isRecordMaintained"
                            type='horizontal' value={feilds.isRecordMaintained}
                            handler={handleRadioChange}
                            options={[['Yes','Yes'],['No','No']]} title="Record Maintained"/>

                        <RadioGroupTypeStyle id="isManualorDigital" name="isManualorDigital"
                            type='horizontal' value={feilds.isManualorDigital}
                            handler={handleRadioChange} readOnly={feilds.isRecordMaintained=='Yes'? 'false':'true' }
                            options={[['Digital','Digital'],['Manual','Manual']]} title='Record Method'/>
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Occupancy Details</h2>
                        <div className='mt-2 sm:grid sm:grid-cols-2 sm:gap-2'>
                            <InputNumberTextStyle id='occupancyInPeak' name='occupancyInPeak' 
                                value={feilds.occupancyInPeak} required='true'
                                placeholder='Occupancy % in Peak Season' handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='occupancyInLean' name='occupancyInLean' 
                                value={feilds.occupancyInLean} required='true'
                                placeholder='Occupancy % in Lean Season' handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='touristInYear' name='touristInYear' 
                                value={feilds.touristInYear} required='true'
                                placeholder='Visitor in last 12 months' handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='domesticTourist' name='domesticTourist' 
                                value={feilds.domesticTourist} required='true'
                                placeholder='Domestic Tourist Number' handler={handleTextNumberChange}/>
                            <InputNumberTextStyle id='foreignTourist' name='foreignTourist' 
                                value={feilds.foreignTourist} required='true' readonly='true'
                                placeholder='Foreign Tourist Number' handler={handleTextNumberChange}/>
                            
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Technology Related</h2>
                        <div className='mt-2 sm:grid sm:grid-cols-1 gap-2'>
                            <RadioGroupTypeStyle id="isDigitalized" name="isDigitalized"
                                type='horizontal' value={feilds.isDigitalized}
                                handler={handleRadioChange}
                                options={[['Yes','Yes'],['No','No']]} title='Is Technology Used'/>

                            <TextBoxTypeStyle id='digitalEquiment' name='digitalEquiment'  
                                value={feilds.digitalEquiment} 
                                placeholder='Enter Digital Technology Used' handler={handleChange}
                                readonly={feilds.isDigitalized=='Yes'? 'false':'true' } 
                                 required={feilds.isDigitalized=='Yes'? 'true':'false' }/>

                            <TextBoxTypeStyle id='digitalSupport' name='digitalSupport'  
                                value={feilds.digitalSupport} 
                                placeholder='Technical Support Mentioned (if required)' handler={handleChange}/>

                            
                        </div>
                    </fieldset>
                    <fieldset className="border border-solid border-green-300 p-2 bg-white">
                        <h2 className='text-blue-700 font-bold'>Account Keeping</h2>
                        <div className='mt-2 sm:grid sm:grid-cols-2 gap-2'>
                            <RadioGroupTypeStyle id="isAccountMaintained" name="isAccountMaintained"
                                type='horizontal' value={feilds.isAccountMaintained}
                                handler={handleRadioChange} 
                                options={[['Yes','Yes'],['No','No']]} title='Account Maintained'/>

                            <RadioGroupTypeStyle id="isAccountDigital" name="isAccountDigital"
                                type='horizontal' value={feilds.isAccountDigital}
                                handler={handleRadioChange} readOnly={feilds.isAccountMaintained=='Yes'? 'false':'true' }
                                options={[['Digital','Digital'],['Manual','Manual']]} title='Maintained Type'/>

                        </div>
                    </fieldset>
                    <div>
                       {
                            error && <ul className='bg-red-400 w-full p-2'>
                                {errorMessageList.map((value,index)=>
                                    <li key={index}>{value}</li>)}
                            </ul>
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-2">
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,5)}>PREVIOUS</button>
                        <button type="submit" className='p-2 w-full bg-green-400
                             text-white font-bold hover:bg-green-600 '
                             >Update</button>
                        <button  className='p-2 w-full bg-blue-400
                             text-white font-bold hover:bg-blue-600'
                             onClick={(e)=>handleSubmitSave(e,7)}>NEXT</button>
                     </div>
                </form>
            </div>
            {/*End of group F */}
            <div name="groupG" className={(`${activeBlock==7? '':'hidden'} grid grid-cols-1 gap-2 w-[200%] `)}>
                <div>
                    <form action="" id="homestayImagesUpload" onSubmit={handleHomestayFileSubmit} className='grid grid-cols-1 gap-1'>
                        <h1 className='font-bold text-green-600'>Homestay Images</h1>
                        {   
                            feilds.homestayImages.length==0?<div className='flex justify-center'>No file Uploaded</div> :
                            <div className='flex flex-col gap-2'>
                              {  
                                feilds.homestayImages.map((val,index)=>(
                                    <div  key={index} className='flex flex-row items-center gap-2 p-2 border-1 border-green-200'>
                                        <Image src={`/homestay/${val}`}
                                        width={0}
                                        height={0}
                                        sizes='200'
                                        alt={feilds.homestayName}
                                        unoptimized
                                        className='block h-60 w-96 object-fill' priority={true}/>
                                        <button onClick={(e)=>handleDeleteFile(e,index)} type='button' className='p-2 h-12 sm:w-20 flex flex-row items-center  bg-red-600 mr-2 rounded-lg 
                                            hover:drop-shadow-md hover:bg-red-800'>
                                            <FaTrashAlt  className='font-bold sm:mr-2'/> <span className=''>Delete</span>
                                        </button>
                                    </div>
                                ))
                                
                              }
                              
                            </div>   
                                                     
                        }
                        
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <FileUploadStyle id="fileHomestayImage" name="files" multi='true' required='false'
                                placeholder='Select Homestay Images to Upload' handler={handleSelectFile}/>
                            
                            <button type="submit" className='bg-green-400 
                            text-white p-2 md:w-64'>Upload Homestay Image</button>
                        </div>
                        
                    </form>
                </div>
                <div>
                    <form action="" id="ownerSignatureUpload" onSubmit={handleSignatureFileSubmit} className='grid grid-cols-1 gap-1'>
                        <h1 className='font-bold text-green-600'>Owner Signature</h1>
                        {   
                            feilds.signature.length==0?<div className='flex justify-center'>No Signature Uploaded</div> :
                            <div className='flex flex-col gap-2'>
                              
                                <div className='flex flex-row items-center gap-2 p-2 border-1 border-green-200'>
                                    <Image src={`/signature/${feilds.signature}`}
                                    width={0}
                                    height={0}
                                    sizes='200'
                                    alt={feilds.homestayName}
                                    className='block h-60 w-96 object-fill' priority={true}/>
                                    <button onClick={handleDeleteFileSignature} type='button' className='p-2 h-12 sm:w-20 flex flex-row items-center  bg-red-600 mr-2 rounded-lg 
                                        hover:drop-shadow-md hover:bg-red-800'>
                                        <FaTrashAlt  className='font-bold sm:mr-2'/> <span className=''>Delete</span>
                                    </button>
                                </div>
                            </div>                            
                        }
                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <FileUploadStyle id="fileUploadSign" name="signature"  required='false'
                                placeholder='Select Owner Signature to Upload' handler={handleSelectFile} />
                            
                            <button type="submit" className='bg-green-400 
                            text-white p-2 md:w-64'>Upload Signature</button>
                        </div>
                    </form>
                </div>
                <form onSubmit={handleSubmitBlockG} className="grid grid-cols-1">
                    <div>
                    {
                        error && <ul className='bg-red-400 w-full p-2'>
                            {errorMessageList.map((value,index)=>
                                <li key={index}>{value}</li>)}
                        </ul>
                    }
                    <div className='grid grid-cols-2 w-full gap-1'>
                        <button  className='p-2 w-full bg-blue-400
                                text-white font-bold hover:bg-blue-600'
                                onClick={(e)=>handleSubmitSave(e,6)}>PREVIOUS</button>
                        <button type="submit" className='p-2 md:w-64 bg-green-400
                                text-white font-bold hover:bg-green-600 '
                                >FINISH</button>
                    </div>      
                    </div>
                </form>
                
            </div>
        </div>}
        <div className='hidden'>
            <WhiteModal title={modelMessage} status={modelStatus}/>
        </div>
        
    </section>
  )

}

export default HomestayEditForm