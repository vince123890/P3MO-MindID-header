const documentData = {
  status_code: 200,
  data: {
    items: [
      {
        id: 1,
        stage: "FEL 2",
        document: "Project Specification Document",
        type: "Project Docs.",
        chapter: "Engineering",
        comments: [
          {
            id: 1,
            user: "Business Development Mind ID",
            date: "22/02/2022, 22:22",
            avatar: "/img/avatar1.jpg",
            content: "Please review the technical specifications for accuracy. Some parameters need to be updated according to the latest requirements."
          },
          {
            id: 2,
            user: "PMO Inalum",
            date: "22/02/2022, 08:08",
            avatar: "/img/avatar2.jpg",
            content: "Document has been reviewed and approved. Ready for the next phase of the project."
          }
        ]
      },
      {
        id: 2,
        stage: "FEL 3",
        document: "Construction Safety Manual",
        type: "Contract",
        chapter: "Engineering",
        comments: [
          {
            id: 1,
            user: "Safety Coordinator",
            date: "23/02/2022, 10:15",
            avatar: "/img/avatar3.jpg",
            content: "Safety protocols have been updated according to new regulations. All team members should review this document."
          },
          {
            id: 2,
            user: "Project Manager",
            date: "23/02/2022, 14:30",
            avatar: "/img/avatar4.jpg",
            content: "Acknowledged. Will ensure all contractors receive the updated safety manual before work begins."
          }
        ]
      },
      {
        id: 3,
        stage: "Detail Engineering",
        document: "Environmental Impact Assessment",
        type: "Permit",
        chapter: "Engineering",
        comments: [
          {
            id: 1,
            user: "Environmental Consultant",
            date: "24/02/2022, 09:00",
            avatar: "/img/avatar5.jpg",
            content: "Environmental assessment complete. Mitigation measures have been identified and documented."
          },
          {
            id: 2,
            user: "Regulatory Affairs",
            date: "24/02/2022, 16:45",
            avatar: "/img/avatar6.jpg",
            content: "Permit application submitted to authorities. Expecting approval within 2-3 weeks."
          }
        ]
      },
      {
        id: 4,
        stage: "FID",
        document: "Operations Manual",
        type: "Commercial",
        chapter: "Engineering",
        comments: [
          {
            id: 1,
            user: "Operations Manager",
            date: "25/02/2022, 11:20",
            avatar: "/img/avatar7.jpg",
            content: "Operations manual is comprehensive and covers all critical procedures. Team training scheduled for next week."
          },
          {
            id: 2,
            user: "Technical Lead",
            date: "25/02/2022, 15:10",
            avatar: "/img/avatar8.jpg",
            content: "Manual approved. All operational staff should have access to the latest version."
          }
        ]
      },
      {
        id: 5,
        stage: "Commissioning",
        document: "Quality Control Checklist",
        type: "Project Docs.",
        chapter: "Quality Assurance",
        comments: [
          {
            id: 1,
            user: "QA Manager",
            date: "26/02/2022, 08:30",
            avatar: "/img/avatar9.jpg",
            content: "Quality control checklist has been updated to include new testing procedures. All items must be verified before sign-off."
          }
        ]
      },
      {
        id: 6,
        stage: "Construction",
        document: "Material Procurement Plan",
        type: "Contract",
        chapter: "Procurement",
        comments: [
          {
            id: 1,
            user: "Procurement Manager",
            date: "27/02/2022, 13:45",
            avatar: "/img/avatar10.jpg",
            content: "All materials have been sourced from certified suppliers. Delivery schedule is aligned with project timeline."
          },
          {
            id: 2,
            user: "Cost Controller",
            date: "27/02/2022, 16:20",
            avatar: "/img/avatar11.jpg",
            content: "Budget allocation approved. Cost tracking system is in place for monitoring expenses."
          },
          {
            id: 3,
            user: "Site Engineer",
            date: "28/02/2022, 09:15",
            avatar: "/img/avatar12.jpg",
            content: "Material quality inspections scheduled. Storage facilities prepared at construction site."
          }
        ]
      },
      {
        id: 7,
        stage: "Detail Engineering",
        document: "Technical Drawing Package",
        type: "Project Docs.",
        chapter: "Engineering",
        comments: [
          {
            id: 1,
            user: "Lead Engineer",
            date: "01/03/2022, 10:00",
            avatar: "/img/avatar13.jpg",
            content: "Technical drawings completed and reviewed. All dimensions and specifications verified against design requirements."
          },
          {
            id: 2,
            user: "Design Manager",
            date: "01/03/2022, 14:30",
            avatar: "/img/avatar14.jpg",
            content: "Drawings approved for construction. CAD files uploaded to project repository."
          }
        ]
      },
      {
        id: 8,
        stage: "Commissioning",
        document: "Equipment Installation Guide",
        type: "Technical Manual",
        chapter: "Installation",
        comments: [
          {
            id: 1,
            user: "Installation Supervisor",
            date: "02/03/2022, 08:00",
            avatar: "/img/avatar15.jpg",
            content: "Installation procedures clearly defined. Equipment positioning and connections documented."
          }
        ]
      },
      {
        id: 9,
        stage: "Operate Optimize",
        document: "Performance Monitoring Report",
        type: "Commercial",
        chapter: "Operations",
        comments: [
          {
            id: 1,
            user: "Performance Analyst",
            date: "03/03/2022, 11:30",
            avatar: "/img/avatar16.jpg",
            content: "Performance metrics exceed baseline expectations. Optimization recommendations documented for further improvements."
          },
          {
            id: 2,
            user: "Operations Director",
            date: "03/03/2022, 15:45",
            avatar: "/img/avatar17.jpg",
            content: "Excellent results. Implement optimization strategies as recommended in Q2."
          }
        ]
      },
      {
        id: 10,
        stage: "Construction",
        document: "Progress Milestone Report",
        type: "Project Docs.",
        chapter: "Project Management",
        comments: [
          {
            id: 1,
            user: "Project Coordinator",
            date: "04/03/2022, 09:20",
            avatar: "/img/avatar18.jpg",
            content: "Milestone 3 completed ahead of schedule. Team performance exceptional during this phase."
          },
          {
            id: 2,
            user: "Stakeholder Representative",
            date: "04/03/2022, 12:10",
            avatar: "/img/avatar19.jpg",
            content: "Stakeholders are satisfied with project progress. Continue with current execution strategy."
          }
        ]
      },
      {
        id: 11,
        stage: "Detail Engineering",
        document: "Risk Assessment Matrix",
        type: "Permit",
        chapter: "Risk Management",
        comments: [
          {
            id: 1,
            user: "Risk Manager",
            date: "05/03/2022, 14:15",
            avatar: "/img/avatar20.jpg",
            content: "Comprehensive risk assessment completed. Mitigation strategies developed for all identified high-risk scenarios."
          }
        ]
      },
      {
        id: 12,
        stage: "Commissioning",
        document: "System Integration Test Plan",
        type: "Technical Manual",
        chapter: "Testing",
        comments: [
          {
            id: 1,
            user: "Test Engineer",
            date: "06/03/2022, 10:45",
            avatar: "/img/avatar21.jpg",
            content: "Integration testing plan finalized. All system interfaces and dependencies mapped."
          },
          {
            id: 2,
            user: "Quality Engineer",
            date: "06/03/2022, 16:30",
            avatar: "/img/avatar22.jpg",
            content: "Test procedures validated. Ready to commence system integration testing phase."
          }
        ]
      }
    ],
    meta: {
      total_page: 2,
      total: 12,
      page: 1,
      per_page: 10,
    },
    version: "1.0.0",
  },
};

export { documentData };
