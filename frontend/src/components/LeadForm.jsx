import { useState } from "react";

function LeadForm({ addLead }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    source: "Call"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = formData.phone.trim();

    // Indian number validation
    if (phone.startsWith("+91")) {
      const indianNumber = phone.slice(3);

      if (!/^\d{10}$/.test(indianNumber)) {
        alert(
          "Indian numbers with +91 must contain exactly 10 digits"
        );
        return;
      }
    } else {
      // normal 10 digit validation
      if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must contain exactly 10 digits");
        return;
      }
    }

    addLead({
      ...formData,
      status: "Interested"
    });

    alert("Lead Added Successfully");

    setFormData({
      name: "",
      phone: "",
      source: "Call"
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
          maxLength={13}
          required
        />

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="Call">Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Field">Field</option>
        </select>

        <button type="submit">
          Add Lead
        </button>
      </form>
    </div>
  );
}

export default LeadForm;