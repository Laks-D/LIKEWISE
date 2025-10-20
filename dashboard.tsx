import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Users, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const [userName, setUserName] = useState<string>("Creator");

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else {
          setUserName(user.email?.split('@')[0] || "Creator");
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="mb-12 animate-fadeIn">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your ideas, contributions, and community impact
          </p>
        </div>

        <Tabs defaultValue="ideas" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="ideas">My Ideas</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold">EcoTrack Mobile App</h3>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A mobile app helping users track their carbon footprint
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>127 votes</span>
                    <span>23 comments</span>
                    <span>5 collaborators</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold">Community Garden Network</h3>
                    <Badge variant="secondary">Planning</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Platform connecting urban gardeners and sharing resources
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>89 votes</span>
                    <span>15 comments</span>
                    <span>3 collaborators</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-semibold">MentorMatch Platform</h3>
                    <Badge>Contributing</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Your role: Frontend Developer
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span>12 commits</span>
                    <span>8 PRs merged</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">New comment on "EcoTrack Mobile App"</p>
                  <p className="text-sm text-muted-foreground">Sarah left feedback on your implementation approach</p>
                  <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">Your idea reached 100 votes!</p>
                  <p className="text-sm text-muted-foreground">"Community Garden Network" is trending</p>
                  <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
