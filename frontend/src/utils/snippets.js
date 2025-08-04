// utils/snippets.js (sample dummy data)

export const snippets = [
  {
    id: 1,
    title: "Binary Search in JavaScript",
    description: "Efficient way to search a sorted array.",
    language: "JavaScript",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    institution: "LeetCode",
    importantPoints: [
      "Array must be sorted.",
      "Returns index if found, -1 otherwise.",
    ],
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    createdAt: "2025-07-18T09:00:00Z",
  },
  {
    id: 2,
    title: "Two Sum using Map",
    description: "Use HashMap for efficient lookup.",
    language: "Python",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    institution: "InterviewBit",
    importantPoints: [
      "Avoid nested loops using hashmap.",
      "Check complement in map.",
    ],
    code: `def two_sum(nums, target):
  hashmap = {}
  for i, num in enumerate(nums):
    diff = target - num
    if diff in hashmap:
      return [hashmap[diff], i]
    hashmap[num] = i`,
    createdAt: "2025-07-17T17:30:00Z",
  },
];
