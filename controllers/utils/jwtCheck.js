import {Seller} from '../../models/seller.js';

export async function JWTAuth(req, res, next) {
	let token = req.headers['authorization'];
	if (!token) return res.status(401).json({message: "Unauthorized"});
	token = token.slice(7);
	verify(token, jwtKey, async (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({message: "Unauthorized"});
        }
        if (decoded.role !== 'seller' && decoded.role !== 'admin')
        	return res.status(401).json({message: "Unauthorized"});
		if (res.product && decoded.role == 'seller') {
	    	let seller = await Seller.findOne({name: res.product.seller_name});
	    	if (!seller) return res.status(401).json({message: "Unauthorized"});
	    	if (seller._id.toString() !== decoded.id)
	    		return res.status(401).json({message: "Unauthorized"});
    	}
    	next();
    });
}