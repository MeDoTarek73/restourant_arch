let service = new(require('../usecases/restaurants'))();
let auth = require('../../helpers/middlewares/check-auth');
module.exports = function(app, express) {
    let router = express.Router();
    router.get('/', auth, (req, res) => {
        service.list().then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    router.get('/elk/search/:keyword', auth, (req, res) => {
        service.search(req.params.keyword).then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    router.get('/:key', auth, (req, res) => {
        service.findOne(req.params.key).then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    router.post('/', auth, (req, res) => {
        service.create(req.body).then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    router.put('/:id', auth, (req, res) => {
        service.update(req.params.id, req.body).then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    router.delete('/:id', auth, (req, res) => {
        service.deleteById(req.params.id).then(_res => {
            res.status(_res.status).send(_res.data);
        }).catch(_err => {
            res.status(_err.status).send(_err.message);
        });
    });
    return router;
}