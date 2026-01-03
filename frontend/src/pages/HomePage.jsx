import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get("https://contact-management-mstm.onrender.com/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <ContactForm fetchContacts={fetchContacts} />
      <ContactList contacts={contacts} fetchContacts={fetchContacts} />
    </div>
  );
}
