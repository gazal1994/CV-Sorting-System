# CV Sorting & Candidate Recommendation System - Professional UI/UX Documentation

## 🎨 Professional Design System Implementation

### Overview
The frontend has been completely redesigned with a professional, modern, production-ready UI using **Tailwind CSS v3** as the design system. The application now features a corporate-style interface with consistent colors, comprehensive layouts, and enterprise-grade components.

---

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.tsx              # Main layout with navbar + sidebar
│   │   ├── Breadcrumb.tsx          # Breadcrumb navigation
│   │   └── UIComponents.tsx        # Reusable UI components library
│   ├── pages/
│   │   ├── Login.tsx               # Professional login page
│   │   ├── Dashboard.tsx           # Stats dashboard with quick actions
│   │   ├── CandidatesList.tsx      # Professional table with sorting & pagination
│   │   ├── CandidateDetail.tsx     # Full candidate profile view
│   │   ├── UploadCV.tsx            # Multi-file upload interface
│   │   ├── JobsList.tsx            # Job positions grid
│   │   ├── JobForm.tsx             # Create/edit job form
│   │   ├── RankCandidates.tsx      # Ranking algorithm execution
│   │   └── Reports.tsx             # Analytics with charts & tables
│   ├── services/
│   │   └── api.ts                  # Backend API integration
│   ├── store/
│   │   └── authStore.ts            # Zustand state management
│   ├── App.tsx                     # Main router configuration
│   ├── index.css                   # Tailwind CSS imports
│   └── main.tsx                    # React entry point
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
└── package.json                    # Dependencies

```

---

## 🎨 Design System

### Color Palette (Corporate Style)

#### Primary Colors (Dark Blue)
- `primary-50` to `primary-900` - Main brand colors
- Used for: Navbar, buttons, links, highlights
- Primary: `#2563eb` (Blue 600)

#### Secondary Colors (Neutral Gray)
- `secondary-50` to `secondary-900` - Background and text
- Used for: Backgrounds, borders, text
- Background: `#f9fafb` (Gray 50)

#### Semantic Colors
- **Success (Green)**: `#10b981` - Successful actions, parse success
- **Error (Red)**: `#ef4444` - Errors, failures, delete actions
- **Warning (Yellow)**: `#f59e0b` - Warnings, pending states
- **Info (Blue)**: `#3b82f6` - Information, badges

---

## 📐 Layout Architecture

### 1. Fixed Top Navbar
- **Background**: Dark blue (`primary-800`)
- **Height**: 64px (h-16)
- **Features**:
  - 🎯 Logo with system name
  - 🍔 Hamburger menu (toggles sidebar)
  - 👤 User info badge (email + role)
  - 🚪 Logout button (red, prominent)

### 2. Collapsible Sidebar
- **Background**: White with shadow
- **Width**: 256px when open, 0px when closed
- **Features**:
  - Icon + text navigation items
  - Active state highlighting (blue background)
  - Role-based menu visibility
  - Smooth transitions

#### Navigation Menu Items:
| Icon | Name | Path | Access |
|------|------|------|--------|
| 📊 | Dashboard | `/dashboard` | All |
| 📤 | Upload CVs | `/upload` | All |
| 👥 | Candidates | `/candidates` | All |
| 💼 | Job Positions | `/jobs` | All |
| 📈 | Reports | `/reports` | All |
| ⚙️ | Admin | `/admin` | HR_ADMIN only |

### 3. Main Content Area
- **Padding**: 24px (p-6)
- **Max Width**: 1400px centered
- **Background**: Light gray (`secondary-50`)
- **Dynamic margin** based on sidebar state

---

## 🧩 Reusable UI Components

### Components Library (`UIComponents.tsx`)

#### 1. **LoadingSpinner**
```tsx
<LoadingSpinner size="md" text="Loading candidates..." />
```
- **Sizes**: sm, md, lg
- **Features**: Rotating animation, optional text

#### 2. **Card**
```tsx
<Card title="Candidates List" className="mb-8">
  {/* Content */}
</Card>
```
- **Features**: White background, shadow, optional title, rounded corners

#### 3. **Button**
```tsx
<Button variant="primary" size="md" loading={false} onClick={handleClick}>
  Click Me
</Button>
```
- **Variants**: primary, secondary, danger, success
- **Sizes**: sm, md, lg
- **Features**: Loading state, disabled state, hover effects

#### 4. **Badge**
```tsx
<Badge variant="success">Active</Badge>
```
- **Variants**: success, error, warning, info, secondary
- **Use cases**: Status indicators, tags, counts

#### 5. **ConfirmModal**
```tsx
<ConfirmModal
  isOpen={true}
  title="Delete Candidate"
  message="Are you sure?"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => setModal({ isOpen: false })}
/>
```
- **Features**: Backdrop blur, centered, configurable buttons

