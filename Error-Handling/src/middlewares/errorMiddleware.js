function errorMiddleware(err, req, res, next) {
    // Log the error (you can replace with logging libraries)
    console.error('Error:', err.message);

    // Send a structured error response
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
}
  
module.exports = errorMiddleware;



////! Another way !////




//* you can use custom error classes that extend from the base Error class
class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.statusCode = 400; // You can also attach specific status codes
    }
  }
  
  class DatabaseError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DatabaseError';
      this.statusCode = 500;
    }
  }

////* Usage *////
// if (!user) {
//   throw new ValidationError('User not found');
// }

function errorMiddleware(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof DatabaseError) {
        return res.status(err.statusCode).json({ message: 'Internal Server Error' });
    }
    res.status(500).json({ message: 'Something went wrong' });
}