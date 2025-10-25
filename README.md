# SF Cyber Advisory - Website Deployment Guide

## Files Included
- index.html (Home page)
- services.html (Services overview)
- phishing-assessment.html (Service detail page)
- dark-web-report.html (Service detail page)
- about.html (About page)
- contact.html (Contact page)
- privacy.html (Privacy policy)
- terms.html (Terms of service)
- styles.css (All styling)
- sitemap.xml (SEO sitemap)
- robots.txt (Crawler instructions)

## Free Hosting Options

### Option 1: Netlify (Recommended)
1. Go to https://www.netlify.com and sign up for free
2. Drag and drop all website files into Netlify's deploy zone
3. Your site will be live at a temporary URL (e.g., random-name-12345.netlify.app)
4. To add your custom domain (sfcyberadvisory.in):
   - Go to Site Settings > Domain management
   - Click "Add custom domain"
   - Enter your domain: sfcyberadvisory.in
   - Follow DNS instructions to add A records and CNAME
5. Netlify provides free SSL certificates automatically

**DNS Records for Netlify:**
- A records (point @ to):
  - 75.2.60.5
- CNAME record:
  - Name: www
  - Value: [your-site-name].netlify.app

### Option 2: GitHub Pages
1. Create a GitHub account at https://github.com
2. Create a new repository (e.g., "sfcyberadvisory-website")
3. Upload all website files to the repository
4. Go to Settings > Pages
5. Select the branch to deploy (usually "main")
6. Your site will be live at username.github.io/repository-name
7. To add custom domain:
   - Add a CNAME file with your domain name
   - Configure DNS A records to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Add CNAME record: www → username.github.io

### Option 3: Zoho Sites
Zoho Sites does NOT offer free hosting for custom domains. The free plan only provides a Zoho subdomain (yoursite.zohosites.in). To use your custom domain (sfcyberadvisory.in), you need the Starter plan at $5/month.

**Not recommended for this project.**

## Post-Deployment Steps

### 1. Update Contact Form
After deployment, sign up for Formspree (https://formspree.io) to handle contact form submissions:
1. Create a free Formspree account
2. Create a new form
3. Copy your form ID
4. In contact.html, replace YOUR_FORM_ID with your actual form ID in this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### 2. Submit Sitemap to Google
1. Go to https://search.google.com/search-console
2. Add your property (sfcyberadvisory.in)
3. Verify ownership (usually via DNS TXT record)
4. Submit sitemap: https://www.sfcyberadvisory.in/sitemap.xml

### 3. Set Up Professional Email
Since you own the domain, set up email at your domain registrar or use:
- Zoho Mail (free for 1 user): https://www.zoho.com/mail/
- Google Workspace ($6/user/month): https://workspace.google.com

Create: contact@sfcyberadvisory.in

### 4. Update LinkedIn
Update your LinkedIn profile:
- Headline: "I help Mumbai SMBs prevent phishing attacks and data breaches at SF Cyber Advisory"
- About section: Brief version of your About page
- Website: Link to https://www.sfcyberadvisory.in
- Add a Canva background banner with your business name and tagline

### 5. SEO Performance Tips
- **Core Web Vitals:** Your site is already optimized for speed (minimal CSS, no heavy frameworks)
- **Mobile-friendly:** Responsive design included
- **Structured data:** Organization schema already added
- **Internal linking:** All pages link to each other logically
- **Meta descriptions:** Every page has unique title and description

### 6. Monitor Performance
After a few weeks:
- Check Google Search Console for indexing status
- Monitor Core Web Vitals report
- Track which pages get the most traffic
- Update content based on what visitors search for

## Next Steps from the 14-Day Plan
Now that your website is live:
- Day 3: Build your 50-contact target list (10-15 warm, 35-40 cold)
- Day 4: Write your outreach email template
- Days 5-7: Send outreach emails and book discovery calls
- Use the website URL in your email signature and LinkedIn

## Support
For questions about deployment, consult:
- Netlify docs: https://docs.netlify.com
- GitHub Pages docs: https://docs.github.com/en/pages
- Formspree docs: https://help.formspree.io

Good luck with your launch! 🚀
