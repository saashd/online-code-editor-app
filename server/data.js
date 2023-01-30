exports.codeBlocks = [
    {
        title: 'Test',
        code: `console.log("hello world")); // click on submit button to test"`,
        description: "This is a test block.",
    },
    {
        title: 'Reverse a String',
        code: `function reverseString(str) {
  // write code here
}

console.log(reverseString("hello")); // should return "olleh"
`,
        description: "The developer should implement the reverseString function that reverses a string and returns the result.",
    },
    {
        title: 'Check Palindrome',
        code: `function isPalindrome(str) {
  // write code here
}

console.log(isPalindrome("racecar")); // should return true
console.log(isPalindrome("hello")); // should return false
`,
        description: "The developer should implement the isPalindrome function that checks if a string is a palindrome and returns a boolean."
    },
    {
        title: 'Sum of Array Elements',
        code: `function sumArray(arr) {
  // write code here
}

console.log(sumArray([1, 2, 3, 4])); // should return 10
`,
        description: "The developer should implement the sumArray function that takes an array of numbers and returns the sum of its elements.",
    },
    {
        title: 'Longest Common Prefix',
        code: `function longestCommonPrefix(strs) {
  // write code here
}

console.log(longestCommonPrefix(["hello", "helmet", "helix"])); // should return "hel"
`,
        description: "The developer should implement the longestCommonPrefix function that takes an array of strings and returns the longest common prefix.",
    },
];


exports.codeBlocksSolutions = [
    {
        title: 'Test',
        solution: `console.log("hello world")); // click on submit button to test"`
    },
    {
        title: 'Reverse a String',
        solution: `function reverseString(str){return str.split('').reverse().join('');}console.log(reverseString("hello")); // should return "olleh"`
    },
    {
        title: 'Check Palindrome',
        solution: `function isPalindrome(str) {
  let reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome("racecar")); // should return true
console.log(isPalindrome("hello")); // should return false
`
    },
    {
        title: 'Sum of Array Elements',
        solution: `function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

console.log(sumArray([1, 2, 3, 4])); // should return 10
`
    },
    {
        title: 'Longest Common Prefix',
        solution: `function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) return '';
    }
  }
  return prefix;
}

console.log(longestCommonPrefix(["hello", "helmet", "helix"])); // should return "hel"
`
    },
];

