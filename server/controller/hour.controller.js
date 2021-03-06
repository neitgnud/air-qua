const HOUR = require('../model/hour.model');

class HOURController {
    show(req, res, next) {
        HOUR.find({})
            .then(data => {
                data = data.map(dt => dt ? dt.toObject() : dt);
                res.json(data);
            })
    }
}

module.exports = new HOURController;
