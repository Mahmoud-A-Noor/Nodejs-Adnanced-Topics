const getHome = (req, res) => {
    res.status(200).json({message: 'Welcome to Advanced Morgan Logging!'});
  };
  
module.exports = { getHome };