# Claude Memory - LlamaCoder/DashGen Project Context

Read the CLAUDE_MEMORY.md file to restore context about the LlamaCoder/DashGen project

## 🧠 **Quick Restoration Prompt**

When returning to this project, use this command:
```
Read the CLAUDE_MEMORY.md file to restore context about the LlamaCoder/DashGen project
```

## 📋 **Project Overview**

**Project Name**: LlamaCoder (DashGen)
**Type**: AI-powered dashboard generator
**Tech Stack**: Next.js, React, TypeScript, Prisma, PostgreSQL, Radix UI, Tailwind CSS
**Purpose**: Upload CSV files → Generate interactive React dashboards using AI

## 🏗️ **Current Project State**

### **Core Functionality Working:**
- ✅ CSV file upload system
- ✅ AI-powered dashboard generation using Claude
- ✅ Interactive React component generation
- ✅ Share functionality for generated dashboards
- ✅ Database storage of chats and messages
- ✅ Real-time code execution and preview

### **Current Architecture:**
- **Frontend**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: Claude API for code generation
- **File Storage**: Local uploads directory
- **UI Components**: Radix UI Themes + Tailwind CSS
- **Charts**: Recharts library for data visualization

## 🎯 **Key Issues Identified & Solutions**

### **1. Data Processing Problem (Major)**
**Issue**: CSV files are uploaded but AI sometimes generates mock data instead of using real uploaded data
**Root Cause**: No structured database for processed data - AI has to parse CSV every time
**Solution Proposed**: Enhanced database strategy (see DATABASE_STRATEGY.md)

### **2. Share Button Issue (Resolved)**
**Issue**: Share URLs returning 404 errors
**Root Cause**: User was testing with non-existent message IDs
**Status**: ✅ RESOLVED - Share functionality works correctly

## 📁 **Key Files & Their Purpose**

### **Core Application Files:**
- `app/(main)/page.tsx` - Main dashboard upload interface
- `app/(main)/chats/[id]/page.tsx` - Chat interface for dashboard generation
- `app/api/import-data/route.ts` - CSV file processing API
- `app/api/chats/route.ts` - Chat creation and management
- `components/code-runner.tsx` - React component execution engine
- `lib/prompts.ts` - AI prompting system for dashboard generation

### **Database Schema:**
- `prisma/schema.prisma` - Current database models (Chat, Message, File)
- Models: Chat, Message, File (basic structure, needs enhancement)

### **Memory & Documentation:**
- `DATABASE_STRATEGY.md` - Proposed enhanced database architecture
- `SHARE_TEST.md` - Share functionality debugging results
- `CLAUDE_MEMORY.md` - This file (project context)

## 🔧 **Current Data Flow**

1. **Upload**: User uploads CSV → stored in `/uploads/` directory
2. **Chat**: User creates chat session for dashboard generation
3. **AI Processing**: Claude receives file path + user prompt
4. **Code Generation**: AI generates React dashboard component
5. **Execution**: Component runs in isolated environment
6. **Share**: Generated dashboard can be shared via unique URLs

## 🚨 **Critical Data Processing Issue**

### **Problem:**
- CSV files stored as raw uploads in `/uploads/` directory
- AI parsing data every time (inefficient)
- AI sometimes generates mock data instead of using real data
- No structured data storage or validation

### **Proposed Solution (DATABASE_STRATEGY.md):**
- Create enhanced database schema with DataProject, DataColumn, DataRecord models
- AI-powered data analysis and cleaning pipeline
- Structured data storage for fast queries
- Real-time data APIs for dashboards
- Force real data usage (no mock data allowed)

## 📊 **Enhanced Database Schema Proposed**

```prisma
model DataProject {
  id          String   @id @default(nanoid(16))
  name        String
  userId      String?
  originalFileName String
  businessContext  String  // "sales", "analytics", etc.
  dataQuality     String  // "excellent", "good", etc.
  columns         DataColumn[]
  records         DataRecord[]
  dashboards      Dashboard[]
}

model DataColumn {
  id          String      @id @default(nanoid(16))
  name        String      // Original column name
  cleanName   String      // AI-cleaned name
  dataType    String      // "integer", "float", "date", etc.
  category    String      // "metric", "dimension", etc.
  description String?     // AI-generated description
}

model DataRecord {
  id        String      @id @default(nanoid(16))
  data      Json        // Structured JSON data
  rowIndex  Int         // Original row number
}
```

## 🎯 **AI Prompting System**

### **Current Prompt Structure:**
- Uses `lib/prompts.ts` for dashboard generation
- Has DATA FETCHING RULES that mandate real data usage
- Includes file ID context in prompts
- Forces use of `/api/import-data` endpoint

### **Critical Prompt Rules:**
- NEVER use mock/fake data when fileId provided
- ALWAYS fetch from `/api/import-data` endpoint
- Use actual column names from uploaded files
- Implement proper loading/error states

## 🔍 **Recent Work Completed**

### **Project Analysis Phase:**
1. ✅ Explored project structure and dependencies
2. ✅ Analyzed database schema and current models
3. ✅ Identified data processing inefficiencies
4. ✅ Debugged share functionality issues
5. ✅ Documented proposed database enhancements
6. ✅ Created comprehensive memory file

### **Key Findings:**
- Share functionality works (user error with message IDs)
- Data processing needs major enhancement
- Database strategy document created with detailed solution
- AI prompting system has good foundation but needs data architecture support

## 🚀 **Next Steps Recommended**

### **Phase 1: Enhanced Data Processing (High Priority)**
1. Implement enhanced Prisma schema (DATABASE_STRATEGY.md)
2. Create AI data analysis service
3. Build data cleaning and structuring pipeline
4. Update API endpoints for structured data access

### **Phase 2: Dashboard Generation Enhancement**
1. Update prompt system to use structured data
2. Create data-aware dashboard templates
3. Implement real-time data APIs
4. Add data validation and error handling

### **Phase 3: Advanced Features**
1. Multi-file project support
2. Data relationships detection
3. User workspace management
4. Performance optimization

## 🧪 **Test Data Available**

### **Working Message IDs for Share Testing:**
- `OKmFG-neKrFo-qOc` (Project Management Dashboard)
- `D09N3iGMuBVZV9Tu` (Real Estate Agency Dashboard)
- `JWjZKesGuZ8ROO9h` (Real Estate Agency Dashboard)

### **Test URLs:**
- `http://localhost:3001/share/v2/OKmFG-neKrFo-qOc`
- Local development server: `http://localhost:3001`

## 💡 **Key Insights**

1. **DashGen is a solid foundation** with working AI dashboard generation
2. **Main bottleneck is data processing** - needs structured database approach
3. **Share functionality works correctly** - user testing issue resolved
4. **AI prompting system is well-designed** but needs better data architecture
5. **Database strategy document provides clear roadmap** for major improvements

## 🔄 **Project Status Summary**

- **Current State**: Working MVP with basic functionality
- **Main Issue**: Inefficient data processing and potential mock data generation
- **Solution Ready**: Comprehensive database enhancement strategy documented
- **Next Phase**: Implementation of enhanced data processing system
- **Priority**: High - data architecture improvements will significantly enhance user experience

---

**Last Updated**: 2025-07-05
**Context Session**: Comprehensive project analysis and documentation phase
**Ready For**: Enhanced database implementation phase