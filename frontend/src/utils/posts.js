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
    title: "Ways to Express an Integer as Sum of Powers",
    institution: "LeetCode - Problem 2787",
    approach:
      "Dynamic Programming (1D DP array) — Precompute all possible powers ≤ n, then use a knapsack-style DP to count ways modulo 1e9+7.",
    code: `class Solution {
public:
    using i64 = long long;
    const int MOD = 1e9+7;

    int numberOfWays(int n, int x) {
        // Precompute all powers of integers up to n
        vector<int> nums = {0};
        for (int i = 1; (int)pow(i, x) <= n; i++) {
            nums.push_back((int)pow(i, x));
        }

        // dp[j] = number of ways to sum to j using available powers
        vector<i64> dp(n + 1, 0);
        dp[0] = 1;

        for (int i = 1; i < nums.size(); i++) {
            for (int j = n; j >= nums[i]; j--) {
                dp[j] = (dp[j] + dp[j - nums[i]]) % MOD;
            }
        }

        return dp[n];
    }
};`,
    language: "cpp",
    tags: ["Dynamic Programming", "Math", "Combinatorics"],
    author: "AlgoMaster",
    createdAt: "2025-08-12T10:20:00Z",
    likes: 89,
    comments: [
      {
        user: "DPWizard",
        text: "Nice use of 1D DP to optimize space complexity.",
      },
      { user: "MathGeek", text: "The precomputation step is key here." },
    ],
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
    type: "Jobs",
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
  {
    id: "thought01",
    type: "Thought",
    title: "Embracing Remote Work",
    description:
      "Remote work has transformed how I approach productivity and work-life balance. Loving the flexibility! 🌍✨",
    author: "Alex",
    likes: 15,
    comments: [
      { user: "Sam", text: "Absolutely agree! Remote work is the future." },
      { user: "Jamie", text: "Flexibility is everything these days." },
    ],
    createdAt: "2025-08-10T09:30:00Z",
  },
  {
    id: "thought02",
    type: "Thought",
    title: "JavaScript Async Patterns",
    description:
      "Finally got a good grip on async/await and promises. Async code is no longer a nightmare! 💻👍",
    author: "Maya",
    likes: 34,
    comments: [
      { user: "Chris", text: "Great tips! Thanks for sharing." },
      { user: "Nina", text: "Async code is so much cleaner now." },
    ],
    createdAt: "2025-08-09T18:45:00Z",
  },
];
