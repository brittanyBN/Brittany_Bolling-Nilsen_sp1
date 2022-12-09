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
  staffMemberIsLate(toast) {
    alert(toast);
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
const deliveryDrivers = [];
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
            "<td>--</td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
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

      //Update status in table and in object

      staffMember.status = $(this).find("td:eq(4)").text("Out");

      // Prompt the user for the time.
      let leaveT = prompt("Enter the time (hh:mm):");

      //If statement to validate time
      if (/^\d\d:\d\d$/.test(leaveT)) {
        // If time is in correct format.
        staffMember.outTime = $(this).find("td:eq(5)").text(leaveT);
      } else {
        // If time is not in correct format.
        alert("Please enter the time in the correct format (hh:mm)");

        // Prompt the user again for the time.
        leaveT = prompt("Enter the time (hh:mm):");
        staffMember.outTime = $(this).find("td:eq(5)").text(leaveT);
      }
      // Promt user for the duration in minutes
      let durationMinutes = prompt(
        "How many minutes will the staff member be out?"
      );

      // If the user input an invalid number of minutes
      if (isNaN(durationMinutes) === true || durationMinutes <= 0) {
        alert("Please enter a valid number of minutes!");
        prompt("How many minutes will the staff member be out?");

        // If the user input a valid number of minutes
      } else if (isNaN(durationMinutes) !== true && durationMinutes > 0) {
        if (durationMinutes >= 60) {
          // Calculate number of hours and minutes staff member is away
          let durationHours = Math.floor(durationMinutes / 60);
          let durationMin = durationMinutes % 60;
          let durationT = durationHours + "hr " + durationMin + "min";
          console.log(durationT);

          // Populate table with duration staff member is away
          let durationTime = $(this)
            .find("td:eq(6)")
            .text(staffMember.durationTime);
          staffMember.durationTime = durationT;
          console.log(durationTime);
          $(this).find("td:eq(6)").text(durationT);
          let arrayLeaveT = leaveT.split(":");
          console.log(arrayLeaveT);
          let hours = parseInt(arrayLeaveT[0]) + parseInt(durationHours);
          if (hours > 23) {
            prompt("Please enter a valid time!");
          }
          console.log(hours);
          let minutes = parseInt(arrayLeaveT[1]) + parseInt(durationMin);
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          console.log(minutes);

          // Add time staff member is expected to return
          let returnT = hours + ":" + minutes;
          console.log(durationT);
          let returnTime = $(this).find("td:eq(7)").text(returnT);
          staffMember.returnTime = returnT;
          console.log(returnTime);
          $(this).find("td:eq(7)").text(returnT);
          $(this).removeClass("selected");
        }
      }
    });
  });

  $("#staffIn").click(function () {
    // Identify correct staff member by matching their unique email to the selected user.
    $("#staffTable .selected").each(function () {
      let email = $(this).find("td:eq(3)").text();
      const staffMember = staffMembers.find(
        (staffMember) => staffMember.email === email
      );
      let status = $(this).find("td:eq(4)").text();
      staffMember.status = "In";
      console.log(status);
      $(this).find("td:eq(4)").text("In");
      let leave = $(this).find("td:eq(5)").text();
      staffMember.leave = "";
      console.log(leave);
      $(this).find("td:eq(5)").text("");
      let duration = $(this).find("td:eq(6)").text();
      staffMember.duration = "";
      console.log(duration);
      $(this).find("td:eq(6)").text("");
      let returnT = $(this).find("td:eq(7)").text();
      staffMember.returnT = "";
      console.log(returnT);
      $(this).find("td:eq(7)").text("");
      $(this).removeClass("selected");
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
      deliveryDrivers.push(newDeliveryDriver);
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
    }

    $("#deliveryTable tbody").on("click", "tr", function () {
      $(this).toggleClass("selected");
    });
    $("#clearDelivery").click(function () {
      // Identify correct staff member by matching their unique email to the selected user.
      $("#deliveryTable .selected").each(function () {
        let telephone = $(this).find("td:eq(3)").text();
        const deliveryDriver = deliveryDrivers.find(
          (deliveryDriver) => deliveryDriver.telephone === telephone
        );
        $("tr").filter(".selected").remove();
      });
    });
  });
});
