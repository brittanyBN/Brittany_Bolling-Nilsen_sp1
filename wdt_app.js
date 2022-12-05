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

$("document").ready(function staffUserGet() {
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
          "<tr><td>" +
            `<img src='${picture}' height='50px' width='50px' alt='staff picture'>` +
            "</td><td>" +
            `${name}` +
            "</td><td>" +
            `${surname}` +
            "</td><td>" +
            `${email}` +
            "</td>" +
            "<td id='status'></td>" +
            "<td id='outTime'></td>" +
            "<td id='duration'></td>" +
            "<td id='returnTime'></td>" +
            "</tr>"
        );
      },
    });
  }
});

$("td").click(function () {
  $(".selected").removeClass("selected");
  $(this).addClass("selected");
});

// $(document).ready(function () {
//   $("#staffTable tr").click(function () {
//     $(this).addClass("selected").siblings().removeClass("selected");
//     var value = $(this).find("td:first").html();
//     alert(value);
//   });
//   $(".staffOut").on("click", function (e) {
//     alert($("staffTable tr.selected td:first").html());
//   });
// });

// $(document).ready(function () {
//   $("#staffTable tr td").click(function () {
//     $("#staffTable tr td").removeClass("selected");
//     $(this).addClass("selected");
//   });
// });

// $("#staffTable tr").click(function () {
//   $(this).addClass("selected").siblings().removeClass("selected");
//   var value = $(this).find("td:first").html();
//   alert(value);
// });

// $(".staffOut").on("click", function (e) {
//   alert($("#staffTable tr.selected td:first").html());
// });

// $(".staffOut").on("click", function (e) {
//   alert($("#staffTable tr.selected td:first").html());
// });

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

const deliveryDriver = [];

function deliveryInput() {
  const vehicle = document.getElementById("vehicle").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const telephone = document.getElementById("telephone").value;
  const deliveryAddress = document.getElementById("address").value;
  const returnTime = document.getElementById("returnTime").value;
  const regPhone = /^\d{10}$/;
  const regName = /\d+$/g;
  const newDeliveryDriver = new DeliveryDriver(
    vehicle,
    surname,
    name,
    telephone,
    deliveryAddress,
    returnTime
  );
  deliveryDriver.push(newDeliveryDriver);
  console.log(newDeliveryDriver);

  if (vehicle == "" || !vehicle == "motorcycle" || !vehicle == "car") {
    alert('Please enter "motorcyle" or "car".');
    return false;
  }

  if (name == "" || regName.test(name)) {
    alert("Please enter your name properly.");
    return false;
  }

  if (surname == "" || regName.test(surname)) {
    alert("Please enter your surname properly.");
    return false;
  }

  if (telephone == "" || !regPhone.test(telephone)) {
    alert("Please enter valid phone number.");
    return false;
  }

  if (deliveryAddress == "") {
    alert("Please enter your address.");
    return false;
  }

  if (returnTime == "") {
    alert("Please enter a valid return time.");
    return false;
  }

  $("#deliveryT").append(
    "<tr><td>" +
      `${vehicle}` +
      "</td><td>" +
      `${name}` +
      "</td><td>" +
      `${surname}` +
      "</td><td>" +
      `${telephone}` +
      "</td><td>" +
      `${deliveryAddress}` +
      "</td><td>" +
      `${returnTime}` +
      "</td></tr>"
  );
}
