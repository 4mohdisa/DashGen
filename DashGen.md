# DashGen - Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Core Systems](#core-systems)
5. [Data Flow](#data-flow)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Key Components](#key-components)
9. [AI Generation System](#ai-generation-system)
10. [Data Processing Pipeline](#data-processing-pipeline)
11. [Memory & Learning System](#memory--learning-system)
12. [Code Execution Environment](#code-execution-environment)
13. [Configuration & Environment](#configuration--environment)
14. [Deployment](#deployment)

---

## Project Overview

**DashGen** is an AI-powered dashboard generator that transforms data files into beautiful, interactive React dashboards in seconds. Users describe their desired dashboard, optionally upload data (CSV/JSON/Excel), and the AI generates production-ready React components with visualizations.

### Key Features

- **Intelligent Data Upload**: Automatic parsing and analysis of CSV, JSON, and Excel files
- **AI-Powered Generation**: Multiple LLM models with streaming responses
- **Follow-Up Handling**: Modifies existing dashboards instead of regenerating from scratch
- **Data Reasoning Engine**: Analyzes data structure and recommends optimal visualizations
- **Memory System**: Learns from successful dashboard patterns
- **Live Code Preview**: Sandboxed execution with CodeSandbox Sandpack
- **Dark/Light Theme**: Built-in theme support with next-themes
- **Shareable Dashboards**: Unique URLs with OpenGraph image generation

---

## Technology Stack

### Frontend

- **Framework**: Next.js 15.1.4 with App Router and Edge Runtime
- **UI Library**: React 19 with TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4.17 with custom theme configuration
- **Component Libraries**:
  - Radix UI Themes 3.1.6
  - Radix UI Primitives (select, radio, switch, tooltip, toast)
  - Shadcn UI patterns
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React 0.468
- **Code Preview**: CodeSandbox Sandpack 2.19.10

### Backend

- **Runtime**: Node.js 18+
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma 6.2.1 with Neon adapter
- **AI Provider**: Together AI API (Llama 3.1 405B, DeepSeek V3, Qwen 2.5 Coder, Llama 3.3 70B)

### Data Processing

- **CSV Parsing**: Papa Parse 5.5.3
- **Excel Processing**: SheetJS/XLSX 0.18.5
- **Validation**: Zod 3.24.1
- **Form Handling**: Conform 1.2.2
- **Visualization**: Recharts (generated code), Chart.js references

### File Storage

- **Primary**: Local file system (`/uploads/` directory)
- **Optional**: AWS S3 via next-s3-upload 0.3.4
- **File IDs**: nanoid (16-character unique identifiers)

### Additional Libraries

- **Theme Management**: Next Themes 0.4.6
- **Notifications**: Sonner 1.7.2
- **Markdown**: React Markdown 9.0.3
- **Syntax Highlighting**: Shiki 1.27.2
- **Analytics**: Next Plausible 3.12.4
- **Observability**: Helicone API (optional)

---

## Architecture Overview

### Directory Structure

```
DashGen/
├── app/                                    # Next.js App Router
│   ├── (main)/                             # Main application group
│   │   ├── page.tsx                        # Home page (dashboard creation)
│   │   ├── layout.tsx                      # Layout with providers
│   │   ├── actions.ts                      # Server actions (createChat)
│   │   ├── providers.tsx                   # Context providers
│   │   ├── chats/[id]/                     # Chat interface (dynamic route)
│   │   │   ├── page.tsx                    # Server component (data fetching)
│   │   │   ├── page.client.tsx             # Client component (UI logic)
│   │   │   ├── chat-box.tsx                # User input component
│   │   │   ├── chat-log.tsx                # Message display
│   │   │   ├── code-viewer.tsx             # Code display with syntax highlighting
│   │   │   ├── code-viewer-layout.tsx      # Layout for code preview
│   │   │   ├── share.tsx                   # Share functionality
│   │   │   └── error.tsx                   # Error boundary
│   │   └── share/                          # Public share pages
│   ├── api/                                # API routes
│   │   ├── get-next-completion-stream-promise/route.ts  # LLM streaming
│   │   ├── upload-data/route.ts            # File upload handler
│   │   ├── import-data/route.ts            # Data parsing & import
│   │   ├── s3-upload/route.ts              # S3 integration
│   │   └── og/route.tsx                    # OpenGraph image generation
│   ├── layout.tsx                          # Root layout (metadata, theme)
│   ├── globals.css                         # Global Tailwind styles
│   ├── not-found.tsx                       # 404 page
│   └── robots.txt                          # SEO configuration
├── components/                             # React components
│   ├── code-runner.tsx                     # Code execution wrapper
│   ├── code-runner-react.tsx               # React-specific Sandpack runner
│   ├── code-runner-actions.ts              # Server-side code actions
│   ├── header.tsx                          # Navigation header
│   ├── theme-provider.tsx                  # Theme context wrapper
│   ├── theme-toggle.tsx                    # Dark/light mode switcher
│   ├── syntax-highlighter.tsx              # Code syntax highlighting
│   ├── ui/                                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── drawer.tsx
│   │   ├── switch.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   └── icons/                              # Custom icon components
├── lib/                                    # Utility libraries
│   ├── constants.ts                        # Model list, prompts
│   ├── prompts.ts                          # AI system prompts
│   ├── dashboard-examples.ts               # 686 lines of example dashboards
│   ├── dashboard-rules.ts                  # Generation rules engine
│   ├── data-parser.ts                      # CSV/JSON/Excel parsing
│   ├── data-reasoning.ts                   # AI data analysis engine
│   ├── data-importer-client.ts             # Client-side data import
│   ├── memory.ts                           # Dashboard pattern memory
│   ├── follow-up-helpers.ts                # Follow-up intent detection
│   ├── file-storage.ts                     # File upload utility
│   ├── prisma.ts                           # Prisma client wrapper
│   ├── utils.ts                            # General utilities
│   ├── domain.ts                           # Domain detection
│   ├── radix-examples.ts                   # Radix UI examples
│   ├── radix-docs/                         # Radix documentation
│   ├── shadcn-examples.ts                  # Shadcn UI examples
│   └── shadcn-docs/                        # Shadcn documentation
├── hooks/                                  # Custom React hooks
│   ├── use-media-query.ts                  # Responsive design hook
│   ├── use-scroll-to.ts                    # Scroll utility
│   └── use-toast.ts                        # Toast notifications
├── prisma/                                 # Database configuration
│   └── schema.prisma                       # Database schema
├── public/                                 # Static assets
│   └── logo.png
├── uploads/                                # File upload storage
├── Configuration Files
│   ├── tsconfig.json                       # TypeScript configuration
│   ├── next.config.ts                      # Next.js configuration
│   ├── tailwind.config.ts                  # Tailwind design tokens
│   ├── postcss.config.mjs                  # PostCSS for Tailwind
│   ├── components.json                     # Shadcn components manifest
│   ├── .eslintrc.json                      # ESLint rules
│   ├── .prettierrc                         # Prettier formatting
│   └── .env                                # Environment variables
└── Documentation
    ├── README.md                           # Main documentation
    ├── CONTRIBUTING.md                     # Contribution guidelines
    ├── CLAUDE_MEMORY.md                    # AI context preservation
    ├── DATABASE_STRATEGY.md                # Database improvements
    ├── FOLLOW_UP_SYSTEM.md                 # Follow-up handling docs
    ├── DASHBOARD_FIXES.md                  # Dashboard fixes log
    └── UI_AND_DATA_FIXES.md                # UI improvements log
```

### Architectural Patterns

1. **Server Components First**: Data fetching happens in React Server Components
2. **Client Components for Interactivity**: UI logic in client components with "use client" directive
3. **Server Actions**: Form submissions and mutations via Next.js server actions
4. **Streaming Responses**: Real-time LLM code generation with streaming API
5. **Context API**: Global state management for theme, chat state
6. **Edge Runtime**: Optimized serverless functions for API routes
7. **Sandboxed Execution**: Isolated code execution via CodeSandbox Sandpack

---

## Core Systems

### 1. Chat System

**Purpose**: Manages conversation sessions between users and the AI

**Components**:
- `app/(main)/chats/[id]/page.tsx` - Server component for data fetching
- `app/(main)/chats/[id]/page.client.tsx` - Client component for chat UI
- `app/(main)/chats/[id]/chat-box.tsx` - User message input
- `app/(main)/chats/[id]/chat-log.tsx` - Message history display

**Flow**:
1. User creates chat via `createChat` server action
2. Chat record created in database with unique ID
3. User navigates to `/chats/{id}`
4. Messages stored with position tracking
5. Real-time streaming updates from AI

### 2. AI Generation System

**Purpose**: Generates React dashboard code using LLM models

**Components**:
- `api/get-next-completion-stream-promise/route.ts` - Main streaming endpoint
- `lib/prompts.ts` - System prompts and instructions
- `lib/dashboard-examples.ts` - Example dashboards for context
- `lib/dashboard-rules.ts` - Generation rules and validation

**Models Available**:
- Llama 3.1 405B (most powerful)
- DeepSeek V3 (balanced)
- Qwen 2.5 Coder (specialized for coding)
- Llama 3.3 70B (faster, efficient)

**Features**:
- Streaming responses for real-time feedback
- Context-aware code generation
- Follow-up detection and modification
- Example-based learning

### 3. Data Processing Pipeline

**Purpose**: Parse, analyze, and prepare data for dashboard generation

**Components**:
- `lib/data-parser.ts` - File parsing logic
- `lib/data-reasoning.ts` - AI-powered data analysis
- `lib/data-importer-client.ts` - Client-side import handling
- `api/upload-data/route.ts` - File upload endpoint
- `api/import-data/route.ts` - Data import endpoint

**Supported Formats**:
- CSV (via Papa Parse)
- JSON (native parsing)
- Excel (.xlsx, .xls via SheetJS)

**Process**:
1. File uploaded to `/uploads/` directory
2. File parsed based on MIME type
3. Data structure analyzed (columns, types, patterns)
4. Chart recommendations generated
5. Data summary included in AI prompt

### 4. Memory & Learning System

**Purpose**: Store and retrieve successful dashboard patterns

**Components**:
- `lib/memory.ts` - Memory storage and retrieval
- `DashboardMemory` database model
- Pattern similarity matching

**Stored Information**:
- Data schema (columns, types)
- User intent (original prompt)
- Successful UI elements
- Common mistakes to avoid
- Best practices discovered

**Matching Algorithm**:
- Calculates similarity scores between current and stored patterns
- Returns relevant examples for AI context
- Improves generation quality over time

### 5. Follow-Up System

**Purpose**: Detect when user is modifying existing dashboard vs. creating new

**Components**:
- `lib/follow-up-helpers.ts` - Intent detection logic
- Message context analysis
- Code modification tracking

**Detection Logic**:
```typescript
// Checks for modification keywords
isFollowUp = detectFollowUpIntent(userMessage, chatHistory)

// Examples of follow-up intents:
// - "change the color to blue"
// - "add a pie chart"
// - "remove that table"
// - "make it responsive"
```

**Benefits**:
- Faster responses (modifies existing code)
- Preserves working components
- Better user experience
- Reduced token usage

### 6. Code Execution Environment

**Purpose**: Safely execute generated React code in browser

**Components**:
- `components/code-runner.tsx` - Main wrapper
- `components/code-runner-react.tsx` - React-specific runner
- CodeSandbox Sandpack integration

**Features**:
- Isolated iframe execution
- Hot module reloading
- Error boundary handling
- Responsive preview
- Real-time code updates

**Security**:
- Sandboxed execution environment
- No access to parent window
- CSP headers enforced
- User code isolated from application

---

## Data Flow

### Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. HOME PAGE (/)                                                 │
│    User enters: "Create a sales dashboard"                      │
│    Uploads: sales_data.csv                                      │
│    Selects: Llama 3.1 405B model                                │
│    Clicks: Generate button                                      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. SERVER ACTION (actions.ts)                                   │
│    createChat({prompt, model, shadcn: true})                    │
│    → Creates Chat record in database                            │
│    → Returns chatId: "abc123xyz456"                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. FILE UPLOAD (/api/upload-data)                               │
│    POST request with FormData                                   │
│    → Saves to /uploads/abc123xyz456.csv                         │
│    → Returns fileId: "file_abc123"                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. DATA IMPORT (/api/import-data)                               │
│    POST {chatId, fileId, fileName}                              │
│    → Reads file from /uploads/                                  │
│    → Parses CSV with Papa Parse                                 │
│    → Analyzes structure: {columns, types, rowCount}             │
│    → Returns: {success, preview, summary}                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. NAVIGATION                                                    │
│    Redirect to: /chats/abc123xyz456                             │
│    → Server component loads chat from database                  │
│    → Client component initializes chat UI                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. DATA REASONING (lib/data-reasoning.ts)                       │
│    analyzeChatDataForReasoning(chatId)                          │
│    → Loads uploaded file data                                   │
│    → AI analyzes: column types, patterns, trends                │
│    → Recommends: charts, KPIs, filters                          │
│    → Returns: data summary + recommendations                    │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. AI GENERATION (/api/get-next-completion-stream-promise)      │
│    POST {messages, chatId, model}                               │
│    → Loads system prompts from lib/prompts.ts                   │
│    → Includes dashboard examples from lib/dashboard-examples.ts │
│    → Adds data summary to prompt                                │
│    → Calls Together AI API with streaming                       │
│    → Streams TSX code back to client                            │
│    → Saves assistant message to database                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. CODE EXECUTION (components/code-runner-react.tsx)            │
│    Receives generated React code                                │
│    → Initializes Sandpack with code                             │
│    → Bundles dependencies (React, Recharts, etc.)               │
│    → Renders in isolated iframe                                 │
│    → Updates preview in real-time                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. FOLLOW-UP FLOW                                               │
│    User: "Change the chart to a pie chart"                      │
│    → detectFollowUpIntent() returns true                        │
│    → AI modifies existing code instead of regenerating          │
│    → Sandpack hot-reloads with updated code                     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. MEMORY STORAGE (lib/memory.ts)                              │
│     storeSuccessfulPattern({                                    │
│       dataSchema,                                               │
│       userIntent,                                               │
│       successfulElements,                                       │
│       bestPractices                                             │
│     })                                                          │
│     → Saves to DashboardMemory table                            │
│     → Used for future generations                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ 11. SHARING                                                      │
│     User clicks Share button                                    │
│     → Generates unique share URL                                │
│     → Creates OpenGraph image (/api/og)                         │
│     → Share URL: /share/abc123xyz456?m=msg_xyz                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

### Prisma Models

#### Chat Model

```prisma
model Chat {
  id                String    @id @default(nanoid(16))
  model             String    // AI model used (e.g., "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo")
  quality           String    // Quality level (default: "high")
  prompt            String    // Original user prompt
  title             String    // Chat title (derived from prompt)
  llamaCoderVersion String    @default("v2")
  shadcn            Boolean   // Whether to use Shadcn components
  messages          Message[] // Related messages
  createdAt         DateTime  @default(now())
}
```

**Purpose**: Stores chat session metadata and configuration

**Relationships**: One-to-many with Message model

#### Message Model

```prisma
model Message {
  id        String   @id @default(nanoid(16))
  role      String   // "user" | "assistant" | "system"
  content   String   // Message text or generated code
  chatId    String   // Foreign key to Chat
  chat      Chat     @relation(fields: [chatId], references: [id], onDelete: Cascade)
  position  Int      // Message order in conversation
  createdAt DateTime @default(now())
}
```

**Purpose**: Stores individual messages in chat conversations

**Roles**:
- `user`: User's input messages
- `assistant`: AI-generated responses (code)
- `system`: System prompts and instructions

**Cascade Delete**: Messages deleted when parent chat is deleted

#### DashboardMemory Model

```prisma
model DashboardMemory {
  id                 String   @id @default(nanoid(16))
  dataSchema         String   // JSON: {columns: [...], types: {...}}
  userIntent         String   // Original user prompt
  successfulElements String   // JSON array of successful UI elements
  commonMistakes     String   // JSON array of mistakes to avoid
  bestPractices      String   // JSON array of best practices
  createdAt          DateTime @default(now())
}
```

**Purpose**: Learning system that stores successful dashboard patterns

**JSON Fields**:
- `dataSchema`: Column names, data types, patterns
- `successfulElements`: Working components, layouts, charts
- `commonMistakes`: Errors, anti-patterns to avoid
- `bestPractices`: Proven techniques and approaches

#### GeneratedApp Model (Legacy)

```prisma
model GeneratedApp {
  id        String   @id @default(nanoid(5))
  model     String   // AI model used
  prompt    String   // Original prompt
  code      String   // Generated React code
  createdAt DateTime @default(now())
}
```

**Purpose**: Historical record of generated applications

**Note**: Mostly superseded by Chat/Message system

---

## API Endpoints

### POST /api/get-next-completion-stream-promise

**Purpose**: Main LLM streaming endpoint for dashboard generation

**Request Body**:
```typescript
{
  messages: Array<{role: string, content: string}>,
  chatId: string,
  model: string
}
```

**Response**: Streaming text/event-stream with generated code

**Process**:
1. Load chat and messages from database
2. Detect if follow-up or new generation
3. Load relevant dashboard examples
4. Include data reasoning if data uploaded
5. Construct system prompts
6. Call Together AI streaming API
7. Stream response chunks to client
8. Save assistant message to database

**Error Handling**:
- 400: Invalid request body
- 404: Chat not found
- 500: AI generation error

### POST /api/upload-data

**Purpose**: Handle file uploads (CSV, JSON, Excel)

**Request**: FormData with file and chatId

**Response**:
```typescript
{
  success: boolean,
  fileId: string,
  fileName: string
}
```

**Process**:
1. Validate file type (CSV, JSON, XLSX)
2. Generate unique file ID
3. Save to `/uploads/{chatId}.{ext}`
4. Return file metadata

**Supported MIME Types**:
- `text/csv`
- `application/json`
- `application/vnd.ms-excel`
- `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

### POST /api/import-data

**Purpose**: Parse uploaded file and analyze data structure

**Request Body**:
```typescript
{
  chatId: string,
  fileId: string,
  fileName: string
}
```

**Response**:
```typescript
{
  success: boolean,
  preview: any[],      // First 5 rows
  summary: {
    columns: string[],
    types: Record<string, string>,
    rowCount: number
  }
}
```

**Process**:
1. Read file from `/uploads/` directory
2. Parse based on file extension:
   - `.csv` → Papa Parse
   - `.json` → JSON.parse()
   - `.xlsx`/`.xls` → SheetJS XLSX.read()
3. Analyze data structure (infer types)
4. Generate summary and preview
5. Return structured data

### GET /api/og

**Purpose**: Generate OpenGraph images for shared dashboards

**Query Parameters**:
- `title`: Dashboard title
- `description`: Dashboard description

**Response**: PNG image (1200x630)

**Process**:
1. Render React component with title/description
2. Convert to PNG using Vercel OG
3. Return image with proper headers

### POST /api/s3-upload (Optional)

**Purpose**: S3 file upload integration

**Note**: Optional feature, local storage is primary

---

## Key Components

### code-runner-react.tsx

**Purpose**: Execute generated React code in sandboxed environment

**Technology**: CodeSandbox Sandpack

**Props**:
```typescript
{
  code: string,           // Generated React TSX code
  showEditor?: boolean,   // Show code editor
  readOnly?: boolean,     // Prevent editing
  height?: string         // Preview height
}
```

**Features**:
- Hot module reloading
- Error boundary
- Responsive preview
- Dependencies auto-bundled (React, Recharts, Lucide, etc.)

**Template**:
```typescript
{
  files: {
    '/App.tsx': generatedCode,
    '/package.json': dependencies
  },
  template: 'react-ts',
  options: {
    externalResources: ['https://cdn.tailwindcss.com']
  }
}
```

### chat-box.tsx

**Purpose**: User message input component

**Features**:
- Auto-growing textarea
- Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- Loading states
- File upload trigger
- Model selection

**State Management**:
```typescript
const [input, setInput] = useState('')
const [isLoading, setIsLoading] = useState(false)
```

### chat-log.tsx

**Purpose**: Display chat message history

**Features**:
- Message role styling (user vs. assistant)
- Code syntax highlighting
- Markdown rendering
- Timestamp display
- Auto-scroll to latest message

**Message Rendering**:
```typescript
{messages.map(msg => (
  <div key={msg.id} className={msg.role === 'user' ? 'user' : 'assistant'}>
    {msg.role === 'assistant' ?
      <SyntaxHighlighter code={msg.content} /> :
      <ReactMarkdown>{msg.content}</ReactMarkdown>
    }
  </div>
))}
```

### code-viewer.tsx

**Purpose**: Display generated code with syntax highlighting

**Features**:
- Shiki syntax highlighting
- Copy to clipboard
- Language detection
- Theme support (dark/light)

**Highlight Engine**:
```typescript
const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: ['typescript', 'tsx', 'javascript']
})
```

### header.tsx

**Purpose**: Navigation header

**Features**:
- Logo and branding
- Theme toggle
- Navigation links
- Responsive design

---

## AI Generation System

### System Prompts (`lib/prompts.ts`)

**Structure**:
```typescript
export const SYSTEM_PROMPT = `
You are an expert React dashboard developer.
Generate complete, working React TSX components.

Rules:
- Use Recharts for all charts
- Include responsive design
- Use Tailwind CSS for styling
- Use Radix UI components when appropriate
- Ensure accessibility (ARIA labels)
- Use real data from uploaded files (never mock data)

Output only valid React TSX code, no explanations.
`
```

**Follow-Up Prompt**:
```typescript
export const FOLLOW_UP_PROMPT = `
The user wants to modify the existing dashboard.
Only change what they requested, preserve everything else.
Return the complete updated code.
`
```

### Dashboard Examples (`lib/dashboard-examples.ts`)

**Purpose**: Provide AI with high-quality examples

**Structure**:
```typescript
export const DASHBOARD_EXAMPLES = [
  {
    title: "Sales Dashboard",
    description: "E-commerce sales analytics",
    code: `
      // 200+ lines of complete React dashboard code
      export default function SalesDashboard() {
        // Full implementation with charts, KPIs, filters
      }
    `
  },
  {
    title: "Financial Dashboard",
    description: "Financial metrics and trends",
    code: `// Complete implementation...`
  },
  // ... more examples
]
```

**Total Size**: 686 lines of example code

**Coverage**:
- Sales analytics
- Financial metrics
- User engagement
- Performance monitoring
- Data tables with sorting/filtering

### Dashboard Rules (`lib/dashboard-rules.ts`)

**Purpose**: Validation and generation rules

**Rules**:
```typescript
export const DASHBOARD_RULES = {
  dataFetching: {
    rule: "NEVER use mock data",
    enforcement: "Always use props.data or uploaded file data",
    validation: code => !code.includes("const mockData")
  },

  charts: {
    rule: "Use Recharts library",
    components: ["LineChart", "BarChart", "PieChart", "AreaChart"],
    validation: code => code.includes("from 'recharts'")
  },

  responsive: {
    rule: "Mobile-first responsive design",
    breakpoints: ["sm", "md", "lg", "xl"],
    validation: code => code.includes("grid-cols-1")
  },

  accessibility: {
    rule: "WCAG 2.1 AA compliance",
    requirements: ["aria-label", "role", "tabIndex"],
    validation: code => code.includes("aria-")
  }
}
```

### Generation Flow

```typescript
// 1. Detect intent
const isFollowUp = detectFollowUpIntent(userMessage, chatHistory)

// 2. Load context
const examples = isFollowUp ? [] : getDashboardExamples()
const dataContext = await analyzeChatDataForReasoning(chatId)

// 3. Construct messages
const messages = [
  { role: 'system', content: SYSTEM_PROMPT },
  ...examples.map(ex => ({ role: 'system', content: ex.code })),
  { role: 'system', content: dataContext },
  ...chatHistory,
  { role: 'user', content: userMessage }
]

// 4. Call AI
const stream = await together.chat.completions.create({
  model: selectedModel,
  messages,
  stream: true,
  temperature: 0.7,
  max_tokens: 4096
})

// 5. Stream response
for await (const chunk of stream) {
  yield chunk.choices[0]?.delta?.content || ''
}
```

---

## Data Processing Pipeline

### CSV Parsing (`lib/data-parser.ts`)

```typescript
export async function parseCSV(file: File): Promise<ParsedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data
        const columns = Object.keys(data[0] || {})
        const types = inferTypes(data)

        resolve({
          data,
          columns,
          types,
          rowCount: data.length
        })
      },
      error: (error) => reject(error)
    })
  })
}
```

### JSON Parsing

```typescript
export async function parseJSON(file: File): Promise<ParsedData> {
  const text = await file.text()
  const json = JSON.parse(text)

  // Handle both array and single object
  const data = Array.isArray(json) ? json : [json]

  return {
    data,
    columns: Object.keys(data[0] || {}),
    types: inferTypes(data),
    rowCount: data.length
  }
}
```

### Excel Parsing

```typescript
export async function parseExcel(file: File): Promise<ParsedData> {
  const buffer = await file.arrayBuffer()
  const workbook = XLSX.read(buffer, { type: 'array' })

  // Get first sheet
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(worksheet)

  return {
    data,
    columns: Object.keys(data[0] || {}),
    types: inferTypes(data),
    rowCount: data.length
  }
}
```

### Type Inference

```typescript
function inferTypes(data: any[]): Record<string, string> {
  const types: Record<string, string> = {}
  const sample = data[0] || {}

  for (const [key, value] of Object.entries(sample)) {
    if (typeof value === 'number') {
      types[key] = Number.isInteger(value) ? 'integer' : 'float'
    } else if (typeof value === 'boolean') {
      types[key] = 'boolean'
    } else if (value instanceof Date || isDateString(value)) {
      types[key] = 'date'
    } else {
      types[key] = 'string'
    }
  }

  return types
}
```

### Data Reasoning (`lib/data-reasoning.ts`)

```typescript
export async function analyzeChatDataForReasoning(chatId: string) {
  // 1. Load uploaded file
  const file = await loadFileForChat(chatId)
  if (!file) return null

  // 2. Parse data
  const parsed = await parseFile(file)

  // 3. Generate insights
  const insights = {
    columns: parsed.columns,
    types: parsed.types,
    rowCount: parsed.rowCount,
    recommendations: []
  }

  // 4. Recommend charts based on data types
  const numericCols = Object.entries(parsed.types)
    .filter(([_, type]) => type === 'integer' || type === 'float')
    .map(([col, _]) => col)

  const dateCols = Object.entries(parsed.types)
    .filter(([_, type]) => type === 'date')
    .map(([col, _]) => col)

  if (dateCols.length > 0 && numericCols.length > 0) {
    insights.recommendations.push({
      chart: 'LineChart',
      x: dateCols[0],
      y: numericCols[0],
      reason: 'Time series trend visualization'
    })
  }

  if (numericCols.length >= 2) {
    insights.recommendations.push({
      chart: 'BarChart',
      x: parsed.columns[0],
      y: numericCols[0],
      reason: 'Categorical comparison'
    })
  }

  return insights
}
```

---

## Memory & Learning System

### Storage (`lib/memory.ts`)

```typescript
export async function storeSuccessfulPattern({
  dataSchema,
  userIntent,
  successfulElements,
  commonMistakes,
  bestPractices
}: PatternData) {
  await prisma.dashboardMemory.create({
    data: {
      dataSchema: JSON.stringify(dataSchema),
      userIntent,
      successfulElements: JSON.stringify(successfulElements),
      commonMistakes: JSON.stringify(commonMistakes),
      bestPractices: JSON.stringify(bestPractices)
    }
  })
}
```

### Retrieval

```typescript
export async function retrieveRelevantPatterns(
  dataSchema: DataSchema,
  userIntent: string
): Promise<DashboardMemory[]> {
  // 1. Get all patterns
  const allPatterns = await prisma.dashboardMemory.findMany()

  // 2. Calculate similarity scores
  const scored = allPatterns.map(pattern => ({
    pattern,
    score: calculateSimilarity(
      dataSchema,
      JSON.parse(pattern.dataSchema),
      userIntent,
      pattern.userIntent
    )
  }))

  // 3. Sort by relevance
  const sorted = scored.sort((a, b) => b.score - a.score)

  // 4. Return top matches (score > 0.7)
  return sorted
    .filter(item => item.score > 0.7)
    .slice(0, 5)
    .map(item => item.pattern)
}
```

### Similarity Calculation

```typescript
function calculateSimilarity(
  schema1: DataSchema,
  schema2: DataSchema,
  intent1: string,
  intent2: string
): number {
  // Schema similarity (0-1)
  const columnOverlap = calculateColumnOverlap(schema1.columns, schema2.columns)
  const typeMatch = calculateTypeMatch(schema1.types, schema2.types)
  const schemaSimilarity = (columnOverlap + typeMatch) / 2

  // Intent similarity (0-1)
  const intentSimilarity = calculateTextSimilarity(intent1, intent2)

  // Weighted average
  return schemaSimilarity * 0.6 + intentSimilarity * 0.4
}
```

---

## Code Execution Environment

### Sandpack Configuration

```typescript
import { Sandpack } from '@codesandbox/sandpack-react'

