import axios from "axios";

export default function ContactList({ contacts, fetchContacts }) {
  const deleteContact = async (id) => {
    await axios.delete(`https://contact-management-mstm.onrender.com/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <table border="1" width="100%" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <button onClick={() => deleteContact(c._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
