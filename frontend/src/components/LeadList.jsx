function LeadList({ leads, deleteLead, updateStatus }) {
  return (
    <div className="lead-list">
      <h2>All Leads</h2>

      {leads.length === 0 ? (
        <p>No leads added yet.</p>
      ) : (
        leads.map((lead) => (
          <div key={lead.id} className="lead-card">
            <h3>{lead.name}</h3>

            <p>Phone: {lead.phone}</p>

            <p>Source: {lead.source}</p>

            <div className="status-section">
              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead.id, e.target.value)
                }
              >
                <option value="Interested">
                  Interested
                </option>

                <option value="Not Interested">
                  Not Interested
                </option>

                <option value="Converted">
                  Converted
                </option>
              </select>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteLead(lead.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default LeadList;