export default function CodeRunner({ code }) {
  return (
    <Sandpack
      template="react-ts"
      files={{
        '/App.tsx': {
          code: code,
          active: true
        },
        '/package.json': {
          code: JSON.stringify({
            dependencies: {
              'react': '^19.0.0',
              'react-dom': '^19.0.0',
              'recharts': '^2.12.0',
              'lucide-react': '^0.468.0',
              '@radix-ui/themes': '^3.1.6'
            }
          })
        }
      }}
      options={{
        externalResources: [
          'https://cdn.tailwindcss.com'
        ],
        showNavigator: false,
        showTabs: false,
        showLineNumbers: true,
        editorHeight: '600px'
      }}
      theme="dark"
    />
  )
}
```

### Security Considerations

1. **Iframe Isolation**: Code runs in separate origin
2. **CSP Headers**: Content Security Policy enforced
3. **No Node Access**: Browser-only environment
4. **Resource Limits**: Memory and CPU constraints
5. **No Network Access**: Limited external requests

---

## Configuration & Environment

### Environment Variables

```bash
# Required
TOGETHER_API_KEY=your_together_api_key_here
DATABASE_URL=postgresql://user:pass@host:5432/dashgen

# Optional
HELICONE_API_KEY=your_helicone_key
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=dashgen.example.com
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=dashgen-uploads
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      }
    }
    return config
  }
}

