// AI Security Advisor - Enhanced Logic
(function() {
    'use strict';

    // Service recommendation engine
    const serviceDatabase = {
        ptaas: {
            name: 'PTaaS - Penetration Testing as a Service',
            description: 'Comprehensive penetration testing covering web apps, APIs, networks, and infrastructure.',
            price: '₹45K - 95K',
            duration: '7-14 days',
            url: 'ptaas.html',
            icon: '🎯'
        },
        phishing: {
            name: 'Phishing Resilience Assessment',
            description: 'Test employee security awareness with realistic phishing campaigns and targeted training.',
            price: '₹25K - 45K',
            duration: '5-10 days',
            url: 'phishing-assessment.html',
            icon: '🎣'
        },
        darkweb: {
            name: 'Dark Web Threat Report',
            description: 'Monitor dark web for leaked credentials, exposed data, and threats against your organization.',
            price: '₹15K - 30K',
            duration: '3-7 days',
            url: 'dark-web-report.html',
            icon: '🕵️'
        },
        vulnerability: {
            name: 'Vulnerability Scan & Report',
            description: 'Automated and manual vulnerability assessment with CVSS risk scoring and remediation guidance.',
            price: '₹12K - 25K',
            duration: '3-5 days',
            url: 'vulnerability-scan.html',
            icon: '🔍'
        },
        policy: {
            name: 'Security Policy Pack',
            description: 'ISO 27001 compliant security policies customized for your industry and compliance needs.',
            price: '₹20K - 40K',
            duration: '7-10 days',
            url: 'policy-pack.html',
            icon: '📋'
        },
        wireless: {
            name: 'Wireless Security Audit',
            description: 'WiFi security assessment with encryption testing and rogue access point detection.',
            price: '₹18K - 35K',
            duration: '5-7 days',
            url: 'wireless-audit.html',
            icon: '📡'
        }
    };

    // Initialize form
    const form = document.getElementById('aiAdvisorForm');
    const resultsSection = document.getElementById('aiResults');
    const resultsGrid = document.getElementById('resultsGrid');
    const resultsIntro = document.getElementById('resultsIntro');
    const restartBtn = document.getElementById('restartBtn');

    if (!form) return; // Exit if form not found on page

    let currentStep = 1;
    const totalSteps = 5;

    // Handle next/previous buttons
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            
            // Validate current step
            if (!validateStep(currentStep)) {
                alert('Please select at least one option before continuing.');
                return;
            }

            // Move to next step
            currentStepEl.classList.remove('active');
            currentStep++;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            
            // Scroll to top of form
            document.getElementById('ai-advisor').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            currentStepEl.classList.remove('active');
            currentStep--;
            document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
            
            document.getElementById('ai-advisor').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) {
            alert('Please answer all questions before getting recommendations.');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const userData = {
            businessType: formData.get('businessType'),
            dataTypes: formData.getAll('dataType'),
            teamSize: formData.get('teamSize'),
            compliance: formData.getAll('compliance'),
            concerns: formData.getAll('concerns')
        };

        // Generate recommendations
        const recommendations = analyzeAndRecommend(userData);
        
        // Display results
        displayResults(recommendations, userData);
        
        // Hide form, show results
        form.style.display = 'none';
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Restart button
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Reset form
            form.reset();
            currentStep = 1;
            
            // Reset steps
            document.querySelectorAll('.form-step').forEach(step => {
                step.classList.remove('active');
            });
            document.querySelector('.form-step[data-step="1"]').classList.add('active');
            
            // Show form, hide results
            form.style.display = 'block';
            resultsSection.style.display = 'none';
            
            // Scroll to form
            document.getElementById('ai-advisor').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Validate step
    function validateStep(step) {
        const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        
        if (step === 1 || step === 3) {
            // Radio buttons - must select one
            const radios = stepEl.querySelectorAll('input[type="radio"]');
            return Array.from(radios).some(radio => radio.checked);
        } else {
            // Checkboxes - at least one recommended but not required for steps 2,4,5
            return true;
        }
    }

    // Recommendation engine
    function analyzeAndRecommend(userData) {
        const recommendations = [];
        const { businessType, dataTypes, teamSize, compliance, concerns } = userData;

        // Score-based recommendation system
        const scores = {
            ptaas: 0,
            phishing: 0,
            darkweb: 0,
            vulnerability: 0,
            policy: 0,
            wireless: 0
        };

        // Business type scoring
        if (businessType === 'saas' || businessType === 'finance') {
            scores.ptaas += 30;
            scores.darkweb += 20;
        }
        if (businessType === 'ecommerce') {
            scores.ptaas += 25;
            scores.phishing += 20;
        }
        if (businessType === 'healthcare') {
            scores.policy += 30;
            scores.ptaas += 20;
        }

        // Data type scoring
        if (dataTypes.includes('pii') || dataTypes.includes('payment')) {
            scores.ptaas += 25;
            scores.darkweb += 25;
        }
        if (dataTypes.includes('health')) {
            scores.policy += 30;
            scores.ptaas += 20;
        }
        if (dataTypes.includes('financial')) {
            scores.ptaas += 20;
            scores.darkweb += 20;
        }

        // Team size scoring
        const teamSizeNum = parseInt(teamSize.split('-')[0]);
        if (teamSizeNum >= 11) {
            scores.phishing += 30;
        }
        if (teamSizeNum >= 51) {
            scores.wireless += 20;
            scores.policy += 20;
        }

        // Compliance scoring
        if (compliance.length > 0 && !compliance.includes('none')) {
            scores.policy += 40;
            scores.ptaas += 20;
        }
        if (compliance.includes('pcidss')) {
            scores.ptaas += 30;
        }
        if (compliance.includes('iso27001')) {
            scores.policy += 35;
        }

        // Concerns scoring
        if (concerns.includes('hacking') || concerns.includes('breach')) {
            scores.ptaas += 35;
            scores.darkweb += 25;
        }
        if (concerns.includes('employees')) {
            scores.phishing += 40;
        }
        if (concerns.includes('compliance')) {
            scores.policy += 35;
            scores.ptaas += 15;
        }
        if (concerns.includes('ransomware')) {
            scores.ptaas += 25;
            scores.phishing += 20;
        }

        // Baseline scoring - everyone needs some basics
        scores.vulnerability += 15;
        scores.darkweb += 10;

        // Sort by score and get top 3
        const sortedServices = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key, score]) => ({
                key,
                service: serviceDatabase[key],
                score,
                reason: generateReason(key, userData, score)
            }));

        return sortedServices;
    }

    // Generate personalized reason
    function generateReason(serviceKey, userData, score) {
        const reasons = {
            ptaas: [
                `Your ${userData.businessType} business handles sensitive data, making comprehensive security testing critical.`,
                'Penetration testing will identify vulnerabilities before attackers exploit them.',
                'Required for compliance and enterprise customer security questionnaires.'
            ],
            phishing: [
                `With ${userData.teamSize} employees, human error is a significant risk factor.`,
                'Phishing simulations will improve security awareness across your team.',
                'Most breaches start with phishing - this is your first line of defense.'
            ],
            darkweb: [
                'Your sensitive data makes you a target - monitor for exposure proactively.',
                'Discover leaked credentials before attackers use them against you.',
                'Essential for any business handling customer or financial data.'
            ],
            vulnerability: [
                'Start with vulnerability scanning for a quick security baseline.',
                'Affordable way to identify and fix critical security issues fast.',
                'Perfect starting point before investing in comprehensive testing.'
            ],
            policy: [
                'Compliance requirements demand documented security policies.',
                `${userData.compliance.join(', ')} certification needs policy documentation.`,
                'Essential for audits, insurance, and enterprise customer contracts.'
            ],
            wireless: [
                'Office security starts with WiFi - prevent unauthorized network access.',
                'Detect rogue access points and secure your wireless infrastructure.',
                'Critical for businesses with on-premise employees and visitors.'
            ]
        };

        const serviceReasons = reasons[serviceKey] || ['Recommended based on your security profile.'];
        return serviceReasons[Math.min(Math.floor(score / 30), serviceReasons.length - 1)];
    }

    // Display results
    function displayResults(recommendations, userData) {
        // Generate intro text
        const businessTypeText = userData.businessType.charAt(0).toUpperCase() + userData.businessType.slice(1);
        resultsIntro.textContent = `Based on your ${businessTypeText} business profile with ${userData.teamSize} employees, here are your top 3 recommended security services:`;

        // Clear previous results
        resultsGrid.innerHTML = '';

        // Add recommended services
        recommendations.forEach((rec, index) => {
            const service = rec.service;
            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <div class="result-badge">#${index + 1} Recommended</div>
                <div class="result-icon">${service.icon}</div>
                <h4>${service.name}</h4>
                <p class="result-reason">${rec.reason}</p>
                <p class="result-description">${service.description}</p>
                <div class="result-meta">
                    <span class="result-price">${service.price}</span>
                    <span class="result-duration">⏱️ ${service.duration}</span>
                </div>
                <a href="${service.url}" class="btn btn-primary btn-block">Learn More →</a>
            `;
            resultsGrid.appendChild(card);
        });

        // Add estimated total
        const totalMin = recommendations.reduce((sum, rec) => {
            const price = rec.service.price.match(/₹(\d+)K/)[1];
            return sum + parseInt(price);
        }, 0);
        
        const totalMax = recommendations.reduce((sum, rec) => {
            const price = rec.service.price.match(/(\d+)K$/)[1];
            return sum + parseInt(price);
        }, 0);

        const totalCard = document.createElement('div');
        totalCard.className = 'total-estimate';
        totalCard.innerHTML = `
            <h4>💰 Estimated Total Investment</h4>
            <div class="total-price">₹${totalMin}K - ${totalMax}K</div>
            <p>Bundle discount available for multiple services</p>
        `;
        resultsGrid.appendChild(totalCard);
    }

    // Handle option card selection visual feedback
    document.querySelectorAll('.option-card input').forEach(input => {
        input.addEventListener('change', function() {
            if (this.type === 'radio') {
                // Remove selected class from siblings
                this.closest('.option-grid').querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('selected');
                });
            }
            
            // Add selected class to parent
            if (this.checked) {
                this.closest('.option-card').classList.add('selected');
            } else {
                this.closest('.option-card').classList.remove('selected');
            }
        });
    });

})();