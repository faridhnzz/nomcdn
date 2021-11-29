module.exports = (req, res, next) => {
  req.isCDN = req.get('NomCDN') === 'Iyapss';
  next();
};