export default nextConfig
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    }
  }
}
```

---

## Deployment

### Vercel Deployment

**Prerequisites**:
- Vercel account
- GitHub repository connected
- Environment variables configured

**Build Command**:
```bash
npm run build
# Runs: prisma generate && prisma migrate deploy && next build
```

**Start Command**:
```bash
npm run start
```

**Environment Variables** (Vercel Dashboard):
```
TOGETHER_API_KEY=***
DATABASE_URL=***
HELICONE_API_KEY=*** (optional)
```

### Database Migration

```bash
# Development
npx prisma migrate dev --name init

# Production (automatic in build)
npx prisma migrate deploy
```

### File Upload Considerations

**Local Development**:
- Files stored in `/uploads/` directory
- Persists across local restarts

**Production (Vercel)**:
- Ephemeral file system
- Files lost on cold starts
- Recommendation: Use S3 for production

**S3 Migration**:
```typescript
// Switch to S3 in production
const useS3 = process.env.NODE_ENV === 'production'

if (useS3) {
  await uploadToS3(file)
} else {
  await saveToLocal(file)
}
```

### Performance Optimization

1. **Edge Runtime**: API routes use edge runtime for low latency
2. **Streaming**: LLM responses streamed for better UX
3. **Code Splitting**: Next.js automatic code splitting
4. **Image Optimization**: Next.js Image component
5. **Caching**: Sandpack bundles cached in browser

### Monitoring

**Plausible Analytics**:
```typescript
// app/layout.tsx
import PlausibleProvider from 'next-plausible'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <PlausibleProvider domain="dashgen.example.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Helicone Observability**:
```typescript
// Track LLM usage
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://together.helicone.ai/v1',
  defaultHeaders: {
    'Helicone-Auth': `Bearer ${process.env.HELICONE_API_KEY}`
  }
})
```

