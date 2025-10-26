import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    }

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Welcome to Likewise. You can now start pitching ideas.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <Navigation />
      
      <div className="container mx-auto px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
          {/* Left Side - Quote */}
          <div className="hidden lg:block space-y-12 animate-fadeIn">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="font-display text-6xl text-primary/20">"</span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Every idea deserves a chance.
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Join a community of builders, dreamers, and creators turning possibilities into reality.
              </p>
            </div>
            
            <div className="pt-8 space-y-5">
              <div className="group flex items-center space-x-6 p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg">Share your vision</p>
                  <p className="text-muted-foreground text-sm">Turn thoughts into actionable ideas</p>
                </div>
              </div>
              <div className="group flex items-center space-x-6 p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg">Find collaborators</p>
                  <p className="text-muted-foreground text-sm">Connect with like-minded builders</p>
                </div>
              </div>
              <div className="group flex items-center space-x-6 p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg">Launch together</p>
                  <p className="text-muted-foreground text-sm">Make your ideas come alive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl" />
            <Card className="relative p-10 lg:p-14 animate-slideUp border border-border/50 shadow-2xl backdrop-blur-xl bg-background/80">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold mb-2">Welcome</h2>
                <p className="text-muted-foreground">Join the community or sign in to continue</p>
              </div>
              
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-10 h-14 p-1.5 bg-muted/30 rounded-xl backdrop-blur-sm border border-border/50">
                  <TabsTrigger value="login" className="rounded-lg text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-lg text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-lg transition-all duration-300">Sign Up</TabsTrigger>
                </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-7">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-base">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base px-4 rounded-xl border-2 focus:ring-4 focus:ring-accent/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-base">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base px-4 rounded-xl border-2 focus:ring-4 focus:ring-accent/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 h-12 text-base rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl mt-8"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </Button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm uppercase tracking-wider">
                      <span className="bg-card px-4 text-muted-foreground font-medium">Or continue with</span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full h-12 text-base rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-7">
                  <div className="space-y-3">
                    <Label htmlFor="signup-name" className="text-base">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 text-base px-4 rounded-xl border-2 focus:ring-4 focus:ring-accent/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-email" className="text-base">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base px-4 rounded-xl border-2 focus:ring-4 focus:ring-accent/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="signup-password" className="text-base">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 text-base px-4 rounded-xl border-2 focus:ring-4 focus:ring-accent/20 transition-all duration-300"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 h-12 text-base rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl mt-8"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm uppercase tracking-wider">
                      <span className="bg-card px-4 text-muted-foreground font-medium">Or continue with</span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full h-12 text-base rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
