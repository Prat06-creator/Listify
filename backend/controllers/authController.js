const jwt = require('jsonwebtoken')

exports.googleCallback = (req,res) => {
    try {
        //generate token
        const token = jwt.sign({sub:req.user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );

        //set token in a secure Http-only cookie
        res.cookie('token',token , {
            httpOnly:true,
            sameSite:'lax' 
        });
        //redirect to user dashboard
        res.redirect(`${process.env.UI_URL}/success-login?access_token=${token}`)
    } catch (error) {
        console.error('Error during google callback',error)
        res.status(500).json({message:'Internal server error during login'})
    }
}

exports.getUser = (req,res) =>{
    try {
        if(!req.user) {
            res.status(401).json({message:'User not authinticated'})
        }
        res.json({
            user:req.user
        })
    } catch (error) {
        console.error('Error fetching user details',error)
        res.status(500).json({message:'Internal server error'})
    }
}