---

## Development Workflow

### Local Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/dashgen.git
cd dashgen

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your keys

# 4. Setup database
npx prisma generate
npx prisma migrate dev

# 5. Run development server
npm run dev
```

### Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run lint

# Build for production
npm run build

# Start production server
npm run start

# Database migrations
npx prisma migrate dev
npx prisma studio  # Database GUI

# Bundle analysis
npm run analyze
```

### Code Quality

**ESLint**:
```bash
npm run lint
# Checks: Next.js rules, React hooks, TypeScript
```

**Prettier**:
```bash
npx prettier --write .
# Formats: JS, TS, TSX, JSON, MD
```

**TypeScript**:
```bash
npx tsc --noEmit
# Checks: Type errors, unused variables
```

---

## Troubleshooting

### Common Issues

**Issue**: File upload fails
**Solution**: Check `/uploads/` directory permissions, ensure directory exists

**Issue**: Database connection error
**Solution**: Verify `DATABASE_URL` in .env, check Neon database status

**Issue**: AI generation timeout
**Solution**: Check `TOGETHER_API_KEY`, verify API quota, try smaller model

**Issue**: Sandpack not rendering
**Solution**: Check browser console, verify Tailwind CDN loaded, check CSP headers

**Issue**: Dark mode not working
**Solution**: Ensure `next-themes` provider wraps app, check localStorage

### Debug Mode

```typescript
// Enable debug logging
export const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Data parsed:', parsed)
  console.log('AI prompt:', prompt)
  console.log('Generated code:', code)
}
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT License - See LICENSE file for details

---

## Support

- **Issues**: GitHub Issues
- **Documentation**: This file + inline code comments
- **Email**: support@dashgen.example.com

---

**Last Updated**: December 24, 2025
**Version**: 2.0
**Maintainer**: DashGen Team
