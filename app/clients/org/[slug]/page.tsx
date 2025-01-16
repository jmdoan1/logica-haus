"use client";
import {
  OrganizationProfile,
  OrganizationSwitcher,
  useOrganization,
} from "@clerk/nextjs";
import { useEffect } from "react";

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
          }}
        >
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl={"/clients/org/:slug"}
          />
        </div>
      </div>
      {!org.isLoaded && "LOADING"}
      {org.organization?.id}
    </section>
  );
}
