/**
 * Test file to verify refactored code maintains same behavior
 */

const { processUserData } = require('./dataProcessor');

// Test data
const testData = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
    active: true,
    email: 'john@example.com',
    purchases: [
      { amount: 50 },
      { amount: 75 }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 17, // Under 18, should be filtered out
    active: true,
    email: 'jane@example.com',
    purchases: [{ amount: 200 }]
  },
  {
    id: 3,
    name: 'Bob Johnson',
    age: 30,
    active: false, // Inactive, should be filtered out
    email: 'bob@example.com',
    purchases: [{ amount: 300 }]
  },
  {
    id: 4,
    name: 'Alice Williams',
    age: 35,
    active: true,
    purchases: [
      { amount: 200 },
      { amount: 350 }
    ]
    // No email provided
  },
  {
    id: 5,
    name: 'Charlie Brown',
    age: 40,
    active: true,
    email: 'charlie@example.com',
    purchases: [
      { amount: 600 },
      { amount: 500 }
    ]
  },
  {
    id: 6,
    name: '', // Empty name, should be filtered out
    age: 28,
    active: true,
    purchases: [{ amount: 100 }]
  },
  {
    id: 7,
    name: 'Diana Prince',
    age: null, // Null age, should be filtered out
    active: true,
    purchases: [{ amount: 100 }]
  }
];

// Run the test
console.log('Testing refactored processUserData function...\n');
const result = processUserData(testData);

console.log('Results:');
console.log(JSON.stringify(result, null, 2));

// Verify expected results
console.log('\n--- Verification ---');
console.log(`Total processed users: ${result.length} (expected: 3)`);
console.log(`User 1 category: ${result[0].category} (expected: bronze, total: ${result[0].totalSpent})`);
console.log(`User 2 category: ${result[1].category} (expected: silver, total: ${result[1].totalSpent})`);
console.log(`User 2 email: ${result[1].email} (expected: ${testData[3].email || 'no-email@example.com'})`);
console.log(`User 3 category: ${result[2].category} (expected: platinum, total: ${result[2].totalSpent})`);

// Expected output:
// - John Doe: bronze (125 total)
// - Alice Williams: silver (550 total, no-email@example.com)
// - Charlie Brown: platinum (1100 total)
