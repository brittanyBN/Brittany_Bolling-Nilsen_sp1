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
    this.status = "";
    this.outTime = "";
    this.duration = "";
    this.expectedReturnTime = "";
  }
  staffMemberIsLate() {
    return `${this.name} is late. Show a toast`;
  }
}

class DeliveryDriver extends Employee {
  constructor(vehicle, name, surname, telephone, deliverAddress, returnTime) {
    super(name, surname);
    this.vehicle = vehicle;
    this.telephone = telephone;
    this.deliverAddress = deliverAddress;
    this.returnTime = returnTime;
  }
  deliveryDriverIsLate() {
    return `${this.name} is late. Show a toast`;
  }
  clearDriver() {
    return "clear the selected row";
  }
}

const staffMembers = [];
const deliveryDriver = [];
const status = [];

function staffUserGet() {
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
            "<td id='status'>--</td>" +
            "<td id='outTime'></td>" +
            "<td id='duration'></td>" +
            "<td id='returnTime'></td>" +
            "</tr>"
        );
      },
    });
  }
}

function clock(type) {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  if (type === "currentTime") {
    return hours + ":" + minutes;
  }

  if (type === "time") {
    return (
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      " " +
      seconds
    );
  }
  return;
}

$("document").ready(function () {
  staffUserGet();

  setInterval(function () {
    $("#date").text(clock("time"));
  }, 1000);

  $("#staffTable tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");
  });

  $("#staffOut").click(function () {
    // Identify correct staff member by matching their unique email to the selected user.
    $("#staffTable .selected").each(function () {
      let email = $(this).find("td:eq(3)").text();
      const staffMember = staffMembers.find(
        (staffMember) => staffMember.email === email
      );
      console.log(staffMember);

      //Update status in table and in object
      let status = $(this).find("td:eq(4)").text();
      staffMember.status = "Out";
      console.log(status);
      $(this).find("td:eq(4)").text("Out");

      //Prompt receptionist for return time, update table with answer and update object
      let leaveT = prompt("What time will the staff member leave? hh:mm");

      //If statement to validate time

      let leaveTime = $(this).find("td:eq(5)").text(leaveT);
      staffMember.leaveTime = leaveT;
      console.log(leaveTime);
      $(this).find("td:eq(5)").text(leaveT);

      //Prompt receptionist for return time, update table with answer and update object
      let returnT = prompt("What time will the staff member return? hh:mm");

      //If statement to validate time

      let returnTime = $(this).find("td:eq(7)").text(returnT);
      staffMember.returnTime = returnT;
      console.log(returnTime);
      $(this).find("td:eq(7)").text(returnT);

      //Prompt receptionist for out time, update table with answer and update object
      // let outT = prompt("What time did the staff member leave? hh:mm");
      // let outTime = $(this).find("td:eq(5)").text(outT);
      // staffMember.outTime = outT;
      // console.log(outTime);
      // $(this).find("td:eq(5)").text(outT);

      //Calculate duration of time staff member is out
      let arrayReturnT = returnT.split(":");
      console.log(arrayReturnT);
      let arrayLeaveT = leaveT.split(":");
      console.log(arrayLeaveT);
      let hours = arrayReturnT[0] - arrayLeaveT[0];
      console.log(hours);
      let minutes = arrayReturnT[1] - arrayLeaveT[1];
      console.log(minutes);
      let durationT = hours + " hours and " + minutes + " minutes";
      console.log(durationT);
      let durationTime = $(this).find("td:eq(6)").text(durationT);
      staffMember.durationTime = durationT;
      console.log(durationTime);
      $(this).find("td:eq(6)").text(durationT);
    });
  });

  $("#addDelivery").click(function () {
    let vehicle = $("#vehicle").val();
    const name = $("#name").val();
    const surname = $("#surname").val();
    const telephone = $("#telephone").val();
    const deliveryAddress = $("#address").val();
    const returnTime = $("#returnTimeNow").val();
    const regPhone = /^\d{10}$/;
    const regName = /\d+$/g;

    let error = 0;

    if (vehicle == "" || !vehicle == "motorcycle" || !vehicle == "car") {
      alert('Please enter "motorcyle" or "car".');
    } else if (vehicle === "car") {
      var cell = $("#vehicle");
      cell.text('<i class="bi bi-car-front"></i>');
    }

    if (name == "" || regName.test(name)) {
      alert("Please enter your name properly.");
      error++;
    }

    if (surname == "" || regName.test(surname)) {
      alert("Please enter your surname properly.");
      error++;
    }

    if (telephone == "" || !regPhone.test(telephone)) {
      alert("Please enter valid phone number.");
      error++;
    }

    if (deliveryAddress == "") {
      alert("Please enter your address.");
      error++;
    }

    if (returnTime == "") {
      alert("Please enter a valid return time.");
      error++;
    }

    console.log(error);

    if (error === 0) {
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
      $("#deliveryTable tbody").on("click", "tr", function () {
        $(this).toggleClass("selected");
      });
    }
  });
});
