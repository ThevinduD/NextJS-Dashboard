import Form from "@/app/ui/customers/createCustomer-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
  return (
    <main className="animate-in fade-in duration-500">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Create Customer",
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
