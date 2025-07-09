import { ExternalLink, Github, Code, Circle, CircleCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProjects } from '@/lib/notion'
import Image from 'next/image'

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: { text: "Completed", icon: CircleCheck, color: "text-green-600" },
    "in-progress": { text: "In Progress", icon: Circle, color: "text-blue-600" }
  }

  const config = statusConfig[status as keyof typeof statusConfig]
  if (!config) return null

  const Icon = config.icon

  return (
    <div className={`flex items-center gap-1 text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.text}
    </div>
  )
}

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <Card className="group h-full border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
              {project.name}
            </h3>
            <StatusBadge status={project.status} />
          </div>

          {/* Description */}
          <p className="text-sm text-muted mb-4 leading-relaxed">
            {project.excerpt}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-primary mb-2 uppercase tracking-wide">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-50 text-primary border border-gray-200 rounded font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          {project.liveLink && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 text-xs hover:bg-primary hover:text-white transition-colors"
            >
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit Site
              </a>
            </Button>
          )}
          {project.githubLink && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 text-xs hover:bg-primary hover:text-white transition-colors"
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 mr-1" />
                Source
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function ProjectsPage() {

  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="h-screen bg-white ">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto px-6 py-16 md:pt-16 md:pb-5">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            projects
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-4xl">
            A collection of full-stack applications, APIs, and developer tools. 
            Each project demonstrates different aspects of modern web development, 
            from frontend frameworks to backend architecture and DevOps practices.
          </p>
        </div>
      </header>
      <div className="relative h-[50%] w-[90%] md:h-[65%] md:w-4xl rounded-2xl mx-auto">
        <Image src="/processing.png" alt="thoughts" fill className="object-cover absolute rounded-2xl" />
      </div>
    </div>
    );
}
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            projects
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            A curated selection of full-stack applications, APIs, and developer tools. 
            Each project demonstrates different aspects of modern web development, 
            from frontend frameworks to backend architecture and DevOps practices.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Code className="w-4 h-4" />
            <span>
              View more projects on{' '}
              <a
                href="https://github.com/prag-man"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-colors"
              >
                GitHub
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}