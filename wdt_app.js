class Employee {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

class StaffMember extends Employee {
  constructor(
    name,
    surname,
    picture,
    email,
    status,
    outTime,
    duration,
    expectedReturnTime
  ) {
    super(name, surname);
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.expectedReturnTime = expectedReturnTime;
  }
  staffMemberIsLate() {
    return `${this.name} is late. Show a toast`;
  }
}

$("document").ready(function () {
  const staffMembers = [];

  for (let i = 0; i < 5; i++) {
    $.ajax({
      url: "https://randomuser.me/api/",
      type: "GET",
      dataType: "json",
      success: function (data) {
        const user = data.results[0];
        const picture = user.picture.large;
        const name = user.name.first;
        const surname = user.name.last;
        const email = user.email;
        const newStaff = new StaffMember(name, surname, picture, email);
        staffMembers.push(newStaff);
        console.log(newStaff);
        $("#staffT").append(
          "<tr id='staffUpdate'><td>" +
            `<img src='${picture}' height='50px' width='50px' alt='staff picture'>` +
            "</td><td>" +
            `${name}` +
            "</td><td>" +
            `${surname}` +
            "</td><td>" +
            `${email}` +
            "</td>" +
            "<td id='status'></td>" +
            "<td id='outTime'>/td>" +
            "<td id='duration'></td>" +
            "<td id='returnTime'></td>" +
            "</tr>"
        );
      },
    });
  }
});

// let selectedUser;

// function toggleUser(i) {}

// Select staff member from row
// $(document).ready(function () {
//   $("tableSelector").on("#staffUpdate", "click", function () {
//     if (document.getElementsByClassName(".staffOut").clicked == true) {
//       prompt("What time will staff member return?");
//     }
//   });
// });

//Click in or out button

//Update Staff info in table

// $(function () {
//   $("##staffRow").click(function () {
//     $("#staffUpdate").hover(highlight, highlight);
//   });
// });
// function staffOut() {
//   var userAdjective = prompt("Please provide an Adjective");
//   alert(userAdjective);
// }
// const inputs = document.getElementById("deliveryInput").elements;

class DeliveryDriver extends Employee {
  constructor(name, surname, vehicle, telephone, deliverAddress, returnTime) {
    super(name, surname);
    this.vehicle = vehicle;
    this.telephone = telephone;
    this.deliverAddress = deliverAddress;
    this.returnTime = returnTime;
  }
  deliveryDriverIsLate() {
    return `${this.name} is late. Show a toast`;
  }
}

function deliveryInput() {
  const vehicle = document.forms.deliveryForm.Vehicle.value;
  const name = document.forms.deliveryForm.Name.value;
  const surname = document.forms.deliveryForm.Surname.value;
  const telephone = document.forms.deliveryForm.Telephone.value;
  const deliveryAddress = document.forms.deliveryForm.DeliveryAddress.value;
  const returnTime = document.forms.deliveryForm.ReturnTime.value;
  const regPhone = /^\d{10}$/;
  const regName = /\d+$/g;

  if (vehicle == "" || !vehicle == "motorcycle" || !vehicle == "car") {
    window.alert('Please enter "motorcyle" or "car".');
    vehicle.focus();
    return false;
  }

  if (name == "" || regName.test(name)) {
    window.alert("Please enter your name properly.");
    name.focus();
    return false;
  }

  if (surname == "" || regName.test(surname)) {
    window.alert("Please enter your surname properly.");
    name.focus();
    return false;
  }

  if (telephone == "" || !regPhone.test(phone)) {
    alert("Please enter valid phone number.");
    phone.focus();
    return false;
  }

  if (deliveryAddress == "") {
    window.alert("Please enter your address.");
    address.focus();
    return false;
  }

  if (returnTime == "" || !regEmail.test(email)) {
    window.alert("Please enter a valid return time.");
    email.focus();
    return false;
  }

  return true;
}

document.getElementsByClassName(".addDelivery").onclick = function () {
  document.getElementsByClassName(".deliveryInput").style.display = "block";

  var table = document.getElementsByClassName(".deliveryInput");
  var row = table.insertRow(-1);
  var vehicle = row.insertCell(0);
  var name = row.insertCell(1);
  var surname = row.insertCell(2);
  var telephone = row.insertCell(3);
  var deliverAddress = row.insertCell(4);
  var returnTime = row.insertCell(5);
  date.innerHTML = document.getElementById("vehicle").value;
  desc.innerHTML = document.getElementById("name").value;
  amt.innerHTML = document.getElementById("").value;

  return false;
};
