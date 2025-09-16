// Sample job requests data
let jobRequests = [
    {
        id: "1",
        title: "Website Development",
        description: "Need a modern responsive website for my business with e-commerce functionality",
        budget: "$2,500",
        deadline: "2024-12-31",
        status: "new",
        createdAt: new Date("2024-12-01")
    },
    {
        id: "2", 
        title: "Mobile App Design",
        description: "Looking for UI/UX design for a fitness tracking mobile application",
        budget: "$1,800",
        deadline: "2024-12-25",
        status: "new",
        createdAt: new Date("2024-12-02")
    },
    {
        id: "3",
        title: "Logo Design", 
        description: "Creative logo design for a tech startup company",
        budget: "$500",
        deadline: "2024-12-20",
        status: "accepted",
        createdAt: new Date("2024-11-28")
    }
];

// DOM elements
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');
const newRequestsContainer = document.getElementById('new-requests');
const acceptedRequestsContainer = document.getElementById('accepted-requests');
const newEmptyState = document.getElementById('new-empty');
const acceptedEmptyState = document.getElementById('accepted-empty');
const newCountElement = document.getElementById('new-count');
const acceptedCountElement = document.getElementById('accepted-count');
const toastContainer = document.getElementById('toast-container');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupTabSwitching();
    renderRequests();
    updateCounts();
});

// Tab switching functionality
function setupTabSwitching() {
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked trigger and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });
}

// Format date function
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function formatCreatedAt(date) {
    return date.toLocaleDateString();
}

// Create request card HTML
function createRequestCard(request) {
    const isNew = request.status === 'new';
    const statusClass = isNew ? 'new' : 'accepted';
    const statusText = isNew ? 'New' : 'Accepted';
    
    const actionButton = isNew 
        ? `<button class="btn btn-accept" onclick="acceptRequest('${request.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            Accept Request
           </button>`
        : `<button class="btn btn-cancel" onclick="cancelRequest('${request.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18"/>
                <path d="M6 6L18 18"/>
            </svg>
            Cancel Request
           </button>`;

    return `
        <div class="request-card">
            <div class="card-header">
                <h3 class="card-title">${request.title}</h3>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="card-content">
                <p class="card-description">${request.description}</p>
                <div class="card-details">
                    <div class="detail-item budget">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                        <span>${request.budget}</span>
                    </div>
                    <div class="detail-item deadline">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 2v4"/>
                            <path d="M16 2v4"/>
                            <rect width="18" height="18" x="3" y="4" rx="2"/>
                            <path d="M3 10h18"/>
                        </svg>
                        <span>Due: ${formatDate(request.deadline)}</span>
                    </div>
                    <div class="detail-item created">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        <span>Created: ${formatCreatedAt(request.createdAt)}</span>
                    </div>
                </div>
                <div class="card-actions">
                    ${actionButton}
                </div>
            </div>
        </div>
    `;
}

// Render all requests
function renderRequests() {
    const newRequests = jobRequests.filter(req => req.status === 'new');
    const acceptedRequests = jobRequests.filter(req => req.status === 'accepted');
    
    // Render new requests
    if (newRequests.length === 0) {
        newRequestsContainer.style.display = 'none';
        newEmptyState.style.display = 'block';
    } else {
        newRequestsContainer.style.display = 'block';
        newEmptyState.style.display = 'none';
        newRequestsContainer.innerHTML = newRequests.map(createRequestCard).join('');
    }
    
    // Render accepted requests
    if (acceptedRequests.length === 0) {
        acceptedRequestsContainer.style.display = 'none';
        acceptedEmptyState.style.display = 'block';
    } else {
        acceptedRequestsContainer.style.display = 'block';
        acceptedEmptyState.style.display = 'none';
        acceptedRequestsContainer.innerHTML = acceptedRequests.map(createRequestCard).join('');
    }
}

// Update counts in tabs
function updateCounts() {
    const newCount = jobRequests.filter(req => req.status === 'new').length;
    const acceptedCount = jobRequests.filter(req => req.status === 'accepted').length;
    
    newCountElement.textContent = newCount;
    acceptedCountElement.textContent = acceptedCount;
}

// Accept request function
function acceptRequest(id) {
    const request = jobRequests.find(req => req.id === id);
    if (request) {
        request.status = 'accepted';
        renderRequests();
        updateCounts();
        showToast('Request Accepted', 'The job request has been moved to accepted requests.');
    }
}

// Cancel request function
function cancelRequest(id) {
    const request = jobRequests.find(req => req.id === id);
    if (request) {
        request.status = 'new';
        renderRequests();
        updateCounts();
        showToast('Request Cancelled', 'The job request has been moved back to new requests.');
    }
}

// Show toast notification
function showToast(title, description) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}