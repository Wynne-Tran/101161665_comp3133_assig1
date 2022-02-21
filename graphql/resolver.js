const Listing = require('../models/list');
const Booking = require('../models/book');
const Profile = require('../models/profile');


module.exports = {

  // Profile Schema
  profile: async function () {
    const profile = await Profile.find();
    console.log(profile)
    return {
        profiles: profile.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },

  createProfile: async function ({ profileInput }) {
    const profile = new Profile({
      username: profileInput.username, 
      firstname: profileInput.firstname, 
      lastname: profileInput.lastname, 
      password: profileInput.password, 
      email: profileInput.email,
      type: profileInput.type,
    });

    const createdProfile = await profile.save();
    return {
      ...createdProfile._doc,
      _id: createdProfile._id.toString(),
    };
  },

  login: async function ({userInput}) {
    const user = await Profile.findOne({username: userInput.username});
    if(user == null){
      throw new Error('Profile doesnt exist !');
    }
    const login = await Profile.findOne({password: userInput.password})
    if(login == null){
      throw new Error('Password incorrect !');
    }
    return {
      ...login._doc,
      _id: login._id.toString(),
    };
  },

  // updateProfile: async function ({ id, profileInput }) {
  //   const profile = await Profile.findById(id);
  //   if (!profile) {
  //     throw new Error('No found!');
  //   }
  //   profile.username = profileInput.username; 
  //   profile.firstname = profileInput.firstname; 
  //   profile.lastname = profileInput.lastname; 
  //   profile.password = profileInput.password; 
  //   profile.email = profileInput.email;
  //   profile.type = profileInput.type;
 
  //   const updatedProfile = await profile.save();
  //   return {
  //     ...updatedProfile._doc,
  //     _id: updatedProfile._id.toString(),
  //   };
  // },


  // deleteProfile: async function ({ id }) {
  //   const profile = await Profile.findById(id);
  //   if (!profile) {
  //     throw new Error('No found!');
  //   }
  //   await Profile.findByIdAndRemove(id);
  //   return {
  //     ...profile._doc,
  //     _id: profile._id.toString(),
  //   };
  // },


  // Listing Schema
  createListing: async function ({ id, listingInput }) {
    const profile = await Profile.findById(id);
    if (!profile || profile.type != "admin") {
      throw new Error('Profile incorrect!');
    }
    const listing = new Listing({
      listing_id: listingInput.listing_id,
      listing_title: listingInput.listing_title,
      description: listingInput.description,
      street: listingInput.street,
      city: listingInput.city,
      postal_code: listingInput.postal_code,
      price: listingInput.price,
      email:  listingInput.email,
      username: profile.username, 
    });

    const createdListing = await listing.save();
    return {
      ...createdListing._doc,
      _id: createdListing._id.toString(),
    };
  },


  adminListing: async function () {
    const listing = await Listing.find();
    return {
        adminListings: listing.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },


  searchListing : async function ({info}) {
   const listing = await Listing.find({ $or: [{listing_title: info}, {city : info}, {postal_code: info}]});
    if(!listing){
      throw new Error ('Error')
    }
    else {
      return {searchListings: listing};
    }
  
  },


  adminLoginListing : async function ({username}) {
    const listing = await Listing.find({username: username});
    if (!listing) {
      throw new Error ('Dont have listing yet !')
    }
    return {adminLoginListings: listing};
  },

  //Booking Schema

  createBooking: async function ({ id, listing_id, bookingInput }) {
    const profile = await Profile.findById(id);
    if (!profile || profile.type != "customer") {
      throw new Error('Profile incorrect!');
    }
    const listing = await Listing.findById(listing_id);
    if (!listing) {
      throw new Error('Listing incorrect!');
    }
    const booking = new Booking({
      listing_id: listing.listing_id,
      booking_id: bookingInput.booking_id,
      booking_date: new Date().toLocaleDateString(),
      booking_start: bookingInput.booking_start,
      booking_end: bookingInput.booking_end,
      username: profile.username
    });

    const createdBooking = await booking.save();
    return {
      ...createdBooking._doc,
      _id: createdBooking._id.toString(),
    };
  },


  customerBooking: async function () {
    const booking = await Booking.find();
    return {
        customerBookings: booking.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },

  customerLoginBooking : async function ({username}) {
    const booking = await Booking.find({username: username});
    if (!booking) {
      throw new Error ('Dont have booking yet !')
    }
    return {customerLoginBookings: booking};
  },

};