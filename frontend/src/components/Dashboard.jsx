function Dashboard({ leads }) {
  const totalLeads = leads.length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const interestedLeads = leads.filter(
    (lead) => lead.status === "Interested"
  ).length;

  return (
    <div className="dashboard">
      <div className="card">
        <h3>Total Leads</h3>
        <p>{totalLeads}</p>
      </div>

      <div className="card">
        <h3>Interested</h3>
        <p>{interestedLeads}</p>
      </div>

      <div className="card">
        <h3>Converted</h3>
        <p>{convertedLeads}</p>
      </div>
    </div>
  );
}

export default Dashboard;