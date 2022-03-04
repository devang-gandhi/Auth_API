const router = require('express').Router();
const verify = require('./token');

router.get('/' ,verify , (req,res) => {
    res.json({
        display:{
                title : 'my first post',
                description : 'randomized data is that post with secured access.'
        }
    });
});

module.exports = router;