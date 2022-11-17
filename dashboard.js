import DashboardLayout from "../components/layouts/dashboard/DashboardLayout";

import PrivateRoute from "../components/layouts/routes/PrivateRoute";

export default function Dashboard() {
  return (
    <PrivateRoute path={'/login'} >
      <DashboardLayout>
        <div className="py-4">
          <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
