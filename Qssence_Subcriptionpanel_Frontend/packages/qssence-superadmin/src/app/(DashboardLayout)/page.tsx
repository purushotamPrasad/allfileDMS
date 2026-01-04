import { PageContainer, CardContainer } from "qssence-common";
export default function Dashboard() {
  return (
      <PageContainer title="Dashboard" description="this is Dashboard" >
        <CardContainer title="Title" subtitle="sub">
          <div>
            Dashboard code
          </div>
        </CardContainer>
      </PageContainer>
  );
}