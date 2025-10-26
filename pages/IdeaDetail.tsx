import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GeometricBackground } from "@/components/GeometricBackground";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  ArrowLeft,
  Users,
  Calendar,
  Target,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

export default function IdeaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in production, fetch based on id
  const idea = {
    id: Number(id),
    title: "EcoTrack - Carbon Footprint Tracker",
    description: "A comprehensive mobile application designed to help individuals track, understand, and reduce their carbon footprint through daily activities and lifestyle choices.",
    category: "environment",
    votes: 127,
    comments: 23,
    author: "Sarah Chen",
    createdAt: "2 weeks ago",
    status: "Open for Contributors",
    problem: "Climate change is one of the most pressing challenges of our time, yet many individuals struggle to understand their personal environmental impact. Current solutions are either too complex, lack real-time tracking, or fail to provide actionable insights that can lead to meaningful behavior change.",
    solution: "EcoTrack provides an intuitive, gamified experience that makes sustainability accessible and engaging. By integrating with users' daily digital footprints, it automatically tracks carbon emissions from transportation, food choices, energy consumption, and purchases, then offers personalized recommendations for reduction.",
    impact: [
      "Reduce individual carbon footprints by an average of 20-30%",
      "Educate 1M+ users about climate action within the first year",
      "Partner with local businesses to create a sustainable marketplace",
      "Build a community-driven platform for sharing eco-friendly practices"
    ],
    features: [
      "Real-time carbon footprint calculation",
      "AI-powered personalized recommendations",
      "Social challenges and community leaderboards",
      "Integration with smart home devices",
      "Carbon offset marketplace",
      "Educational resources and tips"
    ],
    contributors: 12,
    skills: ["React Native", "Node.js", "Machine Learning", "UI/UX Design"]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Geometric Background */}
      <div className="relative overflow-hidden border-b border-border">
        <GeometricBackground />
        
        <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Marketplace
          </Button>

          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="capitalize text-sm px-4 py-1">
                {idea.category}
              </Badge>
              <Badge variant="outline" className="text-sm px-4 py-1">
                {idea.status}
              </Badge>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl font-bold">
              {idea.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {idea.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Posted {idea.createdAt}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                <span>{idea.contributors} contributors</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-6">
              <Button size="lg" className="text-lg px-8">
                <Heart className="mr-2 h-5 w-5" />
                Vote ({idea.votes})
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comment ({idea.comments})
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* The Problem */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="font-display text-3xl font-bold">The Problem</h2>
            </div>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {idea.problem}
              </p>
            </Card>
          </section>

          {/* The Solution */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold">The Solution</h2>
            </div>
            <Card className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {idea.solution}
              </p>
            </Card>
          </section>

          {/* Key Features */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <h2 className="font-display text-3xl font-bold">Key Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {idea.features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Expected Impact */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-display text-3xl font-bold">Expected Impact</h2>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <ul className="space-y-4">
                {idea.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-lg">{item}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Skills Needed */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-display text-3xl font-bold">Skills Needed</h2>
            <div className="flex flex-wrap gap-3">
              {idea.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-base px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          {/* Creator Section */}
          <section className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-display text-3xl font-bold">About the Creator</h2>
            <Card className="p-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl">
                    {idea.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{idea.author}</h3>
                  <p className="text-muted-foreground">Idea Creator</p>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="animate-fadeIn" style={{ animationDelay: "0.7s" }}>
            <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
              <h2 className="font-display text-4xl font-bold mb-4">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join this project and help bring this innovative idea to life. 
                Your skills and passion can make a real difference.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="text-lg px-12 py-6">
                  Join as Contributor
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-12 py-6">
                  Ask a Question
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
