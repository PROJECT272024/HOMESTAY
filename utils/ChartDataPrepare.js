const makeDataSet =  (data)=>{
    const result = {
        urban:0,
        rular:0,
        private:0,
        government:0,
        normal:0,
        heritage:0,
        gangtok:0,
        gyalshing:0,
        mangan:0,
        namchi:0,
        pakyong:0,
        soreng:0,
        male:0,
        female:0,
        others:0,
        regWithDot:0,
        regNotWithDot:0,
        regWithLocal:0,
        regNotWithLocal:0,
        doctrate:0,
        postGrad:0,
        grad:0,
        highSecond:0,
        secondary:0,
        primary:0,
        illetrate:0,
        total:0    
    }
    result.total=data.length
    if(data){
      try {
        for(let i of data){      
          if(i.isUrbanOrRular=='Urban'){
              result.urban = result.urban +1
          }else{
              result.rular = result.rular +1 
          }
          if(i.isPrivateOrGovt=='Private'){
              result.private = result.private +1 
          }else{
              result.government = result.government +1 
          }
          if(i.isNormalOrHeritage=='Normal'){
              result.normal = result.normal +1 
          }else{
              result.heritage = result.heritage +1 
          }
          if(i.district=='Gangtok'){
              result.gangtok += 1 
          }else if(i.district=='Gyalshing'){
              result.gyalshing+=1 
          }else if(i.district=='Mangan'){
              result.mangan+=1 
          }else if(i.district=='Namchi'){
              result.namchi+=1 
          }else if(i.district=='Pakyong'){
              result.pakyong+=1 
          }else {
              result.soreng+=1 
          }
          if(i.gender=="Female"){
              result.female +=1 
          }else if(i.gender=="Male"){
              result.male +=1 
          }else{
              result.others+=1
          }
          if(i.isRegistredWithDot=="Yes"){
              result.regWithDot +=1 
          }else{
              result.regNotWithDot+=1
          }
          if(i.isRegisteredWithLocal=="Yes"){
              result.regWithLocal +=1 
          }else{
              result.regNotWithLocal+=1
          }

          if(i.qualification=="Doctrate"){
              result.doctrate+=1
          }else if(i.qualification=="Post Graduate"){
              result.postGrad+=1
          }else if(i.qualification=="Graduate"){
              result.grad+=1
          }else if(i.qualification=="Higher Secondary"){
              result.highSecond+=1
          }else if(i.qualification=="Secondary"){
              result.secondary+=1
          }else if(i.qualification=="Primary"){
              result.primary+=1
          }else{
              result.illetrate+=1
          }
      
          
        }
      } catch (error) {
      }
      
    }
    const prepareData = {
        type1: [
            { x: 'Rular', y: result.rular},
            { x: 'Urban', y: result.urban }
          ],
          type2: [
            { x: 'Government', y: result.government},
            { x: 'Private', y: result.private }
          ],
          type3: [
            { x: 'Normal', y: result.normal},
            { x: 'Heritage', y: result.heritage }
          ],
          type: [
            { x: 'Rular', y: result.rular, total: result.total},
            { x: 'Urban', y: result.urban, total: result.total },
            { x: 'Government', y: result.government, total: result.total},
            { x: 'Private', y: result.private, total: result.total },
            { x: 'Normal', y: result.normal, total: result.total},
            { x: 'Heritage', y: result.heritage, total: result.total }
          ],
          stackedtype2: [
            { 
              name: 'Type I',
              x: result.rular,
              label1: 'Rular',
              y: result.urban,
              label2: 'Urban',
              total: result.total
            },
            {
              name: 'Type II',
              x: result.government,
              label1: 'Government',
              y: result.private,
              label2: 'Private',
              total: result.total
            },
            {
              name: 'Type III',
              x: result.normal,
              label1: 'Normal',
              y: result.heritage,
              label2: 'Heritage',
              total: result.total
            }
          ],
          district: [
            { x: 'Gangtok', y: result.gangtok, total: result.total},
            { x: 'Gyalshing', y: result.gyalshing, total: result.total },
            { x: 'Mangan', y: result.mangan, total: result.total },
            { x: 'Namchi', y: result.namchi, total: result.total},
            { x: 'Pakyong', y: result.pakyong, total: result.total },
            { x: 'Soreng', y: result.soreng, total: result.total }
          ],
          gender: [
            { x: 'Female', y: result.female, total: result.total},
            { x: 'Male', y: result.male, total: result.total },
            { x: 'Others', y: result.others, total: result.total }
          ],
          education: [
            { x: 'Doctrate', y: result.doctrate, total: result.total},
            { x: 'Post Graduate', y: result.postGrad, total: result.total },
            { x: 'Graduate', y: result.grad, total: result.total },
            { x: 'Higher Secondary', y: result.highSecond, total: result.total},
            { x: 'Secondary', y: result.secondary, total: result.total },
            { x: 'Primary', y: result.primary, total: result.total },
            { x: 'Illetrate', y: result.illetrate, total: result.total },
          ],
          registration:[
            { x: 'With DOT', y: result.regWithDot, total: result.total},
            { x: 'Not With DOT', y: result.regNotWithDot, total: result.total },
            { x: 'With Local', y: result.regWithLocal, total: result.total},
            { x: 'Not With Local', y: result.regNotWithLocal, total: result.total },
          ],
          stackedRegistration: [
            { 
              name: 'DOT&CAV',
              x: result.regWithDot,
              label1: 'Registered',
              y: result.regNotWithDot,
              label2: 'Not Registered',
              total: result.total
            },
            {
              name: 'Local',
              x: result.regWithLocal,
              label1: 'Registered',
              y: result.regNotWithLocal,
              label2: 'Not Registered',
              total: result.total
            }
          ]
    }
    //console.log(prepareData) 
    return prepareData        
}

export const readyData = (data)=>{
  console.log('Data from outside ', data)
  return makeDataSet(data)
}


export const criteriaBased = (data)=>{
    const readyData = makeDataSet(data)
    const typeBased = {
        datasets: [
          {
            label: 'Type 1',
            data: readyData.type1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barPercentage: 0.9, // Increase this value to widen the bars
            categoryPercentage: 0.9,
          },
          {
            label: 'Type 2',
            data: readyData.type2,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barPercentage: 0.9, // Increase this value to widen the bars
            categoryPercentage: 0.9,
          },
          {
            label: 'Type 3',
            data: readyData.type3,
            backgroundColor: 'rgba(75, 20, 92, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barPercentage: 0.9, // Increase this value to widen the bars
            categoryPercentage: 0.9,
          },
        ],
    };
    const allTypeBased = {
        datasets: [
          {
            label: 'Type',
            data: readyData.type,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }          
        ],
    };
    const districtBased = {
        datasets: [
          {
            label: 'District',
            data: readyData.district,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }          
        ],
    };
    const genderBased = {
        datasets: [
            {
              label: 'Gender',
              data: readyData.gender,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            }          
          ]
    };
    const qualificationBased = {
        datasets: [
            {
              label: 'Qualification',
              data: readyData.education,
              borderWidth: 1,
                barPercentage: 0.9, // Increase this value to widen the bars
                categoryPercentage: 0.9,
            }          
          ]
    };
    const registrationBased = {
        datasets: [
            {
              label: 'Registration Based',
              data: readyData.registration,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              barPercentage: 0.9, // Increase this value to widen the bars
              categoryPercentage: 0.9,
            }          
          ]
    };
    const final = {
        typeBased,allTypeBased,districtBased,genderBased,qualificationBased,registrationBased,readyData
    }
    return final
}