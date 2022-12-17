class Employee {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

class StaffMember extends Employee {
  constructor(name, surname, picture, email) {
    super(name, surname);
    this.picture = picture;
    this.email = email;
    this.status = "";
    this.outTime = "";
    this.duration = "";
    this.expectedReturnTime = "";
  }
  staffMemberIsLate() {
    // var time = new Date();
    // if(this.expectedReturnTime > time) {
    $("#toastInfo").append(
      `<p><img src='${this.picture}' height='50px' width='50px' alt='staff picture'></p>
      <p>Staff Member: ${this.name} ${this.surname}</p>
      <p>Duration Out: ${this.duration}</p>`
    )
    $("#liveToast").toast("show")
    }
  //}
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
}

const staffMembers = [];
const deliveryDrivers = [];
const staffTable = 5;

function staffUserGet() {
  for (let i = 0; i < staffTable; i++) {
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
          "<td>In</td>" +
          "<td class='time'></td>" +
          "<td></td>" +
          "<td></td>" +
          "</tr>"
        );
      },
    });
  }
}

function digitalClock(type) {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let day = date.getDate();
  let month = date.getMonth() + 1;
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
    return (day + "/" + month + "/" + year + " " + hours + ":" + minutes + " " + seconds);
  }
  return;
}

function staffOut() {
$("#staffTable .selected").each(function(){
  let email = $(this).find("td:eq(3)").text();
 
  const staffMember =  staffMembers.find(staffMember => staffMember.email === email);

    //Update status in table and in object
    staffMember.status = $(this).find("td:eq(4)").text("Out").text();

    // Prompt the user for the time.
    let leaveT = prompt("Enter the time (hh:mm):");

    //If statement to validate time
      if (leaveT.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      // If time is in correct format.
      staffMember.outTime = $(this).find("td:eq(5)").text(leaveT).text();
       // Promt user for the duration in minutes
    let durationMinutes = prompt(`How many minutes will ${staffMember.name} be out?`);

    // If the user input an invalid number of minutes
    if (isNaN(durationMinutes) === true || durationMinutes <= 0) {
      alert("Please enter a valid number of minutes!");
      prompt(`How many minutes will ${staffMember.name} be out?`);

      // If the user input a valid number of minutes
    } else if (isNaN(durationMinutes) !== true && durationMinutes > 0) {
      if (durationMinutes >= 60) {
        // Calculate number of hours and minutes staff member is away
        let durationHours = Math.floor(durationMinutes / 60);
        let durationMin = durationMinutes % 60;
        let durationT = durationHours + "hr " + durationMin + "min";
      

        // Populate table with duration staff member is away
        staffMember.duration = $(this).find("td:eq(6)").text(durationT).text();
        
  
        $(this).find("td:eq(6)").text(durationT);
        let arrayLeaveT = leaveT.split(":");
       
        let hours = parseInt(arrayLeaveT[0]) + parseInt(durationHours);
        if (hours > 23) {
          prompt("Please enter a valid time!");
        }
      
        let minutes = parseInt(arrayLeaveT[1]) + parseInt(durationMin);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
       

        // Add time staff member is expected to return
        let returnT = hours + ":" + minutes;
       
        staffMember.expectedReturnTime = $(this).find("td:eq(7)").text(returnT).text();
    
        
        let returntTime = $(this).find("td:eq(7)").text(returnT);
        console.log(returntTime);
        $(this).removeClass("selected");
      } else if (durationMinutes < 60) {
         // Populate table with duration staff member is away
         staffMember.duration = $(this).find("td:eq(6)").text(durationMinutes).text();
        
  
         $(this).find("td:eq(6)").text(durationMinutes);
         let arrayLeaveT = leaveT.split(":");
        
         let hours = parseInt(arrayLeaveT[0])
        //  let hours = parseInt(arrayLeaveT[0]) + parseInt(durationHours);
        //  if (hours > 23) {
        //    prompt("Please enter a valid time!");
        //  }
       
         let minutes = parseInt(arrayLeaveT[1]) + parseInt(durationMinutes);
         if (minutes < 10) {
           minutes = "0" + minutes;
         }
        
 
         // Add time staff member is expected to return
         let returnT = hours + ":" + minutes;
        
         staffMember.expectedReturnTime = $(this).find("td:eq(7)").text(returnT).text();
     
         
         $(this).find("td:eq(7)").text(returnT);
         $(this).removeClass("selected");
      }
    }
  } else {
      // If time is not in correct format.
      alert("Please enter the time in the correct format (hh:mm)");

      // Prompt the user again for the time.
      leaveT = prompt("Enter the time (hh:mm):");
      staffMember.outTime = $(this).find("td:eq(5)").text(leaveT).text();
  }

  var toastShown = false;  // variable to track whether the toast has been shown
  let lateStaffMember =  staffMembers.find(staffMember => staffMember.expectedReturnTime);
    let expected = staffMember.expectedReturnTime;
    
    let duration = staffMember.duration;
    console.log(duration);
    let durationlateStaffMember =  staffMembers.find(staffMember => staffMember.duration);
    console.log(durationlateStaffMember);
    let lateStaff = lateStaffMember.expectedReturnTime;
function showReturnToast() {
  // check if the toast has already been shown
  if (toastShown) {
    return;  // do nothing if the toast has already been shown
  }

  // check if the current time is past the estimated return time
  if (digitalClock("currentTime") > expected){
       staffMember.staffMemberIsLate();
    // set the toastShown variable to true to prevent the toast from being shown again
    toastShown = true;
  }
}
setInterval(showReturnToast, 1000);

});
}


