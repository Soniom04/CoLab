import React, { useState, useCallback, useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBold, FaItalic, FaListUl, FaListOl } from 'react-icons/fa';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createProject } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { triggerReload } from '../redux/slices/CreateProjectSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateProjectInfo } from '../api';
import { getProjectDetails } from '../api';
import noteContext from '../context/notes/NoteContext';

// Options for multi-select
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


const initialFormState = {
  projectname: "",
  description: "",
  roles: [],
  tags: [],
  userid: ""
};

export default function New_Project() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useContext(noteContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);


  useEffect(() => {
    const loadProjectData = async () => {
      if (location.state?.isEditing && location.state?.projectId) {
        setIsEditing(true);
        try {
          const projectData = await getProjectDetails(location.state.projectId);
          if (projectData?.project) {
            setFormData({
              id: projectData.project._id,
              projectname: projectData.project.projectname,
              description: projectData.project.description,
              roles: projectData.project.roles,
              tags: projectData.project.tags,
              userid: projectData.project.userid._id
            });
          } else {
            toast.error("Failed to fetch project details.");
          }
        } catch (error) {
          console.error("Error fetching project details:", error);
          toast.error("An error occurred while fetching project details.");
        }
      } else {
        setFormData(prevState => ({ ...prevState, userid: user.userid }));
      }
      setIsLoading(false);
    };

    loadProjectData();
  }, [location.state, user.id]);

  const handleChange = (name, value) => {
    setFormData(prevState => {
      if (name === 'roles' || name === 'tags') {
        const values = value ? value.map(option => option.value) : [];
        return { ...prevState, [name]: values };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditorChange = (content, delta, source, editor) => {
    const htmlContent = editor.getHTML();
    setFormData(prevData => ({
      ...prevData,
      description: htmlContent
    }));
  };

  const handleSaveProject = async (e) => {
        e.preventDefault();
    if (formData.projectname.length < 3) {
      alert("Project name must contain at least 3 characters.");
      return;
    }
    if (formData.description === "") {
      alert("Description cannot be empty.");
      return;
    }
    try {
      let response;
      if (isEditing) {
        response = await updateProjectInfo(formData.id, formData);
      } else {
        response = await createProject(formData);
      }
      
      if (response.success) {
        dispatch(triggerReload());
        toast.success(isEditing ? "Project updated successfully!" : "Project created successfully!");
        navigate('/projects');
      } else {
        throw new Error(response.error || `Failed to ${isEditing ? 'update' : 'create'} project`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} project:`, error);
      toast.error(`Unable to ${isEditing ? 'update' : 'create'} project. Please try again.`);
    }
  };

  const customStyles = {
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
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#D1D5DB',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#000',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#000',
      ':hover': {
        backgroundColor: '#000',
        color: '#FFF',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#A0A0A0',
    }),
  };

  return (
    <div>
      <Navbar />
      <div className="pb-5 pt-14 bg-[#d2f0ff] min-h-screen">
        <form
          className="flex flex-col w-[90%] max-w-[800px] mx-auto bg-white rounded-md"
          onSubmit={handleSaveProject}
        >
          <section className="border-b-2 w-full p-4">
            <h1 className="font-medium text-2xl">{isEditing ? 'Update Project' : 'Create Project'}</h1>
          </section>

          <section className="flex flex-col border-b-2 w-full py-4 px-6 gap-6">
            <label htmlFor="projectname">
              Project Name
              <input
                required
                type="text"
                name="projectname"
                value={formData.projectname}
                placeholder="Project Name"
                onChange={(e) => handleInputChange('projectname', e.target.value)}
                minLength={3}
                className="w-full px-3 py-2 border rounded-md text-md mt-2 focus:bg-white focus:outline-none focus:border-black transition-all duration-200 hover:border-black"
              />
            </label>

            <div className="custom-editor-container">
              <label style={{ marginBottom: '5px', display: 'block' }}>Description</label>
              <ReactQuill
                value={formData.description}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    ['bold', 'italic'],
                    [{ list: 'ordered' }, { list: 'bullet' }]
                  ]
                }}
                formats={['bold', 'italic', 'list']}
                className="custom-editor text-extrabold"
                theme="snow"
              />
            </div>

            <label htmlFor="roles">
              Roles
              <Select
                isMulti
                name="roles"
                options={roleOptions}
                value={roleOptions.filter(option => formData.roles.includes(option.value))}
                onChange={(selectedOptions) => handleChange('roles', selectedOptions)}
                placeholder="Select roles"
                styles={customStyles}
              />
            </label>

            <label htmlFor="tags">
              Tags
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                value={tagOptions.filter(option => formData.tags.includes(option.value))}
                onChange={(selectedOptions) => handleChange('tags', selectedOptions)}
                placeholder="Select tags"
                styles={customStyles}
              />
            </label>
          </section>

          <section className="flex w-full p-4 gap-4">
            <button
              type="submit"
              className="w-1/2 bg-green-500 text-white py-2 rounded-md mt-4 transition-all duration-200 hover:bg-green-600"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
            <NavLink
              className="w-1/2 border px-3 py-2 rounded-md mt-4 transition-all duration-200 hover:bg-gray-50 text-center"
              to="/projects"
            >
              Cancel
            </NavLink>
          </section>
        </form>
      </div>
    </div>
  );
}