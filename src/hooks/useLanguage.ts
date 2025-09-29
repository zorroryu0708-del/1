import { useState, useEffect, createContext, useContext } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'header.projectManagement': 'Project Management Portal',
    'header.backToProjects': 'Back to Projects',
    
    // Login
    'login.title': 'Project Management Portal',
    'login.subtitle': 'Sign in to access your project dashboard',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.role': 'Select Your Role',
    'login.signIn': 'Sign In',
    'login.demoCredentials': 'Demo Credentials',
    'login.selectRole': 'Select any role to explore different permissions',
    
    // Roles
    'role.designer': 'Designer',
    'role.productManager1': 'Product Manager 1',
    'role.productManager2': 'Product Manager 2',
    'role.productManager3': 'Product Manager 3',
    'role.sponsor': 'Executive Sponsor',
    'role.operator1': 'Operations Lead',
    'role.operator2': 'Operations Specialist',
    'role.operator3': 'Operations Coordinator',
    'role.designerDesc': 'UI/UX Design Team',
    'role.productManager1Desc': 'Senior Product Manager',
    'role.productManager2Desc': 'Product Manager - Features',
    'role.productManager3Desc': 'Product Manager - Strategy',
    'role.sponsorDesc': 'Executive Sponsor',
    'role.operator1Desc': 'Operations Lead',
    'role.operator2Desc': 'Operations Specialist',
    'role.operator3Desc': 'Operations Coordinator',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Manage and track your project portfolio',
    'projects.newProject': 'New Project',
    'projects.phases': 'phases',
    'projects.teamMembers': 'team members',
    'projects.risks': 'identified risks',
    'projects.stakeholders': 'stakeholders',
    'projects.viewDetails': 'View Details →',
    'projects.noProjects': 'No projects yet',
    'projects.noProjectsDesc': 'Create your first project to get started with project management.',
    'projects.noProjectsDescOperator': 'No projects have been created yet. Contact your project manager to create new projects.',
    'projects.createProject': 'Create Project',
    'projects.weeksTotal': 'weeks total',
    
    // Project Creation
    'projectCreation.title': 'Create New Project',
    'projectCreation.projectName': 'Project Name',
    'projectCreation.placeholder': 'Enter project name...',
    'projectCreation.template': 'Project Template',
    'projectCreation.templateDesc': 'Your new project will be created with 5 phases, each containing editable content areas and attachment capabilities.',
    'projectCreation.cancel': 'Cancel',
    'projectCreation.create': 'Create Project',
    'projectCreation.creating': 'Creating...',
    
    // Navigation Tabs
    'nav.projectScope': 'Project Scope',
    'nav.timeline': 'Timeline',
    'nav.resources': 'Resources',
    'nav.risks': 'Risks',
    'nav.communication': 'Communication',
    
    // Timeline
    'timeline.phase': 'Phase',
    'timeline.startDate': 'Start Date',
    'timeline.endDate': 'End Date',
    'timeline.duration': 'Duration',
    'timeline.content': 'Content',
    'timeline.reviewers': 'Reviewers',
    'timeline.addReviewer': 'Add Reviewer',
    'timeline.approve': 'Approve',
    'timeline.reject': 'Reject',
    'timeline.comment': 'Comment',
    'timeline.addReviewComment': 'Add review comment...',
    'timeline.attachments': 'Attachments',
    'timeline.addFiles': 'Add Files',
    'timeline.download': 'Download',
    'timeline.notSet': 'Not set',
    'timeline.hasComment': 'Has comment',
    'timeline.autoCalculated': 'Auto-calculated',
    'timeline.enterPhaseContent': 'Enter phase content...',
    'timeline.approved': 'Approved',
    'timeline.rejected': 'Rejected',
    'timeline.pending': 'Pending',
    
    // Resources
    'resources.teamStructure': 'Team Structure & Roles',
    'resources.projectBudget': 'Project Budget',
    'resources.personnelCosts': 'Personnel Costs',
    'resources.technologyTools': 'Technology & Tools',
    'resources.marketingLaunch': 'Marketing & Launch',
    'resources.contingency': 'Contingency',
    'resources.totalBudget': 'Total Project Budget',
    
    // Risks
    'risks.riskManagement': 'Risk Management',
    'risks.addRisk': 'Add Risk',
    'risks.addNewRisk': 'Add New Risk',
    'risks.editRisk': 'Edit Risk',
    'risks.category': 'Category',
    'risks.impact': 'Impact',
    'risks.probability': 'Probability',
    'risks.description': 'Description',
    'risks.mitigation': 'Mitigation Strategy',
    'risks.categoryPlaceholder': 'e.g., Technical, Market, Financial',
    'risks.descriptionPlaceholder': 'Describe the risk...',
    'risks.mitigationPlaceholder': 'How will this risk be mitigated?',
    'risks.risk': 'Risk',
    'risks.mitigationLabel': 'Mitigation:',
    'risks.high': 'High',
    'risks.medium': 'Medium',
    'risks.low': 'Low',
    'risks.deleteConfirm': 'Are you sure you want to delete this risk?',
    
    // Communication
    'communication.stakeholders': 'Stakeholders',
    'communication.meetings': 'Meetings',
    'communication.addMeeting': 'Add Meeting',
    'communication.addNewMeeting': 'Add New Meeting',
    'communication.editMeeting': 'Edit Meeting',
    'communication.meetingTitle': 'Meeting Title',
    'communication.schedule': 'Schedule',
    'communication.audience': 'Audience',
    'communication.meetingContent': 'Meeting Content',
    'communication.titlePlaceholder': 'e.g., Daily Standup',
    'communication.schedulePlaceholder': 'e.g., Daily 9:00-9:15 AM',
    'communication.audiencePlaceholder': 'e.g., Development Team',
    'communication.contentPlaceholder': 'Meeting agenda and content...',
    'communication.meetingContentLabel': 'Meeting Content:',
    'communication.deleteMeetingConfirm': 'Are you sure you want to delete this meeting?',
    
    // Comments
    'comments.title': 'Comments',
    'comments.addComment': 'Add your comment or feedback...',
    'comments.comment': 'Comment',
    'comments.reply': 'Reply',
    'comments.writeReply': 'Write a reply...',
    'comments.cancel': 'Cancel',
    
    // File Upload
    'fileUpload.title': 'Upload Files',
    'fileUpload.maxSize': 'Max',
    'fileUpload.perFile': 'MB per file',
    'fileUpload.dropFiles': 'Drop files here or click to browse',
    'fileUpload.supportedFormats': 'Supported formats:',
    'fileUpload.selectedFiles': 'Selected Files',
    'fileUpload.upload': 'Upload Files',
    'fileUpload.uploading': 'Uploading...',
    'fileUpload.success': 'Files uploaded successfully!',
    'fileUpload.error': 'Upload failed. Please try again.',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.loading': 'Loading...',
    'common.language': 'Language',
    'common.english': 'English',
    'common.chinese': '中文',
    
    // Project Scope
    'scope.title': 'Project Scope',
    'scope.description': 'This section defines the project boundaries, objectives, and deliverables. It outlines what will be included in the project and what will be excluded.',
  },
  zh: {
    // Header
    'header.projectManagement': '项目管理门户',
    'header.backToProjects': '返回项目列表',
    
    // Login
    'login.title': '项目管理门户',
    'login.subtitle': '登录以访问您的项目仪表板',
    'login.email': '邮箱地址',
    'login.password': '密码',
    'login.role': '选择您的角色',
    'login.signIn': '登录',
    'login.demoCredentials': '演示凭据',
    'login.selectRole': '选择任意角色以探索不同权限',
    
    // Roles
    'role.designer': '设计师',
    'role.productManager1': '产品经理 1',
    'role.productManager2': '产品经理 2',
    'role.productManager3': '产品经理 3',
    'role.sponsor': '执行发起人',
    'role.operator1': '运营主管',
    'role.operator2': '运营专员',
    'role.operator3': '运营协调员',
    'role.designerDesc': 'UI/UX 设计团队',
    'role.productManager1Desc': '高级产品经理',
    'role.productManager2Desc': '产品经理 - 功能',
    'role.productManager3Desc': '产品经理 - 策略',
    'role.sponsorDesc': '执行发起人',
    'role.operator1Desc': '运营主管',
    'role.operator2Desc': '运营专员',
    'role.operator3Desc': '运营协调员',
    
    // Projects
    'projects.title': '项目',
    'projects.subtitle': '管理和跟踪您的项目组合',
    'projects.newProject': '新建项目',
    'projects.phases': '个阶段',
    'projects.teamMembers': '个团队成员',
    'projects.risks': '个已识别风险',
    'projects.stakeholders': '个利益相关者',
    'projects.viewDetails': '查看详情 →',
    'projects.noProjects': '暂无项目',
    'projects.noProjectsDesc': '创建您的第一个项目以开始项目管理。',
    'projects.noProjectsDescOperator': '尚未创建任何项目。请联系您的项目经理创建新项目。',
    'projects.createProject': '创建项目',
    'projects.weeksTotal': '周总计',
    
    // Project Creation
    'projectCreation.title': '创建新项目',
    'projectCreation.projectName': '项目名称',
    'projectCreation.placeholder': '输入项目名称...',
    'projectCreation.template': '项目模板',
    'projectCreation.templateDesc': '您的新项目将创建5个阶段，每个阶段都包含可编辑的内容区域和附件功能。',
    'projectCreation.cancel': '取消',
    'projectCreation.create': '创建项目',
    'projectCreation.creating': '创建中...',
    
    // Navigation Tabs
    'nav.projectScope': '项目范围',
    'nav.timeline': '时间线',
    'nav.resources': '资源',
    'nav.risks': '风险',
    'nav.communication': '沟通',
    
    // Timeline
    'timeline.phase': '阶段',
    'timeline.startDate': '开始日期',
    'timeline.endDate': '结束日期',
    'timeline.duration': '持续时间',
    'timeline.content': '内容',
    'timeline.reviewers': '评审人员',
    'timeline.addReviewer': '添加评审人员',
    'timeline.approve': '通过',
    'timeline.reject': '不通过',
    'timeline.comment': '评论',
    'timeline.addReviewComment': '添加评审评论...',
    'timeline.attachments': '附件',
    'timeline.addFiles': '添加文件',
    'timeline.download': '下载',
    'timeline.notSet': '未设置',
    'timeline.hasComment': '有评论',
    'timeline.autoCalculated': '自动计算',
    'timeline.enterPhaseContent': '输入阶段内容...',
    'timeline.approved': '已通过',
    'timeline.rejected': '未通过',
    'timeline.pending': '待审核',
    
    // Resources
    'resources.teamStructure': '团队结构与角色',
    'resources.projectBudget': '项目预算',
    'resources.personnelCosts': '人员成本',
    'resources.technologyTools': '技术工具',
    'resources.marketingLaunch': '营销发布',
    'resources.contingency': '应急资金',
    'resources.totalBudget': '项目总预算',
    
    // Risks
    'risks.riskManagement': '风险管理',
    'risks.addRisk': '添加风险',
    'risks.addNewRisk': '添加新风险',
    'risks.editRisk': '编辑风险',
    'risks.category': '类别',
    'risks.impact': '影响',
    'risks.probability': '概率',
    'risks.description': '描述',
    'risks.mitigation': '缓解策略',
    'risks.categoryPlaceholder': '例如：技术、市场、财务',
    'risks.descriptionPlaceholder': '描述风险...',
    'risks.mitigationPlaceholder': '如何缓解此风险？',
    'risks.risk': '风险',
    'risks.mitigationLabel': '缓解措施：',
    'risks.high': '高',
    'risks.medium': '中',
    'risks.low': '低',
    'risks.deleteConfirm': '您确定要删除此风险吗？',
    
    // Communication
    'communication.stakeholders': '利益相关者',
    'communication.meetings': '会议',
    'communication.addMeeting': '添加会议',
    'communication.addNewMeeting': '添加新会议',
    'communication.editMeeting': '编辑会议',
    'communication.meetingTitle': '会议主题',
    'communication.schedule': '时间安排',
    'communication.audience': '参会人员',
    'communication.meetingContent': '会议内容',
    'communication.titlePlaceholder': '例如：每日站会',
    'communication.schedulePlaceholder': '例如：每日 9:00-9:15',
    'communication.audiencePlaceholder': '例如：开发团队',
    'communication.contentPlaceholder': '会议议程和内容...',
    'communication.meetingContentLabel': '会议内容：',
    'communication.deleteMeetingConfirm': '您确定要删除此会议吗？',
    
    // Comments
    'comments.title': '评论',
    'comments.addComment': '添加您的评论或反馈...',
    'comments.comment': '评论',
    'comments.reply': '回复',
    'comments.writeReply': '写回复...',
    'comments.cancel': '取消',
    
    // File Upload
    'fileUpload.title': '上传文件',
    'fileUpload.maxSize': '最大',
    'fileUpload.perFile': 'MB 每个文件',
    'fileUpload.dropFiles': '拖拽文件到此处或点击浏览',
    'fileUpload.supportedFormats': '支持的格式：',
    'fileUpload.selectedFiles': '已选择文件',
    'fileUpload.upload': '上传文件',
    'fileUpload.uploading': '上传中...',
    'fileUpload.success': '文件上传成功！',
    'fileUpload.error': '上传失败。请重试。',
    
    // Common
    'common.save': '保存',
    'common.cancel': '取消',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.add': '添加',
    'common.loading': '加载中...',
    'common.language': '语言',
    'common.english': 'English',
    'common.chinese': '中文',
    
    // Project Scope
    'scope.title': '项目范围',
    'scope.description': '本节定义项目边界、目标和交付物。它概述了项目中包含的内容和排除的内容。',
  }
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useLanguageProvider() {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return {
    language,
    setLanguage,
    t
  };
}