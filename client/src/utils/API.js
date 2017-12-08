import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  saveUser: function(userData) {
    return axios.post("/api/users/saveUser", userData)
  },
  loginUser: function(userData) {
    return axios.post("/api/users/loginUser", userData)
  },
  //Get user data once on the profile page
  getUserData: function(id) {
    console.log("I'm in front-end API getUserData and the ID is " + id);
    return axios.get("/api/profile/getUserData/" + id)
  },
  // getItems: function (itemIds) {
  //   console.log("I'm in front-end API and the ID is " + itemIds);
  //   itemIds = {itemIds};
  //   return axios.get("/api/profile/getItems", itemIds);
  // },
  saveItem: function(item) {
    console.log("i'm in save item");
    // console.log(item);
    return axios.post("/api/profile/saveItem", item)
  },
  getItemReviews: function(item) {
    return axios.get("/api/profile/getItemReviews", item)
  },
  search: function(searchObj) {
    return axios.get("/api/home/search/" + searchObj.search);
  },
  
  // deleteCard : function(id)  {
  //   API.deleteCard(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // },

  /**
   * 
   */
  saveProfile: function(data) {
    // console.log(data);
    return axios.post("/api/profile/saveProfile", data);
  },

  getItem: function(itemId) {
    return axios.get("/api/profile/getItem/" + itemId);
  },

  updateItem: function(itemId) {
    return axios.post("/api/profile/updateItem/"+itemId);
  },

  deleteItem: function(itemId) {
    return axios.delete("/api/profile/deleteItem/"+itemId);
  }
};