const homeStay = {
    isUrbanOrRular: 'Rural',
    isPrivateOrGovt: 'Private',
    isNormalOrHeritage:'Normal',
    state:"Sikkim",
    district:"Gangtok",
    constituency:"Arithang",
    villageOrTown:"",
    mcnpgpuward:"",
    address:"",
    homestayName:"",
    ownerName:"",
    qualification:"Graduate",
    gender:'Female',
    manager:"",
    isRegistredWithDot:'Yes',
    registrationNumberDot:"",
    establishmentDate:"",
    renewDateDot:"",
    isRegisteredWithLocal:'Yes',
    registrationLocal:"",
    renewDateLocal:"",
    roomNumbers:'',
    singleRoom:'',
    doubleRoom:'',
    carryingCapacity:'',
    localStaff:'',
    otherStaff:'',
    trainedStaff:'',
    nontrainedStaff:'',
    villageTour:"",
    birdWatching:"",
    organicFarming:"",
    anyOtherActivity:"",
    nearByAttraction:[{name:"",distance:""}],
    transportation:"Non-Luxury",
    accessibility:"",
    wasteDisposal:{isYesorNo:'Yes',description:""},
    drinkingWater:{isYesorNo:'Yes',description:""},
    firstAid:{isYesorNo:'Yes',description:""},
    ecoFriendly:{isYesorNo:'Yes',description:""},
    cleaning:{isYesorNo:'Yes',description:""},
    makeMyTrip:{isRegistered:'No',percentage:''},
    agoda:{isRegistered:'No',percentage:''},
    airBnb:{isRegistered:'No',percentage:''},
    goIbibo:{isRegistered:'No',percentage:''},
    otherOnline:"",
    isRecordMaintained:'Yes',
    isManualorDigital:'Digital',
    occupancyInPeak:'',
    occupancyInLean:'',
    touristInYear:'',
    domesticTourist:'',    
    foreignTourist:'',
    isDigitalized:'Yes',
    digitalEquiment:"",
    digitalSupport:"",
    isAccountMaintained:'Yes',
    isAccountDigital:'Digital',
    email:"",
    website:"",
    contact:"",
    signature:"",
    homestayImages:[],
    isStatus: 1,
    createdBy:null,
    modifiedBy: null
}



export default  homeStay; 

