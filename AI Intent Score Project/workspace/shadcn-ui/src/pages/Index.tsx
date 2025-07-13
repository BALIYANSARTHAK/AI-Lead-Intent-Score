import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLeadStore } from "@/store/leadStore";
import LeadForm from "@/components/LeadForm";
import LeadTable from "@/components/LeadTable";
import { Progress } from "@/components/ui/progress";

export default function Index() {
  const leads = useLeadStore((state) => state.leads);
  const loading = useLeadStore((state) => state.loading);
  const clearLeads = useLeadStore((state) => state.clearLeads);
  
  // Calculate average scores if we have leads
  const averageInitialScore = leads.length 
    ? Math.round(leads.reduce((sum, lead) => sum + (lead.initialScore || 0), 0) / leads.length)
    : 0;
    
  const averageRerankedScore = leads.length 
    ? Math.round(leads.reduce((sum, lead) => sum + (lead.rerankedScore || 0), 0) / leads.length)
    : 0;
  
  return (
    <div className="container py-8">
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">AI Lead Intent Score Dashboard</h1>
        <p className="text-muted-foreground">
          Evaluate and analyze potential leads using AI-powered intent scoring
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
            <p className="text-xs text-muted-foreground">
              {leads.length === 0 ? "No leads added yet" : "Leads in database"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Initial Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageInitialScore}</div>
            <Progress value={averageInitialScore} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average AI Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRerankedScore}</div>
            <Progress value={averageRerankedScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Main content tabs */}
      <Tabs defaultValue="form" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="form">Add Lead</TabsTrigger>
            <TabsTrigger value="table">View Leads</TabsTrigger>
          </TabsList>
          
          {leads.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all leads?')) {
                  clearLeads();
                }
              }}
            >
              Clear All Leads
            </Button>
          )}
        </div>
        
        <TabsContent value="form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Lead</CardTitle>
              <CardDescription>
                Enter lead information to get an AI-powered intent score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Analysis</CardTitle>
              <CardDescription>
                View and analyze your scored leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="w-full py-12 flex justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Processing leads...</p>
                    <Progress value={80} className="w-60 mx-auto" />
                  </div>
                </div>
              ) : (
                <LeadTable />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}