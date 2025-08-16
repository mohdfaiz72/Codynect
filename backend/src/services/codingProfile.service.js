import axios from "axios";

const getTitleByBadge = (badgeData, preferMax = false) => {
  const badges = Array.isArray(badgeData)
    ? badgeData
    : badgeData
    ? [badgeData]
    : [];
  if (badges.length === 0) return "";
  if (preferMax) {
    const guardian = badges.find((b) =>
      b.name.toLowerCase().includes("guardian")
    );
    if (guardian) return guardian.name;
  }
  const knight = badges.find(
    (b) => b.name.toLowerCase().includes("knight") && !b.expired
  );
  if (knight) return knight.name;
  return "";
};
export const fetchLeetCodeData = async (username) => {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
          contestBadge {
            name
            expired
          }
        }
        userContestRanking(username: $username) {
          rating
        }
        userContestRankingHistory(username: $username) {
          rating
        }
      }
    `;
    const variables = { username };
    const response = await axios.post(
      "https://leetcode.com/graphql",
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );
    const data = response.data.data;
    const user = data.matchedUser;
    if (!user) {
      throw new Error("LeetCode user not found");
    }
    const totalSolvedObj = user.submitStats.acSubmissionNum.find(
      (item) => item.difficulty === "All"
    );
    const totalSolved = totalSolvedObj ? totalSolvedObj.count : 0;
    console.log(totalSolved);
    const currentTitle = getTitleByBadge(user.contestBadge, false);
    const maxTitle = getTitleByBadge(user.contestBadge, true);
    const currentRating = data.userContestRanking?.rating || 0;
    const historyRatings = (data.userContestRankingHistory || [])
      .map((c) => c.rating)
      .filter(Boolean);
    const maxRating = historyRatings.length
      ? Math.max(...historyRatings, currentRating)
      : currentRating;
    return {
      platform: "LeetCode",
      username: user.username,
      currentTitle,
      maxTitle,
      currentRating: Math.round(currentRating),
      maxRating: Math.round(maxRating),
      solvedCount: totalSolved,
      link: `https://leetcode.com/${username}`,
    };
  } catch (err) {
    console.error("Error fetching LeetCode profile:", err.message);
    throw new Error("Failed to fetch LeetCode profile");
  }
};

const capitalizeTitle = (title) => {
  if (!title) return "";
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const fetchCodeforcesData = async (username) => {
  try {
    const userInfoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    if (userInfoRes.data.status !== "OK") {
      throw new Error("Codeforces user not found");
    }
    const user = userInfoRes.data.result[0];
    const submissionsRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`
    );
    const submissions = submissionsRes.data.result;
    const solvedSet = new Set();
    submissions.forEach((sub) => {
      if (sub.verdict === "OK") {
        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });
    const solvedCount = solvedSet.size;

    return {
      platform: "Codeforces",
      username: user.handle,
      currentRating: user.rating || 0,
      maxRating: user.maxRating || 0,
      currentTitle: capitalizeTitle(user.rank) || "",
      maxTitle: capitalizeTitle(user.maxRank) || "",
      solvedCount,
      link: `https://codeforces.com/profile/${username}`,
    };
  } catch (err) {
    console.error("Error fetching Codeforces profile:", err.message);
    throw new Error("Failed to fetch Codeforces profile");
  }
};
