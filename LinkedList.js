// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
   this.tail = null;
   this.length = 0;

  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let node = new Node(newStudent);
    let current;
 
     if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      current = this.head;
 
      while (current.next) {
        current = current.next;
      }
 
      current.next = node;
      this.tail = node;
    }
 
    this.length++; 
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if (!this.head){
      return;
      
    } else {
      let current = this.head;
      let previous;
      let index = 0;
      if (this.length === 1 && current.data.getEmail() === email) {
        this.clearStudents()
        return
      }
      while (current.data.getEmail() !== email && current.next) {
        index++;
        previous = current;
        current = current.next;
      }
      if (index === 0 && current.data.getEmail() === email) {
        this.head = current.next;
      } else if (index === this.length - 1) {
        this.tail = previous;
        previous.next = null;
      } else if (current.data.getEmail() === email) {
        previous.next = current.next;
      }
      this.length--;
    } 
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    if (!this.head){
      return -1;
    }
 
    let current = this.head;
    while(current.data.getEmail() !== email && current.next) {
      current = current.next;
    }

    if(current.data.getEmail() === email){
      return current.data;
    } else {
      return -1;
    }
  }
 

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null
    this.length = 0;
 
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    if (!this.head){
    return "";
    }
    let current = this.head;
    let linkedList = current.data.getName();
    while(current.next){
      current = current.next;
      linkedList += `, ${current.data.getName()}`;
    }
    return linkedList;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  sortStudentsByName() {
    // TODO
    if(!this.head){
    return [];
    }

    let current = this.head;
    let students = [current.data];

    while(current.next){
      current = current.next;
      students.push(current.data);
    }
    return students.sort((a,b) => a.name - b.name);
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    let studentArray = this.sortStudentsByName();
    return studentArray.filter(student => student.getSpecialization() === specialization)
 
  }

  /**
   * REQUIRES:  minYear (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minYear, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByYear(minYear) {
    // TODO
    if(!this.head){
    return [];
    }
    let studentArray = this.sortStudentsByName();
    return studentArray.filter((student => student.getYear() >= minYear))

  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
      const fs = require('fs/promises');
     
      let current = this.head;
      let linkedList = [];

      while(current){

        linkedList.push(current.data.getString());
        current = current.next;
      }

      await fs.writeFile(fileName, JSON.stringify(linkedList), 'utf8', (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("File written successfully");
      });
    };

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    
    const fs = require('fs/promises');

    let linkedList = await fs.readFile(fileName, 'utf8')
 
    let readLinkedList = JSON.parse(linkedList)

    let studentFields = []
 
    let createdStudentArray = []
 
     readLinkedList.map((student) => {

      studentFields = student.split(', ').map((field) => {
        return field.split(': ')[1]
      })

      createdStudentArray.push(new Student(...studentFields))
    });
 
     this.clearStudents()
 
     createdStudentArray.map((student) => {
      this.addStudent(student)
    })
  }
 
}

module.exports = { LinkedList }
