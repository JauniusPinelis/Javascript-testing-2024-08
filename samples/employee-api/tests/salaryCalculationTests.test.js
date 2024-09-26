const { calculateSalary } = require('../controllers/employeeController');

describe('Salary Calculation', () => {
  it('should add 10% bonus for managers', () => {
    const salary = calculateSalary('Manager', 5000);
    expect(salary).toBe(5500);
  });

  it('should not add bonus for other positions', () => {
    const salary = calculateSalary('Developer', 5000);
    expect(salary).toBe(5000);
  });
});