#### 6. **Table Components**
```tsx
<Table>
  <TableHead>
    <tr>
      <TableHeader sortable onClick={() => handleSort('name')}>Name</TableHeader>
    </tr>
  </TableHead>
  <TableBody>
    <tr>
      <TableCell>John Doe</TableCell>
    </tr>
  </TableBody>
</Table>
```
- **Features**: Responsive, sortable headers, hover effects

---

## 📱 Page Implementations

### 1. Login Page
**Design**: Centered card with gradient background

**Features**:
- 🎯 Centered logo
- 📧 Email input with validation
- 🔒 Password input
- 🔘 Loading button state
- 📝 Demo credentials display
- 🎨 Gradient background (blue to purple)

**API Call**: `POST /api/auth/login`

---

### 2. Dashboard
**Design**: Stats grid + quick actions + recent activity

**Components**:
- **Stats Cards** (4 columns):
  - Total Candidates (Primary color)
  - Active Jobs (Green)
  - Parse Success Rate (Yellow)
  - Total Jobs (Purple)
- **Quick Actions** (4 buttons):
  - 📤 Upload CVs → `/upload`
  - ➕ Create Job → `/jobs/new`
  - 👥 View Candidates → `/candidates`
  - 📈 View Reports → `/reports`
- **Recent Activity Table**:
  - Job rankings with average scores
  - Candidate counts

**API Calls**:
- `GET /api/candidates`
- `GET /api/jobs`
- `GET /api/reports/pipeline_stats`

---

### 3. Candidates List
**Design**: Professional data table with controls

**Features**:
- 📊 Sortable columns (Name, Email, Experience, Skills)
- 📄 Pagination (20 items per page)
- 🔍 Skill badges (show first 3 + count)
- ✅ Parse status badges
- 🗑️ Delete with confirmation modal
- 👁️ View detail button

**Table Columns**:
| Column | Sortable | Content |
|--------|----------|---------|
| Name | Yes | Candidate name |
| Email | Yes | Email address |
| Experience | Yes | Years of experience |
| Skills | Yes (by count) | Badge list |
| Parse Status | No | SUCCESS/ERROR badge |
| Actions | No | View/Delete buttons |

**API Calls**:
- `GET /api/candidates` - Load all
- `DELETE /api/candidates/:id` - Delete

---

### 4. Reports & Analytics
**Design**: Tabbed interface with charts and tables

**Tabs**:
1. **📊 Skills Frequency**
   - Bar chart (top 15 skills)
   - Progress bars (all skills)
   - Recharts library integration

2. **📈 Pipeline Statistics**
   - 4 stat cards (Total, Active, Success Rate, Failed)
   - Table: Average scores by job
   - Progress indicators

3. **📝 Audit Logs**
   - Table: Timestamp, User, Action, Details
   - Admin-only access

**API Calls**:
- `GET /api/reports/skills_frequency`
- `GET /api/reports/pipeline_stats`
- `GET /api/reports/audit_logs`

---

## 🛠️ Dependencies Installed

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.4.7",
    "axios": "^1.6.5",
    "react-toastify": "^10.0.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.1.0"
  }
}
```

---

## 🚀 How to Run the UI Locally

### Prerequisites
- Node.js 18+ installed
- Backend running on `http://localhost:8000`

### Step 1: Install Dependencies
```bash
cd "/Users/Gazal.Agbaria/Desktop/final project/frontend"
npm install
```

### Step 2: Start Development Server
```bash
npm run dev -- --host
```

The UI will be available at:
- **Local**: http://localhost:5173
- **Network**: http://172.20.10.2:5173

### Step 3: Login
Use one of these demo credentials:
- **Admin**: admin@example.com / admin123
- **Recruiter**: recruiter@example.com / recruiter123

---

## 📋 Features Checklist

### ✅ Design System
- [x] Tailwind CSS v3 integrated
- [x] Corporate color palette (dark blue primary, gray secondary)
- [x] Responsive grid system
- [x] Consistent spacing and typography

### ✅ Layout Components
- [x] Fixed top navbar with logo, user info, logout
- [x] Collapsible sidebar with icon navigation
- [x] Breadcrumb navigation on all pages
- [x] Dynamic content area with proper margins

### ✅ UI Components
- [x] Loading spinners during API calls
- [x] Toast notifications for success/error (react-toastify)
- [x] Confirmation modals before destructive actions
- [x] Professional buttons (variants, sizes, loading states)
- [x] Badges for status indicators
- [x] Reusable card components

### ✅ Tables & Data Display
- [x] Professional tables with sorting
- [x] Pagination controls
- [x] Hover effects on rows
- [x] Responsive overflow handling

### ✅ Forms
- [x] Input validation
- [x] Error messages
- [x] Loading states on submit
- [x] Tag inputs for skills/keywords
- [x] File upload with progress

