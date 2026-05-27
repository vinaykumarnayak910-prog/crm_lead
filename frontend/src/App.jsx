import { useEffect, useState } from "react";

import "./styles/app.css";

import API from "./services/api";

import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import Dashboard from "./components/Dashboard";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  // get all leads
  const fetchLeads = async () => {
    try {
      const response = await API.get("/leads");

      setLeads(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // add lead
  const addLead = async (newLead) => {
    try {
      await API.post("/leads", newLead);

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  // delete lead
  const deleteLead = async (id) => {
    try {
      await API.delete(`/leads/${id}`);

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  // update status
  const updateStatus = async (id, newStatus) => {
    try {
      await API.put(`/leads/${id}`, {
        status: newStatus
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Lead Management System</h1>

      <Dashboard leads={leads} />

      <LeadForm addLead={addLead} />

      <input
        type="text"
        placeholder="Search Leads"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <LeadList
        leads={filteredLeads}
        deleteLead={deleteLead}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;