"use client";import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Clock, BarChart2, Mic, Timer, Star } from "lucide-react";
import { Button } from "@/../components/ui/button";
import { Badge } from "@/../components/ui/badge";

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * index,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const FeatureCard = ({ icon, title, description, index, comingSoon = false }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  index: number,
  comingSoon?: boolean 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="feature-card p-6 bg-white rounded-2xl shadow-sm relative overflow-hidden"
      variants={featureVariants}
      initial="hidden"
      animate={controls}
      custom={index}
    >
      {comingSoon && (
        <span className="absolute top-4 right-4 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
          Coming Soon
        </span>
      )}
      <div className="mb-4 text-gray-900">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gray-50 opacity-20 rounded-full"></div>
    </motion.div>
  );
};

{/*const AppBadge = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
  <motion.a 
    href="#" 
    className={`app-badge inline-block ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <img src={src} alt={alt} className="h-14" />
  </motion.a>
); */}

const HomePage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isHeroInView) {
      controls.start("visible");
    }
  }, [isHeroInView, controls]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 -z-10 clip-path-hero"></div>
        <div className="max-w-7xl mx-auto">          <motion.div
            ref={heroRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-medium inline-block mb-6"
            >
              Time Tracking Simplified
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-6 relative"
            >
              <span className="relative inline-block">
                Turn chaos into clarity
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-shimmer" />
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Track time effortlessly with HustleBustle. Streamline your workflow and boost productivity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <a 
                href="https://github.com/azekowka/HustleBustle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 transition-transform hover:scale-105"
              >
                <Badge variant="outline" className="bg-gray-50 border-gray-200 flex items-center gap-1 py-1.5 px-3">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">Star on GitHub</span>
                </Badge>
              </a>
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-900 transition-colors"
                asChild
              >
                <a href="#" className="inline-flex items-center px-8 py-3 rounded-lg">
                  Get Started
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Clock className="w-10 h-10" />} 
              title="Time Tracking" 
              description="Track time with precision and ease. Never miss a minute of your productive work."
              index={0}
            />
            
            <FeatureCard 
              icon={<BarChart2 className="w-10 h-10" />} 
              title="Leaderboard" 
              description="Push your limits. Track your progress, compete with peers, and stay motivated."
              index={1}
              comingSoon
            />

            <FeatureCard 
              icon={<Mic className="w-10 h-10" />} 
              title="Voice Management" 
              description="Control your time tracking with voice commands for hands-free operation."
              index={2}
              comingSoon
            />
            
            <FeatureCard 
              icon={<Timer className="w-10 h-10" />} 
              title="Pomodoro Timer" 
              description="Boost focus with built-in pomodoro technique for optimal productivity cycles."
              index={3}
              comingSoon
            />
          </div>
        </div>
      </section>
      
      {/* App store badges
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Coming soon to mobile</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take your productivity on the go. Our mobile apps are in development and will be available soon.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AppBadge 
                src="/play.png" 
                alt="Get it on Google Play" 
                className="max-w-[155px]"
              />
              <AppBadge 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on the App Store" 
                className="max-w-[155px]"
              />
            </div>
          </motion.div>
        </div>
      </section>*/}
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} HustleBustle. All rights reserved.  
            Built by <a href="https://github.com/azekowka" className="text-gray-500 hover:underline">Azekowka🤍</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;