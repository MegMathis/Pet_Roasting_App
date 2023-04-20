const router = require("express").Router();
router.get('/profile/upload', async (req, res) => {
    const upload = await res.render('upload')
})

router.post('profile/upload', async (req, res) => {
    const upload = await res.send('Profile Picture Uploaded!')
})

module.exports = router;