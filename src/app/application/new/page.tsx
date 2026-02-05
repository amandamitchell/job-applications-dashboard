import NewApplication from "@/components/pages/NewApplication/NewApplication";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Applications | New Application",
};

export default function NewApplicationPage() {
  return <NewApplication />;
}
