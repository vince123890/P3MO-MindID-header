import { Suspense } from "react";
import { Page, Section } from "admiral";
import CompanyDistributionContent from "../projects/_components/CompanyDistributionContent";

export const Component = () => {

  const breadcrumbs = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Projects",
      path: "/strategic-capital-project",
    },
  ];

  return (
    <Page
      title="Projects"
      breadcrumbs={breadcrumbs}
      noStyle
    >
      <Section loading={false}>
        <Suspense fallback={<div>Loading company distribution...</div>}>
          <CompanyDistributionContent linkPrefix="/strategic-capital-project" />
        </Suspense>
      </Section>
    </Page>
  );
};

export default Component;
