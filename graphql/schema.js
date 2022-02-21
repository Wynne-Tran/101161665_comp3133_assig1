const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Profile {
    username: String, 
    firstname: String, 
    lastname: String, 
    password: String, 
    email: String,
    type: String,
  }

  type Listing {
    listing_id: String,
    listing_title: String,
    description: String,
    street: String,
    city: String,
    postal_code: String,
    price: String,
    email: String,
    username: String,
  }

  type Booking {
    listing_id: String,
    booking_id: String,
    booking_date: String,
    booking_start: String,
    booking_end: String,
    username: String
  }

  type ProfileData {
    profiles: [Profile]
  }

  type ListingData {
    adminListings: [Listing]
  }

  type ListingLoginData {
    adminLoginListings: [Listing]
  }

  type SearchListingData {
    searchListings: [Listing]
  }

  type BookingData {
    customerBookings: [Booking]
  }

  type BookingLoginData {
    customerLoginBookings: [Booking]
  }

  input ProfileInputData {
    username: String, 
    firstname: String, 
    lastname: String, 
    password: String, 
    email: String,
    type: String,
  }

  input ProfileUserInput{
    username: String,
    password: String,
  }

  input ListingInput{
    listing_id: String,
    listing_title: String,
    description: String,
    street: String,
    city: String,
    postal_code: String,
    price: String,
    email: String
  }


  input BookingInput{
    booking_id: String,
    booking_start: String,
    booking_end: String,
  }

  type RootQuery {
    profile: ProfileData
    adminListing: ListingData
    customerBooking: BookingData
    adminLoginListing(username: String!): ListingLoginData!
    searchListing(info: String!) : SearchListingData
    customerLoginBooking(username: String!): BookingLoginData!
  }

  type RootMutation {
    createProfile(profileInput: ProfileInputData): Profile!
    updateProfile(id: ID!, profileInput: ProfileInputData): Profile!
    deleteProfile(id: ID!): Profile!
    login(userInput: ProfileUserInput): Profile!
    createListing(id: ID!, listingInput: ListingInput): Listing!
    createBooking(id: ID!, listing_id: ID!, bookingInput: BookingInput): Booking!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);