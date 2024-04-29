import React from 'react'
import solakhoph from '@/public/images/heroslider/solakhoph.jpg'
import Image from 'next/image'

const AboutUs  = () => {
  return (
    <section className='mx-auto p-4'>
        <div className=''>
            <h1 className='font-bold text-2xl flex justify-center text-blue-500 p-4'>About Us</h1>
            <div className='h-px drop-shadow-md bg-gray-300 mb-4'></div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex w-full h-full bg-green-200 items-center' >
                    <Image
                    src={solakhoph}
                    alt=''
                    className='h-full'
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true}
                    />
                </div>
                <div className='md:w-full px-2 flex flex-col gap-2'>
                    <p className='text-justify'>
                        Sikkim (/ˈsɪkɪm/) is a state in northeastern India. It borders Tibet in the north and northeast, Bhutan in the east, Nepal 
                        in the west, and West Bengal in the south. Sikkim is also located close to India's Siliguri Corridor near Bangladesh. 
                        Sikkim is the least populous and second smallest among the Indian states. A part of the Eastern Himalaya, Sikkim is notable 
                        for its biodiversity, including alpine and subtropical climates, as well as being a host to Kangchenjunga, 
                        the highest peak in India and third highest on Earth. Sikkim's capital and largest city is Gangtok. 
                        Almost 35% of the state is covered by the Khangchendzonga National Park. 
                    </p>
                    <p className='text-justify'>
                        The Kingdom of Sikkim was founded by the Namgyal 
                        dynasty in the 17th century. It was ruled by a Buddhist priest-king known as the Chogyal. It became a princely 
                        state of British India in 1890. After 1947, Sikkim continued its protectorate status with the Republic of India. 
                        It enjoyed the highest literacy rate and per capita income among Himalayan states. In 1973, anti-royalist riots 
                        took place in front of the Chogyal's palace. In 1975, the monarchy was deposed by the people. A referendum in 1975 
                        led to Sikkim joining India as its 22nd state. 
                    </p>
                    <p className='text-justify'>
                        Modern Sikkim is a multiethnic and multilingual Indian state. 
                        The official languages of the state are English, Nepali, Sikkimese and Lepcha. Additional official languages include 
                        Gurung, Limbu, Magar, Mukhia, Newari, Rai, Sherpa and Tamang for the purpose of preservation of culture and tradition 
                        in the state. English is taught in schools and used in government documents. The predominant religions are Hinduism 
                        and Vajrayana Buddhism. Sikkim's economy is largely dependent on agriculture and tourism, and as of 2014 the state had 
                        the third-smallest GDP among Indian states, although it is also among the fastest-growing. It is one of the top choice 
                        for tourist in India.
                    </p>
                    <p className='text-justify'>
                        To flourish tourism in the state the Department of Tourism and Civil Aviation has the key reponsibility. The Department
                        is responsible for attracting tourism by identify the spot for tourism, making place hospitable for tourist,
                        celebrating festival, conducting awareness program amongs local and to assists guest for registration and other purposes.
                    </p>
                </div>
            </div>
        </div>

    </section>
  )
}

export default AboutUs 