const { Command } = require("commander");
const Contacts = require("./contacts.js");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await Contacts.listContacts();
      return list;
      break;

    case "get":
      const oneContact = await Contacts.getContactById(id);
      return oneContact;
      break;

    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      return newContact;
      break;

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return removedContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const start = async (argv) => {
  try {
    await invokeAction(argv).then((data) => console.table(data));
  } catch {
    (error) => console.error(error);
  }
};

start(argv);
