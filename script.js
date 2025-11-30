// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate Skill Circles on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressCircle = entry.target.querySelector('.progress-ring-progress');
            if (progressCircle) {
                const percent = progressCircle.getAttribute('data-percent');
                const circumference = 2 * Math.PI * 64; // radius is 64
                const offset = circumference - (percent / 100) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
        }
    });
}, observerOptions);

// Observe all skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
    
    // Reset form
    contactForm.reset();
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animated Text Typing Effect (Letter by Letter)
const words = ['passionate', 'intelligent', 'creative', 'dedicated', 'innovative', 'problem-solver'];
const animatedTextElement = document.getElementById('animatedText');
let currentWordIndex = 0;
let isTyping = false;
let isDeleting = false;
let currentText = '';
let currentCharIndex = 0;

function typeText() {
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting && currentCharIndex < currentWord.length) {
        // Typing
        currentText = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        animatedTextElement.innerHTML = `<span class="word">${currentText}</span>`;
        setTimeout(typeText, 100); // Typing speed
    } else if (!isDeleting && currentCharIndex === currentWord.length) {
        // Wait before deleting
        setTimeout(() => {
            isDeleting = true;
            typeText();
        }, 2000); // Wait 2 seconds before deleting
    } else if (isDeleting && currentCharIndex > 0) {
        // Deleting
        currentText = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        animatedTextElement.innerHTML = `<span class="word">${currentText}</span>`;
        setTimeout(typeText, 50); // Deleting speed (faster)
    } else if (isDeleting && currentCharIndex === 0) {
        // Move to next word
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        setTimeout(typeText, 300); // Pause before next word
    }
}

// Start typing animation
setTimeout(typeText, 1000);

// Add CSS animations for word transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.about-content, .skill-item, .contact-item, .contact-form');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Parallax effect for photo
window.addEventListener('scroll', () => {
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        photoFrame.style.transform = `translateY(${rate}px)`;
    }
});

// Custom Cursor
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Main cursor (slower, smoother)
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Dot cursor (faster, follows directly)
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .social-link, .download-cv-btn, .nav-link, .project-card, .project-demo-btn');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// GitHub Projects Fetching
const GITHUB_USERNAME = 'iceberg011'; // GitHub username

// List of project names you want to showcase (leave empty to show all non-forked repos)
// Add your project repository names here to show only specific projects
const FEATURED_PROJECTS = [
    // 'Microcontrolleur-lavelinge',
    // 'Java',
    // Add more project names here that you want to showcase
    // Example: 'project-name-1', 'project-name-2'
];

async function fetchGitHubProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsLoading = document.getElementById('projectsLoading');
    const projectsError = document.getElementById('projectsError');

    if (!GITHUB_USERNAME || GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
        projectsLoading.style.display = 'none';
        projectsError.style.display = 'block';
        projectsError.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Please set your GitHub username in script.js (line ~250)</p>
        `;
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        
        projectsLoading.style.display = 'none';

        if (repos.length === 0) {
            projectsError.style.display = 'block';
            projectsError.innerHTML = `
                <i class="fas fa-folder-open"></i>
                <p>No public repositories found</p>
            `;
            return;
        }

        // Filter out forks and only show projects with homepage (deployed/live projects)
        let projects = repos.filter(repo => !repo.fork && repo.homepage && repo.homepage.trim() !== '');
        
        // If FEATURED_PROJECTS is specified, only show those projects (still must have homepage)
        if (FEATURED_PROJECTS.length > 0) {
            projects = projects.filter(repo => 
                FEATURED_PROJECTS.includes(repo.name) && repo.homepage && repo.homepage.trim() !== ''
            );
        }
        
        if (projects.length === 0) {
            projectsError.style.display = 'block';
            projectsError.innerHTML = `
                <i class="fas fa-globe"></i>
                <p>No deployed projects found. Add a homepage URL to your GitHub repositories to showcase them here.</p>
                <p style="margin-top: 10px; font-size: 14px; opacity: 0.7;">To add a homepage: Go to your repo → Settings → Scroll to "GitHub Pages" or add it in the repository description.</p>
            `;
            return;
        }
        
        projects.forEach(repo => {
            const projectCard = createProjectCard(repo);
            projectsGrid.appendChild(projectCard);
        });

        // Animate projects on scroll
        const projectCards = document.querySelectorAll('.project-card');
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            projectObserver.observe(card);
        });

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsLoading.style.display = 'none';
        projectsError.style.display = 'block';
    }
}

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const language = repo.language || 'Other';
    const languageColors = {
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'Python': '#3776ab',
        'Java': '#ed8b00',
        'C++': '#00599c',
        'C': '#a8b9cc',
        'HTML': '#e34c26',
        'CSS': '#1572b6',
        'Other': '#6366f1'
    };
    
    const languageColor = languageColors[language] || languageColors['Other'];
    
    card.innerHTML = `
        <div class="project-header">
            <h3 class="project-name">${repo.name}</h3>
            <a href="${repo.html_url}" target="_blank" class="project-link" aria-label="View ${repo.name} on GitHub">
                <i class="fab fa-github"></i>
            </a>
        </div>
        <p class="project-description">${repo.description || 'No description available'}</p>
        <div class="project-footer">
            <div class="project-language">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                <span>${language}</span>
            </div>
            <div class="project-stats">
                <span class="project-stat">
                    <i class="fas fa-star"></i>
                    ${repo.stargazers_count}
                </span>
                <span class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    ${repo.forks_count}
                </span>
            </div>
        </div>
        <a href="${repo.homepage}" target="_blank" class="project-demo-btn">
            <i class="fas fa-external-link-alt"></i>
            View Live Demo
        </a>
    `;
    
    return card;
}

// Fetch projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});

