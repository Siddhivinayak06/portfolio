import { getProjects, getSkills, getEducation, getMessages, getRecentProjects, getRecentMessages } from "@/lib/data";
import DashboardShell, { WrappedItem } from "./dashboard-shell";
import WelcomeBanner from "./welcome-banner";
import StatCard from "./stat-card";
import RecentProjects from "./recent-projects";
import RecentMessages from "./recent-messages";
import QuickActions from "./quick-actions";

export const dynamic = "force-dynamic";

const STAT_CONFIG = [
  {
    key: "messages",
    name: "Total Messages",
    iconName: "Mail",
    color: "text-pink-600",
    bg: "bg-pink-50 dark:bg-pink-500/10",
    border: "border-pink-100 dark:border-pink-500/20",
  },
  {
    key: "projects",
    name: "Projects",
    iconName: "Briefcase",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-100 dark:border-blue-500/20",
  },
  {
    key: "skills",
    name: "Skills",
    iconName: "Code",
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-500/10",
    border: "border-green-100 dark:border-green-500/20",
  },
  {
    key: "education",
    name: "Education",
    iconName: "GraduationCap",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-100 dark:border-purple-500/20",
  },
] as const;

export default async function AdminDashboard() {
  const [projects, skills, education, messages, recentProjects, recentMessages] =
    await Promise.all([
      getProjects(),
      getSkills(),
      getEducation(),
      getMessages(),
      getRecentProjects(),
      getRecentMessages(),
    ]);

  const counts = {
    projects: projects.length,
    skills: skills.length,
    education: education.length,
    messages: messages.length,
  } as const;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      

      <DashboardShell>
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Welcome Banner */}
          <div className="lg:col-span-7">
            <WrappedItem>
              <WelcomeBanner />
            </WrappedItem>
          </div>

          {/* Stats */}
          <div className="lg:col-span-5 self-start grid grid-cols-1 sm:grid-cols-2 gap-6">

            {STAT_CONFIG.map((stat, index) => (
              <WrappedItem key={stat.key}>
                <StatCard
                  name={stat.name}
                  value={counts[stat.key]}
                  iconName={stat.iconName}
                  color={stat.color}
                  bg={stat.bg}
                  border={stat.border}
                  index={index + 1}
                />
              </WrappedItem>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="mt-10">
          <WrappedItem>
            <QuickActions />
          </WrappedItem>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <WrappedItem>
            <RecentProjects projects={recentProjects} />
          </WrappedItem>

          <WrappedItem>
            <RecentMessages messages={recentMessages} />
          </WrappedItem>
        </div>
      </DashboardShell>
    </div>
  );
}
