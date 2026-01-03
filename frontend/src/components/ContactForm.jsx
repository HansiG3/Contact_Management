import { useState } from "react";
import axios from "axios";

export default function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.name) err.name = "Name required";
    if (!form.phone) err.phone = "Phone required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await axios.post("https://contact-management-mstm.onrender.com/api/contacts", form);
    setForm({ name: "", email: "", phone: "", message: "" });
    fetchContacts();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      {errors.name && <p>{errors.name}</p>}

      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      {errors.email && <p>{errors.email}</p>}

      <input placeholder="Phone" value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })} />
      {errors.phone && <p>{errors.phone}</p>}

      <textarea placeholder="Message"
        onChange={e => setForm({ ...form, message: e.target.value })} />

      <button type="submit">Add Contact</button>
    </form>
  );
}
