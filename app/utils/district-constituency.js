export const district = ['Gangtok', 'Gyalshing',  'Mangan', 'Namchi', 'Pakyong', 'Soreng']

export const districtConstitency = [
    ['Gangtok','Arithang'],
    ['Gangtok','Gangtok'],
    ['Gangtok','Khamdong-Singtam'],
    ['Gangtok','Martam-Rumtek'],
    ['Gangtok','Shyari'],
    ['Gangtok','Upper Burtuk'],
    ['Gangtok','Upper Tadong'],
    ['Gyalshing','Gyalshing-Barnyak'],
    ['Gyalshing','Maneybong'],
    ['Gyalshing','Yangthang'],
    ['Gyalshing','Yoksam-Tashiding'],
    ['Mangan','Djongu'],
    ['Mangan','Kabi-Lungchok'],
    ['Mangan','Lachen-Mangan'],
    ['Namchi','Barfung'],
    ['Namchi','Melli'],
    ['Namchi','Namchi-Singhithang'],
    ['Namchi','Namthang-Rateypani'],
    ['Namchi','Poklok-Kamrang'],
    ['Namchi','Rangang-Yangang'],
    ['Namchi','Temi-Namphing'],
    ['Namchi','Tumin-Lingee'],
    ['Pakyong','Chujachen'],
    ['Pakyong','Gnathang-Machong'],
    ['Pakyong','Namchaybong'],
    ['Pakyong','Rhenock'],
    ['Pakyong','West Pendam'],
    ['Soreng','Daramdin'],
    ['Soreng',"Rinchenpong"],
    ['Soreng',"Salghari-Zoom"],
    ['Soreng',"Soreng-Chakung"],   
    ['Sangha','Sangha'],
]

export const getConstituency = (selDistrict)=>{
    const disCons = districtConstitency.filter((value,index)=>(
        value[0]==selDistrict
    ))
    const constituent = disCons.map((value)=>value[1])
    console.log("I was called by ",selDistrict)
    return constituent
}
