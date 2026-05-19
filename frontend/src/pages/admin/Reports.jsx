import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Changed import
import { FileText, Download } from 'lucide-react';

const Reports = () => {
  const downloadPDF = async () => {
    try {
      const res = await fetch('http://localhost/bridge/get_reports.php?type=faults');
      const data = await res.json();
      
      const doc = new jsPDF();
      doc.text("PowerBridge: Monthly Fault Event Report", 14, 15);
      
      // Corrected autoTable call
      autoTable(doc, {
        startY: 20,
        head: [['ID', 'Line ID', 'Type', 'Severity', 'Time', 'Area', 'Status']],
        body: data.map(f => [f.fault_id, f.line_id, f.fault_type, f.severity, f.detection_time, f.affected_area, f.resolution_status]),
      });
      
      doc.save("Fault_Report.pdf");
    } catch (e) { alert("Error generating PDF: " + e.message); }
  };

  const downloadCSV = async () => {
    const res = await fetch('http://localhost/bridge/get_reports.php?type=restoration');
    const data = await res.json();
    const headers = "ID,Fault ID,Backup Line,Switch Time (ms),Start Time,Repair Est\n";
    const rows = data.map(r => `${r.restoration_id},${r.fault_id},${r.backup_line_used},${r.switching_time_ms},${r.restoration_start},${r.estimated_repair_time}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Restoration_Efficiency.csv';
    a.click();
  };

  return (
    <div style={{ padding: '30px' }}>
      <h1>📊 System Reports</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
        <div style={cardS} onClick={downloadPDF}>
          <FileText size={40} color="#00008B" />
          <h3>Monthly Fault Report</h3>
          <button style={btnS}>Download PDF</button>
        </div>
        <div style={cardS} onClick={downloadCSV}>
          <FileText size={40} color="#22c55e" />
          <h3>Restoration Efficiency Report</h3>
          <button style={{...btnS, background:'#22c55e'}}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

const cardS = { background:'white', padding:'30px', borderRadius:'15px', border:'1px solid #eee', textAlign:'center', cursor:'pointer' };
const btnS = { marginTop:'20px', padding:'10px 20px', background:'#00008B', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' };

export default Reports; // Ensure this is present