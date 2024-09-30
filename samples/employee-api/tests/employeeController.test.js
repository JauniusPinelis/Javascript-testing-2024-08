// employeeController.test.js
const pool = require('./db');
const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, calculateSalary } = require('./employeeController');

jest.mock('./db'); // Mock the database connection

describe('Employee Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('getAllEmployees', () => {
    it('should return all employees', async () => {
      //Arrange
      const mockEmployees = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
      pool.query.mockResolvedValueOnce({ rows: mockEmployees });

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      //Action
      await getAllEmployees(req, res);
      //Assert
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM employees');
      expect(res.json).toHaveBeenCalledWith(mockEmployees);
    });

    it('should return 500 if there is an error', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB Error'));

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching employees',
        error: 'DB Error',
      });
    });
  });

  describe('getEmployeeById', () => {
    it('should return a single employee by id', async () => {
      const mockEmployee = { id: 1, name: 'John Doe' };
      pool.query.mockResolvedValueOnce({ rows: [mockEmployee] });

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM employees WHERE id = $1', [1]);
      expect(res.json).toHaveBeenCalledWith(mockEmployee);
    });

    it('should return 404 if employee is not found', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 if there is an error', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB Error'));

      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching employee',
        error: 'DB Error',
      });
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      const mockEmployee = { id: 1, name: 'John Doe', position: 'Developer', baseSalary: 50000, totalSalary: 50000 };
      pool.query.mockResolvedValueOnce({ rows: [mockEmployee] });

      const req = { body: { name: 'John Doe', position: 'Developer', baseSalary: 50000 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createEmployee(req, res);

      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO employees (name, position, baseSalary, totalSalary) VALUES ($1, $2, $3, $4) RETURNING *',
        ['John Doe', 'Developer', 50000, 50000]
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockEmployee);
    });

    it('should return 400 if required fields are missing', async () => {
      const req = { body: {} };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
    });

    it('should return 500 if there is an error', async () => {
      pool.query.mockRejectedValueOnce(new Error('DB Error'));

      const req = { body: { name: 'John Doe', position: 'Developer', baseSalary: 50000 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error creating employee',
        error: 'DB Error',
      });
    });
  });

  // You can write similar tests for updateEmployee and deleteEmployee
});
