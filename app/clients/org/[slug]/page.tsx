"use client";
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs";
import OrgDataTables from "../../OrgDataTables";
import OrgTables from "app/clients/OrgTables";

export default function Page() {
  const org = useOrganization();

  return (
    <section>
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <div
          style={{
            display: "inline-block",
            transform: "scale(2)",
            transformOrigin: "center",
            backgroundColor: "rgba(255,255,255,0.35)",
          }}
        >
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl={"/clients/org/:slug"}
          />
        </div>
      </div>
      <OrgDataTables orgId={org.organization?.id ?? ""} />
      <OrgTables orgId={org.organization?.id ?? ""} />
    </section>
  );
}
