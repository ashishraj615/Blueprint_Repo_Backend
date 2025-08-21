const fs = require('fs');
const path = require('path');

module.exports = class Complaints {
  constructor(location, subarea, empno, username, mobilenumber, desc, email) {
    this.location = location  || '';
    this.subarea = subarea || '';
    this.empno = empno || '';
    this.username = username || '';
    this.mobilenumber = mobilenumber || '';
    this.desc = desc || '';
    this.email = email || '';
  }
  static getComplaints() {
    // This method would typically fetch complaints from a database
    const pathToFile = path.join(__dirname, '../data', 'complaints.json');
    if (fs.existsSync(pathToFile)) {
      const data = fs.readFileSync(pathToFile, 'utf-8');
      if (!data.trim()) return []; // Handle empty file
      // Parse the JSON data and return it
      return JSON.parse(data);
    }
    else    
      return [];
  }
  static addComplaint(complaint) {
    // This method would typically save the complaint to a database
    let complaints = Complaints.getComplaints();
    complaints.push(complaint);
    const pathToFile = path.join(__dirname,'../data', 'complaints.json');
    fs.writeFileSync(pathToFile, JSON.stringify(complaints, null, 2), 'utf-8');
    console.log('Complaint added:', complaint);
  }
};
