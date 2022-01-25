//Business Logic for AddressBook -----------------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};






/*Contact.prototype.addEmail = function(email) {
  email.id = this.assignId();
  this.emails[email.id] = email;
};

Contact.prototype.findEmail = function(id) {
  if (this.emails[id] != undefined) {
    return this.emails[id];
  }
  return false;
};

Contact.prototype.deleteEmail = function(id) {
  if (this.emails[id] === undefined) {
    return false;
  }
  delete this.emails[id];
  return true;
};*/




//Business Logic for Contacts ---------------------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emails = {};
  this.currentId = 0;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//Business Logic for Emails ---------------------
function Email(type, address) {
  this.type = type;
  this.address = address;
  console.log(this, "this");
}

Contact.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

Contact.prototype.addEmailAddress = function(email) {
  this.emails[email.address] = email;
  console.log(this, "this");
  console.log(email.address, "email.address");
};

Contact.prototype.findEmail = function(id) {
  if (this.emails[id] != undefined) {
    return this.emails[id];
  }
  return false;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.fullName() + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function displayEmails(contact) {
  let contactsList = $(".email-address");
  let htmlForEmails = "";
  Object.keys(contact.emails).forEach(function(key) {
    const email = contact.findEmail(key);
    htmlForEmails += "<li id=" + email.id + ">" + email.type + ": " + email.address + "</li>";
  });
  contactsList.html(htmlForEmails);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  displayEmails(contact);
  console.log(contact.emails);
  $(".email-address").html(contact.emails.address);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedEmailType = $("#type").val();
    const inputtedEmailAddress2 = $("input#new-email-address-2").val();
    const inputtedEmailType2 = $("#type-2").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-email-address-2").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    let newEmail = new Email(inputtedEmailType, inputtedEmailAddress);
    let newEmail2 = new Email(inputtedEmailType2, inputtedEmailAddress2);
    console.log(newEmail, "Email created");
    newContact.addEmailAddress(newEmail);
    newContact.addEmailAddress(newEmail2);
    addressBook.addContact(newContact);

    displayContactDetails(addressBook);
  });
});