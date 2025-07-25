import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const invoice = await fetchInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="animate-in fade-in duration-500">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} />
    </main>
  );
}
