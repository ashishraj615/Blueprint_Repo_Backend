const fs = require('fs');
const path = require('path');
const {getDb} = require('../utils/databaseUtil');

module.exports = class Complaints {
  constructor(location, subarea, empno, username, mobilenumber, desc, email, id) {
    this.location = location  || '';
    this.subarea = subarea || '';
    this.empno = empno || '';
    this.username = username || '';
    this.mobilenumber = mobilenumber || '';
    this.desc = desc || '';
    this.email = email || '';
    this.id = id || '';
  }
  static getComplaints() {
    // This method would typically fetch complaints from a database
    const db = getDb();
    return db.collection('complaints').find().toArray();
  }
  static getComplaintsbyID(complaintId) {
    // This method would typically fetch complaints from a database
    const db = getDb();
    return db.collection('complaints').find({id: complaintId}).next();
  }
  static addComplaint(complaint) {
    // This method would typically save the complaint to a database
    const db = getDb();
    return db.collection('complaints').insertOne(complaint)
      .then(result => {
        console.log('Complaint added to database:', result);
      })
      .catch(err => {
        console.error('Error adding complaint to database:', err);
      });
  }
};