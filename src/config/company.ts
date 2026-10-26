export interface Company { name: string; tagline: string; introduction: string; email: string | null }
// Replace editorial starter copy with approved company information before publishing.
export const company: Company = {
  name: 'Tradex', tagline: 'A clearer path forward.',
  introduction: 'Good partnerships start with a conversation. Discover our approach, explore our services, and tell us what you have in mind.',
  email: null,
};
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
export const pages = [
  {path:'/', label:'Home', title:'Tradex | A clearer path forward', description:'Meet Tradex and explore a thoughtful approach to your next project.'},
  {path:'/services', label:'Services', title:'Services | Tradex', description:'Explore how Tradex approaches understanding needs, planning, and working together.'},
  {path:'/about', label:'About', title:'About | Tradex', description:'Learn about the principles behind Tradex: clarity, care, and collaboration.'},
  {path:'/contact', label:'Contact', title:'Contact | Tradex', description:'Start a conversation with Tradex about your needs and next steps.'},
] as const;
