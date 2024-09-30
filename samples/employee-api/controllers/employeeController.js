const pool = require('../__mocks__/db'); // Import the database connection
const calculateSalary = (position, baseSalary) => {
  if (position === 'Manager') {
    return baseSalary * 1.1; // 10% bonus for managers
  }
  return baseSalary;
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
};

// Get a single employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee', error: err.message });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  const { name, position, baseSalary } = req.body;
  if (!name || !position || !baseSalary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const totalSalary = calculateSalary(position, baseSalary);

  try {
    
    const result = await pool.query(
      'INSERT INTO employees (name, position, baseSalary, totalSalary) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, position, baseSalary, totalSalary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee', error: err.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position, baseSalary } = req.body;

  try {
    // Fetch the current employee data
    const currentEmployee = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    if (currentEmployee.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Set updated values or keep the existing ones
    const updatedName = name || currentEmployee.rows[0].name;
    const updatedPosition = position || currentEmployee.rows[0].position;
    const updatedBaseSalary = baseSalary || currentEmployee.rows[0].baseSalary;
    const updatedTotalSalary = calculateSalary(updatedPosition, updatedBaseSalary);

    // Update employee in the database
    const result = await pool.query(
      'UPDATE employees SET name = $1, position = $2, baseSalary = $3, totalSalary = $4 WHERE id = $5 RETURNING *',
      [updatedName, updatedPosition, updatedBaseSalary, updatedTotalSalary, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  calculateSalary
};
