export const posts = [
  {
    id: "post1",
    type: "Showcase",
    title: "Personal Portfolio Website 🚀",
    description: "Built with React and Tailwind, deployed on Vercel.",
    image: "/images/portfolio.png",
    techStack: ["React", "Tailwind", "Vercel"],
    link: "https://myportfolio.com",
    author: "Faiz",
    likes: 20,
    comments: [
      { user: "Ali", text: "Looks amazing!" },
      { user: "Sara", text: "Clean UI 😍" },
    ],
    createdAt: "2025-07-18T12:00:00Z",
  },

  {
    id: "post2",
    type: "Snippet",
    title: "Throttle Function in JS",
    code: `function throttle(func, limit) {
  let inThrottle;
  return function() {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`,
    language: "JavaScript",
    author: "Faiz",
    likes: 14,
    comments: [{ user: "Mehak", text: "Really useful 🔥" }],
    createdAt: "2025-07-18T13:00:00Z",
  },

  {
    id: "post3",
    type: "Achievement",
    title: "Placed at Google 🎉",
    description: "SDE @Google | 20 LPA | Never give up! 💪",
    tags: ["Google", "Placement"],
    author: "Faiz",
    likes: 44,
    comments: [
      { user: "Yash", text: "Massive congrats! 🥳" },
      { user: "Zoya", text: "Proud moment 🔥" },
    ],
    createdAt: "2025-07-17T15:00:00Z",
  },

  {
    id: "post4",
    type: "Job Post",
    title: "Frontend Developer - React",
    company: "CRED",
    location: "Remote",
    description: "Join our React team to build fintech UI at scale.",
    applyLink: "https://careers.cred.club",
    tags: ["Frontend", "React"],
    author: "CRED HR",
    likes: 10,
    comments: [{ user: "Faiz", text: "Sharing this with my network!" }],
    createdAt: "2025-07-16T10:00:00Z",
  },

  {
    id: "post5",
    type: "Hiring",
    title: "Zerodha is Hiring UI/UX Designers 🎨",
    company: "Zerodha",
    description: "We're revamping Kite UI, join us!",
    applyLink: "mailto:careers@zerodha.com",
    tags: ["Design", "Figma"],
    author: "Zerodha Team",
    likes: 18,
    comments: [{ user: "Ravi", text: "Applied just now!" }],
    createdAt: "2025-07-15T09:00:00Z",
  },

  {
    id: "post6",
    type: "Challenge",
    title: "30-Day JavaScript Challenge 🚀",
    description: "Join us and complete daily JS tasks! Tag: #30DaysOfJS",
    tags: ["Challenge", "JavaScript"],
    author: "Faiz",
    likes: 25,
    comments: [{ user: "Simran", text: "I'm in 💪" }],
    createdAt: "2025-07-14T11:00:00Z",
  },

  {
    id: "post7",
    type: "Poll",
    question: "Which state management do you prefer in React?",
    options: [
      { label: "Redux Toolkit", votes: 30 },
      { label: "Zustand", votes: 25 },
      { label: "Context API", votes: 15 },
      { label: "Jotai", votes: 5 },
    ],
    author: "Faiz",
    likes: 8,
    comments: [{ user: "Shreya", text: "Zustand fan here ✌️" }],
    createdAt: "2025-07-13T08:00:00Z",
  },

  {
    id: "post8",
    type: "Q&A",
    question: "What is difference between `useMemo` and `useCallback`?",
    answer: "",
    tags: ["React", "Hooks"],
    author: "Faiz",
    likes: 6,
    comments: [{ user: "Irfan", text: "Waiting for community answers!" }],
    createdAt: "2025-07-12T19:00:00Z",
  },

  {
    id: "post9",
    type: "Tech Opinion",
    title: "Tailwind is the new Bootstrap? 🤔",
    description: "Utility-first approach > component bloat. What’s your take?",
    author: "Faiz",
    likes: 19,
    comments: [
      { user: "Rehan", text: "Tailwind FTW 🔥" },
      { user: "Amira", text: "Still love Bootstrap though" },
    ],
    createdAt: "2025-07-12T17:00:00Z",
  },

  {
    id: "post10",
    type: "Open Source",
    title: "Contribute to Codynect 🚀",
    description: "Open sourced our dev-social platform. PRs welcome 🙌",
    repoLink: "https://github.com/faiz/codynect",
    tags: ["Open Source", "React"],
    author: "Faiz",
    likes: 27,
    comments: [{ user: "Anjali", text: "Starred and forked!" }],
    createdAt: "2025-07-11T16:00:00Z",
  },
];
