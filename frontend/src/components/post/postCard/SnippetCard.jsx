import CodeBlock from "./CodeBlock";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PostTags from "./PostTags";

const SnippetCard = () => {
  const snippet = {
    id: "post42",
    type: "Snippet",
    title: "Ways to Express an Integer as Sum of Powers",
    link: "https://leetcode.com/problems/ways-to-express-an-integer-as-sum-of-powers/",
    intuition:
      "We need to find the number of ways to represent `n` as a sum of unique integers raised to the power `x`. This is similar to the classic subset sum problem but with an extra constraint on the form of numbers.",
    approach:
      "Precompute all possible powers ≤ n, then use dynamic programming where `dp[i]` represents the number of ways to sum to `i`. Iterate over each power and update `dp` in reverse to avoid counting duplicates.",
    timeComplexity: "O(m * n), where m is the number of powers ≤ n",
    spaceComplexity: "O(n)",
    institution: "LeetCode",
    language: "cpp",
    tags: ["Dynamic Programming", "Combinatorics", "Math"],
    code: `class Solution {
public:
    using i64 = long long;
    const int MOD = 1e9+7;
    int numberOfWays(int n, int x) {
        vector<int> nums = {0};
        for (int i = 1; pow(i, x) <= n; i++) {
            nums.push_back((int)pow(i, x));
        }
        vector<i64> dp(n+1, 0);
        dp[0] = 1;
        for (int i = 1; i < nums.size(); i++) {
            for (int j = n; j >= nums[i]; j--) {
                dp[j] = (dp[j] + dp[j - nums[i]]) % MOD;
            }
        }
        return dp[n];
    }
};`,
  };

  return (
    <div className="bg-fixed border border-amber-700 p-4 rounded-lg bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 shadow-md">
      <PostHeader />

      {/* Title + Link */}
      <div className="m-3 space-y-1">
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">🎯 Problem:</span>{" "}
          {snippet.title}
        </p>

        {/* Intuition */}
        {snippet.intuition && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🧠 Intuition:</span>{" "}
            {snippet.intuition}
          </p>
        )}

        {/* Approach */}
        {snippet.approach && (
          <p className="text-sm text-slate-300">
            <span className="font-medium text-amber-300">🚀 Approach:</span>{" "}
            {snippet.approach}
          </p>
        )}

        {/* Meta Info */}
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">
            📊 Time Complexity:
          </span>{" "}
          {snippet.timeComplexity}
        </p>
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">
            📦 Space Complexity:
          </span>{" "}
          {snippet.spaceComplexity}
        </p>
        <p className="text-sm text-slate-300">
          <span className="font-medium text-amber-300">⚙️ Language:</span>{" "}
          {snippet.language}
        </p>

        {snippet.link && (
          <p className="text-sm text-blue-400">
            🔗{" "}
            <a
              href={snippet.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:underline"
            >
              View Problem
            </a>
          </p>
        )}

        {/* Tags */}
        <PostTags tags={snippet.tags} />
      </div>
      {/* Code */}
      <CodeBlock code={snippet.code} language={snippet.language} />
      <hr className="border-amber-700 mb-3" />
      <PostAction />
    </div>
  );
};

export default SnippetCard;
