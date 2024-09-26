let employees = [];
let idCounter = 1;

// Salary calculation logic (e.g., 10% bonus for manager)
const calculateSalary = (position, baseSalary) => {
  if (position === 'Manager') {
    return baseSalary * 1.1; // 10% bonus for managers
  }
  return baseSalary;
};

// Get all employees
const getAllEmployees = (req, res) => {
  res.json(employees);
};

// Get a single employee by ID
const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id == id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// Create a new employee
const createEmployee = (req, res) => {
  const { name, position, baseSalary } = req.body;
  if (!name || !position || !baseSalary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const employee = {
    id: idCounter++,
    name,
    position,
    baseSalary,
    totalSalary: calculateSalary(position, baseSalary),
  };
  employees.push(employee);
  res.status(201).json(employee);
};

// Update an employee
const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, position, baseSalary } = req.body;
  const employeeIndex = employees.findIndex(emp => emp.id == id);

  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees[employeeIndex] = {
    ...employees[employeeIndex],
    name: name || employees[employeeIndex].name,
    position: position || employees[employeeIndex].position,
    baseSalary: baseSalary || employees[employeeIndex].baseSalary,
    totalSalary: calculateSalary(position || employees[employeeIndex].position, baseSalary || employees[employeeIndex].baseSalary),
  };

  res.json(employees[employeeIndex]);
};

// Delete an employee
const deleteEmployee = (req, res) => {
  const { id } = req.params;
  const employeeIndex = employees.findIndex(emp => emp.id == id);

  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(employeeIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  calculateSalary
};
