export type User = {
    [key: string]: any
    avatar?: string
    coverImg?: string
    description?: string
    email?: string
    followers?: string
    id: string
    jobtitle?: string
    location?: string
    name?: string
    posts?: string
    role?: string
    username?: string
}

export const mockUser: User = {
    avatar: "/avatars/3.png",
    coverImg: "/placeholders/covers/5.jpg",
    description: "Passionate Building And Breaking Things / Hooper / Coder / World Traveler.",
    email: "binaryballer@example.com",
    followers: "813",
    id: "1",
    jobtitle: "Software Engineer",
    location: "Tampa, FL",
    name: "Shaquille Mandy",
    posts: "23",
    role: "admin",
    username: "binaryballer",
}

export const mockUsers: User[] = [
    {
        avatar: "/avatars/1.png",
        coverImg: "/placeholders/covers/1.jpg",
        description: "Passionate about digital marketing trends and social media strategies.",
        email: "alice.johnson@example.com",
        followers: "1234",
        id: "1",
        jobtitle: "Digital Marketing Manager",
        location: "Tampa, FL",
        name: "Alice Johnson",
        posts: "15",
        role: "admin",
        username: "AliceMktg",
    },
    {
        avatar: "/avatars/2.png",
        coverImg: "/placeholders/covers/2.jpg",
        description: "Dedicated software engineer with a knack for creating intuitive user experiences.",
        email: "bob.smith@example.com",
        followers: "567",
        id: "2",
        jobtitle: "Senior Software Engineer",
        location: "Techville",
        name: "Bob Smith",
        posts: "10",
        role: "subscriber",
        username: "DevBob",
    },
    {
        avatar: "/avatars/3.png",
        coverImg: "/placeholders/covers/3.jpg",
        description: "Expert in managing diverse projects with a focus on efficiency and collaboration.",
        email: "cynthia.ray@example.com",
        followers: "890",
        id: "3",
        jobtitle: "Project Manager",
        location: "Riverbank City",
        name: "Cynthia Ray",
        posts: "20",
        role: "customer",
        username: "CynthiaPM",
    },
    {
        avatar: "/avatars/4.png",
        coverImg: "/placeholders/covers/4.jpg",
        description: "Leading creative campaigns with innovative ideas and a modern approach.",
        email: "daniel.green@example.com",
        followers: "450",
        id: "4",
        jobtitle: "Creative Director",
        location: "Uptown",
        name: "Daniel Green",
        posts: "9",
        role: "admin",
        username: "CreativeDan",
    },
    {
        avatar: "/avatars/5.png",
        coverImg: "/placeholders/covers/5.jpg",
        description: "Analyzing tech trends and providing insightful IT solutions.",
        email: "evan.turner@example.com",
        followers: "300",
        id: "5",
        jobtitle: "IT Analyst",
        location: "Greenwood",
        name: "Evan Turner",
        posts: "7",
        role: "customer",
        username: "EvanTech",
    },
    {
        avatar: "/avatars/1.png",
        coverImg: "/placeholders/covers/6.jpg",
        description: "Dedicated to creating a positive work environment and fostering professional growth.",
        email: "fiona.grant@example.com",
        followers: "215",
        id: "6",
        jobtitle: "Human Resources Coordinator",
        location: "Hilltop",
        name: "Fiona Grant",
        posts: "14",
        role: "subscriber",
        username: "FionaHR",
    },
    {
        avatar: "/avatars/2.png",
        coverImg: "/placeholders/covers/1.jpg",
        description: "Strategizing new business opportunities and building strong client relationships.",
        email: "george.hall@example.com",
        followers: "541",
        id: "7",
        jobtitle: "Business Development Manager",
        location: "Laketown",
        name: "George Hall",
        posts: "19",
        role: "admin",
        username: "GeorgeBiz",
    },
    {
        avatar: "/avatars/3.png",
        coverImg: "/placeholders/covers/2.jpg",
        description: "Expert in client management and driving sales growth.",
        email: "hannah.scott@example.com",
        followers: "622",
        id: "8",
        jobtitle: "Account Executive",
        location: "Riverfield",
        name: "Hannah Scott",
        posts: "23",
        role: "subscriber",
        username: "HannahSales",
    },
    {
        avatar: "/avatars/4.png",
        coverImg: "/placeholders/covers/3.jpg",
        description: "Exploring the frontiers of science and technology.",
        email: "isaac.newton@example.com",
        followers: "982",
        id: "9",
        jobtitle: "Research Scientist",
        location: "Techton",
        name: "Isaac Newton",
        posts: "30",
        role: "customer",
        username: "IsaacSci",
    },
    {
        avatar: "/avatars/5.png",
        coverImg: "/placeholders/covers/4.jpg",
        description: "Creating visually stunning designs that speak volumes.",
        email: "julia.cruz@example.com",
        followers: "765",
        id: "10",
        jobtitle: "Graphic Designer",
        location: "CreativeVille",
        name: "Julia Cruz",
        posts: "27",
        role: "subscriber",
        username: "JuliaDesigns",
    },
    {
        avatar: "/avatars/1.png",
        coverImg: "/placeholders/covers/5.jpg",
        description: "Ensuring seamless operations and efficient management processes.",
        email: "kevin.lopez@example.com",
        followers: "436",
        id: "11",
        jobtitle: "Operations Manager",
        location: "IndustryHub",
        name: "Kevin Lopez",
        posts: "14",
        role: "admin",
        username: "KevinOps",
    },
    {
        avatar: "/avatars/2.png",
        coverImg: "/placeholders/covers/6.jpg",
        description: "Crafting compelling content that captivates audiences.",
        email: "laura.martin@example.com",
        followers: "390",
        id: "12",
        jobtitle: "Content Writer",
        location: "Wordtown",
        name: "Laura Martin",
        posts: "21",
        role: "subscriber",
        username: "LauraWrites",
    },
    {
        avatar: "/avatars/3.png",
        coverImg: "/placeholders/covers/1.jpg",
        description: "Transforming data into insights and strategic actions.",
        email: "miguel.gonzalez@example.com",
        followers: "523",
        id: "13",
        jobtitle: "Data Analyst",
        location: "DataCity",
        name: "Miguel Gonzalez",
        posts: "18",
        role: "customer",
        username: "MiguelData",
    },
    {
        avatar: "/avatars/4.png",
        coverImg: "/placeholders/covers/2.jpg",
        description: "Designing intuitive and engaging user experiences.",
        email: "nina.patel@example.com",
        followers: "689",
        id: "14",
        jobtitle: "UI/UX Designer",
        location: "DesignTown",
        name: "Nina Patel",
        posts: "26",
        role: "admin",
        username: "NinaDesign",
    },
    {
        avatar: "/avatars/5.png",
        coverImg: "/placeholders/covers/3.jpg",
        description: "Coordinating marketing efforts to maximize brand exposure.",
        email: "oscar.wallace@example.com",
        followers: "412",
        id: "15",
        jobtitle: "Marketing Coordinator",
        location: "Marketville",
        name: "Oscar Wallace",
        posts: "17",
        role: "subscriber",
        username: "OscarMktg",
    },
    {
        avatar: "/avatars/1.png",
        coverImg: "/placeholders/covers/4.jpg",
        description: "Directing financial strategies for sustainable growth.",
        email: "pamela.wright@example.com",
        followers: "530",
        id: "16",
        jobtitle: "Chief Financial Officer",
        location: "FinanceCity",
        name: "Pamela Wright",
        posts: "22",
        role: "admin",
        username: "PamelaCFO",
    },
    {
        avatar: "/avatars/2.png",
        coverImg: "/placeholders/covers/5.jpg",
        description: "Maintaining robust and secure network infrastructures.",
        email: "quentin.ramirez@example.com",
        followers: "345",
        id: "17",
        jobtitle: "Network Administrator",
        location: "Netville",
        name: "Quentin Ramirez",
        posts: "12",
        role: "customer",
        username: "QuentinNet",
    },
    {
        avatar: "/avatars/3.png",
        coverImg: "/placeholders/covers/6.jpg",
        description: "Building and maintaining positive public images for businesses.",
        email: "rachel.kim@example.com",
        followers: "601",
        id: "18",
        jobtitle: "Public Relations Specialist",
        location: "MediaCity",
        name: "Rachel Kim",
        posts: "29",
        role: "subscriber",
        username: "RachelPR",
    },
    {
        avatar: "/avatars/4.png",
        coverImg: "/placeholders/covers/1.jpg",
        description: "Leading sales teams to achieve outstanding results.",
        email: "steven.ford@example.com",
        followers: "489",
        id: "19",
        jobtitle: "Sales Director",
        location: "SalesTown",
        name: "Steven Ford",
        posts: "33",
        role: "admin",
        username: "StevenSales",
    },
    {
        avatar: "/avatars/5.png",
        coverImg: "/placeholders/covers/2.jpg",
        description: "Overseeing product development from concept to launch.",
        email: "tracy.nguyen@example.com",
        followers: "556",
        id: "20",
        jobtitle: "Product Manager",
        location: "InnovationHub",
        name: "Tracy Nguyen",
        posts: "16",
        role: "subscriber",
        username: "TracyProd",
    },
]
