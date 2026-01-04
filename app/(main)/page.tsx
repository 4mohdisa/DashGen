"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Upload, 
  TrendingUp, 
  Eye, 
  Download,
  Check,
  Star,
  Users,
  Clock
} from "lucide-react";
import Header from "@/components/header";
import { SUGGESTED_PROMPTS } from "@/lib/constants";

const features = [
  {
    icon: Upload,
    title: "Upload Any Data",
    description: "Support for CSV, JSON, and Excel files. Just drag and drop your data and watch the magic happen.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Analysis",
    description: "Our AI understands your data structure and automatically recommends the best visualizations.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your dashboard come to life in real-time as the AI generates beautiful, interactive components.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Download your dashboard code or share it with a unique link. Full React components, ready to use.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const useCases = [
  {
    title: "Sales Analytics",
    description: "Track revenue, monitor sales trends, and identify top-performing products with interactive charts and KPI cards.",
    image: "📊",
    tags: ["Revenue Tracking", "Sales Trends", "KPI Cards"],
  },
  {
    title: "Financial Reporting",
    description: "Visualize expenses, income trends, and budget allocation with comprehensive financial dashboards.",
    image: "💰",
    tags: ["Budget Analysis", "Expense Tracking", "Income Trends"],
  },
  {
    title: "Marketing Metrics",
    description: "Monitor campaign performance, track conversions, and analyze customer acquisition costs.",
    image: "📈",
    tags: ["Campaign Analytics", "Conversion Rates", "ROI Tracking"],
  },
  {
    title: "HR & Team Analytics",
    description: "Track employee metrics, attendance patterns, and team performance with intuitive visualizations.",
    image: "👥",
    tags: ["Employee Metrics", "Attendance", "Performance"],
  },
  {
    title: "E-commerce Insights",
    description: "Analyze product performance, customer behavior, and inventory levels in one comprehensive view.",
    image: "🛒",
    tags: ["Product Analytics", "Customer Insights", "Inventory"],
  },
  {
    title: "Project Management",
    description: "Track project progress, team workload, and deadlines with visual project dashboards.",
    image: "📋",
    tags: ["Progress Tracking", "Team Workload", "Deadlines"],
  },
];

const stats = [
  { value: "10K+", label: "Dashboards Created" },
  { value: "50+", label: "Chart Types" },
  { value: "< 30s", label: "Average Generation Time" },
  { value: "99.9%", label: "Uptime" },
];

const testimonials = [
  {
    quote: "DashGen transformed how we present data to stakeholders. What used to take hours now takes seconds.",
    author: "Sarah Chen",
    role: "Data Analyst",
    company: "TechCorp",
  },
  {
    quote: "The AI understands exactly what visualizations work best for our data. It's like having a design expert on call.",
    author: "Michael Roberts",
    role: "Product Manager",
    company: "StartupXYZ",
  },
  {
    quote: "We've cut our reporting time by 80%. The generated dashboards are production-ready and beautiful.",
    author: "Emily Watson",
    role: "Business Intelligence Lead",
    company: "DataDriven Inc",
  },
];

export default function LandingPage() {
  return (
    <div className="relative flex grow flex-col min-h-screen">
      <div className="isolate flex h-full grow flex-col">
        <Header />

        {/* Hero Section */}
        <section className="relative px-4 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-2 text-sm mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-muted-foreground">Powered by advanced AI models</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
                Transform Data into
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Stunning Dashboards
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-10">
                Upload your data, describe what you need, and watch AI create beautiful, 
                interactive dashboards in seconds. No coding required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/create"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Creating
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" />
                </Link>
                <Link
                  href="#use-cases"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-foreground hover:bg-card transition-colors"
                >
                  View Examples
                </Link>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-16 lg:mt-24"
            >
              <div className="relative mx-auto max-w-5xl">
                {/* Dashboard Preview Mock */}
                <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md shadow-2xl overflow-hidden">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="mx-auto max-w-md h-6 rounded-md bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                        dashgen.app/create
                      </div>
                    </div>
                  </div>
                  
                  {/* Dashboard Content Preview */}
                  <div className="p-6 lg:p-8">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {[
                        { label: "Total Revenue", value: "$124,500", change: "+12.5%", color: "blue" },
                        { label: "Active Users", value: "8,420", change: "+8.2%", color: "purple" },
                        { label: "Conversion Rate", value: "3.24%", change: "+2.1%", color: "emerald" },
                        { label: "Avg. Order Value", value: "$89.50", change: "+5.7%", color: "orange" },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="rounded-xl border border-border/50 bg-card p-4"
                        >
                          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-xl font-bold text-foreground">{stat.value}</p>
                          <p className={`text-xs text-${stat.color}-500`}>{stat.change}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Chart Placeholder */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 rounded-xl border border-border/50 bg-card p-4 h-48">
                        <p className="text-sm font-medium text-foreground mb-4">Revenue Trend</p>
                        <div className="flex items-end justify-between h-32 gap-2">
                          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                              className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-purple-500"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-card p-4 h-48">
                        <p className="text-sm font-medium text-foreground mb-4">Distribution</p>
                        <div className="flex items-center justify-center h-32">
                          <div className="relative w-28 h-28">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted" />
                              <motion.circle
                                cx="50" cy="50" r="40" fill="none" strokeWidth="12"
                                strokeDasharray="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 62.8 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-blue-500"
                              />
                              <motion.circle
                                cx="50" cy="50" r="40" fill="none" strokeWidth="12"
                                strokeDasharray="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 125.6 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="text-purple-500"
                                style={{ strokeDashoffset: 125.6 }}
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -left-4 top-1/4 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm p-3 shadow-lg hidden lg:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Data uploaded</p>
                      <p className="text-xs text-muted-foreground">sales_2024.csv</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="absolute -right-4 top-1/3 rounded-xl border border-border/50 bg-card/90 backdrop-blur-sm p-3 shadow-lg hidden lg:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">Dashboard ready</p>
                      <p className="text-xs text-muted-foreground">Generated in 12s</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Everything you need to create
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  amazing dashboards
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From data upload to live preview, we&apos;ve got you covered with powerful features
                that make dashboard creation effortless.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-24 px-4 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Built for every
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> use case</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you&apos;re tracking sales, analyzing finances, or monitoring team performance,
                DashGen creates the perfect dashboard for your needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:bg-card transition-all duration-300 hover:shadow-xl"
                >
                  <div className="text-5xl mb-4">{useCase.image}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Create dashboards in
                <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent"> 3 simple steps</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Describe Your Dashboard",
                  description: "Tell us what you want to visualize. Be as specific or general as you like - our AI understands context.",
                  icon: "💬",
                },
                {
                  step: "02",
                  title: "Upload Your Data",
                  description: "Drag and drop your CSV, JSON, or Excel file. We'll automatically analyze the structure and data types.",
                  icon: "📊",
                },
                {
                  step: "03",
                  title: "Get Your Dashboard",
                  description: "Watch as AI generates a beautiful, interactive dashboard with charts, KPIs, and filters - ready to use.",
                  icon: "✨",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-7xl font-bold text-muted/30 mb-4">{item.step}</div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 right-0 translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Loved by
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> data teams</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Examples Section */}
        <section className="py-24 px-4">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Get started with
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> these prompts</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Not sure where to begin? Try one of these popular dashboard templates.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <motion.div
                  key={prompt.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href="/create"
                    className="block group rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5 hover:bg-card hover:border-blue-500/50 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {prompt.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Try this prompt <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-border/50 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Ready to transform your data?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of teams who use DashGen to create beautiful dashboards in seconds.
                  No credit card required.
                </p>
                <Link
                  href="/create"
                  className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Creating for Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-4">
                  <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DashGen
                  </span>
                </Link>
                <p className="text-muted-foreground max-w-sm">
                  AI-powered dashboard generator that transforms your data into beautiful, 
                  interactive visualizations in seconds.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/create" className="text-muted-foreground hover:text-foreground transition-colors">Create Dashboard</Link></li>
                  <li><Link href="#use-cases" className="text-muted-foreground hover:text-foreground transition-colors">Use Cases</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://twitter.com/4mohdisa" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
                      </svg>
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/4mohdisa" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DashGen. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Made with ❤️ by <Link href="https://github.com/4mohdisa" className="text-foreground hover:text-blue-500 transition-colors">Mohammed Isa</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Using Node.js runtime instead of Edge to avoid size limits (Edge limit is 1MB)
export const runtime = "nodejs";
