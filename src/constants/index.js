import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    // meta,
    // starbucks,
    // tesla,
    // shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "ስለኛ",
    },
    {
      id: "work",
      title: "ስለኛ ማወቅ ሚፈልጉት",
    },
    {
      id: "contact",
      title: "እኛን ለማግኘት",
    },
    
  ];

  
  
  const services = [
    {
      title: "ብክነትን መቆጣጠር",
      icon: web,
    },
    {
      title: "ባሉበት ሆነው መስጠት ይቻላል",
      icon: mobile,
    },
    {
      title: "ቀላል እና ምቹ እንዲሁም ፈጣን",
      icon: backend,
    },
    {
      title: "የእርስወ ትንሽ ስጦታ የሌሎች ሰወችን ህይወት ትቀይራለች",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "የተቸገሩትን ረድተናል",
      company_name: "ባህርዳር",
      icon: "Ethiopia.jpg",
      iconBg: "#383E56",
      
      points: [
        "ሊባክን የነበረን ሃብት በማሰባሰብ ጎዳና ላይ ምግብ ለሚያስፈልጋቸው ሰወች ማድረስ ቺለናል ",
        "በድንገተኛ አደጋ ቺግር ላይ ለወደቁ ወገኖች በአካል መሄድ ለማይችል ወገናቸው ባለበት እርዳታ እንዲሰጥ ማድረግ ችለናል",
       
      ],
    },
    {
      title: "ብክነትን ቀንሰናል",
      company_name: "ባህርዳር",
      icon: "Ethiopia.jpg",
      iconBg: "#E6DEDD",
      //date: "Jan 2021 - Feb 2022",
      points: [
        "ሆቴል ላይ ፣ ሬስቶራንት ላይ እና የተለያዩ ዝግጅቶች ላይ ሊባክን የነበርን ምግብ ማዳን ችለናል",
        "አገልግሎት የማይሰጡ የበት ኡስጥ ቁሳቁሶችን አገልግሎት ሊሰጡ ወደሚችሉበት ቦታ እንዲለገሱ አድርገን ብክነትን መቆጣጠር ችለናል",
        
      ],
    },
    {
      title: "ኢትዮጵያዊ መልካምነትና መረዳዳት ባህል ወደዘመናዊው አለምም አብሮ እንዲሻገር ማድረግ ችለናል",
      company_name: "ባህርዳር",
      icon: "Ethiopia.jpg",
      iconBg: "#383E56",
      //date: "Jan 2022 - Jan 2023",
      points: [
        "በዘመናዊቷ ኢትዮጵያ የመረዳዳት ባህላችን አብሮ ይዘምን ዘንድ ይህ ሲስተም ታላቃበርክቶ አድርጓል ፣ እያደረገም ይገኛል፣ ወደፊትም ያደርጋል",
        "ባሉበት እርዳታን አድረግ ጊዜንና ገንዘብን መቆጠብ እንዲቻል ማድረግ ችሏል ሲስተሙ",
       
      ],
    },
    {
      title: "ብክነትን መቆጣጠርና ሊባክን የነበረን ረሶርሰ በጣም ለሚያስፈልጋቸው አካላት መለገስ እንዲቻል አድርገናል",
      company_name: "ባህርዳር",
      icon: "Ethiopia.jpg",
      iconBg: "#E6DEDD",
      //date: "Jan 2023 - Present",
      points: [
        "ፈጣን ቀላል እና ምቹ ትላትፎርም",
        "ባሉበት ሆነው የትም ለበጎነት መድረስ ሚችሉበት",
        "በስልክወ አልያም በኮምፒውተርወ ካሉበት ወደፈለጉት በሰአታት ዉስጥ ለሰወች መድረስ ሚችሉበት",
        "በአለም አቀፍ ደረጃ ስጋት የሆነውን ብክነትን መቆጣጠር የሚችሉበት",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };