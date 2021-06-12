var Userdb = require( '../model/model' );

//create and save new user
exports.create = ( req, res ) => {
    if ( !req.body ) {
        res.status( 400 ).send( { message: "Content can not be empty!" } );
        return;
    }

    const user = new Userdb( {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    } )

    user
        .save( user )
        .then( data => {
            res.send( data )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                message: err.message || "Some error occurred while creating a create operation"
            } );
        } )
}

//retrieve and return all users/single user

exports.find = ( req, res ) => {
    Userdb.find()
        .then( user => {
            res.send( user );
        } )
        .catch( err => {
            res.status( 500 ).send( { message: err.message || "Error Occured while retriving usr information" } );
        } )
}

//Update new user by user id
exports.update = ( req, res ) => {
    if ( !req.body ) {
        return res.status( 400 )
            .send( { message: "Data to update can not be empty" } )
    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate( id, req.body, { useFindAndModify: false } )
        .then( data => {
            if ( !data ) {
                res.status( 404 ).send( { message: `Can not update user with ${id} . Maybe user not found` } )
            } else {
                res.send( data );
            }
        } )
        .catch( err => {
            res.status( 500 ).send( { message: "Error Update user information" } )
        } )
}

// Delete a user with specified
exports.delete = ( req, res ) => {

}