import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Code, FileText, Palette, Calendar, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Contribution {
  id: string;
  type: 'research' | 'design' | 'code';
  title: string;
  description: string | null;
  content: any;
  created_at: string;
}

interface Idea {
  id: string;
  title: string;
  description: string;
}

export default function ContributionDetail() {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!ideaId) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to view contributions");
        navigate("/auth");
        return;
      }

      // Fetch idea details
      const { data: ideaData, error: ideaError } = await supabase
        .from('ideas')
        .select('id, title, description')
        .eq('id', ideaId)
        .single();

      if (ideaError) {
        toast.error("Failed to load idea");
        return;
      }

      // Fetch user's contributions to this idea
      const { data: contribData, error: contribError } = await supabase
        .from('contributions')
        .select('*')
        .eq('idea_id', ideaId)
        .eq('contributor_id', user.id)
        .order('created_at', { ascending: false });

      if (contribError) {
        toast.error("Failed to load contributions");
        return;
      }

      setIdea(ideaData);
      setContributions(contribData || []);
      setLoading(false);
    };

    fetchData();
  }, [ideaId, navigate]);

  const getContributionsByType = (type: 'research' | 'design' | 'code') => {
    return contributions.filter(c => c.type === type);
  };

  const getTypeIcon = (type: 'research' | 'design' | 'code') => {
    switch (type) {
      case 'code': return <Code className="h-4 w-4" />;
      case 'design': return <Palette className="h-4 w-4" />;
      case 'research': return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: 'research' | 'design' | 'code') => {
    switch (type) {
      case 'code': return 'bg-primary/10 text-primary';
      case 'design': return 'bg-accent/10 text-accent';
      case 'research': return 'bg-secondary/10 text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading contributions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <GeometricBackground />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </Button>

        <div className="mb-12 animate-fade-in">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            {idea?.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {idea?.description}
          </p>

          {/* Contribution Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Contributions</p>
                    <p className="text-3xl font-bold">{contributions.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Code Contributions</p>
                    <p className="text-3xl font-bold">{getContributionsByType('code').length}</p>
                  </div>
                  <Code className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Design + Research</p>
                    <p className="text-3xl font-bold">
                      {getContributionsByType('design').length + getContributionsByType('research').length}
                    </p>
                  </div>
                  <Palette className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contribution Timeline */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ScrollArea className="h-[600px] pr-4">
              {contributions.map((contrib) => (
                <Card key={contrib.id} className="mb-4 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(contrib.type)}`}>
                          {getTypeIcon(contrib.type)}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{contrib.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(contrib.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getTypeColor(contrib.type)}>
                        {contrib.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  {contrib.description && (
                    <CardContent>
                      <p className="text-muted-foreground">{contrib.description}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
              {contributions.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">No contributions yet</p>
                  <p className="text-sm text-muted-foreground mt-2">Start contributing to this idea!</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          {['code', 'design', 'research'].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              <ScrollArea className="h-[600px] pr-4">
                {getContributionsByType(type as any).map((contrib) => (
                  <Card key={contrib.id} className="mb-4 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(contrib.type)}`}>
                            {getTypeIcon(contrib.type)}
                          </div>
                          <div>
                            <CardTitle className="text-xl">{contrib.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(contrib.created_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    {contrib.description && (
                      <CardContent>
                        <p className="text-muted-foreground">{contrib.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
                {getContributionsByType(type as any).length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">No {type} contributions yet</p>
                    <p className="text-sm text-muted-foreground mt-2">Be the first to contribute!</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
