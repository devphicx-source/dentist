"use client";

import { useEffect, useState } from "react";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Container from "@/components/ui/Container";

// Note: In a real app, this would be protected by an API route with auth
// For this demo, we'll fetch from a server action or a public API route we'll create

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/admin/leads");
        const data = await res.json();
        setLeads(data.leads || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground">
              Lead Management Dashboard
            </h1>
            <p className="text-muted mt-2">Manage all patient inquiries from the AI Chatbot.</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl border border-border shadow-sm">
            <span className="font-bold text-primary">{leads.length}</span> Total Leads
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-border shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Date</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Patient Name</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Phone</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Reason</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-muted">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">{lead.name}</td>
                      <td className="px-6 py-4 text-sm">{lead.phone}</td>
                      <td className="px-6 py-4 text-sm max-w-xs truncate">{lead.problem || "General Query"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          lead.status === "New" ? "bg-blue-100 text-blue-700" :
                          lead.status === "Booked" ? "bg-green-100 text-green-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          className="text-sm border border-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          value={lead.status}
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Booked">Booked</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
