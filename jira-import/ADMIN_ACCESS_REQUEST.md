# Email Template: Request Jira Admin Access

---

**COPY THIS EMAIL AND SEND TO YOUR JIRA ADMINISTRATOR:**

---

**Subject:** Request for Jira Project Creation Permissions - Academic Project

**To:** [Your Jira Administrator]

**From:** Gazal Agbaria (GazalAg@ac.sce.ac.il)

---

Dear [Admin Name],

I am working on an academic project for my course and need to create a Jira project to demonstrate Agile project management methodology. I am requesting temporary permissions to complete this assignment.

## What I Need:

**Option 1 (Preferred):** Temporary Jira Administrator global permission
- Duration: Just for this week
- Purpose: Run automated script to create project structure
- Will be returned immediately after setup

**Option 2 (Alternative):** Project-specific admin access
- Have you create an empty project called "CV Sorting System - Agile Project" (Key: PROCV)
- Grant me project admin permissions to configure it
- I can then import issues via CSV

## What I'm Creating:

- **Project Name:** CV Sorting System - Agile Project
- **Project Key:** PROCV
- **Project Type:** Scrum
- **Content:** 
  - 7 Epics
  - 10 User Stories
  - 30 Subtasks
  - 2 Sprints

## Why This is Needed:

This is for my final project demonstrating:
- Agile Scrum methodology
- Sprint planning and execution
- User story creation and tracking
- Academic requirement for course completion

## Technical Details:

I have prepared:
- Automated Python script for project setup
- CSV files for manual import (if automation not possible)
- Complete documentation of all items to be created

## Timeline:

- **Needed by:** This week (project deadline approaching)
- **Duration:** Permissions only needed for 1-2 hours to run setup
- **Can be revoked:** Immediately after project is created

## Security/Compliance:

- This is read-only academic demonstration
- No production data involved
- No external integrations
- Can be deleted after course evaluation if needed

---

**If Option 1 is not possible, could you please:**

1. Create an empty Scrum project with:
   - Name: "CV Sorting System - Agile Project"
   - Key: PROCV
   
2. Grant me project administrator permissions on that project only

3. I will then import my prepared CSV files manually

---

I appreciate your assistance with this academic requirement. Please let me know which option works best for your organization's policies.

**My Contact:**
- Email: GazalAg@ac.sce.ac.il
- Available for any questions or additional information needed

Thank you for your time and support!

Best regards,  
Gazal Agbaria

---

## ALTERNATIVE: If Your Admin Can Run the Script

If your administrator prefers to run the automation themselves, send them this:

---

**Subject:** Request to Run Jira Setup Script for Academic Project

Dear [Admin Name],

I have prepared an automated Python script that creates a complete Jira project structure for my academic assignment. Since I don't have admin permissions, could you please run this script for me?

**What you need:**
1. Python 3.9+ installed
2. Access to my project files at: `/Users/Gazal.Agbaria/Desktop/final project`
3. Your Jira admin credentials

**How to run:**
```bash
cd "/Users/Gazal.Agbaria/Desktop/final project"
python3 scripts/jira_setup.py
```

The script will prompt for:
- Your Jira email
- Your API token
- Cloud ID (I can provide: 1894af46-e6c8-4e73-af29-a2d600e1179a)

**What it creates:**
- 1 Scrum project (PROCV)
- 7 Epics with descriptions
- 10 User Stories with acceptance criteria
- 30 Subtasks
- 2 Sprints with dates

**Time required:** ~5 minutes

Alternatively, I can provide CSV files for manual import if you prefer.

Thank you!

---

## NEXT STEPS AFTER SENDING EMAIL:

### While Waiting for Response:

1. **Prepare your Jira credentials:**
   - Know your Jira site URL
   - Have your API token ready
   - Cloud ID: 1894af46-e6c8-4e73-af29-a2d600e1179a

2. **Review the CSV files:**
   - Open `epics.csv` to see what will be created
   - Open `user-stories.csv` to review stories
   - Open `README-IMPORT.md` for manual import steps

3. **Test the script locally (optional):**
   - Make sure Python dependencies are installed
   - Review `scripts/jira_setup.py` code

### If Admin Grants Full Access:

```bash
cd "/Users/Gazal.Agbaria/Desktop/final project"
python3 scripts/jira_setup.py
```

### If Admin Creates Project Only:

Follow the CSV import guide in `README-IMPORT.md`

### If Request is Denied:

Use the manual creation guide in `docs/JIRA_SETUP_GUIDE.md` (full manual, 2-3 hours)

---

## FAQ for Your Admin:

**Q: Is this safe to run?**  
A: Yes, the script only creates issues. It doesn't modify existing data or users.

**Q: Can we review the code first?**  
A: Absolutely! The script is at `scripts/jira_setup.py` - fully readable Python.

**Q: What permissions are actually needed?**  
A: "Jira Administrator" global permission to create projects via API.

**Q: Can this be done without admin rights?**  
A: Yes, but requires manual CSV import (45 min) vs automated setup (5 min).

**Q: What if we don't want to grant admin access?**  
A: Admin can run the script themselves, or create empty project and grant project-level admin.

**Q: How long do you need the permissions?**  
A: Just 1-2 hours to run the setup script once.

**Q: Can we delete this project after?**  
A: Yes, it's for academic demonstration only.

---

**GOOD LUCK!** 🍀

Copy the appropriate email template above and send it to your Jira administrator.
