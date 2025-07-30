
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 20) + 1);
  const [comments] = useState(Math.floor(Math.random() * 15) + 1);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCardClick = () => {
    navigate(`/editor/${project.id}`);
  };

  // Generate random price for demo
  const prices = ['Free', '$12.00', '$15.00', '$8.00', '$20.00'];
  const price = prices[Math.floor(Math.random() * prices.length)];

  // Generate random preview image placeholder
  const gradients = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500', 
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500'
  ];
  const gradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Project Preview */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-80 flex items-center justify-center`}>
          <div className="text-white text-2xl font-bold opacity-60">
            {project.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Project Title */}
        <h3 className="font-medium text-gray-900 mb-3 line-clamp-1">
          {project.name}
        </h3>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            {/* Likes */}
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes}</span>
            </button>

            {/* Comments */}
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>
        </div>

        {/* Creator and Price Row */}
        <div className="flex items-center justify-between">
          {/* Creator */}
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                {project.profiles?.first_name?.charAt(0) || project.profiles?.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              {project.profiles?.first_name && project.profiles?.last_name 
                ? `${project.profiles.first_name} ${project.profiles.last_name}`
                : project.profiles?.email?.split('@')[0] || 'Unknown User'
              }
            </span>
          </div>

          {/* Price */}
          <div className="text-sm font-medium text-gray-900">
            {price}
          </div>
        </div>
      </div>
    </Card>
  );
}
