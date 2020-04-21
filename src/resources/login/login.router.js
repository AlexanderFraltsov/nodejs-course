const router = require('express').Router();
const loginService = require('./login.service');
const { catchErrors } = require('../../common/error');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = req.body;
    const token = await loginService.connect(user);
    res.status(200).json(token);
  })
);

module.exports = router;
