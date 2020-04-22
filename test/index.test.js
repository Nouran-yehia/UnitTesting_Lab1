const assert = require('assert');
var expect = require('chai').expect

global.expect = expect;

class Employee {
  constructor(firstName, lastName, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }

  getEmail() {
    return `${this.firstName}.${this.lastName}@company.com`;
  }

  applyRaise() {
    return this.salary *= this.raiseAmount;
  }

}

Employee.prototype.raiseAmount = 1.04;

class Manager extends Employee {
  constructor(firstName, lastName, salary, employees = []) {
    super(firstName, lastName, salary);
    this.raiseAmount = 1.20;
    this.employees = employees;
  }

  addEmployee(employee) {
    this.employees.push(employee);
    return this.employees;
  }

  removeEmployee(employee) {
    this.employees = this.employees.filter(emp => emp.getEmail() !== employee.getEmail());
    return this.employees;
  }

  printEmployees() {
    for (let emp in this.employees) {
      print(`== Fullname: ${emp.getFullName()}`);
      print(`== Email: ${emp.getEmail()}`);
    }
  }

}

class Developer extends Employee {
  constructor(firstName, lastName, salary, progLang = "JS") {
    super(firstName, lastName, salary);
    this.progLang = progLang
    this.raiseAmount = 1.10;
  }
}


// ####### Testing ####### //
describe('Testing Employee class', function() {
    var obj = new Employee("Noura", "Yehia", 9000)
    var mobj = new Manager("Sherry", "Karam", 15000, [])

    it('Testing full name return', function() {
        expect(obj.getFullName()).equal("Noura Yehia")
    });
    it('Testing Email return', function() {
      expect(obj.getEmail()).equal("Noura.Yehia@company.com")
    });
    it('Testing apply raise return', function() {
      expect(obj.applyRaise()).equal(9360)
    });
    it('Testing apply manager raise return', function() {
      expect(mobj.applyRaise()).equal(18000)
    });
    it('Testing add employee return', function() {
      expect(mobj.addEmployee(obj)).deep.equal([obj])
    });
    it('Testing delete employee return', function() {
      expect(mobj.removeEmployee(obj)).deep.equal([])
    });

  });