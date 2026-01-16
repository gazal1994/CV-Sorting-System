"""
Jira Project Setup Script for CV Sorting & Candidate Recommendation System
Automatically creates Epics, User Stories, Subtasks, and Sprints in Jira
"""

import requests
import json
from datetime import datetime, timedelta
import time


class JiraSetup:
    def __init__(self, email, api_token, cloud_id):
        self.email = email
        self.api_token = api_token
        self.cloud_id = cloud_id
        self.base_url = f"https://api.atlassian.com/ex/jira/{cloud_id}"
        self.auth = (email, api_token)
        self.headers = {"Accept": "application/json", "Content-Type": "application/json"}
        self.project_key = "PROCV"
        self.project_id = None
        self.board_id = None

    def create_project(self):
        """Create the Jira project"""
        print("Creating Jira project...")

        url = f"{self.base_url}/rest/api/3/project"
        payload = {
            "key": self.project_key,
            "name": "CV Sorting System - Agile Project",
            "projectTypeKey": "software",
            "projectTemplateKey": "com.pyxis.greenhopper.jira:gh-scrum-template",
            "description": "Agile project for CV Sorting & Candidate Recommendation System",
            "leadAccountId": self.get_current_user_account_id(),
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)

        if response.status_code == 201:
            project = response.json()
            self.project_id = project["id"]
            print(f"✅ Project created: {project['key']}")
            time.sleep(2)
            return project
        else:
            print(f"❌ Error creating project: {response.status_code}")
            print(response.text)
            return None

    def get_current_user_account_id(self):
        """Get the current user's account ID"""
        url = f"{self.base_url}/rest/api/3/myself"
        response = requests.get(url, auth=self.auth, headers=self.headers)
        if response.status_code == 200:
            return response.json()["accountId"]
        return None

    def get_or_create_board(self):
        """Get or create Scrum board"""
        print("Setting up Scrum board...")

        # First, try to get existing boards
        url = f"{self.base_url}/rest/agile/1.0/board"
        response = requests.get(url, auth=self.auth, headers=self.headers)

        if response.status_code == 200:
            boards = response.json().get("values", [])
            for board in boards:
                if board.get("location", {}).get("projectKey") == self.project_key:
                    self.board_id = board["id"]
                    print(f"✅ Using existing board: {board['name']}")
                    return board

        # Create new board if not found
        url = f"{self.base_url}/rest/agile/1.0/board"
        payload = {
            "name": "CV Sorting Scrum Board",
            "type": "scrum",
            "filterId": self.create_filter(),
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)
        if response.status_code == 201:
            board = response.json()
            self.board_id = board["id"]
            print(f"✅ Board created: {board['name']}")
            return board
        else:
            print(f"❌ Error creating board: {response.status_code}")
            return None

    def create_filter(self):
        """Create a filter for the board"""
        url = f"{self.base_url}/rest/api/3/filter"
        payload = {
            "name": f"{self.project_key} - All Issues",
            "jql": f"project = {self.project_key} ORDER BY Rank ASC",
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)
        if response.status_code == 200:
            return response.json()["id"]
        return None

    def create_epic(self, name, summary, description):
        """Create an Epic"""
        url = f"{self.base_url}/rest/api/3/issue"
        payload = {
            "fields": {
                "project": {"key": self.project_key},
                "summary": summary,
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {"type": "paragraph", "content": [{"type": "text", "text": description}]}
                    ],
                },
                "issuetype": {"name": "Epic"},
                "labels": [name],
            }
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)

        if response.status_code == 201:
            epic = response.json()
            print(f"✅ Created Epic: {epic['key']} - {summary}")
            time.sleep(1)
            return epic
        else:
            print(f"❌ Error creating epic: {response.status_code}")
            print(response.text)
            return None

    def create_story(
        self, summary, description, epic_key, persona, priority="Medium", sprint_id=None
    ):
        """Create a User Story"""
        url = f"{self.base_url}/rest/api/3/issue"

        payload = {
            "fields": {
                "project": {"key": self.project_key},
                "summary": summary,
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {"type": "paragraph", "content": [{"type": "text", "text": description}]}
                    ],
                },
                "issuetype": {"name": "Story"},
                "priority": {"name": priority},
                "labels": [persona],
            }
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)

        if response.status_code == 201:
            story = response.json()
            story_key = story["key"]
            print(f"  ✅ Created Story: {story_key} - {summary}")

            # Link to Epic
            if epic_key:
                self.link_to_epic(story_key, epic_key)

            # Add to sprint if specified
            if sprint_id:
                self.add_to_sprint(story["id"], sprint_id)

            time.sleep(0.5)
            return story
        else:
            print(f"  ❌ Error creating story: {response.status_code}")
            print(response.text)
            return None

    def create_subtask(self, parent_key, summary, description, task_type):
        """Create a Subtask"""
        url = f"{self.base_url}/rest/api/3/issue"

        payload = {
            "fields": {
                "project": {"key": self.project_key},
                "parent": {"key": parent_key},
                "summary": summary,
                "description": {
                    "type": "doc",
                    "version": 1,
                    "content": [
                        {"type": "paragraph", "content": [{"type": "text", "text": description}]}
                    ],
                },
                "issuetype": {"name": "Subtask"},
                "labels": [task_type],
            }
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)

        if response.status_code == 201:
            subtask = response.json()
            print(f"    ✅ Created Subtask: {subtask['key']} - {summary}")
            time.sleep(0.3)
            return subtask
        else:
            print(f"    ❌ Error creating subtask: {response.status_code}")
            return None

    def link_to_epic(self, issue_key, epic_key):
        """Link an issue to an Epic"""
        url = f"{self.base_url}/rest/api/3/issue/{issue_key}"

        # Get epic link field
        payload = {"fields": {"parent": {"key": epic_key}}}

        # Alternative: use issue link
        link_url = f"{self.base_url}/rest/api/3/issueLink"
        link_payload = {
            "type": {"name": "Relates"},
            "inwardIssue": {"key": issue_key},
            "outwardIssue": {"key": epic_key},
        }

        response = requests.post(link_url, json=link_payload, auth=self.auth, headers=self.headers)
        return response.status_code == 201

    def create_sprint(self, name, start_date, end_date):
        """Create a Sprint"""
        if not self.board_id:
            print("Board ID not set, cannot create sprint")
            return None

        url = f"{self.base_url}/rest/agile/1.0/sprint"
        payload = {
            "name": name,
            "startDate": start_date,
            "endDate": end_date,
            "originBoardId": self.board_id,
        }

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)

        if response.status_code == 201:
            sprint = response.json()
            print(f"✅ Created Sprint: {sprint['name']}")
            time.sleep(1)
            return sprint
        else:
            print(f"❌ Error creating sprint: {response.status_code}")
            print(response.text)
            return None

    def add_to_sprint(self, issue_id, sprint_id):
        """Add issue to sprint"""
        url = f"{self.base_url}/rest/agile/1.0/sprint/{sprint_id}/issue"
        payload = {"issues": [issue_id]}

        response = requests.post(url, json=payload, auth=self.auth, headers=self.headers)
        return response.status_code == 204

    def setup_complete_project(self):
        """Main setup function"""
        print("\n" + "=" * 60)
        print("🚀 Starting Jira Project Setup")
        print("=" * 60 + "\n")

        # Step 1: Create project
        project = self.create_project()
        if not project:
            print("Failed to create project. Exiting.")
            return

        # Step 2: Create board
        board = self.get_or_create_board()
        if not board:
            print("Failed to create board. Continuing anyway...")

        # Step 3: Create Sprints
        print("\n📅 Creating Sprints...")
        sprint1 = self.create_sprint(
            "Sprint 1 - Foundation", "2024-12-18T00:00:00.000Z", "2025-01-03T23:59:59.000Z"
        )
        sprint2 = self.create_sprint(
            "Sprint 2 - Completion", "2025-01-04T00:00:00.000Z", "2025-01-20T23:59:59.000Z"
        )

        sprint1_id = sprint1["id"] if sprint1 else None
        sprint2_id = sprint2["id"] if sprint2 else None

        # Step 4: Create Epics
        print("\n📦 Creating Epics...")
        epics = self.create_epics()

        # Step 5: Create User Stories with Subtasks
        print("\n📝 Creating User Stories and Subtasks...")
        self.create_user_stories(epics, sprint1_id, sprint2_id)

        print("\n" + "=" * 60)
        print("✅ Jira Project Setup Complete!")
        print("=" * 60)
        print(f"\nProject Key: {self.project_key}")
        print(f"Project URL: {self.base_url}/projects/{self.project_key}")
        print("\n")

    def create_epics(self):
        """Create all Epics"""
        epics = {}

        epic_data = [
            (
                "EPIC-CV-01",
                "Authentication & Authorization",
                "User authentication, role-based access control, and security features",
            ),
            (
                "EPIC-CV-02",
                "CV Upload & Parsing",
                "Upload CVs, parse content, and extract candidate information",
            ),
            (
                "EPIC-CV-03",
                "Job Position Management",
                "Create and manage job positions with required skills",
            ),
            (
                "EPIC-CV-04",
                "Matching & Ranking Algorithm",
                "Match candidates to jobs and rank by compatibility",
            ),
            (
                "EPIC-CV-05",
                "Reports & Analytics",
                "Generate insights and reports on candidates and hiring",
            ),
            (
                "EPIC-CV-06",
                "Audit Logging",
                "Track all system activities for compliance and debugging",
            ),
            ("EPIC-CV-07", "Dashboard & UI", "User interface for all system features"),
        ]

        for epic_id, summary, description in epic_data:
            epic = self.create_epic(epic_id, summary, description)
            if epic:
                epics[epic_id] = epic["key"]

        return epics

    def create_user_stories(self, epics, sprint1_id, sprint2_id):
        """Create all User Stories with Subtasks"""

        stories_data = [
            # Sprint 1 Stories
            {
                "summary": "US-1: User Login with Role-Based Access",
                "description": "As an HR_ADMIN or HR_RECRUITER, I want to log in with my credentials so that I can access system features based on my role.",
                "epic": epics.get("EPIC-CV-01"),
                "persona": "HR_ADMIN",
                "priority": "High",
                "sprint": sprint1_id,
                "subtasks": [
                    (
                        "Frontend: Login UI",
                        "Create login form with email/password fields",
                        "Frontend",
                    ),
                    (
                        "Backend: Auth endpoints",
                        "Implement /auth/login and /auth/logout endpoints",
                        "Backend",
                    ),
                    (
                        "Testing: Auth tests",
                        "Write unit and integration tests for authentication",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-2: Upload Multiple CV Files",
                "description": "As an HR_RECRUITER, I want to upload multiple CV files so that I can evaluate candidates efficiently.",
                "epic": epics.get("EPIC-CV-02"),
                "persona": "HR_RECRUITER",
                "priority": "High",
                "sprint": sprint1_id,
                "subtasks": [
                    (
                        "Frontend: File upload component",
                        "Create drag-and-drop file upload UI",
                        "Frontend",
                    ),
                    (
                        "Backend: CV upload endpoint",
                        "Implement /candidates/upload-cv endpoint with file handling",
                        "Backend",
                    ),
                    (
                        "Testing: Upload tests",
                        "Test file upload with various formats and sizes",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-3: Parse CV Content",
                "description": "As an HR_RECRUITER, I want the system to automatically extract skills, experience, and education from CVs so that I don't have to manually enter data.",
                "epic": epics.get("EPIC-CV-02"),
                "persona": "HR_RECRUITER",
                "priority": "High",
                "sprint": sprint1_id,
                "subtasks": [
                    (
                        "Frontend: Display parsed data",
                        "Show extracted CV information in structured format",
                        "Frontend",
                    ),
                    (
                        "Backend: CV parsing logic",
                        "Implement NLP-based CV parsing algorithm",
                        "Backend",
                    ),
                    (
                        "Testing: Parser accuracy tests",
                        "Validate parsing accuracy with sample CVs",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-4: Create Job Position",
                "description": "As an HR_RECRUITER, I want to create job positions with required skills and experience so that I can match candidates.",
                "epic": epics.get("EPIC-CV-03"),
                "persona": "HR_RECRUITER",
                "priority": "High",
                "sprint": sprint1_id,
                "subtasks": [
                    (
                        "Frontend: Job creation form",
                        "Build form for job title, description, and required skills",
                        "Frontend",
                    ),
                    (
                        "Backend: Job management API",
                        "Implement CRUD endpoints for job positions",
                        "Backend",
                    ),
                    ("Testing: Job creation tests", "Test job creation and validation", "Testing"),
                ],
            },
            # Sprint 2 Stories
            {
                "summary": "US-5: Rank Candidates for Job",
                "description": "As an HR_RECRUITER, I want to see candidates ranked by match score for a job position so that I can prioritize interviews.",
                "epic": epics.get("EPIC-CV-04"),
                "persona": "HR_RECRUITER",
                "priority": "High",
                "sprint": sprint2_id,
                "subtasks": [
                    (
                        "Frontend: Ranking display",
                        "Create ranked list view with match scores",
                        "Frontend",
                    ),
                    (
                        "Backend: Matching algorithm",
                        "Implement skill-based ranking algorithm",
                        "Backend",
                    ),
                    (
                        "Testing: Algorithm validation",
                        "Test ranking accuracy with various scenarios",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-6: View Top Skills Report",
                "description": "As an HR_ADMIN, I want to see a report of top skills frequency per job so that I can understand hiring trends.",
                "epic": epics.get("EPIC-CV-05"),
                "persona": "HR_ADMIN",
                "priority": "Medium",
                "sprint": sprint2_id,
                "subtasks": [
                    (
                        "Frontend: Skills chart component",
                        "Create bar chart for skills frequency",
                        "Frontend",
                    ),
                    (
                        "Backend: Skills analytics endpoint",
                        "Implement /reports/top-skills endpoint",
                        "Backend",
                    ),
                    ("Testing: Report data tests", "Validate report calculations", "Testing"),
                ],
            },
            {
                "summary": "US-7: View Candidate Pipeline Statistics",
                "description": "As an HR_ADMIN, I want to view candidate pipeline statistics so that I can monitor recruitment efficiency.",
                "epic": epics.get("EPIC-CV-05"),
                "persona": "HR_ADMIN",
                "priority": "Medium",
                "sprint": sprint2_id,
                "subtasks": [
                    ("Frontend: Dashboard metrics", "Display KPIs and pipeline stages", "Frontend"),
                    (
                        "Backend: Pipeline analytics",
                        "Implement /reports/pipeline-stats endpoint",
                        "Backend",
                    ),
                    ("Testing: Pipeline metrics tests", "Test statistical calculations", "Testing"),
                ],
            },
            {
                "summary": "US-8: View Audit Logs",
                "description": "As an HR_ADMIN, I want to view audit logs of all system activities so that I can ensure compliance and troubleshoot issues.",
                "epic": epics.get("EPIC-CV-06"),
                "persona": "HR_ADMIN",
                "priority": "Medium",
                "sprint": sprint2_id,
                "subtasks": [
                    (
                        "Frontend: Audit log viewer",
                        "Create searchable and filterable log table",
                        "Frontend",
                    ),
                    (
                        "Backend: Audit log retrieval",
                        "Implement /audit/logs endpoint with pagination",
                        "Backend",
                    ),
                    (
                        "Testing: Audit logging tests",
                        "Verify all actions are logged correctly",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-9: Navigate Dashboard",
                "description": "As an HR_RECRUITER, I want a dashboard showing recent activities and quick actions so that I can work efficiently.",
                "epic": epics.get("EPIC-CV-07"),
                "persona": "HR_RECRUITER",
                "priority": "Medium",
                "sprint": sprint2_id,
                "subtasks": [
                    (
                        "Frontend: Dashboard layout",
                        "Create responsive dashboard with widgets",
                        "Frontend",
                    ),
                    (
                        "Backend: Dashboard data API",
                        "Aggregate data for dashboard display",
                        "Backend",
                    ),
                    (
                        "Testing: UI/UX tests",
                        "Test dashboard responsiveness and usability",
                        "Testing",
                    ),
                ],
            },
            {
                "summary": "US-10: Manage Users (Admin Only)",
                "description": "As an HR_ADMIN, I want to create, edit, and deactivate users so that I can control system access.",
                "epic": epics.get("EPIC-CV-01"),
                "persona": "HR_ADMIN",
                "priority": "Medium",
                "sprint": sprint2_id,
                "subtasks": [
                    ("Frontend: User management UI", "Build user CRUD interface", "Frontend"),
                    (
                        "Backend: User management endpoints",
                        "Implement admin-only user endpoints",
                        "Backend",
                    ),
                    ("Testing: Authorization tests", "Verify role-based access control", "Testing"),
                ],
            },
        ]

        for story_data in stories_data:
            story = self.create_story(
                summary=story_data["summary"],
                description=story_data["description"],
                epic_key=story_data["epic"],
                persona=story_data["persona"],
                priority=story_data["priority"],
                sprint_id=story_data.get("sprint"),
            )

            if story:
                # Create subtasks
                for subtask_summary, subtask_desc, task_type in story_data["subtasks"]:
                    self.create_subtask(
                        parent_key=story["key"],
                        summary=subtask_summary,
                        description=subtask_desc,
                        task_type=task_type,
                    )


def main():
    # Configuration - USE ENVIRONMENT VARIABLES IN PRODUCTION
    EMAIL = os.getenv("JIRA_EMAIL", "your-email@example.com")
    API_TOKEN = os.getenv("JIRA_API_TOKEN", "your-api-token-here")
    CLOUD_ID = os.getenv("JIRA_CLOUD_ID", "your-cloud-id-here")

    # Create and run setup
    jira = JiraSetup(EMAIL, API_TOKEN, CLOUD_ID)
    jira.setup_complete_project()


if __name__ == "__main__":
    main()
