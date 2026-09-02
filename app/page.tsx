import React from "react";
import { StatCards } from "@/components/dashboard/stat-cards";
import { ExpirationChart } from "@/components/dashboard/expiration-chart";
import { ObligationsList } from "@/components/dashboard/obligations-list";
import { ContractsTable } from "@/components/dashboard/contracts-table";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:p-6">
      {/* 4 Stat Cards */}
      <StatCards />

      {/* Expirations Chart + Obligations List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <ExpirationChart />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <ObligationsList />
        </div>
      </div>

      {/* Contracts Registry Table */}
      <ContractsTable />
    </div>
  );
}