export const sethomeStay = (feilds)=>{
    let template = {
        isUrbanOrRular: 'Rural',
        isPrivateOrGovt: 'Private',
        isNormalOrHeritage:'Normal',
        state:"Sikkim",
        district:"Gangtok",
        constituency:"Arithang",
        villageOrTown:"",
        mcnpgpuward:"",
        address:"",
        homestayName:"",
        ownerName:"",
        qualification:"Graduate",
        gender:'Female',
        manager:"",
        isRegistredWithDot:'Yes',
        registrationNumberDot:"",
        establishmentDate:"",
        renewDateDot:"",
        isRegisteredWithLocal:'Yes',
        registrationLocal:"",
        renewDateLocal:"",
        roomNumbers:'',
        singleRoom:'',
        doubleRoom:'',
        carryingCapacity:'',
        localStaff:'',
        otherStaff:'',
        trainedStaff:'',
        nontrainedStaff:'',
        villageTour:"",
        birdWatching:"",
        organicFarming:"",
        anyOtherActivity:"",
        nearByAttraction:[{name:"",distance:""}],
        transportation:"Non-Luxury",
        accessibility:"",
        wasteDisposal:{isYesorNo:'Yes',description:""},
        drinkingWater:{isYesorNo:'Yes',description:""},
        firstAid:{isYesorNo:'Yes',description:""},
        ecoFriendly:{isYesorNo:'Yes',description:""},
        cleaning:{isYesorNo:'Yes',description:""},
        makeMyTrip:{isRegistered:'No',percentage:''},
        agoda:{isRegistered:'No',percentage:''},
        airBnb:{isRegistered:'No',percentage:''},
        goIbibo:{isRegistered:'No',percentage:''},
        otherOnline:"",
        isRecordMaintained:'Yes',
        isManualorDigital:'Digital',
        occupancyInPeak:'',
        occupancyInLean:'',
        touristInYear:'',
        domesticTourist:'',    
        foreignTourist:'',
        isDigitalized:'Yes',
        digitalEquiment:"",
        digitalSupport:"",
        isAccountMaintained:'Yes',
        isAccountDigital:'Digital',
        email:"",
        website:"",
        contact:"",
        signature:"",
        homestayImages:[],
        isStatus: 1,
        createdBy:null,
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}

export const setBlockA = (feilds)=>{
    let template = {
        isUrbanOrRular: 'Rural',
        isPrivateOrGovt: 'Private',
        isNormalOrHeritage:'Normal',
        state:"Sikkim",
        district:"Gangtok",
        constituency:"Arithang",
        villageOrTown:"",
        mcnpgpuward:"",
        address:"",
        isStatus: 1,
        createdBy:null,
        modifiedBy: null
    }
    return helperSetter(template,feilds)
}
export const setBlockB = (feilds)=>{
    let template = {
        homestayName:"",
        ownerName:"",
        qualification:"Graduate",
        gender:'Female',
        manager:"",
        isRegistredWithDot:'Yes',
        registrationNumberDot:"",
        establishmentDate:"",
        renewDateDot:"",
        isRegisteredWithLocal:'Yes',
        registrationLocal:"",
        renewDateLocal:"",
        contact:"",
        signature:"",
        roomNumbers:'',
        singleRoom:'',
        doubleRoom:'',
        carryingCapacity:'',
        localStaff:'',
        otherStaff:'',
        trainedStaff:'',
        nontrainedStaff:'',
        
    }
    return helperSetter(template,feilds)

}//block b
export const setBlockC = (feilds)=>{
    let template = {
        
        villageTour:"",
        birdWatching:"",
        organicFarming:"",
        anyOtherActivity:"",
        nearByAttraction:[{name:"",distance:""}],
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}//block c
export const setBlockD = (feilds)=>{
    let template = {
        
        transportation:"Non-Luxury",
        accessibility:"",
        wasteDisposal:{isYesorNo:'Yes',description:""},
        drinkingWater:{isYesorNo:'Yes',description:""},
        firstAid:{isYesorNo:'Yes',description:""},
        ecoFriendly:{isYesorNo:'Yes',description:""},
        cleaning:{isYesorNo:'Yes',description:""},
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}//block d
export const setBlockE = (feilds)=>{
    let template = {
        
        makeMyTrip:{isRegistered:'No',percentage:''},
        agoda:{isRegistered:'No',percentage:''},
        airBnb:{isRegistered:'No',percentage:''},
        goIbibo:{isRegistered:'No',percentage:''},
        otherOnline:"",
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}//block e
export const setBlockF = (feilds)=>{
    let template = {
        
        isRecordMaintained:'Yes',
        isManualorDigital:'Digital',
        occupancyInPeak:'',
        occupancyInLean:'',
        touristInYear:'',
        domesticTourist:'',    
        foreignTourist:'',
        isDigitalized:'Yes',
        digitalEquiment:"",
        digitalSupport:"",
        isAccountMaintained:'Yes',
        isAccountDigital:'Digital',
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}//block f
export const setBlockG = (feilds)=>{
    let template = {
        
        signature:"",
        homestayImages:[],
        modifiedBy: null
    }
    return helperSetter(template,feilds)

}//block g

function helperSetter(template,input){	 
    let result = {}
    for(let key in template){	 
        result[key]=input[key];
    }
    return result
}
/*function check(){	 
    let testTemp = {
        goIbibo:{isRegistered:'No',percentage:0},
        otherOnline:"",
        isRecordMaintained:'Yes',
        nearByAttraction:[{name:"",distance:""}],
    }

    let sending = {
        goIbibo:{isRegistered:'Yes',percentage:80},
        otherOnline:"Apple",
        isRecordMaintained:'No',
        nearByAttraction:[{name:"GANGTOK",distance:"2"},
                {name:"GANGTOK 2",distance:"25"}]
    }
    let res = helperSetter(testTemp,sending)
    console.log(res)
    console.log(res.nearByAttraction[0].name)
}
check()
*/