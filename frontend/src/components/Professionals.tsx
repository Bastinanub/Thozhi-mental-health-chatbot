import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Video, MapPin } from 'lucide-react';

const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    experience: "15 years",
    education: "Ph.D. in Clinical Psychology",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300",
    location: "New York, NY",
    availability: "Mon-Fri, 9 AM - 5 PM",
    languages: ["English", "Spanish"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Psychiatrist",
    specialties: ["Mood Disorders", "ADHD", "Anxiety"],
    experience: "12 years",
    education: "M.D., Psychiatry",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    location: "Los Angeles, CA",
    availability: "Tue-Sat, 10 AM - 6 PM",
    languages: ["English", "Mandarin"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    title: "Counseling Psychologist",
    specialties: ["Relationships", "Career Counseling", "Stress Management"],
    experience: "10 years",
    education: "Psy.D. in Counseling Psychology",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    location: "Chicago, IL",
    availability: "Mon-Thu, 11 AM - 7 PM",
    languages: ["English", "Portuguese"],
  },
];

const Professionals: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold ml-3 text-white">Connect with Professionals</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => (
          <motion.div
            key={professional.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: professional.id * 0.1 }}
            className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{professional.name}</h3>
                <p className="text-purple-600">{professional.title}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {professional.location}
              </div>
              <p className="text-gray-600">Experience: {professional.experience}</p>
              <p className="text-gray-600">Education: {professional.education}</p>
              <p className="text-gray-600">Languages: {professional.languages.join(", ")}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 mb-3">
                Available: {professional.availability}
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Professionals;