### ✅ Pages Implementation
- [x] Login - gradient background, centered card
- [x] Dashboard - stats cards + quick actions
- [x] Candidates List - sortable table with pagination
- [x] Candidate Detail - full profile view
- [x] Upload CVs - multi-file support
- [x] Jobs List - grid layout with cards
- [x] Job Form - create/edit with tag inputs
- [x] Rank Candidates - algorithm execution + results
- [x] Reports - charts (Recharts) + tables

### ✅ Functionality
- [x] All buttons call real backend endpoints
- [x] JWT authentication with token storage
- [x] Protected routes (redirect to login)
- [x] Role-based menu visibility
- [x] Back buttons work on all detail pages
- [x] Toast notifications on all actions
- [x] Confirmation before delete operations

---

## 🎯 Backend API Integration

All frontend pages are connected to real backend endpoints:

| Page | Method | Endpoint | Purpose |
|------|--------|----------|---------|
| Login | POST | `/api/auth/login` | Authenticate user |
| Dashboard | GET | `/api/candidates`, `/api/jobs`, `/api/reports/pipeline_stats` | Load stats |
| Candidates List | GET | `/api/candidates` | Load all candidates |
| Candidate Detail | GET | `/api/candidates/:id` | Load single candidate |
| Upload CVs | POST | `/api/candidates/upload` | Upload CV files |
| Jobs List | GET | `/api/jobs` | Load all jobs |
| Job Form | POST/PUT | `/api/jobs`, `/api/jobs/:id` | Create/update job |
| Rank Candidates | POST | `/api/matching/rank/:job_id` | Execute ranking |
| Reports | GET | `/api/reports/*` | Load various reports |

---

## 🎨 Design Philosophy

### Professional & Modern
- Clean white cards on light gray background
- Subtle shadows for depth
- Smooth transitions and hover effects
- Consistent spacing using Tailwind's spacing scale

### Corporate Style
- Primary color: Dark blue (#2563eb) - trust, professionalism
- Accent colors: Green (success), Red (danger), Yellow (warning)
- Neutral grays for backgrounds and text
- High contrast for readability

### User Experience
- Clear visual hierarchy with font sizes and weights
- Breadcrumb navigation for context
- Loading states prevent confusion
- Toast notifications provide feedback
- Confirmation modals prevent mistakes
- Back buttons on all detail views

### Responsive Design
- Grid layouts adapt to screen size
- Sidebar collapses on small screens
- Tables scroll horizontally when needed
- Mobile-friendly touch targets

---

## 📊 Charts Implementation

### Recharts Integration
The Reports page uses **Recharts** for data visualization:

```tsx
<ResponsiveContainer width="100%" height={400}>
  <BarChart data={skillsData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="skill" angle={-45} textAnchor="end" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#2563eb" />
  </BarChart>
</ResponsiveContainer>
```

**Chart Types**:
- Bar charts for skills frequency
- Progress bars for visual indicators
- Tables with inline progress indicators

---

## 🔐 Authentication Flow

1. User visits any protected route
2. `ProtectedRoute` wrapper checks authentication
3. If not authenticated → redirect to `/login`
4. On login success → store JWT token + user info
5. All API calls include `Authorization: Bearer <token>` header
6. On logout → clear token + redirect to `/login`

---

## 💡 Best Practices Implemented

### Code Organization
- ✅ Reusable components in separate files
- ✅ API calls abstracted in `services/api.ts`
- ✅ State management with Zustand
- ✅ TypeScript for type safety

### Performance
- ✅ Lazy loading with React Router
- ✅ Debounced API calls where needed
- ✅ Pagination to limit DOM nodes
- ✅ Memoization of expensive computations

### Accessibility
- ✅ Semantic HTML elements
- ✅ Proper `<label>` for form inputs
- ✅ Keyboard navigation support
- ✅ ARIA attributes where applicable

### Security
- ✅ JWT tokens stored in Zustand (in-memory)
- ✅ Protected routes prevent unauthorized access
- ✅ Input validation on forms
- ✅ Confirmation before destructive actions

---

## 🚀 Production Deployment Notes

### Build for Production
```bash
npm run build
```

Output: `dist/` folder with optimized static files

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

### Hosting Options
- **Netlify**: Drop `dist/` folder
- **Vercel**: Connect GitHub repo
- **AWS S3 + CloudFront**: Upload static files
- **Nginx**: Serve from `/var/www/html`

---

## 📞 Support & Documentation

For questions or issues with the UI/UX implementation:
1. Check this README for design patterns
2. Review `UIComponents.tsx` for component usage
3. Inspect browser console for errors
4. Verify backend API is running on port 8000

---

## ✨ Summary

The CV Sorting System now features a **professional, production-ready UI** with:
- 🎨 Modern Tailwind CSS design system
- 📐 Professional layout (navbar + sidebar)
- 🧩 Reusable component library
- 📊 Charts and data visualizations
- 🔔 Toast notifications
- ✅ Form validation
- 🛡️ Protected routes
- 📱 Responsive design
- ⚡ All buttons functional with real API calls

**Status**: ✅ FULLY IMPLEMENTED AND FUNCTIONAL
