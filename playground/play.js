


function person(firstName, lastName, age, eyeColor) {
    this.firstNameee = firstName;  
    this.lastName = lastName;
    this.age = age;
    this.eyeColor = eyeColor;
    this.changeName = function (name) {
        this.lastName = name;
    };
    static.XXX = (param)=>{
        return param
    }
}
var p = new person('yacov');
p.changeName('dddddd')
console.log(p.XXX('sssssssss'));