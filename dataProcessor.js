/**
 * Data Processor - Refactored for clarity
 */

// Category thresholds
const CATEGORY_THRESHOLDS = {
  BRONZE: 0,
  SILVER: 100,
  GOLD: 500,
  PLATINUM: 1000
};

const MINIMUM_AGE = 18;
const DEFAULT_EMAIL = 'no-email@example.com';

/**
 * Checks if a user meets the eligibility criteria
 */
function isEligibleUser(user) {
  return user.age !== undefined &&
         user.age !== null &&
         user.age >= MINIMUM_AGE &&
         user.active === true &&
         user.name &&
         user.name.length > 0;
}

/**
 * Calculates total amount spent from purchases
 */
function calculateTotalSpent(purchases) {
  if (!purchases) {
    return 0;
  }

  return purchases
    .filter(purchase => purchase.amount > 0)
    .reduce((total, purchase) => total + purchase.amount, 0);
}

/**
 * Determines user category based on total spending
 */
function determineCategory(totalSpent) {
  if (totalSpent >= CATEGORY_THRESHOLDS.PLATINUM) {
    return 'platinum';
  }
  if (totalSpent >= CATEGORY_THRESHOLDS.GOLD) {
    return 'gold';
  }
  if (totalSpent >= CATEGORY_THRESHOLDS.SILVER) {
    return 'silver';
  }
  return 'bronze';
}

/**
 * Transforms a user object into processed format
 */
function transformUser(user) {
  const totalSpent = calculateTotalSpent(user.purchases);
  const category = determineCategory(totalSpent);

  return {
    id: user.id,
    name: user.name,
    age: user.age,
    totalSpent,
    category,
    email: user.email || DEFAULT_EMAIL
  };
}

/**
 * Processes user data and returns eligible users with calculated metrics
 */
function processUserData(data) {
  return data
    .filter(isEligibleUser)
    .map(transformUser);
}

module.exports = { processUserData };
