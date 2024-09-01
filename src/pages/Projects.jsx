import React, { useState } from 'react';
import Select from 'react-select';
import ProjectList from "../components/ProjectList";
import Navbar from "../components/Navbar";
import Spinner from '../components/Spinner';

// Define options for roles and tags (same as before)
const roleOptions = [
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Database Administrator (DBA)', label: 'Database Administrator (DBA)' },
  { value: 'Software Architect', label: 'Software Architect' },
  { value: 'Mobile App Developer', label: 'Mobile App Developer' },
  { value: 'Cloud Engineer', label: 'Cloud Engineer' },
  { value: 'Data Engineer', label: 'Data Engineer' },
  { value: 'Machine Learning Engineer', label: 'Machine Learning Engineer' },
  { value: 'Site Reliability Engineer (SRE)', label: 'Site Reliability Engineer (SRE)' },
  { value: 'Quality Assurance (QA) Engineer', label: 'Quality Assurance (QA) Engineer' },
  { value: 'Security Engineer', label: 'Security Engineer' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'UX/UI Designer', label: 'UX/UI Designer' },
  { value: 'Systems Analyst', label: 'Systems Analyst' },
  { value: 'Release Engineer', label: 'Release Engineer' },
  { value: 'Embedded Systems Developer', label: 'Embedded Systems Developer' },
  { value: 'Game Developer', label: 'Game Developer' },
  { value: 'API Developer', label: 'API Developer' },
  { value: 'Network Engineer', label: 'Network Engineer' },
  { value: 'Business Intelligence (BI) Developer', label: 'Business Intelligence (BI) Developer' },
  { value: 'Blockchain Developer', label: 'Blockchain Developer' },
  { value: 'Cybersecurity Analyst', label: 'Cybersecurity Analyst' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Data Analyst', label: 'Data Analyst' },
  { value: 'IT Support Specialist', label: 'IT Support Specialist' },
  { value: 'Technical Support Engineer', label: 'Technical Support Engineer' },
  { value: 'Software Tester', label: 'Software Tester' },
  { value: 'Web Developer', label: 'Web Developer' },
  { value: 'AI Research Scientist', label: 'AI Research Scientist' },
  { value: 'Computer Vision Engineer', label: 'Computer Vision Engineer' },
  { value: 'NLP Engineer', label: 'NLP Engineer' },
  { value: 'Robotics Engineer', label: 'Robotics Engineer' },
  { value: 'Firmware Engineer', label: 'Firmware Engineer' },
  { value: 'IoT Developer', label: 'IoT Developer' },
  { value: 'IT Project Manager', label: 'IT Project Manager' },
  { value: 'DevSecOps Engineer', label: 'DevSecOps Engineer' },
  { value: 'System Administrator', label: 'System Administrator' },
  { value: 'Application Support Analyst', label: 'Application Support Analyst' },
];

const tagOptions = [
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'CSS', label: 'CSS' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'HTML', label: 'HTML' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'Docker', label: 'Docker' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Git', label: 'Git' },
  { value: 'Jenkins', label: 'Jenkins' },
  { value: 'CI/CD', label: 'CI/CD' },
  { value: 'Agile', label: 'Agile' },
  { value: 'Scrum', label: 'Scrum' },
  { value: 'Kanban', label: 'Kanban' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: 'C++', label: 'C++' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Flutter', label: 'Flutter' },
  { value: 'Django', label: 'Django' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'Redux', label: 'Redux' },
  { value: 'Webpack', label: 'Webpack' },
  { value: 'Babel', label: 'Babel' },
  { value: 'Sass', label: 'Sass' },
  { value: 'LESS', label: 'LESS' },
  { value: 'Tailwind CSS', label: 'Tailwind CSS' },
  { value: 'Terraform', label: 'Terraform' },
  { value: 'Ansible', label: 'Ansible' },
  { value: 'Puppet', label: 'Puppet' },
];



  export default function Projects() {
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [projects, setProjects] = useState([]); // Assuming you have some way to load/set initial projects
    const [filteredProjects, setFilteredProjects] = useState([]);
  
    const handleRoleChange = (selectedOptions) => {
      setSelectedRoles(selectedOptions || []);
    };
  
    const handleTagChange = (selectedOptions) => {
      setSelectedTags(selectedOptions || []);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      filterProjects();
    };
  
    const filterProjects = () => {
      console.log('Bakchodiii')
      const filtered = projects.filter(project => {
        const roleMatch = selectedRoles.length ? selectedRoles.some(role => project.roles.includes(role.value)) : false;
        const tagMatch = selectedTags.length ? selectedTags.some(tag => project.tags.includes(tag.value)) : false;
  
        return roleMatch || tagMatch;
      });
      setFilteredProjects(filtered);
    };
  
    return (
      <>
        <Navbar />
        <div className="bg-[#d2f0ff] pt-10 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-md mt-5 bg-white p-3 py-5 pl-6 shadow-md flex flex-col lg:flex-row lg:space-x-8"
            >
              <div className="flex-1 space-y-3 lg:space-y-4 lg:w-1/2 lg:pr-4">
                <label htmlFor="roles" className="flex flex-col">
                  <span className="mb-1">Roles</span>
                  <Select
                    isMulti
                    name="roles"
                    options={roleOptions}
                    value={selectedRoles}
                    onChange={handleRoleChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Search by roles"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: '#ffffff',
                        borderColor: '#D1D5DB',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: '#000',
                        },
                        padding: '4px 8px',
                        width: '100%',
                        transition: 'all 0.2s',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#D1D5DB' : '#FFF',
                        '&:hover': {
                          backgroundColor: '#D1D5DB',
                        },
                      }),
                    }}
                  />
                </label>
              </div>
  
              <div className="flex-1 space-y-3 lg:space-y-4 lg:w-1/2 lg:pl-4">
                <label htmlFor="tags" className="flex flex-col">
                  <span className="mb-1">Tags</span>
                  <Select
                    isMulti
                    name="tags"
                    options={tagOptions}
                    value={selectedTags}
                    onChange={handleTagChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Search by tags"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        backgroundColor: '#ffffff',
                        borderColor: '#D1D5DB',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: '#000',
                        },
                        padding: '4px 8px',
                        width: '100%',
                        transition: 'all 0.2s',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? '#D1D5DB' : '#FFF',
                        '&:hover': {
                          backgroundColor: '#D1D5DB',
                        },
                      }),
                    }}
                  />
                </label>
              </div>
            </form>
          </div>
          <ProjectList
            roles={selectedRoles.map(role => role.value)}
            tags={selectedTags.map(tag => tag.value)}
          />
        </div>
        {/* <Spinner/> */}
      </>
    );
  }