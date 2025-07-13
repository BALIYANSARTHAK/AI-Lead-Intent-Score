import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lead } from "@/types";
import { useLeadStore } from "@/store/leadStore";
import { 
  MoreHorizontal, 
  ArrowUpDown, 
  Search, 
  Trash2,
  Star,
  StarHalf
} from "lucide-react";

export default function LeadTable() {
  const leads = useLeadStore((state) => state.leads);
  const removeLead = useLeadStore((state) => state.removeLead);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: 'ascending' | 'descending';
  }>({
    key: 'rerankedScore',
    direction: 'descending'
  });
  
  // Get score color based on the value
  const getScoreColor = (score: number | undefined) => {
    if (!score) return "bg-gray-200 text-gray-700";
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-blue-100 text-blue-800";
    if (score >= 40) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };
  
  // Sort function for the table
  const requestSort = (key: keyof Lead) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    // First filter the leads
    const filtered = leads.filter(lead => {
      const searchStr = searchTerm.toLowerCase();
      return (
        lead.email.toLowerCase().includes(searchStr) ||
        lead.phoneNumber.toLowerCase().includes(searchStr) ||
        lead.comments?.toLowerCase().includes(searchStr) ||
        lead.ageGroup.toLowerCase().includes(searchStr) ||
        lead.familyBackground.toLowerCase().includes(searchStr)
      );
    });
    
    // Then sort them
    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'ascending'
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });
  }, [leads, searchTerm, sortConfig]);

  // Format income as currency
  const formatIncome = (income: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(income);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl font-bold">Lead Scores</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('email')}
                  className="font-medium flex items-center"
                >
                  Contact Info
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('creditScore')}
                  className="font-medium flex items-center"
                >
                  Credit Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('income')}
                  className="font-medium flex items-center"
                >
                  Income
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('ageGroup')}
                  className="font-medium flex items-center"
                >
                  Demographics
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('initialScore')}
                  className="font-medium flex items-center"
                >
                  <Star className="mr-1 h-4 w-4" />
                  Initial
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => requestSort('rerankedScore')}
                  className="font-medium flex items-center"
                >
                  <StarHalf className="mr-1 h-4 w-4" />
                  AI Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No leads found. Add a new lead to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.email}</div>
                    <div className="text-sm text-muted-foreground">{lead.phoneNumber}</div>
                  </TableCell>
                  <TableCell>{lead.creditScore}</TableCell>
                  <TableCell>{formatIncome(lead.income)}</TableCell>
                  <TableCell>
                    <div>{lead.ageGroup}</div>
                    <div className="text-sm text-muted-foreground">{lead.familyBackground}</div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${getScoreColor(lead.initialScore)} font-medium`}
                    >
                      {lead.initialScore ?? "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${getScoreColor(lead.rerankedScore)} font-medium`}
                      variant="outline"
                    >
                      {lead.rerankedScore ?? "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-destructive flex items-center cursor-pointer"
                          onClick={() => removeLead(lead.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {filteredAndSortedLeads.length} lead{filteredAndSortedLeads.length !== 1 && 's'} found
      </div>
    </div>
  );
}