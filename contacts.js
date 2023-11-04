import * as contactsServices from "./db/index.js";
import { program } from "commander";

const invokeAction = async ({ action, name, email, phone, id }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsServices.listContact();
      return console.table(allContacts);
    case "get":
      const contact = await contactsServices.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contactsServices.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const deletedContact = await contactsServices.removeContact(id);
      return console.log(deletedContact);
    default:
      console.log("Unknown action");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "Z5sbDlS7pCzNsnAHLtDJd" });
// invokeAction({
//   action: "add",
//   name: "Dima",
//   email: "dima@ukr.net",
//   phone: "1222",
// });
// invokeAction( { action: "remove", id: "zJqOrNXYKH5dl_rYhZCMo" } );

program
  .option("-a, --action <type>")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);