function staffIn() {
$("#staffTable .selected").each(function () {
  let email = $(this).find("td:eq(3)").text();
  const staffMember = staffMembers.find(
    (staffMember) => staffMember.email === email
  );
  staffMember.status = $(this).find("td:eq(4)").text("In");
  staffMember.leave = $(this).find("td:eq(5)").text("");
  staffMember.duration = $(this).find("td:eq(6)").text("");
  staffMember.returnT = $(this).find("td:eq(7)").text("");
 
  $(this).removeClass("selected");
});
}

function addDelivery() {
    let vehicle = $("#vehicle").val();
    const regVehicle = /^(motorcycle|car)$/;
    let vehicleIcon = "";
    const name = $("#name").val();
    const surname = $("#surname").val();
    const telephone = $("#telephone").val();
    const deliveryAddress = $("#address").val();
    const returnTime = $("#returnTimeNow").val();
    const regPhone = /^\d{10}$/;
    const regName = /\d+$/g;

    let error = 0;
    $("#addDelivery").each(function () {
      if (vehicle == "" || !regVehicle.test(vehicle)) {
        alert('Please enter "motorcyle" or "car".');
        error++;
      }
      if (vehicle === "car") {
        vehicleIcon = '<i class="bi bi-car-front"></i>';
      } else if (vehicle === "motorcycle") {
        vehicleIcon = '<i class="bi bi-bicycle"></i>';
      }
    });
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

      $("#deliveryT").append(
        "<tr><td id='iconCell'>" +
          `${vehicleIcon}` +
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
  console.log(deliveryDrivers);
}

function clearDelivery() {
$("#deliveryTable .selected").each(function () {
  let telephone = $(this).find("td:eq(3)").text();
  const deliveryDriver = deliveryDrivers.find((deliveryDriver) => deliveryDriver.telephone === telephone);

  if (confirm("Are you sure you want to remove this delivery driver?")) {
    $("tr").filter(".selected").remove();                     //Remove row from users view
   // var indexSelected = deliveryDrivers.indexOf(deliveryDriver);      //Remove row from object
    deliveryDrivers.splice(deliveryDriver);
    console.log(deliveryDrivers);
  } else {
    $(this).removeClass("selected");
    }
  });
}

console.log(deliveryDrivers);

$("document").ready(function () {
  staffUserGet();

  setInterval(function () {
    $("#date").text(digitalClock("time"));
  }, 1000);

  $("#staffTable tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");
  });

  $("#staffOut").click(function () {
    staffOut();
  });

  $("#staffIn").click(function () {
    staffIn();
  });

  $("#addDelivery").click(function () {
    addDelivery();
  });
      
  $("#deliveryTable tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");
  });
      
  $("#clearDelivery").click(function () {
    clearDelivery();
  });
});
