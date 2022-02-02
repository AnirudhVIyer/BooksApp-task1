As per the task document, this module only has two requests

- to create a document (User)
- to reward referrer.

ObjectId of the user is used to reference to the referrer. Can also use name & email

src/db/mongoose.js - script to setup connection to database.
src/routers/user.js - takes care of user related api's.
src/models/UserModel.js - User model created according to the given schema.

- Update/Delete/Read requests not implemented.
