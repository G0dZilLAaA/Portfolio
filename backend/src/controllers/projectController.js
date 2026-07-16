const projects = [
    {
        id: 1,
        title: "AI Driven Test Case Generator",
        category: "Artificial Intelligence",
        status: "Live",
    },
    {
        id: 2,
        title: "Lunar Lander AI",
        category: "Reinforcement Learning",
        status: "Live",
    },
    {
        id: 3,
        title: "Library Management System",
        category: "Java",
        status: "Offline",
    },
];

const getProjects = (req, res) => {
    res.status(200).json(projects);
};
const createProject = (req, res) => {
    const newProject = {
        id: Date.now(),
        ...req.body,
    };

    projects.push(newProject);

    res.status(201).json(newProject);
};

export {
    getProjects,
    createProject,
};