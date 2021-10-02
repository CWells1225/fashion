const mongoose = require('mongoose')

const fashionSchema = new mongoose.Schema({
		item: {
			type: String,
			required:true
		}, 
		description: String, 
		img: String
})

module.exports = mongoose.model('Fashion', fashionSchema)

