require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

// Define data
let users = [
  {
    id: 1, 
    fullname: "Bob Belcher",
    show: "Bob\'s Burgers",
    episodeCount: 100,
    appearsIn: [
      "EpisodeOne",
      "EpisodeTwo",
      "EpisodeThree"
    ]
  },
  {
    id: 2, 
    fullname: "Hank Hill",
    show: "King of the Hill",
    episodeCount: 200,
    appearsIn: [
      "EpisodeOne",
      "EpisodeTwo",
      "EpisodeThree",
    ]
  },
];

const cars = [
  {
    id: 1,
    make: "Ford",
    model: "Raptor",
    year: 2025
  },
  {
    id: 2,
    make: "Toyota",
    model: "Tundra",
    year: 2024
  }
];

const restaurants = [
  {
    id: 1,
    name: "Qdoba"
  },
  {
    id: 2,
    name: "Braums"
  },
  {
    id: 3,
    name: "Waffle Champ"
  }
]


// GQL
const typeDefs = gql`
  enum Episode {
    EpisodeOne,
    EpisodeTwo,
    EpisodeThree
  }

  # Object Type
  type User {
    id: ID!
    fullname: String!
    name: String! @deprecated(reason: "Use 'fullname'")
    show: String!
    episodeCount: Int!
    appearsIn: [Episode!]!
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    year: Int!
  }

  type Restaurant {
    id: ID!
    name: String!
  }

  type DeleteRestaurant {
    success: Boolean!
    message: String
  }

  # Query
  type Query {
    users: [User]
    cars: [Car]
    restaurants: [Restaurant],
    findRestaurant(id: ID!): Restaurant
  }

  # Input
  input carInput {
    id: ID!
    make: String!
    model: String!
    year: Int!
  }

  input restaurantInput {
    id: ID!
    name: String!
  }

  # Mutations
  type Mutation {
    createCar(carInput: carInput!): Car
    createRestaurant(restaurantInput: restaurantInput!): Restaurant
    deleteRestaurant(id: ID!): DeleteRestaurant
    updateRestaurant(restaurantInput: restaurantInput): Restaurant
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    cars: () => cars,
    restaurants: () => restaurants,
    findRestaurant: (_, {id}) => restaurants.find((r) => String(r.id) === String(id))
  },
  Mutation: {
    createCar: (_, { carInput }) => {
      const newCar = { id: carInput.id, make: carInput.make, model: carInput.model, year: carInput.year };
      cars.push(newCar);
      return newCar;
    },
    createRestaurant: (_, { restaurantInput }) => {
      const newRestaurant = {
        id: restaurantInput.id,
        name: restaurantInput.name
      };
      restaurants.push(newRestaurant);
      return newRestaurant;
    },
    deleteRestaurant: (_, { id }) => {
      const index = restaurants.findIndex((r) => String(r.id) === String(id));
      if(index === -1 ) return { success: false, message: "Index not found" }
      restaurants.splice(index, 1);
      return { success: true, message: "Restaurant deleted succesfully" }
    },
    updateRestaurant: (_, { restaurantInput}) => {
      const { id, name } = restaurantInput;
      const restIndex = restaurants.findIndex((r) => String(r.id) === String(id));
      if(restIndex === -1) throw new Error("Restaurant not found");

      restaurants[restIndex].name = name;
      return restaurants[restIndex];
    }
  }
};

// Server logic
const server = new ApolloServer({typeDefs, resolvers});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Serving running on http://localhost:${PORT}`);
  });
}

startServer();