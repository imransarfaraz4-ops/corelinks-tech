/* =====================================================================
   Corelinks course catalog — edit this file to add / change courses.
   Order shown on the site follows the order of this array.
   Each course: { name, level, duration, desc, popular?:true }
   ===================================================================== */
window.COURSE_CATALOG = [
  {
    id: 'cisco',
    title: 'Cisco & Networking',
    icon: 'network',
    blurb: 'The world-standard networking track — from CCNA to expert-level CCIE on real Cisco gear.',
    courses: [
      { name: 'CCNA (Routing & Switching)', level: 'Beginner', duration: '2 months', popular: true, desc: 'Cisco Certified Network Associate — the foundation of networking: IP addressing, routing, switching, VLANs and security basics.' },
      { name: 'CCNP Enterprise', level: 'Intermediate', duration: '3 months', popular: true, desc: 'Advanced enterprise routing & switching, network design and troubleshooting for working professionals.' },
      { name: 'CCIE Enterprise', level: 'Expert', duration: '4–6 months', desc: 'Elite expert-level certification with intensive hands-on lab practice on live Cisco equipment.' },
      { name: 'CCNP Security', level: 'Advanced', duration: '3 months', desc: 'Secure Cisco networks: firewalls, VPNs, identity services and threat defense.' },
      { name: 'SD-WAN & SD-Access', level: 'Advanced', duration: '1 month', desc: 'Software-defined networking for modern, scalable and secure enterprise WANs.' },
    ],
  },
  {
    id: 'microsoft',
    title: 'Microsoft',
    icon: 'windows',
    blurb: 'Windows Server, MCSE and Microsoft Azure — administer and secure Microsoft environments.',
    courses: [
      { name: 'MCSE (Microsoft Certified Solutions Expert)', level: 'Advanced', duration: '3 months', popular: true, desc: 'The complete Microsoft server track: Windows Server, Active Directory, networking and enterprise infrastructure.' },
      { name: 'Windows Server Administration', level: 'Intermediate', duration: '2 months', popular: true, desc: 'Install, configure and manage Windows Server, Active Directory, DNS, DHCP, Group Policy and file services.' },
      { name: 'Microsoft Azure Fundamentals (AZ-900)', level: 'Beginner', duration: '3 weeks', desc: 'Your entry point to the cloud: core Azure services, pricing, security and governance.' },
      { name: 'Azure Administrator (AZ-104)', level: 'Intermediate', duration: '2 months', desc: 'Manage Azure identities, storage, networking and virtual machines in production.' },
      { name: 'Microsoft 365 Administration', level: 'Intermediate', duration: '1 month', desc: 'Administer Microsoft 365: Exchange Online, Teams, SharePoint, security and compliance.' },
    ],
  },
  {
    id: 'cctv',
    title: 'AI CCTV & Security Surveillance',
    icon: 'camera',
    blurb: 'Modern surveillance: IP cameras, NVRs and AI-powered video analytics.',
    courses: [
      { name: 'AI CCTV & Video Analytics', level: 'Intermediate', duration: '1 month', popular: true, desc: 'Smart surveillance with AI: face recognition, motion & object detection and intelligent alerts.' },
      { name: 'CCTV Installation & IP Cameras', level: 'Beginner', duration: '1 month', popular: true, desc: 'Hands-on installation, cabling, IP camera & NVR/DVR setup and remote monitoring.' },
      { name: 'Access Control & Biometrics', level: 'Beginner', duration: '3 weeks', desc: 'Door access, biometric attendance and integrated physical security systems.' },
    ],
  },
  {
    id: 'linux',
    title: 'Linux & Open Source',
    icon: 'linux',
    blurb: 'Master Linux servers — the backbone of the internet, cloud and DevOps.',
    courses: [
      { name: 'Linux Administration', level: 'Beginner', duration: '2 months', popular: true, desc: 'Manage Linux servers: users, permissions, services, networking and package management.' },
      { name: 'RHCSA (Red Hat Certified System Administrator)', level: 'Intermediate', duration: '2 months', desc: 'Industry-recognised Red Hat certification — real command-line system administration skills.' },
      { name: 'Shell Scripting & Automation', level: 'Intermediate', duration: '3 weeks', desc: 'Automate tasks with Bash scripting — an essential skill for admins and DevOps engineers.' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Computing & DevOps',
    icon: 'cloud',
    blurb: 'AWS and DevOps skills that top employers are hiring for right now.',
    courses: [
      { name: 'AWS Cloud (Solutions Architect Associate)', level: 'Intermediate', duration: '2 months', popular: true, desc: 'Design and run applications on Amazon Web Services — compute, storage, networking and security.' },
      { name: 'DevOps with AWS', level: 'Advanced', duration: '3 months', desc: 'CI/CD pipelines, Docker, Kubernetes, Terraform and automation for modern software delivery.' },
      { name: 'Docker & Kubernetes', level: 'Intermediate', duration: '1 month', desc: 'Containerise and orchestrate applications at scale — a must-have modern skill.' },
    ],
  },
  {
    id: 'security',
    title: 'Cybersecurity & Ethical Hacking',
    icon: 'shield',
    blurb: 'Defend networks, hack ethically and secure organisations against modern threats.',
    courses: [
      { name: 'Certified Ethical Hacker (CEH)', level: 'Intermediate', duration: '2 months', popular: true, desc: 'Think like an attacker: penetration testing, vulnerability assessment and ethical hacking tools.' },
      { name: 'Cyber Security Fundamentals', level: 'Beginner', duration: '2 months', desc: 'Core security concepts, threats, cryptography and how to protect systems and data.' },
      { name: 'Network Security Expert', level: 'Advanced', duration: '3 months', desc: 'Firewalls, VPNs, IDS/IPS and hardening enterprise networks end to end.' },
      { name: 'Palo Alto & FortiGate Firewalls', level: 'Intermediate', duration: '1 month', desc: 'Configure and manage industry-leading next-generation firewalls.' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence & Data Science',
    icon: 'ai',
    blurb: 'Generative AI, machine learning and data science — the skills of the future.',
    courses: [
      { name: 'Generative & Agentic AI with Python', level: 'Intermediate', duration: '3 months', popular: true, desc: 'Build with LLMs, prompt engineering and AI agents using Python and modern AI tools.' },
      { name: 'Data Science with AI', level: 'Intermediate', duration: '4 months', desc: 'Python, statistics, machine learning and real-world data projects end to end.' },
      { name: 'Machine Learning', level: 'Intermediate', duration: '2 months', desc: 'Supervised and unsupervised learning, model building and evaluation.' },
      { name: 'Data Analytics & Business Intelligence', level: 'Beginner', duration: '2 months', desc: 'Excel, SQL, Power BI and data storytelling for smart business decisions.' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Web Development',
    icon: 'code',
    blurb: 'From your first line of code to full-stack, job-ready web applications.',
    courses: [
      { name: 'Full Stack Web Development', level: 'Intermediate', duration: '4 months', popular: true, desc: 'HTML, CSS, JavaScript, React plus back-end & databases — build complete web apps.' },
      { name: 'Python Programming', level: 'Beginner', duration: '2 months', desc: 'The world’s most popular language — from basics to real projects and automation.' },
      { name: 'Java & Data Structures', level: 'Intermediate', duration: '3 months', desc: 'Core & advanced Java plus DSA — the foundation for strong developers.' },
      { name: 'Software Testing (Manual + Automation)', level: 'Beginner', duration: '2 months', desc: 'Manual testing, Selenium and modern automation for quality-assurance careers.' },
    ],
  },
];
